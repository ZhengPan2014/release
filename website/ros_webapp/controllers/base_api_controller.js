'use strict';
var paramServer = require('../lib/init').paramServer;

var fn_model = async (ctx, next) => {
	var model = paramServer.getParam('model');
	ctx.rest({'model': model});
};

var fn_version = async (ctx, next) => {
	var version = paramServer.getParam('version');
	ctx.rest({'version': version});
};

var fn_namespace = async (ctx, next) => {
	var namespace = paramServer.getParam('namespace');
	ctx.rest({'namespace': namespace});
}

module.exports = {
	'GET /api/model': fn_model,
	'GET /api/version': fn_version,
	'GET /api/namespace': fn_namespace
};
