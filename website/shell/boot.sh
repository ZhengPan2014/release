#!/bin/bash

while getopts "sdfah" ARG; do
    case $ARG in
    s)
        SCREEN_SAVER="DISABLED";
        ;;
    d)
        SYSTEM_DAEMON="ENABLED";
        ;;
    f)
        FORCE_UPDATE="ENABLED";
        ;;
    a)
        AUTO_BOOT="ENABLED";
        ;;
    ?)
        echo "boot.sh usage:";
        echo -e "\t-s\tscreen saver disabled";
        echo -e "\t-d\tsystem daemon enabled";
        echo -e "\t-f\tforce update enabled";
        echo -e "\t-f\tauto boot enabled";
        echo -e "\t-h\thelp info";
        exit 1;
        ;;
    esac
done

export PATH_SHELL=`dirname \`readlink -f $0\``;
cd $PATH_SHELL/../..;
export PATH_CATKIN=`pwd`;
export FILE_LOG=$PATH_CATKIN/../dbparam/.log;

if [ -f $FILE_LOG ]; then
    rm -f $FILE_LOG;
fi
if [[ $SCREEN_SAVER ]]; then
    echo -e "[ INFO] [`date +%s.%N`]: boot.sh SCREEN_SAVER_$SCREEN_SAVER" | tee -a $FILE_LOG;
else
    # gnome-terminal -x bash -c '$PATH_SHELL/lock.sh -s 7 | tee -a $FILE_LOG';
    $PATH_SHELL/lock.sh -s 7 | tee -a $FILE_LOG &
fi

if [[ $SYSTEM_DAEMON ]]; then
    echo -e "[ INFO] [`date +%s.%N`]: boot.sh SYSTEM_DAEMON_$SYSTEM_DAEMON" | tee -a $FILE_LOG;
    ps -ef | grep sysd.sh | head -1 | awk '{print $2}' | xargs -i kill {};
    # gnome-terminal -x bash -c '$PATH_SHELL/sysd.sh -s 49 | tee -a $FILE_LOG';
    $PATH_SHELL/sysd.sh -s 49 | tee -a $FILE_LOG &
else
    $PATH_SHELL/comm.sh -m auto;
fi

$PATH_SHELL/dpkg.sh -n git | tee -a $FILE_LOG;
if [ $? -eq 0 ]; then
    GIT_BRANCH=`git branch 2>/dev/null | awk -F '\* ' '{printf("%s", $2)}' 2>/dev/null`
    if [[ ! $GIT_BRANCH ]] || [ -L $PATH_CATKIN/install ]; then
        PATH_CATKIN_DEST=~/workspaces/hitrobot/ros_org;
        echo -e "[ INFO] [`date +%s.%N`]: boot.sh GIT_BRANCH_DEVEL $GIT_BRANCH" | tee -a $FILE_LOG;
    else
        PATH_CATKIN_DEST=~/workspaces/hitrobot/release;
        if [[ $GIT_BRANCH == "master" ]]; then
            echo -e "[ INFO] [`date +%s.%N`]: boot.sh GIT_BRANCH_INSTALL $GIT_BRANCH" | tee -a $FILE_LOG;
        fi
    fi
    if [[ $PATH_CATKIN != $PATH_CATKIN_DEST ]]; then
        echo -e "[ INFO] [`date +%s.%N`]: boot.sh PATH_CATKIN $PATH_CATKIN" | tee -a $FILE_LOG;
        if [[ $FORCE_UPDATE == "enabled" ]]; then
            echo -e "[ INFO] [`date +%s.%N`]: boot.sh FORCE_UPDATE updating ..." | tee -a $FILE_LOG;
            if [ -d $PATH_CATKIN_DEST ]; then
                mv -f $PATH_CATKIN_DEST $PATH_CATKIN_DEST-`echo "obase=16;\`date +%y%m%d\`"|bc`-`echo "obase=16;\`date +%H%M%S\`"|bc`;
            fi
            cp -rf $PATH_CATKIN $PATH_CATKIN_DEST;
            PATH_CATKIN=$PATH_CATKIN_DEST;
            echo -e "[ INFO] [`date +%s.%N`]: boot.sh FORCE_UPDATE updated ok" | tee -a $FILE_LOG;
        fi
    fi
fi

source $PATH_CATKIN/base.sh;
source $PATH_CATKIN/devel/setup.bash;
roscd bringup;
export PATH_BRINGUP=`pwd`;
cd $PATH_CATKIN;

$PATH_SHELL/dpkg.sh -n apache2 | tee -a $FILE_LOG;
export DPKG_APACHE2_ERROR=$?; # DPKG_APACHE2_THREAD=`ps aux | grep apache2 | grep -v grep`;
if [ $DPKG_APACHE2_ERROR -eq 0 ]; then
    if [ ! -L /var/www ]; then
        sudo rm -rf /var/www;
        sudo ln -s $PATH_CATKIN/www/ /var/www;
    fi
else
    sudo sysctl -w net.ipv4.ip_forward=1;
    sudo iptables -F -t nat;
    sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8080;
    sudo iptables -t nat -A OUTPUT -d localhost -p tcp --dport 80 -j REDIRECT --to-ports 8080;
    cd $PATH_CATKIN/www/html/debug;
    sudo python -m SimpleHTTPServer 8080;
fi

$PATH_SHELL/nodejs_org.sh | tee -a $FILE_LOG;
export NODEJS_ORG_ERROR=$?;

# TODO: temp strategy
$PATH_SHELL/dpkg.sh -n ros-indigo-tf2-web-republisher | tee -a $FILE_LOG;
$PATH_SHELL/dpkg.sh -n ros-indigo-laser-scan-matcher | tee -a $FILE_LOG;
$PATH_SHELL/dpkg.sh -n ros-indigo-laser-filters | tee -a $FILE_LOG;
$PATH_SHELL/dpkg.sh -n ros-indigo-robot-localization | tee -a $FILE_LOG;
$PATH_SHELL/dpkg.sh -n libgoogle-glog-dev | tee -a $FILE_LOG;
$PATH_SHELL/dpkg.sh -n libatlas-base-dev | tee -a $FILE_LOG;
$PATH_SHELL/dpkg.sh -n libeigen3-dev | tee -a $FILE_LOG;
$PATH_SHELL/dpkg.sh -n libsuitesparse-dev | tee -a $FILE_LOG;

# TODO: temp strategy
DPKG_SOUND_PLAY=`dpkg-query -W ros-indigo-sound-play | awk -F ' ' '{print $2}'`;
if [[ ! $DPKG_SOUND_PLAY ]]; then
    sudo apt-get update;
    sudo apt-get -y --force-yes install ros-indigo-sound-play;
    rosdep -y install sound_play;
    rosmake sound_play;
fi

if [ $NODEJS_ORG_ERROR -eq 0 ]; then
    $PATH_SHELL/roslog-update.sh; # TODO: use other strategy to replace this
    if [ $AUTO_BOOT ]; then
        $PATH_SHELL/pass.sh;
        export PASS_ERROR=$?;
        if [ $PASS_ERROR -eq 0 ]; then
            roslaunch bringup boot.launch;
        fi
        # node $PATH_CATKIN/www/node/boot.js -a;
    else
        node $PATH_CATKIN/www/node/boot.js;
    fi
fi
