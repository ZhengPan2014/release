var PARAMS = PARAMS || {
	DefaultPose: {
    	position: {
    			x: 0,
    			y: 0,
    			z: 0
    	},
    	orientation: {
    			x: 0,
    			y: 0,
    			z: 0,
    			w: 1
    	}
    },
    // cmd_vel for docking
    CmdVel: 0.05,
    // backward moving distance before navigation 
    SailDis: 0.30,
    // distance between dock and docking begin waypoint
    DockingBeginDis: 0.35,
    // threshold for low power warning
    PowerWarnThreshold: 0.2,

    ChargeStatus: {
    	uncontact: 0,
    	contact: 1,
    	volAbnormal: 2,
    	charging: 3
    },

    NavCtrl: {
    	stop: 0,
    	start: 1,
    	pause: 2
    },

    NavCtrlStatus: {
    	error: -1,
    	idling: 0,
    	running: 1,
    	paused: 2,
    	completed: 3,
    	cancelled: 4,
    	sub_cancelled: 5
    },

    NetworkMode: {
    	ap: 'ap',
    	wifi: 'wifi'
    },
    
    RobotStatus: {
    	MappingStatus: 'mappingStatus',
    	LastNetworkSetting: 'lastNetworkSetting'
    },

    Extensions: ['ster', 'ster2', 'tofflon'],

    DiagnosticsLevel: {
    	Warn: 1,
    	Error: 2,
    	Stale: 3
    },

    NeedPoseTypes: ['goal', 'pallet', 'mark', 'initial_pose'],
};

var hood_block_time = 0;

