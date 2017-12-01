'use strict';

const net = require('net');
const Promise = require('promise');

module.exports = {
	hokuyo_urg_d: isUrgDev,
	updateConfig: isUrgDev
};

function parseAndValidateIpv4(ip, name)
{
	if (ip.split('.').length !== 4)
	{
		console.log(`Invalid ${name}, must be of the form xxx.yyy.zzz.www`);
		return;
	}
	let parsed = '';
	for (let x of ip.split('.'))
	{
		x = x.trim();
		if (x.length > 3)
		{
			console.log(`Invalid %{name}, must be of the form xxx.yyy.zzz.www`);
		}
		while (x.length < 3)
		{
			x = '0' + x;
		}
		parsed += x;
	}
	return parsed;
}

function isUrgDev(testIp, nIp, nm, ng)
{
	let newIp = nIp || testIp;
	let netMask = nm || '255.255.255.0';
	let newGw = ng || '192.168.0.1';
	let ip = parseAndValidateIpv4(testIp, 'ip');
	newIp = parseAndValidateIpv4(newIp, 'ip to set');
	netMask = parseAndValidateIpv4(netMask, 'net mask');
	newGw = parseAndValidateIpv4(newGw, 'net gateway');
	let msg = '$IP' + ip + netMask + newGw + '\x0a';

	let port = 10940;
	let client = new net.Socket();
	client.setTimeout(3000);

	let p = new Promise((resolve, reject) => {
		client.connect(port, testIp, () => {
			resolve();
		});
	});
	p.then(() => {
		// console.log(`Connected to ${ip}:${port}.`);	
		client.write(msg);
		// console.log(`Sending ${msg.trim()}`);
	});
	let ret = new Promise((resolve, reject) => {
		client.on('data', (data) => {
			let rev = data.toString().substr(0, 40);
			if (rev === msg)
			{
				resolve(true);
			}
			else
			{
				resolve(false);
			}
			client.destroy();
		});
		client.on('error', (err) => {
			reject(err);
			client.destroy();
		});
		client.on('timeout', () => {
			reject('timeout');
			client.destroy();
		});
	});
	return ret;
}

/****************** test ***************/
async function test()
{
	try
	{
		let ret = await isUrgDev('192.168.0.10');
		console.log(ret);
	}
	catch(e)
	{
		console.log(e);
	}
}
// test();
/***************************************/