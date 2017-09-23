'use strict';
var models = models || {
	cached: {},
	map: mapModel,
	robot: robotModel,
	waypoint: {
		map: waypointMapModel,
	},
    globalPlan: planModel,
    localPlan: planModel,
};

// params:
// 	1. nav_msgs/OccupancyGrid map
// 	2. options:
// 		int8[] clear: [r, g, b, a], [232, 234, 246, 63] by default
// 		int8[] obstacle: [r, g, b, a], [40, 53, 147, 255] by default
// 		int8[] unexplored: [r, g, b, a], [245, 245, 245, 5] by default
// return:
// 	createjs.Bitmap 
function mapModel(map, options)
{
	var options = options || {
		clear: [232, 234, 246, 63],
		obstacle: [40, 53, 147, 255],
		unexplored: [245, 245, 245, 5]
	};
	var color = {
		clear: {
			r: options.clear[0],
			g: options.clear[1],
			b: options.clear[2],
			a: options.clear[3]
		},
		obstacle: {
			r: options.obstacle[0],
			g: options.obstacle[1],
			b: options.obstacle[2],
			a: options.obstacle[3]
		},
		unexplored: {
			r: options.unexplored[0],
			g: options.unexplored[1],
			b: options.unexplored[2],
			a: options.unexplored[3]
		}
	};
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = map.info.width;
	canvas.height = map.info.height;
	var imageData = ctx.createImageData(canvas.width, canvas.height);
	for (var row = 0; row < canvas.width; row++)
	{
		var rowOffset = (canvas.height - row - 1) * canvas.width;
		for (var col = 0; col < canvas.height; col++)
		{
			var mapI = col + rowOffset;
			var data = map.data[mapI];
			var i = (col + (row * canvas.width)) * 4;
			if (data === 100)
			{
				imageData.data[i] = color.obstacle.r;
			  	imageData.data[++i] = color.obstacle.g;
			  	imageData.data[++i] = color.obstacle.b;
				imageData.data[++i] = color.obstacle.a;
			}
			else if (data === 0)
			{
				imageData.data[i] = color.clear.r;
			  	imageData.data[++i] = color.clear.g;
			  	imageData.data[++i] = color.clear.b;
				imageData.data[++i] = color.clear.a;
			}
			else
			{
				imageData.data[i] = color.unexplored.r;
			  	imageData.data[++i] = color.unexplored.g;
			  	imageData.data[++i] = color.unexplored.b;
				imageData.data[++i] = color.unexplored.a;
			}
		} // for
	} // for
	ctx.putImageData(imageData, 0, 0);
	return new createjs.Bitmap(canvas);
}

function robotModel(options)
{
	var options = options || {};
	var size = options.size || 30;
    var strokeSize = options.strokeSize || 2;
    var strokeColor = options.strokeColor || '#3b6dde'; //e8eaf6
    var fillColor = options.fillColor || '#ffe83b';
    var fillColorExt = options.fillColorExt || createjs.Graphics.getRGB(0,150,136,0.7);
    var graphics = new createjs.Graphics();
    graphics.beginFill(fillColorExt);  
    graphics.drawCircle(size*2,size*2,size*1.5);  
    graphics.endFill();
    graphics.beginFill(fillColor);  
    graphics.drawCircle(size*2,size*2,size/1.2);  
    graphics.endFill();
    graphics.setStrokeStyle(strokeSize);
    graphics.beginFill(fillColor);
    graphics.moveTo(size*2, size*0.6);
    graphics.lineTo(size*1.3, size*2);
    graphics.lineTo(size*2.7, size*2);
    graphics.closePath()
    graphics.endFill();
    graphics.endStroke();
    return modelWrapper(graphics, {
        regX: size * 2,
        regY: size * 2,
        rotation: 90,
        scaleX: 0.25,
        scaleY: 0.25,
    });
}

function waypointMapModel(options)
{
    var options = options || {};
	var size = options.size || 20;
    var strokeSize = options.strokeSize || 10;
    var strokeColor = options.strokeColor || 'rgba(0,0,0,0)';
    var fillColor = options.fillColor || '#0f89f5';
    var graphics = new createjs.Graphics();
    graphics.beginFill(fillColor);
    graphics.moveTo(size*2, -size*0.5);
    graphics.lineTo(size*1.25, size/2);
    graphics.lineTo(size*2, size*0.35);
    graphics.lineTo(size*2.75, size/2);
    graphics.beginFill(fillColor); 

    graphics.closePath();
    graphics.setStrokeStyle(strokeSize); 
    graphics.beginStroke(strokeColor);
    graphics.beginFill(fillColor);
    graphics.drawCircle(size*2,size*2,size*1.3);
    graphics.endStroke();
    graphics.endFill();
    var label = null;
    if (options.label)
    {
        label = new createjs.Text(options.label, "60px Arial", "#F00");
    }
    return modelWrapper(graphics, {
        regX: size * 2,
        regY: size * 2,
        rotation: 90,
        scaleX: 0.2,
        scaleY: 0.2,
        label: label
    });
}

// params:
//     1. nav_msgs/Path plan
//     2. Tf tf
//     3. options:
//         int size: path size, 1 by default
//         string color: path color, '#00ff00' by default
// return:
//     createjs.Container
function planModel(plan, tf, options)
{
    var options = options || {};
    var container = new createjs.Container();
    if (plan.poses.length < 2)
    {
        return container;
    }
    var strokeSize = options.size || 1;
    var strokeColor = options.color || createjs.Graphics.getRGB(0,255,0,1);
    var graphics = new createjs.Graphics();
    graphics.setStrokeStyle(strokeSize);
    graphics.beginStroke(strokeColor);
    var posRos = plan.poses[0].pose.position;
    var posPx = tf.mapToCanvas(posRos);
    graphics.moveTo(posPx.x, posPx.y);
    for (var i = 1; i < plan.poses.length; i++)
    {
        posRos = plan.poses[i].pose.position;
        posPx = tf.mapToCanvas(posRos);
        graphics.lineTo(posPx.x, posPx.y);
        graphics.moveTo(posPx.x, posPx.y);
    }
    graphics.endStroke();
    var shape = new createjs.Shape(graphics);
    container.addChild(shape);
    return container;
}

// model wrapper for graphics icon
// params:
//     1. modelGraphics: createjs graphics icon;
//     2. options:
//         regX: the left offset for the registration point
//         regY: the y offset for the registration point
//         scaleX: the factor to stretch horizontally
//         scaleY: the factor to stretch vertically
// return:
//     createjs.Container
function modelWrapper(modelGraphics, options)
{
    var size = options.size || 10;
    var reg = {
        x: options.regX || 0,
        y: options.regY || 0,
        rotation: options.rotation || 0
    };
    var scale = {
        x: options.scaleX || 1,
        y: options.scaleY || 1
    };
    var container = new createjs.Container();
    var shape = new createjs.Shape(modelGraphics);
    shape.regX = reg.x;
    shape.regY = reg.y;
    shape.rotation = reg.rotation;
    container.addChild(shape);
    if (options.label)
    {
        container.addChild(options.label);
    }
    container.scaleX = scale.x;
    container.scaleY = scale.y;
    return container;
}