'use strict';
class robot_pose_ekf
{
	constructor(params)
	{
		let params_ = params || {};
		this.roslaunch = null;
		this.params = {};
		/*******************************************************************************/
		/*********************************** Params ************************************/
		
		this.params.output_frame = params_.output_frame || 'odom';
		
		this.params.base_footprint_frame = params_.base_footprint_frame || 'base_footprint';
		
		this.params.freq = params_.freq || '30.0';
		
		this.params.sensor_timeout = params_.sensor_timeout || '1.0';
		
		this.params.odom_used = params_.odom_used || 'true';
		
		this.params.imu_used = params_.imu_used || 'true';
		
		this.params.vo_used = params_.vo_used || 'false';
		
		/*******************************************************************************/
	}
	get launch()
	{
		if (!this.roslaunch)
		{
			this.roslaunch = 'roslaunch bringup robot_pose_ekf.launch';
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
		let prettyLaunch = '\x1B[7m' + 'roslaunch bringup robot_pose_ekf.launch';
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
module.exports = robot_pose_ekf;