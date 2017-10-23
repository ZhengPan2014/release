'use strict';

const fs = require('fs');
const shell = require('shelljs');
const serialport = require('serialport');
const rosnode = require('./rosnodejslib/index.js');

const tty_rules = '/etc/udev/rules.d/77-persistent-tty.rules';
const tty_rules_prefix = 'KERNEL=="ttyS[0-9]*", MODE="0666"\nKERNEL=="ttyUSB[0-9]*", MODE="0666"\n\n';
const dbparam_cfg = '/home/ouiyeah/workspaces/hitrobot/dbparam/.cfg';

var source = {};
var target = {};
var source_len = 0;
var target_len = 0;

function get_source() {
    try {
        let data = fs.readFileSync(tty_rules, 'utf-8');
        let list = data.replace(/"(\n)+/g,'').split(/SUBSYSTEM=="tty", ENV{ID_PATH}=="|", SYMLINK\+="/);
        for (let i = 1; i < list.length; i++) {
            source[list[i]] = list[i+1];
            // source[list[i+1]] = list[i];
            i++;
        }
    } catch (err) {
        // TODO: create file
        console.log(err);
    }
}

function compare_map() {
    for (let key in target) {
        if (source.hasOwnProperty(key) && source[key] == target[key]) {
            delete source[key];
        } else {
            console.log(`${key}: ${source[key]} in source; ${target[key]} in target`);
        }
    }
    set_target();
}

function set_target() {
    let data = tty_rules_prefix;
    for (let key in target) {
        data += 'SUBSYSTEM=="tty", ENV{ID_PATH}=="' + key + '", SYMLINK\+="' + target[key] + '"\n';
    }
    try {
        // data = fs.writeFileSync('/etc/udev/rules.d/77-persistent-tty.rules', data);
        shell.exec(`echo '${data}' | sudo tee ${tty_rules};`);
    } catch (err) {
        console.log(err);
    } 
}

function run_serial() {
    get_source();

    for (let key in source) {
        let driver_boot = `roslaunch bringup driver_boot.launch`;
        let tf_pub = true;
        let tf_pub_footprint = false;
        let type = source[key].split('_')[1];
        let model = source[key].split('_')[2];
        if (model !== '') {
            model = '_' + model;
        }
        let name = source[key].split(model)[1];
        if (type == undefined) {
            continue;
        } else if (type == 'drive' && model == '_aqmd') {
            if (name == '_left') {
                continue;
            } else if (name == '_right') {
                name = '';
                driver_boot += ` tf_pub:=false tf_pub_footprint:=true`;
            }
        }
        driver_boot += ` type:=${type} model:=${model} name:=${name}`;
        // shell.exec(`sudo ln -sf ${hardware_id} /dev/${softlink_id};`);
        shell.exec(driver_boot, function(code, stdout, stderr) {
            if (stderr) {
                console.log(`[ERROR] [ROSLAUNCH_BRINGUP] code ${code} : ${stderr}`);
            }
        });
    }
}

function run_config() {
    let config = JSON.parse(fs.readFileSync(dbparam_cfg));
    let launch_dir = "/home/ouiyeah/catkin_ws/src/hitrobot/bringup/launch/";
    
    for (let udev in config) {
        let launch = udev.split('_')[0];
        try {
            fs.accessSync(`${launch_dir}${launch}.launch`);
        } catch(e) {
            launch = 'driver_boot';
        }
        let roslaunch = `roslaunch bringup ${launch}.launch`;
        for (let key in config[udev]) {
            roslaunch += ' ' + key + ':=' + config[udev][key];
        }   
        console.log(roslaunch)
        shell.exec(roslaunch, function(code, stdout, stderr) {
            if (stderr) {
                console.log(`[ERROR] [ROSLAUNCH_BRINGUP] code ${code} : ${stderr}`);
            }
        });
    }
}

async function check_serial() {
    get_source();
    
    let nh = await rosnode.initNode('serialjs', {onTheFly: true});
    let diagnostics = nh.subscribe('/diagnostics2', 'diagnostic_msgs/DiagnosticArray', check_diagnostics);

    serialport.list(function(err, ports) {
        let length = 0;
        ports.forEach(function(port) {
            if (port.pnpId) {
                length++;
                shell.exec(`roslaunch bringup driver_comm.launch driver_port:=${port.comName}`, {silent: true}, function(code, stdout, stderr) {
                    if (code) {
                        console.log(`[ERROR] [${port.comName}] ${stderr}`);
                    }
                });
            }
        });
        source_len = length;
    });
}

function check_diagnostics(msg) {
    const ID_PATH = "ID_PATH=";
    let sym_link;
    for (let i in msg.status) {
        if (msg.status[i].message === 'open success') {
            sym_link = 'usb_' + msg.status[i].name;
        }
    }
    if (!sym_link) {
        sym_link = "null";
    }

    console.log(msg.status[0].hardware_id)
    let data = shell.exec(`udevadm info ${msg.status[0].hardware_id}`, {silent: true});
    if (data.code) {
        console.log(`[ERROR] [${msg.status[0].hardware_id}] ${data.stderr}`);
    } else {
        let target_id = data.stdout.substr(data.stdout.indexOf(ID_PATH) + ID_PATH.length).split('\n')[0];
        target[target_id] = sym_link;
    }

    target_len++;
    if (source_len === target_len) {
        compare_map();
    }
}

// run_serial();
// run_config();
// check_serial();

module.exports = run_config;
