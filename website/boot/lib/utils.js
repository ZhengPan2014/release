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

function find(target, match, begin, end)
{
	let begin_ = begin || 0;
	let end_ = end || target.length;
	for (let index = begin_; index < end_; index++)
	{
		if (target[index] === match)
		{
			return index;
		}
	}
	return -1;
}

function rfind(target, match)
{
	for (let index = target.length-1; index > -1; index--)
	{
		if (target[index] === match)
		{
			return index;
		}
	}
	return -1;
}

function find_all(target, match)
{
	let ret = [];
	for (let index = 0; index < target.length; index++)
	{
		if (target[index] === match)
		{
			ret.push(index);
		}
	}
	return ret;
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
	},
	find: find,
	rfind: rfind,
	find_all: find_all
};