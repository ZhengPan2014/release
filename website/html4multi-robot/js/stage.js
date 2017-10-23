'use strict';

class Stage extends EventEmitter2
{
	// params:
	// 	1. int width: window with;
	// 	2. int height: window height;
	// 	3. string div: div ID for canvas;
	//  4. ROSLIB.Ros ros
	// 	4. options:
	// 		int fps: stage fps, 25 by default;
	//      bool enableTouch: true by default;
	//		string mapId: '' by default;
	constructor(width, height, div, ros, options)
	{
		super();
		// params
		this.width = width;
		this.height = height;
		this.div = div;
		this.ros = ros;
		var options = options || {};
		this.fps = options.fps || 25;
		this.enableTouch = options.enableTouch || true;
		this.mapId = options.mapId || '';
		// declare
		this.stage = null;
		this.map = null; 
		this.mapInfo = null;
		this.robots = {};
		this.mapBitmap = null;
		this.mapScale = null;
		this.robotModel = null;
		this.scale = 1;
		
		var canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
		document.getElementById(this.div).appendChild(canvas);
		this.stage = new createjs.Stage(canvas);
		if (this.enableTouch)
		{
			createjs.Touch.enable(this.stage);
		}
		createjs.Ticker.setFPS(this.fps);
		createjs.Ticker.addEventListener('tick', () => {
			this.stage.update();
		});
	}

	dispMap()
	{
		this.map = new RobotMap(this.ros, this.mapId);
		this.map.dispMap();
		this.map.on('map', (map) => {
			this.mapInfo = this.addMap(map);
			super.emit('map', this.mapInfo);
		});
	}

	// params:
	// 	1. nav_msgs/OccupancyGrid map
	// return:
	// {
	// 	scale: {
	// 		float x: bitmap.scaleX,
	// 		float y: bitmap.scaleY
	// 	},
	// 	reg: {
	// 		float x: bitmap.regX,
	// 		float y: bitmap.regY
	// 	},
	// 	int height: bitmap.image.height,
	// 	origin: {
	// 		int x: origin.x
	// 		int y: origin.y
	// 	}
	// 	float origin: map.info.resolution
	// }
	addMap(map)
	{
		this.removeMap();
		this.mapBitmap = models.map(map);
		var rMap = map.info.width / map.info.height;
		var width = this.width;
		var height = this.height;
		if (this.width > this.height)
		{
			width = height * rMap;
		}
		else
		{
			height = width / rMap;
		}
		this.mapScale = {
			x: width / this.width || 1.0,
			y: height / this.height || 1.0
		};
		this.mapBitmap.scaleX = this.width / map.info.width * this.mapScale.x;
		this.mapBitmap.scaleY = this.height / map.info.height * this.mapScale.y;
		this.mapBitmap.regX = (width - this.width) / 2 || 0;
		this.mapBitmap.regY = (height - this.height) / 2 || 0;
		this.stage.addChild(this.mapBitmap);
		return {
			scale: {
				x: this.mapBitmap.scaleX,
				y: this.mapBitmap.scaleY
			},
			reg: {
				x: this.mapBitmap.regX,
				y: this.mapBitmap.regY
			},
			height: this.mapBitmap.image.height,
			origin: map.info.origin,
			resolution: map.info.resolution
		};
	}

	removeMap()
	{
		if (this.mapBitmap)
		{
			this.stage.removeChild(this.mapBitmap);
			this.scale = 1;
		}
	}

	// params:
	// 	1. Robot robot: instance of Robot
	addRobot(robot)
	{
		if (this.robots.hasOwnProperty(robot.robotId))
		{
			console.log(`[INFO]Robot: ${robot.robotId} already added`);
			return;
		}
		this.robots[robot.robotId] = robot;
		this.stage.addChild(robot.container);
		console.log(`[INFO]Add robot: ${robot.robotId}`);
	}

	// params:
	// 	1. Robot robot: 
	removeRobot(robot)
	{
		this.stage.removeChild(robot.container);
	}

	zoom(scale)
	{
		var tempScale = this.scale * scale;
		if (tempScale < 0.8 || tempScale > 2.0)
		{
			return;
		}
		this.scale *= scale;
		var widthBefore = this.mapBitmap.image.width * this.mapBitmap.scaleX;
		var heightBefore = this.mapBitmap.image.height * this.mapBitmap.scaleY;
		var offset = {
			x: (widthBefore * scale - widthBefore)/2,
			y: (heightBefore * scale - heightBefore)/2
		};
		this.mapBitmap.scaleX *= scale;
		this.mapBitmap.scaleY *= scale;
		this.mapBitmap.regX += offset.x;
		this.mapBitmap.regY += offset.y;
		for (var r in this.robots)
		{
			var robot = this.robots[r];
			robot.zoom(scale, offset);
		}
	}

	move(x, y)
	{
		this.mapBitmap.regX += x;
		this.mapBitmap.regY += y;
		for (var r in this.robots)
		{
			var robot = this.robots[r];
			robot.zoom(1.0, {
				x: x,
				y: y
			});
		}
	}
}