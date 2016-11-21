$(function () {

    var imageList = ["images/left1.png", "images/right1.png", "images/down1.png", "images/up1.png", "images/stopmove1.png", "images/finger.png"];
    loadImage(imageList);

    setTimeout(function () {
        $("#nav canvas").on("taphold", function () {
            $("#control-disc").popup();
            $("#control-disc").popup("open");
        });

        $('#hrg-waypoints-add').on("taphold", function () {
            $("#control-disc").popup();
            $("#control-disc").popup("open");
        });



    }, 3000);
    /****************锁屏****************/


 
    $("#btn-to-lock-scrren-popup").click(function () {
        NavEvent.data.LockScreen = true;
        $("#hrg-lockscrren-setpassword-popup").popup("open");
    });
    $("#btn-lockscreen").click(function () {
        if ($("#lock-password")[0].value == NavEvent.data.LoginPassword) {
            $("#lock-password")[0].value = "";
            $("#hrg-lockscrren-setpassword-popup").popup("close");
            NavEvent.data.LockScreen = false;
        }
        else {
            sweetAlert("输入密码错误", "", "error");
        }
    });

    /****************锁屏****************/

    /****************地图创建****************/

    $('#hrg-map-wizard-1').live('pageshow', function (event, ui) {
        Jobs.subscribeDiagnostics(DiagnosticsCallback);
    });
    $('#hrg-map-wizard-1').live('pagehide', function (event, ui) {

    });
    $('#hrg-map-wizard-2').live('pageshow', function (event, ui) {
        Jobs.LoadMap(800, 800, 'nav1');
        setTimeout(function () {
            $("#nav1 canvas").on("taphold", function () {
                $("#control-disc").popup();
                $("#control-disc").popup("open");
            });
        }, 3000);

    });
    $('#hrg-map-wizard-2').live('pagehide', function (event, ui) {
        Jobs.RemoveMap('nav1');
        $("#nav1 canvas").off("taphold");

        tempDom.style.overflow = "scroll";
        DeleteCanvasEdit();
        $("#map-scorll").text("启用画笔");
        $("#map-lines-add").prop('disabled', true).addClass("ui-disabled");
        $("#map-lines-delete").prop('disabled', true).addClass("ui-disabled");


    });
    $('#hrg-map-wizard-3').live('pageshow', function (event, ui) {
        $("#map-edit-canvas").hide();
        $("#map-edit-canvas-father img").show();
        Jobs.subscribeMapEdit();
        $(this).css("background", "white");
    });
    $('#hrg-map-wizard-3').live('pagehide', function (event, ui) {
        Jobs.unsubscribeDiagnostics(DiagnosticsCallback);
    });

    $("#hrg-map-wizard-close-1").click(function () {
        $.mobile.changePage("#hrg-paramer-set", { transition: "slide" });
    });
    $("#hrg-map-wizard-2-savemap").click(function () {
        Jobs.SaveMap();
        $(this).buttonMarkup({ icon: "hrg-load" });

    });

    $("#navigation-mode").click(function () {

        if ($(this).text() != "模式切换中...") {
            $(this).text("模式切换中...");
            $(this).buttonMarkup({ icon: "hrg-load" });
            if (NavEvent.data.NavigationMode == NavEvent.CmdEnum.Navigation) {
                Jobs.Gmapping();
            }
            else if (NavEvent.data.NavigationMode == NavEvent.CmdEnum.Gmapping) {
                Jobs.Navigation();
            }
            else if (NavEvent.data.NavigationMode == NavEvent.CmdEnum.Coverting) {

            }
            else {
                $(this).text("开启建图");
                $(this).buttonMarkup({ icon: "hrg-stop" });
            }
        }
    });

    $("#save-map").click(function () {
        Jobs.SaveMap();
        $(this).buttonMarkup({ icon: "hrg-load" });
    });

    $("#show-hidden-map").click(function () {
        if (NavEvent.data.MapShow) {
            Jobs.RemoveMap();
            $(this).text("显示地图");
        }
        else {
            Jobs.LoadMap(800, 800);
            $(this).text("隐藏地图");
        }

    });
    /****************地图创建****************/




    /****************网络设置****************/
    var internetSetTimer = null;
    var internetResetTimer = null;

    $("#network-setting").click(function () {
        if (internetSetTimer != null) {
            return;
        }
        if ($("#ip")[0].value == "") {
            //$.mobile.changePage("#hrg-error-page", { transition: "pop", role: "dialog" });
            //$("#error-info").html("WIFI名称不能为空");
            return;
        }
        if ($("#password")[0].value == "") {
            //$.mobile.changePage("#hrg-error-page", { transition: "pop", role: "dialog" });
            //$("#error-info").html("WIFI密码不能为空");
            return;
        }
        if (!IpCheck($("#ip")[0].value)) {
            //$.mobile.changePage("#hrg-error-page", { transition: "pop", role: "dialog" });
            //$("#error-info").html("IP:" + $("#ip")[0].value + "不合法");
            return;
        }
        var msg = new NavEvent.Msg('\
                    export ROS_USER_SSID=' + $("#ssid")[0].value + '; \
                    export ROS_USER_PASSWD=' + $("#password")[0].value + '; \
                    export ROS_USER_IP=' + $("#ip")[0].value + '; \
                    ~/catkin_ws/comm-setup.sh;');
        NavEvent.shellTopic.publish(msg);
        $(this).buttonMarkup({ icon: "hrg-load" });
        internetSetTimer = setTimeout(function () {
            window.location.href = "http://" + $("#ip")[0].value;
        }, 10000);
    });



    $("#network-reset").click(function () {
        if (internetSetTimer != null) {
            return;
        }
        var msg = new NavEvent.Msg('\
                    ~/catkin_ws/comm-reset.sh;');
        NavEvent.shellTopic.publish(msg);
        $(this).buttonMarkup({ icon: "hrg-load" });
        internetResetTimer = setTimeout(function () {
            window.location.href = "http://10.42.0.1";
        }, 10000);
    });

    /****************网络设置****************/


    /****************系统诊断****************/



    $('#hrg-system-diagnosis-page').live('pageshow', function (event, ui) {
        Jobs.subscribeDiagnostics(DiagnosisPageCallBack);
    });
    $('#hrg-system-diagnosis-page').live('pagehide', function (event, ui) {
        $("#diagnostics-list div").remove();
        $("#diagnosis-main img").show();
    });



    /****************系统诊断****************/

    /****************修改地图****************/

    $("#map-edit-canvas").on("taphold", function () {
        $("#brush-set").popup("open");
    });




    var tempDom = document.getElementById("map-edit-canvas-father");
    $("#map-scorll").click(function () {
        if (tempDom.style.overflow == "hidden") {
            tempDom.style.overflow = "scroll";
            DeleteCanvasEdit();
            $("#map-scorll").text("启用画笔");
            $("#map-lines-add").prop('disabled', true).addClass("ui-disabled");
            $("#map-lines-delete").prop('disabled', true).addClass("ui-disabled");
        }
        else {
            tempDom.style.overflow = "hidden";
            AddCanvasEdit("map-edit-canvas");
            $("#map-scorll").text("禁用画笔");
            $("#map-lines-add").prop('disabled', false).removeClass("ui-disabled");
            $("#map-lines-delete").prop('disabled', false).removeClass("ui-disabled");

        }
    });

    $("#map-edit-save").click(function () {
        $(this).buttonMarkup({ icon: "hrg-load" });
        Jobs.SaveMapEdit();
    });

    $("#map-lines-delete").click(function () {
        mapEditcolor = "white";
        mapEditlineWidth = 5;
        $(this).buttonMarkup({ icon: "hrg-edit-red" });
        $("#map-lines-add").buttonMarkup({ icon: "hrg-edit-white" });
    });

    $("#map-lines-add").click(function () {
        mapEditcolor = "black";
        mapEditlineWidth = 3;
        $(this).buttonMarkup({ icon: "hrg-edit-red" });
        $("#map-lines-delete").buttonMarkup({ icon: "hrg-edit-white" });
    });

    $("#map-edit-restore").click(function () {
        Jobs.subscribeMapEdit();
        $("#map-lines-add").buttonMarkup({ icon: "hrg-edit-red" });
        $("#map-lines-delete").buttonMarkup({ icon: "hrg-edit-white" });
    })

    $("#btn-map-edit").click(function () {
        Jobs.subscribeMapEdit();
    });
    /****************修改地图****************/

    /****************订阅坐标点****************/
    NavEvent.poseTopic.subscribe(function (poseMessage) {
        $("#pos_x").val(poseMessage.position.x);
        $("#pos_y").val(poseMessage.position.y);
        $("#ori_z").val(poseMessage.orientation.z);
        $("#ori_w").val(poseMessage.orientation.w);
    });
    /****************订阅坐标点****************/

    /****************手柄开关****************/
    $("#hrg-btn-switch-close").click(function () {
        $("#hrg-btn-switch").popup("close");
    });

    $("#handle-switch").click(function () {
        if ($(this).text() == "手柄开启") {
            Jobs.OpenHandle();
            $(this).buttonMarkup({ icon: "hrg-load" });
        }
        else {
            Jobs.CloseHandle();
            $(this).buttonMarkup({ icon: "hrg-load" });
        }
    });
    /****************手柄开关****************/

    /****************手动方向操作****************/


    $(".up").on("touchstart touchend", function (e) {
        if (e.type == "touchstart") {
            e.preventDefault();
            $(this).attr('src', "images/up1.png");
            manual_control("up");
        }
        else if (e.type == "touchend") {
            $(this).attr('src', "images/up.png");
            manual_control_stop();
        }


    });
    $(".down").on("touchstart touchend", function (e) {

        if (e.type == "touchstart") {
            e.preventDefault();
            $(this).attr('src', "images/down1.png");
            manual_control("down");
        }
        else if (e.type == "touchend") {
            $(this).attr('src', "images/down.png");
            manual_control_stop();
        }
    });
    $(".left").on("touchstart touchend", function (e) {

        if (e.type == "touchstart") {
            e.preventDefault();
            $(this).attr('src', "images/left1.png");
            manual_control("left");
        }
        else if (e.type == "touchend") {
            $(this).attr('src', "images/left.png");
            manual_control_stop();
        }
    });
    $(".right").on("touchstart touchend", function (e) {
        if (e.type == "touchstart") {
            e.preventDefault();
            $(this).attr('src', "images/right1.png");
            manual_control("right");
        }
        else if (e.type == "touchend") {
            $(this).attr('src', "images/right.png");
            manual_control_stop();
        }
    });
    $(".stop").on("touchstart touchend", function (e) {
        if (e.type == "touchstart") {
            e.preventDefault();
            $(this).attr('src', "images/stopmove1.png");
            manual_control("stop")
        }
        else if (e.type == "touchend") {
            $(this).attr('src', "images/stopmove.png");
            manual_control_stop();
        }
    });
    /****************手动方向操作****************/

    /****************重力传感器****************/
    $("#btn-imu-control").click(function () {
        ImuJobs.OpenIMU();
    });

    $("#hrg-imu-control-close").click(function () {
        ImuJobs.CloseIMU();
    });

    $("#btn-imu-touch").on("touchstart touchend", function (e) {
        if (e.type == "touchstart") {
            e.preventDefault();
            ImuEvent.Parameters.imuLock = true;
            $(this).attr('src', "images/finger.png");
        }
        else if (e.type == "touchend") {
            ImuEvent.Parameters.imuLock = false;
            $(this).attr('src', "images/finger-red.png");
        }
    });
    /****************重力传感器****************/

    /****************方向感应****************/
    $(window).on("orientationchange", function (event) {
        if (event.orientation == "portrait") {
            $("#P1").text("请在横屏状态下体验此功能");
            ImuEvent.Parameters.imuEnable = false;
        }
        else if (event.orientation == "landscape") {
            $("#P1").text("横屏");
            ImuEvent.Parameters.imuEnable = true;
        }
    });

    var mql = window.matchMedia("(orientation: portrait)");

    if (mql.matches) {
        $("#P1").text("请在横屏状态下体验此功能");
        ImuEvent.Parameters.imuEnable = false;
    } else {
        $("#P1").text("横屏");
        ImuEvent.Parameters.imuEnable = true;
    }
    /****************方向感应****************/



    /****************站点巡航****************/

    NavEvent.poseTopic.subscribe(function (poseMessage) {
        $("#pos_x").val(poseMessage.position.x);
        $("#pos_y").val(poseMessage.position.y);
        $("#ori_z").val(poseMessage.orientation.z);
        $("#ori_w").val(poseMessage.orientation.w);
    });

    NavEvent.WaypointTopic.subscribe(function (data) {
        console.log(data);
        NavEvent.data.WaypointList = data;
        $("#waypoint-list")[0].innerHTML = "";
        NavEvent.data.WaypointsHtml = "<option value='-1'>空</option>";
        for (var i = 0; i < data.waypoints.length; i++) {
            var name = data.waypoints[i].name;
            var waypoint_icon = "location";
            waypoint_icon = getWaypointIcon(i);
            var htmlcontents = " <div class='ui-grid-a' id='way" + name + "'>"
                             + "<div class='ui-block-a'>"
                             + "<a style='padding:0.1em;margin-left:0;' data-icon='" + waypoint_icon + "' class='btn btn1' id='btn-waypoint-" + name + "' onclick='goPostion(this)'>" + name + "</a></div>"
                             + "<div class='ui-block-b'>"
                             + "<a style='padding:0.1em;margin-left:0;' data-icon='delete' class='btn btn1' onclick='WaypointDelete(this)'>删除</a></div></div>";
            NavEvent.data.WaypointsHtml += "<option value='" + i + "'>" + name + "</option>";
            $("#waypoint-list").append(htmlcontents);
        }
        $('.btn').button();

    });

    NavEvent.TrajectoryTopic.subscribe(function (data) {
        console.log(data);
        NavEvent.data.TrajectoryList = data;
        $("#trajectory-list")[0].innerHTML = "";
        for (var i = 0; i < data.trajectories.length; i++) {
            var name = data.trajectories[i].name;
            var htmlcontents = "<div data-role='collapsible' class='coll'>"
                         + "<h3>" + name + "</h3>"
                         + " <div class='ui-grid-b' id='tra" + name + "'>"
                         + "<div class='ui-block-a'>"
                         + "<a style='padding:0.1em;margin-left:0;' data-icon='location' class='btn btn1'id='btn-trajectorie-" + name + "' onclick='goPostion(this)'>" + name + "</a></div>"
                         + "<div class='ui-block-b'>"
                         + "<a style='padding:0.1em;margin-left:0;' data-icon='info' class='btn btn1' onclick='showTrajectoryMessage(this)'>详情</a></div>"
                         + "<div class='ui-block-c'>"
                         + "<a style='padding:0.1em;margin-left:0;' data-icon='delete' class='btn btn1' onclick='TrajectoryDelete(this)'>删除</a></div></div>"
                         + "</div>";
            $("#trajectory-list").append(htmlcontents);
        }
        $('.btn').button();
        $('#trajectory-list').collapsibleset().trigger("create");
        $('#trajectory-list').collapsibleset("refresh");
    });

    NavEvent.NavCtrlStatusTopic.subscribe(function (data) {
        console.log(data);

        var index = getIndexFromArray(data.waypoint_name, NavEvent.data.WaypointList.waypoints);
        var waypoint_icon = "none";
        if (index != -1) {
            waypoint_icon = getWaypointIcon(index);
        }
        var index1 = getIndexFromArray(NavEvent.data.GopostionCurrentName, NavEvent.data.WaypointList.waypoints);
        var pre_waypoint_icon = "none";
        if (index1 != -1) {
            pre_waypoint_icon = getWaypointIcon(index1);
        }
        switch (data.status) {
            case 1:
                $("#btn-waypoint-" + NavEvent.data.GopostionCurrentName).parent().buttonMarkup({ icon: pre_waypoint_icon });
                $("#btn-waypoint-" + data.waypoint_name).parent().buttonMarkup({ icon: "hrg-load" });
                break;
            case 3:
                $("#btn-waypoint-" + data.waypoint_name).parent().buttonMarkup({ icon: waypoint_icon });
                break;
            case 0:
                for (var i = 0; i < NavEvent.data.goalMarkList.length; i++) {
                    NavEvent.Stage.removeChild(NavEvent.data.goalMarkList[i]);
                }
                NavEvent.data.goalMarkList = [];

                $(".btn1").prop('disabled', false).removeClass("ui-disabled");
                break;
            case 4:
                $("#btn-waypoint-" + data.waypoint_name).parent().buttonMarkup({ icon: waypoint_icon });
                break;
            default:
                break;
        }
        if (data.waypoint_name != "all waypoints") {
            NavEvent.data.GopostionCurrentName = data.waypoint_name;
        }
    });
    $('#hrg-navigation-setting').live('pageshow', function (event, ui) {

    });
    $('#hrg-navigation-setting').live('pagehide', function (event, ui) {

    });

    $("#site-add").click(function () {
        var pose = NavEvent.pose(parseFloat($('#pos_x')[0].value), parseFloat($('#pos_y')[0].value), parseFloat($('#ori_z')[0].value), parseFloat($('#ori_w')[0].value));
        var waypoints_action = $("#waypoints-action").val();
        var timeout = $('#timeout')[0].value;
        var area = $("#area")[0].value;
        var waypoints_mode = $("#waypoints-mode").val();

        var temp_waypoints_action = "map";
        if (waypoints_action == "map") {
            temp_waypoints_action = "map";
        }
        else if (waypoints_action == "timer") {
            temp_waypoints_action = "timer";
        }
        else if (waypoints_action == "publisher") {
            temp_waypoints_action = "pub";
        }
        else if (waypoints_action == "subscriber") {
            temp_waypoints_action = "sub";
        }
        else if (waypoints_action == "looper") {
            temp_waypoints_action = "loop";
        }

        var name = temp_waypoints_action + "-" + $('#name')[0].value;
        var index = getIndexFromArray(name, NavEvent.data.TrajectoryList.trajectories);

        if (index !== -1) {
            $.mobile.changePage("#hrg-error-page", { transition: "slide" });
            $("#error-info").html("Waypoint:" + name + " 在Trajectory列表中已占用 位于Trajectory[" + index + "]");
            return;
        }



        if (timeout == "") {
            timeout = 0.0;
        }
        if (area == "") {
            area = 0.0;
        }
        var waypoint = NavEvent.WaypointMessage(name, pose, parseFloat(area), parseFloat(timeout), waypoints_mode, waypoints_action);
        NavEvent.WaypointAddTopic.publish(waypoint);
        $.mobile.changePage("#hrg-navigation-setting", { transition: "slide" });
    });


    $('#hrg-trajectory-add').live('pageshow', function (event, ui) {

    });
    $('#hrg-trajectory-add').live('pagehide', function (event, ui) {
        site_loop_index = 0;
        $("#site-loop-list select").remove();
    });


    $('#hrg-trajectory-info-page').live('pageshow', function (event, ui) {

    });
    $('#hrg-trajectory-info-page').live('pagehide', function (event, ui) {
        //  $("#trajectory-info-list a").remove();
    });

    var site_loop_index = 0;

    $("#site-loop-add").click(function () {
        site_loop_index++;
        var htmlcontents = "<select name='select-native-" + site_loop_index + "'id='select-native-" + site_loop_index + "' data-iconpos='right' onchange='DeleteSelectOption(this)'>"
             + NavEvent.data.WaypointsHtml + "</select>";
        $("#site-loop-list").append(htmlcontents);

        $("#select-native-" + site_loop_index).selectmenu();
        $("#select-native-" + site_loop_index).selectmenu("refresh");

        $("#select-native-" + site_loop_index).parent().parent().hide();
        $("#select-native-" + site_loop_index).parent().parent().fadeIn(2000);
    });

    $("#site-loop-add-btn").click(function () {
        var temp = false;
        var name = $("#trajectory-name")[0].value;
        if (name == "") {
            return;
        }
        var index = getIndexFromArray(name, NavEvent.data.WaypointList.waypoints);
        if (index !== -1) {
            $.mobile.changePage("#hrg-error-page", { transition: "slide" });
            $("#error-info").html("Trajectory:" + name + " 在Waypoint列表中已占用 位于Waypoint[" + index + "]");
            return;
        }

        var waypoints = new Array();
        for (var i = 1; i <= site_loop_index; i++) {
            if ($("#select-native-" + i)) {
                temp = true;
                var index = getIndexFromArray($("#select-native-" + i).find("option:selected").text(), NavEvent.data.WaypointList.waypoints);
                waypoints.push(NavEvent.data.WaypointList.waypoints[index]);
            }
        }
        if (temp) {
            var trajectory = NavEvent.TrajectoryMessage(name, waypoints);
            NavEvent.TrajectoryAddTopic.publish(trajectory);
            $.mobile.changePage("#hrg-navigation-setting", { transition: "slide" });
        }
        else {
            $.mobile.changePage("#hrg-error-page", { transition: "slide" });
            $("#error-info").html("未设定路点");
        }

    });

    $("#cancel").click(function () {
        if (NavEvent.data.GopostionMode != "") {
            var msg = NavEvent.NavCtrlMessage(0, NavEvent.data.GopostionCurrentName);
            NavEvent.NavCtrlTopic.publish(msg);
        }
    });
    /****************站点巡航****************/
})
function DeleteSelectOption(odm) {
    if ($(odm).val() == -1) {
        $(odm).parent().parent().fadeOut(2000, function () {
            $(odm).remove();
        });
    }
}

