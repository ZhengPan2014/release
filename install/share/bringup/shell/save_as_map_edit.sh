#roslaunch bringup map_edit_as_saver.launch;
source ~/catkin_ws/base.sh;
roscd bringup/param/;
rosrun map_server map_saver -f map_edit map:=map_edit_as;
rostopic pub -1 /shell_feedback std_msgs/String "save_as_map_edit";