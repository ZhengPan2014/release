ROS_USER_SELECT="`cat ~/.ros/log/latest/rosout.log`";
rostopic pub -1 /shell_feedback std_msgs/String "`echo roslog ${ROS_USER_SELECT//:/*}`";
