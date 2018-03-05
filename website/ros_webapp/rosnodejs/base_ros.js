'use strict';
const fs = require('fs');
const shell = require('shelljs');
const child = require('child_process');
const roslog = require('../lib/roslog').roslog;

const paramServer = require('../lib/init').paramServer;
const cfg = paramServer.getParam('cfg') || {}; 


function startRosNodeJs()
{
	let files = fs.readdirSync(__dirname);
	let jsFiles = files.filter( (f) => {
		let model = paramServer.getParam('model');
		let fSplited = f.split('_');
		return f.endsWith('.js') && (fSplited[0] == model);
	});

	for (var f of jsFiles)
	{
		let temp = require(__dirname + '/' + f);
		temp.initROS();
	}
}

/*
function startRosNodeJs()
{
	let model = paramServer.getParam('model');
	let files = fs.readdirSync(__dirname);
	let folders = files.filter((f) => {
		// return (f === model || f === 'base_ros');
		return f === model;
	}); 
	folders = ['base_ros'].concat(folders);
	for (let fold of folders)
	{
		let rawFiles = fs.readdirSync(__dirname + '/' + fold);
		let packages = rawFiles.filter((f) => {
			return f.endsWith('ros.js');
		});
		// rosjs.info(`find ${packages.length} rosnodejs packages for ${model}`);
		for (let pkg of packages)
		{
			roslog.info(`starting ${pkg}`);
			// let cmd = 'node ' + __dirname + '/' + fold + '/' + pkg;
			// shell.exec(cmd, {async: true});
			let childRos = child.fork(__dirname + '/' + fold + '/' + pkg);
			childRos.send(cfg);
			// forward the msg from child processes to the auto_boot node process
			childRos.on('message', (msg) => {
				process.send(msg);
			});
		}
	}
}
*/

module.exports.startRosNodeJs = startRosNodeJs;

