rosrun dynamic_reconfigure dynparam set /sick_tim571 max_ang 1.75;
rosrun dynamic_reconfigure dynparam set /sick_tim571 min_ang -1.75;

rostopic pub -1 /move_base/local_costmap/footprint_setup geometry_msgs/Polygon '[[0.40, 0.18, 0.1], [0.32, 0.30, 0.1], [-0.32, 0.30, 0.1], [-0.40, 0.18, 0.1], [-0.40, -0.18, 0.1], [-0.32, -0.30, 0.1], [0.32, -0.30, 0.1], [0.40, -0.18, 0.1]]';
rostopic pub -1 /move_base/global_costmap/footprint_setup geometry_msgs/Polygon '[[0.40, 0.18, 0.1], [0.32, 0.30, 0.1], [-0.32, 0.30, 0.1], [-0.40, 0.18, 0.1], [-0.40, -0.18, 0.1], [-0.32, -0.30, 0.1], [0.32, -0.30, 0.1], [0.40, -0.18, 0.1]]';

#rostopic pub -1 /move_base/local_costmap/footprint_setup geometry_msgs/Polygon '[[0.32, 0.29, 0.1], [0.37, 0.21, 0.1], [0.39, 0.08, 0.1], [0.40,0, 0.1], [0.39, -0.08, 0.1], [0.37, -0.21, 0.1], [0.32, -0.29, 0.1], [-0.40, -0.29, 0.1], [-0.40, 0.29, 0.1]]';
#rostopic pub -1 /move_base/global_costmap/footprint_setup geometry_msgs/Polygon '[[0.32, 0.29, 0.1], [0.37, 0.21, 0.1], [0.39, 0.08, 0.1], [0.40,0, 0.1], [0.39, -0.08, 0.1], [0.37, -0.21, 0.1], [0.32, -0.29, 0.1], [-0.40, -0.29, 0.1], [-0.40, 0.29, 0.1]]';

# roslaunch bringup scan_filters_normal.launch;