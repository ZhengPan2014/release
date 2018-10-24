"use strict";

$(function(){
    var str = "";
    var count = 1;
    for(var i = 0; i < 4; i++ ){
        str += "<ul class='da-box'>";
        for (var j = 0; j < 7; j++ ){
            str += "<li>";
            str += "<div class='da-gw'>";
            str += "<div class='da-font-color' id='da-gw-"+ count +"'>"+ count +"號工位</div>";
            str += "<div><button class='da-btn da-btn-call' id='da-btn-call-"+ count +"' >Call</button>";
            str += "<button class='da-btn da-btn-complete' id='da-btn-complete-"+ count +"' >Call In Progress</button></div>";
            str += "</div>";
            str += "</li>";
            count ++;
        }
        str += "</ul>";
    }
    $("#da-content").append(str);

    $(".da-btn-complete").css('display','none');     
    $("#da-gw-1").text('Qd');
    $("#da-gw-2").text('CESHI0');
    $("#da-gw-3").text('CESHI1');
    $("#da-gw-4").text('ICT13FIT13');
    $("#da-gw-5").text('ICT13FIT13');
    $("#da-gw-6").text('FIT14');
    $("#da-gw-7").text('Vision1');
    $("#da-gw-8").text('Vision2');
    $("#da-gw-9").text('FIT15');
    $("#da-gw-10").text('Vision3');
    $("#da-gw-11").text('ICT8FIT8');
    $("#da-gw-12").text('ICT23');
    $("#da-gw-13").text('ICT2FIT2');
    $("#da-gw-14").text('ICT4FIT4');
    $("#da-gw-15").text('ICT6FIT6');
    $("#da-gw-16").text('FIT5');
    $("#da-gw-17").text('ICT3FIT3');
    $("#da-gw-18").text('ICT19');
    $("#da-gw-19").text('ICT5');
    $("#da-gw-20").text('ICT17');
    $("#da-gw-21").text('ICT20');
    $("#da-gw-22").text('ICT10FIT10');
    $("#da-gw-23").text('LAFIT');
    $("#da-gw-24").text('PRG6');
    $("#da-gw-25").text('ICT15');
    $("#da-gw-26").text('FIT17');
    $("#da-gw-27").text('Fix1');
    $("#da-gw-28").text('Fix2');


    var status = 'idle'; // 状态机，默认为空闲状态
	
	var taskInfo = {
		callBoxInfo: '', // 呼叫盒呼叫信息
		siteTasks:'', 	 // 站点任务队列
		siteName:'', 	 // 站点名称
		robotStatus:'',  // Agv 状态 
        rfidInfo:'', 	 // RFID信息
        taskStatus:'',   // 任务状态
        trayCount:0,    // 托盘放置状态
        count:0, // 延时判断次数
        fixPubTasks: '', // 维修点送货任务队列
    };
    var siteBindTrayPosition = {

    };
    var trayPositionBindSite = {

    };
    var trayReadStatus = {
        tray0: false,
        tray1: false,
        tray2: false,
        tray3: false,
        tray4: false,
        tray5: false,
    };
    var boxAddressStatus = {
        CESHI0:'NoPress',
        CESHI1:'NoPress',
        test5:'NoPress',
        test6:'NoPress',
    };
    
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

    //#region Agv 任务的行驶状态
    var navCtrlStatusTopic = new ROSLIB.Topic({
        ros: ros,
        name: '/nav_ctrl_status',
        messageType: 'yocs_msgs/NavigationControlStatus'
    });
    navCtrlStatusTopic.subscribe(function(msg){
            taskInfo.navCtrlStatus = msg.status;
    })
   

	//#region AGV的状态 3 完成 4错误
    var robotStatusTopic = new ROSLIB.Topic({
        ros: ros,
        name: '/nav_/status',
        messageType: 'actionlib_msgs/GoalStatusArray'
	});
	robotStatusTopic.subscribe(function(msg){
        taskInfo.robotStatus = msg.status_list[0];//
        //console.log('msg:',msg.status_list[0]['status']);
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
    waypointUserSub.subscribe(function(msg){
		taskInfo.callBoxInfo = msg.data;
        // 确认工位呼叫
        if(!taskInfo.callBoxInfo)
            return;
		var callBoxAddress = taskInfo.callBoxInfo.substring(0,taskInfo.callBoxInfo.length-2); // 呼叫盒地址
		var callBoxStatus = taskInfo.callBoxInfo.charAt(taskInfo.callBoxInfo.length-1);
        var topicName_boxSite = taskInfo.callBoxInfo.split(':')[0];
        if(topicName_boxSite != 'call_state')
            return;
        getSiteNameByCallBoxAddress(callBoxAddress);
		
		if(callBoxStatus == '1'){
			// 判断是否为工位呼叫 或 维修点呼叫
				//工位呼叫
				if(boxAddressStatus[taskInfo.siteName] == 'NoPress'){
					boxAddressStatus[taskInfo.siteName] = 'Pressed';//呼叫盒已经按下
					//如果任务队列没有任务
					if(!taskInfo.siteTasks){
                        if(taskInfo.navCtrlStatus == '0')
						    status = 'navi';//状态机改为导航状态
                    }
                    if(taskInfo.siteName == 'CESHI1' || taskInfo.siteName == 'Fix2'){
                        if(taskInfo.siteTasks){
                            taskInfo.siteTasks = taskInfo.siteTasks.split(',')[0]+',' + taskInfo.siteName + ',' + taskInfo.siteTasks.split(',')[1];
                        }else{
                            taskInfo.siteTasks = taskInfo.siteTasks + taskInfo.siteName + ','
                        }
                    }else{
                        taskInfo.siteTasks = taskInfo.siteTasks + taskInfo.siteName + ','; //添加当前站点到任务队列
                    } //添加当前站点到任务队列
				}else if(boxAddressStatus[taskInfo.siteName] == 'Pressed'){
                    if(status == 'waitConfirm'){
                        var sitename = taskInfo.siteTasks.split(',')[0];
					    if(sitename == taskInfo.siteName){
						    boxAddressStatus[taskInfo.siteName] = 'OkPressed';
					    }
                    }
				}else if(boxAddressStatus[taskInfo.siteName] == 'OkPressed'){

			    }
		}
		if(status == 'navi'){
            var taskMsg = taskInfo.siteTasks.split(',')[0];
			var navCtrlMsg = new ROSLIB.Message({
				goal_name: taskMsg,
            	control: 1
			});
            navCtrlTopic.publish(navCtrlMsg);
            if(taskInfo.siteTasks.split(',')[0] == 'test6'){
                status = 'fixing'
            }else{
                status = 'waitPlaceTray';
            }
			
		}else if(status == 'waitPlaceTray'){
            if(trayReadStatus['tray'+siteBindTrayPosition[taskInfo.siteName]]){
                var sitename = taskInfo.siteTasks.split(',')[0];
				if(sitename == taskInfo.siteName){
                    status = 'waitConfirm';
                }
            }
                
        }else if(status == 'waitConfirm'){
            if(boxAddressStatus[taskInfo.siteName] == 'OkPressed'){
                status = 'confirm'; //状态机 已确认
            }
        }else if(status == 'confirm'){
            if(greenColorChange(siteBindTrayPosition[taskInfo.siteName])){
                status = 'CheckTaskList';
            }
            
		}else if(status == 'CheckTaskList'){
            setTimeout(() => {
                boxAddressStatus['test5'] = 'NoPress';
            }, 30000);
            taskInfo.siteTasks = taskInfo.siteTasks.replace(taskInfo.siteTasks.split(',')[0] + ',' ,'');
            // taskInfo.siteTasks = taskInfo.specialSites + taskInfo.siteTasks;
            console.log('当前工位确认完成后任务列表显示：',taskInfo.siteTasks);
            if(taskInfo.siteTasks){
                status = 'navi';
            }else{
                status = 'idle';
            }
            console.log('工位呼叫任务叠加显示：',taskInfo.siteTasks);
        }else if(status == 'fixing'){
            if(taskInfo.trayCount == 0){
                status = 'fixed';
            }
        }else if(status == 'fixed'){
            if(taskInfo.count == 0){
                taskInfo.count += 1;
                setTimeout(() => {
                    if(taskInfo.trayCount > 0){
                        status = 'pub';
                        console.log('PUB');
                    }
                    else{
                        taskInfo.siteTasks = taskInfo.siteTasks.replace(taskInfo.siteTasks.split(',')[0] + ',' ,'');
                        status = 'navi';
                    }
                }, 30000);
            }
        }else if(status == 'pub'){
            taskInfo.siteTasks = taskInfo.siteTasks.replace(taskInfo.siteTasks.split(',')[0] + ',' ,'');
            // taskInfo.siteTasks = taskInfo.fixPubTasks + taskInfo.siteTasks;            
            status = 'pubNavi';
        }else if(status == 'pubNavi'){
            if(taskInfo.fixPubTasks){
                var taskMsg = taskInfo.fixPubTasks.split(',')[0];
			    var navCtrlMsg = new ROSLIB.Message({
				    goal_name: taskMsg,
            	    control: 1
			    });
                navCtrlTopic.publish(navCtrlMsg);
                status = 'pubWaitFetchTray';
            }else{
                taskInfo.count = 0;
                setTimeout(() => {
                    boxAddressStatus['test6'] = 'NoPress';
                }, 30000);
                status = 'navi';
            }
        }else if(status == 'pubWaitFetchTray'){
            if(taskInfo.navCtrlStatus == '0'){
                var taskName = taskInfo.fixPubTasks.split(',')[0];
                if(siteBindTrayPosition['test5']){
                    greenColorChange(siteBindTrayPosition['test5']);
                    status = 'pubFetchTray';
                }
            }
                
        }else if(status == 'pubFetchTray'){
            var taskName = taskInfo.fixPubTasks.split(',')[0];
            if(!trayReadStatus['tray'+siteBindTrayPosition[taskName]]){
                taskInfo.fixPubTasks = taskInfo.fixPubTasks.replace(taskInfo.fixPubTasks.split(',')[0] + ',' ,'');
                status = 'pubNavi';
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
        LEDColorChange(taskInfo,status,waypointUserPub)
    });

    
	
	// 根据呼叫盒地址获取站点名称
	function getSiteNameByCallBoxAddress(callBoxAddress){
		switch (callBoxAddress) {
			case 'call_state:0,8,239,150':
				taskInfo.siteName = 'test6';
				break;
			case 'call_state:0,6,79,14':
				taskInfo.siteName = 'test5';
				break;
        }
        //console.log('taskinfo_sitename',taskInfo.siteName);
	}

	//Led 灯光颜色变幻
	function LEDColorChange(taskInfo,status,waypointUserPub){
		var rfidInfo = taskInfo.rfidInfo;
		var trayPosition = rfidInfo.substring(0,1);   // 托盘位置 0-5
		var placeStatus = rfidInfo.substring(2,3); // 放置状态 0/1
        var rfidNum = rfidInfo.substring(4,rfidInfo.length - 1); //RFID卡号
        //console.log('rfidNum' , rfidNum);
		var taskName = taskInfo.siteTasks.split(',')[0]; //当前任务名称
		var LEDLayer; //led 灯层数
		var LEDPosition; //Led 灯前后位置 front/back
		var LEDRedMsg = '';
        var LEDGreenMsg = '';
        var returnstatus = false;
        if(status == 'confirm'){
            trayPosition = siteBindTrayPosition[taskName];
        }
            
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
			// if(status == 'waitPlaceTray' && taskInfo.navCtrlStatus == '0'){
                if(!trayReadStatus['tray'+trayPosition]){
                    trayReadStatus['tray'+trayPosition] = true;
                    if(taskInfo.siteTasks.split(',')[0] == 'test6'){
                        var fixPubTask = trayPositionBindSite[rfidNum];
                        if(fixPubTask){
                            taskInfo.fixPubTasks = 'test7,';
                            // taskInfo.fixPubTasks += fixPubTask + ',';
                            siteBindTrayPosition['test5'] = trayPosition;
                        }
                        
                        // == taskInfo.siteTasks.split(',')[0]
                    }else{
                        LEDRedMsg = 'layer' + LEDLayer + '_' + LEDPosition + '_red_led_on';
                        LEDGreenMsg = 'layer' + LEDLayer + '_' + LEDPosition + '_green_led_off';
                        siteBindTrayPosition[taskName] = trayPosition;
                        trayPositionBindSite[rfidNum] = taskName;
                        returnstatus = true;                    
                    }
                    taskInfo.trayCount += 1;
                }
			// }
        }
		else if(placeStatus == '0'){
            if(trayReadStatus['tray'+trayPosition]){
                trayReadStatus['tray'+trayPosition] = false;    
			    LEDRedMsg = 'layer' + LEDLayer + '_' + LEDPosition + '_red_led_off';
                LEDGreenMsg = 'layer' + LEDLayer + '_' + LEDPosition + '_green_led_off';
                taskInfo.trayCount -= 1;
                console.log(taskInfo.trayCount);
            }
		}
		var redColorMsg = new ROSLIB.Message({
			data:LEDRedMsg
		});
		waypointUserPub.publish(redColorMsg);
		var greenColorMsg = new ROSLIB.Message({
			data:LEDGreenMsg
		});
        waypointUserPub.publish(greenColorMsg);
        return returnstatus;
    }
    
    function greenColorChange(trayPosition){
        var LEDLayer; //led 灯层数
		var LEDPosition; //Led 灯前后位置 front/back
		var LEDRedMsg = '';
        var LEDGreenMsg = '';
        var returnstatus = false;
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
        if(trayReadStatus['tray'+trayPosition]){
                    LEDRedMsg = 'layer' + LEDLayer + '_' + LEDPosition + '_red_led_off';
                    LEDGreenMsg = 'layer' + LEDLayer + '_' + LEDPosition + '_green_led_on';
                    returnstatus = true;
                }
		
		var redColorMsg = new ROSLIB.Message({
			data:LEDRedMsg
		});
		waypointUserPub.publish(redColorMsg);
		var greenColorMsg = new ROSLIB.Message({
			data:LEDGreenMsg
		});
        waypointUserPub.publish(greenColorMsg);
        return returnstatus;
    }


})