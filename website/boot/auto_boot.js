'use strict';

const fs = require('fs');
const os = require('os');
const shell = require('shelljs');
const child_process = require('child_process');

const rosnodejs = require('./lib/ros');

const pFs = require('./lib/fs_promise');
const pShell = require('./lib/shell_promise');
const Dev = require('./lib/dev');
const roslog = require('./lib/utils').roslog;
const sleep = require('./lib/utils').sleep;
const ROSLauncher = require('./lib/roslauncher');

const PATH_BRINGUP = process.env.PATH_BRINGUP;
const CFG_FILE = PATH_BRINGUP + '/param/.cfg';
const TTY_RULES = '/etc/udev/rules.d/70-persistent-tty.rules';

class AutoBoot
{
	/**
	 * @param  {object} config config
	 * @param  {string} ns     namespace, Default: ''
	 */
	constructor(config, ns)
	{
		this.configs = config || {};
		this.config = this.configs['udev'];
		this.namespace = ns || '';
		(async ()=>{
			this.nh = await rosnodejs.initNode('auto_boot', {onTheFly: true});
			this.dev = await new Dev(this.namespace, this.nh);
			this.launcher = new ROSLauncher(this.namespace);
			this.dev.on('usbdev', this.usbDevCbTest());
			// ros services
			this.rebootSrv = this.nh.advertiseService(this.nameWithNs('/rosnodejs/reboot'), 
				'std_srvs/Trigger', this.rebootCb());
			this.calOdomSrv = this.nh.advertiseService(this.nameWithNs('/rosnodejs/calibrate_odom'), 
				'std_srvs/Trigger', this.calOdomCb());
			// TODO: more than one lidars on the plantform???
			this.calLidarSrv = this.nh.advertiseService(this.nameWithNs('/rosnodejs/calibrate_lidar'), 
				'std_srvs/Trigger', this.calLidarCb());
			if (!isObjEmpty(this.configs))
			{
				// this.boot();
				this.bootFromLauncher();
			}
			else
			{
				let netDevInfo = await this.dev.checkNetDev('192.168.0.10', '192.168.0.14');
				// this.handleNetDev(netDevInfo);
				this.handleNetDevTest(netDevInfo);
				this.dev.checkUsbDev(TTY_RULES);		
			}
		})();
	}

	async bootFromLauncher()
	{
		let usbDevInfo = await this.dev.getUsbDevInfo();
		roslog.info('Booting...');
		for (let config in this.configs)
		{
			// remap pci to usb symLLink
			for (let key in this.configs[config])
			{
				if (this.configs[config][key].startsWith('pci'))
				{
					this.configs[config][key] = usbDevInfo[this.configs[config][key]];
				}
			}
			// remove the number at the end of config name
			let launcherName = config;
			if (config.indexOf('#') !== -1)
			{
				launcherName = config.split('#')[0];
			}

			// start ROS nodes by launch file
			if (hasLaunchFile(launcherName))
			{
				this.launcher.addLaunchFile(launcherName, this.configs[config]);
				this.launcher.run(launcherName);
			}
			else
			{
				let Launcher;
				try
				{
					Launcher = require(`./launchers/${launcherName}`);
				}
				catch(e)
				{
					roslog.warn(`Launcher for [${launcherName}] not found, will ignore.`);
					continue;
				}
				let launcher = new Launcher(this.configs[config]);
				launcher.updateParam(this.configs[config]);
				if (launcher.isVLaunch)
				{
					this.launcher.addVLaunch(launcherName, launcher.launch);
				}
				else
				{
					this.launcher.addLaunch(launcherName, launcher);	
				}
				this.launcher.run(launcherName);
				await sleep(200);
			} // else
		}
		// fork a process to start ros_webapp
		let rosWebappProcess = child_process.fork('../ros_webapp/app.js')
		rosWebappProcess.on('message', (msg) => {
			roslog.info(`Received roslaunch request from child process.`);
			this.launcher.run(msg);
		});
		rosWebappProcess.send(this.configs);
	}

