var NavEvent = NavEvent || {
    REVISION: '0.0.0.1-2016-10-19'
};


NavEvent.Url = "ws://" + window.location.hostname + ":9090";
//NavEvent.Url = "ws://192.168.0.7:9090";
//NavEvent.Url = "ws://192.168.0.233:9090";
NavEvent.ros = new ROSLIB.Ros();
NavEvent.ros.connect(NavEvent.Url);
NavEvent.ImuTimer = null;
NavEvent.Stage = null;
NavEvent.data = {
    Connect: false,
    StartPoint: null,
    ChargePoint: null,
    SiteList: new Array(),
    GoPostionMode: "Normal",
    LoopCurrentPointIndex: -1,
    LoopNextPointIndex: 0,
    LoopReverse: false,
    NavigationMode: null,
    MapShow: false,
    NoramlCurrentPointIndex: -1,
    SaveMapEditTemp: false,
    WaypointList: new Array(),
    TrajectoryList: new Array(),
    WaypointsHtml: "<option value='-1'>空</option>",
    GopostionCurrentName: "",
    goalMarkList: new Array(),
    LoginName: "",
    LoginPassword: "",
    LockScreen: false,

}


/* cmdTopic  和shellTopic 命令类型*/
NavEvent.CmdEnum = {
    Navigation: "navigation",
    Gmapping: "gmapping",
    Cancel: "cancel",
    Coverting: "converting",
    GamppingPose: "gmapping_pose",
    SaveMap: "save_map",
    SaveMapEdit: "save_map_edit",
    SaveAsMap: "save_as_map",
    SaveAsMapEdit: "save_as_map_edit",
    LoadMap: "load_map",
    LoadMapEdit: "load_map_edit",
    Busy: "busy",
    NULL: "",
    ChargeUp: 'rostopic pub -1 /auto_charge std_msgs/Byte "1"',
    ChargeDown: 'rostopic pub -1 /auto_charge std_msgs/Byte "0"',
    Joystick: '_JOYSTICK=`rosnode list | grep teleop_joystic`; if [[ -n $_JOYSTICK ]]; then _FB="joy_on"; else _FB="joy_off"; fi; rostopic pub -1 /shell_feedback std_msgs/String $_FB',
    JoystickOn: 'roslaunch bringup teleop_joystick.launch',
    JoystickOff: 'rosnode kill /teleop_joystick',
    MapSaveStaus: 'roslaunch bringup map_edit_as_saver.launch; rostopic pub -1 /shell_feedback std_msgs/String "map_edit_ok"',
    Version: "version",

    Version1: "_RC=`grep \'\\\'\'|\'\\\'\' ~/catkin_ws/README.md`;_FB=`echo $_RC | awk -F \'\\\'\'|\'\\\'\' \'\\\'\'{print $10}\'\\\'\'`;_FB=`echo version:$_FB | awk -F \'\\\'\' \'\\\'\' \'\\\'\'{print $1$2}\'\\\'\'`;rostopic pub -1 /shell_feedback std_msgs/String $_FB;unset _FB; unset _RC;",


    plc_open: "rostopic pub -1 /waypoint_user_pub std_msgs/String \"wangjin_open\"",

    plc_close: "rostopic pub -1 /waypoint_user_pub std_msgs/String \"wangjin_close\"",
    plc_status: "rostopic pub -1 /waypoint_user_pub std_msgs/String \"wangjin_status\"",



}
NavEvent.diagnosticsNameEnum = {
    Ros_Mode: "/Other/ros_mode",
}
/* 运动Normal:单点运动;Loop:循环运动;Charge:充电*/
NavEvent.GoPostionModeEnum = {
    Normal: "Normal",
    Loop: "Loop",
    Charge: "Charge",
}


