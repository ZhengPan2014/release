rostopic pub -1 /move_base/cancel actionlib_msgs/GoalID -- {};
rostopic pub -1 /cmd_vel geometry_msgs/Twist -- {};
#rostopic pub -1 /yocs_cmd_vel_mux/input/navigation geometry_msgs/Twist -- {};