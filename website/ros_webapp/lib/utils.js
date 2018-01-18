'use strict';

const Promise = require('promise');
let chalk;
try
{
	chalk = require('chalk');
}
catch(e)
{
	chalk = {
		red: (args) => {return args},
		yellow: (args) => {return args}
	};
}

/**
 * Promise style sleep
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

function info()
{
	let out = `[INFO] [${new Date().getTime()}](rosnodejs) `;
	for (let arg of arguments)
	{
		out += arg;
		out += ', ';
	}
	console.log(out.substr(0, out.length-2));
}

function warn()
{
	let out = `[WARN] [${new Date().getTime()}](rosnodejs) `;
	for (let arg of arguments)
	{
		out += arg;
		out += ', ';
	}
	console.log(chalk.yellow(out.substr(0, out.length-2)));
}

function error()
{
	let out = `[ERROR] [${new Date().getTime()}](rosnodejs) `;
	for (let arg of arguments)
	{
		out += arg;
		out += ', ';
	}
	console.log(chalk.red(out.substr(0, out.length-2)));
}

module.exports = {
	sleep: sleep,
	roslog: {
		info: info,
		warn: warn,
		error: error
	}
};