	async boot()
	{
		let usbDevInfo = await this.dev.getUsbDevInfo();
		roslog.info('Booting...');
		for (let dev in this.config)
		{
			let devInfo = this.config[dev];
			// usb devices
			if (devInfo.hasOwnProperty('ports'))
			{
				if (dev.startsWith('unknown'))
				{
					roslog.warn(`Unknown usb device: [${dev}]@[${devInfo['ports'][0]}], will ignore.`);
					continue;
				}
				let ports = [];
				for (let pci of devInfo['ports'])
				{
					let port = usbDevInfo[pci];
					if (!port)
					{
						roslog.error(`Can not find port: ${usbDevInfo['pci']}`);
					}
					ports.push(usbDevInfo[pci]);
				}
				devInfo['ports'] = ports;
				let launch = 'roslaunch bringup driver_boot.launch';
				for (let key in devInfo)
				{
					// TODO:
					if (key === 'ports')
					{
						if (devInfo['ports'].length === 1)
						{
							launch += ' ';
							launch += 'port:=';
							launch += devInfo['ports'][0];
							/*
							launch += ' ';
							launch += 'is_imu:=';
							launch += true;
							*/
						}
						else if (devInfo['ports'].length === 2) // aqmd driver
						{
							launch += ' ';
							launch += 'drive_port_left:=';
							launch += devInfo['ports'][0];

							launch += ' ';
							launch += 'drive_port_right:=';
							launch += devInfo['ports'][1];
							/*
							launch += ' ';
							launch += 'is_imu:=';
							launch += false;
							*/
							launch += ' ';
							launch += 'is_aqmd:=';
							launch += true;
						}	
						else {}
						continue;
					}
					launch += ' ';
					launch += key;
					launch += ':=';
					launch += devInfo[key];
				}
				roslog.info(launch);
				shell.exec(launch, (code, stdout, stderr) => {
					if (code || stderr)
					{
						roslog.error(`Code: ${code}`, stderr);
					}
				});
				await sleep(500);
			} // if (devInfo.hasOwnProperty('ports'))
			else if(devInfo.hasOwnProperty('ip')) // network device
			{
				if (dev.startsWith('unknown'))
				{
					roslog.warn(`Unknown network device: [${dev}]@[${devInfo['ip']}], will ignore.`);
					continue;
				}
				
				let laserLaunch = 'roslaunch bringup laser.launch';
				for (let key in devInfo)
				{
					laserLaunch += ' ';
					laserLaunch += key;
					laserLaunch += ':=';
					laserLaunch += devInfo[key];
				}
				roslog.info(laserLaunch);
				shell.exec(laserLaunch, (code, stdout, stderr) => {
					if (code || stderr)
					{
						roslog.error(`Code: ${code}`, stderr);
					}
				});
				await sleep(500);
				
			}
			else {}
		} // for

		// launch bringup base.launch
		if (this.configs.hasOwnProperty('base'))
		{
			let baseLaunch = 'roslaunch bringup base.launch';
			for (let key in this.configs['base'])
			{
				baseLaunch += ' ';
				baseLaunch += key;
				baseLaunch += ':=';
				baseLaunch += this.configs['base'][key];
			}
			roslog.info(baseLaunch);
			shell.exec(baseLaunch, (code, stdout, stderr) => {
				if (code || stderr)
				{
					roslog.error(`Code: ${code}`, stderr);
				}
			});
		}
		// rosbridge websocket/TCP
		let commLaunch = 'roslaunch bringup comm.launch';
		shell.exec(commLaunch, (code, stdout, stderr)=>{});
		roslog.info('Boot Completed.');
	}

