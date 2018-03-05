'use strict';
class sound_play
{
	constructor(params)
	{
		let params_ = params || {};
		this.roslaunch = null;
		this.params = {};
		/*******************************************************************************/
		/*********************************** Params ************************************/
		
		/*******************************************************************************/
	}
	get launch()
	{
		if (!this.roslaunch)
		{
			this.roslaunch = 'roslaunch bringup sound_play.launch';
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
		let prettyLaunch = '\x1B[7m' + 'roslaunch bringup sound_play.launch';
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
module.exports = sound_play;