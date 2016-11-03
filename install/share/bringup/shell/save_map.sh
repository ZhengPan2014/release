#roslaunch bringup map_saver.launch;
rosrun map_server map_saver -f map;
rostopic pub -1 /shell_feedback std_msgs/String "save_map";