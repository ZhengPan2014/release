#! /usr/bin/env python
#***********************************************************

import roslib
import rospy
from nav_msgs.msg import Odometry
from geometry_msgs.msg import Twist
from geometry_msgs.msg import Pose2D
from math import *
import threading

class CalibrateRobot:
    def __init__(self):
        self.lock = threading.Lock()

        self.sub_odom = rospy.Subscriber('odom', Odometry, self.odom_cb)
        self.sub_pose = rospy.Subscriber('pose2D', Pose2D, self.pose_cb)
        self.cmd_pub = rospy.Publisher('cmd_vel', Twist, queue_size=10)

        self.odom_time = rospy.Time()
        self.scan_time = rospy.Time()
        
        self.pose_x = 0
        self.pose_y = 0
  
        self.odom_x = 0
        self.odom_y = 0
        self.odom_time = rospy.Time.now()

    def calibrate(self, speed):
        # rotate 360 degrees
        (odom_start_x, odom_start_y, pose_start_x, pose_start_y, odom_start_time) = self.sync_timestamps()
        last_x = odom_start_x
        last_y = odom_start_y
       
        linear_range = 0
        while abs(linear_range) < 0.5:
            if rospy.is_shutdown():
                return
            cmd = Twist()
            cmd.linear.x = speed
            self.cmd_pub.publish(cmd)
            rospy.sleep(0.1)
            with self.lock:
                delta_range = sqrt((self.odom_x - last_x) * (self.odom_x - last_x) + 
                                   (self.odom_y - last_y) * (self.odom_y - last_y))
            linear_range += delta_range
            last_x = self.odom_x
            last_y = self.odom_y
        self.cmd_pub.publish(Twist())

        (odom_end_x, odom_end_y, pose_end_x, pose_end_y, odom_end_time) = self.sync_timestamps()

        pose_scale = sqrt((pose_end_x - pose_start_x) * (pose_end_x - pose_start_x) + 
                          (pose_end_y - pose_start_y) * (pose_end_y - pose_start_y))
        odom_scale = sqrt((odom_end_x - odom_start_x) * (odom_end_x - odom_start_x) + 
                          (odom_end_y - odom_start_y) * (odom_end_y - odom_start_y))
        
        return (odom_scale/pose_scale)

    def sync_timestamps(self, start_time=None):
        if not start_time:
            start_time = rospy.Time.now() + rospy.Duration(0.5)
        while not rospy.is_shutdown():
            rospy.sleep(0.3)
            with self.lock:
                if self.odom_time < start_time:
                    rospy.loginfo("Still calibrating")
                else:
                    return (self.odom_x, self.odom_y, self.pose_x, 
                    	self.pose_y,self.odom_time)
        exit(0)
        
    def odom_cb(self, msg):
        with self.lock:
            self.odom_x = msg.pose.pose.position.x
            self.odom_y = msg.pose.pose.position.y
            self.odom_time = msg.header.stamp

    def pose_cb(self, msg):
        with self.lock:
            self.pose_x = msg.x
            self.pose_y = msg.y
    
def main():
    rospy.init_node('csm_ratio_calibration')
    robot = CalibrateRobot()
   
    speed = 0.1
    cal_ratio = robot.calibrate(speed)

    prev_ratio = rospy.get_param("~prev_wheel_ratio", 23333.0)
    rospy.loginfo("previous wheel ratio is %f"%prev_ratio)
    odom_res = prev_ratio *  cal_ratio
    rospy.loginfo("Set the 'wheel_ratio' parameter to %f"%odom_res)

if __name__ == '__main__':
    main()
