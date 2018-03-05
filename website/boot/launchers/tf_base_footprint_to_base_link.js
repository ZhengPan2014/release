'use strict';
class tf_base_footprint_to_base_link
{
	constructor(params)
	{
		let params_ = params || {};
		this.roslaunch = null;
		this.params = {};
		/*******************************************************************************/
		/*********************************** Params ************************************/
		
		this.params.pub_rate = params_.pub_rate || '50';
		
		this.params.frame_id = params_.frame_id || 'base_footprint';
		
		this.params.child_frame_id = params_.child_frame_id || 'base_link';
		
		this.params.x = params_.x || '0.0';
		
		this.params.y = params_.y || '0.0';
		
		this.params.z = params_.z || '0.0';
		
		this.params.roll = params_.roll || '0.0';
		
		this.params.pitch = params_.pitch || '0.0';
		
		this.params.yaw = params_.yaw || '0.0';
		
		/*******************************************************************************/
	}
	get launch()
	{
		if (!this.roslaunch)
		{
			this.roslaunch = 'roslaunch bringup tf_base_footprint_to_base_link.launch';
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
		let prettyLaunch = '\x1B[7m' + 'roslaunch bringup tf_base_footprint_to_base_link.launch';
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
module.exports = tf_base_footprint_to_base_link;