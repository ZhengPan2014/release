source ~/catkin_ws/base.sh;
roscd bringup/param;
git add .;
git commit -m "delete "$ROS_USER_PARAM;
git checkout $ROS_DISTRO;
git branch -D $ROS_USER_PARAM;
roscd bringup;
source shell/dbparam-select.sh;
