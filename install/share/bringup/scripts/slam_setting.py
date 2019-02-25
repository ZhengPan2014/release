#!/usr/bin/env python
import rospy
import os

if __name__ == '__main__':
    rospy.init_node('slam_setting')
    os.system("rosnode kill base_laser")
