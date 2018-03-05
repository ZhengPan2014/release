'use strict';
const shell = require('shelljs');
const gm = require('gm').subClass({imageMagick: true});
const rosnodejs = require('../../rosnodejslib/index.js');
const roslog = require('../../lib/roslog').roslog;
const sleep  = require('../../lib/roslog').sleep;
const asyncShell = require('../../lib/async_shell').shell;
const readFile = require('../../lib/async_shell').readFile;
const writeFile = require('../../lib/async_shell').writeFile;

const CLEAR_SIZE = 5;
const OBSTACLE_SIZE = 2;
const PATH_BRINGUP = process.env.PATH_BRINGUP;
const MAP_EDIT = PATH_BRINGUP + '/param/map_edit.pgm';
const PATH_DBPARAM = PATH_BRINGUP + '/param';

// ros mode
const ROSMODE = {
	MAPPING: 'mapping',
	CONVERTING: 'converting',
	NAVIGATION: 'navigation',
	ERROR: 'error'
};

class BaseRosNodeJs
{
	/**
	 * [description]
	 * @param  {String} nameSpace   ros namespace
	 * @param  {Object} cfg         .cfg in dbparam
	 * @param  {String} mappingMode 
	 */
	constructor(nameSpace='', cfg={}, mappingMode='gmapping')
	{
		this.nameSpace = nameSpace;
		// .cfg in dbparam
		this.cfg = cfg;
		this.mappingMode = mappingMode;
		
		this.nh = null;
		this.mappingSrv = null;
		this.robotPose = null;
		this.rosMode = ROSMODE.NAVIGATION;
		this.dbparamLock = false;	
		(async () => {
			this.nh = await rosnodejs.initNode('base_rosnodejs', {
				onTheFly: true
			});
			// set param cfg 
			this.nh.setParam('cfg', JSON.stringify(this.cfg));
			// ros msgs
			this.std_msgs = rosnodejs.require('std_msgs').msg;
			this.geometry_msgs = rosnodejs.require('geometry_msgs').msg;
			// ros srvs
			this.rosapi_srvs = rosnodejs.require('rosapi').srv;
			this.yocs_srvs = rosnodejs.require('yocs_msgs').srv;
			// services
			this.mappingSrv = this.nh.advertiseService(this.nameWithNs('/rosnodejs/mapping'), 'std_srvs/Trigger', this.mappingSrvCb());
			this.saveMapSrv = this.nh.advertiseService(this.nameWithNs('/rosnodejs/save_map'), 'std_srvs/Trigger', this.saveMapSrvCb());
			this.saveMapEditSrv = this.nh.advertiseService(this.nameWithNs('/rosnodejs/save_map_edit'), 'yocs_msgs/VirtualObstacles', this.saveMapEditSrvCb());
			this.navigationSrv = this.nh.advertiseService(this.nameWithNs('/rosnodejs/navigation'), 'std_srvs/Trigger', this.navigationSrvCb());
			this.dbparamCtrlSrv = this.nh.advertiseService(this.nameWithNs('/rosnodejs/dbparam_ctrl'), 'yocs_msgs/DbparamControl', this.dbparamCtrlSrvCb());
			this.rosModeSrv = this.nh.advertiseService(this.nameWithNs('/rosnodejs/ros_mode'), 'std_srvs/Trigger', this.rosModeSrvCb());
			this.setNetWorkSrv = this.nh.advertiseService(this.nameWithNs('rosnodejs/set_network'), 'rosapi/HasParam', this.setNetWorkSrvCb());
			// debug
			this.debugSrv = this.nh.advertiseService(this.nameWithNs('/rosnodejs/debug'), 'std_srvs/Trigger', this.debugSrvCb);
			// publishers
			this.odomResetPub = this.nh.advertise(this.nameWithNs('/odom_reset'), 'std_msgs/Empty', {
				latching: true
			});
			this.initialPosePub = this.nh.advertise(this.nameWithNs('/initialpose'), 'geometry_msgs/PoseWithCovarianceStamped', {
				latching: true
			});
			// subscribers
			this.robotPoseSub = this.nh.subscribe(this.nameWithNs('/robot_pose'), 'geometry_msgs/Pose', this.robotPoseSubCb());
		})();
	}

// private:
	mappingSrvCb()
	{
		return async (req, res) => {
			if (this.rosMode === ROSMODE.MAPPING)
			{
				res.success = false;
				res.message = `already in mapping mode, will ignore mapping cmd`;
				roslog.warn(res.message);
				return true;
			}
			else if (this.rosMode === ROSMODE.CONVERTING)
			{
				res.success = false;
				res.message = 'ros converting, will ignore mapping cmd';
				roslog.warn(res.message);
				return true;
			}
			else if (this.rosMode === ROSMODE.ERROR)
			{
				res.success = false;
				res.message = `ros error, will ignore mapping cmd`;
				roslog.error(res.message);
				return true;
			}
			roslog.info('Switching to mapping mode.');
			this.rosMode = ROSMODE.CONVERTING;
			this.killNodes(['/amcl', '/map_server', '/move_base', '/map_edit_server']);
			// reset odom
			this.odomResetPub.publish(new this.std_msgs.Empty());
			let mappingCmd = `roslaunch bringup bringup-${this.mappingMode}.launch`;
			
			// debug
			mappingCmd = `roslaunch bringup debug-gmapping.launch`;
			// end debug
			
			// start mapping node
			try
			{
				console.log(mappingCmd)
				// let ret = await asyncShell(mappingCmd);
				shell.exec(mappingCmd, (code, stdout, stderr) => {
					if (code || stderr)
					{
						roslog.error(stderr);
					}
				});
			}
			catch(e)
			{
				this.rosMode = ROSMODE.ERROR;
				res.success = false;
				res.message = `mapping ${e.code}: ${e.stderr}`;
				roslog.error(res.message);
				console.log(res.message);
				return true;
			}
			// check if mapping node started
			let nodesSrvCli = this.nh.serviceClient('/rosapi/nodes', this.rosapi_srvs.Nodes);
			let nodesReq = new this.rosapi_srvs.Nodes.Request();
			let timeout = 5000;
			let interval = 500;
			while (timeout > 0)
			{
				let nodes = await nodesSrvCli.call(nodesReq);
				for (let node of nodes.nodes)
				{
					if (node.indexOf(this.mappingMode) !== -1)
					{
						this.rosMode = ROSMODE.MAPPING;
						res.success = true;
						res.message = 'switched to mapping mode';
						roslog.info(res.message);
						return true;
					}
				}
				timeout -= interval;
				await sleep(interval);
			}
			this.rosMode = ROSMODE.ERROR;
			res.success = false;
			res.message = `Failed to switch to ${this.mappingMode}`;
			roslog.error(res.message);
			return true;
		}
	}

