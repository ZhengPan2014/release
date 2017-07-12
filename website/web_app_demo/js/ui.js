var UI = UI || {
	waypointColorMapping: {
		'map': '#1db43c',
		'home': '#e91e63'
	},
	wpMenuDisp: false,
	wpMapping: {},
	// 机器人的graphics
	robot: null,
	initStage: () => {
		UI.width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
        UI.height = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
        var mapNavCanvas = document.createElement('canvas');
        mapNavCanvas.width = UI.width;
        mapNavCanvas.height = UI.height;
        $('#mapNavDiv').append(mapNavCanvas);
		UI.stage = new createjs.Stage(mapNavCanvas);
		createjs.Touch.enable(UI.stage);
		UI.stage.update();
	},
	

	dispMap: (message) => {
		UI.mapInfo = message.info;
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
		bitmap.on('click', UI._mapClickHandle);
		UI.stage.update();
		

	},

	dispWaypoints: (message) => {
		UI.wpMapping = {}
		for (var i = 0; i < message.waypoints.length; i++)
		{
			var waypoint = message.waypoints[i];
			var color = UI.waypointColorMapping[waypoint.header.frame_id];
			var wpShape = new createjs.Shape();
   	 		
			var size = message.size || 10;					//站点大小
			var strokeSize = message.strokeSize || 1.25;		//站点边宽度      
			var strokeColor = message.strokeColor || '#0bc02e'; //站点边颜色
			var fillColor = message.fillColor || '#ff0000';		//站点填充颜色
			var graphics = new createjs.Graphics();
			wpShape.name = waypoint.name;
			wpShape.graphics.setStrokeStyle(strokeSize);
			wpShape.graphics.beginStroke(strokeColor);
	    	wpShape.graphics.moveTo(-size / 2.0, -size / 2.0);
			wpShape.graphics.beginFill(fillColor);
	    	wpShape.graphics.lineTo(size, 0);
	    	wpShape.graphics.lineTo(-size / 2.0, size / 2.0);
		    wpShape.graphics.closePath();
	    	wpShape.graphics.endFill();
	    	wpShape.graphics.endStroke();
	    	
			var wpXY = UI._mapToPx({
				x: waypoint.pose.position.x,
				y: waypoint.pose.position.y,
			});

			var wpContainer = new createjs.Container();
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
					orientation: ''   //TODO orientation，站点的方向
				},
				color: color
			};
		}
		UI.stage.update();
		console.log(UI.wpMapping);
	},
	dispRobotPose: (message) => {
//		console.log(message);
		// 把地图坐标系下的机器人位置转换成画布stage坐标系下的像素坐标
		var pos = UI._mapToPx({
				x: message.position.x,
				y: -message.position.y,
		});
		// _QuaternionToTheta 函数把地图坐标系下的机器人方向转换成画布stage坐标系下，四元数——>角度
		var ori = UI._QuaternionToTheta({
			x: message.orientation.x,
			y: message.orientation.y,
			z: message.orientation.z,
			w: message.orientation.w
		});
		if (!UI.robot)
		{
			// 若还未把机器人画到stage上，则new一个画了机器人的shape，并添加到stage的画布
			// 机器人具体形状，大小，以及颜色等可以传入参数或者直接在_robot函数中修改，参考ros2d.js
			UI.robot = new createjs.Shape(UI._robot({}));
			UI.stage.addChild(UI.robot);
		}
		// 更新机器人的位置和方向
		UI.robot.x = pos.x;
		UI.robot.y = pos.y;
		UI.robot.rotation = ori;
		UI.stage.update();
	},
	//显示轨迹
	globalplannerTopic: (message) => {
		
	},
	// 显示当前地图名称
	updateMapName: (name) => {
		$('#mapName').text(name);
	},
	// 画机器人的形状
	// params：
	// 	options.size: 机器人大小，默认10px
	// 	options.strokeSize: 三角形线条的宽度，默认1px
	// 	options.strokeColor： 三角形线条颜色，默认#F44336
	// 	options.fillColor: 三角形里面的填充颜色，默认#B2EBF2
	// return：
	//	graphics
	_robot: (options) => {
		var size = options.size || 12;
    	var strokeSize = options.strokeSize || 1.75;
   	 	var strokeColor = options.strokeColor || '#2d416f';
    	var fillColor = options.fillColor || '#00ff00';
		var graphics = new createjs.Graphics();
		graphics.setStrokeStyle(strokeSize);
    	graphics.moveTo(-size / 2.0, -size / 2.0);
    	graphics.beginStroke(strokeColor);
    	graphics.beginFill(fillColor);
    	graphics.lineTo(size, 0);
    	graphics.lineTo(-size / 2.0, size / 2.0);
    	graphics.lineTo(size / 10.0, 0);
	    graphics.closePath()[00000000000]
    	graphics.endFill();
    	graphics.endStroke();
    	return graphics;
	},

	// 将ros的四元数转换成stage的角度方向，参考ros2d.js
	// params：
	//	orientation
	// return:	
	//	方向的角度值
	_QuaternionToTheta: (orientation) => {
		var q0 = orientation.w;
    	var q1 = orientation.x;
    	var q2 = orientation.y;
    	var q3 = orientation.z;
    	// Canvas rotation is clock wise and in degrees
    	return -Math.atan2(2 * (q0 * q3 + q1 * q2), 1 - 2 * (q2 * q2 + q3 * q3)) * 180.0 / Math.PI;
	},
	
	// 将ros的map坐标系下的坐标转换成stage图像坐标系下的px坐标
	_mapToPx: (wpXY) => {
		return {
			x: Math.round((wpXY.x - UI.mapInfo.origin.position.x) / UI.mapInfo.resolution * UI.scale.x),
			y: Math.round((wpXY.y - UI.mapInfo.origin.position.y) / UI.mapInfo.resolution * UI.scale.y)			
		};
	},
	
	// 将stage的px坐标转换成ros的map坐标系
	_pxToMap: (pos) => {
		return {
			x: pos.x * UI.mapInfo.resolution / UI.scale.x + UI.mapInfo.origin.position.x,
			y: pos.y * UI.mapInfo.resolution / UI.scale.y + UI.mapInfo.origin.position.y
		};
	},
	
	// 站点单击事件
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

	_mapClickHandle: (event) => {
		console.log('map click');
		$.mobile.changePage("#share", "pop"); 

	}
	
	
};

