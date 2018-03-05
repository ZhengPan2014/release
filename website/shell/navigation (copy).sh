#!/bin/bash

rosnode kill /$AGV_NAME/hector_mapping;
rosnode kill /$AGV_NAME/slam_gmapping;
rosnode kill /$AGV_NAME/move_base /$AGV_NAME/map_edit_server;
rostopic pub -1 /$AGV_NAME/shell_string std_msgs/String "roslaunch bringup bringup-navigation.launch;";

until [[ -n $_FB ]]
do
    _FB=`rosnode list | grep move_base`;
done;
rostopic pub -1 /$AGV_NAME/ros_mode std_msgs/String "navigation";
