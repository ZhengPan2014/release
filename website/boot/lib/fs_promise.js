'use strict';
const fs = require('fs');
const Promise = require('promise');

/**
 * Promise style readFile
 * @param  {string}        file    
 * @param  {string|object} options fs.readFile() options
 * @return {Promise}        
 */
function readFile(file, options)
{
	let opts = options || {
		encoding: 'utf8',
		flag: 'r'
	};
	return new Promise((resolve, reject) => {
		fs.readFile(file, opts, (err, data) => {
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
 * Promise style writeFile
 * @param  {string} 	   file    
 * @param  {string}        data    
 * @param  {string|object} options fs.writeFs() options
 * @return {Promise}         
 */
function writeFile(file, data, options)
{
	let opts = options || {
		encoding: 'utf8',
		mode: 0o666,
		flag: 'w'
	};
	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, opts, (err) => {
			if (err)
			{
				reject(err);
			}
			else
			{
				resolve(true);
			}
		});
	});
}

/**
 * load config from file
 * @param  {string}   file   
 * @param  {Function} filter  
 * @return {Promise}        
 */
function loadCfg(file, filter)
{
	return new Promise((resolve, reject) => {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err)
			{
				reject(err);
			}
			else
			{
				try
				{
					if (data.trim() === '')
					{
						data = "{}";
					}
					let jData = JSON.parse(data);
					if (filter)
					{
						let ret = {};
						for (let key in jData)
						{
							if (filter(key))
							{
								ret[key] = jData[key];
							}
						}
						resolve(ret);
					}
					else
					{
						resolve(jData);
					}
				}
				catch(e)
				{
					reject(e);
				}
			}
		});
	});
}

module.exports = {
	readFile: readFile,
	writeFile: writeFile,
	loadCfg: loadCfg,
};