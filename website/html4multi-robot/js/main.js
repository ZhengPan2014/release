'use strict';

function getRobotModel()
{
	var url = "http://" + window.location.hostname + ":8808/api/model";
    $.ajax({
        type: 'get',
        url: url,
        async: true,
        success: (data) => {
            DATA.robotModel = data.model;
            console.log(`[INFO]robot model: ${data.model}`);
        },
        dataType: "json"
    });
}

function getVersion()
{
	var url = "http://" + window.location.hostname + ":8808/api/version";
    $.ajax({
        type: 'get',
        url: url,
        async: true,
        success: (data) => {
            DATA.softwareVersion = data.version;
            console.log(`[INFO]software version: ${data.version}`);
        },
        dataType: "json"
    });
}

function getBrowserInfo()
{
	var ua = navigator.userAgent.toLowerCase();  
	var btypeInfo = (ua.match( /firefox|chrome|safari|opera/g ) || "other")[ 0 ];  
	if( (ua.match( /msie|trident/g ) || [] )[ 0 ] )  
    {  
        btypeInfo = "msie";  
    }  
    var pc = "";  
    var prefix = "";  
    var plat = "";  
    var isTocuh = ("ontouchstart" in window) || (ua.indexOf( "touch" ) !== -1) || (ua.indexOf( "mobile" ) !== -1);  
    if( isTocuh )  
    {  
        if( ua.indexOf( "ipad" ) !== -1 )  
        {  
            pc = "pad";  
        } 
        else if( ua.indexOf( "mobile" ) !== -1 )  
        {  
            pc = "mobile";  
        } 
        else if( ua.indexOf( "android" ) !== -1 )  
        {  
            pc = "androidPad";  
        } 
        else  
        {  
            pc = "pc";  
        }  
    } 
    else  
    {  
        pc = "pc";  
    }  
    switch(btypeInfo)  
    {  
        case "chrome":  
        case "safari":  
        case "mobile":  
            prefix = "webkit";  
            break;  
        case "msie":  
            prefix = "ms";  
            break;  
        case "firefox":  
            prefix = "Moz";  
            break;  
        case "opera":  
            prefix = "O";  
            break;  
        default:  
            prefix = "webkit";  
            break  
    }  
    plat = (ua.indexOf( "android" ) > 0) ? "android" : navigator.platform.toLowerCase();  
    var browserInfo = {
    	version: (ua.match( /[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[ 1 ], 
        plat: plat,                   
        type: btypeInfo,                
        pc: pc,  
        prefix: prefix,                  
        isMobile: (pc == "pc") ? false : true    
    };  
    DATA.browserInfo = browserInfo;
}

function connectToRos(url)
{
    var url = url || `ws://${window.location.hostname}:9090`;
    if (!url.startsWith('ws://'))
    {
        url = 'ws://' + url;
    }
    if (!url.endsWith(':9090'))
    {
        url += ':9090';
    }
    var ros = new ROSLIB.Ros();
    ros.connect(url);
    ros.on('connection', () => {
        console.log(`[INFO]Connected to rosbridge ${url}.`);
    });
    ros.on('close', () => {
        console.log(`[INFO]Rosbridge server ${url} closed.`);
    });
    ros.on('error', () => {
        console.error(`[ERROR]Connection error.`);
    });
    return ros;
}

function robotAddHandle(mapInfo, serverConnection, stage)
{
    return (robotsInfo) => {
        var robots = [];
        for (var i = 0; i < robotsInfo.length; i++)
        {
            var robotID = robotsInfo[i].robotID || robotsInfo.agvName;
            var robotIP = robotsInfo[i].robotIP;
            var connection = serverConnection;
            if (robotIP)
            {
                if (robotIP !== 'server')
                {
                    connection = connectToRos(robotIP);
                }
            }  
            robots[i] = new Robot(connection, mapInfo.scale, mapInfo.reg, mapInfo.height, 
            mapInfo.origin, mapInfo.resolution, robotID);
            robots[i].dispRobotPose();
            // robots[i].dispWaypoints();
            robots[i].dispGlobalPlan();
            stage.addRobot(robots[i]);
        }    
    }
}

function main()
{
    // websocket connection to server
    var url = window.location.hostname;
    var server = new Server(url);
    // stage
    var screenWidth = window.innerWidth 
        || document.body.clientWidth || document.documentElement.clientWidth;
    var screenHeight = window.innerHeight 
        || document.body.clientHeight || document.documentElement.clientHeight;
    var stage = new Stage(screenWidth, screenHeight, 'mapNavDiv', server.connection);
    // Vue bus
    window.vueBus = new EventEmitter2();
    // subscribe map from server
    stage.on('map', (mapInfo) => {
        // vue for robots add
        var vmRobotsAdd = new Vue(Vm.addRobot);
        window.vueBus.on('addRobot', robotAddHandle(mapInfo, server.connection, stage));
        server.getClients().then(robotAddHandle(mapInfo, server.connection, stage));
        server.on('clentsUpdate', (robotsInfo) => {
            // TODO:
            // update robots on stage
        });
        window.vueBus.emit('addRobot', [{robotID: '', robotIP: '192.168.0.159'}]);
    });
    // tasks handle
    var tasksVm = new Vue(Vm.task);
    var task = new Task(server.connection, tasksVm);
    task.subTasks();

    // debug
    $('#currentMapName').on('click', function(){
        stage.zoom(1.1);   
    });

    $('.map_battery').on('click', function(){
        stage.zoom(0.9);
    });

    $('.stop').on('click', function(){
        stage.move(10,0);
    })
}

$(()=>{
	main();
});