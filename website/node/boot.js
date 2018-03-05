//////////////////////////
// GrayLoo @ 2017.11.01 //
//////////////////////////

// ouiyeah @ 2018-02-23

'use strict';

const fs = require('fs');
const os = require('os');
const shell = require('shelljs');
const child = require('child_process');
const Promise = require('promise');
// const comm = require('./comm');

function asyncReadFile(file)
{
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        });
    });
}

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

async function run_roscore()
{
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

async function main()
{
    let args = process.argv.splice(2);
    let auto = false;
    if (args[0] === '-a')
    {
        auto = true;
    }

    // export AGV_NAME = namespace
    try
    {
        let cfgFile = process.env.PATH_BRINGUP + '/param/.cfg';
        let data = await asyncReadFile(cfgFile);
        let cfg = JSON.parse(data);
        if (cfg.hasOwnProperty('ns'))
        {
            if (cfg['ns'] !== '')
            {
                let ns = cfg['ns'].trim();
                console.log(`ROS starting with namespace: ${ns}`);
                process.env.AGV_NAME = ns;
            }
            else
            {
                console.log(`Invalid namespace, ROS starting without namespace.`);
            }
        }
        if (cfg.hasOwnProperty('is_scheduling_server'))
        {
            if (cfg['is_scheduling_server'] === 1
                || cfg['is_scheduling_server'] === '1'
                || cfg['is_scheduling_server'] === 'true'
                || cfg['is_scheduling_server'] === 'True'
                || cfg['is_scheduling_server'] === 'TRUE')
            {
                process.env.SCHEDULING_SERVER = 1;   
                console.log(`ROS starting as scheduling server`); 
            }
            else
            {
                process.env.SCHEDULING_SERVER = 0; 
            }
        }
        else
        {
            process.env.SCHEDULING_SERVER = 0;
        }
        if (cfg.hasOwnProperty('has_server'))
        {
            if (cfg['has_server'] === 1
                || cfg['has_server'] === '1'
                || cfg['has_server'] === 'true'
                || cfg['has_server'] === 'True'
                || cfg['has_server'] === 'TRUE')
            {
                process.env.HAS_SERVER = 1;   
                console.log(`ROS starting as client has server`); 
            }
            else
            {
                process.env.HAS_SERVER = 0; 
            }
        }
        else
        {
            process.env.HAS_SERVER = 0;
        }

        if (cfg.hasOwnProperty('ros_master'))
        {
            // remove ping
            /*
            try 
            {
                console.log(`Detecting roscore remote server: ${ROS_REMOTE_MASTER.hostname}@${ROS_REMOTE_MASTER.uri}...`);
                hasRemote = await asyncShell('ping -c 1 ' + ROS_REMOTE_MASTER.uri);
            }
            catch(e){}
            */
            process.env['ROS_MASTER_URI'] = 'http://' + cfg['ros_master'] + ':11311';
            process.env['ROS_HOSTNAME'] = cfg['ros_master'];
        }
        else
        {
            run_roscore();
        }
    }
    catch(e)
    {
        // console.log(e);
        console.log('Read cfg or parse to JSON failed.\nROS starting as as non-scheduling server without namespace');
        run_roscore();
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
    // Make sure ros_webapp starts after the namespace export,
    // since we will use process.env.AGV_NAME in nodejs server 
    // to provide a restful namespace api.
    shell.cd('~/catkin_ws/www/ros_webapp');

    if (auto)
    {
        process.env.BOOT_MODE="AUTO";
        console.log('Boot Mode: AUTO');
        require('../boot/auto_boot');    
    }
    else
    {
        process.env.BOOT_MODE="LEGACY";
        // console.log('Boot Mode: LEGACY');
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
    }
    
}

main();
