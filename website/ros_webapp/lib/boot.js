'use strict';

const os = require('os');
const shell = require('shelljs');
const child = require('child_process');
// const ttys = require('./serial');

function init() {
    const ROS_HOSTNAME="ouiyeah-null"; // TODO: hostname for external roscore

    shell.exec("ping -c 1 " + ROS_HOSTNAME + ".local", {silent:true}, function(code, stdout, stderr) {
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

function rosnode() {
    shell.exec('rosnode list', { silent: true }, function(code, stdout, stderr) {
        if (stderr) {
            rosnode();
        } else {
            console.log(`[INFO] [ROSNODE_LIST] ${code}`);
            roslaunch();
        }
    });
}

function roslaunch() {
    shell.exec('roslaunch bringup bringup-boot.launch', function(code, stdout, stderr) {
        if (stderr) {
            console.log(`[ERROR] [ROSLAUNCH_BRINGUP] ${code} : ${stderr}`);
        }
    });
}
