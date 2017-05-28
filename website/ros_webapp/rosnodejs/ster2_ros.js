'use strict';

let rosnodejs = require('../rosnodejslib/index.js');
let paramServer = require('../lib/init').paramServer;

const LEDNUM = 5;
// debug
// let dischargeDebug = [57.138,56.791,56.521,56.301998,56.080002,55.884998,55.695,55.504002,55.334999,55.165001,55.014,54.862,54.729,54.599998,54.462002,54.334,54.194,54.061001,53.921001,53.792,53.650002,53.521999,53.398998,53.268002,53.151001,53.023998,52.911999,52.790001,52.674999,52.561001,52.437,52.323002,52.195,52.078999,51.953999,51.832001,51.701,51.577,51.455002,51.323002,51.199001,51.066002,50.945999,50.817001,50.701,50.588001,50.472,50.365002,50.256001,50.155998,50.056999,49.964001,49.875999,49.792999,49.710999,49.630001,49.556,49.480999,49.410999,49.339001,49.273998,49.210999,49.145,49.082001,49.018002,48.957001,48.889999,48.831001,48.764999,48.702,48.639,48.570999,48.506001,48.438,48.372002,48.301998,48.233002,48.158001,48.085999,48.006001,47.929001,47.841999,47.755001,47.662998,47.551998,47.438,47.306999,47.178001,47.048,46.929001,46.806999,46.660999,46.514999,46.344002,46.172001,45.971001,45.749001,45.469002,45.033001,44.370998]

class RosNodeJs
{
	constructor(){
		this.dischargeCurve = paramServer.getParam('config').powerCurve.discharge;
		// this.dischargeCurve = dischargeDebug;
		this.powerStatus = null;
		(async () =>{
			let nh = await rosnodejs.initNode('rosnodejs', {
					onTheFly: true	
				});
			// 
			this.std_msgs = rosnodejs.require('std_msgs').msg;
			this.powerStatusPub = nh.advertise('/waypoint_user_pub', 'std_msgs/String', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});
			this.powerStatusSub = nh.subscribe('/waypoint_user_sub', 'std_msgs/String', this.powerStatusCb());
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
			else
			{
				// TODO
			}
		};
	}

	// calc power percentage
	// params: 
	// 		1. voltage: voltage times 1000
	// return: percentage
	calcPowerPercentage(voltage){
		var voltage = voltage / 1000;
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
		if (powerStatus === 0)
		{
			// turn off all lights
			let msg = new this.std_msgs.String();
			msg.data = 'light5';
			this.powerStatusPub.publish(msg);
			console.log(`Power: ${percentage*100}/100.`);
		}
		else if (this.powerStatus != powerStatus)
		{
			this.powerStatus = powerStatus;
			let msg = new this.std_msgs.String();
			msg.data = `light${this.powerStatus-1}`;
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
