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

const VOL_FACTOR = 0.008862;
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

class RosNodeJs
{
	constructor(){
		this.robotStatus = {};
		this.mapEditImg = null;
		this.lightStatus = null;
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
			this.diagnosticsAggSub = nh.subscribe('/diagnostics_agg', 'diagnostic_msgs/DiagnosticArray', this.diagnosticsAggSubCb());
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
							}
						}
						else
						{
							if (this.lightStatus === LIGHT_STATUS.BLUE)
							{
								this.lightStatus = LIGHT_STATUS.GREEN;
								this.updateLightStatus(this.lightStatus);
							}
						}
					default:
						break;
				}
			}
		};
	}

	netWorkSettingSubCb(msg){
		return (msg) => {
			var cmd = `cd ${PATH_SHELL};`;
			if (msg.data === '')
			{
				cmd += './comm.sh'
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
			this.waypointUserPub.publish(msg)
		}, duration);
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
}

module.exports = {
	initROS: () => {
		new RosNodeJs();
	}
};