'use strict';
var paramServer = require('../lib/init').paramServer;

var fn_model = async (ctx, next) => {
	var model = paramServer.getParam('model');
	ctx.rest(model);
};

var fn_version = async (ctx, next) => {
	var version = paramServer.getParam('version');
	ctx.rest(version);
};

module.exports = {
	'GET /api/model': fn_model,
	'GET /api/version': fn_version
};
