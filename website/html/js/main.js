'use strict';

function getRobotModel(url)
{
	var url = "http://" + url + ":8808/api/model";
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

function getVersion(url)
{
	var url = "http://" + url + ":8808/api/version";
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

function getNamespace(url)
{
    var url = "http://" + url + ":8808/api/namespace";
    $.ajax({
        type: 'get',
        url: url,
        async: false,
        success: (data) => {
            DATA.namespace = data.namespace;
            console.log(`[INFO]ROS namespace: ${data.namespace}`);
        },
        dataType: 'json'
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
    var mapInfo = mapInfo || {
        width: screenWidth,
        height: screenHeight
    };
    var rMap = mapInfo.width / mapInfo.height;
    var width = screenWidth;
    var height = screenHeight;
    if (screenWidth > screenHeight)
    {
        width = screenHeight * rMap;
        height = screenHeight;
    }
    else
    {
        width = screenWidth;
        height = screenWidth / rMap;
    }
    var mapNavCanvas = document.createElement('canvas');
    mapNavCanvas.width = width;
    mapNavCanvas.height = height;
    $('#mapNavDiv').append(mapNavCanvas);
	var stage = new createjs.Stage(mapNavCanvas);
	DATA.register('stage', {'stage': stage, 'width': width, 'height': height}, {});
	createjs.Touch.enable(stage);
	createjs.Ticker.setFPS(FPS);
	createjs.Ticker.addEventListener('tick', function(){
        // TODO: set children index here
		stage.update();
	});
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
    // return (val === target);
    return Math.abs(val-target)<2.0;
}

function main()
{
    // register set and get methods
    DATA.register('robotModel', null, {fnSet: UI.robotModelHandle});
    DATA.register('softwareVersion', null, {fnSet: UI.softwareVersionHandle});
    DATA.register('namespace', null, {fnSet: UI.namespaceHandle});
    DATA.register('browserInfo', null, {fnSet: UI.browserInfoHandle});

    DATA.register('ros', null, {});
    DATA.register('topic', {}, {});

	DATA.register('mapMsg', null, {fnSet: UI.dispMap}); // ros message for map or map_edit
    DATA.register('mapStage', null, {}); // bitmap for map or map_edit
    DATA.register('mapScaleStage', null, {}); // scale for map

	DATA.register('waypointsMsg', null, {fnSet: UI.dispWaypoints});
    DATA.register('waypointsStage', null, {}); // containers added to stage

	DATA.register('trajectoriesMsg', null, {fnSet: UI.dispTrajectories});
	
    DATA.register('robotPoseMsg', null, {fnSet: UI.dispRobot});
    DATA.register('robotPoseStage', null, {});

    DATA.register('globalPlanMsg', null, {fnSet: UI.dispGlobalPlan});
	DATA.register('globalPlanStage', null, {});

    DATA.register('localPlanMsg', null, {fnSet: UI.dispLocalPlan});
    DATA.register('localPlanStage', null, {});

    DATA.register('footprintMsg', null, {fnSet: UI.dispFootprint});
    DATA.register('footprintStage', null, {});

    DATA.register('tfMsg', {}, {});

    DATA.register('laserScanMsg', null, {fnSet: UI.dispLaserScan});
    DATA.register('laserScanStage', null, {});

    DATA.register('display', null, {fnSet: UI.display});

    DATA.register('mapList', null, {fnSet: UI.updateMapList});

    DATA.register('rosMode', null, {fnSet: UI.rosModeHandle});
    DATA.register('mappingStatus', null, {});

    DATA.register('brushStatus', null, {fnSet: UI.brushStatusHandle});

    DATA.register('mapEditStageList', [], {});
    DATA.register('mapEditObstacleList', [], {});

    DATA.register('navCtrlStatus', null, {fnSet: UI.navCtrlStatusHandle});
    DATA.register('selectedWaypoints', [], {});

    DATA.register('dockInitPoseName', null, {});// dock initial pose name
    DATA.register('powerStatus', null, {fnSet: UI.updatePowerStatus});
    DATA.register('chargeStatus', null, {fnSet: UI.updateChargeStatus});
    DATA.register('loading', null, {fnSet: UI.loading});
    DATA.register('lastNetworkSetting', null, {fnSet: NET.lastNetworkSettingHandle});
    DATA.register('powerAlarm', null, {});
    DATA.register('plcStatus', null, {fnSet: EXT.plcStatusHandle});
    DATA.register('diagnosticsMsg', null, {fnSet: UI.diagnosticsMsgHandle})

    var url = window.location.hostname;
    var websocketServer = 'ws://' + url + ':9090';
    // initialize
    getNamespace(url);
    getBrowserInfo();
    getRobotModel(url);
    getVersion(url);
    initStage();
    DATA.loading = {
        key: 'init',
        info: '载入中'
    };

    // initialize ros
    NAV.init(websocketServer);
    NAV.subPowerByWayPointUserSub();
    NAV.moveBaseStatus();
    //DEBUG.init(websocketServer);
    NAV.getRobotStatus();
    NAV.subShellFeedbackFromNodejs();
    setTimeout(() => {
        console.log('publish map select');
        NAV.pubCmdString(NAV.CmdEnum.MapSelect, true);    
    }, 500);
    NAV.listenTf();
    NAV.dispMapAndWps('/map', true);
    NAV.dispTrajectories();
    NAV.dispRobot();
    NAV.dispGlobalPlan();
    NAV.dispLocalPlan();
    NAV.dispFootprint();
    NAV.dispLaserScan();
    NAV.subNavCtrlStatus();
    NAV.subRobotStatus();
    NAV.subLastNetworkSetting(); 
    NAV.subWaypointUserSub();   
}

$(()=>{    
	main();
    var disps = {
        disp_map: $('#disp-map').val(),
        disp_robotPose: $('#disp-robotPose').val(),
        disp_laserScan: $('#disp-laserScan').val(),
        disp_globalPlan: $('#disp-globalPlan').val(),
        disp_localPlan: $('#disp-localPlan').val(),
        disp_footprint: $('#disp-footprint').val(),
        //disp_waypoints: $('#disp-waypoints').val()
    }
    
    for (var key in disps)
    {
        var name = key.split('_')[1];
        var val = disps[key] === 'true'; 
        DATA.display = {
            property: name,
            value: val
        }
    }

    $('#disp-map').on('change', function(){
        DATA.display = {
            property: 'map',
            value: $('#disp-map').val() === 'true'
        };
    });

    $('#disp-robotPose').on('change', function(){
        DATA.display = {
            property: 'robotPose',
            value: $('#disp-robotPose').val() === 'true'
        };
    });

    $('#disp-footprint').on('change', function(){
        DATA.display = {
            property: 'footprint',
            value: $('#disp-footprint').val() === 'true'
        };
    });

    $('#disp-laserScan').on('change', function(){
        DATA.display = {
            property: 'laserScan',
            value: $('#disp-laserScan').val() === 'true'
        };
    });

    $('#disp-globalPlan').on('change', function(){
        DATA.display = {
            property: 'globalPlan',
            value: $('#disp-globalPlan').val() === 'true'
        };
    });

    $('#disp-localPlan').on('change', function(){
        DATA.display = {
            property: 'localPlan',
            value: $('#disp-localPlan').val() === 'true'
        };
    });

    $('#disp-waypoints').on('change', function(){
        DATA.display = {
            property: 'waypoints',
            value: $('#disp-waypoints').val() === 'true'
        };
    });

    // current map click handle
    $('#currentMapName').on('click', function(){
        var mapnav = $('.map_nav');
        if (DATA.rosMode === NAV.RosMode.Navigation)
        {
            // unfold map list
            if (isEqual(mapnav.css('height'), 35))
            {
                var height = (DATA.mapList.length + 1) * 35;
                mapnav.css('height', height);
            } 
            else
            {
                mapnav.css('height','35px');
            }
        }
        else if (DATA.rosMode === NAV.RosMode.Gmapping)
        {
        	clickFeedback($('#currentMapName'));
            // click to save map
            console.log('[INFO]Save map');
            NAV.saveMap();
            $('#currentMapName').text('保存中');
            // debug
            DATA.loading = '保存中';
        }
    });

    // TODO: unsupport on mobile phone
    $('.map_nav').mouseleave(function(){
        var mapnav = $('.map_nav');
        mapnav.css('height','35px');
    });

    // fold or unfold waypoint list in side bar
    $('#sidebar_site_span').on('click', function(){
    	clickFeedback($('#sidebar_site_span'));
        if (!DATA.waypointsMsg)
        {
            ALERT.error({
                title: '站点错误',
                text: '站点不可用'
            });
            return;
        }
        var waypointListDom = $('.sidebar_site');
        var height = waypointListDom.css('height');
        if (isEqual(height, 60))// unfold
        {
            height = (DATA.waypointsMsg.waypoints.length + 2) * 60;
            waypointListDom.css('height', height);
            $('#sidebar_site_span').text('站点 ↑');
        }
        else
        {
            waypointListDom.css('height', '60px'); 
            $('#sidebar_site_span').text('站点 ↓');  
        }
    });

    // fold or un fold trajectory list in side bar
    $('#sidebar_route_span').on('click', function(){
    	clickFeedback($('#sidebar_route_span'));
        if (!DATA.trajectoriesMsg)
        {
            ALERT.error({
                title: '轨迹错误',
                text: '轨迹不可用'
            });
            return;
        }
        var sidebarRoute = $('.sidebar_route');
        var sidebarRouteSpan = $('#sidebar_route_span');
        if (isEqual(sidebarRoute.css('height'), 60))
        {
            var height = (DATA.trajectoriesMsg.trajectories.length + 2) * 60;
            sidebarRoute.css('height', height);
            sidebarRouteSpan.text('轨迹 ↑');
        } 
        else
        {
            sidebarRoute.css('height',60);
            sidebarRouteSpan.text('轨迹 ↓');
        }
    });

    // start mapping
    $('#startMapping').on('click', function(){
    	clickFeedback($('#startMapping'));
        if (DATA.rosMode === NAV.CmdEnum.Navigation)
        {
            var input = $('#mapping_div_input').val();
            if (input === DATA.mapList[0])
            {
                console.log('[INFO]Start mapping');
                NAV.pubCmdString(NAV.CmdEnum.Gmapping, true);
                DATA.loading = '切换中';
            }   
            else
            {
                if (!checkStr(input))
                {
                    ALERT.warn({
                        title: '参数错误',
                        text: '无效的地图名称'
                    });
                    return;
                }
                DATA.loading = '新建中';
                NAV.manipulateScene(NAV.CmdEnum.MapInsert, input, true);
            }
        }
    });

    $('#zoomIn').on('click', function(){
        DATA.brushStatus = 'zoomIn';
    });

    $('#zoomOut').on('click', function(){
        DATA.brushStatus = 'zoomOut';
    });

    $('#move').on('click', function(){
        DATA.brushStatus = 'move';
    });

    $("#pencilTool").on('click', function(){
        DATA.brushStatus = 'pencilTool';
    });

    $('#point').on('click', function(){
        DATA.brushStatus = 'point';
    });

    $('#line').on('click', function(){
        DATA.brushStatus = 'line';
    });

    $('#circle').on('click', function(){
        DATA.brushStatus = 'circle';
    });

    $('#rect').on('click', function(){
        DATA.brushStatus = 'rect';
    });

    $('#rubber').on('click', function(){
        DATA.brushStatus = 'rubber';
    });

    $('#undo').on('click', function(){
        DATA.brushStatus = 'undo';
    });

    $('#redo').on('click', function(){
        DATA.brushStatus = 'redo';
    });

    $('#confirm').on('click', function(){
        DATA.brushStatus = 'confirm';
    });

    $('#pose_estimate').on('click', function(){
        UI.poseEstimate();
    });

    // add waypoint page
    $('#wpType').on('change click', function(){
        var type = $('#wpType').val();
        if (type == 'mark')
        {
            if (DATA.robotPoseMsg)
            {
                $('#pos-x').val(DATA.robotPoseMsg.position.x.toFixed(5));
                $('#pos-y').val(DATA.robotPoseMsg.position.y.toFixed(5));
                $('#pos-z').val(DATA.robotPoseMsg.position.z.toFixed(5));
                $('#ori-x').val(DATA.robotPoseMsg.orientation.x.toFixed(8));
                $('#ori-y').val(DATA.robotPoseMsg.orientation.y.toFixed(8));
                $('#ori-z').val(DATA.robotPoseMsg.orientation.z.toFixed(8));
                $('#ori-w').val(DATA.robotPoseMsg.orientation.w.toFixed(8));
                var yawRad = TF.quaternionToYaw(DATA.robotPoseMsg.orientation);
                var yawDeg = yawRad * 180 / Math.PI;
                $('#ori-yaw').val(yawDeg);    
            }
            else
            {
                console.error('[ERROR]Failed to get robot pose');
                ALERT.error({
                    title: '站点添加错误',
                    text: '无法获得当前机器人位姿'
                });
                return;
            }
        }
        var modeHtml = `<option value="LOOP">多次</option>
                        <option value="LOOP2">LOOP2</option>
                        <option value="BACK">BACK</option>
                        <option value="BACK2">BACK2</option>
                        <option value="NONE">单次</option>`;
        var pubsuberStyle = {
            height: 0,
            overflow: 'hidden'
        };
        var frameIdStyle = {
            height: 0,
            overflow: 'hidden'
        };
        if (type === 'sound_play')
        {
            modeHtml = `<option value="START">播放</option>
                        <option value="STOP">停止</option>
                        <option value="ONCE">播放一次</option>`;
        }
        else if (type === 'goto') // frame_id == looper
        {
            modeHtml = '';
            for (var i = 0; i < DATA.waypointsMsg.waypoints.length; i++)
            {
                var waypoint = DATA.waypointsMsg.waypoints[i];
                modeHtml += `<option value="${waypoint.name}">${waypoint.name}</option>`;
            }
        }
        else if (type === 'call')
        {
            modeHtml = '';
            for (var i = 0; i < DATA.trajectoriesMsg.trajectories.length; i++)
            {
                var traj = DATA.trajectoriesMsg.trajectories[i];
                modeHtml += `<option value="${traj.name}">${traj.name}</option>`;
            }
        }
        else if (type === 'pubsuber' || type === 'mark' || type === 'goal')
        {
            var info;
            switch (type)
            {
                case 'pubsuber':
                    info = '发布-订阅器接收值:';
                    break;
                case 'mark':
                case 'goal':
                    info = 'mark类型:';
                    break;
                default:
                    break;
            }
            $('#pubsuber_expect_li p').text(info);
            pubsuberStyle = {
                height: 75,
                overflow: 'none'
            };
        }

        // frame id 
        if (type === 'goal' || type === 'mark' || type === 'initial_pose')
        {
            frameIdStyle = {
                height: 75,
                overflow: 'none'
            };
        }

        if (type === 'mark')
        {
            $('.position').css('display', 'block');
            $('.orientation').css('display', 'block');
            $('.orientation-yaw').css('display', 'block');
        }
        else
        {
            $('.position').css('display', 'none');
            $('.orientation').css('display', 'none');
            $('.orientation-yaw').css('display', 'none');
        }
        $('#wpMode').children().remove();
        $('#wpMode').append(modeHtml);
        $('#pubsuber_expect_li').css('height', pubsuberStyle.height);
        $('#pubsuber_expect_li').css('overflow', pubsuberStyle.overflow);
        $('#frame_id_li').css('height', frameIdStyle.height);
        $('#frame_id_li').css('overflow', frameIdStyle.overflow);
    });

    $('#ori-x, #ori-y, #ori-z, #ori-w').on('change click', function(){
        var orientation = {
            x: parseFloat($('#ori-x').val()),
            y: parseFloat($('#ori-y').val()),
            z: parseFloat($('#ori-z').val()),
            w: parseFloat($('#ori-w').val()),
        }

        if (TF.isQuaternionValid(orientation))
        {
            var yawRad = TF.quaternionToYaw(orientation);
            var yawDeg = yawRad * 180 / Math.PI;
            $('#ori-yaw').val(yawDeg.toFixed(5));
        }
        else
        {
            $('#ori-yaw').val('四元数不合法');
        }
    });

    $('#ori-yaw').on('change click', function(){
        var yawDeg = parseFloat($('#ori-yaw').val());
        var orientation = TF.thetaToQuaternion(yawDeg/180*Math.PI);
        $('#ori-x').val(orientation.x.toFixed(8));
        $('#ori-y').val(orientation.y.toFixed(8));
        $('#ori-z').val(orientation.z.toFixed(8));
        $('#ori-w').val(orientation.w.toFixed(8));
    });

    // add waypoints submit
    $('#wp_add_submit').on('click', function(){
        // waypoint type
        var type = $('#wpType').val();
        if (type === '')
        {
            ALERT.error({
                title: '参数错误',
                text: '请选择站点类型'
            });
            return;
        }
        var frame_id = $('#frame_id').val().trim();
        if (!frame_id)
        {
            if (type === 'initial_pose' || type === 'goal' || type === 'mark')
            {
                ALERT.error({
                    title: '参数错误',
                    text: '请输入frame_id'
                });
                return;
            }
        }
        var close_enough = $('#close_enough').val();
        close_enough = parseFloat(close_enough);
        var goal_timeout = $('#timeout').val();
        goal_timeout = parseFloat(goal_timeout);
        var failure_mode = $('#wpMode').val();
        var mark = $('#pubsuber_expect').val().trim();
        if (type === 'pubsuber')
        {
            failure_mode = $('#pubsuber_expect').val();
        }
        else if (type === 'mark')
        {
            if (mark !== '')
            {
                // strip or pallet
                var markTypes = ['strip', 'pallet'];
                if (markTypes.indexOf(mark) === -1)
                {
                    ALERT.error({
                        title: '参数错误',
                        text: 'mark类型需为strip或pallet'
                    });
                    return;
                }
            }
        }
        else if (type === 'goal')
        {
            if (mark !== '')
            {
                var markTypes = ['true', 'false'];
                if (markTypes.indexOf(mark) === -1)
                {
                    ALERT.error({
                        title: '参数错误',
                        text: 'mark类型需为true或false'
                    });
                    return;
                }
            }
        }
        var name = $('#wpName').val();
        if (!checkStr(name))
        {
            ALERT.error({
                title: '参数错误',
                text: '站点名称不合法'
            });
            return;
        }
        if (isNameUsed(name))
        {
            ALERT.error({
                title: '参数错误',
                text: '该站点名称已存在'
            });
            return;
        }
        var pose = DATA.robotPoseMsg;
        if (type === 'mark')
        {
            pose = {
                position: {
                    x: parseFloat($('#pos-x').val()),
                    y: parseFloat($('#pos-y').val()),
                    z: parseFloat($('#pos-z').val()),
                },
                orientation: {
                    x: parseFloat($('#ori-x').val()),
                    y: parseFloat($('#ori-y').val()),
                    z: parseFloat($('#ori-z').val()),
                    w: parseFloat($('#ori-w').val()),
                }
            };    
        }
        if (!pose)
        {
            console.error('[ERROR]Failed to get robot pose');
            ALERT.error({
                title: '站点添加错误',
                text: '无法获得当前机器人位姿'
            });
            return;
        }
        var waypointInfo = {
            frame_id: frame_id,
            close_enough: close_enough,
            goal_timeout: goal_timeout,
            failure_mode: failure_mode,
            type: type,
            name: name,
            mark: mark,
            pose: pose
        }
        NAV.addWaypoint(waypointInfo);
        // reset pubsuber expect and mark value
        $('#pubsuber_expect').val('');
        $('#frame_id').val('')
    });

    // trajectories
    $('#dock').on('click', function(){
        var isCheck = $('#dock').attr('checked');
        DATA.isDock = false;
        if (isCheck === 'checked')
        {
            DATA.isDock = true;
        }
        console.log(DATA.isDock);
    });

    $('#waypointTrajAdd').on('change', function(){
        var fullName = $('#waypointTrajAdd').val();
        if (fullName === '')
        {
            ALERT.error({
                title: '参数错误',
                text: '请至少选择一个站点'
            });
        }
        DATA.selectedWaypoints.push(fullName);
        UI.dispSelectedWaypoints();
        $('#waypointTrajAdd').val('');
    });

    $('#traj_add_submit').on('click', function(){
        var name = $('#trajName').val();
        if (!checkStr(name))
        {
            ALERT.error({
                title: '参数错误',
                text: '轨迹名称不合法'
            });
            return;
        }
        if (isNameUsed(name))
        {
            ALERT.error({
                title: '参数错误',
                text: '该轨迹名称已存在'
            });
            return;
        }
        if (DATA.selectedWaypoints.length === 0)
        {
            ALERT.error({
                title: '参数错误',
                text: '请选择站点'
            })
            return;
        }
        if (DATA.isDock)
        {
            name = 'dock_' + name;
        }
        console.log(DATA.selectedWaypoints);
        NAV.addTrajectory(name, DATA.selectedWaypoints);
        $('.selectedWp').remove();
        DATA.selectedWaypoints = [];
    });

    // navigation stop button
    $('.stop').on('click', function(){
        // stop waypoint or trajectory
        clickFeedback($('.stop'));
        NAV.navCtrl('', 0);
    });

    // manual control
    // go forward
    $('.direction_box_top').on("touchstart touchend click mouseleave", function (e) {
        switch (e.type)
        {
            case 'touchstart':
            case 'click':
                e.preventDefault();
                $('.direction_box_top').css('background-image', "url(../image/top_click.png)");
                NAV.manualCtrl({
                    linear: NAV.ManualCtrlVel.linear 
                });
                break;
            case 'touchend':
            case 'mouseleave':
                $('.direction_box_top').css('background-image', "url(../image/top.png)");
                NAV.manualCtrl({});
                break;
            default:
                break;
        }
    });

    // go back
    $('.direction_box_bottom').on("touchstart touchend click mouseleave", function (e) {
        switch (e.type)
        {
            case 'touchstart':
            case 'click':
                e.preventDefault();
                $('.direction_box_bottom').css('background-image', "url(../image/bottom_click.png)");
                NAV.manualCtrl({
                    linear: -NAV.ManualCtrlVel.linear 
                });
                break;
            case 'touchend':
            case 'mouseleave':
                $('.direction_box_bottom').css('background-image', "url(../image/bottom.png)");
                NAV.manualCtrl({});
                break;
            default:
                break;
        }
    });

    // go left
    $('.direction_box_left').on("touchstart touchend click mouseleave", function (e) {
        switch (e.type)
        {
            case 'touchstart':
            case 'click':
                e.preventDefault();
                $('.direction_box_left').css('background-image', "url(../image/left_click.png)");
                NAV.manualCtrl({
                    angular: NAV.ManualCtrlVel.angular 
                });
                break;
            case 'touchend':
            case 'mouseleave':
                $('.direction_box_left').css('background-image', "url(../image/left.png)");
                NAV.manualCtrl({});
                break;
            default:
                break;
        }
    });

    // go left
    $('.direction_box_right').on("touchstart touchend click mouseleave", function (e) {
        switch (e.type)
        {
            case 'touchstart':
            case 'click':
                e.preventDefault();
                $('.direction_box_right').css('background-image', "url(../image/right_click.png)");
                NAV.manualCtrl({
                    angular: -NAV.ManualCtrlVel.angular 
                });
                break;
            case 'touchend':
            case 'mouseleave':
                $('.direction_box_right').css('background-image', "url(../image/right.png)");
                NAV.manualCtrl({});
                break;
            default:
                break;
        }
    });

    // stop
    $('.direction_box_center').on("touchstart touchend click mouseleave", function (e) {
        switch (e.type)
        {
            case 'touchstart':
            case 'click':
                e.preventDefault();
                '3b6dde'
                $('.direction_box_center').css('background', '#3b6dde');
                NAV.manualCtrl({});
                break;
            case 'touchend':
            case 'mouseleave':
                $('.direction_box_center').css('background', '#3b6dde');
                break;
            default:
                break;
        }
    });
});