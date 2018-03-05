'use strict';

const yaml = require('js-yaml');

class {{name}}
{
	constructor(nodes, params)
	{
		let nodes_ = nodes || []
		let params_ = params || [];
		this.isVLaunch = true;
		this.roslaunch = null;
		this.nodes = {};
		this.params = {};
		/*******************************************************************************/
		/*********************************** Nodes ************************************/
		{% for node in nodes %}
		this.nodes["{{node.name}}"] = nodes_["{{node.name}}"] || {
			pkg: "{{node.package}}", 
			type: "{{node.type}}",
			machine: "{{node.machine_name}}",
			ns: "{{node.namespace}}",
			args: "{{node.args}}",
			output: "{{node.output}}",
			respawn: "{{node.respawn}}",
			respawn_delay: "{{node.respawn_delay}}",
			launch_prefix: "{{node.launch_prefix}}",
			required: "{{node.required}}",
			remap_args: "{{node.remap_args}}"
		};
		{% endfor %}

		/*******************************************************************************/
		/*********************************** Params ************************************/
		{% for param in params %}
		this.params["{{param[0]}}"] = params_["{{param[0]}}"] || "{{param[1]}}";
		{% endfor %}
		/*******************************************************************************/
	}
	get launch()
	{
		if (!this.roslaunch)
		{
			this.roslaunch = '<launch>\n\n';
			// rosnodes
			for (let node in this.nodes)
			{
				this.roslaunch += `<node name="${node}"`;
				let nodeParams = this.nodes[node];
				for (let param in nodeParams)
				{
					if (param === 'remap_args' || param === 'env_args')
					{
						continue;
					}
					let value = nodeParams[param];
					if (!value || this.isFalse(value))
					{
						continue;
					}
					this.roslaunch += ` ${param}="${value}"`;
				}
				this.roslaunch += ' >\n';
				// remap
				nodeParams['remap_args'] = nodeParams['remap_args'].replace(/u/g, "");
				let remapArgs = this.parseRemapArgs(nodeParams['remap_args']);

				if (remapArgs.length !== 0)
				{
					for (let remap of remapArgs)
					{
						this.roslaunch += `\t<remap from="${remap[0]}" to="${remap[1]}"/>\n`;	
					}
				}
				this.roslaunch += '</node>\n\n';
			}

			// rosparams
			this.roslaunch += '\n<rosparam>\n';
			this.roslaunch += yaml.safeDump(this.params);
			this.roslaunch += '</rosparam>\n';
			this.roslaunch += '</launch>';
		}
		return this.roslaunch;
	}
	updateParam(params)
	{
		for (let key in params)
		{
			if (this.params.hasOwnProperty(key))
			{
				this.params[key] = params[key];
			}
		}
		this.roslaunch = null;
	}
	get prettyLaunchStr()
	{
		let prettyLaunch = '\x1B[7m';
		for (let node in this.nodes)
		{
			prettyLaunch += `[${node.name}]`;
		}
		return prettyLaunch + '\x1B[27m';
	}
	parseRemapArgs(remapArgs)
	{
		let ret = []
		if (remapArgs === '[]')
		{
			return ret;
		}
		let args = remapArgs.slice(1, remapArgs.length-1);
		let rawArgs = args.split(',');
		for (let i = 0; i < rawArgs.length-1; i += 2)
		{
			let rawFrom = rawArgs[i].trim();
			let rawTo = rawArgs[i+1].trim();
			let from = rawFrom.slice(2, rawFrom.length-1);
			let to = rawTo.slice(1, rawTo.length-2);
			ret.push([from, to]);
		}
		return ret;
	}
	isFalse(str)
	{
		return str === 'None' 
			|| str === '/'
			|| str === 'False'
			|| str === '0.0'
	}
}
module.exports = {{name}};