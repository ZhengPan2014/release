_RC=`grep "|" ~/catkin_ws/README.md`;
_FB=`echo $_RC | awk -F '|' '{print $10}'`;
_FB=`echo version:$_FB | awk -F ' ' '{print $1$2}'`;
rostopic pub -1 /shell_feedback std_msgs/String $_FB;
unset _FB; unset _RC;