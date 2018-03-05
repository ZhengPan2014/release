'use strict';
class drive_aqmd_2
{
	constructor(params)
	{
		let params_ = params || {};
		this.roslaunch = null;
		this.params = {};
		/*******************************************************************************/
		/*********************************** Params ************************************/
		
		this.params.drive_port_left = params_.drive_port_left || '/dev/ttyUSB0';
		
		this.params.drive_port_right = params_.drive_port_right || '/dev/ttyUSB1';
		
		this.params.wheel_seperation = params_.wheel_seperation || '0.466';
		
		this.params.wheel_ratio = params_.wheel_ratio || '23333.3';
		
		/*******************************************************************************/
	}
	get launch()
	{
		if (!this.roslaunch)
		{
			this.roslaunch = 'roslaunch bringup drive_aqmd_2.launch';
			for (let p in this.params)
			{
				this.roslaunch += ' ';
				this.roslaunch += p;
				this.roslaunch += ':=';
				this.roslaunch += this.params[p];
			}	
		}
		return this.roslaunch;
	}
	updateParam(params)
	{
		for (let key in params)
		{
			if (this.params.hasOwnProperty(key))
			{
				this.params[key] = params[key];
			}
		}
		this.roslaunch = null;
	}
	get prettyLaunchStr()
	{
		let prettyLaunch = '\x1B[7m' + 'roslaunch bringup drive_aqmd_2.launch';
		for (let p in this.params)
		{
			prettyLaunch += '\n\t'
			prettyLaunch += p;
			prettyLaunch += ' := ';
			prettyLaunch += this.params[p];
		}
		return prettyLaunch + '\x1B[27m';
	}
}
module.exports = drive_aqmd_2;