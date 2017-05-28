cd ~/catkin_ws; catkin_make -G"Eclipse CDT4 - Unix Makefiles" -DCMAKE_BUILD_TYPE=Release install;
rm -r website/*; cp -r www/* website/; cd website/server/; grunt;
cd ~/workspaces/hitrobot; mv release release-$ROS_DISTRO; zip -yr release-$ROS_DISTRO.zip release-$ROS_DISTRO; mv release-$ROS_DISTRO release;
