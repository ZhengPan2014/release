'use strict';
class BaseRos extends EventEmitter2
{
	// params:
	// 	1. string url: websocket url for ros
	// 	2. string robotId
	// 	3. options:
	//		function connectionCb: callback for rosbridge connection
	//		function closeCb: callback for rosbridge close
	//		function errorCb: callback for rosbridge error
	constructor(url, robotId, options)
	{
		super();
		this.url = url;
		if (!this.url.startsWith('ws://'))
		{
			this.url = 'ws://' + this.url;
		}
		if (this.url.split(':').length !== 3)
		{
			this.url += ':9090';
		}
		this.robotId = robotId;
		var options = options || {};
		this.connectionCb = options.connectionCb || ((url) => {
			console.log(`[INFO]Connected to ${this.url}.`);
		});
		this.closeCb = options.closeCb || ((url) => {
			console.warn(`[WARN]Rosbridge server ${this.url} closed.`);
		});
		this.errorCb = options.errorCb || ((url) => {
			console.error(`[ERROR]Rosbridge server ${this.url} error.`);
		});
		this.connection = this.connect(this.url);
	}

	// params: 
	// 	 1. string url
	// return:
	// 	 ROSLIB.Ros
	connect(url)
	{
		var ros = new ROSLIB.Ros();
		ros.connect(url);
		ros.on('connection', this.connectionCb);
		ros.on('close', this.closeCb);
		ros.on('error', this.errorCb);
		return ros;
	}

	// params: 
	// 	1. string name: topic name;
	// 	2. string messageType;
	// return: ROSLIB.Topic
	topic(name, messageType)
	{
		return new ROSLIB.Topic({
			ros: this.connection,
			name: this.ID + name,
			messageType: messageType
		});
	}

	// params:
	// 	1. string name: service name;
	// 	2. string serviceType
	// return:
	// 	ROSLIB.Service
	service(name, serviceType)
	{
		return ROSLIB.Service({
			ros: this.connection,
			name: this.robotId + name,
			serviceType: serviceType
		});
	}
}

// static methods for ros
class rosjs
{
	constructor()
	{

	}
	
	static loginfo(info)
	{
		var info = `[INFO][${new Date().getTime()}]: ${info}`;
		console.log(info);
	}

	static logwarn(warn)
	{
		var warn = `[WARN][${new Date().getTime()}]: ${warn}`;
		console.warn(warn);
	}

	static logerr(err)
	{
		var err = `[ERROR][${new Date().getTime()}]: ${err}`;
		console.error(err);	
	}

	static connect(url, options)
	{
		var url = url;
		var options = options || {};
		var connectionCb = options.connectionCb || (() => {
			rosjs.loginfo(`Connected to ${url}.`);
		});
		var closeCb = options.closeCb || (() => {
			rosjs.logwarn(`Rosbridge server ${url} closed.`);
		});
		var errorCb = options.errorCb || (() => {
			rosjs.logerr(`Rosbridge server ${url} error.`);
		});
		if (!url.startsWith('ws://'))
		{
			url = 'ws://' + url;
		}
		if (url.split(':').length !== 3)
		{
			url += ':9090';
		}
		var ros = new ROSLIB.Ros();
		ros.connect(url);
		ros.on('connection', connectionCb);
		ros.on('close', closeCb);
		ros.on('error', errorCb);
		return ros;
	}
}