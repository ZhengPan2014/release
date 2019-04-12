#!/usr/bin/env python

# subscirbe to: /task_switch
#               /nav_ctrl_status
#               /battery

# publish to :  /task_state  ('cartographer_node', 'amcl', 'move_base', 'shelf_detector')
#               /task_switch (frame_id: 'base_laser')

# systemTask:  (1)slam( seq==1: reset slam;  seq==2:continue slam )
#              (2)shelf
#              (3)battery monitor

import roslaunch
import rospy
import sys
import os
import time
import rosgraph
import tf
import tf2_ros
import dynamic_reconfigure.client
from std_msgs.msg import Header
from diagnostic_msgs.msg import KeyValue, DiagnosticStatus
from geometry_msgs.msg import PoseWithCovarianceStamped
from sensor_msgs.msg import BatteryState
from yocs_msgs.msg import NavigationControlStatus, NavigationControl


class systemTask:

    def __init__(self):
        self.taskSub = rospy.Subscriber(
            '/task_switch', Header, self.taskSitchCallback)
        self.navCtrlSub = rospy.Subscriber(
            '/nav_ctrl_status', NavigationControlStatus, self.navCtrlCallback, queue_size=10)
        self.batterySub = rospy.Subscriber(
            "/battery", BatteryState, self.monitorBatteryCallback, queue_size=10)

        # Two parameters for switching and reset
        self.startSLAM = False
        self.excutedSLAM = False
        self.slamReset = False
        self.slamContinue = False

        self.startShelfDetector = False
        self.excutedShelfDetector = False

        self.battery_percentage = 1
        self.navCtrlStatus = 'buzzy'  # 'free'

    def taskSitchCallback(self, taskMsg):
        # deal with logic None.
        if taskMsg.frame_id.find("slam") != -1:
            self.startSLAM = self.switchFlag("slam", taskMsg)
            if taskMsg.seq == 1:
                self.slamReset = True
            elif taskMsg.seq == 2:
                self.slamContinue = True
        if taskMsg.frame_id.find("shelf") != -1:
            self.startShelfDetector = self.switchFlag("shelf", taskMsg)

    # switchFlag: used to check for startup or shutdown tasks
    def switchFlag(self, strName, headerMsg):
        strMsg = headerMsg.frame_id
        strMsg = strMsg.lower()
        if strMsg.find(strName) != -1 and headerMsg.seq >= 1:
            return True  # to excute
        if strMsg.find(strName) != -1 and headerMsg.seq == 0:
            return False  # to stop

    def monitorBatteryCallback(self, batteryMsg):
        self.battery_percentage = batteryMsg.percentage

    def navCtrlCallback(self, navCtrlMsg):
        # IDLING=0, RUNNING=1, PAUSED=2, COMPLETED=3, CANCELLED=4, ERROR=-1
        if navCtrlMsg.status == 0 or navCtrlMsg.status == 4:
            self.navCtrlStatus = 'free'
        else:
            self.navCtrlStatus = 'buzzy'


# publish info switch_seq to /task_switch wthin time_pub
def pubTaskSwitch(task_name, switch_seq, time_pub):
    pubTask = rospy.Publisher(
        '/task_switch', Header, queue_size=10)
    taskPubMsg = Header()
    taskPubMsg.frame_id = task_name
    taskPubMsg.seq = switch_seq

    count_idx = 0
    while count_idx < time_pub/0.2:
        pubTask.publish(taskPubMsg)
        time.sleep(0.2)
        count_idx = count_idx+1


def pubAutoCharge(ctrl, goal_name):
    pubAutoCharge = rospy.Publisher(
        '/nav_ctrl', NavigationControl, queue_size=10)
    autoChargeMsg = NavigationControl()
    autoChargeMsg.control = ctrl
    autoChargeMsg.goal_name = goal_name
    pubAutoCharge.publish(autoChargeMsg)


class pubStates:
    def __init__(self):
        self.pub = rospy.Publisher(
            '/task_state', DiagnosticStatus, queue_size=10)
        self.stateMsg = DiagnosticStatus()
        self.stateMsg.name = "Tasks State Monitor"
        self.stateMsg.message = "value 0/1: running/stopping"
        self.stateMsg.values = list()

        self.addState("cartographer_node")
        self.addState("amcl")
        self.addState("move_base")
        self.addState("shelf_detector")

        # just need to add here new task state you want to monitor, e.g: self.addState("one REPRESENTATIVE node name of the task")

    def addState(self, stateName):
        stateNew = KeyValue()
        self.stateMsg.values.append(stateNew)
        self.stateMsg.values[-1].key = stateName
        self.stateMsg.values[-1].value = "0"

    def publishing(self):
        for i in range(len(self.stateMsg.values)):
            try:
                master = rosgraph.Master("")
                master.lookupNode(self.stateMsg.values[i].key)
                self.stateMsg.values[i].value = "1"
            except:
                self.stateMsg.values[i].value = "0"

        self.pub.publish(self.stateMsg)


