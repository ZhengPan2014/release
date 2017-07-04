#! /usr/bin/env python
#***********************************************************

import roslib
import yaml
import PyKDL
import rospy
from nav_msgs.msg import Odometry
from geometry_msgs.msg import Twist
from base_calibration.msg import ScanAngle
from math import *
import threading
import os
import subprocess

class CalibrateRobot:
    def __init__(self):
        self.lock = threading.Lock()

        self.sub_odom = rospy.Subscriber('odom', Odometry, self.odom_cb)
        self.sub_scan = rospy.Subscriber('scan_angle', ScanAngle, self.scan_cb)
        self.cmd_pub = rospy.Publisher('cmd_vel', Twist, queue_size=10)

        self.odom_time = rospy.Time()
        self.scan_time = rospy.Time()
        
        self.scan_angle = 0
        self.range_to_wall = 0
        self.scan_time = rospy.Time.now()
        self.odom_x = 0
        self.odom_y = 0
        self.odom_time = rospy.Time.now()

    def calibrate(self, speed):
        # rotate 360 degrees
        (odom_start_x, odom_start_y, scan_start_angle, scan_start_range,
         odom_start_time, scan_start_time) = self.sync_timestamps()
        last_x = odom_start_x
        last_y = odom_start_y
       
        if (scan_start_range > 1.5 and scan_start_range < 6.0):
	        linear_range = 0
	        while abs(linear_range) < 1.0:
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

	        (odom_end_x, odom_end_y, scan_end_angle, scan_end_range,
	         odom_end_time, scan_end_time) = self.sync_timestamps()

	        scan_scale = (scan_start_range - scan_end_range) * cos(scan_start_angle)
	        odom_scale = sqrt((odom_end_x - odom_start_x) * (odom_end_x - odom_start_x) + 
	                          (odom_end_y - odom_start_y) * (odom_end_y - odom_start_y))

        else:
        	rospy.logerr("Too close to the wall, the range should be over 1.5m.")
        
        return (odom_scale/scan_scale)

    def sync_timestamps(self, start_time=None):
        if not start_time:
            start_time = rospy.Time.now() + rospy.Duration(0.5)
        while not rospy.is_shutdown():
            rospy.sleep(0.3)
            with self.lock:
                if self.odom_time < start_time:
                    rospy.loginfo("Still waiting for odom")
                elif self.scan_time < start_time:
                    rospy.loginfo("Still waiting for scan")
                else:
                    return (self.odom_x, self.odom_y, self.scan_angle, 
                    	self.range_to_wall,self.odom_time, self.scan_time)
        exit(0)
        
    def odom_cb(self, msg):
        with self.lock:
            self.odom_x = msg.pose.pose.position.x
            self.odom_y = msg.pose.pose.position.y
            self.odom_time = msg.header.stamp

    def scan_cb(self, msg):
        with self.lock:
            self.scan_angle = msg.scan_angle
            self.range_to_wall = msg.scan_range
            self.scan_time = msg.header.stamp
    
def main():
    rospy.init_node('ratio_calibrate')
    robot = CalibrateRobot()
   
    speed = 0.1
    cal_ratio = robot.calibrate(speed)

    prev_ratio = rospy.get_param("~prev_wheel_ratio", 23333.0)
    rospy.loginfo("previous wheel ratio is %f"%prev_ratio)
    odom_res = prev_ratio *  cal_ratio
    rospy.loginfo("Set the 'wheel_ratio' parameter to %f"%odom_res)

if __name__ == '__main__':
    main()
