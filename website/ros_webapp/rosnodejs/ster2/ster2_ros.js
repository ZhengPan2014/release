'use strict';

let rosnodejs = require('../rosnodejslib/index.js');
const CommonRosApi = require('./ros_api');

let paramServer = require('../lib/init').paramServer;

const LEDNUM = 5;
const VOL_COEFFICIENT = 0.021;

class RosNodeJs
{
	constructor(){
		this.dischargeCurve = paramServer.getParam('config').powerCurve.discharge;
		this.ns = paramServer.getParam('namespace');
		this.nodeName = CommonRosApi.withNs('rosnodejs', this.ns);

		this.powerStatus = null;
		(async () =>{
			let nh = await rosnodejs.initNode(this.nodeName, {
					onTheFly: true	
				});
			this.commonRosApi = new CommonRosApi(nh, this.ns);

			this.std_msgs = rosnodejs.require('std_msgs').msg;
			this.powerStatusPub = nh.advertise(this.commonRosApi.withNs('/waypoint_user_pub'), 'std_msgs/String', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
			this.powerStatusSub = nh.subscribe(this.commonRosApi.withNs('/waypoint_user_sub'), 'std_msgs/String', this.powerStatusCb());
		})();
	}

	powerStatusCb(msg){
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
						this.updatePowerStatus(percentage);
						break;
					default:
						break;
				}
			}
		};
	}

	// calc power percentage
	// params: 
	// 		1. voltage
	// return: percentage
	calcPowerPercentage(voltage){
		var voltage = voltage * VOL_COEFFICIENT;
		let percentage;
		if (voltage > this.dischargeCurve[0])
		{
			percentage = 1.0;
		}
		else if (voltage < this.dischargeCurve[99])
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
				if (voltage > this.dischargeCurve[midIndex])
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

	updatePowerStatus(percentage){
		let powerStatus = Math.ceil(percentage * LEDNUM);
		if (this.powerStatus != powerStatus)
		{
			this.powerStatus = powerStatus;
			let msg = new this.std_msgs.String();
			msg.data = `light${this.powerStatus}`;
			this.powerStatusPub.publish(msg);	
			console.log(`Power: ${percentage*100}/100.`);	
		}
	}
}

module.exports = {
	initROS: () => {
		new RosNodeJs();
	}
};
