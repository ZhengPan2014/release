'use strict';

const fs = require('fs');
const shell = require('shelljs');
const Promise = require('promise');

/**
 * Promise wrapper for shelljs.exec()
 * @param  {string|string[]}  cmd     : shell cmd
 * @param  {Object}           options : shelljs.exec() options, {silent: true} by default
 * @return {Promise}         
 */
function asyncShell(cmd, options)
{
	let cmdList = typeof cmd === 'string' ? [cmd] : cmd;
	let cmds = cmdList.join(';');
	let execOptions = options || {silent: true};
	return new Promise((resolve, reject) => {
		shell.exec(cmds, execOptions, (code, stdout, stderr) => {
			if (code)
			{
				// git commit returns error code 1 without any stderr, when working directory is clean.
				if (!stderr && cmd.startsWith('git commit'))
				{
					resolve(stdout);
				}
				else
				{
					reject({
						code: code,
						stderr: stderr
					});	
				}
			}
			else
			{
				resolve(stdout);
			}
		});
	});
}

/**
 * Promise wrapper for fs.readFile()
 * @param  {string} file          : 
 * @param  {Object|string} options : 'utf8' by default;
 * @return {string|Buffer}  
 */
function readFile(file, options)
{
	let opt = options || 'utf8';
	return new Promise((resolve, reject) => {
		fs.readFile(file, opt, (err, data) => {
			if (err)
			{
				reject(err);
			}
			else
			{
				resolve(data);
			}
		});
	});
}

/**
 * Promise wrapper for fs.writeFile()
 * @param  {string} file    :
 * @param  {string} data    :
 * @param  {Object|string} options :
 */
function writeFile(file, data, options)
{
	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, (err) => {
			if (err)
			{
				reject(err);
			}
			else
			{
				resolve();
			}
		});
	});
}

module.exports = {
	shell: asyncShell,
	readFile: readFile,
	writeFile: writeFile
};