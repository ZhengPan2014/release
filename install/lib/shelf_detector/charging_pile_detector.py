#!/usr/bin/env python

# subscribe to topic: /raw_obstacles (Great appreciation for Mateusz Przybyla's work)
# privide tf:         base_link -> charging_pile_current
#                     odom -> base_charging_pile

# Author: lei.zeng@tu-dortmund.de


import rospy
import time
import math
import tf
import tf2_ros
import operator
import numpy
from geometry_msgs.msg import Quaternion
from tf.transformations import quaternion_from_euler
from obstacle_detector.msg import Obstacles


class ChargingPileDetect():
    def __init__(self, pr=0.0625):
        self.sub_shelf = rospy.Subscriber("/raw_obstacles", Obstacles,
                                          self.detectChargingPileCallback, queue_size=10)
        self.__pile_radius = pr

        self.view_start = math.pi/3.0
        self.view_end = 2*math.pi/3.0
        self.y_drift_error = 1.0
        self.xpos_drift_error = 3.0
        self.raius_error = 0.05
        self.timeout = 10

        self.__last_px = 0
        self.__last_py = 0
        self.__last_pyaw = 0
        self.__time_start = time.time()

    def pointRadRobot(self, y, x):
        # -3.13 ~ 3.14
        return math.atan2(y, x)

    def ChargingPileTFBroadcaster(self, tx, ty, tyaw):
        quat = tf.transformations.quaternion_from_euler(
            float(0), float(0), float(tyaw))
        br = tf.TransformBroadcaster()
        br.sendTransform((tx, ty, 0.0),
                         quat,
                         rospy.Time.now(),
                         "charging_pile_current",
                         "base_link")

    def detectChargingPileCallback(self, obstaclesMsg):
        circle_obstacles = list(obstaclesMsg.circles)
        circle_obstacles = filter(lambda c:
                                  self.view_start < self.pointRadRobot(
                                      c.center.x, c.center.y) < self.view_end
                                  and 0 < c.center.x < self.xpos_drift_error
                                  and abs(c.center.y) < self.y_drift_error
                                  and abs(c.true_radius - self.__pile_radius) < self.raius_error, circle_obstacles)
        if len(circle_obstacles) == 1:
            cpile = circle_obstacles[0]
            # rospy.loginfo('ChargingPile is localized')
        else:
            rospy.logwarn('[ChargingPile] multi or none target')
            return

        px = cpile.center.x
        py = cpile.center.y
        pyaw = self.pointRadRobot(py, px)
        pdelta = numpy.sqrt((px - self.__last_px)**2 +
                            (py - self.__last_py)**2)
        if pow(self.__last_px, 2) + pow(self.__last_py, 2)+pow(self.__last_pyaw, 2) == 0 or\
                pdelta < 0.05 or \
                (time.time() - self.time_start) > self.timeout:

            self.ChargingPileTFBroadcaster(px, py, pyaw)
            self.time_start = time.time()
            self.__last_px = px
            self.__last_py = py
            self.__last_pyaw = pyaw


def main():
    rospy.init_node('charging_pile_detector')
    x_list = []
    y_list = []
    qx_list = []
    qy_list = []
    qz_list = []
    qw_list = []

    ChargingPile = ChargingPileDetect(charging_pile_radius)

    buf = tf2_ros.Buffer()
    listener = tf2_ros.TransformListener(buf)
    while not rospy.is_shutdown():
        try:
            tform = buf.lookup_transform(
                "odom", "charging_pile_current", rospy.Time(0), timeout=rospy.Duration(1))
            if len(x_list) > 2:
                drift_to_mean = numpy.sqrt((tform.transform.translation.x - x_mean)**2
                                           + (tform.transform.translation.y - y_mean)**2)
                #    + (tform.transform.rotation.z - qz_mean)**2
                #    + (tform.transform.rotation.w - qw_mean)**2)
                drift_to_last = numpy.sqrt((tform.transform.translation.x - x_list[-1])**2
                                           + (tform.transform.translation.y - y_list[-1])**2)
                #    + (tform.transform.rotation.z -
                #       qz_list[-1])**2
                #    + (tform.transform.rotation.w - qw_list[-1])**2)
                if (0.0001 < drift_to_mean < 0.05 and drift_to_last != 0):
                    x_list.append(tform.transform.translation.x)
                    y_list.append(tform.transform.translation.y)
                    # qx_list.append(tform.transform.rotation.x)
                    # qy_list.append(tform.transform.rotation.y)
                    # qz_list.append(tform.transform.rotation.z)
                    # qw_list.append(tform.transform.rotation.w)

                    average_length = len(x_list)
                    if len(x_list) > 50:
                        x_list.pop(0)
                        y_list.pop(0)
                        # qx_list.pop(0)
                        # qy_list.pop(0)
                        # qz_list.pop(0)
                        # qw_list.pop(0)

            else:
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
                             "base_charging_pile",
                             "odom")

    try:
        rospy.spin()
    except KeyboardInterrupt:
        print "Shutting down"


if __name__ == '__main__':
    charging_pile_radius = 0.0625
    main()
