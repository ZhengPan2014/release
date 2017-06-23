'use strict';

const os = require('os');
const shell = require('shelljs');
const child = require('child_process');
const comm = require('./comm');
const ttys = require('./serial');

if (!shell.which('apache2')) {
    shell.echo('apache2haha');
    shell.exec('sudo setcap CAP_NET_BIND_SERVICE+ep /usr/lib/node/bin/node');    //get 80 port permission
    /// TODO: add nodejs http server to report error

}


/// TODO: check if ros is ok
// shell.echo(os.EOL);

// if (os.arch() !== process.env['NODEJS_ORG_ARCH']) {
//     shell.echo(os.arch());
// }

// if (!shell.which('git')) {
//   shell.echo('Sorry, this script requires git');
//   shell.exit(1);
// }

const ip="ouiyeah-null";
shell.exec("ping -c 1 " + ip + ".local", {silent:true}, function(code, stdout, stderr) {
    if (code) {
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
        process.env['ROS_MASTER_URI'] = 'http://' + ip + '.local:11311';
        console.log(process.env['ROS_MASTER_URI']);
    }
    rosnode();
});

shell.exec('cd ~/catkin_ws/www/ros_webapp; node app.js;', function(code, stdout, stderr) {
    console.log(`${code}: ${stdout} ${stderr}`);
}); // TODO: use other strategy to replace this

// comm();
// console.log('network done');

// ttys();
// console.log('serial done');

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

                // shell.exec(`roslaunch bringup rosbridge_driver_config.launch driver_port:=${port.comName}`, {silent: true}, function(code, stdout, stderr) {
                //     console.log(port.comName + ": " + code);
                // })



// shell.echo(process.cwd());

// if (process.env['SHELL_PATH'] === os.homedir() + '/catkin_ws/src/bringup/shell') {
//     shell.echo('\x1b[33m[WARN] [SHELL_PATH]', process.env['SHELL_PATH'], '\x1b[0m');
// } else {
//     shell.echo('\x1b[33m[WARN] [SHELL_PATH]', process.env['SHELL_PATH'], '\x1b[0m');
//     // shell.rm('-rf', os.homedir() + '/hitrobot/workspaces/test');
//     // shell.mv(source_array, dest);
// }

