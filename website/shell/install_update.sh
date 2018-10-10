#!/bin/bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup
sudo sed -i s@cn.archive.ubuntu.com@mirrors.163.com@g /etc/apt/sources.list 
sudo sed -i s@security.ubuntu.com@mirrors.163.com@g /etc/apt/sources.list
sudo apt-get update
sudo apt-get install ros-indigo-laser-scan-matcher -y
sudo apt-get install ros-indigo-robot-localization -y
sudo apt-get install gimp -y
wget -P /home/hitrobot/Downloads http://download.teamviewer.com/download/linux/teamviewer_amd64.deb
sudo dpkg -i /home/hitrobot/Downloads/teamviewer_amd64.deb
sudo apt-get install -f -y

