#!/bin/bash

while getopts "m:u:s:p:i:g:" opt; do
    case $opt in
    m)
        if [[ $OPTARG != "eth" ]] && [[ $OPTARG != "ap" ]] && [[ $OPTARG != "wifi" ]] && [[ $OPTARG != "auto" ]]; then
            echo "comm.sh -m usage:";
            echo -e "\teth\tethernet mode";
            echo -e "\tap\twifi ap mode";
            echo -e "\twifi\twifi infrastructure mode";
            echo -e "\tauto\tauto switch ap or infrastructure wifi mode";
            exit 1;
        fi
        ROS_USER_MODE=$OPTARG;
        ;;
    u)
        ROS_USER_UDEV=$OPTARG;
        ;;
    s)
        ROS_USER_SSID=$OPTARG;
        ;;
    p)
        ROS_USER_PASSWD=$OPTARG;
        ;;
    i)
        ROS_USER_IP=$OPTARG;
        ;;
    g)
        ROS_USER_GATEWAY=$OPTARG;
        ;;
    \?)
        echo "comm.sh usage:";
        echo -e "\t-m\tcomm mode (default for auto)";
        echo -e "\t-u\tudev name (default for eth0 or wlan0)";
        echo -e "\t-s\tssid name (default for hostname)";
        echo -e "\t-p\tpassword (default for first segment of hostname)";
        echo -e "\t-i\tip address (default for dynamic ip address)";
        echo -e "\t-p\tgateway (default for xxx.xxx.xxx.1)";
        exit 1;
        ;;
    esac
done

if [[ ! $ROS_USER_MODE ]]; then
    ROS_USER_MODE="auto";
fi
if [[ ! $ROS_USER_UDEV ]]; then
    if [[ $ROS_USER_MODE == "eth" ]]; then
        ROS_USER_UDEV="eth0";
    else
        ROS_USER_UDEV="wlan0";
    fi
fi
if [[ ! $ROS_USER_SSID ]]; then
    if [[ $ROS_USER_MODE == "eth" ]]; then
        ROS_USER_SSID=$ROS_USER_UDEV;
    else
        ROS_USER_SSID=`hostname`;
    fi
fi
if [[ ! $ROS_USER_PASSWD ]]; then
    ROS_USER_PASSWD=`hostname | awk -F '-' '{print $1}'`;
fi
if [[ ! $ROS_USER_UUID ]]; then
    ROS_USER_UUID=`cat /proc/sys/kernel/random/uuid`;
fi
if [[ ! $ROS_USER_MAC ]]; then
    ROS_USER_MAC=`ifconfig -a | grep $ROS_USER_UDEV | awk '{print $5}'`;
    if [[ ! $ROS_USER_MAC ]]; then
        ROS_USER_ERROR="MAC_MISSED";
        echo -e "\033[31m[ERROR] [COMM_NET] $ROS_USER_ERROR \033[0m"
        exit 1;
    fi
fi
if [[ ! $ROS_USER_METHOD ]]; then
    if [[ $ROS_USER_IP ]]; then
        ROS_USER_METHOD="manual";
    else
        ROS_USER_METHOD="auto";
    fi
fi
if [[ ! $ROS_USER_GATEWAY ]]; then
    if [[ $ROS_USER_IP ]]; then
        ROS_USER_GATEWAY=`echo $ROS_USER_IP | awk -F '.' '{print $1"."$2"."$3".1"}'`;
    fi
fi
if [[ ! $ROS_USER_PATH ]]; then
    ROS_USER_PATH=/etc/NetworkManager/system-connections/;
fi

if [[ $ROS_USER_MODE == "auto" ]]; then
    ROS_USER_AUTO_LIST=`ifconfig -s | awk '{if (NR>1) print $1}'`;
    for ROS_USER_AUTO_ITER in $ROS_USER_AUTO_LIST; do
        if [[ $ROS_USER_AUTO_ITER == wlan* ]]; then
            ROS_USER_AUTO_IP=`ifconfig $ROS_USER_AUTO_ITER 2>/dev/null | grep "inet addr" | awk -F: '{print $2}' | awk '{print $1}'`;
            if [[ $ROS_USER_AUTO_IP ]]; then
                ROS_USER_AUTO_CONNECTED=$ROS_USER_AUTO_ITER;
            fi
            echo $ROS_USER_AUTO_ITER:$ROS_USER_AUTO_IP;
        fi
    done
    if [[ ! $ROS_USER_AUTO_CONNECTED ]]; then
        ROS_USER_MODE="ap";
    fi