NavEvent.Msg = new ROSLIB.Message({
    data: NavEvent.CmdEnum.NULL
}),
  NavEvent.modeTopic = new ROSLIB.Topic({
      ros: NavEvent.ros,
      name: "/system_mode",
      messageType: "std_msgs/String"
  }),
 NavEvent.cmdTopic = new ROSLIB.Topic({
     ros: NavEvent.ros,
     name: "/cmd_string",
     messageType: "std_msgs/String"
 }),
 NavEvent.shellTopic = new ROSLIB.Topic({
     ros: NavEvent.ros,
     name: "/shell_string",
     messageType: "std_msgs/String"
 }),

 NavEvent.imuTopic = new ROSLIB.Topic({
     ros: NavEvent.ros,
     name: '/mobile_imu',
     messageType: 'sensor_msgs/Imu'
 });

NavEvent.velTopic = new ROSLIB.Topic({
    ros: NavEvent.ros,
    name: '/cmd_vel',
    messageType: 'geometry_msgs/Twist'
});
NavEvent.odomTopic = new ROSLIB.Topic({
    ros: NavEvent.ros,
    name: '/odom',
    messageType: 'nav_msgs/Odometry'
});
NavEvent.poseTopic = new ROSLIB.Topic({
    ros: NavEvent.ros,
    name: '/robot_pose',
    messageType: 'geometry_msgs/Pose',
    throttle_rate: 100
});
NavEvent.diagnosticsTopic = new ROSLIB.Topic({
    ros: NavEvent.ros,
    name: '/diagnostics_agg',
    messageType: 'diagnostic_msgs/DiagnosticArray',
    throttle_rate: 100
});


NavEvent.MapEditTopic = new ROSLIB.Topic({
    ros: NavEvent.ros,
    name: '/map_edit',
    messageType: 'nav_msgs/OccupancyGrid',
    compression: 'png'
});
NavEvent.MapEditAsTopic = new ROSLIB.Topic({
    ros: NavEvent.ros,
    name: '/map_edit_as',
    messageType: 'nav_msgs/OccupancyGrid'
});
NavEvent.WaypointTopic = new ROSLIB.Topic({
    ros: NavEvent.ros,
    name: '/waypoints',
    messageType: 'yocs_msgs/WaypointList'
});

NavEvent.TrajectoryTopic = new ROSLIB.Topic({
    ros: NavEvent.ros,
    name: '/trajectories',
    messageType: 'yocs_msgs/TrajectoryList'
});

NavEvent.WaypointAddTopic = new ROSLIB.Topic({
    ros: NavEvent.ros,
    name: '/waypoint_add',
    messageType: 'yocs_msgs/Waypoint'
});

NavEvent.WaypointRemoveTopic = new ROSLIB.Topic({
    ros: NavEvent.ros,
    name: '/waypoint_remove',
    messageType: 'yocs_msgs/Waypoint'
});

NavEvent.TrajectoryAddTopic = new ROSLIB.Topic({
    ros: NavEvent.ros,
    name: '/trajectory_add',
    messageType: 'yocs_msgs/Trajectory'
});

NavEvent.TrajectoryRemoveTopic = new ROSLIB.Topic({
    ros: NavEvent.ros,
    name: '/trajectory_remove',
    messageType: 'yocs_msgs/Trajectory'
});

NavEvent.NavCtrlTopic = new ROSLIB.Topic({
    ros: NavEvent.ros,
    name: '/nav_ctrl',
    messageType: 'yocs_msgs/NavigationControl'
});
NavEvent.NavCtrlStatusTopic = new ROSLIB.Topic({
    ros: NavEvent.ros,
    name: '/nav_ctrl_status',
    messageType: 'yocs_msgs/NavigationControlStatus'
});




NavEvent.ShellFeedback = new ROSLIB.Topic({
    ros: NavEvent.ros,
    name: '/shell_feedback',
    messageType: 'std_msgs/String'
});


NavEvent.actionClient = new ROSLIB.ActionClient({
    ros: NavEvent.ros,
    actionName: 'move_base_msgs/MoveBaseAction',
    serverName: '/move_base'
});