# dynamicParameterSet(string, string, value)
def dynamicParameterSet(clien_name, parameter, value):
    client_recfg = dynamic_reconfigure.client.Client(clien_name)
    params = {parameter: value}
    recfg = client_recfg.update_configuration(params)


def getAMCLPose(parent_frame, child_frame):
    pose_x, pose_y, pose_theta = 0, 0, 0
    pose_quat = []
    # todo: Clearing TF buffer.
    buf = tf2_ros.Buffer()
    listener = tf2_ros.TransformListener(buf)
    rospy.sleep(1.0)
    try:
        tform = buf.lookup_transform(
            parent_frame, child_frame, rospy.Time(0), timeout=rospy.Duration(4))
        pose_x = tform.transform.translation.x
        pose_y = tform.transform.translation.y
        # _, _, pose_theta = tf.transformations.euler_from_quaternion(
        #     [tform.transform.rotation.x, tform.transform.rotation.y, tform.transform.rotation.z, tform.transform.rotation.w])
        pose_quat = tform.transform.rotation

        # print(pose_x, pose_y, pose_theta)
    except (tf2_ros.LookupException, tf2_ros.ConnectivityException, tf2_ros.ExtrapolationException) as e:
        print e
    return (pose_x, pose_y, pose_quat)


def pubAMCLPoseAMCLInitial(x, y, quat, time_pub_initial):
    pubInitial = rospy.Publisher(
        '/initialpose', PoseWithCovarianceStamped, queue_size=10)
    initialMsg = PoseWithCovarianceStamped()
    initialMsg.header.frame_id = "map"
    initialMsg.pose.pose.position.x = x
    initialMsg.pose.pose.position.y = y
    initialMsg.pose.pose.orientation = quat
    initialMsg.pose.covariance[0] = 0.25
    initialMsg.pose.covariance[7] = 0.25
    initialMsg.pose.covariance[-1] = 0.0685

    start_idx = 0
    while start_idx < time_pub_initial/0.2:
        pubInitial.publish(initialMsg)
        time.sleep(0.2)
        start_idx = start_idx + 1


