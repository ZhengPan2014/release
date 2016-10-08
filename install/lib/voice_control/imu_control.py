#!/usr/bin/env python
# -*- coding:utf-8 -*-

from __future__ import division 
import base64
import time

# ros
import rospy
import cv2 as cv
from cv_bridge import CvBridge, CvBridgeError

# ros msg
from std_msgs.msg import String
from geometry_msgs.msg import Twist
from sensor_msgs.msg import Imu, Image

class ImuControl(object):
	def __init__(self):
		rospy.init_node('mobile_imu_control', anonymous = True)
		rospy.on_shutdown(self.close)
		# vel setting
		self.max_linear_vel = rospy.get_param('max_linear_vel', 0.5)
		self.max_angular_vel = rospy.get_param('max_angular_vel', 0.5)
		# acceleration setting
		self.forward_l = rospy.get_param('forward_l',0)
		self.forward_r = rospy.get_param('forward_r',2)
		self.back_l = rospy.get_param('back_l',5)
		self.back_r = rospy.get_param('back_r',7)
		self.halt_l = self.forward_r
		self.halt_r = self.back_l
		self.left_l = rospy.get_param('left_l',-2.5)
		self.left_r = rospy.get_param('left_r',-1.5)
		self.right_l = rospy.get_param('right_l',1.5)
		self.right_r = rospy.get_param('right_r',2.5)
		self.mid_l = self.left_r
		self.mid_r = self.right_l
		# timeout setting
		self.timeout = rospy.get_param('timeout',0.5)
		self.pre_seq = -1

		self.stop_flag = False
		# publish cmd_vel
		self.cmd_vel = Twist()
		self.cmd_vel_pub = rospy.Publisher('cmd_vel', Twist, queue_size = 1)
		rospy.Subscriber('/mobile_imu', Imu, self.imu_callback, queue_size = 1)
		# publish h5_image
		# self.img_pub = rospy.Publisher('h5_image', String, queue_size = 10)
		self.bridge = CvBridge()
		# self.img_sub = rospy.Subscriber('/camera/rgb/image_raw', Image, self.image_callback, queue_size = 1)
		self.timer = rospy.Timer(rospy.Duration(self.timeout),self.timeout_callback) # timeout setting 
		rospy.loginfo('Ready...')

	def imu_callback(self, msg):
		linear_acce = msg.linear_acceleration
		quaternion = msg.orientation
		self.cur_seq = msg.header.seq

		if (linear_acce.x == linear_acce.y == linear_acce.z == -1):
			if not self.stop_flag: # stop
				self.cmd_vel.linear.x = 0
				self.cmd_vel.angular.z = 0
				self.cmd_vel_pub.publish(self.cmd_vel)
				self.stop_flag = True
			return
		# orientation check
		# elif abs(quaternion.w) < 0.15: # portrait
		# 	linear_acce.x, linear_acce.y = linear_acce.y, linear_acce.x

		if (self.halt_l <= linear_acce.x <= self.halt_r): # halt
			linear_vel = 0
		elif linear_acce.x < self.forward_r: # forward
			if linear_acce.x > self.forward_l:
				linear_vel = self.max_linear_vel * (linear_acce.x - self.forward_r) / (self.forward_l - self.forward_r)
			else:
				linear_vel = self.max_linear_vel
		elif linear_acce.x > self.back_l: # back
			if linear_acce.x < self.back_r:
				linear_vel = self.max_linear_vel * (linear_acce.x - self.back_l) / (self.back_l - self.back_r)
			else:
				linear_vel = - self.max_linear_vel
		self.cmd_vel.linear.x = linear_vel 

		if (self.mid_l <= linear_acce.y <= self.mid_r): # go straight
			angular_vel = 0
		elif linear_acce.y < self.left_r: # turn left
			if linear_acce.y > self.left_l:
				angular_vel = self.max_angular_vel * (linear_acce.y - self.left_r) / (self.left_l - self.left_r)
			else:
				angular_vel = self.max_angular_vel
		elif linear_acce.y > self.right_l: # turn right
			if linear_acce.y < self.right_r:
				angular_vel = self.max_angular_vel * (linear_acce.y - self.right_l) / (self.right_l - self.right_r)
			else:
				angular_vel = - self.max_angular_vel

		if self.cmd_vel.linear.x < 0:
			self.cmd_vel.angular.z = - angular_vel
		else:
			self.cmd_vel.angular.z = angular_vel

		self.cmd_vel_pub.publish(self.cmd_vel)
		self.stop_flag = False

	def image_callback(self,data):
		try:
			cv_image = self.bridge.imgmsg_to_cv2(data, "bgr8")
			# cv.imshow("Image window",cv_image)
			file_name = 'raw_img.jpg'
			image_resized=cv.resize(image,(480,320)) 
			cv.imwrite(file_name, image_resized)
			image_64 = base64.encodestring(open(file_name,"rb").read())
			self.img_pub.publish(str(image_64))
			cv.waitKey(2)
		except CvBridgeError, e:
			rospy.logerr(e)

	def timeout_callback(self, event):
		try:
			if self.pre_seq == self.cur_seq and not self.stop_flag:
				self.cmd_vel.linear.x = 0
				self.cmd_vel.angular.z = 0
				self.cmd_vel_pub.publish(self.cmd_vel)
				self.stop_flag = True
				rospy.loginfo('Topic: /mobile_imu timeout')
			self.pre_seq = self.cur_seq
		except Exception as e:
			pass

	def close(self):
		twist = Twist()
		self.cmd_vel_pub.publish(twist)
		rospy.sleep(1)

def main():
	try:
		imu_ctrl = ImuControl()
		rospy.spin()
	except Exception as e:
		rospy.logerr(e)

if __name__ == '__main__':
	main()