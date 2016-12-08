source ~/catkin_ws/base.sh;
roscd bringup/param;
git checkout $ROS_DISTRO;
git branch -D $ROS_USER_PARAM;
