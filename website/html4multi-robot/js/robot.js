'use strict';

class Robot extends EventEmitter2
{
	// params:
	// 	1. ROSLIB.Ros ros
	//	2. options:
	//		string robotId: hostname
	//	 	stageInfo:
	//			scale: {float x, float y}
	//			reg: {float x, float y}
	//			float height: 
	//			float origin:
	//			float resolution
	//		createjs.Stage stage
	//		string[] needPoseTypes: waypoints types which need a valid pose, 
	//								['goal', 'pallet', 'mark', 'initial_pose'] by default
	constructor(ros, options)
	{
		var options = options || {};
		var robotId = options.robotId || '';
		super();
		this.ros = ros;
		this.robotId = robotId;
		this.needPoseTypes = options.needPoseTypes || ['goal', 'pallet', 'mark', 'initial_pose'];
		this.dispItems = {
			robotPose: this.dispRobotPose,
			globalPlan: this.dispGlobalPlan,
			localPlan: this.dispLocalPlan,
			waypoints: this.dispWaypoints
		};
		this.stage = null;
		this.scale = null;
		this.reg = null;
		this.height = null;
		this.origin = null;
		this.resolution = null;
		this.tf = null;
		this.map = null;
		if (options.stageInfo)
		{
			this.initParams(options.stageInfo);
		}
		else
		{
			this.stage = options.stage;
			this.map = new RobotMap(this.ros, this.robotId);
			this.map.dispMap();
			this.map.on('map', (map) => {
				var stageInfo = this.stage.addMap(map);
				this.initParams(stageInfo);
			});
		}
		// ros topics
		this.topics = {}; 
		// received ros messages
		this.rosMsgs = {
			robotId: this.robotId,
			map: null,
			robotPose: null,
			tf: null,
			waypoints: null,
			trajectories: null
		};
		// container maps
		this.containerMap = {};
		this.tfMap = {};
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
	}

	// display robotPose, laserScan, etc.
	// params:
	//	1. string/string[] items: items to display, 
	display(items)
	{
		var items = items;
		if (typeof items === 'string')
		{
			items = [items];
		}
		for (var item of items)
		{
			if (this.dispItems.hasOwnProperty(item))
			{
				this.dispItems[item].call(this);
			}
			else
			{
				rosjs.logerr(`Can not display ${item}, Maybe this function not inplemented.`);
			}
		}
	}

