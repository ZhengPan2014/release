var NavEvent = NavEvent || {
    REVISION: '0.0.0.1-2016-9-2'
};

NavEvent.connecting = false;
NavEvent.Url = "ws://" + window.location.hostname + ":9090";
//NavEvent.Url = "ws://192.168.0.7:9090";
//NavEvent.Url = "ws://192.168.0.233:9090";
NavEvent.ros = new ROSLIB.Ros();
NavEvent.ros.connect(NavEvent.Url);
NavEvent.SiteList = new Array();
NavEvent.Loop = false;
NavEvent.imuLock = false;
NavEvent.goalTest = null;
NavEvent.MapEditMessage=null;
NavEvent.NavigationMode = "";
NavEvent.ros.on('connection', function () {
    NavEvent.connecting = true;
    $(".netStaus").attr("src", "image/icon2.png");

    NavEvent.modeTopic.subscribe(function (data) {
        $("#log").html(data.data);
        switch (data.data) {
            case NavEvent.CmdEnum.Navigation:
                $("#saveMap").prop('disabled', true).addClass("ui-disabled");
                NavEvent.NavigationMode = data.data;
                $("#switch2")[0].selectedIndex = 0;
                $("#switch2").slider("refresh");
                $("#saveMap").prop('disabled', true).addClass("ui-disabled");
                break;
            case NavEvent.CmdEnum.Gmapping:
                $("#saveMap").prop('disabled', false).removeClass("ui-disabled");
                NavEvent.NavigationMode = data.data;
                $("#switch2")[0].selectedIndex = 1;
                $("#switch2").slider("refresh");
                $("#saveMap").prop('disabled', false).removeClass("ui-disabled");
                break;
            case NavEvent.CmdEnum.Busy:
                alert("system busy");
                break;
            default:
                break;
        }
    });

    NavEvent.Msg.data = NavEvent.CmdEnum.Joystick;
    NavEvent.shellTopic.publish(NavEvent.Msg);

    NavEvent.ShellFeedback.subscribe(function (data) {
        console.log(data);
        switch (data.data) {

            case "map_edit_ok":
                $("#map-edit-save").buttonMarkup({ icon: "mysave" });
                break;
            case "joy_on":
                $("#joy-select")[0].selectedIndex = 1;
                $("#joy-select").slider("refresh");
                break;
            case "joy_off":
                $("#joy-select")[0].selectedIndex = 0;
                $("#joy-select").slider("refresh");
                break;
            default:
                break;

        }
    });


});

NavEvent.ros.on('close', function () {
    NavEvent.connecting = false;
    $(".netStaus").attr("src", "image/icon3.png");
});

NavEvent.CmdEnum = {
    Navigation: "navigation",
    Gmapping: "gmapping",
    Cancel: "cancel",
    GamppingPose: "gmapping_pose",
    SaveMap: "save_map",
    SaveMapEdit: "save_map_edit",
    SaveAsMapEdit: "save_as_map_edit",
    Busy: "busy",
    NULL: "",
    ChargeUp: 'rostopic pub -1 /auto_charge std_msgs/Byte "1"',
    ChargeDown: 'rostopic pub -1 /auto_charge std_msgs/Byte "0"',
    Joystick: '_JOYSTICK=`rosnode list | grep teleop_joystic`; if [[ -n $_JOYSTICK ]]; then _FB="joy_on"; else _FB="joy_off"; fi; rostopic pub -1 /system_shell/shell_feedback std_msgs/String $_FB',
    JoystickOn:'roslaunch bringup teleop_joystick.launch',
    JoystickOff:'rosnode kill /teleop_joystick',
    MapSaveStaus:'roslaunch bringup map_edit_as_saver.launch; rostopic pub -1 /system_shell/shell_feedback std_msgs/String "map_edit_ok"',
}
NavEvent.goPostionMode = null;
NavEvent.SendGoalModeEnum = {
    
    Normal: "Normal",
    Loop: "Loop",
    Charge: "Charge",
}
NavEvent.ImuData = {
    alpha: 0.0,
    gamma: 0.0,
    beta: 0.0,
    x: 0.0,
    y: 0.0,
    z: 0.0,
    r: 0.0
}
NavEvent.AccelerationParameter = {
    forward_l: -5.0,
    forward_r: -2.0,
    back_l: 2.0,
    back_r: 5.0,
    halt_l: -2.0,
    halt_r: 2.0,
    left_l: -2.5,
    left_r: -1.5,
    right_l: 1.5,
    right_r: 2.5,
    mid_l: -1.5,
    mid_r: 1.5,

    max_linear_vel: 0.4,
    max_angular_vel: 0.4,

    linear_vel: 0,
    angular_vel: 0
}