fi

if [[ $ROS_USER_MODE == "wifi" ]]; then
    echo "[connection]"                                 | sudo tee -a $ROS_USER_SSID ;
    echo "id="$ROS_USER_SSID                            | sudo tee -a $ROS_USER_SSID ;
    echo "uuid="$ROS_USER_UUID                          | sudo tee -a $ROS_USER_SSID ;
    echo "type=802-11-wireless"                         | sudo tee -a $ROS_USER_SSID ;
    # echo "autoconnect=false"                            | sudo tee -a $ROS_USER_SSID ;
    echo                                                | sudo tee -a $ROS_USER_SSID ;
    echo "[802-11-wireless]"                            | sudo tee -a $ROS_USER_SSID ;
    echo "ssid="$ROS_USER_SSID                          | sudo tee -a $ROS_USER_SSID ;
    echo "mode=infrastructure"                          | sudo tee -a $ROS_USER_SSID ;
    echo "mac-address="$ROS_USER_MAC                    | sudo tee -a $ROS_USER_SSID ;
    echo "security=802-11-wireless-security"            | sudo tee -a $ROS_USER_SSID ;
    echo                                                | sudo tee -a $ROS_USER_SSID ;
    echo "[802-11-wireless-security]"                   | sudo tee -a $ROS_USER_SSID ;
    echo "key-mgmt=wpa-psk"                             | sudo tee -a $ROS_USER_SSID ;
    echo "psk="$ROS_USER_PASSWD                         | sudo tee -a $ROS_USER_SSID ;
    echo                                                | sudo tee -a $ROS_USER_SSID ;
    echo "[ipv4]"                                       | sudo tee -a $ROS_USER_SSID ;
    echo "method="$ROS_USER_METHOD                      | sudo tee -a $ROS_USER_SSID ;
    if [[ $ROS_USER_GATEWAY ]]; then
    echo "dns="$ROS_USER_GATEWAY";"                     | sudo tee -a $ROS_USER_SSID ;
    fi
    if [[ $ROS_USER_IP ]]; then
    echo "address1="$ROS_USER_IP"/24,"$ROS_USER_GATEWAY | sudo tee -a $ROS_USER_SSID ;
    fi
    echo                                                | sudo tee -a $ROS_USER_SSID ;
    echo "[ipv6]"                                       | sudo tee -a $ROS_USER_SSID ;
    echo "method=auto"                                  | sudo tee -a $ROS_USER_SSID ;

    sudo chmod 600 $ROS_USER_SSID;
    sudo grep -lR -i "mac-address="$ROS_USER_MAC $ROS_USER_PATH | xargs -i sudo sed -i '/^autoconnect/d' {};
    sudo grep -lR -i "mac-address="$ROS_USER_MAC $ROS_USER_PATH | xargs -i sudo sed -i '/type=*/a\autoconnect=false' {};
    sudo mv -f $ROS_USER_SSID $ROS_USER_PATH;
    sudo service network-manager restart;
fi


