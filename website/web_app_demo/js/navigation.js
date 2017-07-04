var NAV = NAV || {
	init: (url) => {
		NAV.ros = new ROSLIB.Ros();
		NAV.ros.connect(url);
		NAV.ros.on('connection', () => {
			console.log(`Connected to ${url}.`);
		});
		NAV.ros.on('close', () => {
			console.log(`Server ${url} closed.`);
		});
		NAV.ros.on('error', () => {
			console.log(`Connection error.`);
		});
	},

	dispMapAndWps: (map) => {
		var mapTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: map || '/map_edit',
			messageType: 'nav_msgs/OccupancyGrid',
		});
		mapTopic.subscribe((message) => {
			UI.dispMap(message);
			NAV._dispWaypoints();
			// 订阅robot pose 话题
			NAV._dispRobotPose();
			
			NAV._globalplannerTopic();
		});
	},

	_dispWaypoints: () => {
		var wpTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: '/waypoints',
			messageType: 'yocs_msgs/WaypointList'
		});
		wpTopic.subscribe((message) => {
			UI.dispWaypoints(message);
		});
	},
	
	// 订阅robot pose 话题
	_dispRobotPose: () => {
		var poseTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: '/robot_pose',
			messageType: 'geometry_msgs/Pose'
		});
		poseTopic.subscribe((message) => {
			// 收到pose 消息后由ui.js里的dispRobotPose画到画布上
			UI.dispRobotPose(message);
		});
	},
	

	// 订阅trajectory addTopic话题
	_globalplannerTopic: () => {
		var plannerTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: '/move_base/NavfnROS/plan',
			messageType: 'nav_msgs/Path'
		});
		plannerTopic.subscribe((message) => {
			UI.globalplannerTopic(message);
		});
	},
	
	

	dispLaserScan: () => {

	},

	addWaypoint: () => {

	},

	delWaypoint: () => {
		
	},

	subShellFeedback: () => {
		var shellFdTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: '/shell_feedback',
			messageType: 'std_msgs/String'
		});
		shellFdTopic.subscribe((message) => {
			switch (message.data)
			{
				default:
					var msgs = message.data.split(/[ :]/);
					var key = msgs[0].trim();
					switch (key)
					{
						case 'dbparam':
							var mapName = msgs[1].trim();
							UI.updateMapName(mapName);
							break;
						default:
							break;
					}				
					break;
			}
		});
	},
};