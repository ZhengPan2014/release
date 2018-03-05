'use strict';
const rosnodejs = require('../../rosnodejslib/index.js');
const sleep = require('../../lib/roslog').sleep;
const roslog = require('../../lib/roslog').roslog;

class RosNodeJs
{
	constructor()
	{
		this.nh = null;
		this.nodeName = 'grayloo';
		(async () => {
			this.nh = await rosnodejs.initNode(this.nodeName, {
				onTheFly: true
			});
		})();
	}
}

(() => {
	process.on('message', async (configs) => {
		new RosNodeJs();		
	});
})();