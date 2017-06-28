'use strict';

const os = require('os');
const ifaces = os.networkInterfaces();
const net = require("net");
const callfile = require('child_process');

// console.log(ifaces);

function check_ifaces() {
    const wlan = 'wlan';
    const eth = 'eth';
    let has_ap_mode = false;
    for (let dev in ifaces) {
        if (dev.toLocaleLowerCase().indexOf(wlan.toLocaleLowerCase()) != -1) {
            let is_connected = false;
            for (let ipv in ifaces[dev]) {
                if (ifaces[dev][ipv].family === 'IPv4' && net.isIPv4(ifaces[dev][ipv].address)) {
                    is_connected = true;
                    if (ifaces[dev][ipv].address === '10.42.0.1') {
                        has_ap_mode = true;
                    }
                    break;
                }
            }
            if (!is_connected) {
                console.log(dev+":disconnected");
                if (!has_ap_mode) {
                    console.log(dev+":reset to ap");
                    set_ap_mode(dev);
                }
            }
        } else if (dev.toLocaleLowerCase().indexOf(eth.toLocaleLowerCase()) != -1) {
            let is_connected = false;
            for (let ipv in ifaces[dev]) {
                if (ifaces[dev][ipv].family === 'IPv4' && net.isIPv4(ifaces[dev][ipv].address)) {
                    is_connected = true;
                    break;
                }
            }
            if (!is_connected) {
                console.log(dev+":disconnected");
            }
        }
    }
}

function set_ap_mode(dev) {
    callfile.execFile('./comm-reset.sh', ['-d', dev], null, function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }    
    });
}

module.exports = check_ifaces;
