'use strict';

const EventEmitter = require('events');
const shell = require('shelljs');

const rosnodejs = require('./ros');
const pSerial = require('./serial_promise');
const sleep = require('./utils').sleep;
const pShell = require('./shell_promise');
const pFs = require('./fs_promise');
const roslog = require('./utils').roslog;
const detector = require('./lidar_detector');

class _Dev extends EventEmitter
{
	constructor(ns, nh)
	{
		return async () => {
			super();
			this.namespace = ns || '';
			// usb dev
			this.usbDevs = 0;
			this.usbDevsRec = 0;
			this.usbDevsInfo = {};
			// net dev
			this.netDevs = 0;
			this.netDevsRec = 0;
			this.netDevsInfo = {};
			// tty
			this.hardwareIds = [];
			this.ttySource = {};
			this.ttyTarget = {};
			this.nh = nh || await rosnodejs.initNode('boot_dev', {onTheFly: true});
			this.diagnostic_msgs = rosnodejs.require('diagnostic_msgs').msg;
			return this;
		}	
	}

	async checkUsbDev(ttyRules, debug=false)
	{
		roslog.info('Checking USB devices...');
		this.getTTYSource(ttyRules);
		this.usbDevs = 0;
		this.usbDevsRec = 0;
		this.hardwareIds = [];
		let diagnosticsSub = this.nh.subscribe(this.nameWithNs('diagnostics2'), 
			'diagnostic_msgs/DiagnosticArray', this.diagnosticsSubCb(), {
				queueSize: 100
			});
		if (debug)
		{
			console.log('Using fake dev checker...');
			this.fakeUsbDevPub();
			return;
		}
		let ports = await pSerial.list();
		for (let port of ports)
		{
			if (port.pnpId)
			{
				this.usbDevs++;
			}
		}
		roslog.info(`Got ${this.usbDevs} valid tty rules.`);

		// if there is no usb device, no diagnostics will be received
		// so just emit 'usbdev'.
		if (this.usbDevs === 0)
		{
			super.emit('usbdev', this.ttyTarget);
			return;
		}
		for (let port of ports)
		{
			if (port.pnpId)
			{
				let cmd = `roslaunch bringup driver_comm.launch driver_port:=${port.comName}`;
				try
				{
					roslog.info(`Detecting port: ${port.comName}...`);
					await pShell.exec(cmd);	
				}
				catch(e){console.log(e.stderr)};
			}
		}
	}


	/**
	 * check network devices
	 * @param  {string} start ip address start, Default: 192.168.0.10
	 * @param  {string} end   ip address end, Default: 192.168.0.14
	 * @return {map<ip, devType>} e.g. {192.168.0.10: hokuyo_urg}
	 */
	async checkNetDev(start, end)
	{
		roslog.info('Checking network devices...');
		let startIp = start || '192.168.0.10';
		let endIp = end || '192.168.0.14';
		let starts = startIp.split('.');
		let ends = endIp.split('.');
		let testIps = [];
		for (let i = parseInt(starts[2]); i < parseInt(ends[2])+1; i++)
		{
			let last = parseInt(starts[2]) < parseInt(ends[2]) ? 255 : parseInt(ends[3])+1;
			for (let j = parseInt(starts[3]); j < last; j++)
			{
				let ip = `192.168.${i}.${j}`;
				let stdout;
				let code;
				try
				{
					roslog.info(`Ping ${ip}...`);
					stdout = await pShell.exec(`ping -c 1 ${ip}`);
				}		
				catch(e)
				{
					let code = e.code;
				}
				if (stdout && !code)
				{
					testIps.push(ip);
					roslog.info(`Found device at ${ip}`);
				}
			}
		}
		roslog.info(`Found ${testIps.length} devices`);

		let ret = {};
		for (let ip of testIps)
		{
			let devInfo = await detector.detect(ip);
			ret[ip] = devInfo[ip];
		}
		return ret;
	}

// private:

	diagnosticsSubCb()
	{
		return async (msg) => {
			const ID_PATH = 'ID_PATH=';
			let symLink;
			for (let stat of msg.status)
			{
				if (stat.message === 'open success')
				{
					symLink = 'usb_' + stat.name;
				}
			}
			if (!symLink)
			{
				symLink = "null";
			}
			try
			{
				let data = await pShell.exec(`udevadm info ${msg.status[0].hardware_id}`);	
				let targetId = data.substr(data.indexOf(ID_PATH) + ID_PATH.length).split('\n')[0];
				this.ttyTarget[targetId] = symLink;
				this.hardwareIds.push(msg.status[0].hardware_id);
				roslog.info(`${targetId}: ${symLink}`);
			}
			catch(e)
			{
				console.log(e);
			}
			this.usbDevsRec++;
			if (this.usbDevs === this.usbDevsRec)
			{
				/*
				// write to file, debug only
				writeTTYRules(this.ttyTarget, this.hardwareIds);
				*/
				this.nh.unsubscribe(this.nameWithNs('diagnostics2'));
				super.emit('usbdev', this.ttyTarget);
			}
			
		} // return
	}

	async getTTYSource(ttyRules)
	{
		try
		{
			let data = await pFs.readFile(ttyRules);
			let list = data.replace(/"(\n)+/g,'').split(/SUBSYSTEM=="tty", ENV{ID_PATH}=="|", SYMLINK\+="/);
	        for (let i = 1; i < list.length; i++) 
	        {
	            this.ttySource[list[i]] = list[i+1];
	            i++;
	        }
		}
		catch(e){console.log(e)};
	}


	genUdevCfg()
	{
		let ret = {};
		for (let idPath in this.ttyTarget)
		{
			// ignore ID_PATH with null symlink
			if (this.ttyTarget[idPath] === 'null')
			{
				continue;
			}
			if (this.ttySource.hasOwnProperty(idPath))
			{
				let info = this.ttyTarget[idPath].trim().split('_');
				let type = info[1];
				let model = info[2];
			}
			else
			{
				console.log(`${idPath}: ${this.ttyTarget[idPath]} not found in rules.d`);
			}
		}
	}


	/**
	 * @return {map<pci, port>} 
	 */
	async getUsbDevInfo()
	{
		let ports = await pSerial.list();
		let comNames = [];
		for (let port of ports)
		{
			if (port['comName'].startsWith('/dev/ttyUSB'))
			{
				comNames.push(port['comName']);
			}
		}
		roslog.info(`Found ${comNames.length} usb devices`);
		let ret = {};
		for (let com of comNames)
		{
			let info = await pShell.exec(`udevadm info ${com}`);
			let index = info.indexOf('ID_PATH=');
			let pci = info.substr(index+8).split('\n')[0];
			ret[pci] = com;
		}
		return ret;
	}

	async fakeUsbDevPub()
	{
		let fakeUsbDevPub = this.nh.advertise('/diagnostics2', 'diagnostic_msgs/DiagnosticArray', {
			latching: false
		});	
		let devData = await readTTYRules();	
		for (let dev of devData)
		{
			console.log(dev);
			let msg = new this.diagnostic_msgs.DiagnosticArray();
			msg.status = [];
			msg.status[0].name = dev['symLink'];
			msg.status[0].message = 'open success';
			msg.status[0].hardware_id = dev['hardwareId'];
			msg.status[0].level = 2;
			msg.status[0].values = [];
			fakeUsbDevPub.publish(msg);
			console.log(msg)
		}
	}

	/**
	 * add namespace to name
	 * @param  {string} name 
	 * @return {string} 
	 */
	nameWithNs(name)
	{
		let shortName = name.startsWith('/') ? name : `/${name}`;
		return this.namespace ? `/${this.namespace}${shortName}` : shortName;
	}

	async test()
	{
		let ports = await pSerial.list();
		console.log(ports)
	}
}

class Dev
{
	constructor(ns, nh)
	{
		return new _Dev(ns, nh)();
	}
}

// debug use only
async function writeTTYRules(rules, hardwareIds)
{
	let ret = []
	let i = 0;
	for (let dev in rules)
	{
		ret.push({
			pci: dev,
			symLink: rules[dev],
			hardwareId: hardwareIds[i]
		});
	}	
	await pFs.writeFile('../tty.rules', JSON.stringify(ret));
}

// debug use only
async function readTTYRules(file)
{
	let f = file || '../tty.rules';
	let ttyRulesStr = await pFs.readFile(f);
	return JSON.parse(ttyRulesStr); 
}

module.exports = Dev;

/******** test ********/
async function test()
{
	let dev = await new Dev();
	// dev.checkUsbDev('/etc/udev/rules.d/70-persistent-tty.rules');
	// dev.getUsbDevInfo();
	dev.checkNetDev('192.168.0.0', '192.168.0.15');
}
// test();
/**********************/