if [[ $ROS_USER_MODE == "ap" ]]; then
    echo "[connection]"                                 | sudo tee -a $ROS_USER_SSID ;
    echo "id="$ROS_USER_SSID                            | sudo tee -a $ROS_USER_SSID ;
    echo "uuid="$ROS_USER_UUID                          | sudo tee -a $ROS_USER_SSID ;
    echo "type=802-11-wireless"                         | sudo tee -a $ROS_USER_SSID ;
    # echo "autoconnect=false"                            | sudo tee -a $ROS_USER_SSID ;
    echo                                                | sudo tee -a $ROS_USER_SSID ;
    echo "[802-11-wireless]"                            | sudo tee -a $ROS_USER_SSID ;
    echo "ssid="$ROS_USER_SSID                          | sudo tee -a $ROS_USER_SSID ;
    echo "mode=ap"                                      | sudo tee -a $ROS_USER_SSID ;
    echo "mac-address="$ROS_USER_MAC                    | sudo tee -a $ROS_USER_SSID ;
    echo "security=802-11-wireless-security"            | sudo tee -a $ROS_USER_SSID ;
    echo                                                | sudo tee -a $ROS_USER_SSID ;
    echo "[802-11-wireless-security]"                   | sudo tee -a $ROS_USER_SSID ;
    echo "key-mgmt=wpa-psk"                             | sudo tee -a $ROS_USER_SSID ;
    echo "psk="$ROS_USER_PASSWD                         | sudo tee -a $ROS_USER_SSID ;
    echo                                                | sudo tee -a $ROS_USER_SSID ;
    echo "[ipv4]"                                       | sudo tee -a $ROS_USER_SSID ;
    echo "method=shared"                                | sudo tee -a $ROS_USER_SSID ;
    echo                                                | sudo tee -a $ROS_USER_SSID ;
    echo "[ipv6]"                                       | sudo tee -a $ROS_USER_SSID ;
    echo "method=auto"                                  | sudo tee -a $ROS_USER_SSID ;

    sudo chmod 600 $ROS_USER_SSID;
    sudo grep -lR -i "mac-address="$ROS_USER_MAC $ROS_USER_PATH | xargs -i sudo sed -i '/^autoconnect/d' {};
    sudo grep -lR -i "mac-address="$ROS_USER_MAC $ROS_USER_PATH | xargs -i sudo sed -i '/type=*/a\autoconnect=false' {};
    sudo mv -f $ROS_USER_SSID $ROS_USER_PATH;
    sudo service network-manager restart;
fi


if [[ $ROS_USER_MODE == "eth" ]]; then
    echo "[connection]"                                 | sudo tee -a $ROS_USER_SSID ;
    echo "id="$ROS_USER_SSID                            | sudo tee -a $ROS_USER_SSID ;
    echo "uuid="$ROS_USER_UUID                          | sudo tee -a $ROS_USER_SSID ;
    echo "type=802-3-ethernet"                          | sudo tee -a $ROS_USER_SSID ;
    # echo "autoconnect=false"                            | sudo tee -a $ROS_USER_SSID ;
    echo                                                | sudo tee -a $ROS_USER_SSID ;
    echo "[802-3-ethernet]"                             | sudo tee -a $ROS_USER_SSID ;
    echo "duplex=full"                                  | sudo tee -a $ROS_USER_SSID ;
    echo "mac-address="$ROS_USER_MAC                    | sudo tee -a $ROS_USER_SSID ;
    echo                                                | sudo tee -a $ROS_USER_SSID ;
    echo "[ipv4]"                                       | sudo tee -a $ROS_USER_SSID ;
    echo "method="$ROS_USER_METHOD                      | sudo tee -a $ROS_USER_SSID ;
    if [[ $ROS_USER_GATEWAY ]]; then
    echo "dns="$ROS_USER_GATEWAY";"                     | sudo tee -a $ROS_USER_SSID ;
    fi
    if [[ $ROS_USER_IP ]]; then
    echo "address1="$ROS_USER_IP"/24,"$ROS_USER_GATEWAY | sudo tee -a $ROS_USER_SSID ;
    fi
    echo                                                | sudo tee -a $ROS_USER_SSID ;
    echo "[ipv6]"                                       | sudo tee -a $ROS_USER_SSID ;
    echo "method=auto"                                  | sudo tee -a $ROS_USER_SSID ;

    sudo chmod 600 $ROS_USER_SSID;
    sudo grep -lR -i "mac-address="$ROS_USER_MAC $ROS_USER_PATH | xargs -i sudo sed -i '/^autoconnect/d' {};
    sudo grep -lR -i "mac-address="$ROS_USER_MAC $ROS_USER_PATH | xargs -i sudo sed -i '/type=*/a\autoconnect=false' {};
    sudo mv -f $ROS_USER_SSID $ROS_USER_PATH;
    sudo service network-manager restart;
fi
