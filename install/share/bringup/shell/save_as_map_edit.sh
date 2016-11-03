#roslaunch bringup map_edit_as_saver.launch;
rosrun map_server map_saver -f map_edit map:=map_as;
rostopic pub -1 /shell_feedback std_msgs/String "save_as_map_edit";