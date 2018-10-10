#!/bin/bash

# ouiyeah @ 2018-02-22

while getopts "m:u:s:p:i:k:g:t:ah" ARG; do
    case $ARG in
    m)
        if [[ $OPTARG != "eth" ]] && [[ $OPTARG != "ap" ]] && [[ $OPTARG != "wifi" ]] && [[ $OPTARG != "auto" ]]; then
            echo "comm.sh -m usage:";
            echo -e "\teth\tethernet mode";
            echo -e "\tap\twifi ap mode";
            echo -e "\twifi\twifi infrastructure mode";
            echo -e "\tauto\tauto switch ap or infrastructure wifi mode";
            exit 2;
        fi
        COMM_MODE=$OPTARG;
        ;;
    u)
        COMM_UDEV=$OPTARG;
        ;;
    s)
        COMM_SSID=$OPTARG;
        ;;
    p)
        COMM_PASSWD=$OPTARG;
        ;;
    i)
        COMM_IP=$OPTARG;
        ;;
    k)
        COMM_MASK=$OPTARG;
        ;;
    g)
        COMM_GATEWAY=$OPTARG;
        ;;
    t)
        COMM_TIMESTAMP=$OPTARG;
        ;;
    a)
        COMM_AUTO="true";
        ;;
    h|?)
        echo "comm.sh usage:";
        echo -e "\t-m\tcomm mode (default for auto)";
        echo -e "\t-u\tudev name (default for eth0 or wlan0)";
        echo -e "\t-s\tssid name (default for hostname)";
        echo -e "\t-p\tpassword (default for first segment of hostname)";
        echo -e "\t-i\tip address (default for dynamic ip address)";
        echo -e "\t-k\tip mask (default for auto select)";
        echo -e "\t-g\tip gateway (default for xxx.xxx.xxx.1)";
        echo -e "\t-t\ttimestamp (default for 15 seconds)";
        echo -e "\t-a\tauto connect (default for false)";
        echo -e "\t-h\thelp info";
        exit 1;
        ;;
    esac
done

if [ ! -f /etc/resolv.conf ]; then
    sudo ln -s /run/resolvconf/resolv.conf /etc/resolv.conf;
fi

if [ ! -f /etc/acpi/comm.sh ]; then
    if [ -L /etc/acpi/comm-reset.sh ]; then
        sudo rm /etc/acpi/comm-reset.sh;
    fi
    sudo ln -s ~/catkin_ws/comm.sh /etc/acpi/comm.sh;
    sudo sed -i -e "/action=*/ c action=/etc/acpi/comm.sh" /etc/acpi/events/powerbtn;
    sudo service acpid restart;
fi

# enable networking and wifi
COMM_STATUS=`nmcli -t -f net-enabled nm status`;
if [[ $COMM_STATUS == "disabled" ]]; then
    nmcli nm enable true;
fi
COMM_STATUS=`nmcli -t -f wifi nm status`;
if [[ $COMM_STATUS == "disabled" ]]; then
    nmcli nm wifi on;
fi
COMM_STATUS=`nmcli -t -f state nm status`;
if [[ $COMM_STATUS == "asleep" ]]; then
    sudo nmcli nm sleep false; # use sudo permission to awake network-manager
fi

if [[ ! $COMM_MODE ]]; then
    COMM_MODE="ap";
fi
if [[ ! $COMM_TIMESTAMP ]]; then
    COMM_TIMESTAMP=30;
fi
if [[ ! $COMM_PATH ]]; then
    COMM_PATH=/etc/NetworkManager/system-connections/;
fi

sudo grep -LR -i "mac-address=" $COMM_PATH | xargs -i sudo sed -i '/^autoconnect/d' {};
sudo grep -LR -i "mac-address=" $COMM_PATH | xargs -i sudo sed -i '/type=*/a\autoconnect=false' {};

