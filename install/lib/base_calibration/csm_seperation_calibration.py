#! /usr/bin/env python
#***********************************************************

import roslib
import PyKDL
import rospy
from nav_msgs.msg import Odometry
from geometry_msgs.msg import Twist
from geometry_msgs.msg import Pose2D
from math import *
import threading

### yaw [-pi, pi] ####
def quat_to_angle(quat):
    rot = PyKDL.Rotation.Quaternion(quat.x, quat.y, quat.z, quat.w)
    return rot.GetRPY()[2]

def normalize_angle(angle):
    res = angle
    while res > pi:
        res -= 2.0*pi
    while res < -pi:
        res += 2.0*pi
    return res

class CalibrateRobot:
    def __init__(self):
        self.lock = threading.Lock()

        self.sub_odom = rospy.Subscriber('odom', Odometry, self.odom_cb)
        self.sub_pose = rospy.Subscriber('pose2D', Pose2D, self.pose_cb)
        self.cmd_pub = rospy.Publisher('cmd_vel', Twist, queue_size=10)

        self.odom_time = rospy.Time()
        self.scan_time = rospy.Time()
        
        self.pose_theta = 0
    
        self.odom_angle = 0
        self.odom_time = rospy.Time.now()

    def calibrate(self, speed):
        # rotate 360 degrees
        (odom_start_angle, pose_start_angle, odom_start_time) = self.sync_timestamps()
        last_angle = odom_start_angle
       
        turn_angle = 0
        while abs(turn_angle) < 2*pi:
            if rospy.is_shutdown():
                return
            cmd = Twist()
            cmd.angular.z = speed
            self.cmd_pub.publish(cmd)
            rospy.sleep(0.1)
            with self.lock:
                delta_angle = normalize_angle(self.odom_angle - last_angle)
            turn_angle += delta_angle
            last_angle = self.odom_angle
        self.cmd_pub.publish(Twist())

        (odom_end_angle, pose_end_angle, odom_end_time) = self.sync_timestamps()

        if speed > 0.0:
	        pose_delta = 2*pi + normalize_angle(pose_end_angle - pose_start_angle)
	        odom_delta = 2*pi + normalize_angle(odom_end_angle - odom_start_angle)
        else:
	        pose_delta = -2*pi + normalize_angle(pose_end_angle - pose_start_angle)
	        odom_delta = -2*pi + normalize_angle(odom_end_angle - odom_start_angle)
        rospy.loginfo('Odom error: %f percent'%(100.0*((odom_delta/pose_delta)-1.0)))


        return (odom_delta/pose_delta)

    def sync_timestamps(self, start_time=None):
        if not start_time:
            start_time = rospy.Time.now() + rospy.Duration(0.5)
        while not rospy.is_shutdown():
            rospy.sleep(0.3)
            with self.lock:
                if self.odom_time < start_time:
                    rospy.loginfo("Still calibrating")
                else:
                    return (self.odom_angle, self.pose_theta, self.odom_time)
        exit(0)
        
    def odom_cb(self, msg):
        with self.lock:
            angle = quat_to_angle(msg.pose.pose.orientation)
            self.odom_angle = angle
            self.odom_time = msg.header.stamp

    def pose_cb(self, msg):
        with self.lock:
            self.pose_theta = msg.theta
    
def main():
    rospy.init_node('csm_seperation_calibration')
    robot = CalibrateRobot()
   
    odom_corr = []
    for speed in (0.3, 0.7, 1.0, 1.5):
        odom = robot.calibrate(speed)

        odom_corr.append(odom)

    prev_odom = rospy.get_param("~prev_wheel_tracker", 0.428)
    rospy.loginfo("previous wheel tracker is %f"%prev_odom)


    odom_res = prev_odom *  (sum(odom_corr)/len(odom_corr))
    rospy.loginfo("Set the 'wheel_separation' parameter to %f"%odom_res)

if __name__ == '__main__':
    main()
