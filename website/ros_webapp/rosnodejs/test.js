let rosnodejs = require('../rosnodejslib/index.js');
class RosNodeJs
{
	constructor(){
		this.config = paramServer.getParam('config');
		this.lastNetworkSetting = this.config.networkSetting;
		this.dischargeCurve = this.config.powerCurve.discharge;
		this.chargeCurve = this.config.powerCurve.charge;
		if (this.dischargeCurve[0] < this.dischargeCurve[1])
		{
			this.dischargeCurve.reverse();
		}
		if (this.chargeCurve[0] < this.chargeCurve[1])
		{
			this.chargeCurve.reverse();
		}
		this.robotStatus = {};
		this.mapEditImg = null;
		(async () =>{
			let nh = await rosnodejs.initNode('rosnodejs', {
					onTheFly: true	
				});
			this.std_msgs = rosnodejs.require('std_msgs').msg;
			this.nav_msgs = rosnodejs.require('nav_msgs').msg;
			this.cmdStringPub = nh.advertise('/cmd_string', 'std_msgs/String', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
			this.waypointUserPub = nh.advertise('/waypoint_user_pub', 'std_msgs/String', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
			this.mapSub = nh.subscribe('/map', 'nav_msgs/OccupancyGrid', this.mapSubCb());
			this.mapEditObstacleSub = nh.subscribe('/map_edit_obstacle', 'geometry_msgs/Polygon', this.mapEditObstacleSubCb(), {
				queueSize: 1000
			});
			this.mapEditDoneSub = nh.subscribe('/cmd_string', 'std_msgs/String', this.mapEditDoneSubCb(), {
				queueSize: 1000
			});
			// subscribe waypoint_user_sub
			this.waypointUserSub = nh.subscribe('/waypoint_user_sub', 'std_msgs/String', this.waypointUserSubCb());
			// gmapping status
			this.mappingStatusPub = nh.advertise('/rosnodejs/mappingStatus', 'std_msgs/String', {
				queueSize: 10,
				latching: true,
				throttleMs: -1
			});
			// publish robot status
			this.robotStatusPub = nh.advertise('/rosnodejs/robot_status', 'std_msgs/String', {
				queueSize: 10,
				latching: true,
				throttleMs: -1
			});
			this.netWorkSettingPub = nh.advertise('/rosnodejs/last_network_setting', 'std_msgs/String', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
			this.rosModeSub = nh.subscribe('/ros_mode', 'std_msgs/String', this.mappingStatusCb());
			this.shellFeedbackSub = nh.subscribe('/shell_feedback', 'std_msgs/String', this.mappingStatusCb());
			this.netWorkSettingSub = nh.subscribe('/rosnodejs/network_setting', 'std_msgs/String', this.netWorkSettingSubCb());
			// robot status service
			this.robotStatusSrv = nh.advertiseService('/rosnodejs/robot_status', 'rosapi/Publishers', (req, res) => {
				if (this.robotStatus)
				{
					var status = [];
					for (var key in this.robotStatus)
					{
						status.push(`${key}: S{this.robotStatus[key]}`);
					}
					res.publishers = status;
					return true;
				}
			});

			// check chargestatus
			this.checkRobotStatus('pubsuber_auto_charge', 0.5);
			if (this.lastNetworkSetting)
			{
				this.pubLastNetworkSetting(this.lastNetworkSetting);
			}
		})();
	}
}


