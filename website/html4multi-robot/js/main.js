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

function initStage(mapInfo, FPS)
{
    var FPS = FPS || 25;
    var screenWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
    var screenHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
}

function checkStr(str) 
{
    var myReg = /^[^@\/\'\\\"\‘\’#$%&\^\*]+$/;
    return myReg.test(str);
}

// 
function isEqual(actVal, target)
{
    var val = actVal.substr(0, actVal.length-2);
    val = parseInt(val);
    return (val === target);
}

function connectToRos(url)
{
    var url = url || `ws://${window.location.hostname}:9090`;
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

function main()
{
    var screenWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
    var screenHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;

    var serverConnection = connectToRos();
    var stage = new Stage(screenWidth, screenHeight, 'mapNavDiv', serverConnection);
    // display multi-robots
    var robotsInfo = [];
    var robots = [];
    window.evtEmitter = new EventEmitter2();
    stage.on('map', (mapInfo) => {
        var addRobotVm = new Vue(Vm.addRobot);
        window.evtEmitter.on('addRobot', (robotsInfo)=>{
            for (var i = 0; i < robotsInfo.length; i++)
            {
                var robotId = robotsInfo[i].robotID;
                var robotIP = robotsInfo[i].robotIP;
                if (robotIP === 'server')
                {
                    var connection = serverConnection;   
                }
                else
                {
                    var connection = connectToRos(robotIP);    
                }
                robots[i] = new Robot(connection, mapInfo.scale, mapInfo.reg, mapInfo.height, 
                mapInfo.origin, mapInfo.resolution, robotId);
                robots[i].dispRobotPose();
                // robots[i].dispWaypoints();
                robots[i].dispGlobalPlan();
                stage.addRobot(robots[i]);
            }
        })
    });

    var tasksVm = new Vue(Vm.task);
    var task = new Task(serverConnection, tasksVm);
    task.subTasks();
}

$(()=>{
	main();
});