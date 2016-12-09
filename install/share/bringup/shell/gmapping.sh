rosnode kill /amcl /map_server;
rosnode kill /move_base /map_edit_server;
rostopic pub -1 /odom_reset std_msgs/Empty;
rostopic pub -1 /shell_string std_msgs/String "roslaunch bringup bringup-gmapping.launch;";
#roslaunch bringup bringup-hector_mapping.launch

until [[ -n $_FB ]]
do
    _FB=`rosnode list | grep slam_gmapping`;
    #_FB=`rosnode list | grep hector_mapping`;
done
rostopic pub -1 /ros_mode std_msgs/String "gmapping";