	saveMapSrvCb()
	{
		return async (req, res) => {
			if (this.rosMode !== ROSMODE.MAPPING)
			{
				res.success = false;
				res.message = `cannot save map in ${this.rosMode}, will ignore save map cmd`;
				roslog.warn(res.message);
				return true;
			}
			if (!this.robotPose)
			{
				res.success = false;
				res.message = 'cannot get robot pose';
				roslog.error(res.message);
				return true;
			}
			roslog.info('Saving map');
		    // save map
		   	try
		   	{
		   		// await asyncShell('source ~/catkin_ws/base.sh');
		   		shell.cd(PATH_DBPARAM);
		   		await asyncShell('roslaunch bringup map_saver.launch');
		   	}
		   	catch(e)
		   	{
		   		res.success = false;
		   		res.message = `save map ${e.code}: ${e.stderr}`;
		   		roslog.error(res.message);
		   		roslog.error(e.stderr);
		   		return true;
		   	}
		   	await sleep(1000);
		   	// save map_edit
		   	let ret = await this.saveMapEditByCp();
		   	if (!ret)
		   	{
		   		res.success = false;
			    res.message = 'Failed to save map_edit';
			    roslog.info(res.message);
			    return true;		   		
		   	}
	   		res.success = true;
		    res.message = 'map saved';
		    roslog.info(res.message);
		    return true;
		}
	}

