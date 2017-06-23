#!/bin/bash

export DPKG_APACHE2_SHOW=`dpkg-query -W apache2 | awk -F ' ' '{print $2}'`;
export DPKG_APACHE2_ARCH=`dpkg --print-architecture`;
export DPKG_APACHE2_NAME="apache2_"$DPKG_APACHE2_ARCH;
export DPKG_APACHE2_FILE=$DPKG_APACHE2_NAME".zip";
export DPKG_APACHE2_PATH=~/Downloads/;
export DPKG_APACHE2_SOURCE="";
export DPKG_APACHE2_TARGET=$DPKG_APACHE2_PATH$DPKG_APACHE2_NAME;
export DPKG_APACHE2_WARN="";
export DPKG_APACHE2_ERROR="";

if [[ ! $DPKG_APACHE2_SHOW ]]; then
    sudo apt-get -y --force-yes install apache2;
    if [ $? -eq 0 ]; then
        DPKG_APACHE2_SHOW=`dpkg-query -W apache2 | awk -F ' ' '{print $2}'`;
    else
        while [[ ! $DPKG_APACHE2_SHOW ]]; do
            DPKG_APACHE2_SOURCE=`find / -path "/proc" -prune -o -path "/mnt" -prune -o ! -readable -prune -o -name $DPKG_APACHE2_FILE -type f -print`;
            DPKG_APACHE2_SOURCE=`echo $DPKG_APACHE2_SOURCE | awk -F ' ' '{print $1}'`;
            if [[ $DPKG_APACHE2_SOURCE ]]; then
                echo $DPKG_APACHE2_SOURCE;
                sudo unzip -o $DPKG_APACHE2_SOURCE -d $DPKG_APACHE2_PATH;
                if [ $? -eq 0 ]; then
                    sudo chmod +x $DPKG_APACHE2_TARGET/install.sh;
                    sudo $DPKG_APACHE2_TARGET/install.sh;
                    DPKG_APACHE2_SHOW=`dpkg-query -W apache2 | awk -F ' ' '{print $2}'`;
                fi
                sudo rm -rf $DPKG_APACHE2_TARGET;
            else
                DPKG_APACHE2_SHOW="uninstalled";
                DPKG_APACHE2_ERROR="uninstalled";
            fi
        done
    fi
fi

if [[ ! $DPKG_APACHE2_ERROR ]]; then
    if [ ! -L /var/www ]; then
        sudo rm -rf /var/www;
        sudo ln -s ~/catkin_ws/www/ /var/www;
    fi
fi
