var HTY_PLC_STATUS = {
    running: 256,
    error_running: 257,
    stop: 0,
    error_stop: 1,
    converting:-1,
}

var hty_plc_status = 0;

$("#btn-plc-start").click(function () {
    $(this).buttonMarkup({ icon: "hrg-load" });
    $(this).text("切换中...");
    if (hty_plc_status == HTY_PLC_STATUS.running || hty_plc_status == HTY_PLC_STATUS.error_running) {
        console.log("send close");
        var msg = new NavEvent.Msg(NavEvent.CmdEnum.plc_close);
        NavEvent.shellTopic.publish(msg);
    }
    else {
        console.log("send open");
        var msg1 = new NavEvent.Msg(NavEvent.CmdEnum.plc_open);
        NavEvent.shellTopic.publish(msg1);
    }
    console.log("send status");
    var msg2 = new NavEvent.Msg(NavEvent.CmdEnum.plc_status);
    NavEvent.shellTopic.publish(msg2);

});


$("#btn-plc-stop").click(function () {
    console.log("send close");
    var msg = new NavEvent.Msg(NavEvent.CmdEnum.plc_close);
    NavEvent.shellTopic.publish(msg);

    console.log("send status");
    var msg2 = new NavEvent.Msg(NavEvent.CmdEnum.plc_status);
    NavEvent.shellTopic.publish(msg2);

});
