/*
GrayLoo @ 20180119
 */
'use strict';
const Promise = require('promise');
const shell = require('shelljs');
const gm = require('gm').subClass({imageMagick: true});
const rosnodejs = require('../rosnodejslib/index.js');

const pFs = require('../lib/fs_promise');
const pShell = require('../lib/shell_promise');
const sleep = require('../lib/utils').sleep;
const roslog = require('../lib/utils').roslog;

const ERROR_CODE = require('../lib/ros_err_code');

const PATH_BRINGUP = process.env.PATH_BRINGUP;
const PATH_DBPARAM = PATH_BRINGUP + '/param';
const PATH_SHELL = PATH_BRINGUP + '/shell';

const CMD_STRING = {
	MAPPING: 'gmapping',
	SAVE_MAP: 'save_map',
	SAVE_MAP_EDIT: 'save_map_edit',
	NAVIGATION: 'navigation',
	DBPARAM_INSERT: 'dbparam-insert',
	DBPARAM_DELETE: 'dbparam-delete',
	DBPARAM_SELECT: 'dbparam-select',
	DBPARAM_UPDATE: 'dbparam-update'
};

const LAUNCH_CMD = {
	MAPPING: 'roslaunch bringup bringup-gmapping.launch',
	SAVE_MAP: 'roslaunch bringup map_saver.launch',
	NAVIGATION: 'roslaunch bringup bringup-navigation.launch',
	DBPARAM: 'roslaunch bringup bringup-dbparam.launch'
}

const ROS_MODE = {
	MAPPING: 'gmapping',
	CONVERTING: 'converting',
	SAVE_MAP: 'save_map',
	SAVE_MAP_EDIT: 'save_map_edit',
	NAVIGATION: 'navigation',
	ERROR: 'error'
}

