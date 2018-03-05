'use strict';

let rosnodejs = require('../rosnodejslib/index.js');
const CommonRosApi = require('./ros_api');

let paramServer = require('../lib/init').paramServer;

// power
const VOL_FACTOR = 0.008862;
const LOW_POWER_THRESHOLD = 0.20;
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
		this.lightStatus = null;
		this.robotStatus = {};
		this.config = paramServer.getParam('config');
		if (!this.config)
		{
			console.log('config not found, will return')
			return;
		}
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
		this.ns = paramServer.getParam('namespace');
		this.nodeName = CommonRosApi.withNs('rosnodejs', this.ns);
		(async () =>{
			let nh = await rosnodejs.initNode(this.nodeName, {
					onTheFly: true	
				});
			this.commonRosApi = new CommonRosApi(nh, this.ns);

			this.std_msgs = rosnodejs.require('std_msgs').msg;
			this.diagnostic_msgs = rosnodejs.require('diagnostic_msgs').msg;

			this.waypointUserPub = nh.advertise(this.commonRosApi.withNs('/waypoint_user_pub'), 'std_msgs/String', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
			// subscribe waypoint_user_sub
			this.waypointUserSub = nh.subscribe(this.commonRosApi.withNs('/waypoint_user_sub'), 'std_msgs/String', this.waypointUserSubCb());
			this.diagnosticsAggSub = nh.subscribe(this.commonRosApi.withNs('/diagnostics_agg'), 'diagnostic_msgs/DiagnosticArray', this.diagnosticsAggSubCb());
			// check chargestatus
			this.checkRobotStatus('pubsuber_auto_charge', 1);
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
						this.updateRobotStatus({power: percentage}, true);
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
						this.updateRobotStatus({charge: chargeStatus}, true);
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
			return;
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

	updateRobotStatus(status, mute){
		let info = '';
		for (let key in status)
		{
			info += key;
			info += ':';
			info += status[key];
		}
		this.commonRosApi.reportFeedback(info, mute);
	}

	updateLightStatus(status){
		var msg = new this.std_msgs.String();
		msg.data = status;
		this.waypointUserPub.publish(msg);
	}

	checkRobotStatus(type, frequency){
		var duration = 1000 / frequency;
		var msg = new this.std_msgs.String();
		msg.data = type;
		setInterval((type) => {
			this.waypointUserPub.publish(msg)
		}, duration);
	}
}

module.exports = {
	initROS: () => {
		new RosNodeJs();
	}
};