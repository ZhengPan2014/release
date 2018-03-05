'use strict';
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
// const ws = require('ws');

const controller = require('./lib/controller');
const templating = require('./lib/templating');
const rest = require('./lib/rest');

const init = require('./lib/init');
init.initialize();

const rosNodeJs = require('./rosnodejs/base_ros');
rosNodeJs.startRosNodeJs();

const app = new Koa();
// const WebSocketServer = ws.Server;

const isProduction = (process.env.NODE_ENV === 'production');

app.use(cors());

app.use(async (ctx, next) => {
	console.log(`Process ${ctx.request.method}, ${ctx.request.url}...`);
	var start = new Date().getTime();
	var execTime;	
	await next();
	execTime = new Date().getTime() - start;
	ctx.response.set('X-Response-Time', `${execTime}ms`);
});

if (!isProduction)
{
	let staticFiles = require('./lib/static_files');
	app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(bodyParser());

app.use(templating(__dirname+'/views', {
	noCache: !isProduction,
	watch: !isProduction
}));

app.use(rest.restify());

app.use(controller());

let server = app.listen(8808);

console.log('Nodejs started at port 8808...');