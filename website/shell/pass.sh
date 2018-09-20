#!/bin/bash

while getopts "s:l:h" ARG; do
    case $ARG in
    s)
        SUM_SOR=$OPTARG;
        ;;
    l)
        SUM_LIC=$OPTARG;
        ;;
    h|?)
        echo "pass.sh usage:";
        echo -e "\t-h\thelp info";
        exit 1;
        ;;
    esac
done

if [[ $SUM_SOR ]]; then
    SOR_L=`cat $SUM_SOR`;
    SOR_S=${SOR_L:37:1}${SOR_L:32:1}${SOR_L:27:1}${SOR_L:22:1}${SOR_L:17:1}${SOR_L:12:1}${SOR_L:7:1}${SOR_L:2:1};
    echo -e "[ INFO] [`date +%s.%N`]: pass.sh SUM_SOR $SUM_SOR $SOR_S" | tee -a $FILE_LOG;
else
    SOR_L=`md5sum /sys/class/net/eth0/address | awk -F ' ' '{print $1}'`;
    SOR_S=`hostname | awk -F '-' '{print $3$2$1}'`;
    if (( ${#SOR_S} < 8 )); then # add 'x' prefix if hostname suffix length < 8 chars
        SOR_S=`echo $SOR_S | awk '{printf("%08s\n",$0)}' | sed 's/\ /x/g'`;
    fi
    SUM_SOR="/tmp/.sor";
    echo ${SOR_L:30:2}${SOR_S:7:1}${SOR_L:26:4}${SOR_S:6:1}${SOR_L:22:4}${SOR_S:5:1}${SOR_L:18:4}${SOR_S:4:1}${SOR_L:14:4}${SOR_S:3:1}${SOR_L:10:4}${SOR_S:2:1}${SOR_L:6:4}${SOR_S:1:1}${SOR_L:2:4}${SOR_S:0:1}${SOR_L:0:2} >$SUM_SOR;
fi

LIC_L=`sha224sum $SUM_SOR | awk -F ' ' '{print $1}'`;
LIC_S=${LIC_L:55:1}${LIC_L:46:1}${LIC_L:37:1}${LIC_L:28:1}${LIC_L:19:1}${LIC_L:10:1}${LIC_L:1:1};
if [[ $SUM_LIC ]]; then
    echo -e "[ INFO] [`date +%s.%N`]: pass.sh SUM_LIC $SUM_LIC $LIC_S" | tee -a $FILE_LOG;
    echo $LIC_S >$SUM_LIC;
else
    SUM_LIC=~/catkin_ws/.license;
fi
if [ ! -f $SUM_LIC ] || [[ `cat $SUM_LIC` != $LIC_S ]]; then
    PASS_ERROR="LICENSE_MISMATCH";
    echo -e "\033[31m[ERROR] [`date +%s.%N`]: pass.sh $PASS_ERROR \033[0m";
    exit 2;
fi
