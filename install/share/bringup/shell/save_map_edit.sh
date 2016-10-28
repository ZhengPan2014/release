roslaunch bringup map_edit_saver.launch;
rostopic pub -1 /shell_feedback std_msgs/String "save_map_edit";