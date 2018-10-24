"use strict";
$(function(){
	var status = 'idle'; // 状态机，默认为空闲状态
	var boxState = 'NoPress'; // 呼叫盒状态 默认没有呼叫
	
	var taskInfo = {
		callBoxInfo: '', // 呼叫盒呼叫信息
		siteTasks:'', 	 // 站点任务队列
		siteName:'', 	 // 站点名称
		robotStatus:'',  // Agv 状态 
		rfidInfo:'', 	 // RFID信息
	}

	var boxStatus = {
		CESHI1:noPress,
		CESHI0:noPress
	}

	var ros = new ROSLIB.Ros();
    var url = 'ws://10.42.0.1:9090';
	ros.connect(url);

	//#region 声明Agv节点任务发布话题
    var navCtrlTopic = new ROSLIB.Topic({
        ros: ros,
        name: '/nav_ctrl',
        messageType: 'yocs_msgs/NavigationControl'
    });
    //#endregion

	//#region AGV的状态 3 完成 4错误
    var robotStatusTopic = new ROSLIB.Topic({
        ros: ros,
        name: '/move_base/status',
        messageType: 'yocs_msgs/NavigationControl'
	});
	robotStatusTopic.subscribe(function(msg){
		taskInfo.robotStatus = msg.status_list[0];//
	})
    //#endregion

	var waypointUserPub = new ROSLIB.Topic({
		ros: ros,
		name: '/waypoint_user_pub',
		messageType: 'std_msgs/String'
	});

	var waypointUserSub = new ROSLIB.Topic({
        ros: ros,
        name: '/waypoint_user_sub',
        messageType: 'std_msgs/String'
	});


	while(true){
		waypointUserSub.subscribe(function(msg){console.log(msg.data)});
		if(status == 'idle'){
			alert();
		}
	}
	
    waypointUserSub.subscribe(function(msg){
		taskInfo.callBoxInfo = msg.data;
		// 确认工位呼叫
		var callBoxAddress = taskInfo.callBoxInfo.substring(0,taskInfo.callBoxInfo.length-2); // 呼叫盒地址
		var callBoxStatus = taskInfo.callBoxInfo.charAt(taskInfo.callBoxInfo.length-1);

		getSiteNameByCallBoxAddress(callBoxAddress);
		
		if(callBoxStatus == '1'){
			// 判断是否为工位呼叫 或 维修点呼叫
			if(taskInfo.siteName!='Fix1' || taskInfo.siteName != 'Fix2'){
				//工位呼叫
				if(boxStatus[taskInfo.siteName] == 'noPress'){
					boxStatus[taskInfo.siteName] = 'Pressed';//呼叫盒已经按下
					//如果任务队列没有任务
					if(!taskInfo.siteTasks){
						status = 'navi';//状态机改为导航状态
					}
					taskInfo.siteTasks += taskInfo.siteName + ','; //添加当前站点到任务队列
					console.log(taskInfo.siteTasks);
				}else if(boxStatus[taskInfo.siteName] == 'Pressed'){
					var sitename = taskInfo.siteTasks.split(',')[0];
					if(sitename == taskInfo.siteName){
						boxStatus[taskInfo.siteName] = 'oKPressed'
					}
				}
			}else{
	
			}
		}
		if(status == 'navi'){
			var taskMsg = taskInfo.siteTasks.split(',')[0];
			var navCtrlMsg = new ROSLIB.Message({
				goal_name: taskMsg,
            	control: 1
			});
			navCtrlTopic.publish(navCtrlMsg);
			status = 'waitPlaceTray';
		}else if(status == 'waitPlaceTray'){
			//bind tray-site 
			// color change
			status = 'waitConfirm';
		}else if(status == 'confirm'){
			// color change
			// remove now task

			boxState = 'NoPress';
			if(taskInfo.siteTasks){
				status = 'navi';
			}
		}
	})

	var rfidTopic = new ROSLIB.Topic({
        ros: ros,
        name: '/rfid',
        messageType: 'std_msgs/String'
    });
    rfidTopic.subscribe(function(msg){
        taskInfo.rfidInfo = msg.data;
        LEDColorChange(taskInfo,status,waypointUserPub);
    });
	
	//#region 主循环
	while(true){
		
	}
	//#endregion

	// 根据呼叫盒地址获取站点名称
	function getSiteNameByCallBoxAddress(callBoxAddress){
		switch (callBoxAddress) {
			case 'call_state:0,9,252,381':
				taskInfo.siteName = 'Qd';
				break;
			case 'call_state:0,6,79,14':
				taskInfo.siteName = 'CESHI1';
				break;
		}
	}

	//Led 灯光颜色变幻
	function LEDColorChange(taskInfo,status,waypointUserPub){
		var rfidInfo = taskInfo.rfidInfo;
		var trayPosition = rfidInfo.substring(0,1);   // 托盘位置 0-5
		var placeStatus = rfidInfo.substring(2,3); // 放置状态 0/1
		var rfidNum = rfidInfo.substring(4,rfidInfo.length - 1).replace(',',''); //RFID卡号
		var pointName = taskInfo.siteTasks.split(',')[0]; //当前任务名称
		var LEDLayer; //led 灯层数
		var LEDPosition; //Led 灯前后位置 front/back
		var LEDRedMsg;
		var LEDGreenMsg;
		switch(trayPosition){
			case '0':
				LEDLayer = '1';
				LEDPosition = 'front';
				break;
			case '1':
				LEDLayer = '1';
				LEDPosition = 'back';
				break;
			case '2':
				LEDLayer = '2';
				LEDPosition = 'front';
				break;
			case '3':
				LEDLayer = '2';
				LEDPosition = 'back';
				break;
			case '4':
				LEDLayer = '3';
				LEDPosition = 'front';
				break;
			case '5':
				LEDLayer = '3';
				LEDPosition = 'back';
				break;
		}
		if(placeStatus == '1'){
			if(status == 'waitPlaceTray'){
				LEDRedMsg = 'layer' + LEDLayer + '_' + LEDPosition + '_red_led_on';
				LEDGreenMsg = 'layer' + LEDLayer + '_' + LEDPosition + '_green_led_off';
			}else if(status == 'confirm'){
				LEDRedMsg = 'layer' + LEDLayer + '_' + LEDPosition + '_red_led_off';
				LEDGreenMsg = 'layer' + LEDLayer + '_' + LEDPosition + '_green_led_on';
			}
		}else{
			LEDRedMsg = 'layer' + LEDLayer + '_' + LEDPosition + '_red_led_off';
			LEDGreenMsg = 'layer' + LEDLayer + '_' + LEDPosition + '_green_led_off';
		}
		var redColorMsg = new ROSLIB.Message({
			data:LEDRedMsg
		});
		waypointUserPub.publish(redColorMsg);
		var greenColorMsg = new ROSLIB.Message({
			data:LEDGreenMsg
		});
		waypointUserPub.publish(greenColorMsg);
	}

})