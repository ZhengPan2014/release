#!/usr/bin/env python
import time
# ros
import rospy
from std_msgs.msg import String
from yocs_msgs.msg import *
from task_manager.msg import *

class TaskManager(object):
	def __init__(self):
		self.tasks = []
		self.nav_idle = True
		# only controled by task_ctrl topic
		self.task_idle = True
		self.current_task = None
		self.__dumped_tasks_mapping = None

		rospy.init_node('task_manager', anonymous=True)
		# settings
		self.__feedback = rospy.get_param('~feedback', False)
		self.__frequency = rospy.get_param('~frequency', 5)
		rate = rospy.Rate(self.__frequency)

		self.__dumped_tasks_sub = rospy.Subscriber('dumped_tasks', TaskList, self.__dumped_tasks_sub_cb, queue_size=1)
		self.__task_sub = rospy.Subscriber('waypoint_user_sub', String, self.__task_sub_cb, queue_size=1) 
		self.__nav_ctrl_pub = rospy.Publisher('nav_ctrl', NavigationControl, queue_size=1)
		self.__nav_ctrl_status_sub = rospy.Subscriber('nav_ctrl_status', NavigationControlStatus, self.__nav_ctrl_status_cb, queue_size=1)
		# self.__trajectories_sub = rospy.Subscriber('trajectories', TrajectoryList, self.__trajectories_cb, queue_size=1)
		self.__task_ctrl_pub = rospy.Publisher('task_ctrl', TaskControl, queue_size=1)
		self.__task_ctrl_sub = rospy.Subscriber('task_ctrl', TaskControl, self.__task_ctrl_cb, queue_size=1)
		self.__task_ctrl_status_pub = rospy.Publisher('task_ctrl_status', TaskControlStatus, queue_size=1, latch=True)
		self.__tasks_queue_pub = rospy.Publisher('tasks_queue', TaskList, queue_size=1, latch=True)
		
		if not self.__feedback:
			class FakePuber(object):
				def __init__(self):
					pass
				def publish(self, msg):
					pass
			self.__feedback_pub = FakePuber()
		else:
			self.__feedback_pub = rospy.Publisher('waypoint_user_pub', String, queue_size=1, latch=True)

		self.__reset_status()
		while not rospy.is_shutdown():
			if len(self.tasks) > 0 and self.nav_idle and self.task_idle:
				self.nav_idle = False
				self.current_task = self.tasks[0]
				# delete the completed task and update the task queue
				# self.tasks.pop(0)
				# tasklist_msg = TaskList()
				# tasklist_msg.tasks = self.tasks
				# self.__tasks_queue_pub.publish(tasklist_msg)
				nav_ctrl = NavigationControl()
				nav_ctrl.goal_name = self.current_task.trajectory
				nav_ctrl.control = 1
				self.__nav_ctrl_pub.publish(nav_ctrl)
				rospy.loginfo('Executing task %s' %self.current_task.name)
				# update status
				self.__update_task_ctrl_status(1, task=self.current_task)
				self.__update_status_to_wp(1, self.current_task.address)
			rate.sleep()

	def __reset_status(self):
		is_reset = False
		rospy.loginfo('Waiting for dumped tasks...')
		while not rospy.is_shutdown() and not is_reset:
			if self.__dumped_tasks_mapping != None:
				rospy.loginfo('Resetting lights status...')
				for address in self.__dumped_tasks_mapping:
					self.__update_status_to_wp(3, address)
					time.sleep(0.1)
				is_reset = True
			time.sleep(0.5)
		rospy.loginfo('Resetting lights status done.')

	def __dumped_tasks_sub_cb(self, msg):
		self.__dumped_tasks_mapping = {}
		for task in msg.tasks:
			if task.address in self.__dumped_tasks_mapping:
				rospy.logerr("Task %s already in the dumped tasks mapping." %task.name)
				continue
			self.__dumped_tasks_mapping[task.address] = task
		rospy.loginfo('Received %d tasks.' %len(self.__dumped_tasks_mapping))

	def __task_sub_cb(self, msg):
		'''
		received msg: poll:address,enableValue,disableValue
		'''
		if 'poll' not in msg.data:
			return
		elif 'poll' in msg.data and 'warn' in msg.data:
			rospy.logwarn("Got warning in 'poll' msg of topic 'waypoint_user_sub'.")
			return
		msg_data = msg.data[5:]
		splited_msg = msg_data.split(',')
		if len(splited_msg) != 3:
			rospy.logwarn('Unexpected poll msg.')
			return
		address, enable_state, disable_state = splited_msg
		address = int(address.strip())    
		enable_state = enable_state.strip()
		disable_state = disable_state.strip()
		if address in self.__dumped_tasks_mapping:
			task = self.__dumped_tasks_mapping[address]
			enable = self.__is_expected(task, enable_state, mode='enable')
			disable = self.__is_expected(task, disable_state, mode='disable')
			if enable and disable:
				if self.current_task:
					if address == self.current_task.address:
						task_ctrl = TaskControl()
						task_ctrl.goal_name = 'cancel_current'
						task_ctrl.control = 0
						self.__task_ctrl_pub.publish(task_ctrl)
			else:
				if task in self.tasks and disable and not enable:
					if self.current_task.address != address:
						# remove the task from tasks queue
						self.tasks.remove(task)
						self.__update_status_to_wp(-1, task.address)
						tasklist_msg = TaskList()
						tasklist_msg.tasks = self.tasks
						self.__tasks_queue_pub.publish(tasklist_msg)
						rospy.loginfo('Task: %s deleted from tasks queue.' %task.name)
				elif task not in self.tasks and enable and not disable:
					# add task to queue
					self.__add_to_tasks_queue(task)
					self.__update_status_to_wp(0, task.address)
					tasklist_msg = TaskList()
					tasklist_msg.tasks = self.tasks
					self.__tasks_queue_pub.publish(tasklist_msg)
					rospy.loginfo('Task: %s added to tasks queue.' %task.name)
				else:
					pass
		else:
			rospy.logerr('Address %s not found in dumped tasks mapping.' %address)

	def __nav_ctrl_status_cb(self, msg):
		if msg.waypoint_name == '' and msg.status == 0:
			if self.current_task:
				# update the task queue
				self.tasks.pop(0)
				tasklist_msg = TaskList()
				tasklist_msg.tasks = self.tasks
				self.__tasks_queue_pub.publish(tasklist_msg)
				self.nav_idle = True
				self.__update_task_ctrl_status(3, task=self.current_task)
				self.__update_status_to_wp(3, self.current_task.address)
				rospy.loginfo('Task %s completed.' %self.current_task.name)
			else:
				self.nav_idle = True

	def __trajectories_cb(self, msg):
		# rospy.loginfo(msg)
		pass

	def __task_ctrl_cb(self, msg):
		if msg.goal_name == '' and msg.control == 0:
			# pause when current task complete
			self.task_idle = False
			if not self.current_task:
				rospy.loginfo('No task running.')
			else:
				rospy.loginfo('Tasks will pause when current task: %s completed.' %self.current_task.name)
		elif msg.goal_name == '' and msg.control == 1:
			# resume task queue
			self.task_idle = True
			rospy.loginfo('Tasks resumed.')
		elif msg.goal_name == 'current' and msg.control == 0:
			# cancel current task and pause
			self.task_idle = False
			nav_ctrl = NavigationControl()
			nav_ctrl.goal_name = ''
			nav_ctrl.control = 0
			self.__nav_ctrl_pub.publish(nav_ctrl)
			if not self.current_task:
				rospy.loginfo('No task running')
			else:
				rospy.loginfo('Task: %s cancelled and tasks paused.' %self.current_task.name)
		elif msg.goal_name == 'all' and msg.control == 0:
			# clear tasks queue
			self.tasks = []
			self.task_idle = True
			self.nav_idle = True
			tasklist_msg = TaskList()
			self.__tasks_queue_pub.publish(tasklist_msg)
			if not self.current_task:
				rospy.loginfo('No task running, all tasks cleared.')
			else:
				rospy.loginfo('All tasks will be cleared when task %s completed' %self.current_task.name)
		elif msg.goal_name == 'cancel_current' and msg.control == 0:
			# cancel current task
			nav_ctrl = NavigationControl()
			nav_ctrl.goal_name = ''
			nav_ctrl.control = 0
			self.__nav_ctrl_pub.publish(nav_ctrl)
			if not self.current_task:
				rospy.loginfo('No task running')
			else:
				rospy.loginfo('Task: %s cancelled.' %self.current_task.name)
		else:
			# TODO
			rospy.logwarn('Unknown task control cmd.')

	def __add_to_tasks_queue(self, task):
		if task.priority == 0:
			# add to the end 
			self.tasks.append(task)
		elif task.priority == 1:
			# add to the beginning, will execute when the current task done
			self.tasks.insert(0, task)
		elif task.priority == 2:
			# TODO:
			# cancel the current task, and execute this task immediately.
			self.tasks.insert(0, task)
		elif task.priority == -1:
			# TODO:
			# always stay at the end of the task queue
			self.tasks.append(task)
		else:
			self.tasks.append(task)

	def __is_expected(self, task, state, mode='enable'):
		if mode == 'enable':
			expect = task.enable_expect
		elif mode == 'disable':
			expect = task.disable_expect
		# parse operator and condition
		splited_expect = expect.split(' ')
		if len(splited_expect) == 1:
			condition = splited_expect[0]
			if '$' not in condition:
				if condition in ('true', 'True', 'TRUE'):
					return True
				elif condition in ('false', 'False', 'FALSE'):
					return False
				else:
					rospy.logerr("Unknown condition '%s'." %condition)
			else:
				self.__parse_var(condition)
				# TODO
		elif len(splited_expect) == 2:
			operator = splited_expect[0]
			condition = splited_expect[1]
			state = float(state)
			condition = float(condition)
			if operator == '<':
				return (state < condition)
			elif operator == '<=':
				return (state <= condition)
			elif operator in ('=', '=='):
				return (state == condition)
			elif operator == '>':
				return (state > condition)
			elif operator == '>=':
				return (state >= condition)
			elif operator == '!=':
				return (state != condition)
			else:
				rospy.logerr("Unknown operator '%s'." %operator)
				return False
		else:
			# TODO
			return False

	def __update_task_ctrl_status(self, status, task=''):
		# task control status msg
		task_ctrl_status = TaskControlStatus()
		task_ctrl_status.status = status
		task_ctrl_status.task_name = task.name
		self.__task_ctrl_status_pub.publish(task_ctrl_status)

	def __update_status_to_wp(self, status, address):
		'''
		update task control status to waypoint_user_pub
		params:
			status: task status:
						-1   canceled
						0    added to tasks queue, red light on
						1    executing
						3    completed, red light off
			address:   current task's address
		'''
		# address = task.address
		# msg = String()
		# status = str(address) + ':' + str(status)
		# msg.data = status
		# self.__feedback_pub.publish(msg)
		# pub task status to rosbridge_driver
		if status == 0:
			light_status = 1023
		elif status == 3:
			light_status = 0
		else:
			return
		msg = String()
		msg.data = 'light:' + str(address) + ',' + str(light_status)
		self.__feedback_pub.publish(msg)

	def __parse_var(self, condition):
		'''
		if the condition starts with '$', parsed as a variable. 
		It can be a defined variable, a env variable, 
		a param from ros param server, or a subscribed topic data
		'''
		pass

	def __close(self):
		rospy.loginfo('exit')

def main():
	try:
		taskManager = TaskManager()
		rospy.spin()
	except Exception as e:
		rospy.logerr(e)

if __name__ == '__main__':
	main()