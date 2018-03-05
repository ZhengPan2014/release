'use strict';
const roslog = require('./roslog').roslog;
const readFile = require('./async_shell').readFile;
const writeFile = require('./async_shell').writeFile;

/**
 * read cfg
 * @param  {string} cfg : cfg file, ~/workspace/hitrobot/.cfg
 * @return {Object}     : Json of cfg
 */
async function readParams(cfg)
{
	let cfgFile = cfg || `${process.env.PATH_BRINGUP}/param/.cfg`;
	let params;
	try
	{
		params = JSON.parse(await readFile(cfgFile));
	}
	catch(e)
	{
		roslog.error(e);
	}
	return params;
}

module.exports = readParams;