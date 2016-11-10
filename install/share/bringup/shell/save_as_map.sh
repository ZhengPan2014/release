#roslaunch bringup map_as_saver.launch;
roscd bringup/param/;
rosrun map_server map_saver map:=map_as;
rostopic pub -1 /shell_feedback std_msgs/String "save_as_map";