#!/bin/bash

# ouiyeah @ 2018-03-08

while getopts "p:fh" ARG; do
    case $ARG in
    p)
        GIT_PATH=$OPTARG;
        ;;
    f)
        GIT_FSCK="ENABLED";
        ;;
    h|?)
        echo "gitx.sh usage:";
        echo -e "\t-p\tgit path (default for .)";
        echo -e "\t-f\tgit fsck enabled";
        echo -e "\t-h\thelp info";
        exit 1;
        ;;
    esac
done

if [[ $GIT_PATH ]]; then
    cd $GIT_PATH;
fi

while [ ! -d .git ]; do
    cd ..;
    if [[ `pwd` == "/" ]]; then
        echo -e "\033[31m[ERROR] [`date +%s.%N`]: gitx.sh .git missing $GIT_PATH \033[0m";
        exit 2;
    fi
done

if [[ $GIT_FSCK ]]; then
    find .git/objects/ -type f -empty | xargs rm 2>/dev/null;
    git fetch -p;
    git fsck --full;
fi

# source ~/catkin_ws/base.sh;
# roscd bringup/param;
# ROS_USER_BRANCH=`git branch | awk -F '*' '{print $2}'`;
# ROS_USER_SELECT=`git branch | awk -F '*' '{print $1}'`;
# rostopic pub -1 /shell_feedback std_msgs/String "`echo dbparam $ROS_USER_BRANCH$ROS_USER_SELECT`";
