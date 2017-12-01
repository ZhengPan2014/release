'use strict';

const getDevType = require('../lib/sick_lidar_lib').getDevType;

module.exports = {
	sick_tim561_d: isSickTim561
};

async function isSickTim561(ip)
{
	let ip_ = ip || '192.168.0.1';
	let type;
	try
	{
		type = await getDevType(ip_);
		if (type === 'TIM561')
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	catch(e)
	{
		return false;
	}
}