function goPostion(dom) {
    $(".btn1").prop('disabled', true).addClass("ui-disabled");
    //$(".btn1").prop('disabled', true).addClass("ui-disabled");
    console.log($("#waypoint-list btn1"));
    var idname = $(dom).parent().parent().parent()[0].id;
    var name = idname.substring(3, idname.length);
    var msg = NavEvent.NavCtrlMessage(1, name);
    var index = getIndexFromArray(name, NavEvent.data.WaypointList.waypoints);
    NavEvent.NavCtrlTopic.publish(msg);
    if (getIndexFromArray(name, NavEvent.data.WaypointList.waypoints) != -1) {
   
    }
    else {
        var a = getIndexFromArray(name, NavEvent.data.TrajectoryList.trajectories);
        var wps = NavEvent.data.TrajectoryList.trajectories[a];
        for (var i = 0; i < wps.waypoints.length; i++) {
            if (wps.waypoints[i].header.frame_id == "map") {
                var pose = wps.waypoints[i].pose;
                var goalMark = Jobs.DrawPoint(NavEvent.Stage, pose, true);
                NavEvent.data.goalMarkList.push(goalMark);
            }
        }

    }
}

function showTrajectoryMessage(dom) {
    $("#trajectory-info-list")[0].innerHTML = "";
    $.mobile.changePage("#hrg-trajectory-info-page", { transition: "slide" });
    var idname = $(dom).parent().parent().parent()[0].id;
    var name = idname.substring(3, idname.length);
    $("#trajectory-info-name").val(name);
    var index = getIndexFromArray(name, NavEvent.data.TrajectoryList.trajectories);
    for (var i = 0; i < NavEvent.data.TrajectoryList.trajectories[index].waypoints.length; i++) {
        var tempname = NavEvent.data.TrajectoryList.trajectories[index].waypoints[i].name;

        var waypoint_icon = "location";
        if (NavEvent.data.TrajectoryList.trajectories[index].waypoints[i].header.frame_id == "map") {
            waypoint_icon = "location";
        }
        else if (NavEvent.data.TrajectoryList.trajectories[index].waypoints[i].header.frame_id == "timer") {
            waypoint_icon = "clock";
        }
        else if (NavEvent.data.TrajectoryList.trajectories[index].waypoints[i].header.frame_id == "publisher") {
            waypoint_icon = "navigation";
        }
        else if (NavEvent.data.TrajectoryList.trajectories[index].waypoints[i].header.frame_id == "subscriber") {
            waypoint_icon = "star";
        }
        else if (NavEvent.data.TrajectoryList.trajectories[index].waypoints[i].header.frame_id == "looper") {
            waypoint_icon = "recycle";
        }
        var htmlcontents = "<a style='padding:0.1em;margin-left:0;' data-icon='" + waypoint_icon + "' class='btn' onclick='showWaypointMessage(this)'>" + tempname + "</a></div>";
        $("#trajectory-info-list").append(htmlcontents);
        $(".btn").button();
    }

}
function showWaypointMessage(dom) {

    $("#waypoint-info-list")[0].innerHTML = "";
    $.mobile.changePage("#hrg-waypoints-info-page", { transition: "slide" });
    var name = $(dom)[0].innerHTML;
    $("#hrg-waypoints-info-page h1")[0].innerHTML = name;
    var index = getIndexFromArray(name, NavEvent.data.WaypointList.waypoints);
    var waypoint = NavEvent.data.WaypointList.waypoints[index];

    var htmlcontents1 = " <div class='ui-grid-a' >"
                    + "<div class='ui-block-a'>"
                    + "<a style='padding:0.1em;margin-left:0;' data-icon='hrg-mark' class='btn '>Name</a></div>"
                    + "<div class='ui-block-b'>"
                    + "<a style='padding:0.1em;margin-left:0;' data-icon='hrg-value' class='btn' >" + waypoint.name + "</a></div></div>";
    var htmlcontents2 = " <div class='ui-grid-a' >"
                + "<div class='ui-block-a'>"
                + "<a style='padding:0.1em;margin-left:0;' data-icon='hrg-mark' class='btn'>Area</a></div>"
                + "<div class='ui-block-b'>"
                + "<a style='padding:0.1em;margin-left:0;' data-icon='hrg-value' class='btn' >" + waypoint.close_enough + "</a></div></div>";
    var htmlcontents3 = " <div class='ui-grid-a' >"
                + "<div class='ui-block-a'>"
                + "<a style='padding:0.1em;margin-left:0;' data-icon='hrg-mark' class='btn'>Timeout</a></div>"
                + "<div class='ui-block-b'>"
                + "<a style='padding:0.1em;margin-left:0;' data-icon='hrg-value' class='btn' >" + waypoint.goal_timeout + "</a></div></div>";
    var htmlcontents4 = " <div class='ui-grid-a' >"
                + "<div class='ui-block-a'>"
                + "<a style='padding:0.1em;margin-left:0;' data-icon='hrg-mark' class='btn'>Mode</a></div>"
                + "<div class='ui-block-b'>"
                + "<a style='padding:0.1em;margin-left:0;' data-icon='hrg-value' class='btn' >" + waypoint.failure_mode + "</a></div></div>";

    var htmlcontents5 = " <div class='ui-grid-a' >"
              + "<div class='ui-block-a'>"
              + "<a style='padding:0.1em;margin-left:0;' data-icon='hrg-mark' class='btn'>Action</a></div>"
              + "<div class='ui-block-b'>"
              + "<a style='padding:0.1em;margin-left:0;' data-icon='hrg-value' class='btn' >" + waypoint.header.frame_id + "</a></div></div>";

    $("#waypoint-info-list").append(htmlcontents1);
    $("#waypoint-info-list").append(htmlcontents2);
    $("#waypoint-info-list").append(htmlcontents3);
    $("#waypoint-info-list").append(htmlcontents4);
    $("#waypoint-info-list").append(htmlcontents5);
    $(".btn").button();;

}