	usbDevCbTest()
	{
		return async (rules) => {
			let num = 0;
			for (let pci in rules)
			{
				let symLink = rules[pci];
				if (symLink === 'null')
				{
					roslog.warn(`Unknown usb device @[${pci}]`);
					this.configs[`unknown_usb#${num}`] = {
						port: pci
					};
					num++;
					continue;
				}
				let portInfo = symLink.split('_');
				let prefix = portInfo[0];
				let type = portInfo[1];
				let model = portInfo[2];
				let suffix = portInfo[3];
				// TODO: needs a better way
				if (type === 'drive' && model === 'aqmd')
				{
					let portName = 'drive_port_' + suffix;
					if (!this.configs['drive_aqmd_2#0'])
					{
						this.configs['drive_aqmd_2#0'] = {};	
					}
					this.configs['drive_aqmd_2#0'][portName] = pci;
				}
				else
				{
					let configName = type + '_' + model + '#' + num;
					this.configs[configName] = {
						port: pci
					};
				}
				num++;
			} // for
			await this.dumpCfg(CFG_FILE, this.configs);
			this.bootFromLauncher();
		};
	}

	usbDevCb()
	{
		return async (rules) => {
			let usbDev = {};
			let num = 0;
			for (let pci in rules)
			{
				let symLink = rules[pci];
				if (symLink === 'null')
				{
					roslog.warn(`Unknown usb device @[${pci}].`);
					usbDev[`unknown_usb_${num}`] = {};
					usbDev[`unknown_usb_${num}`]['ports'] = [pci];
					continue;
				}
				// usb_i m u_jy901
				// usb_drive_aqmd_left
				//     ----- ---- ----
				//     type  model 
				let info = symLink.trim().split('_');
				let type = info[1];
				let model = info[2];
				// aqmd driver
				if (info.length === 4)
				{
					let name = info[3];
					if (!usbDev.hasOwnProperty(type))
					{
						usbDev[type] = {};
						usbDev[type]['ports'] = [null, null];
						usbDev[type]['type'] = type;
						usbDev[type]['model'] = '_' + model;
						usbDev[type]['tf_pub'] = false;
						usbDev[type]['tf_pub_footprint'] = true;
						usbDev[type]['z'] = 0.07;
						usbDev[type]['wheel_seperation'] = 0.452;
						usbDev[type]['wheel_ratio'] = 16303.32;
					}
					if (name === 'left')
					{
						usbDev[type]['ports'][0] = pci;
					}
					else if (name === 'right')
					{
						usbDev[type]['ports'][1] = pci;
					}
					else
					{
						roslog.error(name);
					}
				}
				else if (info.length === 3)
				{
					usbDev[type] = {};
					usbDev[type]['ports'] = [pci];
					usbDev[type]['type'] = type;
					usbDev[type]['model'] = '_' + model;
					usbDev[type]['x'] = 0.28;
					usbDev[type]['z'] = 0.28;
				}
				else
				{}
				num++;
			} // for
			if (!this.config)
			{
				this.config = {};
			}
			for (let dev in usbDev)
			{
				this.config[dev] = usbDev[dev];
			}
			this.configs['udev'] = this.config;

			await this.dumpCfg(CFG_FILE, this.configs);
			// this.boot();
			this.bootFromLauncher();
		}
	}

	handleNetDev(netDev)
	{
		let ret = {};
		let num = 0;
		for (let ip in netDev)
		{
			let devName;
			let dev = {};

			dev['ip'] = ip;
			switch (netDev[ip])
			{
				case 'sick_tim551':
				case 'sick_tim561':
				case 'sick_tim571':
					devName = `laser_${num}`;
					dev['sick_tim'] = true;
					break;
				case 'sick_lms1xx':
					devName = `laser_${num}`;
					dev['sick_lms'] = true;
					break;
				case 'hokuyo_urg':
					devName = `laser_${num}`;
					dev['hokuyo_urg'] = true;
					break;
				default:
					// roslog.warn(`Unknown device type: ${netDev[ip]}`);
					devName = `${netDev[ip]}_net_${num}`;
					ret[devName] = dev;
					continue;
			}
			ret[devName] = dev;
			num++;
		} // for
		if (!this.config)
		{
			this.config = {};
		}
		for (let dev in ret)
		{
			this.config[dev] = ret[dev];
		}
		this.configs['udev'] = this.config;
	}

