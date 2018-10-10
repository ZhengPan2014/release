#!/bin/bash

# ouiyeah @ 2018-02-22

while getopts ":s:h" ARG; do
    case $ARG in
    s)
        TIMESTAMP=$OPTARG;
        ;;
    :)
        TIMESTAMP=0;
        ;;
    h|?)
        echo "lock.sh usage:";
        echo -e "\t-s\ttimestamp seconds (default or zero for inf)";
        echo -e "\t-h\thelp info";
        exit 1;
        ;;
    esac
done

if [[ $TIMESTAMP ]]; then
    TIMESTAMP_LOCK=`date +%s`;
    while [[ ! $SCREEN_SAVER ]]; do
        SCREEN_SAVER=`gnome-screensaver-command -q | awk -F ' ' '{print $4}'`;
        if [ "$SCREEN_SAVER" == "active" ]; then
            if [ $TIMESTAMP -eq 0 ]; then
                SCREEN_SAVER="";
            else
                TIMESTAMP_NOW=`date +%s`;
                if [ $(($TIMESTAMP_NOW-$TIMESTAMP_LOCK)) -lt $TIMESTAMP ]; then
                    SCREEN_SAVER="";
                fi
            fi
        else
            SCREEN_SAVER="";
            gnome-screensaver-command -a;
        fi
        sleep 0.1;
    done
else
    gnome-screensaver-command -a;
fi
