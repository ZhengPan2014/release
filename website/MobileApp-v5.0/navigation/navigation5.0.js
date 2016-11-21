var NavEvent = NavEvent || {
    REVISION: '0.0.5.0-2016-11.14'
};
//NavEvent.Url = "ws://" + window.location.hostname + ":9090";
NavEvent.Url = "ws://192.168.0.19:9090";
NavEvent.ros = new ROSLIB.Ros();
NavEvent.ros.connect(NavEvent.Url);
NavEvent.data = {
    Connect: false,
    WaypointList: new Array(),
    TrajectoryList: new Array(),
    WaypointsHtml: "<option value='-1'>空</option>",
    LoginName: "",
    LoginPassword: "",
    LockScreen: false,
    NavigationMode: null,
    goalTest: null,
    SaveMapEditFlag: false,
    MachineModel: "NONE",
    MapIsInit: false,
    goalMarkList:new Array(),
}
NavEvent.MachineEnum = {
    NULL: "NONE",
    exhibt: "exhibt",
    ster: "ster",
    liebao: "liebao"
}

NavEvent.diagnosticsNameEnum = {
    Ros_Mode: "/Other/ros_mode",
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
    PLCopen: "rostopic pub -1 /waypoint_user_pub std_msgs/String \"wangjin_open\"",
    PLCclose: "rostopic pub -1 /waypoint_user_pub std_msgs/String \"wangjin_close\"",
    PLCstatus: "rostopic pub -1 /waypoint_user_pub std_msgs/String \"wangjin_status\"",


    Userauth:"user_auth",

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

  
});

NavEvent.ros.on('close', function () {
    NavEvent.data.Connect = false;
});

NavEvent.ros.on('error', function () {
    NavEvent.data.Connect = false;
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
    /*加载导航地图*/
    this.LoadMap = function (width, height, div) {
        var viewer = new ROS2D.Viewer({
            divID: div,
            width: width,
            height: height,
            background: '#ff0000'
        });
        var nav = NAV2D.OccupancyGridClientNav({
            ros: NavEvent.ros,
            rootObject: viewer.scene,
            continuous: true,
            withOrientation: true,
            viewer: viewer,
            serverName: '/move_base'
        });
        NavEvent.data.MapInit = true;
        return viewer.scene;
    }
    /*移除导航地图*/
    this.RemoveMap = function (div) {
        $("#" + div + " canvas").fadeTo("slow", 0.01, function () {
            $(this).slideUp("slow", function () {
                $(this).remove();
                NavEvent.data.MapInit = false;
            })
        });
    }
    /*切换至建图模式*/
    this.Gmapping = function () {
        if (NavEvent.data.NavigationMode == NavEvent.CmdEnum.Gmapping)
            return false;
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.Gmapping);
        NavEvent.cmdTopic.publish(msg);
        return true;
    }
    /*切换至导航模式*/
    this.Navigation = function () {
        if (NavEvent.data.NavigationMode == NavEvent.CmdEnum.Navigation)
            return false;
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.Navigation);
        NavEvent.cmdTopic.publish(msg);
        return true;
    }
    /*建完地图 保存地图*/
    this.SaveMap = function () {
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.GamppingPose);
        NavEvent.cmdTopic.publish(msg);

        var msg1 = new NavEvent.Msg(NavEvent.CmdEnum.SaveMap);
        NavEvent.cmdTopic.publish(msg1);

        var msg2 = new NavEvent.Msg(NavEvent.CmdEnum.SaveMapEdit);
        NavEvent.cmdTopic.publish(msg2);

    }
    /*修改地图*/
    this.SaveMapEdit = function () {
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.SaveAsMapEdit);
        NavEvent.cmdTopic.publish(msg);
        var MapEditArray = MapEditDataConvert();
        var NewMapData = new NavEvent.MapMessage(NavEvent.MapEditMessage.info, MapEditArray);
        NavEvent.MapEditAsTopic.publish(NewMapData);
    }
    /*cancel命令*/
    this.Cancel = function () {
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.Cancel);
        NavEvent.cmdTopic.publish(msg);
    }
    /*关闭手柄*/
    this.CloseHandle = function () {
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.JoystickOff);
        NavEvent.shellTopic.publish(msg);
        var msg1 = new NavEvent.Msg(NavEvent.CmdEnum.Joystick);
        NavEvent.shellTopic.publish(msg1);
    }
    /*开启手柄*/
    this.OpenHandle = function () {
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.JoystickOn);
        NavEvent.shellTopic.publish(msg);
        var msg1 = new NavEvent.Msg(NavEvent.CmdEnum.Joystick);
        NavEvent.shellTopic.publish(msg1);
    }
    /*单点运动   去pose坐标点*/
    this.goPostion = function (pose) {
        if (NavEvent.data.goalTest != null)
            NavEvent.data.goalTest = null;
        NavEvent.data.goalTest = new NavEvent.goal(pose);
        NavEvent.data.goalTest.send();
        NavEvent.data.goalTest.on('status', goalCallback);
    }
    /*开启自动充电*/
    this.ChargeUp = function () {
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.ChargeUp);
        NavEvent.shellTopic.publish(msg);
    }
    /*关闭自动充电*/
    this.ChargeDown = function () {
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.ChargeDown);
        NavEvent.shellTopic.publish(msg);
    }

    /*订阅*/
    this.subscribeDiagnostics = function (DiagnosticsCallback) {
        NavEvent.diagnosticsTopic.subscribe(DiagnosticsCallback);

    }
    this.unsubscribeDiagnostics = function (DiagnosticsCallback) {
        NavEvent.diagnosticsTopic.unsubscribe(DiagnosticsCallback);
    }

    this.subscribeMapEdit = function () {
        NavEvent.MapEditTopic.subscribe(MapEditCallBack);
    };

    this.subscribeShellFeedback = function (ShellFeedbackCallBack) {
        NavEvent.ShellFeedback.subscribe(ShellFeedbackCallBack);
    }

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
    $("#hrg-map-wizard-third").css("background", "grey");
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

var NavJobs = new NavEvent.WorkPool();