function WaypointDelete(dom) {
    var idname = $(dom).parent().parent().parent()[0].id;
    var name = idname.substring(3, idname.length)
    $($(dom).parent().parent().parent()).fadeTo("slow", 0.01, function () {
        $(this).slideUp("slow", function () {
            var index = getIndexFromArray(name, NavEvent.data.WaypointList.waypoints);
            NavEvent.WaypointRemoveTopic.publish(NavEvent.data.WaypointList.waypoints[index]);
            $(this).remove();
        });
    });
}
function TrajectoryDelete(dom) {
    var idname = $(dom).parent().parent().parent()[0].id;
    var name = idname.substring(3, idname.length)
    $($(dom).parent().parent().parent()).fadeTo("slow", 0.01, function () {
        $(this).slideUp("slow", function () {
            var index = getIndexFromArray(name, NavEvent.data.TrajectoryList.trajectories);
            NavEvent.TrajectoryRemoveTopic.publish(NavEvent.data.TrajectoryList.trajectories[index]);
            $(this).remove();
        });
    });
}


function IpCheck(ipStr) {
    str = ipStr;
    str = str.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/g);
    if (str == null) {
        return false;
    } else if (RegExp.$1 > 255 || RegExp.$2 > 255 || RegExp.$3 > 255 || RegExp.$4 > 255) {
        return false;
    } else {
        return true;
    }
}
var CtrolTimer = null;
function manual_control(direction) {
    if (CtrolTimer != null) {
        clearInterval(CtrolTimer);
        CtrolTimer = null;
    }
    CtrolTimer = setInterval(function () {
        ImuJobs.DirectionControl(direction);
    }, 300);
}
function manual_control_stop() {
    if (CtrolTimer != null) {
        clearInterval(CtrolTimer);
        CtrolTimer = null;
    }
    ImuJobs.DirectionControl("stop");
}

