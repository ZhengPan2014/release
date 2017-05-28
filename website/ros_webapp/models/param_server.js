'use strict';

var ParamServer = function(options){
	this.paramPrefix = options.paramPrefix || '/rosnodejs';
	this.isSync = options.isSync || false;
	this.params = {};
};

/*
ParamServer.prototype.sync = async (params) => {
	var params = params || {};
	if (!this.nh)
	{
		console.log('initializing node');
		this.nh = await this.initNode();
	}
	var paramVaules = await this.nh.getParam(params);
	for (var p in paramVaules)
	{
		console.log(paramVaules[p]);
	}
};

ParamServer.prototype.initNode = async (nodeName) => {
	var nh = await rosnodejs.initNode(nodeName);
	return nh;
};
*/

ParamServer.prototype.setParam = function(params){
	var params = params || {};
	for (var param in params)
	{
		if (param.startsWith('/'))
		{
			var paramFullName = this.paramPrefix + param;	
		}
		else
		{
			var paramFullName = this.paramPrefix + '/' + param;	
		}
		this.params[paramFullName] = params[param];
	}
}

ParamServer.prototype.getParam = function(param){
	var isObject = true;
	if (typeof param !== 'object')
	{
		isObject = false;
		var param = [param];
	}
	var paramValue = {};
	for (var i = 0; i < param.length; i++)
	{
		var paramName = param[i];
		var paramFullName = this.paramPrefix + '/' + paramName;
		var value = this.params[paramFullName];
		paramValue[paramName] = value;
	}
	if (!isObject)
	{
		return paramValue[param];
	}
	return paramValue;
}

ParamServer.prototype.syncToRos = async () => {
	// TODO
	
}

module.exports = ParamServer;
