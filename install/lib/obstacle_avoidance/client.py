#!/usr/bin/env python

import rospy

import dynamic_reconfigure.client


def callback(config):
    rospy.loginfo("Config set to {robot_half_length}, {robot_half_width}, {wall_safe_distance}, {decelerate_distance}, {stop_distance}".format(**config))
    a = "{robot_half_length}".format(**config)
    print a


if __name__ == "__main__":
    rospy.init_node("dynamic_client")

    client = dynamic_reconfigure.client.Client(
        "obstacle_avoidance", timeout=30, config_callback=callback)

    r = rospy.Rate(0.1)
    x = 0
    b = False
    while not rospy.is_shutdown():
        x = x+1
        r.sleep()