class CommonRosApi
{
	constructor(nh, namespace='', mapFormat='png', mappingMode='slam_gmapping')
	{
		if (process.env.BOOT_MODE === 'AUTO')
		{
			// TODO: rosnodejs backend for auto boot
			roslog.warn('TODO: rosnodejs backend for auto boot');
			return;
		}

		this.nh = nh;
		this.namespace = namespace;
		this.mapFormat = mapFormat.startsWith('.') ? mapFormat : `.${mapFormat}`;
		this.mappingMode = mappingMode;

		this.robotPose;
		// this.rosMode = ROS_MODE.NAVIGATION;
		this.rosMode = null;
		this.network = {};
		this.mapInfo;
		this.mapEditImg;
		// dbparam lock
		this.dbparamLock = false;
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
			latching: true,
			throttleMs: -1
		});
		this.cmdStringSub = this.nh.subscribe(this.withNs('/rosnodejs/cmd_string'), 'std_msgs/String', this.cmdStringSubCb());
		this.robotPoseSub = this.nh.subscribe(this.withNs('/robot_pose'), 'geometry_msgs/Pose', this.robotPoseSubCb());
		this.virtualObstacleSub = this.nh.subscribe(this.withNs('/rosnodejs/virtual_obstacle'), 'geometry_msgs/Polygon', this.virtualObstacleSubCb(), {
			queueSize: 1000
		});
		this.networkSub = this.nh.subscribe(this.withNs('/rosnodejs/network'), 'std_msgs/String', this.networkSubCb());
		// ros services
		this.mappingSrv = this.nh.advertiseService(this.withNs(`/rosnodejs/${CMD_STRING.MAPPING}`), 'std_srvs/Trigger', this.mappingSrvCb());
		this.saveMapSrv = this.nh.advertiseService(this.withNs(`/rosnodejs/${CMD_STRING.SAVE_MAP}`), 'std_srvs/Trigger', this.saveMapSrvCb());
		this.saveMapEditSrv = this.nh.advertiseService(this.withNs(`/rosnodejs/${CMD_STRING.SAVE_MAP_EDIT}`), 'std_srvs/Trigger', this.saveMapEditSrvCb());
		this.navigationSrv = this.nh.advertiseService(this.withNs(`/rosnodejs/${CMD_STRING.NAVIGATION}`), 'std_srvs/Trigger', this.navigationSrvCb());

		this.robotStatusSrv = this.nh.advertiseService(this.withNs('/rosnodejs/robot_status'), 'rosapi/SearchParam', (req, res) => {
			if (req.name)
			{}
			else
			{
				let status = {};
				status['ros_mode'] = this.rosMode;
				status['network'] = this.network;
				res.global_name = JSON.stringify(status);
				return true;
			}
		});
		// switch to navigation
		(async () => {
			let code = await this.navigation();
			this.reportFeedback(ERROR_CODE.navigation[code]);
		})();
	}

	cmdStringSubCb()
	{
		return async (msg) => {
			let cmd = msg.data;
			roslog.info(`Rosnodejs got cmd_string: ${cmd}`);
			let cmdList = cmd.split(':');
			let cmdPrefix = cmdList[0].trim();
			let params = cmdList.length === 2 ? cmdList[1] : '';
			let code;
			switch(cmdPrefix)
			{
				case CMD_STRING.MAPPING:
					code = await this.mapping();
					this.reportFeedback(ERROR_CODE.mapping[code]);
					break;
				case CMD_STRING.SAVE_MAP:
					code = await this.saveMap();
					this.reportFeedback(ERROR_CODE.saveMap[code]);
					break;
				case CMD_STRING.SAVE_MAP_EDIT:
					code = await this.saveMapEdit(true);
					this.reportFeedback(ERROR_CODE.navigation[code]);
					break;
				case CMD_STRING.NAVIGATION:
					code = await this.navigation();
					this.reportFeedback(ERROR_CODE.navigation[code]);
					break;
				case CMD_STRING.DBPARAM_INSERT:
					code = await this.addScene(params);
					if (!code)
					{
						let branches = await this.gitBranches();
						this.reportFeedback('dbparam:' + branches.join(' '));
					}
					else
					{
						this.reportFeedback('error:dbparam');
					}
					break;
				case CMD_STRING.DBPARAM_DELETE:
					code = await this.deleteScene(params);
					if (!code)
					{
						let branches = await this.gitBranches();
						this.reportFeedback('dbparam:' + branches.join(' '));
					}
					else
					{
						this.reportFeedback('error:dbparam');
					}
					break;
				case CMD_STRING.DBPARAM_SELECT:
					let branches = await this.gitBranches();
					this.reportFeedback('dbparam:' + branches.join(' '));
					break;
				case CMD_STRING.DBPARAM_UPDATE:
					code = await this.changeScene(params);
					if (!code)
					{
						let branches = await this.gitBranches();
						this.reportFeedback('dbparam:' + branches.join(' '));
					}
					else
					{
						this.reportFeedback('error:dbparam');
					}
					break;
				default:
					roslog.warn(`Unknown command: ${cmd}`);
					break;
			}
		};
	}

	mappingSrvCb()
	{
		return async (req, res) => {
			let code = await this.mapping();
			res.success = !code;
			res.message = ERROR_CODE.mapping[code];
			return true;
		};
	}

	saveMapSrvCb()
	{
		return async (req, res) => {
			let code = await this.saveMap();
			res.success = !code;
			res.message = ERROR_CODE.saveMap[code];
			return true;
		};
	}

	saveMapEditSrvCb()
	{
		return async (req, res) => {
			let code = await this.saveMapEdit();
			res.success = !code;
			res.message = ERROR_CODE.saveMapEdit[code];
			return true;
		};
	}

	navigationSrvCb()
	{
		return async (req, res) => {
			let code = await this.navigation();
			res.success = !code;
			res.message = ERROR_CODE.navigation[code];
			return true;
		};
	}

	async mapping()
	{
		if (this.rosMode == ROS_MODE.ERROR)
		{
			roslog.error('ROS in error mode');
			return 1;
		}
		if (this.rosMode == ROS_MODE.MAPPING)
		{
			roslog.error(`Already in mode: ${ROS_MODE.MAPPING}, doing nothing`);
			return 2;
		}
		if (this.rosMode == ROS_MODE.CONVERTING)
		{
			roslog.error('Busy, doing nothing');
			return 3;
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
			this.rosMode = ROS_MODE.ERROR;
			return 4;
		}
		// reset odom
		this.odomResetPub.publish(new this.std_msgs.Empty());
		// launch mapping node
		shell.exec(LAUNCH_CMD.MAPPING, {silent: false}, (code, stdout, stderr) => {
			if (code || stderr)
			{
				console.log(stderr);
			}
			else
			{
				console.log(stdout);
			}
		});
		let timeout = 5000;
		let interval = 500;
		while (timeout > 0)
		{
			let allNodes = {nodes:[]};
			try
			{
				allNodes = await this.rosNodes();
			}
			catch(e)
			{
				continue;
			}
			for (let node of allNodes.nodes)
			{
				// if (node.indexOf(ROS_MODE.MAPPING) !== -1)
				if (node.indexOf('mapping') !== -1)
				{
					this.rosMode = ROS_MODE.MAPPING;
					return 0;
				}
			}
			await sleep(interval);
			timeout -= interval;
		}
		roslog.error(`Failed to switch to mapping.`);
		this.rosMode = ROS_MODE.ERROR;
		return 6;
	}

	async saveMap()
	{
		if (this.rosMode === ROS_MODE.ERROR)
		{
			roslog.error('ROS in error mode');
			return 1;
		}
		if (this.rosMode !== ROS_MODE.MAPPING)
		{
			roslog.error(`Can not save map in ros mode: ${this.rosMode}, doing nothing`);
			return 2;
		}
		if (!this.robotPose)
		{
			roslog.error(`Can not get robot pose`);
			return 3;
		}
		roslog.info('Saving map.');
		try
		{
			await pShell.exec(LAUNCH_CMD.SAVE_MAP);
		}
		catch(err)
		{
			roslog.error('Map_saver failed to save map.');
			return 4;
		}
		// save map_edit
		await sleep(1000);
		let err = await this.saveMapEditByCp();
		if (err)
		{
			roslog.error('Failed to save map_edit by copy');
			return 5;
		}
		this.rosMode = ROS_MODE.SAVE_MAP;
		roslog.info('Saved map and map_edit(default)');
		return 0;
	}

	async saveMapEdit(switchToNavi=false)
	{
		if (!this.mapEditImg)
		{
			roslog.info('no virtual obstacle received, will use the default map_edit');
			if (switchToNavi)
			{
				let code = await this.navigation();	
				return code;
			}
			else
			{
				return 0;
			}
			
		}
		let mapEditFile = PATH_DBPARAM + '/map_edit' + this.mapFormat;
		let dump = new Promise((resolve, reject) => {
			this.mapEditImg.write(mapEditFile, (err) => {
				if (err)
				{
					reject(err);
				}
				else
				{
					resolve();
				}
			});
		});
		try
		{
			await dump;
		}
		catch (err)
		{
			console.log(err)
			roslog.error('Failed to save map_edit');
			return 1;
		}
		this.mapEditImg = null;
		roslog.info('saved map_edit');
		await sleep(1000);
		if (switchToNavi)
		{
			let code = await this.navigation();	
			return code;
		}
	}

	async navigation()
	{
		if (this.rosMode === ROS_MODE.CONVERTING)
		{
			roslog.warn('Busy, doing nothing');
			return 1;
		}
		this.rosMode = ROS_MODE.CONVERTING;
		roslog.info(`Switching to ${ROS_MODE.NAVIGATION}`);
		// kill nodes
		let aliveNodes = await this.brutalKillNodes([this.mappingMode, 'move_base', 'map_edit_server']);
		if (aliveNodes.length !== 0)
		{
			let err = 'FATAL:nodes ';
			for (let node of aliveNodes)
			{
				err += `${node} `;
			}
			err += 'still alive after 3 attempts';
			roslog.error(err);
			this.rosMode = ROS_MODE.ERROR;
			return 2;
		}
		roslog.info(`alive nodes: ${aliveNodes.length}`);
		// launch navigation nodes
		shell.exec(LAUNCH_CMD.NAVIGATION, {silent: false}, (code, stdout, stderr) => {
			if (code || stderr)
			{
				console.log(stderr);
			}
			else
			{
				console.log(stdout);
			}
		});

		let timeout = 5000;
		let interval = 500;
		while (timeout > 0)
		{
			let allNodes = {nodes:[]};
			try
			{
				allNodes = await this.rosNodes();
			}
			catch(e)
			{
				console.log('==== move base ====');
				continue;
			}
			for (let node of allNodes.nodes)
			{
				if (node.indexOf('move_base') !== -1)
				{
					this.setInitialPose(this.robotPose);
					roslog.info(`switched to mode: ${ROS_MODE.NAVIGATION}`);
					this.rosMode = ROS_MODE.NAVIGATION;
					return 0;
				}
			}
			await sleep(interval);
			timeout -= interval;
		}
		roslog.error(`Failed to switch to ${ROS_MODE.NAVIGATION}.`);
		this.rosMode = ROS_MODE.ERROR;
		return 3;
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
				let mapEditFile = PATH_DBPARAM + '/map_edit' + this.mapFormat;
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
			if (obstaclesPx.points.length === 1 && obstaclesPx.points[0].z > 0)
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
				start = obstaclesPx.points[3];
				end = obstaclesPx.points[0];
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

	networkSubCb()
	{
		return async (msg) => {
			roslog.info(`network setting: ${msg.data}`);
			let settings = JSON.parse(msg.data);
			let mode = settings.mode;
			let cmd = [`cd ${PATH_SHELL};./comm.sh`];
			this.network = {};
			if (mode === 'wifi')
			{
				cmd.push('-m wifi');
				if (settings.ssid)
				{
					cmd.push(`-s ${settings.ssid}`);
					this.network['ssid'] = settings.ssid;
				}
				if (settings.password)
				{
					cmd.push(`-p ${settings.password}`);
					this.network['password'] = settings.password;
				}
				if (settings.ip)
				{
					cmd.push(`-i ${settings.ip}`);
					this.network['ip'] = settings.ip;
				}
			}
			if (settings.remember === 'true')
			{
				cmd.push('-a');
			}
			let cmdStr = cmd.join(' ');
			shell.exec(cmdStr, {silent: false}, (code, stdout, stderr) => {
				if (code || stderr)
				{
					roslog.error(`error code: ${code}`);
					roslog.error(`${stderr}`);
				}
			});
		};
	}

	async saveMapEditByCp()
	{
		shell.cd(PATH_DBPARAM);
		shell.cp(`map${this.mapFormat}`, `map_edit${this.mapFormat}`);
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
		let mapEditYaml = mapYaml.replace(`map${this.mapFormat}`, `map_edit${this.mapFormat}`);
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

	async addScene(sceneName)
	{
		if (this.dbparamLock)
		{
			roslog.error('dbparam busy, ignore add');
			return 1;
		}
		this.dbparamLock = true;
		let branches = await this.gitBranches();
		if (branches.indexOf(sceneName) !== -1)
		{
			roslog.error(`${sceneName} already exists`);
			this.dbparamLock = false;
			return 2;
		}
		try
		{
			await pShell.exec(`git branch ${sceneName}`);
			await pShell.exec('git add .');
			await pShell.exec(`git commit -m "insert ${sceneName}"`);
			await pShell.exec(`git checkout ${sceneName}`);
		}
		catch (e)
		{
			roslog.error('insert error');
			this.dbparamLock = false;
			return 3;
		}
		// set initial pose
		this.setInitialPose();
		// cannot use await shell.exec(), 
		// since ros nodes started by bringup-dbparam.launch will block the process
		shell.exec(LAUNCH_CMD.DBPARAM, {silent: false, async: true});
		// wait until launch finished
		await sleep(5000);
		this.dbparamLock = false;
		return 0;
	}

	async changeScene(sceneName)
	{
		if (this.dbparamLock)
		{
			roslog.error('dbparam busy, ignore change');
			return 1;
		}
		this.dbparamLock = true;
		let branches = await this.gitBranches();
		if (branches.indexOf(sceneName) === -1)
		{
			roslog.error(`${sceneName} not exist`);
			this.dbparamLock = false;
			return 2;
		}
		else if (branches[0] === sceneName)
		{
			roslog.warn(`already on branch ${sceneName}`);
			this.dbparamLock = false;
			return 3;
		}
		try
		{
			await pShell.exec('git add .');
			await pShell.exec(`git commit -m "update ${sceneName}"`);
			await pShell.exec(`git checkout ${sceneName}`);
		}
		catch (e)
		{
			roslog.error('git checkout error');
			this.dbparamLock = false;
			return 4;
		}
		shell.exec(LAUNCH_CMD.DBPARAM, {silent: false, async: true});
		await sleep(5000);
		this.setInitialPose();
		this.dbparamLock = false;
		return 0;
	}

	async deleteScene(sceneName)
	{
		if (this.dbparamLock)
		{
			roslog.error('dbparam busy, ignore delete');
			return 1;
		}
		this.dbparamLock = true;
		let branches = await this.gitBranches();
		if (sceneName === 'master')
		{
			roslog.warn('cannot delete branch master');
			this.dbparamLock = false;
			return 2;
		}
		if (sceneName === branches[0])
		{
			roslog.error(`cannot delete branch ${sceneName}, which you are currently on`);
			this.dbparamLock = false;
			return 3;
		}
		try
		{
			await pShell.exec('git add .');
			await pShell.exec(`git commit -m "delete ${sceneName}"`);
			await pShell.exec(`git branch -D ${sceneName}`);
		}
		catch(e)
		{
			roslog.error('git delete error');
			this.dbparamLock = false;
			return 4;
		}
		this.dbparamLock = false;
		return 0;
	}

	async gitBranches()
	{
		try
		{
			shell.cd(PATH_DBPARAM);
			let branchesStr = await pShell.exec('git branch');
			let branches = branchesStr.trim().split('\n');
			let currentBranch = {
				index: null,
				name: null
			};
			for (let i = 0; i < branches.length; i++)
			{
				let branch = branches[i].trim();
				if (branches[i].startsWith('*'))
				{
					currentBranch.name = branches[i].slice(1).trim();
					currentBranch.index = i;
					branch = currentBranch.name;
				}
				branches[i] = branch;
			}
			branches.splice(currentBranch.index, 1);
			branches.unshift(currentBranch.name);
			return branches;
		}
		catch (e)
		{
			let errInfo = e.stderr ? e.stderr : e;
			roslog.error(errInfo);
			return [];
		}
	}

	setInitialPose(pose)
	{
		let initPose = new this.geometry_msgs.PoseWithCovarianceStamped();
		initPose.header.frame_id = 'map';
		if (pose)
		{
			initPose.pose.pose = pose
		}
		else
		{
			initPose.pose.pose.orientation.w = 1.0;
		}
		let covariance = [];
		for (let i = 0; i < 36; i++)
		{
			covariance.push(0);
		}
		initPose.pose.covariance = covariance;
		initPose.pose.covariance[0] = 0.25;
	    initPose.pose.covariance[7] = 0.25;
	    initPose.pose.covariance[35] = Math.PI * Math.PI / (12*12);
		this.initialPosePub.publish(initPose);
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
				let ret = await pShell.exec(cmd, {silent: false});
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
			let allNodes = {nodes:[]};
			try
			{
				await this.killNodes(nodes);
			}	
			catch(e)
			{
				console.log('++++ kill nodes ++++');
			}
			await sleep(500);
			try
			{
				allNodes = await this.rosNodes();
			}
			catch(e)
			{
				console.log('==== rosnodes ====');
				continue;
			}
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
			attempts++;
		}
		return aliveNodes;
	}

	reportFeedback(info, mute)
	{
		if (!info)
			return;
		let msg = new this.std_msgs.String();
		msg.data = info;
		this.shellFeedbackPub.publish(msg);
		if (!mute)
			roslog.info(`shell feedback: ${msg.data}`);
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
			obstaclesPixel.points.push(point);
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
		return CommonRosApi.withNs(name, this.namespace);
	}

	static withNs(name, namespace)
	{
		let ns = (namespace === 'undefined' || namespace === '/') ? '' : namespace;
		let shortName = name.startsWith('/') ? name : `/${name}`;
		let fullName = ns + shortName;
		return fullName.startsWith('/') ? fullName : '/'+fullName;
	}
}

module.exports = CommonRosApi;
