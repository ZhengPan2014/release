#!/usr/bin/python
# -*- coding: utf-8 -*-

import sys
import os

from jinja2 import Template

import roslaunch
from roslaunch.config import load_config_default

JS_PATTERN = 'launcher_pattern_no_launch.js'
JS_PATH = os.path.expanduser('~/catkin_ws/www/boot/launchers')

class Node(object):
	def __init__(self, name, pkg, t, args):
		self.name = name
		self.pkg = pkg
		self.type = t
		self.args = args

def parse_nodes(file):
	'''
	parse ros nodes from launch
	@param   file: launch file
	@type    file: str
	@return  list of rosnodes
	@rtype   [Node]
	'''
	config = load_config_default([file], None)
	config_items = vars(config).items()
	for name, values in config_items:
		if name == 'nodes':
			ros_nodes = [n for n in values]
	return ros_nodes

def parse_params(file):
	'''
	parse rosparams from launch
	@param   file: launch file
	@type    file: str
	@return  ros params
	@rtype   {param: value}
	@raises  IOError
	'''
	config = roslaunch.config.ROSLaunchConfig()
	loader = roslaunch.xmlloader.XmlLoader()
	try:
		loader.load(file, config, verbose = False)
	except Exception as e:
		raise IOError("Unable to load file %s" %file)
	# params_dict = {}
	# for k, v in config.params.items():
	# 	params_dict[str(k)] = v.value
	params = [(str(k), v.value) for k, v in config.params.items()]
	return params

def load_template(file):
	try:
		with open(file, 'r') as f:
			ctx = f.read()
	except Exception as e:
		raise IOError("Unable to load file %s" %file)
	return ctx

def launch2js(launch):
	'''
	parse ros nodes and rosparams from launch, and convert to js
	@param launch: launch file
	@type  launch: str
	'''
	nodes = parse_nodes(launch)
	params = parse_params(launch)
	template = Template(load_template(JS_PATTERN))

	name = launch.split('/')[-1][:-7]
	name = name.replace('-', '_')
	ctx = template.render(name=name, nodes=nodes, params=params)
	js = JS_PATH + '/' + name + '.js';
	try:
		with open(js, 'w') as f:
			f.write(ctx)
		print "Converted [%s]" %launch
	except Exception as e:
		print e

if __name__ == '__main__':
	if len(sys.argv) == 2:
		launch = os.path.expanduser(sys.argv[1])
		launch2js(launch)
	else:
		print 'Usage: convertor launch'

