if [ -f /etc/resolv.conf ]; then
    export ROS_USER_RESOLV=true;
else
    export ROS_USER_RESOLV=false;
    sudo ln -s /run/resolvconf/resolv.conf /etc/resolv.conf;
fi;

export ROS_USER_SSID=`hostname`;
export ROS_USER_PASSWD=hitrobot;
export ROS_USER_UUID=`cat /proc/sys/kernel/random/uuid`;
export ROS_USER_MAC=`ifconfig -a | grep wlan | awk '{print $5}'`;

cd /etc/NetworkManager/system-connections;
sudo rm *;

echo "[connection]"                                 | sudo tee -a $ROS_USER_SSID
echo "id="$ROS_USER_SSID                            | sudo tee -a $ROS_USER_SSID
echo "uuid="$ROS_USER_UUID                          | sudo tee -a $ROS_USER_SSID
echo "type=802-11-wireless"                         | sudo tee -a $ROS_USER_SSID
#echo "autoconnect=false"                            | sudo tee -a $ROS_USER_SSID
echo                                                | sudo tee -a $ROS_USER_SSID
echo "[802-11-wireless]"                            | sudo tee -a $ROS_USER_SSID
echo "ssid="$ROS_USER_SSID                          | sudo tee -a $ROS_USER_SSID
echo "mode=ap"                                      | sudo tee -a $ROS_USER_SSID
echo "mac-address="$ROS_USER_MAC                    | sudo tee -a $ROS_USER_SSID
echo "security=802-11-wireless-security"            | sudo tee -a $ROS_USER_SSID
echo                                                | sudo tee -a $ROS_USER_SSID
echo "[802-11-wireless-security]"                   | sudo tee -a $ROS_USER_SSID
echo "key-mgmt=wpa-psk"                             | sudo tee -a $ROS_USER_SSID
echo "psk="$ROS_USER_PASSWD                         | sudo tee -a $ROS_USER_SSID
echo                                                | sudo tee -a $ROS_USER_SSID
echo "[ipv4]"                                       | sudo tee -a $ROS_USER_SSID
echo "method=shared"                                | sudo tee -a $ROS_USER_SSID
echo                                                | sudo tee -a $ROS_USER_SSID
echo "[ipv6]"                                       | sudo tee -a $ROS_USER_SSID
echo "method=auto"                                  | sudo tee -a $ROS_USER_SSID

sudo chmod 600 $ROS_USER_SSID;

export ROS_USER_SSID=ethernet;
export ROS_USER_IP=192.168.0.9;
export ROS_USER_GATEWAY=0.0.0.0;
export ROS_USER_UUID=`cat /proc/sys/kernel/random/uuid`;
export ROS_USER_MAC=`ifconfig -a | grep eth | awk '{print $5}'`;

cd /etc/NetworkManager/system-connections;
sudo rm "`sudo grep -lR "type=802-3-ethernet"`";

echo "[connection]"                                 | sudo tee -a $ROS_USER_SSID
echo "id="$ROS_USER_SSID                            | sudo tee -a $ROS_USER_SSID
echo "uuid="$ROS_USER_UUID                          | sudo tee -a $ROS_USER_SSID
echo "type=802-3-ethernet"                          | sudo tee -a $ROS_USER_SSID
#echo "autoconnect=false"                            | sudo tee -a $ROS_USER_SSID
echo                                                | sudo tee -a $ROS_USER_SSID
echo "[802-3-ethernet]"                             | sudo tee -a $ROS_USER_SSID
echo "duplex=full"                                  | sudo tee -a $ROS_USER_SSID
echo "mac-address="$ROS_USER_MAC                    | sudo tee -a $ROS_USER_SSID
echo                                                | sudo tee -a $ROS_USER_SSID
echo "[ipv4]"                                       | sudo tee -a $ROS_USER_SSID
echo "method=manual"                                | sudo tee -a $ROS_USER_SSID
echo "address1="$ROS_USER_IP"/29,"$ROS_USER_GATEWAY | sudo tee -a $ROS_USER_SSID
echo                                                | sudo tee -a $ROS_USER_SSID
echo "[ipv6]"                                       | sudo tee -a $ROS_USER_SSID
echo "method=auto"                                  | sudo tee -a $ROS_USER_SSID

sudo chmod 600 $ROS_USER_SSID;
sudo service network-manager restart;
