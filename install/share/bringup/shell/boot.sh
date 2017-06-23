#!/bin/bash

while getopts "s" arg; do
    case $arg in
    s)
        SCREEN_SAVER="unlocked";
        ;;
    ?)
        echo "boot.sh usage:";
        echo -e "\t-s\tscreensaver unlock";
        exit 1;
        ;;
    esac
done

if [[ $SCREEN_SAVER ]]; then
    echo -e "\033[33m[WARN] [SCREEN_SAVER] $SCREEN_SAVER \033[0m";
else
    TIMESTAMP_BOOT=`date +%s`;
	while [[ ! $SCREEN_SAVER ]]; do
        SCREEN_SAVER=`gnome-screensaver-command -q | awk -F ' ' '{print $4}'`;
        if [ "$SCREEN_SAVER" == "active" ]; then
            TIMESTAMP_NOW=`date +%s`;
            if [ $(($TIMESTAMP_NOW-$TIMESTAMP_BOOT)) -lt 7 ]; then
                SCREEN_SAVER="";
            fi
        else
            SCREEN_SAVER="";
            gnome-screensaver-command -a;
        fi
        sleep 1;
	done
	SCREEN_SAVER="";
fi

source ~/catkin_ws/base.sh;

if [ ! -f /etc/resolv.conf ]; then
    sudo ln -s /run/resolvconf/resolv.conf /etc/resolv.conf;
fi

export SHELL_PATH=`S=\`readlink "$0"\`; [ -z "$S" ] && S=$0; dirname $S`;
SHELL_PATH=`dirname $0`"/"$SHELL_PATH;
echo "[INFO] [SHELL_PATH] $SHELL_PATH";
cd $SHELL_PATH;

source dpkg-apache2.sh;

source nodejs_org.sh;

export FILE_LOG=../param/.log;
if [ -f $FILE_LOG ]; then
    rm $FILE_LOG;
fi
if [[ $NODEJS_ORG_ERROR ]]; then
    if [[ $SCREEN_SAVER ]]; then
        echo -e "[WARN] [SCREEN_SAVER] $SCREEN_SAVER">>$FILE_LOG;
    fi
    echo "[INFO] [SHELL_PATH] $SHELL_PATH">>$FILE_LOG;
    if [[ $DPKG_APACHE2_ERROR ]]; then
        echo -e "[ERROR] [DPKG_APACHE2] $DPKG_APACHE2_ERROR">>$FILE_LOG;
    fi
    echo -e "[ERROR] [NODEJS_ORG] $NODEJS_ORG_ERROR">>$FILE_LOG;
else
    source roslog-update.sh; # TODO: use other strategy to replace this
    node `dirname $0`/www/node/boot.js;
fi


# roslaunch bringup bringup-boot.launch;
