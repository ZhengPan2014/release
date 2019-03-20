#!/usr/bin/env python

# Author: lei.zeng@tu-dortmund.de

import rospy
import math
from sensor_msgs.msg import LaserScan
from geometry_msgs.msg import Twist
from obstacle_detector.msg import Obstacles
import numpy
import operator
from dynamic_reconfigure.server import Server
from obstacle_avoidance.cfg import DynReconf1Config
import dynamic_reconfigure.client


class ObstacleAvoidance:
    def __init__(self):
        # self.client = dynamic_reconfigure.client.Client(
        # "obstacle_avoidance", timeout=30, config_callback=self.clientCallback)
        self.srv = Server(DynReconf1Config, self.srvCallback)
        self.sub_obstacles = rospy.Subscriber("/raw_obstacles", Obstacles,
                                              self.detectObstaclesCallback, queue_size=10)
        self.sub_obstacles = rospy.Subscriber("/move_base_vel", Twist,
                                              self.moveBaseVelCallback, queue_size=10)
        self.pub_vel = rospy.Publisher('/cmd_vel_rectified', Twist, queue_size=10)

        # rospy.get_param("navigation_local_planner")
        self.navigation_local_planner = rospy.get_param(
            "navigation_local_planner", "teb_local_planner/TebLocalPlannerROS")

        self.obstacle_consider_range = 2.5  # to robot center, to do
        # param: robot size
        self.robot_length = 0.5
        self.robot_width = 0.3

        # param: wall setting (rad,degree):(0.1,6)(0.2,11)(0.3,17) (0.4, 23) (0.5,29) (0.6,34)
        self.wall_safe_distance = 0.3
        self.wall_safe_slope = math.tan(0.3)

        # param: common setting
        self.decelerate_distance = 1.5
        self.stop_distance = 0.5
        self.fatal_distance = self.stop_distance/2.0 + self.robot_length
        # const
        self.rad_start = 0.6
        self.rad_end = 2.5
        self.scale_beta = 0.60  # (0,1]
        self.min_circle_distance = 100
        self.min_line_distance = 100
        self.min_obstacle_distance = 100

    def paramUpdate(self):
        self.robot_length = rospy.get_param(
            "/obstacle_avoidance/robot_half_length", 0.5)
        self.robot_width = rospy.get_param(
            "/obstacle_avoidance/robot_half_width", 0.3)

        self.wall_safe_distance = rospy.get_param(
            "/obstacle_avoidance/wall_safe_distance", 0.3)
        self.wall_safe_distance = self.wall_safe_distance + self.robot_width

        self.decelerate_distance = rospy.get_param(
            "/obstacle_avoidance/decelerate_distance", 1.0)
        self.decelerate_distance = self.decelerate_distance + self.robot_length

        self.stop_distance = rospy.get_param(
            "/obstacle_avoidance/stop_distance", 0.5)
        self.stop_distance = self.stop_distance + self.robot_length

        self.fatal_distance = (
            self.stop_distance-self.robot_length)/2.0 + self.robot_length
       
    def srvCallback(self, config, level):
        return config
    # def clientCallback(self,config):
    #     self.robot_length = "{robot_half_length}".format(**config)
    #     print self.robot_length

    def detectObstaclesCallback(self, obstaclesMsg):
        self.paramUpdate()
        # (1) process circles
        circle_obstacles = list(obstaclesMsg.circles)
        circle_obstacles = filter(lambda c: self.distanceCircleToRobotCenter(
            c) < self.obstacle_consider_range and self.rad_start < self.pointRadRobot(c.center.x, c.center.y) < self.rad_end, circle_obstacles)

        if len(circle_obstacles) > 0:
            circle_distances = map(
                self.distanceCircleToRobotCenter, circle_obstacles)
            self.min_circle_distance = min(circle_distances)

        # (2) process lines:
        line_obstacles = list(obstaclesMsg.segments)
        line_obstacles = filter(lambda l: self.distanceLineToRobotCenter(
            l) < self.obstacle_consider_range and self.wallSide(l) == False and self.lineDirectionDelete(l) == False, line_obstacles)
        if len(line_obstacles) > 0:
            line_distances = map(
                self.distanceLineToRobotCenter, line_obstacles)
            self.min_line_distance = min(line_distances)

        self.min_obstacle_distance = min(
            self.min_circle_distance, self.min_line_distance)
        # print ('O:', format(self.min_circle_distance, '0.2f'), 'L:', format(self.min_line_distance, '0.2f'),
        #        format(self.min_obstacle_distance, '0.2f'), self.robot_length, self.stop_distance, self.decelerate_distance)

    def pointDistanceRobot(self, x, y):
        return numpy.sqrt(x**2 + y**2)

    def pointRadRobot(self, y, x):
        # -3.13 ~ 3.14
        return math.atan2(y, x)

    def scaledDistanceRatio(self, x, y):
        # to do
        cos_phi = x/numpy.sqrt(x**2 + y**2)
        cos_phi = abs(cos_phi)
        ratio = (1-self.scale_beta*cos_phi)/(1-self.scale_beta)
        return ratio

    def distanceCircleToRobotCenter(self, circle_obstacle):
        distance_circle = self.pointDistanceRobot(
            circle_obstacle.center.x, circle_obstacle.center.y) - circle_obstacle.true_radius
        scale_ratio = self.scaledDistanceRatio(
            circle_obstacle.center.x, circle_obstacle.center.y)
        return distance_circle*scale_ratio

    def distanceLineToRobotCenter(self, line_obstacle):
        # line obstacle: y = kx + b
        # line_obstacle.last_point.y = float(line_obstacle.last_point.y)
        # k = (line_obstacle.last_point.y - line_obstacle.first_point.y) / \
        #     (line_obstacle.last_point.x - line_obstacle.first_point.x)
        k = self.line_slope(line_obstacle)
        b = line_obstacle.first_point.y - k*line_obstacle.first_point.x
        intersection_x = b/(-k-1.0/k)
        intersection_y = -1.0/k * intersection_x
        if intersection_x < min(line_obstacle.last_point.x, line_obstacle.first_point.x) or intersection_x > max(line_obstacle.last_point.x, line_obstacle.first_point.x):
            distance_line = min(self.pointDistanceRobot(line_obstacle.first_point.x, line_obstacle.first_point.y),
                                self.pointDistanceRobot(line_obstacle.last_point.x, line_obstacle.last_point.y))
            if self.pointDistanceRobot(line_obstacle.first_point.x, line_obstacle.first_point.y) < self.pointDistanceRobot(line_obstacle.last_point.x, line_obstacle.last_point.y):
                scale_ratio = self.scaledDistanceRatio(
                    line_obstacle.first_point.x, line_obstacle.first_point.y)
            else:
                scale_ratio = self.scaledDistanceRatio(
                    line_obstacle.last_point.x, line_obstacle.last_point.y)

        else:
            distance_line = self.pointDistanceRobot(
                intersection_x, intersection_y)
            scale_ratio = self.scaledDistanceRatio(
                intersection_x, intersection_y)
        return distance_line*scale_ratio

    def lineDirectionDelete(self, line_obstacle):
        logic_start = (self.rad_start < self.pointRadRobot(
            line_obstacle.first_point.x, line_obstacle.first_point.y) < self.rad_end)
        logic_end = (self.rad_start < self.pointRadRobot(
            line_obstacle.last_point.x, line_obstacle.last_point.y) < self.rad_end)
        # print('the direction: ',logic_start,self.pointRadRobot(line_obstacle.first_point.x, line_obstacle.first_point.y),
        #      logic_end,self.pointRadRobot(line_obstacle.last_point.x, line_obstacle.last_point.y))
        if (not logic_start)and (not logic_end) and line_obstacle.first_point.y*line_obstacle.last_point.y > 0:
            return True
        else:
            return False

    def wallLength(self, line_obstacle):
        delta_x = line_obstacle.first_point.x - line_obstacle.last_point.x
        delta_y = line_obstacle.first_point.y - line_obstacle.last_point.y
        return numpy.sqrt(delta_x**2 + delta_y**2)

    def line_slope(self, line_obstacle):
        line_obstacle.last_point.y = float(line_obstacle.last_point.y)
        delta_x = line_obstacle.last_point.x - line_obstacle.first_point.x
        if abs(delta_x) < 0.01:
            delta_x = 0.01*(delta_x)/abs(delta_x)
        k = (line_obstacle.last_point.y - line_obstacle.first_point.y) / delta_x
        return k

    def wallSide(self, line_obstacle):
        wall_distance = self.distanceLineToRobotCenter(line_obstacle)
        if (wall_distance > self.wall_safe_distance
                and abs(self.line_slope(line_obstacle)) < self.wall_safe_slope):
            # rospy.loginfo(
            #     "side WALL in considered range and out of safe distance (%fm).", self.wall_safe_distance)
            return True
        else:
            return False

    def moveBaseVelCallback(self, navVelMsg):
        twist_avoidace = Twist()
        local_planner = rospy.get_param("/move_base/base_local_planner")
        if local_planner == self.navigation_local_planner:
            if self.stop_distance < self.min_obstacle_distance <= self.decelerate_distance:
                twist_avoidace.linear.x = navVelMsg.linear.x * \
                    (self.min_obstacle_distance-self.stop_distance/2.0) / \
                    (self.decelerate_distance)
                twist_avoidace.angular.z = navVelMsg.angular.z
                rospy.logwarn('slow down')
            elif self.min_obstacle_distance <= self.stop_distance:
                twist_avoidace.linear.x = 0
                twist_avoidace.angular.z = navVelMsg.angular.z
                rospy.logwarn('stop')
                if navVelMsg.linear.x < 0:
                    twist_avoidace.linear.x = 0.8*navVelMsg.linear.x
                if self.min_obstacle_distance < self.fatal_distance:
                    twist_avoidace.angular.z = navVelMsg.angular.z*0.5
                    rospy.logwarn('total stop')
            else:
                # if abs(navVelMsg.angular.z) < 0.05:
                #     navVelMsg.angular.z = 0.0
                twist_avoidace = navVelMsg
        else:
            twist_avoidace = navVelMsg
        self.pub_vel.publish(twist_avoidace)
        print(self.stop_distance, self.decelerate_distance)


def main():
    rospy.init_node('obstacle_avoidance')
    obstacle_avoidance = ObstacleAvoidance()
    try:
        rospy.spin()
    except KeyboardInterrupt:
        print "Shutting down"


if __name__ == '__main__':
    main()
