'use strict';
const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

var paramServer = require('../lib/init').paramServer;

var fn_test = async (ctx, next) => {
	var is_scheduling_server = process.env.SCHEDULING_SERVER === '1' ? 'true' : 'false';
	ctx.render('test.html',{
		model: paramServer.getParam('model'),
		version: paramServer.getParam('version'),
		namespace: paramServer.getParam('namespace'),
		is_scheduling_server: is_scheduling_server
	});
};

var fn_scheduling = async (ctx, next) => {
	ctx.render('scheduling.html', {});
}

var fn_innolux_temp = async (ctx, next) => {
	ctx.response.type = 'text/html';
	let file = path.resolve(__dirname, '../views/innolux_temp.html')
	ctx.response.body = await fs.readFile(file);
	await next();
}

var fn_inx_line_p = async (ctx, next) => {
	ctx.response.type = 'text/html';
	let file = path.resolve(__dirname, '../views/inx_line_p.html')
	ctx.response.body = await fs.readFile(file);
	await next();
}

module.exports = {
	'GET /test': fn_test,
	'GET /scheduling': fn_scheduling,
	'GET /innolux': fn_innolux_temp,
	'GET /inx_line_p': fn_inx_line_p
};
