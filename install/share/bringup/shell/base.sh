source /opt/ros/indigo/setup.bash;
source ~/catkin_ws/devel/setup.bash;

export NODE_HOME=/usr/lib/node;
export NODE_PATH=${NODE_HOME}/lib/node_modules;
export PATH=${NODE_HOME}/bin:$PATH;

ROS_USER_IP=`ifconfig wlan0 2>/dev/null | grep "inet addr" | awk -F: '{print $2}' | awk '{print $1}'`;
if [[ $ROS_USER_IP ]]; then
    export ROS_IP=$ROS_USER_IP;
else
    ROS_USER_IP=`ifconfig eth0 2>/dev/null | grep "inet addr" | awk -F: '{print $2}' | awk '{print $1}'`;
    if [[ $ROS_USER_IP ]]; then
        export ROS_IP=$ROS_USER_IP;
    else
        ROS_USER_IP=`ifconfig eth1 2>/dev/null | grep "inet addr" | awk -F: '{print $2}' | awk '{print $1}'`;
        if [[ $ROS_USER_IP ]]; then
            export ROS_IP=$ROS_USER_IP;
        else
            unset ROS_USER_IP;
        fi;
    fi;
fi;

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

export ROS_USER_GROUP=`hostname`;
