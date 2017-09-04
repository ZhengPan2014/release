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
		let mapTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: map || '/map_edit',
			messageType: 'nav_msgs/OccupancyGrid',
		});
		mapTopic.subscribe((message) => {
			UI.dispMap(message);
			NAV._dispWaypoints();
		});
	},

	_dispWaypoints: () => {
		let wpTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: '/waypoints',
			messageType: 'yocs_msgs/WaypointList'
		});
		wpTopic.subscribe((message) => {
			UI.dispWaypoints(message);
		});
	},

	_dispRobotPose: () => {
		let poseTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: '/pose',
			messageType: 'geometry_msgs/PoseStamped'
		});
		poseTopic.subscribe((message) => {
			UI.dipRobotPose(message);
		});
	},

	dispLaserScan: () => {

	},

	addWaypoint: () => {

	},

	delWaypoint: () => {
		
	},

	subShellFeedback: () => {
		let shellFdTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: '/shell_feedback',
			messageType: 'std_msgs/String'
		});
		shellFdTopic.subscribe((message) => {
			switch (message.data)
			{
				default:
					let msgs = message.data.split(/[ :]/);
					let key = msgs[0].trim();
					switch (key)
					{
						case 'dbparam':
							let mapName = msgs[1].trim();
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