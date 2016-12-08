source ~/catkin_ws/base.sh;
roscd bringup/param;
ROS_USER_BRANCH=`git branch | awk -F '*' '{print $2}'`;
ROS_USER_SELECT=`git branch | awk -F '*' '{print $1}'`;
rostopic pub -1 /shell_feedback std_msgs/String "`echo dbparam $ROS_USER_BRANCH$ROS_USER_SELECT`";
