'use strict';

const shell = require('shelljs');
const serialport = require('serialport');
const rosnodejs = require('./rosnodejslib/index.js');

class RosNodeJs
{
	constructor(){
		(async () =>{
			let nh = await rosnodejs.initNode('serialjs', {
					onTheFly: true	
				});
			this.diagnostics = nh.subscribe('/diagnostics2', 'diagnostic_msgs/DiagnosticArray', this.check_diagnostics());
		})();
	}

	check_diagnostics(msg){
		return (msg) => {
            // console.log(msg);
			for (let i in msg.status) {
				if (msg.status[i].message === 'open success') {
					let hardware_id = msg.status[i].hardware_id;
					console.log(hardware_id + ":" + msg.status[i].name);
                    shell.exec('sudo ln -sf ' + hardware_id + " /dev/" + msg.status[i].name);
 				}
			}
		};
	}
}

function check_usb() {

	let test = new RosNodeJs();

	setTimeout(function(){
    serialport.list(function(err, ports) {
        ports.forEach(function(port) {
            if (port.pnpId) {
                shell.exec(`roslaunch bringup rosbridge_driver_config.launch driver_port:=${port.comName}`, {silent: true}, function(code, stdout, stderr) {
                    console.log(port.comName + ": " + code);
                })
            }
        });
    });
	},10000);

}


module.exports = check_usb;

                // let serial = new serialport(port.comName, {
                //     baudRate: 9600,
                //     parser: serialport.parsers.byteLength(11)
                // });

                // let is_port = false;
                // serial.on('data', function (data) {
                //     is_port = true;
                //     console.log(`${port.comName} recv:`);
                //     console.log(data);
                //     serial.close(function(error) {
                //         if (error) {
                //             console.log(`${port.comName} close ${error}`);
                //         }
                //     });
                // });

                // serial.on('open', function() {
                //     console.log(`${port.comName} open ${serial.isOpen()}`);
                //     setTimeout(function() {
                //         if (!is_port) {
                //             console.log(`${port.comName} recv timeout`);

                //             // serial.write([0xff, 0xaa, 0x04, 0x06, 0x00], function(err) {
                //             //   if (err) {
                //             //     return console.log('Error on write: ', err.message);
                //             //   }
                //             //   console.log('message written');
                //             // });
                //             // serial.write([0xff, 0xaa, 0x00, 0x00, 0x00], function(err) {
                //             //   if (err) {
                //             //     return console.log('Error on write: ', err.message);
                //             //   }
                //             //   console.log('message written');
                //             // });
                //         }
                //     }, 2000);
                //     setTimeout(function() {
                //         if (serial.isOpen()) {
                //             serial.update({baudRate:115200}, function(err){
                //                 if (err) {
                //                     console.log(`port update ${err}`);
                //                 }
                //             })
                //         }
                //     }, 1000);
                // });        
