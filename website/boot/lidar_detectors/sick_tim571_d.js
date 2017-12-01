'use strict';

const getDevType = require('../lib/sick_lidar_lib').getDevType;

module.exports = {
	sick_tim571_d: isSickTim571
};

async function isSickTim571(ip)
{
	let ip_ = ip || '192.168.0.1';
	let type;
	try
	{
		type = await getDevType(ip_);
		if (type === 'TIM571')
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