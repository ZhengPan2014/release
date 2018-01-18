'use strict';
const shell = require('shelljs');
const Promise = require('promise');

/**
 * Promise style shell.exec()
 * @param  {string|string[]} cmds    
 * @param  {object}          options shell.exec() options, Default: {silent: true}
 * @return {Promise}         
 */
function exec(cmds, options)
{
	let cmdsList = typeof cmds === 'string' ? [cmds] : cmds;
	let commands = cmdsList.join(';');
	let opts = options || {silent: true};
	return new Promise((resolve, reject) => {
		shell.exec(commands, opts, (code, stdout, stderr) => {
			if (code)
            {
                // git commit returns error code 1 without any stderr, when the working directory is clean.
                if (!stderr && commands.startsWith('git commit'))
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

module.exports = {
	exec: exec,
}