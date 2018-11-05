#!/bin/bash

source /opt/ros/indigo/setup.bash;
source ~/catkin_ws/devel/setup.bash;

export NODE_HOME=/usr/lib/node;
export NODE_PATH=${NODE_HOME}/lib/node_modules;
export PATH=${NODE_HOME}/bin:$PATH;
