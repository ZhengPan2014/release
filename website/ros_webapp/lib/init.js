'use strict';

const paths = {
	pathPrefix: '',
	readmePath: '../../',
	cfgPath: '../../workspaces/hitrobot/ros_org/src'
};

const fs = require('mz/fs');
const os = require('os');
var ParamServer = require('../models/param_server');

var paramServer = new ParamServer({});
var model = null;
var pathPrefix = null;
var version = null;
var config = null;

function getModel()
{	
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

function setPathPrefix(path)
{
	var path = path || '../../src';
	if (fs.existsSync(path))
	{
		pathPrefix = '../../src';
	}
	else
	{
		pathPrefix = '../../install/share';
	}
	paramServer.setParam({'pathPrefix': pathPrefix});
}

function getVersion(path)
{
	var path = path || '..';
	var file = path + '/README.md';
	try
	{
		var readme = fs.readFileSync(file, 'utf-8');
		readme = readme.split('\n');
		var versionLine = readme[4].split('|');
		version = versionLine[1].trim();
		paramServer.setParam({'version': version});
	}
	catch(e)
	{
		// TODO
		console.log(e);
	}
}	

function getConfig(path)
{
	var path = path || pathPrefix;
	var configFile = `${path}/bringup/auth/${model}/hitrobot.cfg`;
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

function init()
{
	getModel();
	setPathPrefix(paths.pathPrefix);
	getVersion(paths.readmePath);	
	getConfig();
}

module.exports = {
	paramServer: paramServer,
	initialize: init
}