'use strict';

const Promise = require('promise');
const shell = require('shelljs');
const gm = require('gm').subClass({imageMagick: true});
const rosnodejs = require('../rosnodejslib/index.js');

const pFs = require('../lib/fs_promise');
const pShell = require('../lib/shell_promise');
const sleep = require('../lib/utils').sleep;
const roslog = require('../lib/utils').roslog;

const PATH_BRINGUP = process.env.PATH_BRINGUP;
const PATH_DBPARAM = PATH_BRINGUP + '/param';

const CMD_STRING = {
	MAPPING: 'gmapping',
	SAVE_MAP: 'save_map',
	SAVE_MAP_EDIT: 'save_map_edit',
	NAVIGATION: 'navigation',
};

const LAUNCH_CMD = {
	MAPPING: 'roslaunch bringup bringup-gmapping.launch',
	SAVE_MAP: 'roslaunch bringup map_saver.launch',
	NAVIGATION: 'roslaunch bringup bringup-navigation.launch'
}

const ROS_MODE = {
	MAPPING: 'mapping',
	CONVERTING: 'converting',
	SAVE_MAP: 'save_map',
	SAVE_MAP_EDIT: 'save_map_edit',
	NAVIGATION: 'navigation',
	ERROR: 'error'
}

class CommonRosApi
{
	constructor(nh, namespace='')
	{
		this.nh = nh;
		this.namespace = namespace;
		this.robotPose;
		this.rosMode = ROS_MODE.MAPPING;
		this.network = {};
		this.mapInfo;
		this.mapEditImg;
		// ros msg/srv
		this.std_msgs = rosnodejs.require('std_msgs').msg;
		this.geometry_msgs = rosnodejs.require('geometry_msgs').msg;
		this.rosapi_srvs = rosnodejs.require('rosapi').srv;
		// ros publisher/subscriber
		this.odomResetPub = this.nh.advertise(this.withNs('/odom_reset'), 'std_msgs/Empty', {
			latching: true
		});
		this.initialPosePub = this.nh.advertise(this.withNs('/initialpose'), 'geometry_msgs/PoseWithCovarianceStamped', {
			latching: true
		});
		this.shellFeedbackPub = nh.advertise(this.withNs('/rosnodejs/shell_feedback'), 'std_msgs/String', {
			latching: false,
			throttleMs: -1
		});
		this.cmdStringSub = this.nh.subscribe(this.withNs('/rosnodejs/cmd_string'), 'std_msgs/String', this.cmdStringSubCb());
		this.robotPoseSub = this.nh.subscribe(this.withNs('/robot_pose'), 'geometry_msgs/Pose', this.robotPoseSubCb());
		this.virtualObstacleSub = this.nh.subscribe(this.withNs('/virtual_obstacle'), 'geometry_msgs/Polygon', this.virtualObstacleSubCb());
		// ros srv server
		this.robotStatusSrv = this.nh.advertiseService(this.withNs('/rosnodejs/robot_status'), 'rosapi/SearchParam', (req, res) => {
			if (req.name)
			{}
			else
			{
				let status = {};
				status['ros_mode'] = this.rosMode;
				// status['network'] = this.network;
				res.global_name = JSON.stringify(status);
				return true;
			}
		});
	}

	cmdStringSubCb()
	{
		return (msg) => {
			let cmd = msg.data;
			roslog.info(`Rosnodejs got cmd_string: ${cmd}`);
			switch(cmd)
			{
				case CMD_STRING.MAPPING:
					this.mapping();
					break;
				case CMD_STRING.SAVE_MAP:
					this.saveMap();
					break;
				case CMD_STRING.SAVE_MAP_EDIT:
					this.saveMapEdit();
					break;
				case CMD_STRING.NAVIGATION:
					this.navigation();
					break;
				default:
					break;
			}
		};
	}

	async mapping()
	{
		if (this.rosMode == ROS_MODE.MAPPING)
		{
			roslog.warn(`Already in mode: ${ROS_MODE.MAPPING}, doing nothing`);
			return;
		}
		if (this.rosMode == ROS_MODE.CONVERTING)
		{
			roslog.warn('Busy, doing nothing');
			return;
		}
		if (this.rosMode == ROS_MODE.ERROR)
		{
			roslog.warn('ROS in error mode, will try to switch to mapping');
		}
		this.rosMode = ROS_MODE.CONVERTING;
		roslog.info(`Switching to mode: ${ROS_MODE.MAPPING}`);
		// kill nodes
		let aliveNodes = await this.brutalKillNodes(['amcl', 'map_server', 'move_base', 'map_edit_server']);	
		if (aliveNodes.length !== 0)
		{
			let err = 'FATAL:nodes ';
			for (let node of aliveNodes)
			{
				err += `${node} `;
			}
			err += 'still alive after 3 attempts';
			roslog.error(err);
			// report
			this.rosMode = ROS_MODE.ERROR;
			this.reportFeedback(err);
			return;
		}
		// reset odom
		this.odomResetPub.publish(new this.std_msgs.Empty());
		// launch mapping node
		shell.exec(LAUNCH_CMD.MAPPING, (code, stdout, stderr) => {
			if (code || stderr)
			{
				console.log(stderr);
				this.rosMode = ROS_MODE.ERROR;
				this.reportFeedback(this.rosMode);
			}
		});
		let timeout = 5000;
		let interval = 500;
		while (timeout > 0)
		{
			let allNodes = await this.rosNodes();
			for (let node of allNodes.nodes)
			{
				if (node.indexOf(LAUNCH_CMD.MAPPING) !== -1)
				{
					this.rosMode = ROS_MODE.MAPPING;
					this.reportFeedback(this.rosMode);
					return;
				}
			}
		}
		roslog.error(`Failed to switch to mapping.`);
		this.rosMode = ROS_MODE.ERROR;
		this.reportFeedback(this.rosMode);
	}

