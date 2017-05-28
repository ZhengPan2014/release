#!/usr/bin/env python
import copy

import rospy
from std_msgs.msg import String
from yocs_msgs.msg import *
from task_manager.msg import *

global _CONVERT
_CONVERT = False

try:
	# TODO: rewrite yaml parser to support '<=', '>=', etc.
	import my_yaml as yaml
except Exception as e:
	try:
		import yaml
		_CONVERT = True
	except Exception as e:
		print e

class TaskProvider(object):
	def __init__(self):
		rospy.init_node('task_provider', anonymous=True)
		# rospy.on_shutdown(self.__close)
		self.operator_mapping = {'lt': '<', 'lte': '<=', 'e': '==', 'ne': '!=', 
			'gt': '>', 'gte': '>='}
		self.operator_mapping_reverse = {'<': 'lt', '<=': 'lte', '==': 'e', '!=': 'ne', 
			'>': 'gt', '>=': 'gte'}
		self.__dumped_tasks_pub = rospy.Publisher('dumped_tasks', TaskList, queue_size=1, latch=True)
		self.__task_add = rospy.Subscriber('task_add', Task, self.__task_add_cb, queue_size=1)
		self.__task_remove = rospy.Subscriber('task_remove', Task, self.__task_remove_cb, queue_size=1)
		self.__task_remove_all = rospy.Subscriber('task_remove_all', String, self.__task_remove_all_cb, queue_size=1)
		self.__yaml_file = rospy.get_param('~filename')
		rospy.loginfo(self.__yaml_file)
		try:
			with open(self.__yaml_file) as f:
				self.__raw_tasks = yaml.load(f)['tasks']
				if not self.__raw_tasks:
					self.__raw_tasks = []
				self.__tasks = self.__raw_to_tasklist(self.__raw_tasks)
				rospy.loginfo('Parsed %d tasks.' %len(self.__raw_tasks))
		except Exception as e:
			rospy.logerr(e)
		self.__dumped_tasks_pub.publish(self.__tasks)
		
	def __task_add_cb(self, msg):
		msg_org = copy.deepcopy(msg)
		splited_enable_expect = str(msg.enable_expect).split(' ')
		splited_disable_expect = str(msg.disable_expect).split(' ')
		if len(splited_enable_expect) == 2:
			operator = splited_enable_expect[0]
			if operator in self.operator_mapping_reverse:
				msg.enable_expect = str(msg.enable_expect).replace(operator, self.operator_mapping_reverse[operator])

		if len(splited_disable_expect) == 2:
			operator = splited_disable_expect[0]
			if operator in self.operator_mapping_reverse:
				msg.disable_expect = str(msg.disable_expect).replace(operator, self.operator_mapping_reverse[operator])

		_task = {'name': msg.name, 'address': msg.address, 'trajectory': msg.trajectory, 'enable_expect': msg.enable_expect, 'disable_expect': msg.disable_expect, 'priority': msg.priority}
		if _task in self.__raw_tasks:
			rospy.logwarn('Task: %s already exists.' %msg.name)
			return
		else:
			self.__tasks.tasks.append(msg_org)
			self.__raw_tasks.append(_task)
			self.__dump_tasks(self.__raw_tasks)
			self.__dumped_tasks_pub.publish(self.__tasks)
			rospy.loginfo('Added task: %s.' %msg.name)

	def __task_remove_cb(self, msg):
		for _task in self.__raw_tasks:
			if msg.name == _task['name']:
				self.__raw_tasks.remove(_task)
				self.__tasks = self.__raw_to_tasklist(self.__raw_tasks)
				self.__dump_tasks(self.__raw_tasks)
				self.__dumped_tasks_pub.publish(self.__tasks)
				rospy.loginfo('Deleted task: %s.' %msg.name)
				return
		rospy.logwarn('Task %s not in dumped tasks.' %msg.name)

	def __task_remove_all_cb(self, msg):
		self.__tasks = TaskList()
		self.__raw_tasks = []
		self.__dump_tasks(self.__raw_tasks)
		self.__dumped_tasks_pub.publish(self.__tasks)
		rospy.loginfo('Deteled all tasks.')

	def __dump_tasks(self, tasks):
		yamlfile = {'tasks': tasks}
		with open(self.__yaml_file, 'w') as f:
			yaml.dump(yamlfile, f, default_flow_style=False)

	def __convert_operator(self, tasks):
		'''
		convert a parsed yaml file with operators
		Params:
			yaml: a parsed yaml file
		Returns:
			a parsed yaml file with operators converted to '<=', '>=', etc. 
		'''
		if not yaml:
			return []
		for _task in tasks:
			enable_expect = str(_task['enable_expect'])
			splited_enable_expect = enable_expect.split(' ')
			if len(splited_enable_expect) == 2:
				operator = splited_enable_expect[0]
				if operator in self.operator_mapping:
					_task['enable_expect'] = _task['enable_expect'].replace(operator, self.operator_mapping[operator])
			disable_expect = str(_task['disable_expect'])
			splited_disable_expect = disable_expect.split(' ')
			if len(splited_disable_expect) == 2:
				operator = splited_disable_expect[0]
				if operator in self.operator_mapping:
					_task['disable_expect'] = _task['disable_expect'].replace(operator, self.operator_mapping[operator])
		return tasks

	def __raw_to_tasklist(self, raw_tasks):
		tasks = TaskList()
		if _CONVERT:
			raw_tasks_converted = self.__convert_operator(copy.deepcopy(raw_tasks))
		for _task in raw_tasks_converted:
			task = Task()
			task.header.frame_id = 'task'
			task.name = _task['name']
			task.address = _task['address']
			task.trajectory = _task['trajectory']
			task.enable_expect = str(_task['enable_expect'])
			task.disable_expect = str(_task['disable_expect'])
			task.priority = _task['priority']
			tasks.tasks.append(task)
		return tasks

	def __fake_tasks(self):
		'''
		test
		'''
		tasks = TaskList()
		for i in range(10):
			task = Task()
			task.header.frame_id = 'task'
			task.name = 'task' + str(i)
			task.address = i *100 + 1
			task.trajectory = 'traj' + str(i)
			task.expect = '= 1'
			task.priority = i % 2
			tasks.tasks.append(task)
		return tasks

	def __close(self):
		pass

def main():
	try:
		TaskProvider()
		rospy.spin()
	except Exception as e:
		rospy.logerr(e)

if __name__ == '__main__':
	main()