def main():
    rospy.init_node('rosbridge_system')
    systemTaskSwitcher = systemTask()
    pub = pubStates()
    charge_reset = True
    # to do: TF_OLD_DATA caused by simulation environment: send an Empty message the topic /reset_time

    while not rospy.is_shutdown():
        # launch slam
        if systemTaskSwitcher.startSLAM and (systemTaskSwitcher.excutedSLAM == False):

            if systemTaskSwitcher.slamReset:
                slam_launch_path = slam_reset_launch_path
                print(
                    "\033[1;37;42m\t\t\trosbridge_system: SLAM reset mode\t\t\t\033[0m")
            elif systemTaskSwitcher.slamContinue:
                slam_launch_path = slam_continue_launch_path
                print(
                    "\033[1;37;42m\t\t\trosbridge_system: SLAM continue mode\t\t\t\033[0m")

            uuid = roslaunch.rlutil.get_or_generate_uuid(None, False)
            roslaunch.configure_logging(uuid)
            launch = roslaunch.parent.ROSLaunchParent(
                uuid, [slam_launch_path])

            try:
                launch.start()
                time.sleep(3)  # enough time for launch to complete
                print(
                    "\033[1;37;42m\t\t\trosbridge_system: SLAM is launched\t\t\t\033[0m")
                systemTaskSwitcher.excutedSLAM = True
            except:
                systemTaskSwitcher.excutedSLAM = False

            if systemTaskSwitcher.excutedSLAM:
                try:
                    # deactivate /base_laser for publish tf between /base_footprint and /base_laser
                    pubTaskSwitch('base_laser', 0, 2)
                    print(
                        "\033[1;37;44m\t rosbridge_system: setting task base_laser False within 2s \033[0m")

                    # deactivate /amcl node for publish tf between /map and /odom
                    dynamicParameterSet('amcl', 'tf_broadcast', False)
                    print(
                        "\033[1;37;44m\t rosbridge_system: setting AMCL tf False \033[0m")
                    # os.system("rosrun dynamic_reconfigure dynparam set /amcl tf_broadcast fasle")
                except:
                    pass
        # shutdown slam: (1)record slam pose                  (2)shutdown
        #                (3)recover tf of amcl and base_laser (4) publish slam pose to /initialpose
        if (systemTaskSwitcher.startSLAM == False) and systemTaskSwitcher.excutedSLAM:
            slam_laser_x, slam_laser_y, slam_laser_quat = getAMCLPose(
                'map', 'base_laser')
            print("\033[1;37;44m\t rosbridge_system: getting SLAM pose \033[0m")
            time.sleep(2)
            try:
                dynamicParameterSet('amcl', 'tf_broadcast', True)
                print(
                    "\033[1;37;44m\t rosbridge_system: setting AMCL tf True \033[0m")
                pubTaskSwitch('base_laser', 1, 2)
                print(
                    "\033[1;37;44m\t rosbridge_system: setting task base_laser True within 2s \033[0m")
            except:
                pass

            try:
                launch.shutdown()
                time.sleep(3)  # enough time for shutdown to complete
                print(
                    "\033[1;37;41m\t\t\trosbridge_system: SLAM is shutdown\t\t\t\033[0m")
                systemTaskSwitcher.excutedSLAM = False
                systemTaskSwitcher.slamReset = False
                systemTaskSwitcher.slamContinue = False
            except:
                systemTaskSwitcher.excutedSLAM = True

            # publish slam pose to /initialpose for amcl
            print(
                "\033[1;37;44m\t rosbridge_system: pulish AMCL pose to /initialpose within 2s \033[0m")
            pubAMCLPoseAMCLInitial(
                slam_laser_x, slam_laser_y, slam_laser_quat, 2)
            print(
                "\033[1;37;44m\t rosbridge_system: finish SLAM task \033[0m")

        if systemTaskSwitcher.startShelfDetector and (systemTaskSwitcher.excutedShelfDetector == False):
            uuid = roslaunch.rlutil.get_or_generate_uuid(None, False)
            roslaunch.configure_logging(uuid)
            launch_shelf = roslaunch.parent.ROSLaunchParent(
                uuid, [shelf_launch_path])
            try:
                launch_shelf.start()
                time.sleep(2)
                print(
                    "\033[1;37;42m\t\t\trosbridge_system: SHELF_DETECT is launched\t\t\t\033[0m")
                systemTaskSwitcher.excutedShelfDetector = True
            except:
                systemTaskSwitcher.excutedShelfDetector = False
        if systemTaskSwitcher.startShelfDetector == False and systemTaskSwitcher.excutedShelfDetector:
            try:
                launch_shelf.shutdown()
                time.sleep(2)
                print(
                    "\033[1;37;41m\t\t\trosbridge_system: SHELF_DETECT is shutdown\t\t\t\033[0m")
                systemTaskSwitcher.excutedShelfDetector = False
            except:
                systemTaskSwitcher.excutedShelfDetector = True

        if systemTaskSwitcher.battery_percentage < 0.2 and systemTaskSwitcher.navCtrlStatus == 'free' and charge_reset:
            pubAutoCharge(1, 'autocharge_on')
            charge_reset = False
            print('autocharge_on')
        if not charge_reset and systemTaskSwitcher.battery_percentage > 0.25:
            charge_reset = True

        # publish tasks state
        pub.publishing()

        # to do: Inbound TCP/IP connection
        time.sleep(0.1)

    try:
        rospy.spin()
    except KeyboardInterrupt:
        print "Shutting down..."


if __name__ == '__main__':
    # slam_reset_launch_path = "/home/zeng/catkin_ws/src/agv_stage_simulation/launch/agv_diff_drive_in_stage.launch"
    # slam_continue_launch_path = "/home/zeng/catkin_ws/src/robot_mrobot/mrobot_gazebo/launch/mrobot_laser_nav_gazebo.launch"
    # shelf_launch_path = "/home/zeng/catkin_ws/src/shelf_detector/launch/shelf_detector_example.launch"

    slam_reset_launch_path = "/tmp/.sor/quiz.cfg/slam.cfg"
    slam_continue_launch_path = "/tmp/.sor/quiz.cfg/slam_load.cfg"
    shelf_launch_path = "/tmp/.sor/quiz.cfg/shelf_detector.cfg"
    main()
