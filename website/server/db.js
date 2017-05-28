'use strict';

var Sequelize = require('sequelize');
var fs = require('fs');
var os = require('os');

var sequelize = null;
var User = null;
var AuthCode = null;
var OpRecord = null;

function init(){
	var hostname = os.hostname();
	var model = hostname.split('-')[1];
	fs.exists('../../src', function(result){
		if (result)
		{
			var configPath = '../../src/bringup/auth/' + model + '/hitrobot.cfg';
		}
		else
		{
			var configPath = '../../install/share/bringup/auth/' + model + '/hitrobot.cfg';
		}
		fs.readFile(configPath, function(err, data){
			if (err)
			{
				// TODO
				console.log("'hitrobot.cfg' not found.\nNodeJs started without connection to MySQL.");
			}
			else
			{
				var config = JSON.parse(data);
				connect(config.mysql);
				// test the connection
				sequelize.authenticate()
	  				.then(function(err) {
	    				console.log('Connection has been established.');
	    				defineUser();
						defineAuthCode();
						defineOpRecord();
	  				})
	  				.catch(function (err) {
	  					//console.log("\x1b[31m", "MySQL connecction error.", "\x1b[0m");
	  					try{
	  						createDatabase(config.mysql);
	  						defineUser();
							defineAuthCode();
							defineOpRecord();	
	  					}
	  					catch(e){
	  						var errMsg = "Cannot find module 'child_process'";
	  						errMsg += "\nTry 'npm install child_process' or create database manually.";
	  						console.log("\x1b[31m", errMsg, "\x1b[0m");
	  					}
	  				});
			}// else
		}); // fs.readFile
	});
}

function createDatabase(config)
{
	var exec = require('child_process').exec;
	var user = config.user;
	var password = config.password;
	var database = config.database;
	var cmd = "mysql -u " + user + " -p" + password + " -e 'create database " + database + "';";
	exec(cmd, function(error, stdout, stderr){
		if (error)
		{
			console.log('\x1b[31m', `createDatabase error: ${error}`, '\x1b[0m');
			return;
		}
	});
}

function connect(config)
{
	sequelize = new Sequelize(config.database, config.user, config.password, 
	    {
	        host: 'localhost',
	        dialect: 'mysql',
	        pool: 
	            {
	                max: 50,
	                min: 0,
	                idle: 10000
	            },
	        timezone: '+08:00',
	    });
}


// table: user
// +----+-------+-----------+---------------------+--------+---------+
// | ID | name  | pwd       | auth                | time   | mark    |
// +----+-------+-----------+---------------------+--------+---------+
// |  1 | string| string    | super/admin/tech/op | double | string  |
// +----+-------+-----------+---------------------+--------+---------+
function defineUser(){
	User = sequelize.define('user',{
	    name: {
	        type: Sequelize.STRING,
	        allowNull: false
	    },
	    pwd:{
	        type: Sequelize.STRING,
	        allowNull: false
	    },
	    auth: {
	        type: Sequelize.STRING,
	        allowNull: false
	    },
	    time: {
	        type: Sequelize.DOUBLE,
	        allowNull: false
	    },
	    mark: {
	        type: Sequelize.STRING,
	        allowNull: true
	    },
	},
	{
	    freezeTableName: true
	});
	User.sync({force: false})
		.then(function(result){})
		.catch(function(err){
		});
}


// table: auth_code
// +----+-------+-----------+------------+-------------------------+
// | ID | code  | name      | time       | auth                    |
// +----+-------+-----------+------------+-------------------------+
// |  1 | string| string    | double     | super/ admin/ tech/ op  |
// +----+-------+-----------+------------+-------------------------+
function defineAuthCode(){
	AuthCode = sequelize.define('auth_code',{
	    code: {
	        type: Sequelize.STRING,
	        allowNull: false
	    },
	    name: {
	        type: Sequelize.STRING,
	        allowNull: false
	    },
	    time: {
	        type: Sequelize.DOUBLE,
	        allowNull: false
	    },
	    auth: {
	        type: Sequelize.STRING,
	        allowNull: false
	    }
	},
	{
	    freezeTableName: true
	});
	AuthCode.sync({force: false})
		.then(function(result){})
		.catch(function(err){
		});
}

// table: op_record
// operation records
// +----+-------+-----------+------------+
// | ID | time  | name      | operation  |
// +----+-------+-----------+------------+
// |  1 | Date  | string    | string     |
// +----+-------+-----------+------------+
function defineOpRecord(){
	OpRecord = sequelize.define('op_record', {
	    time: {
	        type: Sequelize.DATE,
	        allowNull: false
	    },
	    name: {
	        type: Sequelize.STRING,
	        allowNull: false
	    },
	    operation: {
	        type: Sequelize.STRING,
	        allowNull: false
	    }
	},
	{
	    freezeTableName: true
	});
	OpRecord.sync({force: false})
		.then(function(result){})
		.catch(function(err){
		});
}

function delAuthCode(days)
{
    var validInteval = 86400000 * days;
    var p = new Date().getTime() - validInteval;
    AuthCode.destroy({
        where: {
            time: {
                $lt: p
            }
        }
    }).then(function(result){
        console.log('Invalid auth code deleted');
    });
}

module.exports = {
    User: User,
    AuthCode: AuthCode,
    OpRecord: OpRecord,
    init: init
};
