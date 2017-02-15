#export ROS_USER_HOSTNAME=hitrobot-will2;
sudo sed -i -e "/$(hostname)/ c $ROS_USER_HOSTNAME" /etc/hostname;
sudo sed -i "2s/$(hostname)/$ROS_USER_HOSTNAME/" /etc/hosts;
sudo reboot;
