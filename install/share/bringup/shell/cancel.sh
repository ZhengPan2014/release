rostopic pub -1 /move_base/cancel actionlib_msgs/GoalID -- {};
rostopic pub -1 /cmd_vel geometry_msgs/Twist -- {};
