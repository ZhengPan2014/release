/*! tailinserver 2017-02-22 */
var TL=TL||{REVISION:"0.0.6.0-2016-12.22",LockScrren:!1,LoginName:"",LoginPassword:"",Auth:"",Plc_State:{running:256,error_running:257,stop:0,error_stop:1,converting:-1},Plc_Current_State:-255};$(function(){$("#btn-lock-software").click(function(){TL.LockScreen=!0,$("#hrg-lock-software-popup").popup("open")}),$("#btn-unlock-software").click(function(){$("#lock-password")[0].value==TL.LoginPassword?($("#lock-password")[0].value="",$("#hrg-lock-software-popup").popup("close"),TL.LockScreen=!1):sweetAlert("输入密码错误","","error")}),$("#btn-plc").click(function(){TL.Plc_Current_State!=TL.Plc_State.converting&&($(this).buttonMarkup({icon:"hrg-load"}),TL.Plc_Current_State==TL.Plc_State.running||TL.Plc_Current_State==TL.Plc_State.error_running?($(this).text("正在停止..."),console.log("send close"),NavEvent.Publish(NavEvent.TopicEnum.shellTopic,NavEvent.ShellEnum.PLCclose)):($(this).text("正在启动..."),console.log("send open"),NavEvent.Publish(NavEvent.TopicEnum.shellTopic,NavEvent.ShellEnum.PLCopen)),TL.Plc_Current_State=TL.Plc_State.converting,console.log("send status"),NavEvent.Publish(NavEvent.TopicEnum.shellTopic,NavEvent.ShellEnum.PLCstatus))}),$("#btn-plc-stop").click(function(){console.log("send close"),NavEvent.Publish(NavEvent.TopicEnum.shellTopic,NavEvent.ShellEnum.PLCclose),console.log("send status"),NavEvent.Publish(NavEvent.TopicEnum.shellTopic,NavEvent.ShellEnum.PLCstatus)})});