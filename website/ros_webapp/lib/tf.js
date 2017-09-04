'use strict';

function quaternionToYaw(orientation)
{
	var numerator = 2*(orientation.w*orientation.z+orientation.x*orientation.y);
	var denominator = 1-2*(Math.pow(orientation.y,2)+Math.pow(orientation.z,2));
	var yaw = Math.atan2(numerator, denominator);
	return yaw;
}

module.exports = {
	quaternionToYaw: quaternionToYaw
};