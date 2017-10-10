'use strict';

class Robot extends RobotMap
{
	// params:
	// 	1. ROSLIB.Ros ros
	// 	2. createjs.Stage stage
	//  3. scale
	//  4. reg
	//  5. int height
	//  6. origin
	//  7. float resolution
	// 	8. string robotId: hostname 
	constructor(ros, scale, reg, height, origin, resolution, robotId)
	{
		super(ros, robotId);
		this.ros = ros;
		this.scale = scale;
		this.reg = reg;
		this.height = height;
		this.origin = origin;
		this.resolution = resolution;
		this.robotId = robotId || '';
		if (this.robotId.indexOf('-') !== -1)
		{
			throw new ValueError(`'-' is not a legal string for ROS graph resource name`);
		}
		// ros topics
		this.topics = {}; 
		// received ros messages
		this.rosMsgs = {
			robotId: this.robotId,
			map: null,
			robotPose: null,
			tf: null,
			waypoints: null
		};
		// container maps
		this.containerMap = {};
		this.tfMap = {};
		this.tf = new Tf(this.scale, this.reg, this.height, this.origin, this.resolution);
		this.container = new createjs.Container();
		this.container.id = this.robotId;
	}

	// params:
	// 	1. float scale
	// 	2. reg: {
	// 		float x: Robot.reg.x,
	// 		float y: Robot.reg.y
	// 	}
	zoom(scale, reg)
	{
		this.scale.x *= scale;
		this.scale.y *= scale;
		this.reg.x += reg.x;
		this.reg.y += reg.y;
		super.emit(`${this.robotId}-zoom`, this.rosMsgs);
		console.log(`${this.robotId}-zoom`);
	}

	// params:
	// 	1. string topicName: ros topic to undisplay
	// return:
	//  bool result
	undisplay(topicName)
	{
		var topic = this.topics[topicName];
		topic.unsubscribe();
		var container = this.containerMap[topicName];
		if (container)
		{
			this.container.removeChild(container);
			return true;	
		}
		return false;
	}

	// params:
	// 	1. options:
	// 		string name: robot_pose topic name, '/robot_pose' by default;
	// 		string messageType: 'geometry_msgs/Pose' by default
	//		bool sizeFixed: false by default
	dispRobotPose(options)
	{
		var options = options || {};
		var name = options.name || '/robot_pose';
		var messageType = options.messageType || 'geometry_msgs/Pose';
		var sizeFixed = options.sizeFixed || false;
		var robotPoseTopic = this.topic(name, messageType);
		robotPoseTopic.subscribe(this.robotPoseCb(name));
		super.on(`${this.robotId}-zoom`, this.robotPoseCb(name));
	}

	// listen to tf via tf2_web_republisher if useRepublisher is true, otherwise via /tf topic
	// params:
	// 	1. options:
	// 		bool useRepublisher: if listen to tf via tf2_web_republisher, true by default
	// 		string name: tf topic name
	// 		string messageType: tf topic message type
	listenTf(options)
	{
		var options = options || {};
		var useRepublisher = (options.useRepublisher === undefined) ? true : options.useRepublisher;
		if (useRepublisher)
		{
			var mapTFClient = super.TFClient('map');
			mapTFClient.subscribe('odom', this.tfCb('map', 'odom'));
			mapTFClient.subscribe('base_laser', this.tfCb('map', 'base_laser'));
			var baseLinkTFClient = super.TFClient('base_link');
			baseLinkTFClient.subscribe('base_laser', this.tfCb('base_link', 'base_laser'));
		}
		else
		{
			var name = options.name || '/tf';
			var messageType = options.messageType || 'tf2_msgs/TFMessage';
			var tfTopic = this.topic(name, messageType);
			tfTopic.subscribe((message) => {
				for (var i = 0; i < message.transforms.length; i++)
				{
					var frameId = message.transforms[i].header.frame_id;
					var childFrameId = message.transforms[i].child_frame_id;
					var tfName = frameId + '2' +childFrameId; // eg: map->odom
					this.tfMap[tfName] = message.transforms[i];
				}		
			});	
		}
	}

	// params:
	// 	1. options:
	// 		string name: waypoints topic name, 'waypoints' by default
	// 		string messageType: 'yocs_msgs/WaypointList' by default
	// 		string[] dispTypes: waypoints' types to display on canvas, ['map'] by default
	dispWaypoints(options)
	{
		var options = options || {};
		var name = options.name || '/waypoints';
		var messageType = options.messageType || 'yocs_msgs/WaypointList';
		var dispTypes = options.dispTypes || ['map'];
		var waypointsTopic = this.topic(name, messageType);
		waypointsTopic.subscribe(this.waypointsCb(name, dispTypes));
		super.on(`${this.robotId}-zoom`, this.waypointsCb(name, dispTypes));
	}

	// params:
	// 	1. options:
	// 		string name: global plan topic name, '/move_base/NavfnROS/plan' by default
	// 		string messageType: 'nav_msgs/Path' by default
	//		string color: '#00ff00' by default
	dispGlobalPlan(options)
	{
		var options = options || {};
		var name = options.name || '/move_base/NavfnROS/plan';
		var messageType = options.messageType || 'nav_msgs/Path';
		var color = options.color || '#00ff00';
		var globalPlanTopic = this.topic(name, messageType);
		globalPlanTopic.subscribe(this.globalPlanCb(name, color));
		super.on(`${this.robotId}-zoom`, this.globalPlanCb(name, color));
	}

