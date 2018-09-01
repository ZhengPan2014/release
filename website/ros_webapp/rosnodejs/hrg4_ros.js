'use strict';

/*
!!! CAUTION !!!
All button status will be 0 when pressed.
*/

const rosnodejs = require('../rosnodejslib/index.js');
const CommonRosApi = require('./ros_api');

const Promise = require('promise');

let paramServer = require('../lib/init').paramServer;

const BATTERY_THRESHOLD = 30;
const CHARGE_TRAJ = 'auto_charge';
const LIGHT_STATUS = {
	BLUE: 'light_blue',
	YELLOW: 'light_yellow',
	RED: 'light_red'
};
const BUZZER_STATUS = {
	BEEP: 'buzzer_beep',
	OFF: 'buzzer_off'
}

async function sleep(ms)
{
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}

class RobotStatus
{
	constructor()
	{
		this.battery = 100.0;
		this.light = LIGHT_STATUS.BLUE;
		this.buzzer = BUZZER_STATUS.OFF;
		this.nav_ctrl_status = 0;
		this.charge_status = 0;
		this.lock = 1;
		this.estop_btn = {
			last: 1,
			current: 1
		};
		this.bumper = 1;
		this.release_btn = 1;
	}
}

class RosNodeJs
{
	constructor(){
		this.ns = paramServer.getParam('namespace');
		this.nodeName = CommonRosApi.withNs('rosnodejs', this.ns);
		(async () =>{
			let nh = await rosnodejs.initNode(this.nodeName, {
					onTheFly: true	
				});
			this.commonRosApi = new CommonRosApi(nh, this.ns);
			// robot status
			this.robotStatus = new RobotStatus();
			// ros msgs
			this.std_msgs = rosnodejs.require('std_msgs').msg;
			this.yocs_msgs = rosnodejs.require('yocs_msgs').msg;
			// ros publishers
			this.waypointUserPub = nh.advertise(this.commonRosApi.withNs('/waypoint_user_pub'), 'std_msgs/String', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
			this.navCtrlPub = nh.advertise(this.commonRosApi.withNs('/nav_ctrl'), 'yocs_msgs/NavigationControl', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
			// debug only
			this.robotStatusPub = nh.advertise(this.commonRosApi.withNs('/robot_status'), 'std_msgs/String', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
			// ros subscribers
			this.waypointUserSub = nh.subscribe(this.commonRosApi.withNs('/waypoint_user_sub'), 'std_msgs/String', this.waypointUserSubCb());
			this.navCtrlStatusSub = nh.subscribe(this.commonRosApi.withNs('/nav_ctrl_status'), 'yocs_msgs/NavigationControlStatus', this.navCtrlStatusSubCb());

			let powerMsg = new this.std_msgs.String();
			powerMsg.data = "power";
			let chargeStatusMsg = new this.std_msgs.String();
			chargeStatusMsg.data = "charge_status";
			let emergencyStatusMsg = new this.std_msgs.String();
			emergencyStatusMsg.data = "emergency_status";
			let lockStatusMsg = new this.std_msgs.String();
			lockStatusMsg.data = "lock_status";
			while (true)
			{
				this.waypointUserPub.publish(powerMsg);
				this.waypointUserPub.publish(chargeStatusMsg);
				this.waypointUserPub.publish(emergencyStatusMsg);
				this.waypointUserPub.publish(lockStatusMsg);
				// wait for response
				await sleep(200);
				this.handleRobotStatus();
			}
		})();
	}

	waypointUserSubCb()
	{
		return (msg) => {
			let header = msg.data.split(':')[0].trim();
			let values = msg.data.split(':')[1].trim();
			switch (header)
			{
				case 'power':
					let battery_h_s = values.split(',')[0].trim();
					let battery_l_s = values.split(',')[1].trim();
					let battery = parseBattery(parseInt(battery_h_s), parseInt(battery_l_s));
					this.robotStatus.battery = battery;
					break;
				case 'charge_status':
					this.robotStatus.charge_status = parseInt(values);
					break;
				case 'emergency_status':
					let bumperStatus = parseInt(values.split(',')[0].trim());
					let releaseBtnStatus = parseInt(values.split(',')[1].trim());
					let estopBtnStatus = parseInt(values.split(',')[2].trim());
					this.robotStatus.bumper = bumperStatus;
					this.robotStatus.release_btn = releaseBtnStatus;
					// emergency stop btn
					this.robotStatus.estop_btn.last = this.robotStatus.estop_btn.current;
					this.robotStatus.estop_btn.current = estopBtnStatus;
					if (this.robotStatus.estop_btn.last === 1 && this.robotStatus.estop_btn.current === 0)
					{
						this.lock();
					}
					else if (this.robotStatus.estop_btn.last === 0 && this.robotStatus.estop_btn.current === 1)
					{
						this.unlock();
					}
					break;
				case 'lock_status':
					this.robotStatus.lock = parseInt(values);
					break;
				default:
					break;
			}
		}; // return
	}

	navCtrlStatusSubCb()
	{
		return (status) => {
			this.robotStatus.nav_ctrl_status = status.status;
		};
	}

	handleRobotStatus()
	{
		// this.publishRobotStatus("before\n");
		// set buzzer and light
		if (this.robotStatus.lock === 1 && this.robotStatus.estop_btn.current === 1)
		{
			if (this.robotStatus.light === LIGHT_STATUS.RED)
			{
				this.setBuzzer(BUZZER_STATUS.OFF);
			}
			if (this.robotStatus.battery < BATTERY_THRESHOLD)
			{
				this.setLight(LIGHT_STATUS.YELLOW);
			}
			else
			{
				this.setLight(LIGHT_STATUS.BLUE);
			}
		}
		else
		{
			if (this.robotStatus.light !== LIGHT_STATUS.RED)
			{
				this.setLight(LIGHT_STATUS.RED);
			}
			if (this.robotStatus.buzzer !== BUZZER_STATUS.BEEP)
			{
				this.setBuzzer(BUZZER_STATUS.BEEP);
			}
			// if the robot is in emergency, we ignore battery status
			return;
		}
		// decide if the robot needs charging
		if (this.robotStatus.battery < BATTERY_THRESHOLD)
		{
			if (this.robotStatus.charge_status === 0)
			{
				if (this.robotStatus.nav_ctrl_status === 0)
				{
					this.charge();
				}
			}
			else
			{
				// TODO: handle other charge exceptions
			}
		}
		// this.publishRobotStatus("after\n");
	}

	setLight(color)
	{
		let msg = new this.std_msgs.String();
		msg.data = color;
		this.waypointUserPub.publish(msg);
		this.robotStatus.light = color;
	}

	setBuzzer(action)
	{
		let msg = new this.std_msgs.String();
		msg.data = action;
		this.waypointUserPub.publish(msg);
		this.robotStatus.buzzer = action;
	}

	unlock()
	{
		let msg = new this.std_msgs.String();
		msg.data = 'unlock_emergency_stop';
		this.waypointUserPub.publish(msg);
		this.robotStatus.lock = 1;
	}

	lock()
	{
		let msg = new this.std_msgs.String();
		msg.data = 'lock_emergency_stop';
		this.waypointUserPub.publish(msg);
		this.robotStatus.lock = 0;
	}

	charge()
	{
		let chargeCmd = new this.yocs_msgs.NavigationControl();
		chargeCmd.goal_name = CHARGE_TRAJ;
		chargeCmd.control = 1;
		this.navCtrlPub.publish(chargeCmd);
	}

	// debug only
	publishRobotStatus(prefix='')
	{
		let msg = new this.std_msgs.String();
		msg.data = prefix;
		msg.data += JSON.stringify(this.robotStatus);
		this.robotStatusPub.publish(msg);
	}
}

function parseBattery(battery_h, battery_l)
{
	var battery_h_ascii = String.fromCharCode(battery_h);
	var battery_l_ascii = String.fromCharCode(battery_l);
	return parseInt(battery_h_ascii, 16) * 16 + parseInt(battery_l_ascii, 16);
}

module.exports = {
	initROS: () => {
		new RosNodeJs();
	}
};