NavEvent.ros.on('connection', function () {
    NavEvent.data.Connect = true;
    $(".networkstatus").buttonMarkup({ icon: "hrg-networksuccess" });
    NavEvent.data.StartPoint = new NavEvent.pose(0, 0, 0, 1);
    NavEvent.data.ChargePoint = new NavEvent.pose(0, 0, 0, 1);

    NavEvent.ShellFeedback.subscribe(function (data) {
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
                if (NavEvent.data.LoginName == "" || NavEvent.data.LockScreen) {
                    break;
                }
                var msg = new NavEvent.Msg(NavEvent.CmdEnum.LoadMapEdit);
                NavEvent.cmdTopic.publish(msg);
                $("#hrg-map-wizard-2-savemap").buttonMarkup({ icon: "hrg-save" });
                $.mobile.changePage("#hrg-map-wizard-3", { transition: "slide" });
                break;
            case "save_as_map_edit":
                if (NavEvent.data.LoginName == "" || NavEvent.data.LockScreen) {
                    break;
                }
                NavEvent.data.SaveMapEditTemp = true;
                new NavEvent.WorkPool().Navigation();
                break;
            default:
                var temp = data.data.split(':');
                if (temp[0] == "version") {
                    $(".version").html(temp[1]);
                }
                else if (temp[0] == "user_status") {
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
                    hty_plc_status = HTY_PLC_STATUS.temp[1];
                }
                break;
        }
    });

    var msg = new NavEvent.Msg(NavEvent.CmdEnum.Joystick);
    NavEvent.shellTopic.publish(msg);
    var msg1 = new NavEvent.Msg(NavEvent.CmdEnum.Version);
    NavEvent.cmdTopic.publish(msg1);
});

NavEvent.ros.on('close', function () {
    NavEvent.data.Connect = false;
    $(".networkstatus").buttonMarkup({ icon: "hrg-networkerror" });
});
NavEvent.ros.on('error', function () {
    NavEvent.data.Connect = false;
    $(".networkstatus").buttonMarkup({ icon: "hrg-networkerror" });
});
NavEvent.Msg = function (cmd) {
    return new ROSLIB.Message({
        data: cmd
    });
}

NavEvent.MapMessage = function (info, data) {
    return new ROSLIB.Message({
        header: {
            frame_id: "/map",
            seq: 0
        },
        info: info,
        data: data
    });
}

NavEvent.pose = function (posX, posY, oriZ, oriW) {
    return new ROSLIB.Pose({
        position: { x: posX, y: posY, z: 0.0 },
        orientation: { x: 0.0, y: 0.0, z: oriZ, w: oriW }
    });
}

NavEvent.WaypointMessage = function (name, pose, close_enough, goal_timeout, failure_mode, frame_id) {
    return new ROSLIB.Message({
        header: {
            frame_id: frame_id,
        },
        close_enough: close_enough,
        goal_timeout: goal_timeout,
        failure_mode: failure_mode,
        name: name,
        pose: pose,
    });
}
NavEvent.TrajectoryMessage = function (name, waypoints) {
    return new ROSLIB.Message({
        name: name,
        waypoints: waypoints
    });
}
NavEvent.NavCtrlMessage = function (control, goal_name) {
    return new ROSLIB.Message({
        control: control,
        goal_name: goal_name
    });
}


NavEvent.goal = function (pose) {
    return new ROSLIB.Goal({
        actionClient: NavEvent.actionClient,
        goalMessage: {
            target_pose: {
                header: {
                    frame_id: '/map'
                },
                pose: pose
            }
        }
    });
}


NavEvent.twistMessage = function (linear_x, angular_z) {
    return new ROSLIB.Message({
        linear: {
            x: linear_x,
            y: 0,
            z: 0
        },
        angular: {
            x: 0,
            y: 0,
            z: angular_z
        },
    });
}




