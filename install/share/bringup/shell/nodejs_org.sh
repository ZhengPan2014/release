#!/bin/bash

export NODE_HOME=/usr/lib/node;
export NODE_PATH=${NODE_HOME}/lib/node_modules;
export PATH=${NODE_HOME}/bin:$PATH;

export NODEJS_ORG_CURRENT="v7.10.0";
export NODEJS_ORG_VERSION=`node -v`;
export NODEJS_ORG_ARCH=`arch`;
if [[ $NODEJS_ORG_ARCH=="x86_64" ]]; then
    NODEJS_ORG_ARCH="x64";
fi
export NODEJS_ORG_NAME="node-"$NODEJS_ORG_CURRENT"-linux-"$NODEJS_ORG_ARCH;
export NODEJS_ORG_FILE=$NODEJS_ORG_NAME".tar.xz";
export NODEJS_ORG_PATH=~/Downloads/;
export NODEJS_ORG_WGET="https://nodejs.org/dist/"$NODEJS_ORG_CURRENT"/"$NODEJS_ORG_FILE;
export NODEJS_ORG_SOURCE="";
export NODEJS_ORG_TARGET=/usr/lib/node/;
export NODEJS_ORG_MODULES="node_modules";
export NODEJS_ORG_NPM="";
export NODEJS_ORG_WARN="";
export NODEJS_ORG_ERROR="";

if [[ $NODEJS_ORG_VERSION != $NODEJS_ORG_CURRENT ]]; then
    while [[ ! $NODEJS_ORG_SOURCE ]]; do
        NODEJS_ORG_SOURCE=`find / -path "/proc" -prune -o -path "/mnt" -prune -o ! -readable -prune -o -name $NODEJS_ORG_FILE -type f -print`;
        NODEJS_ORG_SOURCE=`echo $NODEJS_ORG_SOURCE | awk -F ' ' '{print $1}'`;
        if [[ ! $NODEJS_ORG_SOURCE ]]; then
            wget -P $NODEJS_ORG_PATH $NODEJS_ORG_WGET;
            if [ $? -eq 0 ]; then
                NODEJS_ORG_SOURCE=$NODEJS_ORG_PATH$NODEJS_ORG_FILE;
            fi
        fi

        if [[ $NODEJS_ORG_SOURCE ]]; then
            tar xvJf $NODEJS_ORG_SOURCE -C $NODEJS_ORG_PATH;
            if [ $? -eq 0 ]; then
                sudo rm -rf $NODEJS_ORG_TARGET;
                sudo mv -f $NODEJS_ORG_PATH$NODEJS_ORG_NAME $NODEJS_ORG_TARGET;
            else
                sudo rm -rf $NODEJS_ORG_SOURCE;
                NODEJS_ORG_SOURCE="";
            fi
        else
            NODEJS_ORG_SOURCE="uninstalled";
            if [[ $NODEJS_ORG_VERSION ]]; then
                NODEJS_ORG_WARN=$NODEJS_ORG_VERSION;
            else
                NODEJS_ORG_ERROR="uninstalled";
            fi
        fi
    done

    # TODO: intend to rewrite as js code
    while [[ ! $NODEJS_ORG_NPM ]]; do
        NODEJS_ORG_NPM=`find / -path "/proc" -prune -o -path "/mnt" -prune -o ! -readable -prune -o -name $NODEJS_ORG_MODULES-$NODEJS_ORG_CURRENT-linux-$NODEJS_ORG_ARCH.zip -type f -print`;
        NODEJS_ORG_NPM=`echo $NODEJS_ORG_NPM | awk -F ' ' '{print $1}'`;
        if [[ $NODEJS_ORG_NPM ]]; then
            unzip $NODEJS_ORG_NPM -C $NODEJS_ORG_PATH;
            if [ $? -eq 0 ]; then
                sudo rm -rf $NODEJS_ORG_TARGET/lib/$NODEJS_ORG_MODULES;
                sudo mv -f $NODEJS_ORG_PATH$NODEJS_ORG_MODULES $NODEJS_ORG_TARGET/lib/$NODEJS_ORG_MODULES;
            else
                sudo rm -rf $NODEJS_ORG_NPM;
                NODEJS_ORG_NPM="";
            fi
        else
            cd ~/catkin_ws/www/node;
            npm install;
            if [ $? -ne 0 ]; then
                NODEJS_ORG_ERROR="npm uninstalled";
            fi
            NODEJS_ORG_NPM=$NODEJS_ORG_MODULES;
            cd $SHELL_PATH;
        fi
    done
fi
