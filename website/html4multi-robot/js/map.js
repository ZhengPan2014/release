'use strict';
class RobotMap extends EventEmitter2
{
	constructor(ros, mapId)
	{
		super();
		this.ros = ros;
		this.mapId = mapId || '';
		if (this.mapId.indexOf('-') !== -1)
		{
			throw new ValueError(`'-' is not a legal string for ROS graph resource name`);
		}
	}

	// params:
	// 	1. options:
	// 		string name: map topic name;
	// 		string messageType;
	//		string signal: 'map' by default
	dispMap(options)
	{
		var options = options || {};
		var name = options.name || '/map';
		var messageType = options.messageType || 'nav_msgs/OccupancyGrid';
		var signal = options.signal || 'map';
		var mapTopic = this.topic(name, messageType);
		mapTopic.subscribe((message) => {
			super.emit(signal, message);
		});
	}

	// params:
	// 	1. options:
	// 		string name: costmap topic name;
	// 		string messageType
	dispCostmap(options)
	{

	}

	// params: 
	// 	1. string name: topic name;
	// 	2. string messageType;
	// return: ROSLIB.Topic
	topic(name, messageType)
	{
		var topicName = this.mapId.length === 0 ? name : '/' + this.mapId + name;
		return new ROSLIB.Topic({
			ros: this.ros,
			name: topicName,
			messageType: messageType
		});
	}

	// params: 
	// 	1. string fixedFrame: fixed frame, 'map' by default;
	// 	2. options: 
	// 		float angularThres: angular threshold to publish a new tf
	// 		float transThres: translation threshold to publish a new tf
	// return:
	// 	ROSLIB.TFClient
	tfClient(fixedFrame, options)
	{
		var options = options || {};
		return new ROSLIB.TFClient({
			ros: this.ros,
			fixedFrame: fixedFrame || 'map',
			angularThres: options.angularThres || 0.01,
			transThres: options.transThres || 0.01
		});
	}
}