function comm_set() {
	if [[ ! $COMM_UDEV ]]; then
	    if [[ $COMM_MODE == "eth" ]]; then
	        COMM_UDEV="eth0";
	    else
	        COMM_UDEV="wlan0";
	    fi
	else # check mismatch between MODE and UDEV
	    if [[ $COMM_MODE == "eth" && $COMM_UDEV != eth* ]] || [[ $COMM_MODE != "eth" && $COMM_UDEV != wlan* ]]; then
	        COMM_ERROR="MODE_UDEV_MISMATCHED";
	        echo -e "\033[31m[ERROR] [`date +%s.%N`]: comm.sh $COMM_ERROR \033[0m";
	        exit 3;
	    fi
	fi
	if [[ ! $COMM_EMAC ]]; then
	    COMM_EMAC=`ifconfig -a | grep $COMM_UDEV | awk '{print $5}'`;
	    if [[ ! $COMM_EMAC ]]; then
	        if [[ $COMM_MODE == "auto" ]]; then
	            COMM_MODE="eth";
	            COMM_UDEV="eth0";
	            COMM_EMAC=`ifconfig -a | grep $COMM_UDEV | awk '{print $5}'`;
	        fi
	    fi
	    if [[ ! $COMM_EMAC ]]; then
	        COMM_ERROR="NET_MAC_MISSED";
	        echo -e "\033[31m[ERROR] [`date +%s.%N`]: comm.sh $COMM_ERROR \033[0m";
	        exit 4;
	    fi
	fi
	if [[ ! $COMM_SSID ]]; then
	    if [[ $COMM_MODE == "eth" ]]; then
	        COMM_SSID=$COMM_UDEV;
	    else
	        COMM_SSID=`hostname`;
	    fi
	fi
	if [[ ! $COMM_PASSWD ]]; then
	    COMM_PASSWD=`hostname | awk -F '-' '{print $1}'`;
        if (( ${#COMM_PASSWD} < 8 )); then # add 'x' prefix if passwd length < 8 chars
            COMM_PASSWD=`echo $COMM_PASSWD | awk '{printf("%08s\n",$0)}' | sed 's/\ /x/g'`;
        fi
	fi
	if [[ ! $COMM_UUID ]]; then
	    COMM_UUID=`cat /proc/sys/kernel/random/uuid`;
	fi
	if [[ ! $COMM_METHOD ]]; then
		if [[ $COMM_MODE == "ap" ]]; then
			COMM_METHOD="shared";
		else
		    if [[ $COMM_IP ]]; then
		        COMM_METHOD="manual";
		    else
		        COMM_METHOD="auto";
		    fi
		fi
	fi
	if [[ ! $COMM_MASK ]]; then
	    if [[ $COMM_IP ]]; then
	        COMM_MASK=24;
	    fi
	fi
	if [[ ! $COMM_GATEWAY ]]; then
	    if [[ $COMM_IP ]]; then
	    	if [[ $COMM_MODE != "eth" ]]; then
	            COMM_GATEWAY=`echo $COMM_IP | awk -F '.' '{print $1"."$2"."$3".1"}'`;
	    	fi
	    fi
	fi

    echo "[connection]"                                   | sudo tee -a $COMM_SSID ;
    echo "id="$COMM_SSID                                  | sudo tee -a $COMM_SSID ;
    echo "uuid="$COMM_UUID                                | sudo tee -a $COMM_SSID ;
    if [[ $COMM_MODE == "eth" ]]; then
    echo "type=802-3-ethernet"                            | sudo tee -a $COMM_SSID ;
    echo                                                  | sudo tee -a $COMM_SSID ;
    echo "[802-3-ethernet]"                               | sudo tee -a $COMM_SSID ;
    echo "duplex=full"                                    | sudo tee -a $COMM_SSID ;
    echo "mac-address="$COMM_EMAC                         | sudo tee -a $COMM_SSID ;
    else
    echo "type=802-11-wireless"                           | sudo tee -a $COMM_SSID ;
    if [[ ! $COMM_AUTO ]]; then
    echo "autoconnect=false"                              | sudo tee -a $COMM_SSID ;
    fi
    echo                                                  | sudo tee -a $COMM_SSID ;
    echo "[802-11-wireless]"                              | sudo tee -a $COMM_SSID ;
    echo "ssid="$COMM_SSID                                | sudo tee -a $COMM_SSID ;
    echo "mode="$1                                        | sudo tee -a $COMM_SSID ;
    echo "mac-address="$COMM_EMAC                         | sudo tee -a $COMM_SSID ;
    echo "security=802-11-wireless-security"              | sudo tee -a $COMM_SSID ;
    echo                                                  | sudo tee -a $COMM_SSID ;
    echo "[802-11-wireless-security]"                     | sudo tee -a $COMM_SSID ;
    echo "key-mgmt=wpa-psk"                               | sudo tee -a $COMM_SSID ;
    echo "psk="$COMM_PASSWD                               | sudo tee -a $COMM_SSID ;
    fi
    echo                                                  | sudo tee -a $COMM_SSID ;
    echo "[ipv4]"                                         | sudo tee -a $COMM_SSID ;
    echo "method="$COMM_METHOD                            | sudo tee -a $COMM_SSID ;
    if [[ $COMM_GATEWAY ]]; then
    echo "dns="$COMM_GATEWAY";"                           | sudo tee -a $COMM_SSID ;
    fi
    if [[ $COMM_IP ]]; then
    echo "address1="$COMM_IP"/"$COMM_MASK","$COMM_GATEWAY | sudo tee -a $COMM_SSID ;
    fi
    echo                                                  | sudo tee -a $COMM_SSID ;
    echo "[ipv6]"                                         | sudo tee -a $COMM_SSID ;
    echo "method=auto"                                    | sudo tee -a $COMM_SSID ;

    sudo chmod 600 $COMM_SSID;
    if [[ $COMM_AUTO ]]; then
        sudo grep -lR -i "mac-address="$COMM_EMAC $COMM_PATH | xargs -i sudo sed -i '/^autoconnect/d' {};
        sudo grep -lR -i "mac-address="$COMM_EMAC $COMM_PATH | xargs -i sudo sed -i '/type=*/a\autoconnect=false' {};
    fi
    sudo mv -f $COMM_SSID $COMM_PATH;
    sleep 1;
    nmcli con up id $COMM_SSID --nowait; # sudo service network-manager restart;
    comm_rst;
}

function comm_rst() {
    COMM_UDEV="";
    COMM_EMAC="";
    COMM_SSID="";
    COMM_PASSWD="";
    COMM_UUID="";
    COMM_METHOD="";
    COMM_IP="";
    COMM_MASK="";
    COMM_GATEWAY="";
    COMM_AUTO="";
}

if [[ $COMM_MODE == "wifi" ]]; then
    # sudo grep -lR -i "type=802-3-ethernet" $COMM_PATH | xargs -i sudo sed -i 's/\/..,/\/29,/' {};

    comm_set infrastructure;
    COMM_MODE="auto";
fi

if [[ $COMM_MODE == "auto" ]]; then
    TIMESTAMP_AUTO=`date +%s`;
    while [[ ! $WLAN_TIMEOUT ]]; do
        AUTO_LIST=`ifconfig -s | awk '{if (NR>1) print $1}'`;
        for AUTO_ITER in $AUTO_LIST; do
            if [[ $AUTO_ITER == wlan* ]]; then
                AUTO_IP=`ifconfig $AUTO_ITER 2>/dev/null | grep "inet addr" | awk -F: '{print $2}' | awk '{print $1}'`;
                if [[ $AUTO_IP ]]; then
                    WLAN_CONNECTED=$AUTO_ITER;
                    WLAN_TIMEOUT=false;
                fi
                if [[ ! $WLAN_CONNECTED ]]; then
	                WLAN_CONNECTED=false;
				    # sudo service network-manager restart; # redo enable wifi
                fi
                # echo $AUTO_ITER:$AUTO_IP;
            fi
        done
        if [[ ! $WLAN_CONNECTED ]]; then
            WLAN_TIMEOUT=false;
        fi
        TIMESTAMP_NOW=`date +%s`;
        if [ $(($TIMESTAMP_NOW-$TIMESTAMP_AUTO)) -gt $COMM_TIMESTAMP ]; then
            WLAN_TIMEOUT=true;
        fi
        sleep 1;
    done
    if [[ $WLAN_CONNECTED ]]; then
        if [[ $WLAN_CONNECTED == false ]]; then
            COMM_MODE="ap";
        else
            COMM_IP=192.168.0.9;
            COMM_MASK=29; # TODO: conside COMM_MASK=24 option
        fi
    else
        COMM_IP=192.168.0.7;
        COMM_GATEWAY=192.168.0.8;
    fi

    if [[ $COMM_MODE != "ap" ]]; then
        TIMESTAMP_AUTO=`date +%s`;
        while [[ ! $ETH_TIMEOUT ]]; do
            ETH_CONNECTED="";
            AUTO_UDEV="";
            AUTO_LIST=`ifconfig -s | awk '{if (NR>1) print $1}'`;
            for AUTO_ITER in $AUTO_LIST; do
                if [[ $AUTO_ITER == eth* ]]; then
                    AUTO_IP=`ifconfig $AUTO_ITER 2>/dev/null | grep "inet addr" | awk -F: '{print $2}' | awk '{print $1}'`;
                    if [[ $AUTO_IP ]]; then
                        # auto dhcp check
                        AUTO_METHOD=`nmcli -t -f name,devices con status | grep $AUTO_ITER | awk -F ':' '{print $1}' | xargs -i sudo grep -A 1 "\[ipv4\]" $COMM_PATH{} | tail -1 | awk -F '=' '{print $2}'`;
                        if [[ $AUTO_METHOD == "auto" ]]; then
                            if [[ ! $ETH_CONNECTED ]] || [[ $ETH_CONNECTED == "no" ]] || [[ $ETH_CONNECTED == "false" ]]; then
                                ETH_CONNECTED=true;
                            fi
                        else
                            if [[ $COMM_IP == $AUTO_IP ]]; then
                                AUTO_MASK=`ifconfig $AUTO_ITER 2>/dev/null | grep "inet addr" | awk -F: '{print $4}'`;
                                if [[ ! $COMM_MASK && $AUTO_MASK == 255.255.255.0 ]] || [[ $COMM_MASK == 29 && $AUTO_MASK == 255.255.255.248 ]]; then
                                    ETH_CONNECTED=$AUTO_ITER;
                                fi
                            fi
                        fi
                    else
                        if [[ ! $AUTO_UDEV ]]; then
                            AUTO_UDEV=$AUTO_ITER;
                        fi
                    fi
                    if [[ ! $ETH_CONNECTED ]] || [[ $ETH_CONNECTED == "no" ]]; then
                        # link detected check
                        AUTO_LINK=`sudo ethtool $AUTO_ITER | grep Link\ detected | awk -F ': ' '{print $2}'`;
                        if [[ $AUTO_LINK == "yes" ]]; then
                            ETH_CONNECTED=false;
                        else
                            ETH_CONNECTED=no;
                        fi
                    fi
                fi
            done
            if [[ $ETH_CONNECTED != "false" ]]; then
                ETH_TIMEOUT=false;
            fi
            TIMESTAMP_NOW=`date +%s`;
            if [ $(($TIMESTAMP_NOW-$TIMESTAMP_AUTO)) -gt $COMM_TIMESTAMP ]; then
                ETH_TIMEOUT=true;
            fi
            sleep 1;
        done
	    if [[ ! $ETH_CONNECTED ]]; then
	        COMM_ERROR="ETH_DEV_MISSED";
	        echo -e "\033[31m[ERROR] [`date +%s.%N`]: comm.sh $COMM_ERROR \033[0m";
   	        exit 5;
   		else
   		    if [[ $ETH_CONNECTED == false ]] && [[ $AUTO_UDEV ]]; then
		        COMM_MODE="eth";
                COMM_UDEV=$AUTO_UDEV;
   		    fi
	    fi
    fi
fi

if [[ $COMM_MODE == "ap" ]]; then
    # sudo grep -lR -i "type=802-3-ethernet" $COMM_PATH | xargs -i sudo sed -i 's/\/..,/\/24,/' {};

	comm_set ap;
    COMM_MODE="eth";
    COMM_IP=192.168.0.9;
fi

if [[ $COMM_MODE == "eth" ]]; then
    comm_set;
fi
