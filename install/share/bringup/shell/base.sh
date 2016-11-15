source /opt/ros/indigo/setup.bash;
source ~/catkin_ws/devel/setup.bash;

ROS_USER_MODEL=`hostname | awk -F '-' '{print $2}'`;
roscd bringup;
if [ -d "launch/$ROS_USER_MODEL" ]; then
    export ROS_USER_MODEL=$ROS_USER_MODEL
else
    unset ROS_USER_MODEL
fi

export ROS_USER_IP=`hostname -I | awk -F '.' '{print $1"."$2"."$3".7"}'`

