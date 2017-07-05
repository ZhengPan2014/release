rosrun dynamic_reconfigure dynparam set /sick_tim571 max_ang 1.65;
rosrun dynamic_reconfigure dynparam set /sick_tim571 min_ang -1.65;

rostopic pub -1 /move_base/local_costmap/footprint_setup geometry_msgs/Polygon '[[0.68, 0.48, 0.1], [0.68, -0.48, 0.1], [-0.48, -0.48, 0.1], [-0.48, 0.48, 0.1]]';
rostopic pub -1 /move_base/global_costmap/footprint_setup geometry_msgs/Polygon '[[0.68, 0.48, 0.1], [0.68, -0.48, 0.1], [-0.48, -0.48, 0.1], [-0.48, 0.48, 0.1]]';


# [[1.0, 0.48], [1.0, -0.48], [-0.48, -0.48], [-0.48, 0.48]';
# [[0.4,0.18],[0.32,0.3],[-0.32,0.3],[-0.4,0.18],[-0.4,-0.18],[-0.32,-0.3],[0.32,-0.3],[0.4,-0.18]]

# roslaunch bringup scan_filters_traction.launch;
