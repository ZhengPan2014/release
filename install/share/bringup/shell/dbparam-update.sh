source ~/catkin_ws/base.sh;
roscd bringup/param;

LOCK_NAME="/tmp/dbparam.lock"
if ( set -o noclobber; echo "$$" > "$LOCK_NAME") 2> /dev/null; then
    trap 'rm -f "$LOCK_NAME"; exit $?' INT TERM EXIT; #lock

git add .;
git commit -m "update "$ROS_USER_PARAM;
git checkout $ROS_USER_PARAM;
roscd bringup;
source shell/dbparam-select.sh;

rostopic pub -1 /initialpose geometry_msgs/PoseWithCovarianceStamped '{"header": {"frame_id": "map"}, "pose": {"pose": {"orientation": {"w": 1.0}}}}';

    rm -f $LOCK_NAME; trap - INT TERM EXIT; #unlock 

roslaunch bringup bringup-dbparam.launch;

else
    rostopic pub -1 /shell_feedback std_msgs/String "error:dbparam"; exit 1;
fi;
