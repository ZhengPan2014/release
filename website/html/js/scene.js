/*! tailinserver 2017-02-22 */
function CheckStr(a){var b=/^[^@\/\'\\\"\‘\’#$%&\^\*]+$/;return b.test(a)}var Scene=Scene||{REVISION:"0.0.6.0-2016-12.22",MapCmdEnum:{map_select:0,map_insert:1,map_update:2,map_delete:3},CurrentMapCmd:-1,CurrentMap:"",SelectMap:"",CreatMap:"",DeleteMap:"",StartSelectMap:!1,MapList:new Array};$(function(){$("#hrg-map-selected-popup").on("popupbeforeposition",function(a,b){}),$("#hrg-map-selected-popup").on("popupafterclose",function(a,b){}),$("#map-select").on("change",function(a){$(".current-map-name").text()!=a.target.value&&(Scene.StartSelectMap=!0,$(".current-map-name").text("切换中..."),Scene.SelectMap=a.target.value,Scene.CurrentMapCmd=Scene.MapCmdEnum.map_update,NavEvent.Publish(NavEvent.TopicEnum.cmdTopic,NavEvent.CmdEnum.Map_Update+":"+a.target.value))}),$("#btn-map-insert").click(function(){var a=$("#map-insert-name")[0].value;return""==a?void sweetAlert("场景名称不能为空","","warning"):CheckStr(a)?(Scene.CreatMap=a,Scene.CurrentMapCmd=Scene.MapCmdEnum.map_insert,$(this).buttonMarkup({icon:"hrg-load"}),void NavEvent.Publish(NavEvent.TopicEnum.cmdTopic,NavEvent.CmdEnum.Map_Insert+":"+$("#map-insert-name")[0].value)):void sweetAlert("场景名称不合法","","warning")}),$("#btn-map-delete").click(function(){var a=$("#map-insert-name")[0].value;return Scene.MapList.indexOf(a)<0?void sweetAlert("场景名称不存在","","warning"):(Scene.DeleteMap=a,"master"==Scene.DeleteMap?void sweetAlert("不能删除 master 场景","","warning"):Scene.CurrentMap==Scene.DeleteMap?void sweetAlert("不能删除当前场景","","warning"):(Scene.CurrentMapCmd=Scene.MapCmdEnum.map_delete,$(this).buttonMarkup({icon:"hrg-load"}),void NavEvent.Publish(NavEvent.TopicEnum.cmdTopic,NavEvent.CmdEnum.Map_Delete+":"+$("#map-insert-name")[0].value)))})});