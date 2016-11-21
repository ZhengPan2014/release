var ImuEvent = ImuEvent || {
    REVISION: '0.0.0.1-2016-10-21'
};
ImuEvent.Parameters = {
    ImuTimer: null,
    count: 0,
    imuLock: false,
    imuEnable:false
}
ImuEvent.ImuData = {
    alpha: 0.0,
    gamma: 0.0,
    beta: 0.0,
    x: 0.0,
    y: 0.0,
    z: 0.0,
    r: 0.0
}
ImuEvent.AccelerationParameter = {
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
ImuEvent.WorkPool = function () {
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
        ImuEvent.Parameters.ImuTimer = setInterval(imuSnapShot, 200);
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

        if (ImuEvent.Parameters.ImuTimer != null) {
            clearInterval(ImuEvent.Parameters.ImuTimer);
            ImuEvent.Parameters.ImuTimer = null;
        }
    }
    this.DirectionControl = function (direction) {
        if (!NavEvent.data.Connect)
            return;
        var linear_x = 0.0;
        var angular_z = 0.0;

        switch (direction) {
            case "up":
                linear_x = 0.25;
                angular_z = 0;
                break;
            case "down":
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
                linear_x = 0;
                angular_z = 0;
                break;
            default:
                break;

        }
        NavEvent.velTopic.publish(new NavEvent.twistMessage(linear_x, angular_z));
    }

}
function DeviceOrientationCallback(event) {
    ImuEvent.ImuData.alpha = event.alpha;
    ImuEvent.ImuData.beta = event.beta;
    ImuEvent.ImuData.gamma = event.gamma;
}


function DeviceMotionCallback(event) {
    ImuEvent.ImuData.x = event.accelerationIncludingGravity.x;
    ImuEvent.ImuData.y = event.accelerationIncludingGravity.y;
    ImuEvent.ImuData.z = event.accelerationIncludingGravity.z;
    ImuEvent.ImuData.r = event.rotationRate;
}

function imuSnapShot() {
    if (!ImuEvent.Parameters.imuEnable) {
        if (ImuEvent.Parameters.count++ <= 10) {
            NavEvent.velTopic.publish(new NavEvent.twistMessage(0, 0));
        }
        return;
    }
    if (ImuEvent.Parameters.imuLock) {
        ImuEvent.Parameters.count = 0;
        NavEvent.velTopic.publish(GetVelfromImu(ImuEvent.ImuData.x, ImuEvent.ImuData.y, ImuEvent.ImuData.z));
        $("#dataContainerMotion").html(new Date().getTime());
    }
    else {
        if (ImuEvent.Parameters.count++ <= 10) {
            NavEvent.velTopic.publish(new NavEvent.twistMessage(0, 0));
        }
    }
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
    if (ImuEvent.AccelerationParameter.halt_l <= acc_x && acc_x <= ImuEvent.AccelerationParameter.halt_r) // halt
    {
        linear_status = '线速度:0 <br />';
        ImuEvent.AccelerationParameter.linear_vel = 0;
    }
    else if (acc_x < ImuEvent.AccelerationParameter.forward_r) // move forward
    {
        linear_status = '线速度:forward <br />';
        if (acc_x > ImuEvent.AccelerationParameter.forward_l)
            ImuEvent.AccelerationParameter.linear_vel = ImuEvent.AccelerationParameter.max_linear_vel * (acc_x - ImuEvent.AccelerationParameter.forward_r) / (ImuEvent.AccelerationParameter.forward_l - ImuEvent.AccelerationParameter.forward_r);
        else
            ImuEvent.AccelerationParameter.linear_vel = ImuEvent.AccelerationParameter.max_linear_vel;
    }
    else if (acc_x > ImuEvent.AccelerationParameter.back_l) // move back
    {
        linear_status = '线速度:back <br />';
        if (acc_x < ImuEvent.AccelerationParameter.back_r)
            ImuEvent.AccelerationParameter.linear_vel = ImuEvent.AccelerationParameter.max_linear_vel * (acc_x - ImuEvent.AccelerationParameter.back_l) / (ImuEvent.AccelerationParameter.back_l - ImuEvent.AccelerationParameter.back_r);
        else
            ImuEvent.AccelerationParameter.linear_vel = -ImuEvent.AccelerationParameter.max_linear_vel;
    }
    else {
        linear_status = "线速度计算错误";
    }

    // angular velocity
    if (ImuEvent.AccelerationParameter.mid_l <= acc_y && acc_y <= ImuEvent.AccelerationParameter.mid_r) // move straight
    {
        angular_status = '角速度:0 <br />'
        ImuEvent.AccelerationParameter.angular_vel = 0;
    }
    else if (acc_y < ImuEvent.AccelerationParameter.left_r) // turn left
    {
        angular_status = '角速度:left <br />'
        if (acc_y > ImuEvent.AccelerationParameter.left_l)
            ImuEvent.AccelerationParameter.angular_vel = ImuEvent.AccelerationParameter.max_angular_vel * (acc_y - ImuEvent.AccelerationParameter.left_r) / (ImuEvent.AccelerationParameter.left_l - ImuEvent.AccelerationParameter.left_r);
        else
            ImuEvent.AccelerationParameter.angular_vel = ImuEvent.AccelerationParameter.max_angular_vel;
    }
    else if (acc_y > ImuEvent.AccelerationParameter.right_l) // turn right
    {
        angular_status = '角速度:right <br />'
        if (acc_y < ImuEvent.AccelerationParameter.right_r)
            ImuEvent.AccelerationParameter.angular_vel = ImuEvent.AccelerationParameter.max_angular_vel * (acc_y - ImuEvent.AccelerationParameter.right_l) / (ImuEvent.AccelerationParameter.right_l - ImuEvent.AccelerationParameter.right_r);
        else
            ImuEvent.AccelerationParameter.angular_vel = -ImuEvent.AccelerationParameter.max_angular_vel;
    }
    else {
        angular_status = "角速度计算错误";
    }
    AccelerationHtml += linear_status;
    AccelerationHtml += angular_status;
    $("#dataContainerOrientation").html(AccelerationHtml);

    if (ImuEvent.AccelerationParameter.linear_vel < 0)
        ImuEvent.AccelerationParameter.angular_vel = -ImuEvent.AccelerationParameter.angular_vel;

    // console.log(NavEvent.AccelerationParameter.linear_vel, NavEvent.AccelerationParameter.angular_vel);
    return new NavEvent.twistMessage(ImuEvent.AccelerationParameter.linear_vel, ImuEvent.AccelerationParameter.angular_vel);
}

