#roslaunch bringup map_saver.launch;
roscd bringup/param/;
rosrun map_server map_saver;
rostopic pub -1 /shell_feedback std_msgs/String "save_map";