	saveMapEditSrvCb()
	{
		return async (req, res) => {
			let getMapInfo = new Promise((resolve, reject) => {
				this.nh.subscribe(this.nameWithNs('/map'), 'nav_msgs/OccupancyGrid', (map) => {
					this.nh.unsubscribe(this.nameWithNs('/map'));
					resolve(map.info);
				})
			});
			try
			{
				let mapInfo = await getMapInfo;
			}
			catch(e)
			{
				res.success = false;
				res.message = 'Can not get mapInfo from topic /map';
				roslog.error(res.message);
				roslog.error(e);
				return true;
			}
			let mapEditImg = gm(MAP_EDIT).fill('none');
			for (let ob of req.obstacles)
			{
				if (ob.points.length === 0)
				{
					roslog.error('Got empty obstacle, will ignore');
					continue;
				}
				let obMap = this.mapToPx(ob, mapInfo);
				if (obMap.points[0].z < 0) 
				{
					mapEditImg.stroke("#fff", CLEAR_SIZE);
				}
				else
				{
					mapEditImg.stroke("#000", OBSTACLE_SIZE);
				}
				// circle
				if (obMap.points.length === 1 && obMap.points[0].z > 0)
				{
					let radius = obMap.points[0].z;
					let center = obMap.points[0];
					mapEditImg.drawCircle(center.x, center.y, center.x+radius, center.y);
				}
				else if (obMap.points.length === 4) // rectangle
				{
					for (let i = 0; i < obMap.points.length - 1; i++)
					{
						let start = obMap.points[i];
						let end = obMap.points[i+1];
						mapEditImg.drawLine(start.x, start.y, end.x, end.y);
					}
					start = end;
					end = obMap.points[0];
					mapEditImg.drawLine(start.x, start.y, end.x, end.y);
				}
				else // points
				{
					for (let i = 0; i < obMap.points.length - 1; i++)
					{
						let start = obMap.points[i];
						let end = obMap.points[i+1];
						mapEditImg.drawLine(start.x, start.y, end.x, end.y);
					}
				}
			} // for (let ob of req.obstacles)
			// write to map_edit.pgm
			let saveMapEdit = new Promise((resolve, reject) => {
				mapEditImg.write(MAP_EDIT, (err) => {
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
				await saveMapEdit;
				res.success = true;
				res.message = 'map_edit.pgm saved';
				roslog.info(res.message);
				return true;
			}
			catch(e)
			{
				res.success = false;
				res.message = 'failed to save map_edit,pgm';
				roslog.error(res.message);
				roslog.error(e);
				return true;
			}
		} // return
	}

	navigationSrvCb()
	{
		return async (req, res) => {
			if (this.rosMode === ROSMODE.CONVERTING)
			{
				return true;
			}
			else if (this.rosMode === ROSMODE.ERROR)
			{
				return true;
			}
			this.rosMode = ROSMODE.CONVERTING;
			roslog.info('Switching to navigation mode.')
			this.killNodes(['/slam_gmapping', '/move_base', 'map_edit_server']);
			let navigationCmd = 'roslaunch bringup bringup-navigation.launch';
			try
			{
				// await asyncShell(navigationCmd);
				shell.exec(navigationCmd, (code, stdout, stderr) => {
					if (code || stderr)
					{
						roslog.error(stderr);
					}
				});
			}
			catch(e)
			{
				this.rosMode = ROSMODE.ERROR;
				res.success = false;
				res.message = `navigation ${e.code}: ${e.stderr}`;
				roslog.error(res.message);
				return true;
			}
			// check if switched to navigation 
			let nodesSrvCli = this.nh.serviceClient('/rosapi/nodes', this.rosapi_srvs.Nodes);
			let nodesReq = new this.rosapi_srvs.Nodes.Request();
			let timeout = 5000;
			let interval = 500;
			while (timeout > 0)
			{
				let nodes = await nodesSrvCli.call(nodesReq);
				for (let node of nodes.nodes)
				{
					if (node === 'move_base')
					{
						this.rosMode = ROSMODE.NAVIGATION;
						res.success = true;
						res.message = 'switched to navigation mode';
						roslog.info(res.message);
						return true;
					}
				}
				timeout -= interval;
				await sleep(interval);
			}
			// set initial pose
			let initPose = new this.geometry_msgs.PoseWithCovarianceStamped();
			initPose.header.frame_id = 'map';
			initPose.pose = this.robotPose;
			initPose.pose.covariance[0] = 0.25;
		    initPose.pose.covariance[7] = 0.25;
		    initPose.pose.covariance[35] = 0.25;
		    this.initialPosePub.publish(initPose);
		    // response
		    this.rosMode = ROSMODE.ERROR;
			res.success = false;
			res.message = `Failed to switch to navigation`;
			roslog.error(res.message);
			return true;
		} 
	}

	dbparamCtrlSrvCb()
	{
		return async(req, res) => {
			if (this.dbparamLock)
			{
				res.success = false;
				res.message = 'dbparam control is busy, will ignore.';
				roslog.warn(res.message);
				res.branches = [];
				return true;
			}
			this.dbparamLock = true;
			switch (req.control)
			{
				case 'insert':
					try
					{
						// check if already exists.
						let branches = await this.gitBranches();
						if (branches.indexOf(req.params) !== -1)
						{
							res.success = false;
							res.message = `${req.params} already exists.`;
							res.branches = [];
							roslog.error(res.message);
							break;
						}
						await asyncShell([`git branch ${req.params}`,
										  `git add .`,
										  `git commit -m "insert ${req.params}"`,
										  `git checkout ${req.params}`]);
						// set initial pose
						let initPose = new this.geometry_msgs.PoseWithCovarianceStamped();
						initPose.header.frame_id = 'map';
						initPose.pose.pose.orientation.w = 1.0;
					    this.initialPosePub.publish(initPose);
					    // TODO: this takes a long time, service caller may not receive response
					    // await asyncShell('roslaunch bringup bringup-dbparam.launch');
					    shell.exec('roslaunch bringup bringup-dbparam.launch', {silent: true, async: true});
					    res.success = true;
					    res.message = `${req.control} ${req.params} succeeded.`;
					    res.branches = await this.gitBranches();
					    break;
					}
					catch(e)
					{
						console.log(e)
						roslog.error(e);
						res.success = false;
						res.message = `${req.control} ${req.params} failed`;
						res.branches = [];
						break;
					}
				case 'delete':
					try
					{
						let branches = await this.gitBranches();
						if (req.params === 'master')
						{
							res.success = false;
							res.message = 'cannot delete the branch master';
							res.branches = [];
							roslog.error(res.message);
							break;
						}
						else if (req.params === branches[0])
						{
							res.success = false;
							res.message = `cannot delete the branch ${req.params} which you are currently on`;
							res.branches = [];
							roslog.error(res.message);
							break;
						}
						await asyncShell([`git add .`,
										  `git commit -m "delete ${req.params}"`,
										  `git branch -D ${req.params}`]);
						res.success = true;
						res.message = `${req.control} ${req.params} succeeded`;
						res.branches = await this.gitBranches();
						break;
					}
					catch(e)
					{
						roslog.error(e);
						res.success = false;
						res.message = `${req.control} ${req.params} failed`;
						res.branches = [];
						break;
					}
				case 'select':
					try
					{
						let branches = await this.gitBranches();
						res.success = true;
						res.message = `${req.control} ${req.params} succeeded`;
						res.branches = branches;
						break;
					}	
					catch(e)
					{
						roslog.error(e);
						res.success = false;
						res.message = `${req.control} ${req.params} failed`;
						res.branches = [];
						break;
					}
				case 'update':
					try
					{
						let branches = await this.gitBranches();
						if (branches.indexOf(req.params) === -1)
						{
							res.success = false;
							res.message = `${req.params} not exists`;
							res.branches = [];
							roslog.error(res.message);
							break;
						}
						else if (req.params === branches[0])
						{
							res.success = false;
							res.message = `already on branch ${req.params}`;
							res.branches = [];
							roslog.error(res.message);
							break;
						}
						await asyncShell([`git add .`,
										  `git commit -m "update ${req.params}"`,
										  `git checkout ${req.params}`]);
						// set initial pose
						let initPose = new this.geometry_msgs.PoseWithCovarianceStamped();
						initPose.header.frame_id = 'map';
						initPose.pose.pose.orientation.w = 1.0;
					    this.initialPosePub.publish(initPose);
					    // TODO: this takes a long time, the service caller may not receive response
					    // await asyncShell('roslaunch bringup bringup-dbparam.launch');
					    shell.exec('roslaunch bringup bringup-dbparam.launch', {silent: true, async: true});
					    res.success = true;
					    res.message = `${req.control} ${req.params} succeeded.`;
					    res.branches = await this.gitBranches();
					    break;
					}
					catch(e)
					{
						roslog.error(e.stderr);
						res.success = false;
						res.message = `${req.control} ${req.params} failed`;
						res.branches = [];
						break;
					}
				case 'push':
					break;
				case 'fix':
					break;
				default:
					roslog.warn(`Unknown cmd: ${req.control}, params: ${req.params}`);
					break;
			} // switch
			this.dbparamLock = false;
			return true;
		} // return
	}

	rosModeSrvCb()
	{
		return (req, res) => {
			res.success = true;
			res.message = this.rosMode;
			return true;
		}
	}

	setNetWorkSrvCb()
	{
		return (req, res) => {
			let options = JSON.parse(req.name.trim());
			this.setNetwork(options);
			res.exists = true;
			return true;
		}
	}

	robotPoseSubCb()
	{
		return (pose) => {
			this.robotPose = pose;
		}
	}

	/**
	 * set network
	 * @param {Object} options: 
	 *                        {string} mode: wifi/ap;
	 *                        {string} udev: udev name;
	 *                        {string} ssid: ssid name;
	 *                        {string} password: 
	 *                        {string} address: 
	 *                        {string} mask:
	 *                        {string} gateway:
	 *                        {string} timestamp:
	 *                        {bool}   auto:
	 */
	setNetwork(options)
	{
		let netOptions = options || {};
		let mapping = {
			mode: '-m ',
			udev: '-u ',
			ssid: '-s ',
			password: '-p ',
			address: '-i ',
			mask: '-k ',
			gateway: '-g ',
			timestamp: '-t ',
			auto: '-a '
		};
		let cmd = './comm.sh ';
		for (let key of netOptions)
		{
			let param = mapping[key];
			if (key === mapping.auto)
			{
				continue;
			}
			cmd += param;
			cmd += netOptions[key];
			cmd += ' ';
		}
		if (netOptions.hasOwnProperty('-a'))
		{
			cmd += '-a';
			// TODO: write to hitrobot.cfg
		}
		shell.cd(`${PATH_BRINGUP}/shell`);
		shell.exec(cmd, {silent: true}, (code, stdout, stderr) => {
			if (code)
			{
				roslog.error(stderr);
			}
		});
	}

	/**
	 * transform from map to pixel
	 * @param  {geometry_msgs/Polygon} msg     : points in map
	 * @param  {nav_msgs/MapMetaData}  mapInfo : map info
	 * @return {geometry_msgs/Polygon}         : points in pixel
	 */
	mapToPx(msg, mapInfo)
	{
		let msgMap = {
			points: []
		};
		for (let i = 0; i < msg.points.length; i++)
		{
			let point = {
				x: (msg.points[i].x - mapInfo.origin.position.x) / mapInfo.resolution,
				y: mapInfo.height - (msg.points[i].y - mapInfo.origin.position.y) / mapInfo.resolution,
				z: msg.points[i].z / mapInfo.resolution
			}
			msgMap.points.push(point);
		}
		return msgMap;
	}

	/**
	 * kill rosnode
	 * @param  {string|string[]} name 
	 */
	killNodes(names)
	{
		let nodes = typeof names === 'string' ? [names] : names;
		for (let node of nodes)
		{
			let cmd = `rosnode kill ${node}`;
			roslog.info(`Killing ${node}`);
			shell.exec(cmd, {silent: true}, (code, stdout, stderr) => {
				if (code)
				{
					roslog.error(`Kill ${node}, ${code}: ${stderr}`);
				}
			});
		}
	}

	/**
	 * save map_edit by coping map.pgm and map.yaml
	 */
	async saveMapEditByCp()
	{
		shell.cd(PATH_DBPARAM);
		shell.cp('map.pgm', 'map_edit.pgm');
		shell.cp('map.yaml', 'map_edit.yaml');
		let mapYaml;
		try
		{
			mapYaml = await readFile('map.yaml');	
		}
		catch(e)
		{
			roslog.error(`Failed to read map.yaml\n${e.stderr}`);
			return false;
		}
		let mapEditYaml = mapYaml.replace(/map.pgm/, 'map_edit.pgm');
		try
		{
			await writeFile('map_edit.yaml', mapEditYaml);
		}
		catch(e)
		{
			roslog.error(`Failed to write map_edit.yaml\n${e.stderr}`);
			return false;
		}
		return true;
	}

	/**
	 * save map_edit by map_saver
	 */
	async saveMapEditByMapSaver()
	{
	   	let loadMapCmd = 'roslaunch bringup map_server.launch';
	   	try
	   	{
	   		await asyncShell(loadMapCmd);
	   	}
	   	catch(e)
	   	{
	   		roslog.error(`save map edit ${e.code}: ${e.stderr}`);
	   		return false;
	   	}
	    try
	    {
	    	await asyncShell('source ~/catkin_ws/base.sh');
	    	shell.cd(PATH_DBPARAM);
	    	await asyncShell('roslaunch bringup map_edit_saver.launch');
	    }
	    catch(e)
	    {
	    	roslog.error(`save map edit ${e.code}: ${e.stderr}`);
	    	return false;
	    }
	    return true;
	}

	/**
	 * get git branches in dbparam
	 * @return {string[]} : git branches starts with current branch
	 */
	async gitBranches()
	{
		let branches;
		try
		{
			shell.cd(PATH_DBPARAM);
			let branchesStr = await asyncShell('git branch');
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
		catch(e)
		{
			let errInfo = e.stderr ? e.stderr : e;
			roslog.error(errInfo);
		}
	}

	debugSrvCb(req, res)
	{
		roslog.error('Debuging srv ===>');
		process.send('imu_jy901');
		res.success = true;
		return true;
	}

	/**
	 * add name space to name
	 * @param  {string} name : 
	 * @return {string}      : name with name space
	 */
	nameWithNs(name)
	{
		let shortName = name.startsWith('/') ? name : `/${name}`;
		return this.nameSpace ? `/${this.nameSpace}${shortName}` : shortName;
	}
}

(() => {
	process.on('message', async (cfg) => {
		new BaseRosNodeJs(cfg['ns'], cfg);
	});
})();

/********* test *************/
/*
async function test()
{
	process.env.PATH_BRINGUP = '/home/luyh/workspaces/hitrobot/ros_org/src/hitrobot/bringup';
	let params = await readParams();
	let n = new BaseRosNodeJs(params['ns'], params);
	// n.gitBranches();
	let req = {
		control: 'insert',
		params: 't3'
	};
	let res = {
		success: null,
		message: null,
		branches: null
	}
	setTimeout(async ()=>{
		await n.dbparamCtrlSrvCb()(req, res);
		console.log('test done');
		console.log(res)	
	}, 5000);
}
test();
*/
/****************************/