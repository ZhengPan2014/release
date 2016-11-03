#roslaunch bringup map_edit_saver.launch;
rosrun map_server map_saver -f map_edit;
rostopic pub -1 /shell_feedback std_msgs/String "save_map_edit";