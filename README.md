# history

| 版本            | 日期            | 发布人          | 更新内容
| --------------- | --------------- | --------------- | --------------- 
| 1.1.1.4_beta    | 2016-08-11      | 韩立芹          | 修改move_base中的recovery_behaviour；修改imu的timeout问题
| 1.1.1.3_beta    | 2016-06-23      | 仇隽挺          | 修改gmapping_pose，更改robot_pose_ekf位置
| 1.1.1.2_beta    | 2016-06-17      | 张邺            | 增加imu设备的相关功能；开机时不启动手柄；增大xy_tolerance参数
| 1.1.1.1_beta    | 2016-05-27      | 张邺            | 修改reboot的权限问题
| 1.1.1.0_beta    | 2016-05-23      | 韩立芹          | 改进了windows调试，串口权限，开机timeout，ip恢复默认，取消速度滤除
| 1.1.0.1_alpha   | 2016-05-05      | 张邺            | 改进了clear_costmaps/map/version/null/hector等system_shell的功能
| 1.1.0.0_beta    | 2016-05-04      | 张邺            | 修改地图的topic为map_edit2；默认激光头ip地址为192.168.0.7

***
# ethernet connection

set dns as network provider 

> 211.136.17.107 / 211.136.112.50 for china mobile

remember to set the link for network connection if failed to visit websites after installation

>$ sudo ln -s /run/resolvconf/resolv.conf /etc/resolv.conf

***
# version update
>$ ln -s ~/workspaces/hitrobot/ros-indigo/ ~/catkin_ws
