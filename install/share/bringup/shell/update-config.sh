cd ~/workspaces/hitrobot/dbparam;
cp -f ~/catkin_ws/src/bringup/param/map* .;
sed -i -e "s/image:.*/image: map.pgm/" map.yaml;
sed -i -e "s/image:.*/image: map_edit.pgm/" map_edit.yaml;

cd ~/workspaces/hitrobot;
rm -rf release;
mv release-$ROS_DISTRO release;

sed -i -e "s/devel\/setup.bash/base.sh/" ~/.bashrc;
_TTYS=/dev/`dmesg | awk '/ttyS/{print $4}'`;
echo 'SUBSYSTEM=="tty", ENV{DEVNAME}=="'$_TTYS'", SYMLINK+="ttySx"' | sudo tee -a /etc/udev/rules.d/70-persistent-tty.rules
if [[ $_TTYS == "/dev/ttyS4" ]]; then
    echo "source ~/catkin_ws/base.sh" >> /etc/profile;
fi;
unset _TTYS;

echo 'hitrobot:343' | sudo chpasswd;

if [ -d "/var/www" ]; then
    ;
else
    sudo apt-get install -y apache2;
    sudo rm -rf /var/www;
    sudo ln -s ~/catkin_ws/www/ /var/www;
fi;
sudo apt-get install -y ros-indigo-yujin-ocs;

_HOST=hitrobot-will2-00x;
sudo sed -i -e "/$(hostname)/ c $_HOST" /etc/hostname;
sudo sed -i "2s/$(hostname)/$_HOST/" /etc/hosts;
unset _HOST;
sudo reboot;
