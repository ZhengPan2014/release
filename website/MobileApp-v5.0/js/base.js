
var BaseEvent = BaseEvent || {
    REVISION: '0.0.5.0-2016-11.15'
};



$(function () {
    document.oncontextmenu = function (e) {
        e.preventDefault();
    }


    NavJobs.subscribeShellFeedback(ShellFeedbackCallBack);


    var msg = new NavEvent.Msg(NavEvent.CmdEnum.Userauth);
    NavEvent.cmdTopic.publish(msg);



    $('#hrg-navigation-main-page').live('pageshow', function (event, ui) {
        if (ui.prevPage[0].id == "hrg-login-page") {
            if (!NavEvent.data.MapIsInit) {
                var htmlcontents = "<a  href='#hrg-user-manger-page' data-transition='slide' class='btn-hty ui-btn ui-icon-hrg-user ui-btn-icon-notext ui-corner-all ui-btn-left'></a>";
                $("#hrg-meun-page-header").append(htmlcontents);

                var htmlcontents1 = "<a href='#hrg-hty-super-page' class='btn-hty' data-transition='slide' data-role='button' data-icon='carat-r' data-iconpos='right' style='background: #0ff;'>HTY-SUPER SD6</a>";
                $("#hrg-meun-page-content").append(htmlcontents1);

                if (!NavEvent.data.MapIsInit) {
                    NavJobs.LoadMap(800, 800, "nav");
                }
            }
        }
        else if (ui.prevPage[0].id == "hrg-main-page") {
            if (!NavEvent.data.MapIsInit) {
                NavJobs.LoadMap(800, 800, "nav");
            }
        }
       
    });



    //锁屏  解锁
    $("#btn-lock-software").click(function () {
        NavEvent.data.LockScreen = true;
        $("#hrg-lock-software-popup").popup("open");
    });
    $("#btn-unlock-software").click(function () {
        if ($("#lock-password")[0].value == NavEvent.data.LoginPassword) {
            $("#lock-password")[0].value = "";
            $("#hrg-lock-software-popup").popup("close");
            NavEvent.data.LockScreen = false;
        }
        else {
            sweetAlert("输入密码错误", "", "error");
        }
    });

    /*建图步骤*/
    $("#btn-start-create-map").click(function () {

        if ($(this).text() != "模式切换中...") {

            $(this).text("模式切换中...");
            $(this).buttonMarkup({ icon: "hrg-load" });
            if (NavEvent.data.NavigationMode == NavEvent.CmdEnum.Navigation) {
                NavJobs.Gmapping();
            }
            else if (NavEvent.data.NavigationMode == NavEvent.CmdEnum.Gmapping) {
                NavJobs.Navigation();
            }
            else if (NavEvent.data.NavigationMode == NavEvent.CmdEnum.Coverting) {

            }
            else {
                $(this).text("开启建图");
                $(this).buttonMarkup({ icon: "hrg-stop" });
            }
        }
    });

    $('#hrg-map-wizard-frist').live('pageshow', function (event, ui) {
        NavJobs.subscribeDiagnostics(DiagnosticsCallback);
    });


    $("#hrg-map-wizard-frist-close").click(function () {
        $.mobile.changePage("#hrg-meun-page", { transition: "slide" });
    });

    $('#hrg-map-wizard-second').live('pageshow', function (event, ui) {
        NavJobs.LoadMap(800, 800, 'nav1');

        $("#nav1 canvas").on("taphold", function () {
            $("#hrg-manual-control-popup").popup();
            $("#hrg-manual-control-popup").popup("open");
        });
    });

    $("#map-save").click(function () {
        NavJobs.SaveMap();
        $(this).buttonMarkup({ icon: "hrg-load" });

    });

    $('#hrg-map-wizard-second').live('pagehide', function (event, ui) {
        NavJobs.RemoveMap('nav1');
        $("#nav1 canvas").off("taphold");


    });


    $('#hrg-map-wizard-third').live('pageshow', function (event, ui) {

        DisableBrush(map_edit_canvas_father);


        $("#map-edit-canvas").hide();
        $("#map-edit-canvas-father img").show();
        NavJobs.subscribeMapEdit();
        $(this).css("background", "white");
    });


    var map_edit_canvas_father = document.getElementById("map-edit-canvas-father");
    $("#map-scorll").click(function () {
        if (map_edit_canvas_father.style.overflow == "hidden") {
            DisableBrush(map_edit_canvas_father);
        }
        else {
            EnableBrush(map_edit_canvas_father);
        }
    });

    $("#map-edit-save").click(function () {
        $(this).buttonMarkup({ icon: "hrg-load" });
        NavJobs.SaveMapEdit();
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


    $('#hrg-map-wizard-third').live('pagehide', function (event, ui) {
        NavJobs.unsubscribeDiagnostics(DiagnosticsCallback);
    });




    /*系统诊断*/
    $('#hrg-system-diagnosis-page').live('pageshow', function (event, ui) {
        NavJobs.subscribeDiagnostics(DiagnosisPageCallBack);
    });
    $('#hrg-system-diagnosis-page').live('pagehide', function (event, ui) {
        $("#diagnostics-list div").remove();
        $("#diagnosis-main img").show();
    });


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


    $("#btn-add-waypoint").click(function () {
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
        $.mobile.changePage("#hrg-navigation-setting-page", { transition: "slide" });
    });


    $('#hrg-add-trajectory-page').live('pagehide', function (event, ui) {
        item = 0;
        $("#waypoint-item select").remove();
    });

    var item = 0;


    $("#btn-add-waypoint-item").click(function () {
        item++;
        var htmlcontents = "<select name='select-native-" + item + "'id='select-native-" + item + "' data-iconpos='right' onchange='DeleteSelectOption(this)'>"
             + NavEvent.data.WaypointsHtml + "</select>";
        $("#waypoint-item").append(htmlcontents);

        $("#select-native-" + item).selectmenu();
        $("#select-native-" + item).selectmenu("refresh");

        $("#select-native-" + item).parent().parent().hide();
        $("#select-native-" + item).parent().parent().fadeIn(2000);
    });

    $("#btn-add-trajectory").click(function () {
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
        for (var i = 1; i <= item; i++) {
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
})
function DisableBrush(tempDom) {
    tempDom.style.overflow = "scroll";
    BrushJobs.DisableCanvasEdit();
    $("#map-scorll").text("启用画笔");
    $("#map-lines-add").prop('disabled', true).addClass("ui-disabled");
    $("#map-lines-delete").prop('disabled', true).addClass("ui-disabled");

}
function EnableBrush(tempDom) {
    tempDom.style.overflow = "hidden";
    BrushJobs.EnableCanvasEdit("map-edit-canvas");
    $("#map-scorll").text("禁用画笔");
    $("#map-lines-add").prop('disabled', false).removeClass("ui-disabled");
    $("#map-lines-delete").prop('disabled', false).removeClass("ui-disabled");
}

function DiagnosticsCallback(data) {
    console.log(data);
    for (var i = 0; i < data.status.length; i++) {
        if (data.status[i].name == NavEvent.diagnosticsNameEnum.Ros_Mode) {
            switch (data.status[i].message) {
                case NavEvent.CmdEnum.Navigation:
                    if (NavEvent.data.NavigationMode != NavEvent.CmdEnum.Navigation) {
                        console.log(data.status[i].message);
                        NavEvent.data.NavigationMode = data.status[i].message;
                        $("#btn-start-create-map").text("开启建图");
                        $("#btn-start-create-map").buttonMarkup({ icon: "hrg-stop" });
                        if (NavEvent.data.SaveMapEditTemp) {
                            NavEvent.data.SaveMapEditTemp = false;
                            $("#map-edit-save").buttonMarkup({ icon: "hrg-save" });
                            $.mobile.changePage("#hrg-meun-page", { transition: "slide" });
                        }
                    }
                    break;
                case NavEvent.CmdEnum.Gmapping:
                    if (NavEvent.data.NavigationMode != NavEvent.CmdEnum.Gmapping) {
                        console.log(data.status[i].message);
                        NavEvent.data.NavigationMode = data.status[i].message;
                        $("#btn-start-create-map").text("关闭建图");
                        $("#btn-start-create-map").buttonMarkup({ icon: "hrg-start" });
                        $.mobile.changePage("#hrg-map-wizard-second", { transition: "slide" });
                    }
                    break;
                case NavEvent.CmdEnum.Coverting:
                    if (NavEvent.data.NavigationMode != NavEvent.CmdEnum.Coverting) {
                        console.log(data.status[i].message);
                        NavEvent.data.NavigationMode = data.status[i].message;
                        $("#btn-start-create-map").text("模式切换中...");
                        $("#btn-start-create-map").buttonMarkup({ icon: "hrg-load" });
                    }
                    break;
                default:
                    break;
            }
            return;
        }
    }
}
function ShellFeedbackCallBack(data) {
    console.log(data);
    switch (data.data) {
        case "joy_on":
            $("#handle-switch").text("手柄关闭");
            $("#handle-switch").buttonMarkup({ icon: "hrg-start" });
            break;
        case "joy_off":
            $("#handle-switch").text("手柄开启");
            $("#handle-switch").buttonMarkup({ icon: "hrg-stop" });
            break;
        case "save_map":
            var msg = new NavEvent.Msg(NavEvent.CmdEnum.LoadMap);
            NavEvent.cmdTopic.publish(msg);
            break;
        case "save_map_edit":
            var msg = new NavEvent.Msg(NavEvent.CmdEnum.LoadMapEdit);
            NavEvent.cmdTopic.publish(msg);
            $("#hrg-savemap").buttonMarkup({ icon: "hrg-save" });
            $.mobile.changePage("#hrg-map-wizard-third", { transition: "slide" });
            break;
        case "save_as_map_edit":
            NavEvent.data.SaveMapEditFlag = true;
            NavJobs.Navigation();
            break;
        default:
            var temp = data.data.split(':');
            switch (temp[0]) {
                case "version":
                    $(".version").html(temp[1]);
                    break;
                case "user_status":
                    if (temp[1] == 256) {
                        $("#btn-plc").buttonMarkup({ icon: "hty-normal-run" });
                    }
                    else if (temp[1] == 257) {
                        $("#btn-plc").buttonMarkup({ icon: "hty-error-run" });
                    }
                    else if (temp[1] == 0) {
                        $("#btn-plc").buttonMarkup({ icon: "hty-stop" });
                    }
                    else if (temp[1] == 1) {
                        $("#btn-plc").buttonMarkup({ icon: "hty-error-stop" });
                    }
                    else {
                    }
                    break;
                case "user_auth":
                    NavEvent.data.MachineModel = temp[1];
                    var msg1 = new NavEvent.Msg(NavEvent.CmdEnum.Joystick);
                    NavEvent.shellTopic.publish(msg1);
                    var msg2 = new NavEvent.Msg(NavEvent.CmdEnum.Version);
                    NavEvent.cmdTopic.publish(msg2);
                    if (temp[1] == "true") {
                        $.mobile.changePage("#hrg-login-page", { transition: "slide" });
                    }
                    else {
                        $.mobile.changePage("#hrg-navigation-main-page", { transition: "slide" });
                    }
                    break;
            }
            break;
    };
}

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