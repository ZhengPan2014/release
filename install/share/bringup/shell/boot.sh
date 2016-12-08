sleep 2s;

source ~/catkin_ws/base.sh;

roscd bringup;
gnome-terminal -x bash -c 'shell/nodejs.sh';

roslaunch bringup bringup-boot.launch;
