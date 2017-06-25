#!/bin/bash

while getopts "s" arg; do
    case $arg in
    s)
        SCREEN_SAVER="unlocked";
        ;;
    \?)
        echo "boot.sh usage:";
        echo -e "\t-s\tscreensaver unlock";
        exit 1;
        ;;
    esac
done

export CATKIN_WS=`S=\`dirname "$0"\`; cd $S; echo \`pwd\``; # TODO: shell to boot.js path link or not
export SHELL_PATH=`S=\`readlink "$0"\`; [ -z "$S" ] && S=$0; dirname $S`;
SHELL_PATH=$CATKIN_WS/$SHELL_PATH;
echo "[INFO] [SHELL_PATH] $SHELL_PATH";

if [[ $SCREEN_SAVER ]]; then
    echo -e "\033[33m[WARN] [SCREEN_SAVER] $SCREEN_SAVER \033[0m";
else
    gnome-terminal -x bash -c '$SHELL_PATH/lock.sh -s 7';
	SCREEN_SAVER="";
fi

if [ ! -f /etc/resolv.conf ]; then
    sudo ln -s /run/resolvconf/resolv.conf /etc/resolv.conf;
fi

source ~/catkin_ws/base.sh;

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
    node $CATKIN_WS/www/node/boot.js;
fi


# roslaunch bringup bringup-boot.launch;
