#!/usr/bin/env python

# subscribe to: /move_base/local_costmap/footprint
#               /raw_obstacles
#               /move_base_vel
# publish to :  /cmd_vel

# Author: lei.zeng@tu-dortmund.de

# 2019.03.16: detectFootprintCallback
#             dynamic_reconfigure: beta, if_get_footprint
# 2019.03.25: obstcale clearing when nothing in consideration
#             dynamic_reconfigure: if_specific_planner, local_planner

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
from geometry_msgs.msg import PolygonStamped


class ObstacleAvoidance:
    def __init__(self):
        # self.client = dynamic_reconfigure.client.Client(
        # "obstacle_avoidance", timeout=30, config_callback=self.clientCallback)
        self.srv = Server(DynReconf1Config, self.srvCallback)
        self.sub_footprint = rospy.Subscriber("/move_base/local_costmap/footprint", PolygonStamped,
                                              self.detectFootprintCallback, queue_size=10)
        self.sub_obstacles = rospy.Subscriber("/raw_obstacles", Obstacles,
                                              self.detectObstaclesCallback, queue_size=10)
        self.sub_vel = rospy.Subscriber("/move_base_vel", Twist,
                                        self.moveBaseVelCallback, queue_size=10)
        self.pub_vel = rospy.Publisher('/cmd_vel', Twist, queue_size=10)

        self.obstacle_consider_range = 10  # to robot center, to do

        # param: robot size
        self.robot_length = 0.5
        self.robot_width = 0.3
        # if_use_footprint must be initialized before paramUpdate()
        self.if_use_footprint = rospy.get_param(
            "/obstacle_avoidance/if_get_footprint", False)
        self.paramUpdate()
        self.shelf_slant_rad = rospy.get_param(
            "/obstacle_avoidance/shelf_slant_rad", 0.2)

        # param: wall setting (rad,degree):(0.1,6)(0.2,11)(0.3,17) (0.4, 23) (0.5,29) (0.6,34)
        self.wall_safe_slope = math.tan(0.3)

        # const
        self.min_circle_distance = 100
        self.min_line_distance = 100
        self.min_obstacle_distance = 100

    def detectFootprintCallback(self, footprintMsg):
        foot_points = footprintMsg.polygon.points
        if (len(foot_points)) == 4 and self.if_use_footprint:
            x = self.pointDistanceRobot(
                foot_points[0].x - foot_points[1].x, foot_points[0].y - foot_points[1].y)
            y = self.pointDistanceRobot(
                foot_points[1].x - foot_points[2].x, foot_points[1].y - foot_points[2].y)
            length = max(x, y)
            width = min(x, y)
            self.robot_length = 0.5*length
            self.robot_width = 0.5*width
        elif (len(foot_points)) != 4 and self.if_use_footprint:
            rospy.logerr('[ObstacleAvoidance]: Footprint is not square.')
        else:
            pass

    def paramUpdate(self):
        if not self.if_use_footprint:
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
        self.scale_beta = rospy.get_param("/obstacle_avoidance/beta", 0.7)

        self.if_use_footprint = rospy.get_param(
            "/obstacle_avoidance/if_get_footprint", False)

        self.if_fov_limit = rospy.get_param(
            "/obstacle_avoidance/if_view_limit", False)
        self.rad_start = rospy.get_param(
            "/obstacle_avoidance/start_rad", 0.0)
        self.rad_end = rospy.get_param(
            "/obstacle_avoidance/end_rad", 3.14)

        self.if_shelf_remove = rospy.get_param(
            "/obstacle_avoidance/if_shelf_leg_remove", False)

        self.if_certain_planner = rospy.get_param(
            "/obstacle_avoidance/if_specific_planner", True)
        self.navigation_local_planner = rospy.get_param(
            "/obstacle_avoidance/local_planner", "teb_local_planner/TebLocalPlannerROS")

        self.if_print_info = rospy.get_param(
            "/obstacle_avoidance/if_print_info", False)

    def srvCallback(self, config, level):
        return config

    def detectShelfLeg(self, circle_obstacle):
        distance_leg = self.pointDistanceRobot(
            circle_obstacle.center.x, circle_obstacle.center.y)
        distance_standard = self.pointDistanceRobot(
            self.robot_length, self.robot_width)
        rad_leg = self.pointRadRobot(
            circle_obstacle.center.x, abs(circle_obstacle.center.y))
        rad_standard = self.pointRadRobot(self.robot_length, self.robot_width)

        if_distance = ((distance_leg - distance_standard)**2 < 0.2**2)
        if_rad = ((rad_leg - rad_standard)**2 < 0.35**2)

        if if_distance and if_rad:
            return True
        else:
            return False

    def distance2Circles(self, circle1, circle2):
        distance = numpy.sqrt(pow(circle1.center.x - circle2.center.x, 2)
                              + pow(circle1.center.y - circle2.center.y, 2))
        # print (round(circle1.center.x, 2),round(circle1.center.y, 2), round(circle2.center.x, 2),round(circle2.center.y, 2),'dis=',distance)
        return distance

    def detectObstaclesCallback(self, obstaclesMsg):
        # print(
        #     "\033[1;37;41m\t---------------------CALLBACK-------------------------\t    \033[0m")
        self.paramUpdate()
        # (1) process circles
        circle_obstacles = list(obstaclesMsg.circles)
        # circle_obstacles = filter(lambda c: self.detectShelfLeg(c) == False and self.distanceCircleToRobotCenter(
        #     c) < self.obstacle_consider_range and self.rad_start < self.pointRadRobot(c.center.x, c.center.y) < self.rad_end, circle_obstacles)
        circle_obstacles = filter(lambda c:  self.distanceCircleToRobotCenter(
            c) < self.obstacle_consider_range, circle_obstacles)

        # print('\tinitial filter')
        # for c in circle_obstacles:
        #     print(round(c.center.x, 2), round(c.center.y, 2),
        #           round(c.center.z, 2), round(c.true_radius, 2))
        # print('--------------------------------------')
        if self.if_fov_limit:
            circle_obstacles = filter(lambda c:  self.rad_start < self.pointRadRobot(
                c.center.x, c.center.y) < self.rad_end, circle_obstacles)
            # print('FOV LIMITing')

        if self.if_shelf_remove:
            shelf_ypos = filter(
                lambda c: self.detectShelfLeg(c) == True and c.center.y > 0, circle_obstacles)
            shelf_ypos = sorted(shelf_ypos, key=lambda CircleObstacle:  numpy.sqrt(
                pow(CircleObstacle.center.x, 2) + pow(CircleObstacle.center.y, 2)))
            if len(shelf_ypos) >= 1:
                shelf_foot1 = shelf_ypos[0]
                circle_obstacles = filter(
                    lambda c: self.distance2Circles(c, shelf_foot1) > 0.02, circle_obstacles)
                # print('REMOVING ypos SHELF')
                # for c in circle_obstacles:
                #     print(round(c.center.x, 2), round(c.center.y, 2),
                #           round(c.center.z, 2), round(c.true_radius, 2))

            shelf_yneg = filter(
                lambda c: self.detectShelfLeg(c) == True and c.center.y < 0, circle_obstacles)
            shelf_yneg = sorted(shelf_yneg, key=lambda CircleObstacle:  numpy.sqrt(
                pow(CircleObstacle.center.x, 2) + pow(CircleObstacle.center.y, 2)))
            if len(shelf_yneg) >= 1:
                shelf_foot2 = shelf_yneg[0]
                circle_obstacles = filter(
                    lambda c: self.distance2Circles(c, shelf_foot2) > 0.02, circle_obstacles)
                # print('REMOVING yneg SHELF')
                # for c in circle_obstacles:
                #     print(round(c.center.x, 2), round(c.center.y, 2),
                #           round(c.center.z, 2), round(c.true_radius, 2))

            # circle_obstacles = filter(
            #     lambda c: self.detectShelfLeg(c) == False, circle_obstacles)
            try:
                ratio_shelf = (shelf_foot1.center.x - shelf_foot2.center.x) / \
                    (shelf_foot1.center.y - shelf_foot2.center.y)
                shelf_yaw = math.atan2(ratio_shelf, 1)
                shelf_rmin = min(shelf_foot1.true_radius,
                                 shelf_foot2.true_radius)
                shelf_rmax = max(shelf_foot1.true_radius,
                                 shelf_foot2.true_radius)
                if abs(shelf_yaw) > self.shelf_slant_rad and shelf_rmin/shelf_rmax > 0.6:
                    rospy.logerr(
                        '[ObstacleAvoidance]: shelf on agv is slant')
            except:
                pass

        if len(circle_obstacles) > 0:
            circle_distances = map(
                self.distanceCircleToRobotCenter, circle_obstacles)
            self.min_circle_distance = min(circle_distances)
        else:
            self.min_circle_distance = 98

        # (2) process lines:
        line_obstacles = list(obstaclesMsg.segments)
        line_obstacles = filter(lambda l: self.distanceLineToRobotCenter(
            l) < self.obstacle_consider_range and self.wallSide(l) == False and self.lineDirectionDelete(l) == False, line_obstacles)
        if len(line_obstacles) > 0:
            line_distances = map(
                self.distanceLineToRobotCenter, line_obstacles)
            self.min_line_distance = min(line_distances)
        else:
            self.min_line_distance = 99

        self.min_obstacle_distance = min(
            self.min_circle_distance, self.min_line_distance)

        if self.if_print_info:
            print('\t')
            print('O_min:', round(self.min_circle_distance, 2),  'L_min', round(
                self.min_line_distance, 2), 'min_dist:', round(self.min_obstacle_distance, 2))
            print('robot_half_len:', round(self.robot_length, 2),
                  'robot_half_width:', round(self.robot_width, 2))
            print('stop_dist:', round(self.stop_distance, 2),  'dec_dist', round(
                self.decelerate_distance, 2), 'beta:', round(self.scale_beta, 2))

    def pointDistanceRobot(self, x, y):
        return numpy.sqrt(x**2 + y**2)

    def pointRadRobot(self, y, x):
        # -3.13 ~ 3.14
        return math.atan2(y, x)

    def scaledDistanceRatio(self, x, y):
        # to do
        cos_phi = x/self.denominatorZero(numpy.sqrt(x**2 + y**2))
        cos_phi = abs(cos_phi)
        ratio = (1-self.scale_beta*cos_phi) / \
            self.denominatorZero(1-self.scale_beta)
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
        intersection_x = b/self.denominatorZero(-k-1.0/self.denominatorZero(k))
        intersection_y = -1.0/self.denominatorZero(k * intersection_x)
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
        k = (line_obstacle.last_point.y - line_obstacle.first_point.y) / \
            self.denominatorZero(delta_x)
        return k

    def denominatorZero(self, d):
        numd = d
        if d == 0:
            numd = 0.0001
        if -0.001 < d < 0:
            numd = -0.001
        if 0 < d < 0.001:
            numd = 0.001
        return numd

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
        local_planner_using = rospy.get_param("/move_base/base_local_planner")
        # print(self.if_certain_planner, self.navigation_local_planner, local_planner_using)
        if (not self.if_certain_planner) or(self.if_certain_planner and local_planner_using == self.navigation_local_planner):
            # print('obstacle avoidance')
            if self.stop_distance < self.min_obstacle_distance <= self.decelerate_distance:
                twist_avoidace.linear.x = navVelMsg.linear.x * \
                    (self.min_obstacle_distance-self.stop_distance/2.0) / \
                    self.denominatorZero(self.decelerate_distance)
                twist_avoidace.angular.z = navVelMsg.angular.z
                rospy.logwarn('[ObstacleAvoidance]: slow down')
            elif self.min_obstacle_distance <= self.stop_distance:
                twist_avoidace.linear.x = 0
                twist_avoidace.angular.z = navVelMsg.angular.z
                rospy.logwarn('[ObstacleAvoidance]: stop')
                if navVelMsg.linear.x < 0:
                    twist_avoidace.linear.x = 0.8*navVelMsg.linear.x
                if self.min_obstacle_distance < self.fatal_distance:
                    twist_avoidace.angular.z = navVelMsg.angular.z*0.5
                    rospy.logwarn('[ObstacleAvoidance]: total stop')
            else:
                # if abs(navVelMsg.angular.z) < 0.05:
                #     navVelMsg.angular.z = 0.0
                twist_avoidace = navVelMsg
        else:
            # print('NO obstacle avoidance')
            twist_avoidace = navVelMsg
        if self.if_print_info:
            print('-------------')
            print('move_base cmd:', round(navVelMsg.linear.x, 2),
                  round(navVelMsg.angular.z, 2))
            print('obstacle_cmd: ', round(twist_avoidace.linear.x, 2),
                  round(twist_avoidace.angular.z, 2))
        self.pub_vel.publish(twist_avoidace)


def main():
    rospy.init_node('obstacle_avoidance')
    obstacle_avoidance = ObstacleAvoidance()
    try:
        rospy.spin()
    except KeyboardInterrupt:
        print "Shutting down"


if __name__ == '__main__':
    main()
