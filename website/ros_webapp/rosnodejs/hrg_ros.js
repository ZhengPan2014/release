'use strict';

let rosnodejs = require('../rosnodejslib/index.js');
let paramServer = require('../lib/init').paramServer;

let fs = require('fs');
let gm = require('gm').subClass({imageMagick: true});
let shell = require('shelljs');

let path = '../../src';
let PATH_SHELL = '~/catkin_ws/install/share/bringup/shell/';
let CONFIG_FILE = `../../install/share/bringup/auth/${paramServer.getParam('model')}/hitrobot.cfg`;
if (fs.existsSync(path))
{
	PATH_SHELL = '~/catkin_ws/src/hitrobot/bringup/shell/';
	CONFIG_FILE = `${path}/hitrobot/bringup/auth/${paramServer.getParam('model')}/hitrobot.cfg`;
}
if (process.env.PATH_SHELL)
{
	PATH_SHELL = process.env.PATH_SHELL;
}
else
{
	console.log('[INFO]process.env.PATH_SHELL not found, using default');
}

const VOL_FACTOR = 3.3*11/4096;
// map edit
const MAP_EDIT = '/home/hitrobot/workspaces/hitrobot/dbparam/map_edit.pgm';
const OBSTACLE_COLOR = '#000';
const CLEAR_COLOR = '#fff';
const OBSTACLE_SIZE = 2;
const CLEAR_SIZE = 5;
// power
const LOW_POWER_THRESHOLD = 0.20;
// mapping status
const MAPPING_STATUS = {
	Navigation: "navigation",
    Gmapping: "gmapping",
    GamppingPose: "gmapping_pose",
    SaveMap: "save_map",
    SaveMapEdit: "save_map_edit",
    SaveAsMap: "save_as_map",
    SaveAsMapEdit: "save_as_map_edit",
    LoadMap: "load_map",
    LoadMapEdit: "load_map_edit"
};
// charge status
const CHARGE_STATUS = {
	UNCONTACT: 0,
	CONTACT: 1,
	VOLABNORMAL: 2,
	CHARGING: 3
};
const LIGHT_STATUS = {
	RED: 'pub_light_r',
	GREEN: 'pub_light_g',
	BLUE: 'pub_light_b',
	YELLOW: 'pub_light_y'
};
const DIAGNOSTIC_LEVEL = {
	OK: 0,
	WARN: 1,
	ERROR: 2,
	STALE: 3
};

const CHARGE_ADJUST = 'pubsuber_charge_adjust';
const CHARGE_YAW_TOLERANCE = 0.5; //rad
const CHARGE_ADJUST_EXPECT = 'charge_adjust_done';
const ANGULAR_VEL = 0.10;
const DOCK_BEGIN_NAME = 'map_dockBegin';
const CHARGING_TRAJ_NAME = 'dock_begin_charge';
const DOCK_BEGIN_DIS = 0.35;
const DOCK_OFFSET = 0.00; // 0.35
const CHARGER_MOVED_THRESHOLD = 0.12;
const AUTO_CHARGE_TRY_NUM = 2;
const DOCK_CMD_VEL = 0.05;

// charger setting
var defaultPose = {
	position: {
		x: 0,
		y: 0,
		z: 0
	},
	orientation: {
		x: 0,
		y: 0,
		z: 0,
		w: 1
	}
}

