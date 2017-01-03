source ~/catkin_ws/base.sh;
roscd bringup/param/;
#rosrun map_server map_saver -f map_edit;
roslaunch bringup map_edit_saver.launch;
sed -i -e "s/image:.*/image: map_edit.pgm/" map_edit.yaml;
rostopic pub -1 /shell_feedback std_msgs/String "save_map_edit";