function loadImage(imageList) {
    for (var i = 0; i < imageList.length; i++) {
        var img = new Image();
        img.src = imageList[i];
    }
}
function DiagnosticsCallback(data) {
    for (var i = 0; i < data.status.length; i++) {
        if (data.status[i].name == NavEvent.diagnosticsNameEnum.Ros_Mode) {
            switch (data.status[i].message) {
                case NavEvent.CmdEnum.Navigation:
                    if (NavEvent.data.NavigationMode != NavEvent.CmdEnum.Navigation) {
                        console.log(data.status[i].message);
                        NavEvent.data.NavigationMode = data.status[i].message;
                        $("#navigation-mode").text("开启建图");
                        $("#navigation-mode").buttonMarkup({ icon: "hrg-stop" });
                        $(".navigation-mode").text("导航模式");
                        if (NavEvent.data.SaveMapEditTemp) {
                            NavEvent.data.SaveMapEditTemp = false;
                            $("#map-edit-save").buttonMarkup({ icon: "hrg-save" });
                            $.mobile.changePage("#hrg-paramer-set", { transition: "slide" });
                        }
                    }
                    break;
                case NavEvent.CmdEnum.Gmapping:
                    if (NavEvent.data.NavigationMode != NavEvent.CmdEnum.Gmapping) {
                        console.log(data.status[i].message);
                        NavEvent.data.NavigationMode = data.status[i].message;
                        $("#navigation-mode").text("关闭建图");
                        $("#navigation-mode").buttonMarkup({ icon: "hrg-start" });
                        $(".navigation-mode").text("建图模式");
                        $.mobile.changePage("#hrg-map-wizard-2", { transition: "slide" });
                    }
                    break;
                case NavEvent.CmdEnum.Coverting:
                    if (NavEvent.data.NavigationMode != NavEvent.CmdEnum.Coverting) {
                        console.log(data.status[i].message);
                        NavEvent.data.NavigationMode = data.status[i].message;
                        $("#navigation-mode").text("模式切换中...");
                        $("#navigation-mode").buttonMarkup({ icon: "hrg-load" });
                        $(".navigation-mode").text("模式切换中");
                    }
                    break;
                default:
                    break;
            }
            return;
        }
    }
}
function getIndexFromArray(name, list) {
    var index = -1;
    for (var i = 0; i < list.length; i++) {
        if (name == list[i].name) {
            index = i;
            return index;
        }
    }
    return index;
}


