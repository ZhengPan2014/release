source ~/catkin_ws/base.sh;

roscd bringup;
if [ -d "auth/$ROS_USER_MODEL" ]; then
    ROS_USER_AUTH="true";
else
    ROS_USER_AUTH="false";
fi;
cd ~;

_FB=`echo user_auth:$ROS_USER_AUTH`;
rostopic pub -1 /shell_feedback std_msgs/String $_FB;
unset _FB;