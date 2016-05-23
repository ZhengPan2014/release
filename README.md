# history

| 版本            | 日期            | 发布人          | 更新内容
| --------------- | --------------- | --------------- | --------------- 
| 1.1.0.0_beta    | 2016-05-04      | 张邺            | 修改地图的topic为map_edit2；默认激光头ip地址为192.168.0.72
| 1.1.0.1_alpha   | 2016-05-05      | 张邺            | 改进了clear_costmaps/map/version/null/hector等system_shell的功能
| 1.1.1.0_beta    | 2016-05-23      | 张邺            | 改进了windows调试，串口权限，开机timeout，ip恢复默认，取消速度滤除

***
# install system

![install_start](https://raw.githubusercontent.com/hitrobotgroup/release/master/img/install_start.png "install_start")
![select_language](https://raw.githubusercontent.com/hitrobotgroup/release/master/img/select_language.png "select_language")
![select_custom](https://raw.githubusercontent.com/hitrobotgroup/release/master/img/select_custom.png "select_custom")
![select_type](https://raw.githubusercontent.com/hitrobotgroup/release/master/img/select_type.png "select_type")
![select_location](https://raw.githubusercontent.com/hitrobotgroup/release/master/img/select_location.png "select_location")
![select_keyboard](https://raw.githubusercontent.com/hitrobotgroup/release/master/img/select_keyboard.png "select_keyboard")
![install_wait](https://raw.githubusercontent.com/hitrobotgroup/release/master/img/install_wait.png "install_wait")
![install_complete](https://raw.githubusercontent.com/hitrobotgroup/release/master/img/install_complete.png "install_complete")

***
# ethernet connection

![ethernet_connection](https://raw.githubusercontent.com/hitrobotgroup/release/master/img/ethernet_connection.png "ethernet_connection")

set dns as network provider 

> 211.136.17.107 / 211.136.112.50 for china mobile

remember to set the link for network connection if failed to visit websites after installation

>$ sudo ln -s /run/resolvconf/resolv.conf /etc/resolv.conf
