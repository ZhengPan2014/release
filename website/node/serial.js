'use strict';

const fs = require('fs');
const shell = require('shelljs');
const serialport = require('serialport');
const rosnode = require('./rosnodejslib/index.js');

var source = {};
let target = {};
var length1 = 0;
var length2 = 0;

function get_source() {
    try {
        let data = fs.readFileSync('/etc/udev/rules.d/70-persistent-tty.rules', 'utf-8');
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
    for (let key in target) {
        let type = target[key].split('_')[0];
        let model = target[key].split(type)[1];
        // shell.exec(`sudo ln -sf ${hardware_id} /dev/${softlink_id};`);
        shell.exec(`roslaunch bringup driver.launch type:=${type} model:=${model}`);
    }
}

function set_target() {
    let data = '';
    for (let key in target) {
        data += 'SUBSYSTEM=="tty", ENV{ID_PATH}=="' + key + '", SYMLINK\+="' + target[key] + '"\n';
    }
    try {
        data = fs.writeFileSync('/etc/udev/rules.d/77-persistent-tty.rules', data);
    } catch (err) {
        console.log(err);
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
                shell.exec(`roslaunch bringup rosbridge_driver_config.launch driver_port:=${port.comName}`, {silent: true}, function(code, stdout, stderr) {
                    if (code) {
                        console.log(`[ERROR] [${port.comName}] ${stderr}`);
                    }
                });
            }
        });
        length1 = length;
    });
}

function check_diagnostics(msg) {
    const ID_PATH = "ID_PATH=";
    let sym_link;
    for (let i in msg.status) {
        if (msg.status[i].message === 'open success') {
            sym_link = msg.status[i].name;
        }
    }
    if (!sym_link) {
        sym_link = "null";
    }

    let data = shell.exec(`udevadm info ${msg.status[0].hardware_id}`, {silent: true});
    if (data.code) {
        console.log(`[ERROR] [${msg.status[0].hardware_id}] ${data.stderr}`);
    } else {
        let target_id = data.stdout.substr(data.stdout.indexOf(ID_PATH) + ID_PATH.length).split('\n')[0];
        target[target_id] = sym_link;
    }

    length2++;
    if (length1 == length2) {
        compare_map();
    }
}

module.exports = check_serial;
