'use strict';
let fs = require('fs');
let paramServer = require('../lib/init').paramServer;

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

module.exports.startRosNodeJs = startRosNodeJs;