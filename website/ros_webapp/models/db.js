'use strict';

const fs = require('fs');
const Sequelize = require('sequelize');

var paramServer = require('../lib/init').paramServer;

var sequelize = null;

const sequelizeTypes = {
	'string': Sequelize.STRING,
	'double': Sequelize.DOUBLE,
	'date': Sequelize.DATE,
	'int': Sequelize.INTEGER
};

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
			timezone: '+08:00'
		});
}	

function defineModel(name, attributes)
{
	var attrs = {};
	for (var key in attributes)
	{
		var value = attributes[key];
		if (typeof value !== 'object')
		{
			attrs[key] = {
				type: sequelizeTypes[value],
				allowNull: false,
			};
		}
		else
		{
			var allowNull = value['allowNull'] || false;
			attrs[key] = {
				type: sequelizeTypes[value['type']],
				allowNull: allowNull
			};
		}
	}
	var model = sequelize.define(name, attrs, {
		freezeTableName: true
	});

	model.sync({force: false})
		.then(function(result){
			// paramServer.setParam({name: model})
		})
		.catch(function(err){
	});
	return model;
}

function addModels()
{
	var files = fs.readdirSync(__dirname);
	var jsFiles = files.filter( (f) => {
		var model = paramServer.getParam('model');
		var fSplited = f.split('_');
		return f.endsWith('.js') && (fSplited[0] == model);
	});
	var exportModels = {};

	for (var f of jsFiles)
	{
		console.log(`Process model: ${f}...`);
		var models = require(`${__dirname}/${f}`);
		for (var key in models)
		{
			var rawModel = models[key];
			var name = rawModel['name'];
			var table = rawModel['table'];
			console.log(`Define model: ${name}`);
			var model = defineModel(name, table);
			exportModels[name] = model;
		}
	}
	return exportModels;
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

function init(config)
{
	connect(config);
	sequelize.authenticate()
		.then(function(){
			console.log('Connected to MySQL.');
			paramServer.setParam(addModels());
		})
		.catch(function(err){
			createDatabase(config);
			paramServer.setParam(addModels());
		});
}

module.exports.initMysql = init;




