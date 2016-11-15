ROS_USER_MODEL=`hostname | awk -F '-' '{print $2}'`;
_FB=`echo user_model:$ROS_USER_MODEL`;
rostopic pub -1 /shell_feedback std_msgs/String $_FB;
unset _FB;