source ~/catkin_ws/base.sh;
roscd bringup/param/;
#rosrun map_server map_saver;
roslaunch bringup map_saver.launch;
sed -i -e "s/image:.*/image: map.pgm/" map.yaml;
rostopic pub -1 /shell_feedback std_msgs/String "save_map";