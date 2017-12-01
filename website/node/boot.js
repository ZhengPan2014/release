//////////////////////////
// GrayLoo @ 2017.11.01 //
//////////////////////////
'use strict';

const os = require('os');
const shell = require('shelljs');
const child = require('child_process');
const Promise = require('promise');
// const comm = require('./comm');

const ROS_REMOTE_MASTER = {
    hostname: 'hitrobot-null',
    uri: '192.168.43.254'
};

/**
 * Promise wrapper for shelljs.exec()
 * @param  {string|string[]}  cmd     : shell cmd
 * @param  {Object}           options : shelljs.exec() options, {silent: true} by default
 * @return {Promise}         
 */
function asyncShell(cmd, options)
{
    let cmdList = typeof cmd === 'string' ? [cmd] : cmd;
    let cmds = cmdList.join(';');
    let execOptions = options || {silent: true};
    return new Promise((resolve, reject) => {
        shell.exec(cmds, execOptions, (code, stdout, stderr) => {
            if (code)
            {
                // git commit returns error code 1 without any stderr, when the working directory is clean.
                if (!stderr && cmd.startsWith('git commit'))
                {
                    resolve(stdout);
                }
                else
                {
                    reject({
                        code: code,
                        stderr: stderr
                    }); 
                }
            }
            else
            {
                resolve(stdout);
            }
        });
    });
}

/**
 * async sleep
 * @param  {float} ms 
 * @return {Promise}
 */
async function sleep(ms)
{
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}

async function enable_LD_LIBRARY_PATH()
{

}

async function main()
{
    // check if apache2 installed
    if (!shell.which('apache2'))
    {
        console.log('Try to install apache2.');
        console.log('https://github.com/ouiyeah/apache');
        // TODO:
        // To allow a user to bind to ports below 1024 by setcap will disable LD_LIBRARY_PATH,
        // which may cause ros cannot find certain shared libraries.
        // https://stackoverflow.com/questions/9843178/linux-capabilities-setcap-seems-to-disable-ld-library-path
        try
        {
            shell.exec("sudo setcap 'cap_net_bind_service=+ep' /usr/bin/python2.7");
            shell.cd('~/catkin_ws/www/html/debug');
            shell.exec('sudo python SimpleHTTPServer 80');
            enable_LD_LIBRARY_PATH();
        }
        catch(e)
        {
            console.log(e);
        }
    }

    // check if there exists a ros remote master
    let hasRemote;
    try 
    {
    	console.log(`Detecting roscore remote server: ${ROS_REMOTE_MASTER.hostname}@${ROS_REMOTE_MASTER.uri}...`);
        hasRemote = await asyncShell('ping -c 1 ' + ROS_REMOTE_MASTER.uri);
    }
    catch(e){}

    if (hasRemote)
    {
    	console.log(`Connected to ${ROS_REMOTE_MASTER.hostname}@${ROS_REMOTE_MASTER.uri}`);
        process.env['ROS_MASTER_URI'] = 'http://' + ROS_REMOTE_MASTER.uri + ':11311';
        process.env['ROS_HOSTNAME'] = ROS_REMOTE_MASTER.hostname;
    }
    else
    {
    	console.log(
    		`Roscore remote server: ${ROS_REMOTE_MASTER.hostname}@${ROS_REMOTE_MASTER.uri} not found.\nStarting roscore locally.`);
    	process.env['ROS_MASTER_URI'] = 'http://' + os.hostname() + ':11311';
        process.env['ROS_HOSTNAME'] = os.hostname();
        // start roscore
        const roscore = child.spawn('roscore');
        roscore.on('close', (code, signal) => {
        	console.log(
            	`child process terminated due to receipt of signal ${signal}`);
        });
        roscore.on('error', (code, signal) => {
	        console.log(
	            `child process error due to receipt of signal ${signal}`);
        });
        roscore.on('exit', (code, signal) => {
	        console.log(
	            `child process exit due to receipt of signal ${signal}`);
        });
    }

    // check if roscore is running
    let timeout = 5000;
    let interval = 500;
    let rosnodes;
    while (timeout > 0)
    {
    	try
    	{
    		rosnodes = await asyncShell('rosnode list');
    	}
    	catch(e){}
    	if (rosnodes)
    	{
    		break;
    	}
    	timeout -= interval;
    	await sleep(interval);
    }
    if (!rosnodes)
    {
    	console.log('Roscore is not running.');
    	// TODO: 
    	// echo error > debug/index.html
    	return;
    }

    // start ros_webapp
    shell.cd('~/catkin_ws/www/ros_webapp');
    shell.exec('node app.js', (code, stdout, stderr) => {
    	console.log(`${code}, ${stdout}, ${stderr}`);
    });

    
    // launch ros nodes
    shell.exec('roslaunch bringup bringup-boot.launch', (code, stdout, stderr) => {
        if (stderr) 
        {
            console.log(`[ERROR] [ROSLAUNCH_BRINGUP] code ${code} : ${stderr}`);
        }
    });
    
    
    // require('../boot/auto_boot');

}

main();


/////////////
// ouiyeah //
/////////////
/*

/// TODO: check if ros is ok
// shell.echo(os.EOL);

// if (os.arch() !== process.env['NODEJS_ORG_ARCH']) {
//     shell.echo(os.arch());
// }

const ROS_HOSTNAME="hitrobot-null"; // TODO: hostname for external roscore
// shell.exec("ping -c 1 " + ROS_HOSTNAME + ".local", {silent:true}, function(code, stdout, stderr) {
// 
function hasRosRemoteServer()
{

shell.exec("ping -c 1 " + "192.168.43.254", {silent:true}, function(code, stdout, stderr) {
    if (code) {
        process.env['ROS_MASTER_URI'] = 'http://' + os.hostname() + ':11311';
        process.env['ROS_HOSTNAME'] = os.hostname();

        const roscore = child.spawn('roscore');
        // const roscore = shell.exec('roscore', function(code, stdout, stderr) {
        //     console.log('Exit code:', code);
        // });
        roscore.on('close', (code, signal) => {
        console.log(
            `child process terminated due to receipt of signal ${signal}`);
        });
        roscore.on('error', (code, signal) => {
        console.log(
            `child process error due to receipt of signal ${signal}`);
        });
        roscore.on('exit', (code, signal) => {
        console.log(
            `child process exit due to receipt of signal ${signal}`);
        });
    } else {
        process.env['ROS_MASTER_URI'] = 'http://' + ROS_HOSTNAME + '.local:11311';
        process.env['ROS_HOSTNAME'] = ROS_HOSTNAME;
        console.log(process.env['ROS_MASTER_URI']);
    }
    rosnode();
});

}

function startNodejs()
{
    shell.exec('cd ~/catkin_ws/www/ros_webapp; node app.js;', function(code, stdout, stderr) {
        console.log(`${code}: ${stdout} ${stderr}`);
    }); // TODO: use other strategy to replace this    
}

function rosnode() {
    shell.exec('rosnode list', { silent: true }, function(code, stdout, stderr) {
        if (stderr) {
            rosnode();
        } else {
            console.log(`[INFO] [ROSNODE_LIST] ok`);
            roslaunch();
        }
    });
}

function roslaunch() {
    // comm();

    // shell.exec('roslaunch bringup comm.launch', function(code, stdout, stderr) {
    shell.exec('roslaunch bringup bringup-boot.launch', function(code, stdout, stderr) {
        if (stderr) {
            console.log(`[ERROR] [ROSLAUNCH_BRINGUP] code ${code} : ${stderr}`);
        }
    });
}

*/