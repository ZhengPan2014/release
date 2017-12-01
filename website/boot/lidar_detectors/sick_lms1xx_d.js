'use strict';

const getDevType = require('../lib/sick_lidar_lib').getDevType;

module.exports = {
	sick_lms1xx_d: isSickLms1xx
};

async function isSickLms1xx(ip)
{
	let ip_ = ip || '192.168.0.1';
	let type;
	try
	{
		type = await getDevType(ip_);
		if (type.startsWith('LMS1'))
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