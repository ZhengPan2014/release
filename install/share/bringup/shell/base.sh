source /opt/ros/indigo/setup.bash;
source ~/catkin_ws/devel/setup.bash;

ROS_USER_MODEL=`hostname | awk -F '-' '{print $2}'`;
roscd bringup;
if [ -d "launch/$ROS_USER_MODEL" ]; then
    export ROS_USER_VALID=true;
    export ROS_USER_MODEL=$ROS_USER_MODEL;
else
    export ROS_USER_VALID=false;
    unset ROS_USER_MODEL;
fi;
cd ~;

#ROS_IP=`hostname -I`;
#if [[ $ROS_IP ]]; then
#    export ROS_IP=`echo $ROS_IP | awk '{print $NF}'`;
#else
#    unset ROS_IP;
#fi;
export ROS_USER_IP=`hostname -I | awk -F '.' '{print $1"."$2"."$3".7"}'`;
