rosnode kill /slam_gmapping;
rosnode kill /move_base /map_edit_server;
rostopic pub -1 /shell_string std_msgs/String "roslaunch bringup bringup-navigation.launch;";

until [[ -n $_FB ]]
do
    _FB=`rosnode list | grep move_base`;
done;
rostopic pub -1 /ros_mode std_msgs/String "navigation";
