'use strict';

const fs = require('fs');
const roslog = require('./utils').roslog;

class LidarDetector
{
	/**
	 * @path {string} detectors folder path, Default: ../lidar_detectors/
	 */
	constructor(path)
	{
		let folder = path || __dirname + '/../lidar_detectors/';
		let rawFiles = fs.readdirSync(folder);
		let files = rawFiles.filter((f) => {
			return f.endsWith('_d.js');
		});
		this.detectors = {};
		let sum = 0
		for (let detector of files)
		{
			let name = detector.split('.')[0];
			this.detectors[name] = require(folder + detector)[name];
			sum++;
		}
		roslog.info(`Loaded ${sum} lidar detectors.`);
	}

	async detect(ip)
	{
		let detectRet = {};
		for (let key in this.detectors)
		{
			let name = key.substr(0, key.length-2);
			let detect = this.detectors[key];
			roslog.info(`[${name}] detecting [${ip}]...`);
			let ret;
			try
			{
				ret = await detect(ip);
			}
			catch(e){}
			if (ret)
			{
				roslog.info(`[${ip}] is a [${name}] device.`);
				detectRet[ip] = name;
				return detectRet;
			}
		}
		roslog.warn(`Unknown device @[${ip}]`);
		detectRet[ip] = 'unknown';
		return detectRet;
	}
}

let	detector = new LidarDetector()

module.exports = detector;

/*************** test **************/
async function test()
{
	let ret = await detector.detect('192.168.0.1');
	console.log(ret);
}
// test();
/***********************************/