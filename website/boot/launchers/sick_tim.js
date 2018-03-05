'use strict';
class sick_tim
{
	constructor(params)
	{
		let params_ = params || {};
		this.roslaunch = null;
		this.params = {};
		/*******************************************************************************/
		/*********************************** Params ************************************/
		
		this.params.ip = params_.ip || '192.168.0.10';
		
		this.params.angle_min = params_.angle_min || '-2.1';
		
		this.params.angle_max = params_.angle_max || '2.1';
		
		this.params.range_max = params_.range_max || '10.0';
		
		this.params.frame_id = params_.frame_id || 'base_laser';
		
		this.params.intensity = params_.intensity || 'False';
		
		this.params.pub_rate = params_.pub_rate || '50';
		
		this.params.x = params_.x || '0.0';
		
		this.params.y = params_.y || '0.0';
		
		this.params.z = params_.z || '0.0';
		
		this.params.roll = params_.roll || '0.0';
		
		this.params.pitch = params_.pitch || '0.0';
		
		this.params.yaw = params_.yaw || '0.0';
		
		this.params.scan_rectifier_range_max = params_.scan_rectifier_range_max || '20.0';
		
		/*******************************************************************************/
	}
	get launch()
	{
		if (!this.roslaunch)
		{
			this.roslaunch = 'roslaunch bringup sick_tim.launch';
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
		let prettyLaunch = '\x1B[7m' + 'roslaunch bringup sick_tim.launch';
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
module.exports = sick_tim;