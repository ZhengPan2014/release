'use strict';

class Server extends BaseRos
{
	// params:
	// 	1. string url: server url;
	// 	2. string serverID: '' by default;
	// 	3. options:
	//		function connectionCb: callback for rosbridge connection
	//		function closeCb: callback for rosbridge close
	//		function errorCb: callback for rosbridge error
	constructor(url, serverID, options)
	{
		var serverID = serverID || '';
		var options = options || {};
		super(url, serverID, options);
		// clients
		this.clients = null;
	}

	hasClient(id, name)
	{
		var client = {
			agvID: id,
			agvName: name
		};
		if (this.clients)
		{
			return this.clients.indexOf(client) !== -1;
		}
	}

	// params:
	// 	1. options:
	// 		string name: topic name, '/AllAgvs' by default
	// 		string messageType: 'scheduling_msgs/AgvList' by default
	// return: Promise
	getClients(options)
	{
		var options = options || {};
		var	name = options.name || '/AllAgvs';
		var messageType = options.messageType || 'scheduling_msgs/AgvList';
		var clientsTopic = super.topic(name, messageType);
		return new Promise((resolve, reject) => {
			clientsTopic.subscribe((msg) => {
				this.clients = [];
				for (var i = 0; i < msg.agvList.length; i++)
				{
					var agv = msg.agvList[i];
					this.clients.push({agv});
				}
				resolve(this.clients);
			});	
		});
	}
}