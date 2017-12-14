'use strict';

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

module.exports = {
	'GET /test': fn_test,
	'GET /scheduling': fn_scheduling
};
