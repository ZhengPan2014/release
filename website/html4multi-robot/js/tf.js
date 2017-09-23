'use strict';
class Tf
{
	// params:
	// 	1. scale: {
	// 		float x: bitmap scale.x,
	// 		float y: bitmap scale.y
	//  }
	// 	2. reg: {
	// 		float x: bitmap reg.x,
	// 		float y: bitmap reg.y
	//  }
	// 	3. int height: bitmap.image.height
	// 	4. origin: {
	//      position: {
	// 			int x: map.info.origin.x,
	// 			int y: map.info.origin.y
	//      }
	// 	}
	// 	5. float resolution: map.info.resolution
	constructor(scale, reg, height, origin, resolution)
	{
		this.scale = scale;
		this.reg = reg;
		this.height = height;
		this.origin = origin;
		this.resolution = resolution;
	}

	// params:
	// 	1. quaternion orientation;
	// 	2. bool ignoreXY: false by default;
	// return:
	// 	{
	// 		float roll: in rad,
	// 		float pitch: in rad,
	// 		float yaw: in rad
	// 	}
	quaternionToEuler(orientation, ignoreXY)
	{
		var x = orientation.x;
		var y = orientation.y;
		if (ignoreXY)
		{
			x = 0;
			y = 0;
		}
		var z = orientation.z;
		var w = orientation.w;
		var roll = Math.atan2(2*(w*x+y*z), 1-2*(Math.pow(x,2)+Math.pow(y,2)));
		var pitch = Math.asin(2*(w*z-y*z));
		var yaw = Math.atan2(2*(w*z+x*y), 1-2*(Math.pow(y,2)+Math.pow(z,2)));
		return {
			roll: roll,
			pitch: pitch,
			yaw: yaw
		};
	}

	// orientation -> yaw in degrees, createjs.Stage(canvas) only,
	// canvas rotation is clock wise ad in degrees
	// params:
	// 	1. quaternion orientation
	// return:
	// 	float yaw in deg
	quaternionToCanvasYaw(orientation)
	{
		var w = orientation.w;
    	var x = orientation.x;
    	var y = orientation.y;
    	var z = orientation.z;
    	return -Math.atan2(2*(w*z+x*y), 1-2*(y*y+z*z))*180.0/Math.PI;
	}

	// params:
	// 	1. float yaw: yaw in rad;
	// return:
	// 	quaternion
	yawToQuaternion(yaw)
	{
		return {
			x: 0,
			y: 0,
			z: Math.sin(yaw/2),
			w: Math.cos(yaw/2)
		}
	}

	// position(frame_id: map) -> position in canvas  
	// params: 
	// 	1. pos: {
	// 		float x,
	// 		float y
	// 	}
	// return:
	// 	{
	// 		int x,
	// 		int y
	// 	}
	mapToCanvas(pos)
	{
		var x = Math.round((pos.x - this.origin.position.x)/this.resolution*this.scale.x);
		var y = Math.round((this.height-(pos.y-this.origin.position.y)/this.resolution)*this.scale.y);
		return {
			x: x - this.reg.x * this.scale.x,
			y: y - this.reg.y * this.scale.y
		};
	}

	// localPlan(frame_id: odom) -> localPlan(frame_id: map)
	// params:
	// 	1. nav_msgs/Path planOdom: local plan(frame_id: odom)
	// 	2. geometry_msgs/TransformStamped transform: transform from map to odom
	// return:
	// 	geometry_msgs/Pose[]
	localPlanOdomToMap(planOdom, transform)
	{
		var planMap = {
			poses: []
		};
		if (!this.isTfValid(planOdom.header.stamp, transform.header.stamp, 1.0))
		{
			console.warn('[WARN]Tf msg from map to odom out of date');
			return planMap;
		}
		var tfMat = this.transformToMat(transform);
		for (var i = 0; i < planOdom.poses.length; i++)
		{
			var p = $V([posMsg.poses[i].pose.position.x, posMsg.poses[i].pose.position.y, 1]);	
			var result = tfMat.multiply(p);
			var pos = {
				pose: {
					position: {
						x: result.elements[0],
						y: result.elements[1]
					}
				}
			};
			planMap.push(pos);
		}
		return planMap;
	}

	// transform -> transform matrix
	// params:
	// 	1. transform
	// return: 
	// 	transform matrix
	transformToMat(transform)
	{
		var translation = transform.translation;
		var yaw = this.quaternionToEuler(transform.rotation).yaw;
		var sinYaw = Math.sin(yaw);
		var cosYaw = Math.cos(yaw);
		var tx = translation.x;
		var ty = translation.y;
		return $M([[cosYaw, -sinYaw, tx],
				   [sinYaw,  cosYaw, ty],
				   [	 0,       0,  1]]);
	}

	isTfValid(msgStamp, tfStamp, duration)
	{
		if (tfStamp === null)
		{
			return true;
		}
		var secs = Math.abs(tfStamp.secs - msgStamp.secs);
		var nsecs = Math.abs(tfStamp.nsecs - msgStamp.nsecs);
		var t = secs + nsecs / Math.pow(10,9);
		return (t < duration);
	}
}