export ROS_USER_SSID=`hostname`
export ROS_USER_PASSWD=hitrobot
export ROS_USER_UUID=`cat /proc/sys/kernel/random/uuid`
export ROS_USER_IFCONFIG=`ifconfig -a | grep wlan0`
export ROS_USER_MAC=`echo $ROS_USER_IFCONFIG | awk '{print $5}'`

cd /etc/NetworkManager/system-connections;
sudo rm "`sudo grep -lR "type=802-11-wireless"`"

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

sudo chmod 600 $ROS_USER_SSID
sudo service network-manager restart
