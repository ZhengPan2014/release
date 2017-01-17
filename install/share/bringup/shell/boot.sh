source ~/catkin_ws/base.sh;

roscd bringup;
shell/roslog-update.sh;

gnome-terminal -x bash -c 'export NODE_HOME=/usr/lib/node; export PATH=${NODE_HOME}/bin:$PATH; shell/nodejs.sh;';

roslaunch bringup bringup-boot.launch;
