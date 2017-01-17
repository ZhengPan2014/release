cd ~/catkin_ws; catkin_make --force-cmake -G"Eclipse CDT4 - Unix Makefiles" -DCMAKE_BUILD_TYPE=Release install;
rm -r website/*; cp -r www/* website/; cd website/server/; grunt;