var waypointsForDock = {
	pubsuber_auto_charge: {
		name: 'pubsuber_auto_charge',
		frame_id: 'pubsuber',
		close_enough: 0,
		goal_timeout: 0,
		failure_mode: '3',
		pose: defaultPose
	},
	pubsuber_charge_adjust: {
		name: 'pubsuber_charge_adjust',
		frame_id: 'pubsuber',
		close_enough: 0,
		goal_timeout: 0,
		failure_mode: 'charge_adjust_done',
		pose: defaultPose
	},
	vel_forward: {
		name: 'vel_forward',
		frame_id: 'cmd_vel',
		close_enough: DOCK_CMD_VEL,
		goal_timeout: 0,
		failure_mode: 'NONE',
		pose: defaultPose
	},
	vel_stop: {
		name: 'vel_stop',
		frame_id: 'cmd_vel',
		close_enough: 0,
		goal_timeout: 0,
		failure_mode: 'NONE',
		pose: defaultPose
	},
	vel_backward: {
		name: 'vel_backward',
		frame_id: 'cmd_vel',
		close_enough: -DOCK_CMD_VEL,
		goal_timeout: 0,
		failure_mode: 'NONE',
		pose: defaultPose
	},
	scanMarker_scan_6: {
		name: 'scanMarker_scan_6',
		frame_id: 'scan_marker',
		close_enough: 0.6,
		goal_timeout: 0,
		failure_mode: 'LOOP',
		pose: defaultPose
	},
	timer_sail: {
		name: 'timer_sail',
		frame_id: 'timer',
		close_enough: 0,
		goal_timeout: DOCK_BEGIN_DIS/DOCK_CMD_VEL,
		failure_mode: 'NONE',
		pose: defaultPose
	},
	map_dockBegin: {
		name: 'map_dockBegin',
		frame_id: 'map',
		close_enough: 0,
		goal_timeout: 0,
		failure_mode: 'LOOP',
		pose: defaultPose
	}
};
var trajsForDock = {
	dock_begin_charge: ['map_dockBegin', 'scanMarker_scan_6', 'pubsuber_charge_adjust',
		'vel_forward', 'pubsuber_auto_charge', 'vel_stop'],
	dock_end_charge: ['vel_backward', 'timer_sail', 'vel_stop']
};

