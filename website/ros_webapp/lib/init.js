'use strict';

const fs = require('mz/fs');
const os = require('os');

const ParamServer = require('../models/param_server');
let paramServer = new ParamServer({});

const HOME = homeDir();
const PATH_CATKIN = process.env.PATH_CATKIN || `${HOME}/catkin_ws`;
const PATH_BRINGUP = process.env.PATH_BRINGUP || `${PATH_CATKIN}/src/hitrobot/bringup`;

function homeDir()
{
	let index = __dirname.indexOf('/', 6);
	return __dirname.substring(0, index);
}

function getModel()
{	
	let model;
	if (process.env.HOSTNAME)
	{
		model = process.env.HOSTNAME;
	}
	else
	{
		var hostname = os.hostname();
		model = hostname.split('-')[1];	
	}
	console.log(`Got env.HOSTNAME: ${model}`);
	paramServer.setParam({'model': model});
}

function getVersion()
{
	let file = PATH_CATKIN + '/README.md';
	try
	{
		let readme = fs.readFileSync(file, 'utf-8');
		readme = readme.split('\n');
		let versionLine = readme[4].split('|');
		let version = versionLine[1].trim();
		paramServer.setParam({'version': version});
	}
	catch(e)
	{
		// TODO
		// console.log(e);
		console.log('Failed to read version from README.md');
		paramServer.setParam({'version': 'undefined'});
	}
}	

function getCfg()
{
	let cfFile = `${PATH_BRINGUP}/param/.cfg`;
	let cfg = {};
	try
	{
		let rawCfg = fs.readFileSync(cfFile, 'utf-8');
		cfg = JSON.parse(rawCfg);
		/*
		if (cfg.mysql)
		{
			console.log('Connecting to MySQL.');
			const db = require('../models/db');
			db.initMysql(cfg.mysql);
		}
		else
		{
			console.log('MySQL config not found.NodeJs will start without connection to MySQL');
		}
		*/
	}
	catch(e)
	{
		// TODO: hitrobot.cfg not found
		console.log('Load .cfg failed.');
	}
	paramServer.setParam({'cfg': cfg});
}

function getConfig()
{
	let model = paramServer.getParam('model');
	let configFile = `${PATH_BRINGUP}/auth/${model}/hitrobot.cfg`;
	try
	{
		var rawConfig = fs.readFileSync(configFile, 'utf-8');
		var config = JSON.parse(rawConfig);
		paramServer.setParam({'config': config});
		if (config.mysql)
		{
			console.log('Connecting to MySQL.');
			const db = require('../models/db');
			db.initMysql(config.mysql);
		}
		else
		{
			console.log('MySQL config not found.NodeJs will start without connection to MySQL');
		}
	}
	catch(e)
	{
		// TODO: hitrobot.cfg not found
		console.log('Load hitrobot.cfg failed.');
		console.log('MySQL config not found.NodeJs will start without connection to MySQL');
	}
}

function getNamespace()
{
	let ns = process.env.AGV_NAME;
	if (!ns)
	{
		ns = 'undefined';
	}
	paramServer.setParam({'namespace': ns});
	return ns;
}

function init()
{
	getModel();
	getVersion();	
	getCfg();
	getConfig();
	getNamespace();
}

module.exports = {
	paramServer: paramServer,
	initialize: init
}