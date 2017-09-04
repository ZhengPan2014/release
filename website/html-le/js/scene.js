var Scene = Scene || {
    REVISION: '0.0.6.0-2016-12.22',
    MapCmdEnum :{
        map_select: 0,
        map_insert: 1,
        map_update: 2,
        map_delete: 3
    },
    CurrentMapCmd: -1,
    CurrentMap: "",
    SelectMap: "",
    CreatMap: "",
    DeleteMap:"",
    StartSelectMap: false,
    MapList:new Array()
}


$(function () {

    $("#hrg-map-selected-popup").on('popupbeforeposition', function (event, ui) {
        //Scene.CurrentMapCmd = Scene.MapCmdEnum.map_select;
        //NavEvent.Publish(NavEvent.TopicEnum.cmdTopic, NavEvent.CmdEnum.Map_Select);
    });

    $("#hrg-map-selected-popup").on('popupafterclose', function (event, ui) {

    });

    $("#map-select").on('change', function (e) {
        if ($(".current-map-name").text() != e.target.value) {
            Scene.StartSelectMap = true;
            $(".current-map-name").text("切换中...");
            Scene.SelectMap = e.target.value;
            Scene.CurrentMapCmd = Scene.MapCmdEnum.map_update;
            NavEvent.Publish(NavEvent.TopicEnum.cmdTopic, NavEvent.CmdEnum.Map_Update + ":" + e.target.value);
        }

    });



    $("#btn-map-insert").click(function () {
        var map_name = $("#map-insert-name")[0].value;
        if (map_name == "") {
            sweetAlert("场景名称不能为空", "", "warning");
            return;
        }

        if (!CheckStr(map_name)) {
            sweetAlert("场景名称不合法", "", "warning");
            return;
        }
        Scene.CreatMap = map_name;
    
        Scene.CurrentMapCmd = Scene.MapCmdEnum.map_insert;
        $(this).buttonMarkup({ icon: "hrg-load" });
        NavEvent.Publish(NavEvent.TopicEnum.cmdTopic, NavEvent.CmdEnum.Map_Insert + ":" + $("#map-insert-name")[0].value);
    });



    $("#btn-map-delete").click(function () {
        var map_name = $("#map-insert-name")[0].value;
        if (Scene.MapList.indexOf(map_name) < 0) {
            sweetAlert("场景名称不存在", "", "warning");
            return;
        }
        Scene.DeleteMap = map_name;

        if (Scene.DeleteMap=="master") {
            sweetAlert("不能删除 master 场景", "", "warning");
            return;
        }
        if (Scene.CurrentMap == Scene.DeleteMap) {
            sweetAlert("不能删除当前场景", "", "warning");
            return;
        }
 
        Scene.CurrentMapCmd = Scene.MapCmdEnum.map_delete;

        $(this).buttonMarkup({ icon: "hrg-load" });
        NavEvent.Publish(NavEvent.TopicEnum.cmdTopic, NavEvent.CmdEnum.Map_Delete + ":" + $("#map-insert-name")[0].value);
    });
 
})
function CheckStr(str) {
    var myReg = /^[^@\/\'\\\"\‘\’#$%&\^\*]+$/;
    return myReg.test(str);
}