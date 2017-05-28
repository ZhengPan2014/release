'use strict';

const fs = require('fs');

var paramServer = require('./init').paramServer;

function addMapping(router, mapping)
{
	for (var url in mapping)
	{
		var method_path = url.split(' ');
		var method = method_path[0].toLowerCase();
		var path = method_path[1];
		switch (method)
		{
			case 'get':
				router.get(path, mapping[url]);
				console.log(`Register URL mapping: GET ${path}`);
				break;
			case 'post':
				router.post(path, mapping[url]);
				console.log(`Register URL mapping: POST ${path}`);
				break;
			case 'put':
				router.put(path, mapping[url]);
				console.log(`Register URL mapping: PUT ${path}`);
				break;
			case 'delete':
				router.delete(path, mapping[url]);
				console.log(`Register URL mapping: DELETE ${path}`);
				break;
			default:
				console.log(`Invalid URL: ${url}`);
				break;
		}
	}
}

function addControllers(router, dir, registerAll)
{
	var registerAll = registerAll || false;
	var dir = __dirname;
	dir = dir.substring(0, dir.length-4) + '/controllers';
	var files = fs.readdirSync(dir);
	var jsFiles = files.filter( (f) => {
		if (registerAll)
		{
			return f.endsWith('.js');		
		}
		else
		{
			var model = paramServer.getParam('model');
			var fSplited = f.split('_');
			return f.endsWith('.js') && (fSplited[0] == model || f.startsWith('base'))
		}
	});
	for (var f of jsFiles)
	{
		console.log(`Process controller: ${f}...`);
		let mapping = require(`${dir}/${f}`);
		addMapping(router, mapping);
	}
}

module.exports = function(dir){
	let controllersDir = dir || 'controllers';
	let router = require('koa-router')();
	addControllers(router, controllersDir);
	return router.routes();
};
