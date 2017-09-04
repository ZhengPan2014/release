var UI = UI || {
	waypointColorMapping: {
		'map': '#ffc107',
		'home': '#e91e63'
	},
	wpMenuDisp: false,
	wpMapping: {},

	initStage: () => {
		UI.width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
        UI.height = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
        let mapNavCanvas = document.createElement('canvas');
        mapNavCanvas.width = UI.width;
        mapNavCanvas.height = UI.height;
        $('#mapNavDiv').append(mapNavCanvas);
		UI.stage = new createjs.Stage(mapNavCanvas);
		createjs.Touch.enable(UI.stage);
		UI.stage.update();
	},

	dispMap: (message) => {
		UI.mapInfo = message.info;
		let innerCanvas = document.createElement('canvas');
		let innerCtx = innerCanvas.getContext('2d');
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
				  imageData.data[i] = 40;
				  // g
				  imageData.data[++i] = 53;
				  // b
				  imageData.data[++i] = 147;
				  // a
				  imageData.data[++i] = 255;

			  } else if (data === 0) {
				  // r
				  imageData.data[i] = 232;
				  // g
				  imageData.data[++i] = 234;
				  // b
				  imageData.data[++i] = 246;
				  // a
				  imageData.data[++i] = 127;
			  } else {
				  // r
				  imageData.data[i] = 245;
				  // g
				  imageData.data[++i] = 245;
				  // b
				  imageData.data[++i] = 245;
				  // a
				  imageData.data[++i] = 0;
			  }
			}
		}// for
		innerCtx.putImageData(imageData, 0, 0);
		var bitmap = new createjs.Bitmap(innerCanvas);
		bitmap.scaleX = UI.width / message.info.width;
		bitmap.scaleY = UI.height / message.info.height;
		UI.scale = {
			x: bitmap.scaleX,
			y: bitmap.scaleY
		};
		UI.stage.addChild(bitmap);
		bitmap.on('dblclick', UI._mapDbClickHandle);
		UI.stage.update();
	},

	dispWaypoints: (message) => {
		UI.wpMapping = {}
		for (let i = 0; i < message.waypoints.length; i++)
		{
			let waypoint = message.waypoints[i];
			let color = UI.waypointColorMapping[waypoint.header.frame_id];
			let wpShape = new createjs.Shape();
			wpShape.name = waypoint.name;
			let wpXY = UI._mapToPx({
				x: waypoint.pose.position.x,
				y: waypoint.pose.position.y,
			});
			wpShape.graphics.beginFill(color).drawCircle(0, 0, 6);
			let wpContainer = new createjs.Container();
			wpContainer.x = wpXY.x;
			wpContainer.y = wpXY.y; 
			wpContainer.addChild(wpShape);
			UI.stage.addChild(wpContainer);
			wpShape.on('click', UI._wpClickHandle);
			// add to wpMapping
			UI.wpMapping[wpShape.name] = {
				rosPos: waypoint.pose,
				pxPos: {
					position: wpXY,
					orientation: '' //TODO orientation
				},
				color: color
			};
		}
		UI.stage.update();
		console.log(UI.wpMapping);
	},

	dispRobotPose: (message) => {

	},

	updateMapName: (name) => {
		$('#mapName').text(name);
	},

	_QuaternionToTheta: (orientation) => {
		var q0 = orientation.w;
    	var q1 = orientation.x;
    	var q2 = orientation.y;
    	var q3 = orientation.z;
    	// Canvas rotation is clock wise and in degrees
    	return -Math.atan2(2 * (q0 * q3 + q1 * q2), 1 - 2 * (q2 * q2 + q3 * q3)) * 180.0 / Math.PI;
	},

	_mapToPx: (wpXY) => {
		return {
			x: Math.round((wpXY.x - UI.mapInfo.origin.position.x) / UI.mapInfo.resolution * UI.scale.x),
			y: Math.round((wpXY.y - UI.mapInfo.origin.position.y) / UI.mapInfo.resolution * UI.scale.y)			
		};
	},

	_pxToMap: (pos) => {
		return {
			x: pos.x * UI.mapInfo.resolution / UI.scale.x + UI.mapInfo.origin.position.x,
			y: pos.y * UI.mapInfo.resolution / UI.scale.y + UI.mapInfo.origin.position.y
		};
	},

	_wpClickHandle: (event) => {
		console.log('wp clicked');
		var bomb_boxsObj = $('#bomb_boxs');
		if (UI.wpMenuDisp)
		{
			return;
		}
		var bomb_boxsWidth = bomb_boxsObj.css('width');
		var bomb_boxsHeight = bomb_boxsObj.css('height');
		bomb_boxsWidth = bomb_boxsWidth.substr(0, bomb_boxsWidth.length-2);
		bomb_boxsHeight = bomb_boxsHeight.substr(0, bomb_boxsHeight.length-2);
		var wpName = event.currentTarget.name;
		var pos = {
			x: UI.wpMapping[wpName].pxPos.position.x - 0.5 * parseFloat(bomb_boxsWidth),
			y: UI.wpMapping[wpName].pxPos.position.y - 0.5 * parseFloat(bomb_boxsHeight)
		};
		bomb_boxsObj.css('opacity', '1');
		bomb_boxsObj.css('left', pos.x);
		bomb_boxsObj.css('top', pos.y);
		for (var i = 0; i < 8; i++)
		{
			((i) => {
				setTimeout(function(){
					var domName = `#bomb_boxs_${i+1}`;
					$(domName).css('opacity', '1');
			}, 150 + i * 50);
			})(i);
		}
		UI.wpMenuDisp = true;
	},

	_mapDbClickHandle: (event) => {
		console.log('map click');
		alert('map click');
	}
};

$(() => {
	// initialize
	let url = 'ws://192.168.0.14:9090';
	NAV.init(url);
	UI.initStage();
	NAV.dispMapAndWps('/map');
	NAV.subShellFeedback();

	$('#bomb_boxs_3').on('click', undispWpMenu);
});

function undispWpMenu()
{
	var bomb_boxsObj = $('#bomb_boxs');
	bomb_boxsObj.css('opacity', '0');
	bomb_boxsObj.css('left', -125);
	bomb_boxsObj.css('top', -125);
	for (var i = 0; i < 8; i++)
	{
		var domName = `#bomb_boxs_${i+1}`;
		$(domName).css('opacity', '0');
	}
	UI.wpMenuDisp = false;
}

