'use strict';

const serialport = require('serialport');
const Promise = require('promise');

/**
 * Promise style serialport.list()
 * @return {Promise} 
 */
function list()
{
	return new Promise((resolve, reject) => {
		serialport.list((err, ports) => {
			if (err)
			{
				reject(err);
			}
			else
			{
				resolve(ports);
			}
		});
	});
}

module.exports = {
	list: list
}