function DiagnosisPageCallBack(data) {
    Jobs.unsubscribeDiagnostics(DiagnosisPageCallBack);
    for (var i = 0; i < data.status.length; i++) {
        var tempHtml = "<div data-role='collapsible'>"
                       + "<h3>" + data.status[i].name + "</h3>"
                       + "<p>" + data.status[i].message + "</p>"
                       + "</div>";
        $("#diagnostics-list").append(tempHtml);
    }
    $("#diagnostics-list").trigger("create");
    $("#diagnostics-list").collapsibleset("refresh");
    $("#diagnosis-main img").hide();
}
function getWaypointIcon(index) {
    var waypoint_icon = "none";
    if (NavEvent.data.WaypointList.waypoints[index].header.frame_id == "map") {
        waypoint_icon = "location";
    }
    else if (NavEvent.data.WaypointList.waypoints[index].header.frame_id == "timer") {
        waypoint_icon = "clock";
    }
    else if (NavEvent.data.WaypointList.waypoints[index].header.frame_id == "publisher") {
        waypoint_icon = "navigation";
    }
    else if (NavEvent.data.WaypointList.waypoints[index].header.frame_id == "subscriber") {
        waypoint_icon = "star";
    }
    else if (NavEvent.data.WaypointList.waypoints[index].header.frame_id == "looper") {
        waypoint_icon = "recycle";
    }
    return waypoint_icon;
}
