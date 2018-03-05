'use strict';
const Promise = require('promise');

let roslog = {
	debug: debugFunc,
	info: infoFunc,
	warn: warnFunc,
	error: errorFunc
}

function debugFunc(contents)
{
	let contentsStr = JSON.stringify(contents);
	let info = contentsStr;
	if (contentsStr.startsWith(`"`));
		info = contentsStr.substr(1, contentsStr.length-2);
	let cout = `[DEBUG][${new Date().getTime()}](ros): ${info}`;
	console.log(cout);
}

function infoFunc(contents)
{
	let contentsStr = JSON.stringify(contents);
	let info = contentsStr;
	if (contentsStr.startsWith(`"`));
		info = contentsStr.substr(1, contentsStr.length-2);
	let cout = `[INFO][${new Date().getTime()}](ros): ${info}`;
	console.log(cout);
}

function warnFunc(contents)
{
	let contentsStr = JSON.stringify(contents);
	let info = contentsStr;
	if (contentsStr.startsWith(`"`));
		info = contentsStr.substr(1, contentsStr.length-2);
	let color = '\x1b[33m';
	let cout = `[WARN][${new Date().getTime()}](ros): ${info}`;
	let colorReset = '\x1b[0m';
	console.log(color + cout + colorReset);
}

function errorFunc(contents)
{
	let contentsStr = JSON.stringify(contents);
	let info = contentsStr;
	if (contentsStr.startsWith(`"`));
		info = contentsStr.substr(1, contentsStr.length-2);
	let color = '\x1b[31m';
	let cout = `[ERROR][${new Date().getTime()}](ros): ${info}`;
	let colorReset = '\x1b[0m';
	console.log(color + cout + colorReset);
}


/**
 * async sleep
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

module.exports = {
	roslog: roslog,
	sleep: sleep
};