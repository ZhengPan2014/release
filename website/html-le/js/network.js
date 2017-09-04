
var NetEvent = {
    REVISION: '0.0.6.0-2017-2.17',


}
$(function () {




    $("#btn-network-setting").click(function () {

        var Set_network_string = '\
                    source ~/catkin_ws/base.sh; \
                    export ROS_USER_SSID=' + $("#network-ssid")[0].value + '; \
                    export ROS_USER_PASSWD=' + $("#network-password")[0].value + '; \
                    export ROS_USER_IP=' + $("#network-ip")[0].value + '; \
                    roscd bringup; shell/comm-setup.sh';
        if (!IpCheck($("#network-ip")[0].value)) {
            sweetAlert("参数错误", "IP不合法", "error");
            return;
        }
        if ($("#network-password")[0].value == "") {
            sweetAlert("参数错误", "密码不能为空", "error");
            return;
        }
        NavEvent.Publish(NavEvent.TopicEnum.shellTopic, Set_network_string);
        $(this).buttonMarkup({ icon: "hrg-load" });

       setTimeout(function () {
           window.location.href = "http://" + $("#network-ip")[0].value;
        }, 10000);
    });



    $("#btn-network-reset").click(function () {
        var Reset_network_string = '\
                    source ~/catkin_ws/base.sh; \
                    roscd bringup; shell/comm-reset.sh';
        NavEvent.Publish(NavEvent.TopicEnum.shellTopic, Reset_network_string);
        $(this).buttonMarkup({ icon: "hrg-load" });

        setTimeout(function () {
            window.location.href = "http://10.42.0.1";
        }, 10000);
    });


})

/****************网络设置****************/

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