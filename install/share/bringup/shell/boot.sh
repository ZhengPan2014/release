source ~/catkin_ws/base.sh;

roscd bringup;
shell/roslog-update.sh;

gnome-terminal -x bash -c 'shell/nodejs.sh;';

roslaunch bringup bringup-boot.launch;
