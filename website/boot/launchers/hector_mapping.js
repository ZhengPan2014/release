'use strict';
class hector_mapping
{
	constructor(params)
	{
		let params_ = params || {};
		this.roslaunch = null;
		this.params = {};
		/*******************************************************************************/
		/*********************************** Params ************************************/
		
		this.params.tf_map_scanmatch_transform_frame_name = params_.tf_map_scanmatch_transform_frame_name || 'scanmatcher_frame';
		
		this.params.base_frame = params_.base_frame || 'base_footprint';
		
		this.params.odom_frame = params_.odom_frame || 'odom';
		
		this.params.pub_map_odom_transform = params_.pub_map_odom_transform || 'false';
		
		this.params.scan_subscriber_queue_size = params_.scan_subscriber_queue_size || '1';
		
		this.params.scan_topic = params_.scan_topic || 'scan';
		
		this.params.map_size = params_.map_size || '4096';
		
		/*******************************************************************************/
	}
	get launch()
	{
		if (!this.roslaunch)
		{
			this.roslaunch = 'roslaunch bringup hector_mapping.launch';
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
		let prettyLaunch = '\x1B[7m' + 'roslaunch bringup hector_mapping.launch';
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
module.exports = hector_mapping;