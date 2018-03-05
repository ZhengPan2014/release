'use strict';

const Promise = require('promise');
const fs = require('fs');
const EventEmitter = require('events');
const parseStr = require('xml2js').parseString;

const pFs = require('./fs_promise');
const createEnv = require('./template.js');
const utils = require('./utils');

const PATTERN = './launcher_pattern.js';

let launcherNum = 0;
let processedNum = 0;
let convertedNum = 0;
const emitter = new EventEmitter();
emitter.on('done', cleanUp);

function loadLaunch(file)
{
	return new Promise((resolve, reject) => {
		parseStr(file, (err, result) => {
			if (err)
			{
				reject(err);
			}
			else
			{
				resolve(result);
			}
		});
	});
}

function launchToArgMap(launch)
{
	if (!launch.launch.hasOwnProperty('group'))
	{
		return {};
	}
	if (!launch.launch.group[0].hasOwnProperty('arg'))
	{
		return {};
	}
	let args = launch.launch.group[0].arg;
	let ret = {};
	for (let arg of args)
	{	
		ret[arg['$']['name']] = arg['$']['default'];
	}
	return ret;
}

function launch2Js(launchFile, dest, env)
{
	fs.readFile(launchFile, (err, data) => {
		if (err)
		{
			console.log(err);
			return;
		}
		else
		{
			parseStr(data.toString(), (err, result) => {
				if (err)
				{
					console.log(err);
					return;
				}
				else
				{
					let params = launchToArgMap(result);
					let name = launchFile.substring(utils.rfind(launchFile, '/')+1, utils.rfind(launchFile, '.'));
					let ret = env.render(PATTERN, {
						name: name, 
						params: params
					});
					let output = dest.endsWith('.js') ? dest : dest.endsWith('/') ? dest + name + '.js' : dest + '/' + name + '.js';
					fs.writeFile(output, ret, (err) => {
						if (err)
						{
							console.log(err);
							return;
						}
						else
						{
							let shortName = launchFile.substring(utils.rfind(launchFile, '/')+1);
							console.log(`--Converted [${shortName}] to [${output}]`);
							convertedNum++;
						}
					});
				}
			}); // parseStr
		}
	}); // fs.readFile
	processedNum++;
	if (processedNum === launcherNum)
	{
		emitter.emit('done');
	}
}

function showUsae()
{
	console.log('Usage: launch2js [OPTION]... LAUNCH... JS');
	console.log('\t-r, convert all launch files in LAUNCH to JS');		
}

async function cleanUp()
{
	await utils.sleep(30*launcherNum);
	console.log(`Processed ${launcherNum} launch files, ${convertedNum} converted successfully.`);
	process.exit(0);
}

async function main()
{
	let option = process.argv[2] || '';
	let launches;
	let dest;
	if (option.trim() === '-r')
	{
		if (process.argv.length < 5)
		{
			showUsae();
			return;
		}
		if (process.argv[3].endsWith('.launch'))
		{
			showUsae();
			console.log('launch2Js with option [-r] needs a folder as launch target');
			return;
		}
		if (process.argv[4].endsWith('.js'))
		{
			showUsae();
			console.log('launch2Js with option [-r] needs a folder as destination');
			return;
		}
		let launchPrefix = process.argv[3].endsWith('/') ? process.argv[3] : process.argv[3] + '/';
		dest = process.argv[4];
		let files = fs.readdirSync(process.argv[3]);
		let shortlaunches = files.filter((f) => {
			return f.endsWith('.launch');
		});
		launches = shortlaunches.map((l) => {
			return launchPrefix + l;
		});
	}
	else
	{
		if (process.argv.length < 4)
		{
			showUsae();
			return;
		}
		dest = process.argv[3];
		launches = [process.argv[2]];
	}
	launcherNum = launches.length;
	let env = createEnv('./', {
		watch: true,
		filters: {
			hex: function(n){
				return '0x' + n.toString(16);
			}
		}
	});
	for (let launch of launches)
	{
		let shortName = launch.substring(utils.rfind(launch, '/')+1);
		console.log(`--Converting [${shortName}]`);
		launch2Js(launch, dest, env);
	}
}
main();
