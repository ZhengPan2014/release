var NavEvent = NavEvent || {
    REVISION: '0.0.0.1-2016-9-2'
};
console.log(NavEvent);
NavEvent.connecting = false;
NavEvent.Url = "ws://" + window.location.hostname + ":9090";
//NavEvent.Url = "ws://192.168.0.7:9090";
//NavEvent.Url = "ws://192.168.0.233:9090";
NavEvent.ros = new ROSLIB.Ros();
NavEvent.ros.connect(NavEvent.Url);
NavEvent.SiteList = new Array();
NavEvent.SiteList_Circle = new Array();
NavEvent.Loop = false;
NavEvent.imuLock = false;
NavEvent.goalTest = null;
NavEvent.NavigationMode = "";
NavEvent.ros.on('connection', function () {
    NavEvent.connecting = true;
    $(".netStaus").attr("src", "image/icon2.png");

    NavEvent.modeTopic.subscribe(function (mode) {
        console.log(mode.data);
        $("#log").html(mode.data);
        switch (mode.data) {
            case NavEvent.CmdEnum.Navigation:
                NavEvent.NavigationMode = mode.data;
                $("#switch2")[0].selectedIndex = 0;
                $("#switch2").slider("refresh");
                $("#saveMap").prop('disabled', true).addClass("ui-disabled");
                break;
            case NavEvent.CmdEnum.Gmapping:
                NavEvent.NavigationMode = mode.data;
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
    SaveMap: "save_map ",
    SaveMapEdit: "save_map_edit",
    Busy: "busy",
    NULL: ""
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

    this.MapInit = function (width, height) {
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
        $("#saveMap").prop('disabled', false).removeClass("ui-disabled");
    }


    this.Navigation = function () {
        if (NavEvent.NavigationMode == NavEvent.CmdEnum.Navigation)
            return;
        NavEvent.Msg.data = NavEvent.CmdEnum.Navigation;
        NavEvent.cmdTopic.publish(NavEvent.Msg);
        console.log(NavEvent.Msg.data);
        $("#saveMap").prop('disabled', true).addClass("ui-disabled");
    }
    this.SvaeMap = function () {
        NavEvent.Msg.data = NavEvent.CmdEnum.GamppingPose;
        NavEvent.cmdTopic.publish(NavEvent.Msg);
        NavEvent.Msg.data = NavEvent.cmdTopic.SaveMap;
        NavEvent.cmdTopic.publish(NavEvent.Msg);
        NavEvent.Msg.data = NavEvent.cmdTopic.SaveMapEdit;
        NavEvent.cmdTopic.publish(NavEvent.Msg);
        console.log("saveMap");
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
        NavEvent.ImuTimer = setInterval(imuSnapShot, 100);
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

    this.subscribeTest = function () {
        NavEvent.diagnosticsTopic.subscribe(test);

    }
    this.unsubscribeTest = function () {
        NavEvent.diagnosticsTopic.unsubscribe(test);

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


    this.DirectionControl = function (direction) {
        if (!NavEvent.connecting)
            return;
        var linear_x = 0.0;
        var angular_z = 0.0;

        switch (direction) {
            case "front":
                linear_x = 0.5;
                angular_z = 0;
                break;
            case "back":
                linear_x = -0.5;
                angular_z = 0;
                break;
            case "left":
                linear_x = 0;
                angular_z = -0.5;
                break;
            case "right":
                linear_x = 0;
                angular_z = 0.5;
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

    this.goPostion = function (index, loop) {
        console.log(loop)

        $("#log").html(new Date().toLocaleTimeString() + "  goPostion(" + index + ") 是否循环:" + loop);
        NavEvent.nextIndex = index;
        if (loop) {
            if (NavEvent.SiteList_Circle.length <= 0)
                return;
            var pose = new NavEvent.pose(parseFloat(NavEvent.SiteList_Circle[index].postionX),
                                  parseFloat(NavEvent.SiteList_Circle[index].postionY),
                                  parseFloat(NavEvent.SiteList_Circle[index].OrientationZ),
                                  parseFloat(NavEvent.SiteList_Circle[index].OrientationW));


            BtnChangeIcon("#site-btn-" + NavEvent.SiteList_Circle[index].name, "myicon");
            for (var i = 0; i < NavEvent.SiteList_Circle.length; i++) {
                if (i != index) {
                    if (!NavEvent.reverse) {
                        BtnChangeIcon("#site-btn-" + NavEvent.SiteList_Circle[i].name, "arrow-r");
                    }
                    else {
                        BtnChangeIcon("#site-btn-" + NavEvent.SiteList_Circle[i].name, "arrow-l");
                    }

                }
            }
          
        }
        else {
            if (NavEvent.SiteLis.length <= 0)
                return;
            var pose = new NavEvent.pose(parseFloat(NavEvent.SiteLis[index].postionX),
                                  parseFloat(NavEvent.SiteLis[index].postionY),
                                  parseFloat(NavEvent.SiteLis[index].OrientationZ),
                                  parseFloat(NavEvent.SiteLis[index].OrientationW));
        }
        if (NavEvent.goalTest != null) {
            NavEvent.goalTest = null;
        }

     
        NavEvent.goalTest = new NavEvent.goal(pose);
        NavEvent.goalTest.send();
        NavEvent.goalTest.on('status', goalCallback);


    }


    this.loopStart = function (startIndex) {
        NavEvent.Loop = true;
 
        this.goPostion(startIndex, NavEvent.Loop);
    }

    this.loopStop = function () {
        NavEvent.Loop = false;
        for (var i = 0; i < NavEvent.SiteList_Circle.length; i++) {
            BtnChangeIcon("#site-btn-" + NavEvent.SiteList_Circle[i].name, "arrow-r");
        }
        this.Cancel();
    }
}
NavEvent.currentIndex = -1;
NavEvent.nextIndex = 0;
NavEvent.reverse = false;

function test(data) {
    console.log(data);
}
function goalCallback(status) {
    try {
        switch (status.status) {
            case 3:
                NavEvent.goalTest.off('status', goalCallback);
                NavEvent.currentIndex = NavEvent.nextIndex;
             
                $("#log1").html(new Date().toLocaleTimeString() + "正常到达，当前位置索引:" + NavEvent.currentIndex);
                if (NavEvent.Loop) {
                    alert(NavEvent.currentIndex);
                    BtnChangeIcon("#site-btn-" + NavEvent.SiteList_Circle[NavEvent.currentIndex].name, "arrow-r");
                    if (!NavEvent.reverse) {
                        NavEvent.nextIndex++;
                        if (NavEvent.nextIndex >= NavEvent.SiteList_Circle.length) {
                            NavEvent.nextIndex = NavEvent.nextIndex - 2;
                            NavEvent.reverse = true;
                            for (var i = 0; i < NavEvent.SiteList_Circle[i]; i++) {
                                BtnChangeIcon("#site-btn-" + NavEvent.SiteList_Circle[i].name, "arrow-l");
                            }
                        }
                    }
                    else {
                        NavEvent.nextIndex--;
                        if (NavEvent.nextIndex < 0) {
                            NavEvent.nextIndex = NavEvent.nextIndex + 2;
                            NavEvent.reverse = false;
                            for (var i = 0; i < NavEvent.SiteList_Circle[i]; i++) {
                                BtnChangeIcon("#site-btn-" + NavEvent.SiteList_Circle[i].name, "arrow-r");
                            }
                        }
                    }
                    //$("#log1").html(new Date().toLocaleTimeString() + "自动循环，目标点索引:" + NavEvent.nextIndex + "方向:" + NavEvent.reverse);
                    Jobs.goPostion(NavEvent.nextIndex);
                }
                console.log("正常到达");
                break;
            case 4:
                NavEvent.goalTest.off('status', goalCallback);
                NavEvent.currentIndex = NavEvent.currentIndex;
                $("#log1").html(new Date().toLocaleTimeString() + "放弃目标点，当前位置索引:" + NavEvent.currentIndex);
                if (NavEvent.Loop) {
                    //  $("#log1").html(new Date().toLocaleTimeString() + "自动循环 放弃目标点，当前位置索引:" + NavEvent.currentIndex);
                    Jobs.goPostion(NavEvent.nextIndex, NavEvent.SiteList_Circle);
                }
                console.log("放弃目标点");
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

NavEvent.Site = function (name, circle, postionX, postionY, OrientationZ, OrientationW) {
    this.name = name;
    this.circle = circle,
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