class RosNodeJs
{
	constructor(){
		this.robotStatus = {};
		this.mapEditImg = null;
		this.lightStatus = null;
		this.robotPose = null;
		this.dockPose = null;
		this.chargeAdjustIdle = true;
		this.triedNum = 0; 
		this.waypoints = null;
		this.trajectories = null;

		this.config = paramServer.getParam('config');
		if (!this.config)
		{
			return;
		}
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
		(async () =>{
			let nh = await rosnodejs.initNode('rosnodejs', {
					onTheFly: true	
				});
			this.std_msgs = rosnodejs.require('std_msgs').msg;
			this.nav_msgs = rosnodejs.require('nav_msgs').msg;
			this.diagnostic_msgs = rosnodejs.require('diagnostic_msgs').msg;
			this.geometry_msgs = rosnodejs.require('geometry_msgs').msg;
			this.yocs_msgs = rosnodejs.require('yocs_msgs').msg;

			//console.log(this.yocs_msgs)

			this.navCtrlPub = nh.advertise('/nav_ctrl', 'yocs_msgs/NavigationControl', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
			// hrg2.0 ONLY
			// charging status
			this.chargingStatusPub = nh.advertise('/rosnodejs/charging_status', 'yocs_msgs/NavigationControlStatus', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
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
			this.waypointUserSubPub = nh.advertise('/waypoint_user_sub', 'std_msgs/String', {
				queueSize: 1,
				latching: false,
				throttleMs: -1
			});
			this.cmdVelPub = nh.advertise('/cmd_vel', 'geometry_msgs/Twist', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
			// add/del waypoint
			this.addWaypointPub = nh.advertise('/waypoint_add', 'yocs_msgs/Waypoint', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
			this.delWaypointPub = nh.advertise('/waypoint_remove', 'yocs_msgs/Waypoint', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
			// add/del trajectory
			this.addTrajPub = nh.advertise('/trajectory_add', 'yocs_msgs/Trajectory', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
			this.delTrajPub = nh.advertise('/trajectory_remove', 'yocs_msgs/Trajectory', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			})

			this.mapSub = nh.subscribe('/map', 'nav_msgs/OccupancyGrid', this.mapSubCb());
			this.mapEditObstacleSub = nh.subscribe('/map_edit_obstacle', 'geometry_msgs/Polygon', this.mapEditObstacleSubCb(), {
				queueSize: 1000
			});
			this.mapEditDoneSub = nh.subscribe('/cmd_string', 'std_msgs/String', this.mapEditDoneSubCb(), {
				queueSize: 1000
			});
			// subscribe waypoint_user_sub
			this.waypointUserSub = nh.subscribe('/waypoint_user_sub', 'std_msgs/String', this.waypointUserSubCb());
			this.waypointUserPubSub = nh.subscribe('/waypoint_user_pub', 'std_msgs/String', this.waypointUserPubSubCb());
			this.robotPoseSub = nh.subscribe('/robot_pose', 'geometry_msgs/Pose', this.robotPoseSubCb());
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
			this.diagnosticsAggSub = nh.subscribe('/diagnostics_agg', 'diagnostic_msgs/DiagnosticArray', this.diagnosticsAggSubCb());
			this.waypointsSub = nh.subscribe('/waypoints', 'yocs_msgs/WaypointList', this.waypointsSubCb());
			this.chargeCtrlSub = nh.subscribe('/rosnodejs/charge_ctrl', 'std_msgs/String', this.chargeCtrlSubCb());
			// check chargestatus
			this.checkRobotStatus('pubsuber_auto_charge', 1);
			if (this.lastNetworkSetting)
			{
				this.robotStatus.lastNetworkSetting = this.lastNetworkSetting;
				this.pubLastNetworkSetting(this.lastNetworkSetting);
			}
			// robot status service
			this.robotStatusSrv = nh.advertiseService('/rosnodejs/robot_status', 'rosapi/Publishers', (req, res) => {
				if (this.robotStatus)
				{
					var status = [];
					for (var key in this.robotStatus)
					{
						var value = ''; 
						if ((typeof this.robotStatus[key]) === 'object')
						{
							if (key === 'lastNetworkSetting')
							{
								var networkSetting = this.robotStatus[key];
								for (var k in networkSetting)
								{
									value += `${k}: ${networkSetting[k]}`;
								}
							}
							else
							{
								// TODO: json -> string
							}	
						}	
						else
						{
							value = this.robotStatus[key];
						}
						status.push(`${key}: ${value}`);
					}
					res.publishers = status;
					return true;
				}
			});
		})();
	}

	mapSubCb(msg){
		return (msg) => {
			rosnodejs.log.info('Got map_edit info');
			this.mapOrgin = {
				x: msg.info.origin.position.x,
				y: msg.info.origin.position.y,
			}
			this.mapWidth = msg.info.width;
			this.mapHeight = msg.info.height;
			this.mapResolution = msg.info.resolution;
			// read map
			this.mapEditImg = gm(MAP_EDIT).fill("none");
		};
	}

	mapEditObstacleSubCb(msg){
		return (msg) => {
			var msgMap = this.mapToPx(msg);
			if (msgMap.points.length === 0)
			{
				rosnodejs.log.warn('Got empty map_edit obstacle msg');
				return;
			}
			if (!this.mapEditImg)
			{
				rosnodejs.log.error('Read map_edit failed');
				return;
			}
			if (msgMap.points[0].z < 0)
			{
				this.mapEditImg.stroke("#fff", CLEAR_SIZE);
			}
			else
			{
				this.mapEditImg.stroke("#000", OBSTACLE_SIZE);
			}
			// circle
			if (msgMap.points.length === 1 && msgMap.points[0].z > 0)
			{
				var radius = msgMap.points[0].z;
				var center = msgMap.points[0];
				this.mapEditImg.drawCircle(center.x, center.y, center.x+radius, center.y);
			}
			// rectangle
			else if (msgMap.points.length === 4)
			{
				for (var i = 0; i < msgMap.points.length - 1; i++)
				{
					var start = msgMap.points[i];
					var end = msgMap.points[i+1];
					this.mapEditImg.drawLine(start.x, start.y, end.x, end.y);
				}
				start = end;
				end = msgMap.points[0];
				this.mapEditImg.drawLine(start.x, start.y, end.x, end.y);
			}
			// points
			else
			{
				for (var i = 0; i < msgMap.points.length - 1; i++)
				{
					var start = msgMap.points[i];
					var end = msgMap.points[i+1];
					this.mapEditImg.drawLine(start.x, start.y, end.x, end.y);
				}
			}
		};
	}

	mapEditDoneSubCb(msg){
		return (msg) => {
			if (msg.data === 'map_edit_done')
			{
				// write to pgm
				this.mapEditImg.write(MAP_EDIT, (err) => {
					if (err)
					{
						rosnodejs.log.error('pgm writting error');
						console.log(err);
					}
					else
					{
						rosnodejs.log.info('map_edit saved');
						// switch to navigation
						var navigationMsg = new this.std_msgs.String();
						navigationMsg.data = 'navigation';
						this.cmdStringPub.publish(navigationMsg);
					}
				});
			}
		};
	}

	mappingStatusCb(msg){
		return (msg) => {
			if (this.isMappingStatus(msg.data))
			{
				this.robotStatus.mappingStatus = msg.data;
				this.mappingStatusPub.publish(msg);
				rosnodejs.log.info(`Mapping status: ${msg.data}`);
			}
		}
	}

	waypointUserSubCb(msg){
		return (msg) => {
			let dataSplited = msg.data.split(':');
			if (dataSplited.length === 2)
			{
				let mode = dataSplited[0].trim();
				switch (mode)
				{
					case 'read_voltage':
						let voltage = parseFloat(dataSplited[1].trim());
						let percentage = this.calcPowerPercentage(voltage);
						this.robotStatus.power = percentage;
						this.updateRobotStatus({
							power: percentage
						});	
						if (this.robotStatus.charge === CHARGE_STATUS.CHARGING)
						{
							if (this.lightStatus !== LIGHT_STATUS.BLUE)
							{
								this.lightStatus = LIGHT_STATUS.BLUE;
								this.updateLightStatus(this.lightStatus);	
							}
						}
						else
						{
							if (percentage < LOW_POWER_THRESHOLD)
							{
								if (this.lightStatus !== LIGHT_STATUS.YELLOW)
								{
									this.lightStatus = LIGHT_STATUS.YELLOW;
									this.updateLightStatus(this.lightStatus);	
								}
							}
							else
							{
								if (this.lightStatus !== LIGHT_STATUS.GREEN)
								{
									this.lightStatus = LIGHT_STATUS.GREEN;
									this.updateLightStatus(this.lightStatus);
								}
							}
						}
						break;
					case 'pubsuber_auto_charge':
						let chargeStatus = dataSplited[1].trim();
						this.robotStatus.charge = parseInt(chargeStatus);
						this.updateRobotStatus({
							charge: chargeStatus
						});
						if (this.robotStatus.charge === CHARGE_STATUS.CHARGING)
						{
							if (this.lightStatus !== LIGHT_STATUS.BLUE)
							{
								this.lightStatus = LIGHT_STATUS.BLUE;
								this.updateLightStatus(this.lightStatus);
								this.updateChargingStatus(3, 'charging');
							}
						}
						else
						{
							if (this.lightStatus === LIGHT_STATUS.BLUE)
							{
								this.lightStatus = LIGHT_STATUS.GREEN;
								this.updateLightStatus(this.lightStatus);
								this.updateChargingStatus(0, 'uncharging');
							}
						}
					default:
						break;
				}
			}
		};
	}

	waypointUserPubSubCb(){
		return (msg) => {
			if (msg.data === CHARGE_ADJUST && this.chargeAdjustIdle)
			{
				this.chargeAdjustIdle = false;
				if (!this.robotPose)
				{
					rosnodejs.log.error('Can not get robot pose.');
					// cancel auto charge
					this.navCtrl('', 0);
					this.updateChargingStatus(-1, 'charge_error: cannot get robot pose');
					this.chargeAdjustIdle = true;
					return;
				}
				if (!this.dockPose)
				{
					rosnodejs.log.error('Can not get dock pose, check if waypoint dock created.');
					// cancel auto charge
					this.navCtrl('', 0);
					this.updateChargingStatus(-1, 'charge_error: cannot find charger');
					this.chargeAdjustIdle = true;
					return;
				}
				if (this.isChargerMoved())
				{
					rosnodejs.log.error('Charger may be moved. Auto charge aborted.');
					this.navCtrl('', 0);
					this.updateChargingStatus(-1, 'charge_error: charger may be moved');
					this.chargeAdjustIdle = true;
					return;
				}
				var angularTan = (this.robotPose.position.y-this.dockPose.position.y)/(this.dockPose.position.x-this.robotPose.position.x);
				var angular = Math.atan(angularTan);
				if (Math.abs(angular) > CHARGE_YAW_TOLERANCE)
				{
					// retry
					if (this.triedNum < AUTO_CHARGE_TRY_NUM)
					{
						rosnodejs.log.error(`Got angular adjustment ${angular.toFixed(5)}, larger than tolerance ${CHARGE_YAW_TOLERANCE}, will try again.`);
						this.retryCharge();
						this.chargeAdjustIdle = true;
						return;
					}
					else
					{
						rosnodejs.log.error(`Auto charge aborted. Got angular adjustment ${angular.toFixed(5)}, still larger than tolerance ${CHARGE_YAW_TOLERANCE} after retry.`);
						this.triedNum = 0;
						this.navCtrl('', 0);
						this.updateChargingStatus(-1, 'charge_error: angular adjustment larger than tolerance');
						this.chargeAdjustIdle = true;
						return;
					}
				}
				var yaw = this.quaternionToYaw(this.robotPose.orientation) + angular;
				var isClockWise = yaw < 0 ? 1 : -1;
				this.cmdVelPub.publish(this.velMsg(0, isClockWise * ANGULAR_VEL));
				var adjustTime = Math.abs(yaw)/ANGULAR_VEL*1000;
				rosnodejs.log.info(`Adjusting: ${yaw.toFixed(5)}, vel: ${isClockWise * ANGULAR_VEL}, time: ${adjustTime.toFixed(3)} ms`);
				setTimeout(() => {
					this.cmdVelPub.publish(this.velMsg(0, 0));
					this.waypointUserSubPub.publish(this.strMsg(`${CHARGE_ADJUST}:${CHARGE_ADJUST_EXPECT}`));
					this.chargeAdjustIdle = true;
					rosnodejs.log.info('Charge adjust done');
					this.triedNum = 0;
				}, adjustTime);
			}
		} // return
	}

	netWorkSettingSubCb(msg){
		return (msg) => {
			var cmd = `cd ${PATH_SHELL};`;
			if (msg.data === '')
			{
				cmd += './comm.sh -a'
			}
			else 
			{
				var params = msg.data.split(',');
				if (params.length === 4)
				{
					cmd += './comm.sh -m wifi';
					var ssid = params[0].split(':')[1].trim();
					var password = params[1].split(':')[1].trim();
					var ip = params[2].split(':')[1].trim();
					var rememberSetting = params[3].split(':')[1].trim();
					var networkSetting = {
						ssid: ssid,
						password: password,
						ip: ip
					};
					if (ssid !== 'null')
					{
						cmd += ` -s ${ssid}`;
					}
					if (password !== 'null')
					{
						cmd += ` -p ${password}`;
					}
					if (ip !== 'null')
					{
						cmd += ` -i ${ip}`;
					}
					if (rememberSetting === 'true')
					{
						if (ssid !== this.lastNetworkSetting.ssid 
							|| password !== this.lastNetworkSetting.password
							|| ip !== this.lastNetworkSetting.ip)
						{
							this.lastNetworkSetting = networkSetting;
							this.config.networkSetting = networkSetting;
							// publish networking setting
							this.pubLastNetworkSetting(this.lastNetworkSetting);	
							fs.writeFile(CONFIG_FILE, JSON.stringify(this.config, null, ' '), function(err){
								if (err)
								{
									console.log(`[ERROR]write network setting failed.`);
									console.log(err);
								}
								else
								{
									console.log(`[INFO]write network setting done.`)
								}
							});
						}
						cmd += ` -a`;
					}
				}
			}
			shell.exec(cmd, function(code, stdout, stderr) {
			    if (stderr) 
			    {
			        console.log(`[ERROR]networking setting error ${code} : ${stderr}`);
			    }
		   	});
		};
	}

	diagnosticsAggSubCb(msg){
		return (msg) => {
			var diagnosticLevel = -1;
			var diagnosticsInfo = [];
			for (var i = 0; i < msg.status.length; i++)
			{
				var level = msg.status[i].level;
				// level '0' parsed as 'null' ...
				if (level === null)
				{
					level =0
				}
				var index = msg.status[i].name.indexOf('/', 1);
				var name = msg.status[i].name.substr(index).trim();
				var message = msg.status[i].message;
				if (level > diagnosticLevel)
				{
					diagnosticLevel = level;
				}
				if (index !== -1)
				{
					if (level > 0)
					{
						var info = {
							name: msg.status[i].name,
							level: level,
							message: message
						};
						diagnosticsInfo.push(info);
					}
				}
			}
			// update light status 	
			switch (diagnosticLevel)
			{
				case DIAGNOSTIC_LEVEL.OK:
					break;
				case DIAGNOSTIC_LEVEL.WARN:
					if (this.lightStatus !== LIGHT_STATUS.YELLOW)
					{
						this.lightStatus = LIGHT_STATUS.YELLOW;
						this.updateLightStatus(this.lightStatus);	
					}
					break;
				case DIAGNOSTIC_LEVEL.ERROR:
					if (this.lightStatus !== LIGHT_STATUS.RED)
					{
						this.lightStatus = LIGHT_STATUS.RED;
						this.updateLightStatus(this.lightStatus);	
					}
					break;
				case DIAGNOSTIC_LEVEL.STALE:
					break;
				default:
					break;
			}
			// send to webapp
			this.updateRobotStatus({
				diagnostics: JSON.stringify(diagnosticsInfo)
			});
		}
	}

	waypointsSubCb(){
		return (waypoints) => {
			this.waypoints = waypoints;
			for (var i = 0; i < waypoints.waypoints.length; i++)
			{
				var waypoint = waypoints.waypoints[i];
				if (waypoint.name === DOCK_BEGIN_NAME)
				{
					rosnodejs.log.info('Charger found.');
					this.dockPose = this.toDockPose(waypoint.pose, DOCK_BEGIN_DIS+DOCK_OFFSET);
					break;
				}
			}
		}
	}

	robotPoseSubCb(){
		return (pose) => {
			this.robotPose = pose;
		}
	}

	chargeCtrlSubCb(){
		return (cmd) => {
			console.log(cmd)
			if (cmd.data === 'set_charger')
			{
				// add waypoints
				// begin charge
				var beginDockWaypoints = [];
				for (var i = 0; i < trajsForDock.dock_begin_charge.length; i++)
				{
					var name = trajsForDock.dock_begin_charge[i];
					var waypoint = waypointsForDock[name];
					if (name === DOCK_BEGIN_NAME)
					{
						var dockBeginPose = this.toDockBeginPose(this.robotPose, DOCK_BEGIN_DIS);
						waypoint.pose = dockBeginPose;
					}
					beginDockWaypoints.push(this.waypointMsg(waypoint));
					this.addWaypoint(waypoint);
				}
				// end charge
				var endDockWaypoints = [];
				for (var i = 0; i < trajsForDock.dock_end_charge.length; i++)
				{
					var name = trajsForDock.dock_end_charge[i];
					var waypoint = waypointsForDock[name];
					endDockWaypoints.push(this.waypointMsg(waypoint));
					this.addWaypoint(waypoint);
				}
				// add trajectories
				// begin charge
				var beginChargeMsg = new this.yocs_msgs.Trajectory();
				beginChargeMsg.name = 'dock_begin_charge';
				beginChargeMsg.waypoints = beginDockWaypoints;
				this.addTrajPub.publish(beginChargeMsg);
				// end charge
				var endChargeMsg = new this.yocs_msgs.Trajectory();
				endChargeMsg.name = 'dock_end_charge';
				endChargeMsg.waypoints = endDockWaypoints;
				this.addTrajPub.publish(endChargeMsg);
			}
			else if (cmd.data === 'charge')
			{
				this.navCtrl('dock_begin_charge', 1);
			}
			else if (cmd.data === 'uncharge')
			{
				this.navCtrl('dock_end_charge', 1);
			}
			else
			{
				rosnodejs.log.error('Invalid charge Cmd.');
			}
		}
	}

	calcPowerPercentage(voltage){
		var voltage = voltage * VOL_FACTOR;
		let percentage;
		var curve = this.dischargeCurve;
		if (this.robotStatus.charge === CHARGE_STATUS.CHARGING)
		{
			curve = this.chargeCurve;
		}
		if (voltage > curve[0])
		{
			percentage = 1.0;
		}
		else if (voltage < curve[99])
		{
			percentage = 0.0;
		}
		else
		{
			let minIndex = 0;
			let maxIndex = 99;
			while ((maxIndex - minIndex) > 1)
			{
				let midIndex = Math.floor((maxIndex + minIndex) / 2);
				if (voltage > curve[midIndex])
				{
					maxIndex = midIndex;
				}
				else
				{
					minIndex = midIndex;
				}
			}
			percentage = (100 - maxIndex) / 100;
		}
		return percentage;
	}

	// update robot status
	// params:
	// 	1. status: robot status, eg. {power: 0.9}
	updateRobotStatus(status){
		for (var key in status)
		{
			if (status.hasOwnProperty(key))
			{
				var msg = new this.std_msgs.String();
				msg.data = `${key}: ${status[key]}`;
				this.robotStatusPub.publish(msg);
			}
		}
	}

	updateLightStatus(status){
		var msg = new this.std_msgs.String();
		msg.data = status;
		this.waypointUserPub.publish(msg);
	}

	pubLastNetworkSetting(options){
		var msg = this.std_msgs.String();
		msg.data = `ssid: ${options.ssid}, password: ${options.password}, ip: ${options.ip}`;
		this.netWorkSettingPub.publish(msg);
	}

	checkRobotStatus(type, frequency){
		var duration = 1000 / frequency;
		var msg = new this.std_msgs.String();
		msg.data = type;
		setInterval((type) => {
			this.waypointUserPub.publish(msg);
		}, duration);
	}

	// publish nav_ctrl cmd
	// params: 
	// 	1. string name: waypoint or trajectory name;
	// 	2. int control: STOP(0), START(1), PAUSE(2)
	navCtrl(name, control){
		var msg = new this.yocs_msgs.NavigationControl();
		msg.goal_name = name;
		msg.control = control;
		this.navCtrlPub.publish(msg);
	}

	// update charging status to topic '/rosnodejs/'
	// hrg2.0 ONLY
	// params: 
	// 	1. int status
	// 	2. string desc: status description
	// 	3. string name(optional): waypoint name, 'dock_begin_charge' by default
	updateChargingStatus(status, desc, name){
		var msg = new this.yocs_msgs.NavigationControlStatus();
		msg.status = status;
		msg.status_desc = desc;
		msg.waypoint_name = name || 'dock_begin_charge';
		this.chargingStatusPub.publish(msg);
	}

	addWaypoint(waypoint){
		this.addWaypointPub.publish(this.waypointMsg(waypoint));
	}

	delWaypoint(name){
		var waypoint = this.getWaypointByName(name);
		if (!waypoint)
		{
			return;
		}
		this.delWaypointPub.publish(this.waypointMsg(waypoint));
	}

	addTraj(name, waypointsName){
		var waypoints = [];
		for (var i = 0; i < waypointsName.length; i++)
		{
			waypoints.push(this.getWaypointByName(waypointsName[i]));
		}
		var msg = new this.yocs_msgs.Trajectory();
		msg.name = name;
		msg.waypoints = waypoints;
		this.addTrajPub.publish(msg);
	}

	delTraj(name){
		var traj = this.getTrajByName(name);
		var msg = new this.yocs_msgs.Trajectory();
		msg.name = name;
		msg.waypoints = traj.waypoints;
		this.delTrajPub.publish(msg);
	}

	getWaypointByName(name){
		if (!this.waypoints)
		{
			return;
		}
		for (var i = 0; i < this.waypoints.waypoints.length; i++)
		{
			var waypoint = this.waypoints.waypoints[i];
			if (name === waypoint.name)
			{
				return waypoint;
			}
		}
	}

	getTrajByName(name){
		if (!this.trajectories)
		{
			return;
		}
		for (var i = 0; i < this.trajectories.trajectories[i]; i++)
		{
			var traj = this.trajectories.trajectories[i];
			if (name === traj.name)
			{
				return traj;
			}
		}
	}

	waypointMsg(waypointInfo){
		var msg = new this.yocs_msgs.Waypoint();
		msg.header.seq = 0;
		// var time = new Date().getTime();
		// msg.header.stamp.secs = parseInt(time/1000);
		// msg.header.stamp.nsecs = parseInt(time/1000-parseInt(time/1000));
		msg.header.frame_id = waypointInfo.frame_id;
		msg.name = waypointInfo.name;
		msg.close_enough = waypointInfo.close_enough;
		msg.goal_timeout = waypointInfo.goal_timeout;
		msg.failure_mode = waypointInfo.failure_mode;
		msg.pose.position.x = waypointInfo.pose.position.x;
		msg.pose.position.y = waypointInfo.pose.position.y;
		msg.pose.position.z = waypointInfo.pose.position.z;
		msg.pose.orientation.x = waypointInfo.pose.orientation.x;
		msg.pose.orientation.y = waypointInfo.pose.orientation.y;
		msg.pose.orientation.z = waypointInfo.pose.orientation.z;
		msg.pose.orientation.w = waypointInfo.pose.orientation.w;
		return msg;
	}

	isMappingStatus(status){
		var flag = false;
		for (var key in MAPPING_STATUS)
		{
			if (MAPPING_STATUS[key] === status)
			{
				flag = true;
				break;
			}
		}
		return flag;
	}

	// check if charger is moved based on the pose published by scan_marker 
	// and the created dock waypoint.
	// return: bool
	isChargerMoved(){
		if (this.robotPose && this.dockPose)
		{
			var tempPose = JSON.parse(JSON.stringify(this.robotPose));// deep copy
			var dockPose = this.toDockPose(tempPose, DOCK_BEGIN_DIS+DOCK_OFFSET);
			var dis = Math.sqrt(Math.pow(this.dockPose.position.x-dockPose.position.x, 2)
				+ Math.pow(this.dockPose.position.y-dockPose.position.y, 2));
			if (dis < CHARGER_MOVED_THRESHOLD)
			{
				return false;
			}
		}
		return true;
	}

	retryCharge(){
		this.navCtrl('', 0);
		this.navCtrl(CHARGING_TRAJ_NAME, 1);
		this.triedNum++;
	}

	mapToPx(msg){
		var msgMap = {
			points: []
		}
		for (var i = 0; i < msg.points.length; i++)
		{
			var point = {
				x: (msg.points[i].x - this.mapOrgin.x) / this.mapResolution,
				y: this.mapHeight - (msg.points[i].y - this.mapOrgin.y) / this.mapResolution,
				z: msg.points[i].z / this.mapResolution
			}
			msgMap.points.push(point);
		}
		return msgMap;
	}

	// quaternion -> yaw
    // params: 
    // 	orientation
    // return:
    //	yaw(radian)
    quaternionToYaw(orientation, ignoreXY){
    	var rotation = orientation;
    	var numerator;
    	var denominator;
    	if (ignoreXY)
    	{
    		numerator = 2*rotation.w*rotation.z;
			denominator = 1-2*Math.pow(rotation.z,2);
    	}
    	else
    	{
    		numerator = 2*(rotation.w*rotation.z+rotation.x*rotation.y);
			denominator = 1-2*(Math.pow(rotation.y,2)+Math.pow(rotation.z,2));
    	}
		var yaw = Math.atan2(numerator, denominator);
		return yaw;
    }

    // calc dock pose
    // params: 
    // 	1. geometry_msgs/Pose pose
    // 	2. float distance: distance from pose to dock
    // return:
    // 	geometry_msgs/Pose
    toDockPose(pose, distance){
    	var yaw = this.quaternionToYaw(pose.orientation, true);
		var offset = {
			x: distance * Math.cos(yaw),
			y: distance * Math.sin(yaw)
		};
		pose.position.x += offset.x;
		pose.position.y += offset.y;
		return pose;
    }

    toDockBeginPose(pose, distance){
    	var yaw = this.quaternionToYaw(pose.orientation, true);
		var offset = {
			x: distance * Math.cos(yaw),
			y: distance * Math.sin(yaw)
		};
		pose.position.x -= offset.x;
		pose.position.y -= offset.y;
		return pose;
    }

    velMsg(linear, angular)
    {
    	var time = new Date().getTime();
    	return new this.geometry_msgs.Twist({
    		linear: {
    			x: linear,
    			y: 0,
    			z: time
    		},
    		angular: {
    			x: 0,
    			y: 0,
    			z: angular
    		}
    	});
    }

    strMsg(data)
    {
    	return new this.std_msgs.String({
    		data: data
    	});
    }
}

module.exports = {
	initROS: () => {
		new RosNodeJs();
	}
};