source ~/catkin_ws/base.sh;
roscd bringup/param;
git checkout $ROS_USER_PARAM;
roscd bringup;
source shell/dbparam-select.sh;