NavEvent.ImuTimer = null;
NavEvent.Msg = new ROSLIB.Message({
    data: NavEvent.CmdEnum.NULL
}),
  NavEvent.modeTopic = new ROSLIB.Topic({
      ros: NavEvent.ros,
      name: "/system_shell/system_mode",
      messageType: "std_msgs/String"
  }),
 NavEvent.cmdTopic = new ROSLIB.Topic({
     ros: NavEvent.ros,
     name: "/system_shell/cmd_string",
     messageType: "std_msgs/String"
 }),
 NavEvent.shellTopic = new ROSLIB.Topic({
     ros: NavEvent.ros,
     name: "/system_shell/shell_string",
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

NavEvent.ShellFeedback = new ROSLIB.Topic({
    ros: NavEvent.ros,
    name: '/system_shell/shell_feedback',
    messageType: 'std_msgs/String'
});

NavEvent.MapMessage = function (info,data) {
   return new ROSLIB.Message({
        header: {
            frame_id: "/map",
            seq: 0
        },
        info:info,
        data: data
    });
}

NavEvent.pose = function (posX, posY, oriZ, oriW) {
    return new ROSLIB.Pose({
        position: { x: posX, y: posY, z: 0.0 },
        orientation: { x: 0.0, y: 0.0, z: oriZ, w: oriW }
    });
}


NavEvent.actionClient = new ROSLIB.ActionClient({
    ros: NavEvent.ros,
    actionName: 'move_base_msgs/MoveBaseAction',
    serverName: '/move_base'
});



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
NavEvent.imuMessage = function (x, y, z, w, beta, gamma, alpha, ImuData_x, ImuData_y, ImuData_z) {

    return new ROSLIB.Message({
        header: {
            frame_id: "world"
        },
        orientation: {
            x: x,
            y: y,
            z: z,
            w: w
        },
        orientation_covariance: [0, 0, 0, 0, 0, 0, 0, 0, 0],

        angular_velocity: {
            x: beta,
            y: gamma,
            z: alpha
        },

        angular_velocity_covariance: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        linear_acceleration: {
            x: ImuData_x,
            y: ImuData_y,
            z: ImuData_z
        },
        linear_acceleration_covariance: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    })
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
    this.subscribeMapEdit = function () {
        NavEvent.MapEditTopic.subscribe(MapEditDataGet);
    };

    this.MapInit = function (width, height) {
        console.log(width,height);
        var viewer = new ROS2D.Viewer({
            divID: 'nav',
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

    }

    this.RemoveMap = function () {
        $("#nav canvas").fadeTo("slow", 0.01, function () {
            $("#nav canvas").slideUp("slow", function () {
                $("#nav canvas").remove();
            })
        });

    }
    this.Gmapping = function () {
        if (NavEvent.NavigationMode == NavEvent.CmdEnum.Gmapping)
            return;

        NavEvent.Msg.data = NavEvent.CmdEnum.Gmapping;
        NavEvent.cmdTopic.publish(NavEvent.Msg);
        console.log(NavEvent.Msg.data);

    }


    this.Navigation = function () {
        if (NavEvent.NavigationMode == NavEvent.CmdEnum.Navigation)
            return;
        NavEvent.Msg.data = NavEvent.CmdEnum.Navigation;
        NavEvent.cmdTopic.publish(NavEvent.Msg);
        console.log(NavEvent.Msg.data);

    }
    this.SaveMap = function () {
        NavEvent.Msg.data = NavEvent.CmdEnum.GamppingPose;
        NavEvent.cmdTopic.publish(NavEvent.Msg);
        NavEvent.Msg.data = NavEvent.CmdEnum.SaveMap;
        NavEvent.cmdTopic.publish(NavEvent.Msg);
        NavEvent.Msg.data = NavEvent.CmdEnum.SaveMapEdit;
        NavEvent.cmdTopic.publish(NavEvent.Msg);
        console.log("saveMap");
    }
    this.SaveMapEdit = function () {
        //NavEvent.Msg.data = NavEvent.CmdEnum.SaveAsMapEdit;
        //NavEvent.cmdTopic.publish(NavEvent.Msg);
        NavEvent.Msg.data = NavEvent.CmdEnum.MapSaveStaus;
        NavEvent.shellTopic.publish(NavEvent.Msg);
        var MapEditArray = MapEditDataConvert();
        var NewMapData = new NavEvent.MapMessage(NavEvent.MapEditMessage.info, MapEditArray);
        NavEvent.MapEditAsTopic.publish(NewMapData);
        console.log(NavEvent.CmdEnum.SaveAsMapEdit);

    }
    this.Cancel = function () {
        NavEvent.Msg.data = NavEvent.CmdEnum.Cancel;
        NavEvent.cmdTopic.publish(NavEvent.Msg);
        console.log(NavEvent.Msg.data);
    }
    this.OpenIMU = function () {
        if (window.DeviceOrientationEvent) {
            window.addEventListener(
                           "deviceorientation", DeviceOrientationCallback);
        }
        else {
            alert("deviceorientation no support");
        }
        if (window.DeviceMotionEvent) {
            window.addEventListener(
                  "devicemotion", DeviceMotionCallback);
        }
        else {
            alert("devicemotion no support");
        }
        NavEvent.ImuTimer = setInterval(imuSnapShot, 200);
    }
    this.CloseIMU = function () {

        if (window.DeviceOrientationEvent) {
            window.removeEventListener(
                           "deviceorientation", DeviceOrientationCallback);
        }
        if (window.DeviceMotionEvent) {
            window.removeEventListener(
                  "devicemotion", DeviceMotionCallback);
        }

        if (NavEvent.ImuTimer != null) {
            clearInterval(NavEvent.ImuTimer);
            NavEvent.ImuTimer = null;
        }
    }

    this.subscribeVel = function () {
        NavEvent.velTopic.subscribe(VelCallback);
    }
    this.unsubscribeVel = function () {
        NavEvent.velTopic.unsubscribe(VelCallback);
    }

    this.subscribeDiagnostics = function (DiagnosticsCallback) {
        NavEvent.diagnosticsTopic.subscribe(DiagnosticsCallback);

    }
    this.unsubscribeDiagnostics = function () {
        NavEvent.diagnosticsTopic.unsubscribe();
    }
    this.MjpegInit = function (width, height) {
        var viewer = new MJPEGCANVAS.Viewer({
            divID: 'mjpeg',
            host: '192.168.0.7',
            width: width,
            height: height,
            topic: '/h5_image'
        });
    }

    this.subscribePose = function () {
        NavEvent.poseTopic.subscribe(PoseCallback);
    }
    this.unsubscribePose = function () {
        NavEvent.poseTopic.unsubscribe(PoseCallback);
    }

    this.CloseHandle=function(){
        NavEvent.Msg.data = NavEvent.CmdEnum.JoystickOff;
        NavEvent.shellTopic.publish(NavEvent.Msg);

        NavEvent.Msg.data = NavEvent.CmdEnum.Joystick;
        NavEvent.shellTopic.publish(NavEvent.Msg);
    }
    this.OpenHandle = function () {
        NavEvent.Msg.data = NavEvent.CmdEnum.JoystickOn;
        NavEvent.shellTopic.publish(NavEvent.Msg);

        NavEvent.Msg.data = NavEvent.CmdEnum.Joystick;
        NavEvent.shellTopic.publish(NavEvent.Msg);
    }
    this.DirectionControl = function (direction) {
        if (!NavEvent.connecting)
            return;
        var linear_x = 0.0;
        var angular_z = 0.0;

        switch (direction) {
            case "front":
                linear_x = 0.25;
                angular_z = 0;
                break;
            case "back":
                linear_x = -0.25;
                angular_z = 0;
                break;
            case "left":
                linear_x = 0;
                angular_z = 0.5;
                break;
            case "right":
                linear_x = 0;
                angular_z = -0.5;
                break;
            case "stop":
                console.log(direction);
                linear_x = 0;
                angular_z = 0;
                break;
            default:
                break;

        }
        NavEvent.velTopic.publish(new NavEvent.twistMessage(linear_x, angular_z));
    }

    this.goPostion = function (index) {
        $("#log").html(new Date().toLocaleTimeString() + "  goPostion(" + index + ")");
        NavEvent.nextIndex = index;
        if (NavEvent.SiteList.length <= 0)
            return;
        var pose = new NavEvent.pose(parseFloat(NavEvent.SiteList[index].postionX),
                              parseFloat(NavEvent.SiteList[index].postionY),
                              parseFloat(NavEvent.SiteList[index].OrientationZ),
                              parseFloat(NavEvent.SiteList[index].OrientationW));
        if (NavEvent.goalTest != null) {
            NavEvent.goalTest = null;
        }
        NavEvent.goalTest = new NavEvent.goal(pose);
        NavEvent.goalTest.send();
        NavEvent.goalTest.on('status', goalCallback);

        BtnChangeIcon("#site-btn-" + NavEvent.SiteList[index].name, "myicon");
        for (var i = 0; i < NavEvent.SiteList.length; i++) {
            if (i != index) {
                if (NavEvent.Loop) {
                    if (!NavEvent.reverse) {
                        BtnChangeIcon("#site-btn-" + NavEvent.SiteList[i].name, "arrow-r");
                    }
                    else {
                        BtnChangeIcon("#site-btn-" + NavEvent.SiteList[i].name, "arrow-l");
                    }
                }
                else {
                    BtnChangeIcon("#site-btn-" + NavEvent.SiteList[i].name, "arrow-r");
                }

            }
        }

    }
    this.goToChargePostion = function () {
        NavEvent.goPostionMode = NavEvent.SendGoalModeEnum.Charge;
        var pose = new NavEvent.pose(parseFloat("0.0"),
                          parseFloat("0.0"),
                          parseFloat("0.0"),
                          parseFloat("1.0"));
        NavEvent.goalTest = new NavEvent.goal(pose);
        NavEvent.goalTest.send();
        NavEvent.goalTest.on('status', goalCallback);
    }

    this.loopStart = function (startIndex) {
        NavEvent.Loop = true;
        this.goPostion(startIndex);
    }

    this.loopStop = function () {
        NavEvent.Loop = false;
        for (var i = 0; i < NavEvent.SiteList.length; i++) {
            BtnChangeIcon("#site-btn-" + NavEvent.SiteList[i].name, "arrow-r");
        }
        this.Cancel();
    }

    this.ChargeUp = function () {
        NavEvent.Msg.data = NavEvent.CmdEnum.ChargeUp;
        NavEvent.shellTopic.publish(NavEvent.Msg);
        console.log(NavEvent.Msg.data);
    }
    this.ChargeDown = function () {
        NavEvent.Msg.data = NavEvent.CmdEnum.ChargeDown;
        NavEvent.shellTopic.publish(NavEvent.Msg);
        console.log(NavEvent.Msg.data);
    }
}
//function DiagnosticsCallback(DiagnosticsMsg) {
//    console.log(DiagnosticsMsg);
//}
NavEvent.currentIndex = -1;
NavEvent.nextIndex = 0;
NavEvent.reverse = false;

function goalCallback(status) {
    try {
        switch (status.status) {
            case 3:
                NavEvent.goalTest.off('status', goalCallback);
                if (NavEvent.goPostionMode == NavEvent.SendGoalModeEnum.Charge) {
                    Jobs.ChargeUp();
                    NavEvent.goPostionMode == NavEvent.SendGoalModeEnum.Normal;
                }
                else {
                    NavEvent.currentIndex = NavEvent.nextIndex;
                    BtnChangeIcon("#site-btn-" + NavEvent.SiteList[NavEvent.currentIndex].name, "arrow-r");
                    $("#log1").html(new Date().toLocaleTimeString() + "正常到达，当前位置索引:" + NavEvent.currentIndex);
                    if (NavEvent.Loop) {

                        if (!NavEvent.reverse) {
                            NavEvent.nextIndex++;
                            if (NavEvent.nextIndex >= NavEvent.SiteList.length) {
                                NavEvent.nextIndex = NavEvent.nextIndex - 2;
                                NavEvent.reverse = true;
                                for (var i = 0; i < NavEvent.SiteList[i]; i++) {
                                    BtnChangeIcon("#site-btn-" + NavEvent.SiteList[i].name, "arrow-l");
                                }
                            }
                        }
                        else {
                            NavEvent.nextIndex--;
                            if (NavEvent.nextIndex < 0) {
                                NavEvent.nextIndex = NavEvent.nextIndex + 2;
                                NavEvent.reverse = false;
                                for (var i = 0; i < NavEvent.SiteList[i]; i++) {
                                    BtnChangeIcon("#site-btn-" + NavEvent.SiteList[i].name, "arrow-r");
                                }
                            }
                        }
                        //$("#log1").html(new Date().toLocaleTimeString() + "自动循环，目标点索引:" + NavEvent.nextIndex + "方向:" + NavEvent.reverse);
                        Jobs.goPostion(NavEvent.nextIndex);
                    }
                    console.log("正常到达");
                }
                break;
            case 4:
                if (NavEvent.goPostionMode == NavEvent.SendGoalModeEnum.Charge) {
                    Jobs.goToChargePostion();
                }
                else {
                    NavEvent.goalTest.off('status', goalCallback);
                    NavEvent.currentIndex = NavEvent.currentIndex;
                    $("#log1").html(new Date().toLocaleTimeString() + "放弃目标点，当前位置索引:" + NavEvent.currentIndex);
                    if (NavEvent.Loop) {
                        //  $("#log1").html(new Date().toLocaleTimeString() + "自动循环 放弃目标点，当前位置索引:" + NavEvent.currentIndex);
                        Jobs.goPostion(NavEvent.nextIndex);
                    }
                    console.log("放弃目标点");
                }
            

                break;
            default:
                break;
        }
    }
    catch (e) {
        alert(e);
    }
}
function VelCallback(velMessgae) {
    var linearHtml = '<br />Linear Vel:<br />';
    linearHtml += velMessgae.linear.x;

    $("#Linear").html(linearHtml);

    var angularHtml = '<br />Angular Vel:<br />';
    angularHtml += velMessgae.angular.z;
    $("#Angular").html(angularHtml);
}
function DeviceOrientationCallback(event) {
    NavEvent.ImuData.alpha = event.alpha;
    NavEvent.ImuData.beta = event.beta;
    NavEvent.ImuData.gamma = event.gamma;
}

function DeviceMotionCallback(event) {
    NavEvent.ImuData.x = event.accelerationIncludingGravity.x;
    NavEvent.ImuData.y = event.accelerationIncludingGravity.y;
    NavEvent.ImuData.z = event.accelerationIncludingGravity.z;
    NavEvent.ImuData.r = event.rotationRate;
}
NavEvent.tempCount = 0;
function imuSnapShot() {
    if (NavEvent.imuLock) {
        NavEvent.tempCount = 0;
        NavEvent.velTopic.publish(GetVelfromImu(NavEvent.ImuData.x, NavEvent.ImuData.y, NavEvent.ImuData.z));
        $("#dataContainerMotion").html(new Date().getTime());
    }
    else {
        if (NavEvent.tempCount++ <= 10) {
            NavEvent.velTopic.publish(new NavEvent.twistMessage(0, 0));
        }
    }
}
function PoseCallback(poseMessage) {
    $("#pos_x").val(poseMessage.position.x);
    $("#pos_y").val(poseMessage.position.y);
    $("#ori_z").val(poseMessage.orientation.z);
    $("#ori_w").val(poseMessage.orientation.w);
}
function GetVelfromImu(x, y, z) {
    // linear acceleration data
    var acc_x = x;
    var acc_y = y;
    var acc_z = z;
    var AccelerationHtml = 'IMU data:<br />';
    var linear_status = 'null';
    var angular_status = 'null';
    AccelerationHtml += 'acc_x:' + acc_x + '<br />';
    AccelerationHtml += 'acc_y:' + acc_y + '<br />';
    AccelerationHtml += 'acc_z:' + acc_z + '<br />';

    // linear velocity
    if (NavEvent.AccelerationParameter.halt_l <= acc_x && acc_x <= NavEvent.AccelerationParameter.halt_r) // halt
    {
        linear_status = '线速度:0 <br />';
        NavEvent.AccelerationParameter.linear_vel = 0;
    }
    else if (acc_x < NavEvent.AccelerationParameter.forward_r) // move forward
    {
        linear_status = '线速度:forward <br />';
        if (acc_x > NavEvent.AccelerationParameter.forward_l)
            NavEvent.AccelerationParameter.linear_vel = NavEvent.AccelerationParameter.max_linear_vel * (acc_x - NavEvent.AccelerationParameter.forward_r) / (NavEvent.AccelerationParameter.forward_l - NavEvent.AccelerationParameter.forward_r);
        else
            NavEvent.AccelerationParameter.linear_vel = NavEvent.AccelerationParameter.max_linear_vel;
    }
    else if (acc_x > NavEvent.AccelerationParameter.back_l) // move back
    {
        linear_status = '线速度:back <br />';
        if (acc_x < NavEvent.AccelerationParameter.back_r)
            NavEvent.AccelerationParameter.linear_vel = NavEvent.AccelerationParameter.max_linear_vel * (acc_x - NavEvent.AccelerationParameter.back_l) / (NavEvent.AccelerationParameter.back_l - NavEvent.AccelerationParameter.back_r);
        else
            NavEvent.AccelerationParameter.linear_vel = -NavEvent.AccelerationParameter.max_linear_vel;
    }
    else {
        linear_status = "线速度计算错误";
    }

    // angular velocity
    if (NavEvent.AccelerationParameter.mid_l <= acc_y && acc_y <= NavEvent.AccelerationParameter.mid_r) // move straight
    {
        angular_status = '角速度:0 <br />'
        NavEvent.AccelerationParameter.angular_vel = 0;
    }
    else if (acc_y < NavEvent.AccelerationParameter.left_r) // turn left
    {
        angular_status = '角速度:left <br />'
        if (acc_y > NavEvent.AccelerationParameter.left_l)
            NavEvent.AccelerationParameter.angular_vel = NavEvent.AccelerationParameter.max_angular_vel * (acc_y - NavEvent.AccelerationParameter.left_r) / (NavEvent.AccelerationParameter.left_l - NavEvent.AccelerationParameter.left_r);
        else
            NavEvent.AccelerationParameter.angular_vel = NavEvent.AccelerationParameter.max_angular_vel;
    }
    else if (acc_y > NavEvent.AccelerationParameter.right_l) // turn right
    {
        angular_status = '角速度:right <br />'
        if (acc_y < NavEvent.AccelerationParameter.right_r)
            NavEvent.AccelerationParameter.angular_vel = NavEvent.AccelerationParameter.max_angular_vel * (acc_y - NavEvent.AccelerationParameter.right_l) / (NavEvent.AccelerationParameter.right_l - NavEvent.AccelerationParameter.right_r);
        else
            NavEvent.AccelerationParameter.angular_vel = -NavEvent.AccelerationParameter.max_angular_vel;
    }
    else {
        angular_status = "角速度计算错误";
    }
    AccelerationHtml += linear_status;
    AccelerationHtml += angular_status;
    $("#dataContainerOrientation").html(AccelerationHtml);

    if (NavEvent.AccelerationParameter.linear_vel < 0)
        NavEvent.AccelerationParameter.angular_vel = -NavEvent.AccelerationParameter.angular_vel;

    // console.log(NavEvent.AccelerationParameter.linear_vel, NavEvent.AccelerationParameter.angular_vel);
    return new NavEvent.twistMessage(NavEvent.AccelerationParameter.linear_vel, NavEvent.AccelerationParameter.angular_vel);
}

NavEvent.Site = function (name, introduce, postionX, postionY, OrientationZ, OrientationW) {
    this.name = name;
    this.introduce = introduce,
    this.postionX = postionX;
    this.postionY = postionY;
    this.postionZ = 0.0;
    this.OrientationX = 0.0;
    this.OrientationY = 0.0;
    this.OrientationZ = OrientationZ;
    this.OrientationW = OrientationW;
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


function MapEditDataGet (message) {
    NavEvent.MapEditTopic.unsubscribe(MapEditDataGet);

    NavEvent.MapEditMessage=message;
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

}
