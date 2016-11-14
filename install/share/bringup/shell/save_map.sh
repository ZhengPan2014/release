#roslaunch bringup map_saver.launch;
source ~/catkin_ws/base.sh;
roscd bringup/param/;
rosrun map_server map_saver;
rostopic pub -1 /shell_feedback std_msgs/String "save_map";