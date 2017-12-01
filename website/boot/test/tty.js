'use strict';

const fs = require('fs');

/**
 * read tty rules
 * @param  {string} file
 * @return {map<pci,symLink>[]}     
 */
function readTTY(file)
{
	let data = fs.readFileSync(file);
	return JSON.parse(data);
}

module.exports = readTTY;