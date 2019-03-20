#!/usr/bin/env python

import rospy

from dynamic_reconfigure.server import Server
from obstacle_avoidance.cfg import DynReconf1Config

def callback(config, level):
    # rospy.loginfo("""Reconfigure Request: {robot_half_length}, {robot_half_width},\ 
    #       {wall_safe_distance}, {decelerate_distance}, {stop_distance}""".format(**config))
    return config

if __name__ == "__main__":
    rospy.init_node("obstacle_avoidance", anonymous = False)

    srv = Server(DynReconf1Config, callback)
    rospy.spin()