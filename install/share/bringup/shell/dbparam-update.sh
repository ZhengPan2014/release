source ~/catkin_ws/base.sh;
roscd bringup/param;
git add .;
git commit -m "update "$ROS_USER_PARAM;
git checkout $ROS_USER_PARAM;
roscd bringup;
source shell/dbparam-select.sh;
roslaunch bringup bringup-dbparam.launch;