$(() => {
	// initialize
	//var url = "ws://" + window.location.hostname + ":9090";
	var url = 'ws://192.168.0.207:9090';
	NAV.init(url);
	UI.initStage();
	NAV.dispMapAndWps('/map');
	NAV.subShellFeedback();
		
	
	
	//点击关闭弹出框
	$('#bomb_boxs_3').on('click', undispWpMenu);
	//点击删除站点
	$('#bomb_boxs_4').on('click', undispWpBombbox4);
	
	
	
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
//删除站点链接
function undispWpBombbox4()
{
	swal({
	    title: "确定删除吗？",
	    text: "您将无法恢复这个文件！",
		imageUrl: "image/executes.png",
//	    type: "warning",
	    showCancelButton: true,
	    confirmButtonColor: "#3b6dde",
 	    cancelButtonText: "否",
	    confirmButtonText: "是",
	    closeOnConfirm: false,
	},
	function(){
	    swal("Deleted!", "已删除", "success");
	  });
}

//更新页面内容
var UpdateEvent = UpdateEvent || {
    REVISION: '0.0.6.0-2016-12.27',
    Type: {
        onlineAuto: "在线自动更新",
        offlineAuto: "离线本地更新",
        others: {
        	dbparam: "dbparam",
        	openssh: "openssh",
        	apache: "apache",
        }
    },
    UpdateString: {
        onlineAuto: "update",
        offlineAuto: 'if [ -f ~/release-$ROS_DISTRO.zip ]; then unzip ~/release-$ROS_DISTRO.zip; release-$ROS_DISTRO/install/share/bringup/shell/update-offline.sh; rm -r release-$ROS_DISTRO; rm ~/release-$ROS_DISTRO.zip; rostopic pub -1 /shell_feedback std_msgs/String "update:success"; else  rostopic pub -1 /shell_feedback std_msgs/String "update:failure"; fi;',
        others: {
            dbparam: 'if [ -f /media/`whoami`/*/dbparam-$ROS_DISTRO.zip ]; then unzip /media/`whoami`/*/dbparam-$ROS_DISTRO.zip; cd dbparam-$ROS_DISTRO; ./install.sh; cd ..; rm -r dbparam-$ROS_DISTRO; rm ~/dbparam-$ROS_DISTRO.zip; rostopic pub -1 /shell_feedback std_msgs/String "update:success"; else  rostopic pub -1 /shell_feedback std_msgs/String "update:failure"; fi;',
        	openssh: 'if [ -f /media/`whoami`/*/openssh-$ROS_DISTRO.zip ]; then unzip /media/`whoami`/*/openssh-$ROS_DISTRO.zip; cd openssh-$ROS_DISTRO; ./install.sh; cd ..; rm -r openssh-$ROS_DISTRO; rostopic pub -1 /shell_feedback std_msgs/String "update:success"; else  rostopic pub -1 /shell_feedback std_msgs/String "update:failure"; fi;',
        	apache: 'if [ -f ~/apache-$ROS_DISTRO.zip ]; then unzip ~/apache-$ROS_DISTRO.zip; cd apache-$ROS_DISTRO; ./install.sh; cd ..; rm -r apache-$ROS_DISTRO; rm ~/apache-$ROS_DISTRO.zip; rostopic pub -1 /shell_feedback std_msgs/String "update:success"; else  rostopic pub -1 /shell_feedback std_msgs/String "update:failure"; fi;',
        }
    },
    UpdateType: "在线自动更新",
    UpdateStart: false,
    ConnectStart:false
}
//更新选项
function radio_change(id) {
    UpdateEvent.UpdateType = id;
    if (id == "radio1") {
        swal({
		    title: "在线自动更新",
		    text: "请确认导航板可以连接网络！",
			imageUrl: "image/executes.png",
		    showCancelButton: false,
		    confirmButtonColor: "#3b6dde",
		    confirmButtonText: "确认",
		    closeOnConfirm: false,
		})
    }
    else if (id == "radio2") {
        swal({
		    title: "离线本地更新",
		    text: "请先把dbparam-***.zip文件放置在pkg文件夹中，然后运行update脚本！",
			imageUrl: "image/executes.png",
		    showCancelButton: false,
		    confirmButtonColor: "#3b6dde",
		    confirmButtonText: "确认",
		    closeOnConfirm: false,
		})
    }
    else if (id == "radio3") {
        swal({
		    title: "U盘威尔2升级包",
		    text: "请先把dbparam-***.zip文件放置在U盘根目录下插入导航板！",
			imageUrl: "image/executes.png",
		    showCancelButton: false,
		    confirmButtonColor: "#3b6dde",
		    confirmButtonText: "确认",
		    closeOnConfirm: false,
		})
        UpdateEvent.UpdateType = "dbparam";
    }
    else if (id == "radio4") {
        swal({
		    title: "U盘安装文件传输包",
		    text: "请先把openssh-***.zip文件放置在U盘根目录下插入导航板！",
			imageUrl: "image/executes.png",
		    showCancelButton: false,
		    confirmButtonColor: "#3b6dde",
		    confirmButtonText: "确认",
		    closeOnConfirm: false,
		})
        UpdateEvent.UpdateType = "openssh";
    }
}