#!/bin/bash

# ouiyeah @ 2018-02-22

while getopts "n:d:a:t:p:h" ARG; do
    case $ARG in
    n)
        DPKG_NAME=$OPTARG;
        ;;
    d)
        DPKG_DISTRO=$OPTARG;
        ;;
    a)
        DPKG_ARCH=$OPTARG;
        ;;
    t)
        DPKG_TYPE=$OPTARG;
        ;;
    p)
        DPKG_PATH=$OPTARG;
        ;;
    h|?)
        echo "dpkg.sh usage:";
        echo -e "\t-n\tdpkg name (required)";
        echo -e "\t-d\tdpkg distro (default for missing)";
        echo -e "\t-a\tdpkg architecture (default for missing, option as dpkg)";
        echo -e "\t-t\tdpkg file type (default for zip)";
        echo -e "\t-p\tdpkg file path (default for ~/Downloads)";
        echo -e "\t-h\thelp info";
        exit 1;
        ;;
    esac
done

if [[ ! $DPKG_NAME ]]; then
    dpkg-query -l;
    echo "dpkg.sh -n usage:";
    echo -e "\tdpkg name (required)";
    exit 2;
fi

DPKG_SHOW=`dpkg-query -W $DPKG_NAME | awk -F ' ' '{print $2}'`;
if [[ ! $DPKG_SHOW ]] || [[ $DPKG_DISTRO && $DPKG_DISTRO != $DPKG_SHOW ]]; then
    sudo apt-get -y --force-yes install $DPKG_NAME;
    if [ $? -ne 0 ]; then
        DPKG_FILE=$DPKG_NAME;
        if [[ $DPKG_DISTRO ]]; then
            DPKG_FILE=$DPKG_FILE"-"$DPKG_DISTRO;
        fi
        if [[ $DPKG_ARCH ]]; then
            if [[ $DPKG_ARCH == "dpkg" ]]; then
                DPKG_ARCH=`dpkg --print-architecture`;
            fi
            DPKG_FILE=$DPKG_FILE"-"$DPKG_ARCH;
        fi
        if [[ ! $DPKG_TYPE ]]; then
            DPKG_TYPE="zip";
        fi
        if [[ ! $DPKG_PATH ]]; then
            DPKG_PATH=~/Downloads;
        fi
        DPKG_TARGET=$DPKG_PATH"/"$DPKG_FILE;
        DPKG_FILE=$DPKG_FILE"."$DPKG_TYPE;
        while [[ ! $DPKG_SHOW ]]; do
            DPKG_SOURCE=`find / -path "/proc" -prune -o -path "/mnt" -prune -o ! -readable -prune -o -name $DPKG_FILE -type f -print`;
            DPKG_SOURCE=`echo $DPKG_SOURCE | awk -F ' ' '{print $1}'`;
            if [[ $DPKG_SOURCE ]]; then
                echo $DPKG_SOURCE;
                sudo unzip -o $DPKG_SOURCE -d $DPKG_PATH;
                if [ $? -eq 0 ]; then
                    sudo chmod +x $DPKG_TARGET/install.sh;
                    sudo $DPKG_TARGET/install.sh;
                    DPKG_SHOW=`dpkg-query -W $DPKG_NAME | awk -F ' ' '{print $2}'`;
                fi
                sudo rm -rf $DPKG_TARGET;
            else
                DPKG_ERROR="UNINSTALL";
                echo -e "\033[31m[ERROR] [`date +%s.%N`]: dpkg.sh $DPKG_ERROR \033[0m";
                exit 3;
            fi
        done
    fi
fi

DPKG_STATUS=`dpkg-query -s $DPKG_NAME | grep Status: | awk -F ' ' '{print $2}'`;
if [[ $DPKG_STATUS != "install" ]]; then 
    sudo apt-get -y --force-yes install $DPKG_NAME;
    if [ $? -ne 0 ]; then
        DPKG_ERROR="DEINSTALL";
        echo -e "\033[31m[ERROR] [`date +%s.%N`]: dpkg.sh $DPKG_ERROR \033[0m";
        exit 4;
    fi
fi