	// params:
	// 	1. string/string[] topicNames: ros topic to undisplay
	undisplay(topicNames)
	{
		var topicNames = topicNames;
		if (typeof topicNames === 'string')
		{
			topicNames = [topicNames];
		}
		for (var topicName of topicNames)
		{
			var topic = this.topics[topicName];
			topic.unsubscribe();
			var container = this.containerMap[topicName];
			if (container)
			{
				this.container.removeChild(container);
			}	
		}
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

	// pose estimate
	// params: 
	// 	1. geometry_msgs/Pose pose
	// 	2. options:
	// 		string frame: 'map' by default
	// 		float64[36] covariance: covariance[0] = 0.25, covariance[7] = 0.25, covariance[35] = PI^2 by default
	poseEstimate(pose, options)
	{
		var options = options || {};
		var initialPoseTopic = this.topics['/initialpose'];
		if (!initialPoseTopic)
		{
			initialPoseTopic = this.topic('/initialpose', 'geometry_msgs/PoseWithCovarianceStamped');
		}
		var frame = options.frame || 'map';
		var covariance = options.covariance;
		if (!covariance)
		{
			covariance = [];
			for (var i = 0; i < 36; i++)
			{
				covariance[i] = 0;
			}
			covariance[0] = 0.5 * 0.5;
			covariance[7] = 0.5 * 0.5;
			covariance[35] = Math.pow((Math.PI/12), 2);
		}
		var msg = new ROSLIB.Message({
			header: {
				frame_id: frame
			},
			pose: {
				pose: pose,
				covariance: covariance
			}
		});
		initialPoseTopic.publish(msg);
		rosjs.loginfo(`Setting initial pose: ${JSON.stringify(pose)}, frame: ${frame}`);
	}

	// send navigation goal
	// params: 
	// 	1. geometry_msgs/Pose pose
	// 	2. string frame[optional]: 'map' by default
	navigateTo(pose, frame)
	{
		var goalTopic = this.topics['/move_base_simple/goal'];
		if (!goalTopic)
		{
			goalTopic = this.topic('/move_base_simple/goal', 'geometry_msgs/PoseStamped');
		}
		var frame = frame || 'map';
		var msg = new ROSLIB.Message({
			header: {
				frame_id: frame
			},
			pose: pose
		});
		goalTopic.publish(msg);
		rosjs.loginfo(`Sending goal: ${JSON.stringify(pose)}, frame: ${frame}`);
	}

	// switch to mapping mode
	toMapping()
	{
		this.pubCmdString('gmapping');
	}

	// switch to navigation
	toNavigation()
	{

	}

	// manual control by publish /cmd_vel
	// e.g.: manualControl(1,0), manualControl([1,0,0], [0,0,0])
	// params:
	// 	1. float/float[] linear;
	// 	2. float/float[] angular
	manualControl(linear, angular)
	{
		var cmdVelTopic = this.topics['/cmd_vel'];
		if (!cmdVelTopic)
		{
			cmdVelTopic = this.topic('/cmd_vel', 'geometry_msgs/Twist');
		}
		var linearVel = {x: 0, y: 0, z: 0};
		var angularVel = {x: 0, y: 0, z: 0};
		if (typeof linear === 'number')
		{
			linearVel.x = linear
		}
		else
		{
			if (linear.length === 2)
			{
				linearVel.x = linear[0];
				linearVel.y = linear[1];
			}
			else if (linear.length === 3)
			{
				linearVel.x = linear[0];
				linearVel.y = linear[1];
				linearVel.z = linear[2];
			}
		}
		if (typeof angular === 'number')
		{
			angularVel.z = angular;
		}
		else
		{
			if (angular.length === 2)
			{
				angularVel.x = angular[0];
				angularVel.y = angular[1];
			}
			else if (angular.length === 3)
			{
				angularVel.x = angular[0];
				angularVel.y = angular[1];
				angularVel.z = angular[2];
			}
		}
		var msg = new ROSLIB.Message({
			linear: linearVel,
			angular: angularVel
		});
		cmdVelTopic.publish(msg);
	}

	// TODO: solve this confusing logic
	// add waypoint 
	// params:
	// 	1. waypoint:
	// 		string name: waypoint name,
	// 		float close_enough,
	// 		float goal_timeout,
	// 		string failure_mode,
	// 		string type: waypoint type,
	// 		string pose,
	// 		string frame_id(optional),
	// 		string mark(optional),
	//		string access(optional).
	addWaypoint(waypoint)
	{
		var addWaypointTopic = this.topics['/waypoint_add'];
		if (!addWaypointTopic)
		{
			addWaypointTopic = this.topic('/waypoint_add', 'yocs_msgs/Waypoint');
		}
		var frameIdJson = {
			close_enough: waypoint.close_enough,
			goal_timeout: waypoint.goal_timeout,
			failure_mode: waypoint.failure_mode,
			type: waypoint.type
		};
		var pose = {
			position: {x: 0, y: 0, z: 0},
			orientation: {x: 0, y: 0, z: 0, w: 0}
		};
		if (this.needPose)
		{
			pose = waypoint.pose;
		}
		if (waypoint.frame_id)
		{
			frameIdJson.frame_id = waypoint.frame_id;
		}
		if (waypoint.mark)
		{
			frameIdJson.mark = waypoint.mark;
		}
		if (waypoint.access)
		{
			frameIdJson.access = waypoint.access;
		}
		var frameIdStr = JSON.stringify(frameIdJson);
		var msg = new ROSLIB.Message({
			header: {
				frame_id: frameIdStr
			},
			name: waypoint.name,
			close_enough: waypoint.close_enough,
			goal_timeout: waypoint.goal_timeout,
			failure_mode: waypoint.failure_mode,
			pose: pose
		});
		addWaypointTopic.publish(msg);
		rosjs.loginfo(`Adding waypoint: ${waypoint.name}`);
	}

	// delete waypoint by name
	// params:
	// 	1. string name
	delWaypoint(name)
	{
		var delWaypointTopic = this.topics['/waypoint_remove'];
		if (!delWaypointTopic)
		{
			delWaypointTopic = this.topic('/waypoint_remove', 'yocs_msgs/Waypoint');
		}
		var waypoint = this.getWaypointByName(name);
		if (!waypoint)
		{
			rosjs.logerr(`Waypoint: ${name} not exist.`);
			return;
		}
		var msg = new ROSLIB.Message(waypoint);
		delWaypointTopic.publish(msg);
		rosjs.loginfo(`Deleting waypoint: ${name}.`);
	}

	// add trajectory
	// params: 
	// 	1. string name: trajectory name,
	// 	2. string[] waypoints: waypoints in trajectory
	//	3. string access 
	addTrajectory(name, waypoints, access)
	{		
		var addTrajTopic = this.topics['/trajectory_add'];
		if (!addWaypointTopic)
		{
			addWaypointTopic = this.topic('/trajectory_add', 'yocs_msgs/Trajectory');
		}
		var msg = new ROSLIB.Message({
			header: {
				frame_id: JSON.stringify({access: access})
			},
			name: name,
			waypoints: []
		});
		for (var w of waypoints)
		{
			msg.waypoints.push(this.getWaypointByName(w));
		}
		addWaypointTopic.publish(msg);
		rosjs.loginfo(`Adding trajectory: ${name}`);
	}

	// delete trajectory by name
	// params:
	// 	1. string name
	delTrajectory(name)
	{
		var delTrajTopic = this.topics['trajectory_remove'];
		if (!delTrajTopic)
		{
			delTrajTopic = this.topic('/trajectory_remove', 'yocs_msgs/Trajectory');
		}
		var traj = this.getTrajByName(name);
		if (!traj)
		{
			rosjs.logerr(`Trajectory: ${name} not exist.`);
			return;
		}
		var msg = new ROSLIB.Message(traj);
		delTrajTopic.publish(msg);
		rosjs.loginfo(`Deleting trajectory: ${name}.`);
	}

	// wayoints or trajectories navigation control
	// params:
	// 	1. string goalName: waypoint or trajectory name
	// 	2. int control: STOP=0, START=1, PAUSE=2
	navCtrl(goalName, control)
	{
		var navCtrlTopic = this.topics['/nav_ctrl'];
		if (!navCtrlTopic)
		{
			navCtrlTopic = this.topic('/nav_ctrl', 'yocs_msgs/NavigationControl');
		}
		var msg = new ROSLIB({
			goal_name: goalName,
			control: control
		});
		navCtrlTopic.publish(msg);
		rosjs.loginfo(`Navigation control: ${goalName}, ${control}`);
	}

	pubCmdString(cmd)
	{
		var cmdStringTopic = this.topics['/cmd_string'];
		if (!cmdStringTopic)
		{
			cmdStringTopic = this.topic('/cmd_string', 'std_msgs/String');
		}
		var msg = new ROSLIB.Message({
			data: cmd
		});
		cmdStringTopic.publish(msg);
		rosjs.loginfo(`Publishing cmd string: ${cmd}`);
	}

	// get waypoint by name
	// params:
	// 	1. string name: waypoint.name
	// return: yocs_msgs/Waypoint / undefined if not found
	getWaypointByName(name)
	{
		var result;
		if (this.rosMsgs.waypoints)
		{
			for (var waypoint of this.rosMsgs.waypoints.waypoints)
			{
				if (waypoint.name === name)
				{
					result = waypoint;
					break;
				}
			}
		}
		return result;
	}

	// get trajectory by name
	// params:
	// 	1. string name: trajectory.name
	// return: yocs_msgs/Trajectory / undefined if not found
	getTrajByName(name)
	{
		var result;
		if (this.rosMsgs.trajectories)
		{
			for (var traj of this.rosMsgs.trajectories.trajectories)
			{
				if (traj.name === name)
				{
					result = traj;
					break;
				}
			}
		}
		return result;
	}

	// check if name already used in waypoints or trajectories
	// params: 
	//	1. string name
	// return: bool
	isNameUsed(name)
	{
		if (this.rosMsgs.waypoints)
		{
			for (var waypoint of this.rosMsgs.waypoints.waypoints)
			{
				if (waypoint.name === name)
				{
					return true;
				}
			}
		}
		if (this.rosMsgs.trajectories.trajectories)
		{
			for (var traj of this.rosMsgs.trajectories.trajectories)
			{
				if (traj.name === name)
				{
					return true;
				}
			}
		}
		return false;
	}

/*********private***********/	
	
	// params:
	//	1. stageInfo:
	//		scale: {float x, float y}
	//		reg: {float x, float y}
	//		float height: 
	//		float origin:
	//		float resolution
	initParams(stageInfo)
	{
		this.scale = stageInfo.scale;
		this.reg = stageInfo.reg;
		this.height = stageInfo.height;
		this.origin = stageInfo.origin;
		this.resolution = stageInfo.resolution;
		this.tf = new Tf(this.scale, this.reg, this.height, this.origin, this.resolution);
	}

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

	// check if waypoint needs a valid pose
	// params:
	// 	1. string type: waypoint type
	// reeturn bool
	needPose(type)
	{
		if (this.needPoseTypes.indexOf(type) === -1)
		{
			return false;
		}
		return true;
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