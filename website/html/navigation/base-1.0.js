function BtnchangeColor(id, color) {
    $(id).buttonMarkup({ theme: color });
    $(id).parent().removeClass();
    $(id).parent().addClass('ui-btn-inline');
    $(id).button();

}
function BtnChangeIcon(id,icons) {
    $(id).buttonMarkup({ icon: icons });
    $(id).parent().removeClass();
    $(id).parent().addClass('ui-btn-inline');
    $(id).button();
}
function goPostion(dom) {
    var idname = $(dom).parent().parent().parent()[0].id;
    var name = idname.substring(3, idname.length)
    var index = -1;
    for (var i = 0; i < NavEvent.SiteList.length; i++) {
        if (name == NavEvent.SiteList[i].name) {
            index = i;
            break;
        }
    }

    Jobs.goPostion(index);
    console.log(index);
}

function Site_delete(dom) {
    var idname = $(dom).parent().parent().parent()[0].id;
    console.log(idname);
    var name = idname.substring(3, idname.length)
    $($(dom).parent().parent().parent()).fadeTo("slow", 0.01, function () {
        $(this).slideUp("slow", function () {
            for (var i = 0; i < NavEvent.SiteList.length; i++) {
                if (name == NavEvent.SiteList[i].name) {
                    console.log(i);
                    NavEvent.SiteList.del(i);
                    break;
                }
            }
            $(this).remove();
        });
    });
    $("#site-btn-"+name).fadeTo("slow", 0.01, function () {
        $(this).slideUp("slow", function () {
            $(this).remove();;
        });
    })

}
function loadImage(imageList) {
    for (var i = 0; i < imageList.length; i++) {
        var img = new Image();
        img.src = imageList[i];
    }
}

function ChangeSwitch(id) {
    console.log($("#" + id).val());
    if ($("#" + id).val() == "yes") {
        switch (id) {
            case "switch1":
                createjs.Touch.enable(myScene);
                break;
            case "switch2":
                Jobs.Gmapping();
                break;
            case "switch3":
                Jobs.OpenIMU();
                break;
            case "switch4":
                Jobs.MapInit(W * 0.7, H * 0.7);
                break;
            case "joy-select":
                Jobs.OpenHandle();
                break;
            default:
                break;

        }
    }
    else {
        switch (id) {
            case "switch1":
                createjs.Touch.disable(myScene);
                break;
            case "switch2":
                Jobs.Navigation();
                $("#saveMap").buttonMarkup({ icon: "mysave" });
                break;
            case "switch3":
                Jobs.CloseIMU();
                break;
            case "switch4":
                Jobs.RemoveMap();
                break;
            case "joy-select":
                Jobs.CloseHandle();
                break;
            default:
                break;

        }
    }

}
function openHandle() {
    document.getElementById("up").addEventListener("touchstart", touchEvent, false);
    document.getElementById("up").addEventListener("touchend", touchEvent, false);

    document.getElementById("down").addEventListener("touchstart", touchEvent, false);
    document.getElementById("down").addEventListener("touchend", touchEvent, false);

    document.getElementById("stop").addEventListener("touchstart", touchEvent, false);
    document.getElementById("stop").addEventListener("touchend", touchEvent, false);

    document.getElementById("left").addEventListener("touchstart", touchEvent, false);
    document.getElementById("left").addEventListener("touchend", touchEvent, false);

    document.getElementById("right").addEventListener("touchstart", touchEvent, false);
    document.getElementById("right").addEventListener("touchend", touchEvent, false);

}
function closeHandle() {
    document.getElementById("up").removeEventListener("touchstart", touchEvent, false);
    document.getElementById("up").removeEventListener("touchend", touchEvent, false);

    document.getElementById("down").removeEventListener("touchstart", touchEvent, false);
    document.getElementById("down").removeEventListener("touchend", touchEvent, false);

    document.getElementById("stop").removeEventListener("touchstart", touchEvent, false);
    document.getElementById("stop").removeEventListener("touchend", touchEvent, false);

    document.getElementById("left").removeEventListener("touchstart", touchEvent, false);
    document.getElementById("left").removeEventListener("touchend", touchEvent, false);

    document.getElementById("right").removeEventListener("touchstart", touchEvent, false);
    document.getElementById("right").removeEventListener("touchend", touchEvent, false);
}
var CtrolTimer = null;
function touchEvent(event) {
    switch (event.type) {
        case "touchstart":
            event.preventDefault();
            switch (event.target.id) {
                case "left":
                    $("#left").attr("src", "image/left1.png");
                    if (CtrolTimer != null) {
                        clearInterval(CtrolTimer);
                        CtrolTimer = null;
                    }
                    CtrolTimer = setInterval(function () {
                        Jobs.DirectionControl("left");
                    }, 300);

                    break;
                case "right":
                    $("#right").attr("src", "image/right1.png");
                    if (CtrolTimer != null) {
                        clearInterval(CtrolTimer);
                        CtrolTimer = null;
                    }
                    CtrolTimer = setInterval(function () {
                        Jobs.DirectionControl("right");
                    }, 300);
                    break;
                case "down":
                    $("#down").attr("src", "image/down1.png");
                    if (CtrolTimer != null) {
                        clearInterval(CtrolTimer);
                        CtrolTimer = null;
                    }
                    CtrolTimer = setInterval(function () {
                        Jobs.DirectionControl("back");
                    }, 300);

                    break;
                case "up":
                    $("#up").attr("src", "image/up1.png");
                    if (CtrolTimer != null) {
                        clearInterval(CtrolTimer);
                        CtrolTimer = null;
                    }
                    CtrolTimer = setInterval(function () {
                        Jobs.DirectionControl("front");
                    }, 300);
                    break;
                case "stop":
                    $("#stop").attr("src", "image/start.png");
                    if (CtrolTimer != null) {
                        clearInterval(CtrolTimer);
                        CtrolTimer = null;
                    }
                    CtrolTimer = setInterval(function () {
                        Jobs.DirectionControl("stop");
                    }, 300);
                    break;
                case "touchBtn":
                    NavEvent.imuLock = true;
                    $("#touchBtn").attr('src', 'image/finger-green.png');
                    break;
                default:
                    break;

            }
            break;
        case "touchend":
            if (CtrolTimer != null) {
                clearInterval(CtrolTimer);
                CtrolTimer = null;
            }
            Jobs.DirectionControl("stop");
            switch (event.target.id) {
                case "left":
                    $("#left").attr("src", "image/left.png");
                    break;
                case "right":
                    $("#right").attr("src", "image/right.png");
                    break;
                case "down":
                    $("#down").attr("src", "image/down.png");
                    break;
                case "up":
                    $("#up").attr("src", "image/up.png");
                    break;
                case "stop":
                    $("#stop").attr("src", "image/stop.png");
                    break;
                case "touchBtn":
                    NavEvent.imuLock = false;
                    $("#touchBtn").attr('src', 'image/finger-red.png');
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }

}

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