	// params:
	// 	1. options:
	// 		string name: global plan topic name, '/move_base/NavfnROS/plan' by default
	// 		string messageType: 'nav_msgs/Path' by default
	//		string color: '#ff0000' by default
	dispLocalPlan(options)
	{
		var options = options || {};
		var name = options.name || '/move_base/DWAPlannerROS/local_plan';
		var messageType = options.messageType || 'nav_msgs/Path';
		var color = options.color || '#ff0000';
		var localPlanTopic = this.topic(name, messageType);
		localPlanTopic.subscribe(this.localPlanCb(name, color));
		super.on(`${this.robotId}-zoom`, this.localPlanCb(name, color));
	}

	// subscribe move_base status
	// params:
	// 	1. options:
	// 		string name: '/move_base/status' by default;
	// 		string messageType: 'actionlib_msgs/GoalStatusArray' by default;
	// return:
	// 	Promise
	goalStatus(options)
	{
		var options = options || {};
		var name = options.name || '/move_base/status';
		var messageType = options.messageType || 'actionlib_msgs/GoalStatusArray';
		var goalStatusTopic = this.topic(name, messageType);
		return new Promise((resolve, reject) => {
			goalStatusTopic.subscribe((msg) => {
				resolve(msg);
			});
		});
	}
	
	//private:
	// params:
	// 	1. msg: rostopic subscribed msg or emitted msg
	// 	2. string name: msg name
	// return:
	// 	ros_msgs/Msg
	getMsg(msg, name)
	{
		return msg.hasOwnProperty('robotId') ? msg[name] : msg;
	}

	// params:
	// 	1. string name: robot_pose topic name
	robotPoseCb(name)
	{
		return (pose) => {
			var pose = this.getMsg(pose, name);
			if (!pose)
			{
				return;
			}
			this.rosMsgs[name] = pose;
			var robotPoseModel = this.containerMap[name];
			if (!robotPoseModel)
			{
				robotPoseModel = models.robot();
				this.container.addChild(robotPoseModel);
			}
			var pos = this.tf.mapToCanvas(pose.position);
			var ori = this.tf.quaternionToCanvasYaw(pose.orientation);
			robotPoseModel.x = pos.x;
			robotPoseModel.y = pos.y;
			robotPoseModel.rotation = ori;
			this.containerMap[name] = robotPoseModel;
		}
	}

	waypointsCb(name, dispTypes)
	{
		return (waypoints) => {
			var waypoints = this.getMsg(waypoints, name);
			if (!waypoints)
			{
				return;
			}
			this.rosMsgs[name] = waypoints;
			var waypointsContainer = this.containerMap[name];
			if (waypointsContainer)
			{
				waypointsContainer.removeAllChildren();
			}
			else
			{
				waypointsContainer = new createjs.Container();
			}
			for (var i = 0; i < waypoints.waypoints.length; i++)
			{
				var waypoint = waypoints.waypoints[i];
				var type = waypoint.header.frame_id;
				if (dispTypes.indexOf(type) === -1)
				{
					continue;
				}
				var waypointModel = models.waypoint.map();
				var pos = this.tf.mapToCanvas(waypoint.pose.position);
				var ori = this.tf.quaternionToCanvasYaw(waypoint.pose.orientation);
				waypointModel.x = pos.x;
				waypointModel.y = pos.y;
				waypointModel.rotation = ori;
				waypointsContainer.addChild(waypointModel);
			}
			this.container.addChild(waypointsContainer);
			this.containerMap[name] = waypointsContainer;
		}
	}

	globalPlanCb(name, color)
	{
		return (plan) => {
			var plan = this.getMsg(plan, name);
			if (!plan)
			{
				return;
			}
			this.rosMsgs[name] = plan;
			var globalPlanContainer = this.containerMap[name];
			if (globalPlanContainer)
			{
				globalPlanContainer.removeAllChildren();
			}
			else
			{
				globalPlanContainer = new createjs.Container();
			}
			var globalPlanModel = models.globalPlan(plan, this.tf, {
				color: color
			});
			globalPlanContainer.addChild(globalPlanModel);
			this.container.addChild(globalPlanContainer);
			this.containerMap[name] = globalPlanContainer;
		}
	}

	localPlanCb(name, color)
	{
		return (plan) => {
			var plan = this.getMsg(plan, 'localPlan');
			if (!plan)
			{
				return;
			}
			this.rosMsgs['localPlan'] = plan;
			var localPlanContainer = this.containerMap[name];
			if (localPlanContainer)
			{
				localPlanContainer.removeAllChildren();
			}
			else
			{
				localPlanContainer = new createjs.Container();
			}
			// odom -> map
			var localPlanModel = models.localPlan(plan, this.tf, {
				color: color
			});
			localPlanContainer.addChild(localPlanModel);
			this.container.addChild(localPlanContainer);
			this.containerMap[name] = localPlanContainer;
		}
	}

	tfCb(frameId, childFrameId)
	{
		return (tf) => {
			var tfMsg = {
				header: {
					stamp: null,
					frame_id: frameId,
				},
				child_frame_id: childFrameId,
				transform: tf
			};//tfMsg
			var tfName = frameId + '2' + childFrameId; // eg: map2odom
			this.tfMap[tfName] = tfMsg;
		}// return
	}

	// params: 
	// 	1. string name: topic name;
	// 	2. string messageType;
	// return: ROSLIB.Topic
	topic(name, messageType)
	{
		var topicName = this.robotId.length === 0 ? name : '/' + this.robotId + name;
		var topic =  new ROSLIB.Topic({
			ros: this.ros,
			name: topicName,
			messageType: messageType
		});
		this.topics[name] = topic;
		return topic;
	}

	// params:
	// 	1. string name: service name;
	// 	2. string serviceType
	// return:
	// 	ROSLIB.Service
	service(name, serviceType)
	{
		var serviceName = this.robotId.length === 0 ? name : '/' + this.robotId + name;
		return ROSLIB.Service({
			ros: this.ros,
			name: serviceName,
			serviceType: serviceType
		});
	}
}