var NAV = NAV || {
	CmdEnum: {
        Navigation: "navigation",
        Gmapping: "gmapping",
        Cancel: "cancel",
        Converting: "converting",
        GamppingPose: "gmapping_pose",
        SaveMap: "save_map",
        SaveMapEdit: "save_map_edit",
        SaveAsMap: "save_as_map",
        SaveAsMapEdit: "save_as_map_edit",
        LoadMap: "load_map",
        LoadMapEdit: "load_map_edit",
        Userauth: "user_auth",
        MapSelect: "dbparam-select",  //查询地图
        MapDelete: "dbparam-delete",  //删除地图
        MapUpdate: "dbparam-update", // 切换地图
        MapInsert: "dbparam-insert", // 添加地图
        Update: "update",
        RoslogDelete: "roslog-delete",
        RoslogSelect: "roslog-select",
        Version: "version",
    },

    RosMode: {
    	Gmapping: 'gmapping',
    	Navigation: 'navigation',
    	Converting: 'converting'
    },

    WaypointMode: {
    	Map: 'map',
    	Timer: 'timer',
    	Puber: 'publisher',
    	Suber: 'subscriber',
    	Pubsuber: 'pubsuber',
    	Looper: 'looper',
    	CmdVelSetSub: 'cmd_vel_set_sub',
    	CmdVel: 'cmd_vel',
    	Shell: 'shell',
    	SoundPlay: 'sound_play',
    	InitialPose: 'initial_pose',
    	ScanMaker: 'scan_marker',
    	ShellString: 'shell_string',
    	Pallet: 'pallet'
    },

    SoundPlayMode: {
    	Stop: 'STOP',
    	Start: 'START',
    	Once: 'ONCE'
    },

    WaypointPrefix: {
    	goal: 'goal',
    	timer: 'timer',
    	publisher: 'pub',
    	subscriber: 'sub',
    	looper: 'loop',
    	pubsuber: 'pubsuber',
    	cmd_vel_set_sub: 'velSet',
    	cmd_vel: 'vel',
    	shell: 'shell',
    	sound_play: 'sound',
    	initial_pose: 'pose',
    	scan_marker: 'scanMarker',
    	shell_string: 'shellStr',
    	pallet: 'pallet'
    },

    ManualCtrlVel: {
    	linear: 0.4,
    	angular: 0.8 
    },
	
	init: (url) => {
		NAV.ros = new ROSLIB.Ros();
		NAV.ros.connect(url);
		NAV.ros.on('connection', () => {
			console.log(`[INFO]Connected to rosbridge ${url}.`);
			DATA.ros = NAV.ros;
		});
		NAV.ros.on('close', () => {
			console.log(`[INFO]Rosbridge server ${url} closed.`);
			ALERT.error({
				title: '网络错误',
				text: 'Rosbridge连接失败'
			});
		});
		NAV.ros.on('error', () => {
			console.error(`[ERROR]Connection error.`);
		});
	},

	withNs: (name) => {
		var name_ = name.startsWith('/') ? name : '/'+name;
		if (DATA.namespace === 'undefined')
		{
			return name_;
		}
		return DATA.namespace.startsWith('/') ? DATA.namespace+name_ : '/'+DATA.namespace+name_;
	},

	getRobotStatus: () => {
		var robotStatusClient = new ROSLIB.Service({
			ros: NAV.ros,
			name: NAV.withNs('/rosnodejs/robot_status'), 
			serviceType: 'rosapi/SearchParam'
		});
		var request = new ROSLIB.ServiceRequest({
			name: ''
		});	
		robotStatusClient.callService(request, (response) => {
			var status = JSON.parse(response.global_name);
			for (var s in status)
			{
				switch (s)
				{
					case 'ros_mode':
						DATA.rosMode = status[s];
						break;
					case 'network':
						DATA.lastNetworkSetting = status[s];
						break;
					default:
						break;
				}
			}
		});
	},

	dispMapAndWps: (map, useBase64) => {
		var mapTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs(map),
			messageType: 'nav_msgs/OccupancyGrid'
		});
		if (useBase64)
		{
			DATA.useBase64 = true;
			mapTopic = new ROSLIB.Topic({
				ros: NAV.ros,
				name: NAV.withNs('map_stream'),
				messageType: 'scheduling_msgs/MapStream'
			});
		}
		DATA.topic['mapTopic'] = mapTopic;
		mapTopic.subscribe((message) => {
			DATA.mapMsg = message;
			NAV.dispWaypoints();
		});
	},

	dispWaypoints: () => {
		var wpTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/waypoints'),
			messageType: 'yocs_msgs/WaypointList'
		});
		DATA.topic['waypointsTopic'] = wpTopic;
		wpTopic.subscribe((message) => {
			console.log(`[INFO]Got waypoints`);
			DATA.waypointsMsg = message;
		});
	},

	dispTrajectories: () => {
		var trajTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/trajectories'),
			messageType: 'yocs_msgs/TrajectoryList'
		});
		trajTopic.subscribe((message) => {
			console.log('[INFO]Got trajectories.');
			DATA.trajectoriesMsg = message;
		});
	},

	dispRobot: () => {
		var robotPoseTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/robot_pose'),
			messageType: 'geometry_msgs/Pose'
		});
		DATA.topic['robotPoseTopic'] = robotPoseTopic;
		robotPoseTopic.subscribe((message) => {
			DATA.robotPoseMsg = message;
		});
	},

	dispGlobalPlan: () => {
		var globalPlanTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/move_base/NavfnROS/plan'),
			messageType: 'nav_msgs/Path'
		});
		DATA.topic['globalPlanTopic'] = globalPlanTopic;
		globalPlanTopic.subscribe((message) => {
			DATA.globalPlanMsg = message;
		});
	},

	dispLocalPlan: () => {
		var localPlanTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/move_base/DWAPlannerROS/local_plan'),
			messageType: 'nav_msgs/Path'
		});
		DATA.topic['localPlanTopic'] = localPlanTopic;
		localPlanTopic.subscribe((message) => {
			DATA.localPlanMsg = message;
		});
	},

	dispFootprint: (costmap) => {
		var footprintTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs(costmap || '/move_base/global_costmap/footprint'),
			messageType: 'geometry_msgs/PolygonStamped'
		});
		DATA.topic['footprintTopic'] = footprintTopic;
		footprintTopic.subscribe((message) => {
			DATA.footprintMsg = message;
		});
	},

	dispLaserScan: () => {
		var laserScanTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/scan_rectified'),
			messageType: 'sensor_msgs/LaserScan',
			throttle_rate: 200
		});
		DATA.topic['laserScanTopic'] = laserScanTopic;
		laserScanTopic.subscribe((message) => {
			DATA.laserScanMsg = message;
		});
	},

	dispLocalCostmap: () => {
		var localCostmapTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/move_base/local_costmap/costmap'),
			messageType: 'nav_msgs/OccupancyGrid'
		});
		DATA.topic['localCostmapTopic'] = localCostmapTopic;
		localCostmapTopic.subscribe((message) => {
			localCostmapTopic.unsubscribe();
		});
	},

	listenTf: (useTf2) => {
		var useTf2 = (useTf2 === undefined) ? true : useTf2;
		if (useTf2)
		{
			var tfClient = new ROSLIB.TFClient({
				ros: NAV.ros,
				fixedFrame: 'map',
				angularThres: 0.01,
				transThres: 0.01
			});
			tfClient.subscribe('odom', (tf) => {
				DATA.tfMsg['map2odom'] = {
					header: {
						stamp: null
					},
					transform: tf
				};
			});
			tfClient.subscribe('base_footprint', (tf) => {
				DATA.tfMsg['map2base_footprint'] = {
					header: {
						stamp: null
					},
					transform: tf
				};
			});
			tfClient.subscribe('base_laser', (tf) => {
				DATA.tfMsg['map2base_laser'] = {
					header: {
						stamp: null
					},
					transform: tf
				};
			});
			var tfClient2 = new ROSLIB.TFClient({
				ros: NAV.ros,
				fixedFrame: 'base_link',
				angularThres: 0.01,
				transThres: 0.01
			});
			tfClient2.subscribe('base_laser', (tf) => {
				DATA.tfMsg['base_link2base_laser'] = {
					header: {
						stamp: null
					},
					transform: tf
				};
			});
		}
		else
		{
			var tfTopic = new ROSLIB.Topic({
				ros: NAV.ros,
				name: '/tf',
				messageType: 'tf2_msgs/TFMessage',
				// throttle_rate: 50
			});
			tfTopic.subscribe((message) => {
				for (var i = 0; i < message.transforms.length; i++)
				{
					var frame_id = message.transforms[i].header.frame_id;
					var child_frame_id = message.transforms[i].child_frame_id;
					if (frame_id.startsWith('/'))
					{
						frame_id = frame_id.split('/')[1];
					}
					if (child_frame_id.startsWith('/'))
					{
						child_frame_id = child_frame_id.split('/')[1];
					}
					var tfName = frame_id + '2' + child_frame_id; // eg: map2odom
					DATA.tfMsg[tfName] = message.transforms[i];
				}
			});
		}
	},

	sendInitialPose: (pose) => {
		var initialPoseTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/initialpose'),
			messageType: 'geometry_msgs/PoseWithCovarianceStamped'
		});
		var covariance = [];
		for (var i = 0; i < 36; i++)
		{
			covariance[i] = 0;
		}
		covariance[0] = 0.25;
		covariance[7] = 0.25;
		covariance[35] = Math.pow((Math.PI/12), 2);
		var msg = new ROSLIB.Message({
			header: {
				frame_id: 'map'
			},
			pose: {
				pose: pose,
				covariance: covariance
			}
		});
		initialPoseTopic.publish(msg);
		console.log('[INFO]setting initial pose');
	},

	subShellFeedback: () => {
		var shellFeedbackTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/shell_feedback'),
			messageType: 'std_msgs/String'
		});
		shellFeedbackTopic.subscribe((message) => {
			switch (message.data)
			{
				case '':
					break;
				default:
					var msgs = message.data.split(/[ :]/);
					var key = msgs[0].trim();
					switch (key)
					{
						case 'dbparam':
							DATA.mapList = msgs.slice(1);
							break;
						case 'update':
							if (DATA.loading.key === 'update')
							{
								DATA.loading = false;
							}
							if (msgs[1].trim() === 'success')
							{
								ALERT.info({
									title: '软件更新',
									text: '更新成功'
								});
							}
							else
							{
								ALERT.error({
									title: '软件更新',
									text: '更新失败'
								});
							}
							break;
						default:
							break;
					}				
					break;
			}
		});
	},

	subDiagnostics: () => {
		var diagnosticsTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/diagnostics_agg'),
			messageType: 'diagnostic_msgs/DiagnosticArray'
		});
		diagnosticsTopic.subscribe((message) => {
			for (var i = 0; i < message.status.length; i++)
			{
				if (message.status[i].name === '/Other/ros_mode')
				{
					//DATA.rosMode = message.status[i].message;
				}
			}
		});
	},

	subShellFeedbackFromNodejs: () => {
		var topic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/rosnodejs/shell_feedback'),
			messageType: 'std_msgs/String'
		});
		topic.subscribe((msg) => {
			// console.log(`shell feedback from nodejs: ${msg.data}`);
			var feedbackList = msg.data.split(':');
			if (feedbackList.length === 1)
			{
				var mode = feedbackList[0].trim();
				console.log(`ROS mode: ${mode}`);
				DATA.rosMode = mode;
			}
			else if (feedbackList.length === 2)
			{
				var feedbackPrefix = feedbackList[0].trim();
				var params = feedbackList[1].trim();
				switch (feedbackPrefix)
				{
					case 'dbparam':
						DATA.mapList = params.split(' ');
						break;
					case 'power':
						DATA.powerStatus = params.trim();
						break;
					case 'charge':
						DATA.chargeStatus = params.trim();
						break;
					case 'diagnostics':
						break;
					default:
						console.log(`unknown ${feedbackPrefix}`);
						break;
				}
			}
			else
			{

			}
		});
	},

	// replaced by subMappingStatus
	subRosMode: () => {
		var rosModeTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/ros_mode'),
			messageType: 'std_msgs/String'
		});
		rosModeTopic.subscribe((message) => {
			DATA.mappingStatus = message.data;
		});
	},

	subMappingStatus: () => {
		var mappingStatusTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/rosnodejs/mappingStatus'),
			messageType: 'std_msgs/String'
		});
		mappingStatusTopic.subscribe((message) => {
			/*
			DATA.mappingStatus = message.data;
			if (message.data === NAV.CmdEnum.SaveMap)
			{
				setTimeout(function(){
					NAV.saveMapEdit();
				}, 5000);
			}
			*/
		});
	},

	subNavCtrlStatus: () => {
		var navCtrlStatusTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/nav_ctrl_status'),
			messageType: 'yocs_msgs/NavigationControlStatus'
		});
		navCtrlStatusTopic.subscribe((message) => {
			DATA.navCtrlStatus = message;
		});
	},

	subWaypointUserSub: () => {
		var waypointUserSubTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/waypoint_user_sub'),
			messageType: 'std_msgs/String'
		});
		waypointUserSubTopic.subscribe((message) => {
			var index = message.data.indexOf(':');
			var statusType = message.data.substr(0, index).trim();
			var status = message.data.substring(index+1).trim();
			switch (statusType)
			{
				case 'read_status':
					DATA.plcStatus = status;
					break;
				default:
					break;
			}
		});
	},

	// subscribe robot status from rosnodejs
	subRobotStatus: () => {
		var robotStatusTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/rosnodejs/robot_status'),
			messageType: 'std_msgs/String'
		});
		robotStatusTopic.subscribe((message) => {
			var status = JSON.parse(message.data);
			for (var s in status)
			{
				switch (s)
				{
					case 'ros_mode':
						DATA.rosMode = status[s]; 
						break;
					case 'power':
						var powerStatus = parseFloat(status[s]);
						if (DATA.powerStatus !== powerStatus)
						{
							DATA.powerStatus = powerStatus;
						}
						break; 
					case 'charge':
						var chargeStatus = parseInt(status[s]);
						if (DATA.chargeStatus !== chargeStatus)
						{
							DATA.chargeStatus = chargeStatus;
						}
						break;
					case 'diagnostics':
						var statusList = JSON.parse(status[s]);
						DATA.diagnosticsMsg = statusList;
					default:
						break;
				}
			}
		});
	},

	cmdStringTopic: () => {
		return new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/cmd_string'),
			messageType: 'std_msgs/String'
		});
	},

	nodejsCmdStringTopic: () => {
		return new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/rosnodejs/cmd_string'),
			messageType: 'std_msgs/String'
		});
	},

	waypointUserPubTopic: () => {
		return new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/waypoint_user_pub'),
			messageType: 'std_msgs/String'
		});
	},

	pubCmdString: (cmd, nodejs) => {
		var topic = nodejs ? NAV.nodejsCmdStringTopic() : NAV.cmdStringTopic();
		var msg = new ROSLIB.Message({
            data: cmd
        });
        topic.publish(msg);
	},

	pubMapEditObstacle: (obstacle) => {
		var MapEditObstacleTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/rosnodejs/virtual_obstacle'),
			messageType: 'geometry_msgs/Polygon'
		});
		var msg = new ROSLIB.Message({
            points: obstacle
        });
		MapEditObstacleTopic.publish(msg);
	},

	// save map
	saveMap: () => {
		/****** shell ********
		console.log(`[INFO][${new Date().getTime()}]pub gmapping pose`);
		NAV.pubCmdString(NAV.CmdEnum.GamppingPose);
		console.log(`[INFO][${new Date().getTime()}]pub save map`);
		NAV.pubCmdString(NAV.CmdEnum.SaveMap);
		*/
		console.log(`[INFO][${new Date().getTime()}]pub save map`);
		NAV.pubCmdString(NAV.CmdEnum.SaveMap, true);
	},

	//save map_edit(default)
	saveMapEdit: () => {
		console.log(`[INFO][${new Date().getTime()}]pub load map`);
		NAV.pubCmdString(NAV.CmdEnum.LoadMap);
		setTimeout(function(){
			console.log(`[INFO][${new Date().getTime()}]pub save map edit`);
			NAV.pubCmdString(NAV.CmdEnum.SaveMapEdit);	
		}, 2000);
	},
	
	// add waypoint
	addWaypoint: (options) => {
		var frameIdJson = {
			close_enough: options.close_enough,
			goal_timeout: options.goal_timeout,
			failure_mode: options.failure_mode,
			type: options.type
		};
		if (options.frame_id)
		{
			frameIdJson.frame_id = options.frame_id;
		}
		if (PARAMS.NeedPoseTypes.indexOf(options.type) === -1)
		{
			options.pose = {
				position: {x: 0, y: 0, z: 0},
				orientation: {x: 0, y: 0, z:0, w: 0}
			};	
		}
		if (options.mark)
		{
			frameIdJson.mark = options.mark;
		}
		var frameIdStr = JSON.stringify(frameIdJson);
		var addWaypointTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/waypoint_add'),
			messageType: 'yocs_msgs/Waypoint'
		});
		var msg = new ROSLIB.Message({
			header: {
				frame_id: frameIdStr
			},
			close_enough: options.close_enough,
			goal_timeout: options.goal_timeout,
			failure_mode: options.failure_mode,
			name: options.name,
			pose: options.pose
		});
		addWaypointTopic.publish(msg);
		console.log('[INFO]waypoint added');
	},

	//delete waypoint
	delWaypoint: (name) => {
		var delWaypointTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/waypoint_remove'),
			messageType: 'yocs_msgs/Waypoint'
		});
		var waypoint = getWaypointByName(name);
		var msg = new ROSLIB.Message(waypoint);
		delWaypointTopic.publish(msg);
	},

	// add trajectory
	// params: 
	// 	1.name: name;
	// 	2.waypoints: array of selected waypoints' name
	addTrajectory: (name, waypointsName) => {
		var addTrajectoryTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/trajectory_add'),
			messageType: 'yocs_msgs/Trajectory'
		});
		var waypoints = [];
		for (var i = 0; i < waypointsName.length; i++)
		{
			var selectedWpName = waypointsName[i];
			waypoints.push(getWaypointByName(selectedWpName));
		}
		var msg = new ROSLIB.Message({
			name: name,
			waypoints: waypoints
		});
		addTrajectoryTopic.publish(msg);
	},

	// delete trajectory
	delTrajectory: (name) => {
		var delTrajTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/trajectory_remove'),
			messageType: 'yocs_msgs/Trajectory'
		});
		var traj = getTrajectoryByName(name);
		var msg = new ROSLIB.Message(traj);
		delTrajTopic.publish(msg);
	},

	addWaypointsForDock: () => {
		for (var key in NAV.WaypointsForDock)
		{
			if (key === 'scanMarker_scan')
			{
				for (var i = 9; i > 3; i--)
				{
					var msg = {};
					msg = $.extend(msg, NAV.WaypointsForDock[key]);
					msg.name += `_${i}`;
					msg.close_enough = i * 0.1;
					NAV.addWaypoint(msg);
				}
				continue;
			}
			NAV.addWaypoint(NAV.WaypointsForDock[key]);
		}
	},

	addTrajForDock: () => {
		var timer = setInterval(function(){
			if (DATA.waypointsMsg.waypoints.length !== 0)
			{
				var waypointEnd = DATA.waypointsMsg.waypoints[DATA.waypointsMsg.waypoints.length-1];
				if (waypointEnd.name === 'timer_sail')
				{
					NAV.addTrajectory(NAV.DockingBeginTrajName, NAV.DockingBegin);
					if (DATA.dockInitPoseName)
					{
						NAV.DockingEnd[0] = DATA.dockInitPoseName;
						NAV.addTrajectory(NAV.DockingEndTrajName, NAV.DockingEnd);
					}
					clearInterval(timer);
					timer = null;
					console.log('[INFO]trajectories for docking added');	
				}
			}
		}, 500);
	},

	navCtrl: (name, control, ...rest) => {
		var allowInterrupt = false;
		if (rest[0] === true)
		{
			allowInterrupt = true;
		}
		if (!allowInterrupt)
		{
			if (DATA.navCtrlStatus.status !== PARAMS.NavCtrlStatus.idling)
			{
				if (control === PARAMS.NavCtrl.start)
				{
					ALERT.warn({
						title: '导航中',
						text: '正在执行其他任务，当前命令将被忽略'
					});
					return;
				}
			}
		}
		var navCtrlTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/nav_ctrl'),
			messageType: 'yocs_msgs/NavigationControl'
		});
		var msg = new ROSLIB.Message({
            goal_name: name,
            control: control
		});
		console.log(`[INFO]pub ${name}, ${control}`);
		navCtrlTopic.publish(msg);
	},

	manipulateScene: (cmd, scene, nodejs) => {
		var data = cmd + ':' + scene
		if (nodejs)
			NAV.pubCmdString(data, true);
		else
			NAV.pubCmdString(data);		
	},

	// manual control
	manualCtrl: (vel) => {
		var linear = vel.linear || 0;
		var angular = vel.angular || 0;
		var cmdVelTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/cmd_vel'),
			messageType: 'geometry_msgs/Twist'
		});
		var msg = new ROSLIB.Message({
			linear: {
				x: linear,
				y: 0,
				z: 0
			},
			angular: {
				x: 0,
				y: 0,
				z: angular
			}
		});
		if (DATA.manualCtrlTimer)
		{
			clearInterval(DATA.manualCtrlTimer);
			DATA.manualCtrlTimer = null;
		}
		if (linear === 0 && angular === 0)
		{
			cmdVelTopic.publish(msg);
			return;
		}
		DATA.manualCtrlTimer = setInterval(function(){
			cmdVelTopic.publish(msg);
		}, 200);
	},

	subLastNetworkSetting: () => {
		var lastNetworkSettingTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/rosnodejs/last_network_setting'),
			messageType: 'std_msgs/String'
		});
		lastNetworkSettingTopic.subscribe((message) => {
			DATA.lastNetworkSetting = message;
		});
	},

	setNetwork: (mode, options) => {
		var netWorkTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/rosnodejs/network'),
			messageType: 'std_msgs/String'
		});
		options['mode'] = mode;
		var optionStr = JSON.stringify(options);
		var msg = new ROSLIB.Message({
			data: optionStr
		});
		netWorkTopic.publish(msg);
	},

	update: (mode, cmd) => {
		var topic = '';
		switch (mode)
		{
			case UpdateEvent.Type.onlineAuto:
				NAV.pubCmdString(cmd);
				return;
			case UpdateEvent.Type.offlineAuto:
				topic = '/shell_string';
				break;
			case UpdateEvent.Type.others.dbparam:
				topic = '/system_shell/shell_string';
				break;
			case UpdateEvent.Type.others.openssh:
				topic = '/shell_string';
				break;
			default:
				console.error(`[ERROR]unknown update mode: ${mode}`);
				return;
		}
		var updateTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs(topic),
			messageType: 'std_msgs/String'
		});
		var message = new ROSLIB.Message({
			data: cmd
		});
		updateTopic.publish(message);
	},

	moveBaseStatus: () =>{
		var robotStatusTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name: NAV.withNs('/move_base/status'),
			messageType: 'actionlib_msgs/GoalStatusArray'
		});
		robotStatusTopic.subscribe(function(msg){
			var state = msg.status_list[0]['status'];
			// console.log('MoveBaseStatus___',state);
			if(state == '4'){
				let hood_none_time = new Date().getSeconds();
				if (hood_none_time - hood_block_time < 1) {
					document.getElementById("hood").style.display="block";
				}
				hood_block_time = hood_none_time;
			}else{
				let hood_none_time = new Date().getSeconds();
				if (hood_none_time - hood_block_time > 30) {
					document.getElementById("hood").style.display="none";
				}
			}
		})
	},

	subPowerByWayPointUserSub : () =>{
		var waypointUserSubTopic = new ROSLIB.Topic({
			ros: NAV.ros,
			name:NAV.withNs('/waypoint_user_sub'),
			messageType: 'std_msgs/String'
		})
		waypointUserSubTopic.subscribe(function(msg){
			if(!msg.data){
				return;
			}
			var header = msg.data.split(':')[0].trim();
			var values = msg.data.split(':')[1].trim();
			switch (header)
			{
				case 'power':
				var battery_h_s = values.split(',')[0].trim();
				var battery_l_s = values.split(',')[1].trim();
				var battery = parseBattery(parseInt(battery_h_s), parseInt(battery_l_s));
					// if(battery < 20){
					// 	document.getElementById("text").text('AGV 电量低');
					// 	document.getElementById("hood").style.display="block";
					// }else{
					// 	document.getElementById("hood").style.display="none";
					// }
					break;
				case 'power_yihe':
				var battery_h_s = values.split(',')[0].trim();
				var battery_l_s = values.split(',')[1].trim();
				var battery = parseBattery(parseInt(battery_h_s), parseInt(battery_l_s));
					
					break;
				default:
					break;
			}
			function parseBattery(battery_h, battery_l)
			{
				var battery_h_ascii = String.fromCharCode(battery_h);
				var battery_l_ascii = String.fromCharCode(battery_l);
				return parseInt(battery_h_ascii, 16) * 16 + parseInt(battery_l_ascii, 16);
			}
		})
	}

};

// get waypoint object by name
// params:
//	1.name: full name of waypoint, including the prefix
// return: waypoint, undefined if not found
function getWaypointByName(name)
{
	for (var i = 0; i < DATA.waypointsMsg.waypoints.length; i++)
	{
		var waypoint = DATA.waypointsMsg.waypoints[i];
		if (waypoint.name === name)
		{
			return waypoint;
		}
	}
}

function getTrajectoryByName(name)
{
	var traj;
	for (var i = 0; i < DATA.trajectoriesMsg.trajectories.length; i++)
	{
		traj = DATA.trajectoriesMsg.trajectories[i];
		if (traj.name === name)
		{
			break;
		}
	}
	return traj;
}

function isNameUsed(name)
{
	if (DATA.waypointsMsg)
	{
		for (var i = 0; i < DATA.waypointsMsg.waypoints.length; i++)
		{
			if (DATA.waypointsMsg.waypoints[i].name === name)
			{
				return true;
			}
		}	
	}
	if (DATA.trajectoriesMsg)
	{
		for (var i = 0; i < DATA.trajectoriesMsg.trajectories.length; i++)
		{
			if (DATA.trajectoriesMsg.trajectories[i].name === name)
			{
				return true;
			}
		}
	}
	return false;
}