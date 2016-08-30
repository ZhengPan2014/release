source /opt/ros/indigo/setup.bash
source ~/catkin_ws/devel/setup.bash

ROS_USER_MODEL=`hostname | awk -F '-' '{print $2}'`
if [ -d "$HOME/catkin_ws/devel/share/bringup/launch/$ROS_USER_MODEL" ]; then
    export ROS_USER_MODEL=$ROS_USER_MODEL
else
    if [ -d "$HOME/catkin_ws/src/bringup/launch/$ROS_USER_MODEL" ]; then
        export ROS_USER_MODEL=$ROS_USER_MODEL;
    else
        unset ROS_USER_MODEL
    fi
fi

export ROS_USER_IP=`hostname -I | awk -F '.' '{print $1"."$2"."$3".7"}'`
sudo rm /etc/udev/rules.d/70-persistent-net.rules
sudo ifconfig eth0 $ROS_USER_IP netmask 255.255.255.0 up

roslaunch bringup bringup-boot.launch
