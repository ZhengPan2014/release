ROS_USER_HISTORY=`grep "|" ~/catkin_ws/README.md`;
ROS_USER_VERSION=`echo $ROS_USER_HISTORY | awk -F '|' '{print $10}'`;
_FB=`echo version:$ROS_USER_VERSION | awk -F ' ' '{print $1$2}'`;
rostopic pub -1 /shell_feedback std_msgs/String $_FB;
unset _FB;