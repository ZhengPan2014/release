'use strict';

const fs = require('fs');
const shell = require('shelljs');
const child_process = require('child_process');
const net = require('net');

const sleep = require('./utils').sleep;

const PY_LAUNCHER = process.env.HOME + '/catkin_ws/www/boot/lib/py_launcher.py';

class ROSLaunchList
{
	/**
	 * @param  {string} ns Namespace
	 * @param  {map<string, launchers/Launcher>}  launches  
	 * @param  {map<string, string>} vLaunches
	 */
	constructor(ns, launches, vLaunches)
	{
		this.ns = ns;
		this.launches = launches || {};
		this.vLaunches = vLaunches || {};
		this.launchFiles = {};
	}

	has(launchName)
	{
		if (this.launches.hasOwnProperty(launchName)
			|| this.vLaunches.hasOwnProperty(launchName))
		{
			return true;
		}
		return false;
	}

	/**
	 * add Launch instance
	 * @param {string} name
	 * @param {Launcher} launcher Launcher instance
	 */
	addLaunch(name, launcher)
	{
		// attach a namespace
		launcher.params.namespace = this.ns;
		this.launches[name] = launcher;
	}

	/**
	 * add virtual launch
	 * @param {string} name
	 * @param {string} ctx 
	 */
	addVLaunch(name, ctx)
	{
		this.vLaunches[name] = '<!-- virtual -->' + ctx;	
	}

	/**
	 * add launch file
	 * @param {string} name   : launch file name without suffix
	 * @param {Object} params : params map
	 */
	addLaunchFile(name, params)
	{
		this.launchFiles[name] = params;
	}

	/**
	 * launch cmd for launch file
	 * @param  {String} name : launch file name
	 * @param  {bool}   prettify
	 * @param  {String} pkg  : ROS pkg
	 * @return {String}
	 */
	launchFileCmd(name, prettify=false, pkg='bringup')
	{
		let params = this.launchFiles[name];
		if (prettify)
		{
			let prettyCmd = '\x1B[7m' + `roslaunch ${pkg} ${name}.launch`;
			for (let p in params)
			{
				prettyCmd += '\n\t'
				prettyCmd += p;
				prettyCmd += ' := ';
				prettyCmd += params[p];
			}
			return prettyCmd + '\x1B[27m';
		}
		else
		{
			let cmd = `roslaunch ${pkg} ${name}.launch`;
			for (let p in params)
			{
				cmd += ' '
				cmd += p;
				cmd += ':=';
				cmd += params[p];
			}
			return cmd;
		}
	}

	rmLaunch(launchName)
	{

	}

	/**
	 * dump virtual launch 
	 * @param  {string} launchName
	 * @param  {string} filename   Launch file name. Default: launch name
	 */
	dumpVLaunch(launchName, filename)
	{
		if (!this.has(launchName))
		{
			console.log(`${launchName} not found`);	
		}
		let launchStr = this.vLaunches[launchName]
		fs.writeFile(filename, launchStr, 'utf8', (err) => {
			if (err)
				console.log(err);
			else
				console.log(`${launchName} dumped`);
		});
	}

	run(launchName)
	{
		if (this.launchFiles.hasOwnProperty(launchName))
		{
			console.log('--Running:\n\x20\x20'+this.launchFileCmd(launchName, true));
			let cmd = this.launchFileCmd(launchName);
			shell.exec(cmd, {silent: true}, (code, stdout, stderr) => {
				if (code || stderr)
				{}
			});
			return true;
		}
		else if (this.launches.hasOwnProperty(launchName))
		{
			console.log('--Running:\n\x20\x20'+this.launches[launchName].prettyLaunchStr);
			shell.exec(this.launches[launchName].launch, {silent: false}, (code, stdout, stderr) => {
				if (code || stderr)
				{}
			});
			return true;
		}
		else (this.vLaunches.hasOwnProperty(launchName))
		{
			this.runVLaunch(launchName);
			return true;
		}
		return false;
	}

	runVLaunch(launchName)
	{
		if (!this.has(launchName))
		{
			return false;
		}
		let server = net.createServer( (client) => {
			console.log('Python ROSLauncher client connected.');
			let launchCtx = this.vLaunches[launchName];
			client.write(launchCtx + 'EOD');
			server.close();
		});
		server.listen(8809, () => {
			console.log('ROSLauncher server bound.')
		});
		server.on('close', () => {
			console.log('socket closed');
		});
		child_process.spawn('python', [PY_LAUNCHER], 
			{stdio: [process.stdin, process.stdout, process.stderr]});
	}
}

module.exports = ROSLaunchList;