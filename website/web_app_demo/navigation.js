function showMap(){
	var url = 'ws://192.168.0.123:9090';
	var ros = new ROSLIB.Ros();
	ros.connect(url);

	ros.on('connection', function(){
		console.log('connected');
	});

	var mapTopic = new ROSLIB.Topic({
            ros : ros,
            name : '/map_edit',
            messageType : 'nav_msgs/OccupancyGrid'
        });
        mapTopic.subscribe(function(message){
        	mapTopic.unsubscribe();
            var stage = new createjs.Stage('mapNavCanvas');
            stage.width = message.info.width;
            stage.height = message.info.height;

            createjs.Touch.enable(stage);
            var innerCanvas = document.createElement('canvas');
 			var innerCtx = innerCanvas.getContext('2d');

 			innerCanvas.width = message.info.width;
 			innerCanvas.height = message.info.height;

 			var imageData = innerCtx.createImageData(message.info.width, message.info.height);
 			for ( var row = 0; row < message.info.height; row++) {
			    for ( var col = 0; col < message.info.width; col++) {
			      // determine the index into the map data
			      var mapI = col + ((message.info.height - row - 1) * message.info.width);
			      // determine the value
			      var data = message.data[mapI];

			      var i = (col + (row * message.info.width)) * 4;
			      if (data === 100) {
			      	// r
			      	imageData.data[i] = 30;
			      	// g
			      	imageData.data[++i] = 53;
			      	// b
			      	imageData.data[++i] = 87;
			      	// a
			      	imageData.data[++i] = 255;
			      } else if (data === 0) {
			        // r
			      	imageData.data[i] = 218;
			      	// g
			      	imageData.data[++i] = 234;
			      	// b
			      	imageData.data[++i] = 240;
			      	// a
			      	imageData.data[++i] = 255;
			      } else {
			        // r
			      	imageData.data[i] = 240;
			      	// g
			      	imageData.data[++i] = 240;
			      	// b
			      	imageData.data[++i] = 240;
			      	// a
			      	imageData.data[++i] = 255;
			      }
			}
		}// for
		innerCtx.putImageData(imageData, 0, 0);
		var bitmap = new createjs.Bitmap(innerCanvas);
		stage.addChild(bitmap);

		var wps = [[0.655713, -2.36807], [0.641871, 0.555502], [0.589946, 2.88117], [0, 0]];
		var wpNames = ['map_line1', 'map_line2', 'map_line3', 'map_home'];
		
		for (var i = 0; i < wps.length; i++)
		{
			var color = 'red';
			var wp = new createjs.Shape();
			wp.name = wpNames[i];
			var wpXY = wps[i];
			if (wpXY[0] == 0 && wpXY[1] == 0)
			{
				color = 'green';
			}
			var pos = mapToPx(wpXY, message.info);
			wp.graphics.beginFill(color).drawCircle(0, 0, 0.3/message.info.resolution);
			var wpContainer = new createjs.Container();
			wpContainer.x = pos[0];
			wpContainer.y = pos[1];
			wpContainer.addChild(wp);
			stage.addChild(wpContainer);

			//stage.addChild(wp);	
			wp.on('dblclick', wpDbclickHandle);
			wpContainer.on('pressmove', function(event){
				event.currentTarget.x = event.stageX;
				event.currentTarget.y = event.stageY;
				stage.update();
			});
		}
		stage.update();
        });
	}

function wpDbclickHandle(event)
{
	console.log(event.target.name);
}

function mapToPx(pos, mapInfo)
{
	var resolution = mapInfo.resolution || 0.05;
	var orgX = mapInfo.origin.position.x || -20;
	var orgY = mapInfo.origin.position.y || -20;
	var x = (pos[0] - orgX) / resolution;
	var y = (pos[1] - orgY) / resolution;
	return [x, y];
}

$(function(){
	showMap();	
})
