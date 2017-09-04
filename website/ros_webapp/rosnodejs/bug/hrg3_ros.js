'use strict';

let rosnodejs = require('../rosnodejslib/index.js');
let paramServer = require('../lib/init').paramServer;
let tf = require('../lib/tf');

const VOL_FACTOR = 0.008862;
const CHARGE_STATUS = {
	UNCONTACT: 0,
	CONTACT: 1,
	VOLABNORMAL: 2,
	CHARGING: 3
};
const WAYPOINT_TYPE = {
	MAP: 'map',
	TIMER: 'timer',
	PUB: 'pub',
	SUB: 'sub',
	LOOP: 'loop',
	PUBSUBER: 'pubsuber',
	VELSET: 'velSet',
	VEL: 'vel',
	SHELL: 'shell',
	SOUND: 'sound',
	POSE: 'pose',
	SCANMARKER: 'scanMarker',
	SHELLSTR: 'shellStr',
	DOCK: 'dock'
};
const TRAJ_TYPE = {
	BEGIN_CHARGE: 'begin_charge',
	END_CHARGE: 'end_charge'
};
const NAV_CTRL_STATUS = {
	ERROR: -1,
	IDLING: 0,
	RUNNING: 1,
	PAUSED: 2,
	COMPLETED: 3,
	CANCELLED: 4,
	SUB_CANCELLED: 5
};

class RosNodeJs
{
	constructor(){
		this.dockWaypoints = [];
		this.chargeTrajs = {
			beginTrajs: [],
			endTrajs: []
		};
		this.robotPose = null;
		this.chargeBeginTrajs = [];
		this.chargeEndTrajs = [];
		this.robotStatus = {};
		this.rate = 2;
		this.dischargeCurve = paramServer.getParam('config').powerCurve.discharge;
		this.chargeCurve = paramServer.getParam('config').powerCurve.charge;
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
			// msgs
			this.std_msgs = rosnodejs.require('std_msgs').msg;
			this.nav_msgs = rosnodejs.require('nav_msgs').msg;
			this.yocs_msgs = rosnodejs.require('yocs_msgs').msg;

			this.waypointUserPub = nh.advertise('/waypoint_user_pub', 'std_msgs/String', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
			this.waypointUserSub = nh.subscribe('/waypoint_user_sub', 'std_msgs/String', this.waypointUserSubCb());
			this.robotStatusPub = nh.advertise('/rosnodejs/robot_status', 'std_msgs/String', {
				queueSize: 10,
				latching: true,
				throttleMs: -1
			});
			this.navCtrlSub = nh.subscribe('/rosnodejs/nav_ctrl', 'yocs_msgs/NavigationControl', this.navCtrlSubCb());
			this.navCtrlPub = nh.advertise('/nav_ctrl', 'yocs_msgs/NavigationControl', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
			this.navCtrlStatusSub = nh.subscribe('/nav_ctrl_status', 'yocs_msgs/NavigationControlStatus', this.navCtrlStatusSubCb());
			this.robotPoseSub = nh.subscribe('/robot_pose', 'geometry_msgs/Pose', this.robotPoseSubCb());
			this.waypointsSub = nh.subscribe('/waypoints', 'yocs_msgs/WaypointList', this.waypointsSubCb());
			this.trajectoriesSub = nh.subscribe('/trajectories', 'yocs_msgs/TrajectoryList', this.trajectoriesSubCb());
			// check chargestatus
			setInterval(function(){
				this.checkRobotStatus('pubsuber_auto_charge');
				switch (this.robotStatus.charge)
				{
					case CHARGE_STATUS.UNCONTACT:
						if (this.robotStatus.navCtrlStatus === NAV_CTRL_STATUS.IDLING)
						{
							if (this.isAtDock())
							{
								this.setStatus();
							}
							else
							{
								this.setStatus();
							}
						}
						break;
					case CHARGE_STATUS.CONTACT:
						break;
					case CHARGE_STATUS.VOLABNORMAL:
						break;
					case CHARGE_STATUS.CHARGING:
						break;
					default:
						rosnodejs.log.warn(`Unknown charge status: ${this.robotStatus.charge}`);
						break;
				}// switch
			}, 1000/this.rate);
		})();
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
						break;
					case 'pubsuber_auto_charge':
						let chargeStatus = dataSplited[1].trim();
						this.robotStatus.charge = chargeStatus;
						this.updateRobotStatus({
							charge: chargeStatus
						});
						// TODO: 
						// check if status correct, eg. light, bumper, estop
					default:
						break;
				}
			}
		};
	}

	navCtrlSubCb(msg){
		return (msg) => {
			
		};
	}

	navCtrlStatusSubCb(msg){
		return (msg) => {

		};
	}

	robotPoseSubCb(msg){
		return (msg) => {
			this.robotPose = msg;
		};
	}

	waypointsSubCb(msg){
		return (msg) => {
			this.dockWaypoints = [];
			for (var i = 0; i < msg.waypoints.length; i++)
			{
				var waypoint = msg.waypoints[i];
				if (waypoint.header.frame_id === WAYPOINT_TYPE.DOCK)
				{
					this.dockWaypoints.push(waypoint);
				}
			}
		};
	}

	trajectoriesSubCb(msg){
		return (msg) => {
			this.chargeTrajs = {
				beginTrajs: [],
				endTrajs: []
			};
			for (var i = 0; i < msg.trajectories.length; i++)
			{
				var traj = msg.trajectories[i];
				if (traj.header.frame_id === TRAJ_TYPE.BEGIN_CHARGE)
				{	
					this.chargeTrajs.beginTrajs.push(traj);
				}
				else if (traj.header.frame_id === TRAJ_TYPE.END_CHARGE)
				{
					this.chargeTrajs.endTrajs.push(traj);
				}
			}
		};
	}

	calcPowerPercentage(voltage){
		var voltage = voltage * VOL_FACTOR;
		let percentage;
		let curve = this.dischargeCurve;
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
	// 	1. status: robot status, eg. {power: 0.9, isCharging, true}
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

	checkRobotStatus(type){
		var msg = new this.std_msgs.String();
		msg.data = type;
		this.waypointUserPub.publish(msg)
	}

	isAtDock(pose, dockWaypoint){
		var xyTolerance = 0.30;
		var yawTolerance = 	0.10;
		if (arguments.length === 1)
		{
			xyTolerance = arguments[0];
		}
		else if (arguments.length === 2)
		{
			xyTolerance = arguments[0];
			yawTolerance = arguments[1];
		}
		var disSquare = Math.pow((pose.position.x-dockWaypoint.pose.position.x), 2)
			+ Math.pow((pose.position.y-dockWaypoint.pose.position.y), 2)
			+ Math.pow((pose.position.z-dockWaypoint.pose.position.z), 2);
		var robotYaw = tf.quaternionToYaw(pose.orientation);
		var dockYaw = tf.quaternionToYaw(dockWaypoint.pose.orientation);
		var deltaYaw = Math.abs(robotYaw - dockYaw);
		return (disSquare < xyTolerance * xyTolerance) && (deltaYaw < yawTolerance);
	}

	setStatus()
	{
		// TODO:
	}
}// class

module.exports = {
	initROS: () => {
		new RosNodeJs();
	}
};