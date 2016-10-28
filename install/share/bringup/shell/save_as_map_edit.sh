roslaunch bringup map_edit_as_saver.launch;
rostopic pub -1 /shell_feedback std_msgs/String "save_as_map_edit";