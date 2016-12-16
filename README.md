# history

| 版本            | 日期            | 发布人          | 更新内容
| --------------- | --------------- | --------------- | --------------- 
| 1.1.3.5_alpha   | 2016-12-15      | 张邺            | 暂时修复dwa_planner开机原地旋转footprint初始化的问题
| 1.1.3.4_beta    | 2016-12-15      | 张邺            | 优化rosbridge_driver资源占用率；增加imu_hop_check防跳变机制
| 1.1.3.3_beta    | 2016-12-14      | 张邺            | 删除stm32_driver/aqmd_driver冗余代码；修改imu_reverse问题
| 1.1.3.2_beta    | 2016-12-13      | 张邺            | 更新整理了html代码；完善了与威尔2的代码兼容性和自动更新问题
| 1.1.3.1_alpha   | 2016-11-14      | 张邺            | 修改了map/waypoint的git方式；修复了rosbridge_drver的spinOnce问题
| 1.1.3.0_alpha   | 2016-11-03      | 张邺            | 重新更新了系统架构；加入http和tcp服务器
| 1.1.2.0_beta    | 2016-09-14      | 韩立芹          | 修复了开机位置有可能丢失问题；增加自动更新功能
| 1.1.1.5_beta    | 2016-08-29      | 仇隽挺          | 恢复到了原来膨胀层的版本，修改了gmapping_pose
| 1.1.1.4_beta    | 2016-08-11      | 韩立芹          | 修改move_base中的recovery_behaviour；修改imu的timeout问题
| 1.1.1.3_beta    | 2016-06-23      | 仇隽挺          | 修改gmapping_pose，更改robot_pose_ekf位置
| 1.1.1.2_beta    | 2016-06-17      | 张邺            | 增加imu设备的相关功能；开机时不启动手柄；增大xy_tolerance参数
| 1.1.1.1_beta    | 2016-05-27      | 张邺            | 修改reboot的权限问题
| 1.1.1.0_beta    | 2016-05-23      | 韩立芹          | 改进了windows调试，串口权限，开机timeout，ip恢复默认，取消速度滤除
| 1.1.0.1_alpha   | 2016-05-05      | 张邺            | 改进了clear_costmaps/map/version/
