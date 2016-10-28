roslaunch bringup map_as_saver.launch;
rostopic pub -1 /shell_feedback std_msgs/String "save_as_map";