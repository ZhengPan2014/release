'use strict';

const rosnodejs = require('../rosnodejslib/index.js');
const CommonRosApi = require('./ros_api');

let paramServer = require('../lib/init').paramServer;

class RosNodeJs
{
	constructor(){
		this.ns = paramServer.getParam('namespace');
		this.nodeName = CommonRosApi.withNs('rosnodejs', this.ns);
		(async () =>{
			let nh = await rosnodejs.initNode(this.nodeName, {
					onTheFly: true	
				});
			this.commonRosApi = new CommonRosApi(nh, this.ns);
		})();
	}
}

module.exports = {
	initROS: () => {
		new RosNodeJs();
	}
};