	async saveMap()
	{
		if (this.rosMode !== ROS_MODE.MAPPING)
		{
			roslog.warn(`Can not save map in ros mode: ${this.rosMode}, doing nothing`);
			return
		}
		if (!this.robotPose)
		{
			roslog.error(`Can not get robot pose`);
			this.reportFeedback();
			//return;
		}
		roslog.info('Saving map.');
		// TODO: check if there exists more then one node publishing /map topic
		try
		{
			await pShell.exec(LAUNCH_CMD.SAVE_MAP);
		}
		catch(err)
		{
			roslog.error('Failed to save map');
			this.reportFeedback();
			return;
		}
		// save map_edit
		await sleep(1000);
		let err = await this.saveMapEditByCp();
		if (err)
		{
			roslog.error('Failed to save map_edit(default)');
			this.reportFeedback();
			return;
		}
		this.rosMode = ROS_MODE.SAVE_MAP;
		roslog.info('Saved map and map_edit(default)');
		this.reportFeedback(this.rosMode);
	}

	async saveMapEdit()
	{
		if (!this.mapEditImg)
		{
			roslog.warn('Can not save map_edit, since the original map_edit image not loaded');
			return;
		}
		let mapEditFile = PATH_DBPARAM + 'map_edit.png';
		let dump = new Promise((resolve, reject) => {
			this.mapEditImg.write(mapEditFile, (err) => {
				if (err)
					reject(err);
				else
					resolve();
			});
		});
		try
		{
			await dump;
		}
		catch (err)
		{
			roslog.error('Failed to save map_edit.png');
			this.reportFeedback();
			return;
		}
		// switch to navigation
		this.navigation();
	}

	async navigation()
	{
		if (this.rosMode === ROS_MODE.CONVERTING)
		{
			roslog.warn('Busy, doing nothing');
			return;
		}
		this.rosMode = ROS_MODE.CONVERTING;
		roslog.info(`Switching to ${ROS_MODE.NAVIGATION}`);
		// kill nodes
		let aliveNodes = await this.brutalKillNodes(['slam_gmapping', 'move_base', 'map_edit_server']);
		if (aliveNodes.length !== 0)
		{
			let err = 'FATAL:nodes ';
			for (let node of aliveNodes)
			{
				err += `${node} `;
			}
			err += 'still alive after 3 attempts';
			roslog.error(err);
			// report
			this.rosMode = ROS_MODE.ERROR;
			this.reportFeedback(err);
			return;
		}
		// launch navigation nodes
		shell.exec(LAUNCH_CMD.NAVIGATION, (code, stdout, stderr) => {
			if (code || stderr)
			{
				console.log(stderr);
				this.rosMode = ROS_MODE.ERROR;
				this.reportFeedback(this.rosMode);
			}
		});
		let timeout = 5000;
		let interval = 500;
		while (timeout > 0)
		{
			let allNodes = await this.rosNodes();
			for (let node of allNodes.nodes)
			{
				if (node.indexOf(LAUNCH_CMD.NAVIGATION) !== -1)
				{
					// set initial pose
					let initPose = new this.geometry_msgs.PoseWithCovarianceStamped();
					initPose.header.frame_id = 'map';
					initPose.pose = this.robotPose;
					initPose.pose.covariance[0] = 0.25;
				    initPose.pose.covariance[7] = 0.25;
				    initPose.pose.covariance[35] = 0.25;
				    this.initialPosePub.publish(initPose);

					this.rosMode = ROS_MODE.NAVIGATION;
					this.reportFeedback(this.rosMode);
					return;
				}
			}
		}
		roslog.error(`Failed to switch to ${LAUNCH_CMD.NAVIGATION}.`);
		this.rosMode = ROS_MODE.ERROR;
		this.reportFeedback(this.rosMode);
	}

