'use strict';

const fs = require('fs');
const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

module.exports = createEnv;

function test()
{

    var env = createEnv('./', {
        watch: true,
        filters: {
            hex: function (n) {
                return '0x' + n.toString(16);
            }
        }
    });



    let s = env.render('launcher_pattern.js', {name: 'drive_aqmd_2', params: {drive_port_left: 'pci-111', drive_port_right: 'pci-222'}});
    console.log(s);

    fs.writeFile('../launchers/test.js', s, (err) => {
    	if (err)
    	{
    		console.log(err);
    	}
    });
}