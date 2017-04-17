var TL = TL || {
    REVISION: '0.0.6.0-2016-12.22',
    LockScrren: false,
    LoginName:"",
    LoginPassword: "",
    Auth: "",
    Plc_State: {
        running: 10, 
        error_running: 00, 
        stop: 11, 
        error_stop: 01, 
        converting: -1,
    },
    Plc_Current_State: -255,

    PlcOpen: function(){ 
    	console.log('Turn on...');
        console.log('\t send relay_on');
        var plcTopic =  NavEvent.Topic(NavEvent.TopicEnum.waypointUserPub);
        plcTopic.publish(NavEvent.Msg("relay_on"));
        setTimeout(function(){
        	console.log('\t send relay_reset');
        	plcTopic.publish(NavEvent.Msg("relay_reset"));
        }, 1500);
    },
    PlcClose: function(){
    	console.log('Turn off...');
        console.log('\t send relay_off');
        var plcTopic =  NavEvent.Topic(NavEvent.TopicEnum.waypointUserPub);
        plcTopic.publish(NavEvent.Msg("relay_off"));
        setTimeout(function(){
        	console.log('\t send relay_reset');
        	plcTopic.publish(NavEvent.Msg("relay_reset"));
        }, 1500);
    },

    PlcStatus: function(){
        console.log('send read_status');
        var plcTopic =  NavEvent.Topic(NavEvent.TopicEnum.waypointUserPub);
        plcTopic.publish(NavEvent.Msg("read_status"));
    }
}

$(function () {
    /*
     * 锁屏
     */
    $("#btn-lock-software").click(function () {
        TL.LockScreen = true;
        $("#hrg-lock-software-popup").popup("open");
    });
    /*
     *解锁
     */
    $("#btn-unlock-software").click(function () {
        if ($("#lock-password")[0].value == TL.LoginPassword) {
            $("#lock-password")[0].value = "";
            $("#hrg-lock-software-popup").popup("close");
            TL.LockScreen = false;
        }
        else {
            sweetAlert("输入密码错误", "", "error");
        }
    });

    $("#btn-plc").click(function () {
        if (TL.Plc_Current_State == TL.Plc_State.converting) {
            return;      
        }
        $(this).buttonMarkup({ icon: "hrg-load" });
        if (TL.Plc_Current_State == TL.Plc_State.running || TL.Plc_Current_State == TL.Plc_State.error_running) {
            console.log("send close");
            TL.PlcClose();
        }
        else {
            console.log("send open");
            TL.PlcOpen();
        }
        TL.Plc_Current_State = TL.Plc_State.converting;
        console.log("send status");
        TL.PlcStatus();
    });

    $("#btn-plc-stop").click(function () {
        console.log("send close");
        TL.PlcClose();
        console.log("send status");
        TL.PlcStatus();
    });
})