	virtualObstacleSubCb()
	{
		return async (obstacles) => {
			if (!this.mapInfo)
			{
				try
				{
					this.mapInfo = await this.getMapInfo();
				}
				catch (err)
				{
					roslog.error('Can not get map information');
					this.reportFeedback();
					return;
				}
			}
			if (!this.mapEditImg)
			{
				// load map_edit.png
				let mapEditFile = PATH_DBPARAM + '/map_edit.png';
				this.mapEditImg = gm(mapEditFile).fill('none');
			}
			let obstaclesPx = this.world2pixel(obstacles, this.mapInfo);
			if (obstaclesPx.length === 0)
			{
				roslog.warn('Empty virtual obstacles, doing nothing');
				return;
			}
			if (obstaclesPx.points[0].z < 0)
			{
				this.mapEditImg.stroke('#fff', 5);
			}
			else
			{
				this.mapEditImg.stroke('#000', 2);	
			}
			// circle
			if (obstaclesPx.points.length === 1 && obstaclesPixel.points[0].z > 0)
			{
				let radius = obstaclesPx.points[0].z;
				let center = obstaclesPx.points[0];
				this.mapEditImg.drawCircle(center.x, center.y, center.x+radius, center.y);
			}
			else if (obstaclesPx.points.length === 4)
			{
				for (let i = 0; i < obstaclesPx.points.length-1; i++)
				{
					let start = obstaclesPx.points[i];
					let end = obstaclesPx.points[i+1];
					this.mapEditImg.drawLine(start.x, start.y, end.x, end.y);
				}
				start = end;
				end = msgMap.points[0];
				this.mapEditImg.drawLine(start.x, start.y, end.x, end.y);
			}
			else
			{
				for (let i = 0; i < obstaclesPx.points.length-1; i++)
				{
					var start = obstaclesPx.points[i];
					var end = obstaclesPx.points[i+1];
					this.mapEditImg.drawLine(start.x, start.y, end.x, end.y);
				}
			}
		};
	}

	async saveMapEditByCp()
	{
		shell.cd(PATH_DBPARAM);
		shell.cp('map.png', 'map_edit.png');
		shell.cp('map.yaml', 'map_edit.yaml');
		let mapYaml;
		try
		{
			mapYaml = await pFs.readFile('map.yaml');
		}
		catch (err)
		{
			console.log(err);
			return 1;
		}
		let mapEditYaml = mapYaml.replace(/map.png/, 'map_edit.png');
		try
		{
			await pFs.writeFile('map_edit.yaml', mapEditYaml);
		}
		catch (err)
		{
			console.log(err)
			return 1;
		}
		return 0;
	}

	getMapInfo()
	{
		return new Promise((resolve, reject) => {
			this.nh.subscribe(this.withNs('/map'), 'nav_msgs/OccupancyGrid', (map) => {
				this.nh.unsubscribe(this.withNs('/map'));
				resolve(map.info);
			});
		});
	}

	async killNodes(nodes)
	{
		for (let node of nodes)
		{
			roslog.info(`killing node [${node}]`);
			let cmd = 'rosnode kill ' + this.withNs(node);
			try
			{
				let ret = await pShell.exec(cmd, {silent: true});
			}
			catch (err)
			{
				console.log(err);
			}
		}
	}

	async brutalKillNodes(nodes, maxAttempts=3)
	{
		let attempts = 0;
		let aliveNodes = [];
		while (attempts < maxAttempts)
		{
			aliveNodes = [];
			await this.killNodes(nodes);
			await sleep(500);
			let allNodes = await this.rosNodes();
			for (let node of allNodes.nodes)
			{
				if (nodes.indexOf(node) !== -1)
				{
					aliveNodes.push(node);
				}
			}
			if (aliveNodes.length === 0)
			{
				break;
			}
		}
		return aliveNodes;
	}

	reportFeedback(info)
	{
		if (!info)
			return;
		let msg = new this.std_msgs.String();
		msg.data = info;
		this.shellFeedbackPub.publish(msg);
	}

	world2pixel(obstacles, mapInfo)
	{
		let obstaclesPixel = {
			points: []
		};
		for (let obstacle of obstacles.points)
		{
			let point = {
				x: (obstacle.x - mapInfo.origin.position.x) / mapInfo.resolution,
				y: mapInfo.height - (obstacle.y - mapInfo.origin.position.y) / mapInfo.resolution,
				z: obstacle.z / mapInfo.resolution
			};
			obstaclesPixel.push(point);
		}
		return obstaclesPixel;
	}

	rosNodes()
	{
		let nodesSrvCli = this.nh.serviceClient('/rosapi/nodes', this.rosapi_srvs.Nodes);
		let nodesReq = new this.rosapi_srvs.Nodes.Request();
		return nodesSrvCli.call(nodesReq);
	}

	robotPoseSubCb()
	{
		return (pose) => {
			this.robotPose = pose;
		}
	}

	withNs(name)
	{
		let shortName = name.startsWith('/') ? name : `/${name}`;
		return this.namespace ? `/${this.namespace}${shortName}` : shortName;
	}
}