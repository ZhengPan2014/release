sleep 10s

source ~/catkin_ws/base.sh

#if [ -f "/etc/udev/rules.d/70-persistent-net.rules" ]; then
#    sudo rm /etc/udev/rules.d/70-persistent-net.rules
#fi
#sudo ifconfig eth0 $ROS_USER_IP netmask 255.255.255.0 up

roslaunch bringup bringup-boot.launch