NavEvent.WorkPool = function () {

    this.LoadMap = function (width, height, div) {
        var viewer = new ROS2D.Viewer({
            divID: div,
            width: width,
            height: height,
            background: '#ff0000'
        });

        // Setup the nav client.
        var nav = NAV2D.OccupancyGridClientNav({
            ros: NavEvent.ros,
            rootObject: viewer.scene,
            continuous: true,
            withOrientation: true,
            viewer: viewer,
            serverName: '/move_base'
        });

        return viewer.scene;
    }

    this.RemoveMap = function (div) {
        $("#" + div + " canvas").fadeTo("slow", 0.01, function () {
            $(this).slideUp("slow", function () {
                $(this).remove();
            })
        });
    }
    this.Gmapping = function () {
        if (NavEvent.data.NavigationMode == NavEvent.CmdEnum.Gmapping)
            return false;
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.Gmapping);
        NavEvent.cmdTopic.publish(msg);
        return true;
    }
    this.Navigation = function () {
        if (NavEvent.data.NavigationMode == NavEvent.CmdEnum.Navigation)
            return false;
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.Navigation);
        NavEvent.cmdTopic.publish(msg);
        return true;
    }
    this.SaveMap = function () {
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.GamppingPose);
        NavEvent.cmdTopic.publish(msg);

        var msg1 = new NavEvent.Msg(NavEvent.CmdEnum.SaveMap);
        NavEvent.cmdTopic.publish(msg1);

        var msg2 = new NavEvent.Msg(NavEvent.CmdEnum.SaveMapEdit);
        NavEvent.cmdTopic.publish(msg2);

    }
    this.SaveMapEdit = function () {
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.SaveAsMapEdit);
        NavEvent.cmdTopic.publish(msg);
        var MapEditArray = MapEditDataConvert();
        var NewMapData = new NavEvent.MapMessage(NavEvent.MapEditMessage.info, MapEditArray);
        NavEvent.MapEditAsTopic.publish(NewMapData);
    }
    this.Cancel = function () {
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.Cancel);
        NavEvent.cmdTopic.publish(msg);
    }

    this.CloseHandle = function () {
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.JoystickOff);
        NavEvent.shellTopic.publish(msg);
        var msg1 = new NavEvent.Msg(NavEvent.CmdEnum.Joystick);
        NavEvent.shellTopic.publish(msg1);
    }
    this.OpenHandle = function () {
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.JoystickOn);
        NavEvent.shellTopic.publish(msg);
        var msg1 = new NavEvent.Msg(NavEvent.CmdEnum.Joystick);
        NavEvent.shellTopic.publish(msg1);
    }

    this.goPostion = function (pose, mode) {
        NavEvent.data.GoPostionMode = mode;
        console.log(NavEvent.data.GoPostionMode);
        if (NavEvent.data.goalTest != null)
            NavEvent.data.goalTest = null;
        NavEvent.data.goalTest = new NavEvent.goal(pose);
        NavEvent.data.goalTest.send();
        NavEvent.data.goalTest.on('status', goalCallback);
    }
    this.ChargeUp = function () {
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.ChargeUp);
        NavEvent.shellTopic.publish(msg);
    }
    this.ChargeDown = function () {
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.ChargeDown);
        NavEvent.shellTopic.publish(msg);
    }



    this.subscribeDiagnostics = function (DiagnosticsCallback) {
        NavEvent.diagnosticsTopic.subscribe(DiagnosticsCallback);

    }
    this.unsubscribeDiagnostics = function (DiagnosticsCallback) {
        NavEvent.diagnosticsTopic.unsubscribe(DiagnosticsCallback);
    }

    this.subscribeMapEdit = function () {
        NavEvent.MapEditTopic.subscribe(MapEditCallBack);
    };


    this.DrawPoint = function (stage, pose, status) {

        var goalMarker = new ROS2D.NavigationArrow({
            size: 15,
            strokeSize: 1,
            fillColor: createjs.Graphics.getRGB(255, 64, 128, 0.66),
            pulse: true
        });

        goalMarker.x = pose.position.x;
        goalMarker.y = pose.position.y;
        goalMarker.rotation = stage.rosQuaternionToGlobalTheta(pose.orientation);
        goalMarker.scaleX = 1.0 / stage.scaleX;
        goalMarker.scaleY = 1.0 / stage.scaleY;
        if (status) {
            stage.addChild(goalMarker);
        }
        else {
            stage.removeChild(goalMarker);
        }
        return goalMarker;
    }

}


