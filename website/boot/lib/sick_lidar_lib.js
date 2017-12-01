/**
 * lidar detector for sick laserscanner LMS1xx, LMS5xx,
 * TiM5xx(TiM55x, TiM56x, TiM57x), MRS1000, NAV310, 
 * LD-OEM15xx and LDLRS36xx, via nodejs using SICK protocol ColaA 
 * with TCP port 2111 or 2112.
 *
 * GrayLoo@20171120
 */

'use strict';
const net = require('net');
const dgram = require('dgram');
const Promise = require('promise');

module.exports = {
	getDevType: getDevType,
	getDevInfoByUDP: getDevInfoByUDP
};

/**
 * get sick laserscanner type
 * @param  {string} ip
 * @param  {int}    port
 * @param  {double} timeout
 * @return {Promise}
 */
function getDevType(ip, port, timeout)
{
	let ip_ = ip || '192.168.0.1';
	let port_ = port || 2112;
	let timeout_ = timeout || 3000;
	let telegram = '0273524E2044497479706503';
	let buffer = new Buffer(telegram, 'hex');
	let client = new net.Socket();
	
	client.setTimeout(timeout_);
	let p = new Promise((resolve, reject) => {
		client.connect(port_, ip_, () => {
			resolve();
		});
	});
	p.then(() => {
		// console.log(`Connected to ${ip_}:${port_}`);
		client.write(buffer);
	});
	let ret = new Promise((resolve, reject) => {
		client.on('data', (data) => {
			try
			{
				let type = parseTelegram(data);
				resolve(type);	
			}
			catch(e)
			{
				reject(e);
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

/**
 * SICK LMS1XX ONLY
 * reboot device if cannot receive any response after one success
 * get sick lms1xx device info
 * @param  {string} ip
 * @param  {int}    port
 * @param  {double} timeout
 * @return {Promise}
 */
function getDevInfoByUDP(ip, port, timeout)
{
	let ip_ = ip || '192.168.0.1';
	let port_ = port || 30718;
	let timeout_ = timeout || 3000;
	let code = '10000008ffffffffffff412eb5ee01000ad33705ffffff00';
	let buffer = new Buffer(code, 'hex');
	let client = dgram.createSocket('udp4');

	client.send(buffer, port, ip);
	let gotMsg = false;
	let timer = setTimeout(() => {
		if (!gotMsg)
		{
			client.emit('timeout');
		}
	}, timeout_);

	let ret = new Promise((resolve, reject) => {
		client.on('close', () => {
			reject('close');
		});
		client.on('error', (err) => {
			reject(err);
			client.close();
		});
		client.on('message', (msg, rinfo) => {
			gotMsg = true;
			let devInfo = parseXML(msg.toString());
			resolve(devInfo);
			client.close();
		});
		client.on('timeout', () => {
			reject('timeout');
			client.close();
		});
	});
	return ret;
}

/**
 * parse telegram
 * @param  {Buffer} buffer sick telegram buffer
 * @return {string}
 * @throws {Error} If [buffer does not starts with 0x02 or ends with 0x03]
 */
function parseTelegram(buffer)
{
	if (buffer[0] !== 2 || buffer[buffer.length-1] !== 3)
	{
		throw new Error(`Invalid telegram data from sick: ${buffer}`);
	}
	let data = buffer.slice(1, buffer.length-1).toString();
	let l = data.split(' ');
	let type = l[l.length-1].split('-')[0];
	return type;
}

/**
 * parse XML from sick lms1xx response
 * @param  {string} str
 * @return {map}
 */
function parseXML(str)
{
	let data = str.split('\n')
	let ret = {};
	if (data.length === 2 
		&& data[1].startsWith('<NetScanResult')
		&& data[1].endsWith('</NetScanResult>'))
	{
		let re = /key="(.*?)" value="(.*?)" readonly="(.*?)"\/>/;
		let arr = data[1].split('<Item ');
		for (let s of arr)
		{
			let matchRet = re.exec(s);
			if (matchRet)
			{
				let value = matchRet[2];
				if (value === 'not defined')
				{
					value = undefined;
				}
				else if (value === 'TRUE')
				{
					value = true;
				}
				else if (value === 'FALSE')
				{
					value = false;
				}
				ret[matchRet[1]] = value;
			}
			else
			{
				let macReg = /MACAddr="(.*?)">/;
				ret['MACAddr'] = macReg.exec(s)[1];
			}
		}
	}
	return ret;
}


/***************** test **************/
function test()
{
	let data = '02735241204449747970652043204C4D533531312D323031303003';
	let buffer = new Buffer(data, 'hex');
	let type = parseTelegram(buffer);
	console.log(type);
}
// test();
/*************************************/