	handleNetDevTest(netDev)
	{
		let num = 0;
		for (let ip in netDev)
		{
			let type = netDev[ip];
			//roslog.error(`${ip}: ${type}`);
			this.configs[`${type}#${num}`] = {ip: ip};
			num++;
		}
	}

	/**
	 * dump .cfg
	 * @param  {string} file .cfg file
	 * @param  {object} data Configs
	 */
	async dumpCfg(file, data)
	{
		try
		{	
			await pFs.writeFile(file, JSON.stringify(data, null, '\t'));
		}
		catch(e)
		{
			console.log(e);
		}
	}

	rebootCb()
	{
		return (req, res) => {
			this.boot();
			return true;
		}
	}

	calOdomCb()
	{
		return (req, res) => {
			return true;
		}
	}

	calLidarCb()
	{
		return (req, res) => {
			return true;
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
}

/**
 * @param  {bool} detect Detect namespace from rosnodes name, if set true
 * @return {string}      
 */
async function getNamespace(detect)
{
	// to enable auto detecting namespace from rosnodes, 
	// we should launch bringup-comm.launch first.
	if (detect)
	{
		let strRosnodes = await pShell.exec('rosnode list');
		let rosnodes = strRosnodes.trim().split('\n');
		rosnodes.splice(rosnodes.indexOf('/rosout'), 1);
		let groups = rosnodes.map((node)=>{
			return node.split('/')[1];
		});
		let s = new Set(groups);
		if (s.size === 1)
		{
			return s.keys().next().value;
		}
		else
		{
			return '';
		}
	}
	if (process.env.AGV_NAME)
	{
		return process.env.AGV_NAME;
	}
	return '';
	/*
	// hitrobot-forklift-298ef01
	//          --------      --
	let hostname = os.hostname();
	let model = hostname.split('-')[1];
	let fullSN = hostname.split('-')[2];
	let sn = 'debug';
	if (fullSN)
	{
		sn = fullSN.substr(fullSN.length-2);
	}
	return model + sn;
	*/
}

/**
 * determine if a object {}/undefined is empty
 * @param  {object|undefined}  obj
 * @return {Boolean}
 */
function isObjEmpty(obj)
{
	let obj_ = obj || {};
	for (let key in obj_)
	{
		if (obj_.hasOwnProperty(key))
		{
			return false;
		}
	}
	return true;
}

/**
 * check if there exists launch file
 * @param  {string}  file : launch file name without suffix
 * @return {Boolean}
 */
function hasLaunchFile(file)
{
	let file_ = file.replace(/_/g, "-");
	return fs.existsSync(PATH_BRINGUP + '/launch/' + file + '.launch')
		|| fs.existsSync(PATH_BRINGUP + '/launch/' + file_ + '.launch');
}

/*********************************/
async function main()
{
	let configs;
	try
	{
		configs = await pFs.loadCfg(CFG_FILE);
	}
	catch(e)
	{
		roslog.warn(`Failed to read or parse [${CFG_FILE}], will create one.`)
	}
	// in case there is no .cfg file in dbparam,
	// or the .cfg file is empty
	if (isObjEmpty(configs))
	{
		configs = {};
	}
	let ns = await getNamespace();
	// if the namespace is specified in .cfg, use it.
	if (configs.hasOwnProperty('ns'))
	{
		ns = configs['ns'];
	}
	new AutoBoot(configs, ns);
}
main()   
/*********************************/

/*********************************/
async function test()
{
	let configs;
	try
	{
		configs = await pFs.loadCfg(CFG_FILE);
	}
	catch(e)
	{
		// console.log(e);
	}
	// in case there is no .cfg file in dbparam,
	// or the .cfg file is empty
	if (isObjEmpty(configs))
	{
		configs = {};
		// configs['base'] = {};
	}
	let ns = await getNamespace();
	ns = ''; // debug
	// if the namespace is specified in .cfg, use it.
	if (configs.hasOwnProperty('ns'))
	{
		ns = configs['ns'];
	}
	new AutoBoot(configs, ns);
}
// test()   
/*********************************/