function goalCallback(status) {

    switch (status.status) {
        case 3:
            NavEvent.data.goalTest.off('status', goalCallback);
            break;
        case 4:
            NavEvent.data.goalTest.off('status', goalCallback);
            break;
        default:
            break;
    }


}


NavEvent.Site = function (name, postionX, postionY, OrientationZ, OrientationW, status, waittime) {
    this.name = name;
    this.postionX = postionX;
    this.postionY = postionY;
    this.postionZ = 0.0;
    this.OrientationX = 0.0;
    this.OrientationY = 0.0;
    this.OrientationZ = OrientationZ;
    this.OrientationW = OrientationW;
    this.going = status;
    this.waittime = waittime;
}
Array.prototype.del = function (index) {
    if (isNaN(index) || index >= this.length) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[index]) {
            this[n++] = this[i];
        }
    }
    this.length -= 1;
};

function MapEditDataConvert() {
    var MapEditArray = new Array();
    var cxtMap = document.getElementById("map-edit-canvas").getContext("2d");
    var canvas = document.getElementById('map-edit-canvas');
    var imgData = cxtMap.getImageData(0, 0, canvas.width, canvas.height);

    for (var row = 0; row < canvas.height; row++) {
        for (var col = 0; col < canvas.width; col++) {
            var j = col + ((canvas.height - row - 1) * canvas.width);
            var i = (col + (row * canvas.width)) * 4;

            switch (imgData.data[i]) {
                case 0:
                    MapEditArray[j] = 100;
                    break;
                case 255:
                    MapEditArray[j] = 0;
                    break;
                case 127:
                    MapEditArray[j] = -1;
                    break;
                default:
                    MapEditArray[j] = 100;
                    break;
            }

        }
    }
    return MapEditArray;
};


function MapEditCallBack(message) {
    console.log(message);
    $("#map-edit-canvas-father img").hide();
    NavEvent.MapEditTopic.unsubscribe(MapEditCallBack);
    NavEvent.MapEditMessage = message;



    var canvas = document.getElementById('map-edit-canvas');
    var context = canvas.getContext('2d');

    canvas.width = message.info.width;
    canvas.height = message.info.height;


    var imageData = context.createImageData(canvas.width, canvas.height);
    for (var row = 0; row < canvas.height; row++) {
        for (var col = 0; col < canvas.width; col++) {
            var mapI = col + ((canvas.height - row - 1) * canvas.width);
            var data = message.data[mapI];
            var val;
            if (data === 100) {
                val = 0;

            } else if (data === 0) {
                val = 255;
            } else {
                val = 127;
            }
            var i = (col + (row * canvas.width)) * 4;
            // r
            imageData.data[i] = val;
            // g
            imageData.data[++i] = val;
            // b
            imageData.data[++i] = val;
            // a
            imageData.data[++i] = 255;
        }
    }
    context.putImageData(imageData, 0, 0);
    $("#hrg-map-wizard-3").css("background", "grey");
    $("#map-edit-canvas").show();
    var test = document.getElementById("map-edit-canvas-father");
    test.scrollLeft = test.scrollWidth / 2 - 100;
    test.scrollTop = test.scrollHeight / 2 - 100;


}
Array.prototype.del = function (index) {
    if (isNaN(index) || index >= this.length) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[index]) {
            this[n++] = this[i];
        }
    }
    this.length -= 1;
};

