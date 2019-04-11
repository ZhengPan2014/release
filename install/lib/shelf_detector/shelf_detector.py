#!/usr/bin/env python

# subscribe to topic: /raw_obstacles
#                     /odom
# publish to topic:   NONE
# privide tf:         base_link -> shelf_current
#                     odom -> base_shelf

# 2019.03.26 : extractFullRectangle, extractHalfRectangle

# Author: lei.zeng@tu-dortmund.de

import rospy
import time
import rosgraph
import math
import tf
import tf2_ros
import operator
import numpy
import os
from geometry_msgs.msg import Twist, Quaternion
from tf.transformations import quaternion_from_euler
from obstacle_detector.msg import Obstacles
from nav_msgs.msg import Odometry
import dynamic_reconfigure.client


class ShelfDetect:
    def __init__(self):
        # shelf size settings
        self.at_least_full_rec = rospy.get_param(
            "/shelf_detector/shelf_at_least_four", True)
        self.at_least_half_rec = rospy.get_param(
            "/shelf_detector/shelf_at_least_three", False)
        self.size_informed = rospy.get_param(
            "/shelf_detector/shelf_size_informed", False)
        self.shelf_footprint = rospy.get_param(
            "/shelf_detector/set_shelf_footprint", False)
        self.length = rospy.get_param(
            "/shelf_detector/shelf_front_rear", 2.2)  # including radius
        self.width = rospy.get_param("/shelf_detector/shelf_left_right", 1.3)

        self.diagonal = numpy.sqrt(self.width**2 + self.length**2)
        self.radius = rospy.get_param("/shelf_detector/leg_radius", 0.1)

        # tolerance settings
        self.edge_tolerance = rospy.get_param(
            "/shelf_detector/edge_tolerance", 0.05)
        self.right_angle_tolerance = rospy.get_param(
            "/shelf_detector/right_angle_tolerance", 0.08)
        self.timeout = 10.0
        self.radius_tolerance = 0.1
        self.horizontal_rad = rospy.get_param(
            "/shelf_detector/horizontal_criterion", 0.38)
        self.vertical_rad = rospy.get_param(
            "/shelf_detector/vertical_criterion", 1.19)

        self.odom_x = 0
        self.odom_y = 0
        self.odom_x_initial = float('inf')
        self.odom_y_initial = float('inf')
        self.last_tx = 0
        self.last_ty = 0
        self.last_yaw = 0
        self.time_start = time.time()

        self.front_x_initial = float('inf')
        self.rear_x_initial = float('inf')

        self.init_len_detect = not self.size_informed
        self.init_wid_detect = not self.size_informed
        self.length_detect = []
        self.width_detect = []

        self.sub_shelf = rospy.Subscriber("/raw_obstacles", Obstacles,
                                          self.detectShelfFeetCallback, queue_size=10)
        self.sub_odom = rospy.Subscriber("/odom", Odometry,
                                         self.detectOdomCallback, queue_size=10)

    def distance2Feet(self, foot1, foot2):
        distance = numpy.sqrt(pow(foot1.center.x - foot2.center.x, 2)
                              + pow(foot1.center.y - foot2.center.y, 2))
        return distance

    def feetSlope(self, foot1, foot2):
        delta_x = foot1.center.x - foot2.center.x
        delta_y = foot1.center.y - foot2.center.y
        return delta_x/self.denominatorZero(delta_y)

    def feetRelation(self, foot1, foot2):
        if abs(self.feetSlope(foot1, foot2)) < math.tan(self.horizontal_rad) \
                and abs(self.distance2Feet(foot1, foot2) - self.length) < self.edge_tolerance:
            return "horizontal"  # 20 degree
        elif abs(self.feetSlope(foot1, foot2)) > math.tan(self.vertical_rad)\
                and abs(self.distance2Feet(foot1, foot2) - self.width) < self.edge_tolerance:
            return "vertical"  # 70 degree
        else:
            return "unsure"

    def robotDisplacement(self, x, y):
        delta_odomx = self.odom_x - self.odom_x_initial
        delta_odomy = self.odom_y - self.odom_y_initial
        return numpy.sqrt(delta_odomx**2 + delta_odomy**2)

    def pointDistanceRobot(self, x, y):
        return numpy.sqrt(x**2 + y**2)

    def neighourDistanceRelation(self, foot, feet, l, w, d, e):
        res = False
        for f in feet:
            if (abs(self.distance2Feet(foot, f) - l) < e and self.feetRelation(foot, f) == "horizontal")   \
                    or (abs(self.distance2Feet(foot, f) - w) < e + self.init_wid_detect*0.3 and self.feetRelation(foot, f) == "vertical") \
                    or (abs(self.distance2Feet(foot, f) - d) < e*1.5 and self.feetRelation(foot, f) == "unsure"):
                res = True
        return res

    def listNormalization(self, lst):
        # lst is sorted!
        if len(lst) >= 3 and lst[1]-lst[0] > 0.1:
            lst.pop(0)
            print('listNormalization!')
        if len(lst) >= 3 and lst[-1]-lst[-2] > 0.1:
            lst.pop(-1)
            print('listNormalization!')
        if len(lst) >= 3 and lst[1]-lst[0] > 0.1:
            lst.pop(0)
            print('listNormalization!')
        if len(lst) >= 3 and lst[-1]-lst[-2] > 0.1:
            lst.pop(-1)
            print('listNormalization!')
        return lst

    def denominatorZero(self, d):
        numd = d
        if d == 0:
            numd = 0.0001
        if -0.001 < d < 0:
            numd = -0.001
        if 0 < d < 0.001:
            numd = 0.001
        return numd

    def detectOdomCallback(self, data_odom):
        if self.odom_x_initial == float('inf'):
            self.odom_x_initial = data_odom.pose.pose.position.x
            self.odom_y_initial = data_odom.pose.pose.position.y
            # print("\133[0;32;40m\todom initial:\033[0m")
            # print(self.odom_x_initial, self.odom_y_initial)
        self.odom_x = data_odom.pose.pose.position.x
        self.odom_y = data_odom.pose.pose.position.y

    def detectShelfFeetCallback(self, data_feet):
        # print("\033[1;37;41m\t\t\tCALLBACK\t\t\t\033[0m")
        feet_frame = data_feet.header.frame_id
        feet = list(data_feet.circles)

        feet = sorted(feet, key=lambda CircleObstacle: CircleObstacle.center.x)

        # -------- rough filter: 1) distance to robot 2) back direction --------
        feet = filter(lambda f: self.pointDistanceRobot(f.center.x, f.center.y) < 6
                      and -2 < f.center.x < 4 and abs(f.center.y) < 1.5, feet)
        # print('\tpending after rough filter: ')
        # for f in feet:
        #     print(round(f.center.x, 2), round(f.center.y, 2),
        #           round(f.center.z, 2), round(f.true_radius, 2))
        # print('-----------------------------------------')

        # -------- get shelf size --------
        if not self.size_informed and self.init_len_detect:
            init_full_rectangle = False
            init_half_rectangle = False
            feet_shelf_size = sorted(feet, key=lambda CircleObstacle: numpy.sqrt(pow(CircleObstacle.center.x, 2)
                                                                                 + pow(CircleObstacle.center.y, 2)))
            if len(feet) <= 2:
                rospy.logwarn('no enough info to judge shelf size')
                return
            if len(feet) >= 4:
                rec_to_robot = 100
                for a in range(0, len(feet)-3):
                    for b in range(a+1, len(feet)-2):
                        for c in range(b+1, len(feet)-1):
                            for d in range(c+1, len(feet)):
                                # print('*************',a,b,c,d)
                                lst = [feet[a], feet[b], feet[c], feet[d]]
                                if self.extractFullRectangle(lst):
                                    lst = sorted(
                                        lst, key=lambda CircleObstacle: CircleObstacle.center.x)
                                    y_lst = [feet[a].center.y,
                                             feet[b].center.y, feet[c].center.y, feet[d].center.y]
                                    x_lst = [feet[a].center.x,
                                             feet[b].center.x, feet[c].center.x, feet[d].center.x]
                                    if (min(y_lst) * max(y_lst)) > 0:
                                        rospy.logwarn(
                                            '[ShelfDetector186] find FULL rectangle, but it is beside robot')
                                        continue
                                    temp_dist = self.pointDistanceRobot(
                                        numpy.mean(x_lst), numpy.mean(y_lst))
                                    if temp_dist > rec_to_robot:
                                        continue
                                    else:
                                        rec_to_robot = temp_dist

                                    print(
                                        "\033[1;37;42m\t\t\tfind FULL REC for initialization:\t\t\t\033[0m")
                                    print(a, b, c,
                                          d, self.extractFullRectangle(lst))

                                    # todo: if the rectangle has false feetSlope, length_detect will be empty!
                                    self.length_detect = []
                                    self.width_detect = []
                                    for i in range(0, 3):
                                        for j in range(i+1, 4):
                                            if abs(self.feetSlope(lst[i], lst[j])) < math.tan(self.horizontal_rad):
                                                l = self.distance2Feet(
                                                    lst[i], lst[j])
                                                self.length_detect.append(l)
                                                self.init_len_detect = False
                                                self.radius = lst[0].true_radius
                                                init_full_rectangle = True
                                            elif abs(self.feetSlope(lst[i], lst[j])) > math.tan(self.vertical_rad):
                                                w = self.distance2Feet(
                                                    lst[i], lst[j])
                                                self.width_detect.append(w)
                                                self.init_wid_detect = False

            if len(feet) >= 3 and not init_full_rectangle:
                rec_to_robot = 100
                for a in range(0, len(feet)-2):
                    for b in range(a+1, len(feet)-1):
                        for c in range(b+1, len(feet)):

                            lst = [feet[a], feet[b], feet[c]]
                            if self.extractHalfRectangle(lst):
                                lst = sorted(
                                    lst, key=lambda CircleObstacle: CircleObstacle.center.x)

                                y_lst = [feet[a].center.y,
                                         feet[b].center.y, feet[c].center.y]
                                if (min(y_lst) * max(y_lst)) > 0:
                                    rospy.logwarn(
                                        '[ShelfDetector186] find HALF rectangle, but it is beside robot')
                                    continue

                                right_center = self.centerRightTriangle(
                                    feet[a], feet[b], feet[c])
                                temp_dist = self.pointDistanceRobot(
                                    right_center[0], right_center[1])
                                # print('***333333:', a, b, c,
                                #       temp_dist, rec_to_robot)

                                if temp_dist > rec_to_robot:
                                    continue
                                else:
                                    rec_to_robot = temp_dist

                                print(
                                    "\033[1;37;42m\t\t\tfind HALF REC for initialization:\t\t\t\033[0m")
                                print(a, b,
                                      c, self.extractHalfRectangle(lst))

                                for i in range(0, 2):
                                    for j in range(i+1, 3):
                                        print(i, j)
                                        # to do: hypotenuse can be with right slope
                                        if abs(self.feetSlope(lst[i], lst[j])) < math.tan(self.horizontal_rad):
                                            l = self.distance2Feet(
                                                lst[i], lst[j])
                                            self.length_detect = []
                                            self.length_detect.append(l)
                                            self.init_len_detect = False
                                            self.radius = lst[0].true_radius
                                            init_half_rectangle = True
                                        elif abs(self.feetSlope(lst[i], lst[j])) > math.tan(self.vertical_rad):
                                            self.width_detect = []
                                            w = self.distance2Feet(
                                                lst[i], lst[j])
                                            self.width_detect.append(w)
                                            self.init_wid_detect = False

            # if (not init_full_rectangle) and (not init_half_rectangle)\
            #    and abs(self.feetSlope(feet_shelf_size[0], feet_shelf_size[1])) < math.tan(self.horizontal_rad):
            #     l = self.distance2Feet(feet_shelf_size[0], feet_shelf_size[1])
            #     self.length_detect.append(l)
            #     self.init_len_detect = False
            #     self.radius = feet_shelf_size[0].true_radius

            # At least half rectangle at initialization.
            if self.init_len_detect:
                rospy.logwarn('[ShelfDetector271] no shelf to detect')
                return

            if not self.init_len_detect:
                if len(self.length_detect) < 1:
                    rospy.logwarn('[ShelfDetector276] cannot get shelf size')
                    return
                print('self.length_detect:', self.length_detect)
                self.length = numpy.mean(self.length_detect)
                self.width = 0.5 * self.width
            print("\033[1;37;42m\t\t\tget shelf len:\t\t\t\033[0m")
            print(round(self.length, 2))

            if not self.init_wid_detect:
                print('self.width_detect', self.width_detect)
                self.width = numpy.mean(self.width_detect)
                print("\033[1;37;42m\t\t\tget shelf wid:\t\t\t\033[0m")
                print(round(self.width, 2))
            self.diagonal = numpy.sqrt(self.width**2 + self.length**2)

        # -------- distance relation between neighour feet --------
        # print('\t delete from distance')
        ngh = 0
        while ngh != len(feet):
            if self.neighourDistanceRelation(feet[ngh], feet, self.length, self.width, self.diagonal, self.edge_tolerance):
                ngh = ngh+1
            else:
                # print('delete ngh', ngh)
                feet.pop(ngh)

        # -------- only once to get initial front and rear feet x position --------
        if len(feet) >= 1 and self.front_x_initial == float('inf'):
            self.front_x_initial = feet[0].center.x
            self.rear_x_initial = self.front_x_initial + \
                self.width + self.init_wid_detect*0.3

        # -------- calculate shelf center in turn --------
        if len(feet) < 2:
            rospy.logwarn(
                "[ShelfDetector317] no enough shelf feet for calculating.")
            return

        if_find_full_rectangle = False
        if_find_half_rectangle = False
        if len(feet) >= 4:
            # rospy.loginfo('[ShelfDetector323] more feet actual presence')
            rec_to_robot = 100
            for a in range(0, len(feet)-3):
                for b in range(a+1, len(feet)-2):
                    for c in range(b+1, len(feet)-1):
                        for d in range(c+1, len(feet)):
                            # print('*****', a, b, c, d)
                            lst = [feet[a], feet[b], feet[c], feet[d]]
                            if self.extractFullRectangle(lst):
                                y_lst = [feet[a].center.y, feet[b].center.y,
                                         feet[c].center.y, feet[d].center.y]
                                x_lst = [feet[a].center.x, feet[b].center.x,
                                         feet[c].center.x, feet[d].center.x]
                                temp_dist = self.pointDistanceRobot(
                                    numpy.mean(x_lst), numpy.mean(y_lst))
                                if temp_dist >= rec_to_robot:
                                    continue
                                else:
                                    rec_to_robot = temp_dist

                                if min(y_lst)*max(y_lst) > 0:
                                    rospy.logwarn(
                                        '[ShelfDetector345] find FULL rectangle, but it is beside robot')
                                    continue
                                feet4_temp = lst
                                if_find_full_rectangle = True
                                # print(
                                #     "\033[1;37;43m\t\t\tfind FULL REC before turn:\t\t\t\033[0m")
                                # print(a, b, c,
                                #       d, self.extractFullRectangle(lst))

        if if_find_full_rectangle:
            feet = feet4_temp
        elif self.at_least_full_rec:
            rospy.logwarn('[ShelfDetector345] FULL rectangle is requirement.')
            return

        if len(feet) >= 3 and not if_find_full_rectangle:
            num_len = len(feet)
            rec_to_robot = 100
            for a in range(0, num_len-2):
                for b in range(a+1, num_len-1):
                    for c in range(b+1, num_len):
                        lst = [feet[a], feet[b], feet[c]]
                        if self.extractHalfRectangle(lst):
                            y_lst = [feet[a].center.y,
                                     feet[b].center.y, feet[c].center.y]
                            right_center = self.centerRightTriangle(
                                feet[a], feet[b], feet[c])
                            temp_dist = self.pointDistanceRobot(
                                right_center[0], right_center[1])
                            if temp_dist >= rec_to_robot:
                                continue
                            else:
                                rec_to_robot = temp_dist

                            if min(y_lst)*max(y_lst) > 0:
                                rospy.logwarn(
                                    '[ShelfDetector377] find HALF rectangle, but it is beside robot')
                                continue

                            feet3_temp = lst
                            if_find_half_rectangle = True
                            print(
                                "\033[1;37;43m\t\t\tfind HALF REC before turn:\t\t\t\033[0m")
                            print(a, b,
                                  c, self.extractHalfRectangle(lst))
        if if_find_half_rectangle:
            feet = feet3_temp
            # for i in range(0, 2):
            #     for j in range(i+1, 3):
            #         print(i, j)
            #         if abs(self.feetSlope(lst[i], lst[j])) < math.tan(self.horizontal_rad):
            #             l = self.distance2Feet(lst[i], lst[j])
            #             self.length_detect.append(l)
            #         elif abs(self.feetSlope(lst[i], lst[j])) > math.tan(self.vertical_rad):
            #             w = self.distance2Feet(lst[i], lst[j])
            #             self.width_detect.append(w)
            # self.length = numpy.mean(self.length_detect)
            # self.width = numpy.mean(self.width_detect)

            # print('len detect', self.length_detect)
            # print('wid detect', self.width_detect)
        elif self.at_least_half_rec and not if_find_full_rectangle:
            rospy.logwarn('[ShelfDetector345] HALF rectangle is requirement.')
            return

        if len(feet) >= 3 and not if_find_half_rectangle and not if_find_full_rectangle:
            rospy.logwarn(
                '[ShelfDetector390] more than 3 feet but not in right relation')
            return

        # print('---------------.....----------------')
        # print('\tuseful:')
        # for f in feet:
        #     print(round(f.center.x, 2), round(f.center.y, 2),
        #           round(f.center.z, 2), round(f.true_radius, 2))

        target_x = []
        target_y = []
        target_yaw = []
        for i in range(0, len(feet)-1):
            for j in range(i+1, len(feet)):
                        # print(i, j, self.feetRelation(feet[i], feet[j]))
                if self.feetRelation(feet[i], feet[j]) == "vertical":
                    if not self.size_informed and self.init_wid_detect:
                        self.width = self.distance2Feet(feet[i], feet[j])
                        self.init_wid_detect = False
                    target = self.leftRightCalculate(feet[i], feet[j], False)
                    # print(i, j, "VERT", round(target[0], 2), round(
                    #     target[1], 2), round(target[2], 2))
                    target_x.append(target[0])
                    target_y.append(target[1])
                    target_yaw.append(target[2])
                elif self.feetRelation(feet[i], feet[j]) == "horizontal":
                    if abs(self.robotDisplacement(self.odom_x, self.odom_y) + feet[i].center.x - self.front_x_initial) < 0.3:
                        target = self.frontRearCalculate(
                            1, feet[i], feet[j], True)
                        # print(i, j, "HORI", round(target[0], 2), round(
                        #     target[1], 2), round(target[2], 2))
                        target_x.append(target[0])
                        target_y.append(target[1])
                        target_yaw.append(target[2])
                    if abs(self.robotDisplacement(self.odom_x, self.odom_y) + feet[i].center.x - self.rear_x_initial) < 0.3:
                        target = self.frontRearCalculate(
                            -1, feet[i], feet[j], True)
                        # print(i, j, "HORI", round(target[0], 2), round(
                        #     target[1], 2), round(target[2], 2))
                        target_x.append(target[0])
                        target_y.append(target[1])
                        target_yaw.append(target[2])
                else:
                    if abs(self.distance2Feet(feet[i], feet[j]) - self.diagonal) < self.edge_tolerance*1.5 + self.init_wid_detect*0.3\
                            and abs(math.atan(abs(self.feetSlope(feet[i], feet[j]))) - math.atan(self.width/self.length)) < 0.35:
                        target = self.diagonalCalculate(
                            feet[i], feet[j])
                        # print(i, j, "DIAG", round(target[0], 2), round(
                        #     target[1], 2), round(target[2], 2))
                        target_x.append(target[0])
                        target_y.append(target[1])
                        target_yaw.append(target[2])

        # print('--------------- ???? ----------------')
        if if_find_full_rectangle:
            x_list = map(lambda f: f.center.x, feet)
            y_list = map(lambda f: f.center.y, feet)
            target_x = [numpy.mean(x_list)]
            target_y = [numpy.mean(y_list)]

        target_x.sort()
        target_y.sort()
        target_yaw.sort()
        target_x = self.listNormalization(target_x)
        target_y = self.listNormalization(target_y)
        target_yaw = self.listNormalization(target_yaw)

        # print map(lambda x: round(x, 2), target_x)
        # print map(lambda x: round(x, 2), target_y)
        # print map(lambda x: round(x, 2), target_yaw)

        if min(len(target_x), len(target_y), len(target_yaw)) == 0:
            rospy.logwarn('[ShelfDetector463] no result')
            return

        tx = numpy.mean(target_x)
        ty = numpy.mean(target_y)
        tyaw = numpy.mean(target_yaw)
        # rospy.loginfo('\t mean shelf center')
        # print('-----------------------------------------',
        #       round(tx, 2), round(ty, 2), round(tyaw, 2))

        tdelta = pow(tx - self.last_tx, 2) + \
            pow(ty - self.last_ty, 2) + pow(tyaw-self.last_yaw, 2)

        # -------- Exclude exception results and send TF transformations --------
        if pow(self.last_tx, 2) + pow(self.last_tx, 2)+pow(self.last_yaw, 2) == 0 or\
                tdelta < 0.1**2 or \
                (time.time() - self.time_start) > self.timeout:
            # print(
            #     "\033[1;37;46m\t\t\t current TF PUB:\t\t\t\033[0m")
            # print ('tf delta:', tdelta)
            self.shelfTFBroadcaster(tx, ty, tyaw)
            self.time_start = time.time()
            self.last_tx = tx
            self.last_ty = ty
            self.last_yaw = tyaw
            if self.shelf_footprint and tx < 0.5:
                self.setShelfFootprint(
                    round(self.length*0.5, 3), round(self.width*0.5, 3))
                self.shelf_footprint = False

    def shelfTFBroadcaster(self, tx, ty, tyaw):
        quat = tf.transformations.quaternion_from_euler(
            float(0), float(0), float(tyaw))
        br = tf.TransformBroadcaster()
        br.sendTransform((tx, ty, 0.0),
                         quat,
                         rospy.Time.now(),
                         "shelf_current",
                         "base_link")

    def frontRearCalculate(self, inverse, foot_1, foot_2, detect_long_edge=True):
        ratio_feet = (foot_1.center.y - foot_2.center.y) / \
            self.denominatorZero(foot_1.center.x - foot_2.center.x)
        ratio = -1.0 / ratio_feet
        ratio_symbol = ratio/abs(ratio)

        target_x = 0.5*(foot_1.center.x + foot_2.center.x) \
            + inverse / numpy.sqrt(1.0 + ratio*ratio) * self.width*0.5 * detect_long_edge \
            + inverse / numpy.sqrt(1.0 + ratio*ratio) * \
            self.length * 0.5 * (1 - detect_long_edge)

        target_y = 0.5*(foot_1.center.y + foot_2.center.y)\
            + inverse*ratio_symbol*abs(ratio)/numpy.sqrt(1.0 + ratio*ratio) * self.width*0.5 * detect_long_edge \
            + inverse*ratio_symbol*abs(ratio) / \
            numpy.sqrt(1.0 + ratio*ratio) * self.length * \
            0.5 * (1 - detect_long_edge)

        target_yaw = math.atan(ratio)

        return(target_x, target_y, target_yaw)

    def leftRightCalculate(self, foot1, foot2, detect_long_edge=False):
        if foot1.center.y > 0:
            # left
            inverse = -1
        else:
            inverse = 1

        ratio_feet = (foot1.center.y - foot2.center.y) / \
            self.denominatorZero(foot1.center.x - foot2.center.x)
        ratio = -1.0 / ratio_feet
        ratio_symbol = ratio/abs(ratio)

        target_x = 0.5*(foot1.center.x + foot2.center.x) \
            + ratio_symbol * inverse / numpy.sqrt(1.0 + ratio*ratio) * self.width*0.5 * detect_long_edge \
            + ratio_symbol*inverse / numpy.sqrt(1.0 + ratio*ratio) * \
            self.length * 0.5 * (1 - detect_long_edge)

        target_y = 0.5*(foot1.center.y + foot2.center.y)\
            + inverse*abs(ratio)/numpy.sqrt(1.0 + ratio*ratio) * self.width*0.5 * detect_long_edge \
            + inverse*abs(ratio) / \
            numpy.sqrt(1.0 + ratio*ratio) * self.length * \
            0.5 * (1 - detect_long_edge)

        target_yaw = math.atan(ratio)
        # tempy = inverse*abs(ratio)/numpy.sqrt(1.0 + ratio*ratio) * self.width*0.5 * detect_long_edge \
        #     + inverse*abs(ratio) / \
        #     numpy.sqrt(1.0 + ratio*ratio) * self.length * \
        #     0.5 * (1 - detect_long_edge)
        # tempx=ratio_symbol * inverse / numpy.sqrt(1.0 + ratio*ratio) * self.width*0.5 * detect_long_edge \
        #     + ratio_symbol*inverse / numpy.sqrt(1.0 + ratio*ratio) * \
        #     self.length * 0.5 * (1 - detect_long_edge)

        # print(inverse, ratio,  0.5*(foot1.center.x + foot2.center.x), tempx )
        # print(inverse, ratio, 0.5*(foot1.center.y + foot2.center.y), tempy)

        return(target_x, target_y, ratio_feet)

    def diagonalCalculate(self, foot1, foot2):
        target_x = 0.5*(foot1.center.x + foot2.center.x)
        target_y = 0.5*(foot1.center.y + foot2.center.y)
        ratio_feet = (foot1.center.y - foot2.center.y) / \
            self.denominatorZero(foot1.center.x - foot2.center.x)
        tan_diag = self.length/self.width
        if ratio_feet > 0:
            target_yaw = math.atan(ratio_feet)-math.atan(tan_diag)
        else:
            target_yaw = math.atan(ratio_feet)+math.atan(tan_diag)
        # print(math.atan(ratio_feet), math.atan(tan_diag))

        return(target_x, target_y, target_yaw)

    def extractHalfRectangle(self, lst):
        half_rect = False
        if len(lst) == 3:
            i = 0
            j = 1
            k = 2
            edges = [self.distance2Feet(lst[j], lst[k]),
                     self.distance2Feet(lst[i], lst[k]),
                     self.distance2Feet(lst[i], lst[j])]
            intersection_point = edges.index(max(edges))
            if intersection_point == 0:
                c = i
                a = j
                b = k
            elif intersection_point == 1:
                c = j
                a = i
                b = k
            elif intersection_point == 2:
                c = k
                a = i
                b = j
            else:
                rospy.logerror('extractRectangle error')
                return False

            (x1, y1) = (lst[a].center.x - lst[c].center.x,
                        lst[a].center.y - lst[c].center.y)
            (x2, y2) = (lst[b].center.x - lst[c].center.x,
                        lst[b].center.y - lst[c].center.y)
            dot_product = x1*x2 + y1*y2
            cos_theta = dot_product / \
                self.denominatorZero(numpy.sqrt(
                    x1**2 + y1**2) * numpy.sqrt(x2**2 + y2**2))
            theta = math.acos(cos_theta)
            # print ('theta:',cos_theta,theta,  self.denominatorZero(numpy.sqrt(
            #         x1**2 + y1**2) * numpy.sqrt(x2**2 + y2**2)) , dot_product  )
            if abs(theta - math.pi/2) < self.right_angle_tolerance:
                # print theta
                half_rect = True

        return half_rect

    def extractFullRectangle(self, lst):
        full_rect = False
        if len(lst) == 4:
            full_rect = True
            for a in range(0, 2):
                for b in range(a+1, 3):
                    for c in range(b+1, 4):
                        temp_lst = [lst[a], lst[b], lst[c]]
                        if self.extractHalfRectangle(temp_lst) == False:
                            full_rect = False
        return full_rect

    def centerRightTriangle(self, foot1, foot2, foot3):
        dis_list = [self.distance2Feet(foot2, foot3), self.distance2Feet(
            foot1, foot3), self.distance2Feet(foot1, foot2)]
        right_point = dis_list.index(max(dis_list))
        if right_point == 0:
            right_center = ((foot2.center.x + foot3.center.x)*0.5,
                            (foot2.center.y + foot3.center.y)*0.5)
        elif right_point == 1:
            right_center = ((foot1.center.x + foot3.center.x)*0.5,
                            (foot1.center.y + foot3.center.y)*0.5)
        else:
            right_center = ((foot1.center.x + foot2.center.x)*0.5,
                            (foot1.center.y + foot2.center.y)*0.5)
        return right_center

    def RectangleSize(self, feet_list):
        long_edge = 0
        short_edge = 0
        if len(feet_list) == 4:
            l1 = self.distance2Feet(feet_list[0], feet_list[1])
            l2 = self.distance2Feet(feet_list[0], feet_list[2])
            l2 = self.distance2Feet(feet_list[0], feet_list[3])
            lst = sorted([l1, l2, l3])
            long_edge = lst[1]
            short_edge = lst[0]
        else:
            print('error use RectangleSize')
        return (long_edge, short_edge)

    def setShelfFootprint(self, half_length, half_width):
        client_recfg_local = dynamic_reconfigure.client.Client(
            'move_base/local_costmap')
        client_recfg_global = dynamic_reconfigure.client.Client(
            'move_base/global_costmap')
        params = {
            'footprint': [[-half_length, -half_width], [half_length, -half_width], [half_length, half_width], [-half_length, half_width]]}
        recfg = client_recfg_local.update_configuration(params)
        recfg = client_recfg_global.update_configuration(params)


