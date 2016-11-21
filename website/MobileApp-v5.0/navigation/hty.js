var HTY_PLC_STATUS = {
    running: 256,
    error_running: 257,
    stop: 0,
    error_stop:1,
}

var hty_plc_status = 0;

$("#btn-plc").click(function () {
    $(this).buttonMarkup({ icon: "hrg-load" });
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