def medianFilterBaseShelf(tf_list):
    cost_list = []
    for i in range(0, len(tf_list)):
        cost = 0
        for j in range(0, len(tf_list)):
            cost = cost + numpy.sqrt((tf_list[i].transform.translation.x - tf_list[j].transform.translation.x)**2 + (
                tf_list[i].transform.translation.y - tf_list[j].transform.translation.y)**2)
        cost_list.append((cost, i))

    cost_list = sorted(cost_list)
    idx = cost_list[0][1]
    return tf_list[idx]


def main():
    rospy.init_node('shelf_detector')
    median_filter_group = rospy.get_param(
        "/shelf_detector/median_filter_group", 10)
    x_list = []
    y_list = []
    qx_list = []
    qy_list = []
    qz_list = []
    qw_list = []

    shelf_detect = ShelfDetect()
    time.sleep(0.05)
    # listener_tf = tf.TransformListener()

    buf = tf2_ros.Buffer()
    listener = tf2_ros.TransformListener(buf)
    tf_list = []
    tf_initial = False

    while not rospy.is_shutdown():
        time.sleep(0.1)
        try:
            tform = buf.lookup_transform(
                "odom", "shelf_current", rospy.Time(0), timeout=rospy.Duration(1))
            # (trans,rot) = listener_tf.lookupTransform('odom', 'shelf_current', rospy.Time(0))
            tf_list.append(tform)

            if len(tf_list) >= median_filter_group and not tf_initial:
                tform = medianFilterBaseShelf(tf_list)
                tf_initial = True

            if tf_list and len(tf_list) >= median_filter_group:
                # print(len(tf_list))
                tform = medianFilterBaseShelf(tf_list)
                tf_list.pop(0)

            if len(x_list) > 2 and tf_initial:
                if(numpy.sqrt((tform.transform.translation.x - x_mean)**2
                              + (tform.transform.translation.y - y_mean)**2
                              + (tform.transform.rotation.w - qw_mean)**2) < 0.05):
                    x_list.append(tform.transform.translation.x)
                    y_list.append(tform.transform.translation.y)
                    qx_list.append(tform.transform.rotation.x)
                    qy_list.append(tform.transform.rotation.y)
                    qz_list.append(tform.transform.rotation.z)
                    qw_list.append(tform.transform.rotation.w)

            elif tf_initial:
                x_list.append(tform.transform.translation.x)
                y_list.append(tform.transform.translation.y)
                qx_list.append(tform.transform.rotation.x)
                qy_list.append(tform.transform.rotation.y)
                qz_list.append(tform.transform.rotation.z)
                qw_list.append(tform.transform.rotation.w)
        except (tf2_ros.LookupException, tf2_ros.ConnectivityException, tf2_ros.ExtrapolationException) as e:
            print e

        if len(x_list) > 0:
            x_mean = numpy.mean(x_list)
            y_mean = numpy.mean(y_list)
            qx_mean = numpy.mean(qx_list)
            qy_mean = numpy.mean(qy_list)
            qz_mean = numpy.mean(qz_list)
            qw_mean = numpy.mean(qw_list)
            qw_mean = numpy.sqrt(
                1-qx_mean*qx_mean - qy_mean*qy_mean - qz_mean*qz_mean) * qw_mean/abs(qw_mean)
            br = tf.TransformBroadcaster()
            br.sendTransform((x_mean, y_mean, 0),
                             (qx_mean, qy_mean, qz_mean, qw_mean),
                             rospy.Time.now(),
                             "base_shelf",
                             "odom")
            # print(
            #     "\033[1;37;42m\t\t\tShelf TF PUB:\t\t\t\033[0m")

    try:
        rospy.spin()
    except KeyboardInterrupt:
        print "Shutting down"


if __name__ == '__main__':
    main()
