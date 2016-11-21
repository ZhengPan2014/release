
var db_status = {
    LoginSuccess: 0,
    LoginFail_NotExist: -1,
    LoginFail_LoginedIn: -2,

    RegisterSuccess: 1,
    RegisterFail: -3,
    RegisterFail_Exist: -4,

    LogoutSuccess: 2,
    LogoutFail: -5,

    UpdataSuccess: 3,
    UpdataFail: -6
}

$("#login").click(function () {
    var username = $("#username")[0].value;
    var userpassword = $("#userpassword")[0].value;
    var url = "http://" + window.location.hostname + ":8808/login";
    $.ajax({
        type: 'post',
        url: url,
        data: { username: username, password: userpassword },
        async: true,
        success: function (data) {
            console.log(data);
            if (data.status == db_status.LoginSuccess) {
                NavEvent.data.LoginName = username;
                NavEvent.data.LoginPassword = userpassword;
                $(".current-user").html(NavEvent.data.LoginName);
                $.mobile.changePage("#hrg-creatmap", { transition: "slide" });
            }
            else if (data.status == db_status.LoginFail_NotExist) {

                sweetAlert("用户名或者密码错误", "", "error");
            }
            else if (data.status == db_status.LoginFail_LoginedIn) {
                sweetAlert("该用户已在其他设备登录", "", "warning");
            }
        },
        dataType: "json"
    });
});
$("#logout").click(function () {
    var username = NavEvent.data.LoginName;
    var url = "http://" + window.location.hostname + ":8808/logout";
    $.ajax({
        type: 'post',
        url: url,
        data: { username: username },
        async: true,
        success: function (data) {
            console.log(data);
            if (data.status == db_status.LogoutSuccess) {
                NavEvent.data.LoginName = "";
                NavEvent.data.LoginPassword = "";
                $("#username")[0].value = "";
                $("#userpassword")[0].value = "";
                $.mobile.changePage("#hrg-load-page", { transition: "slide" });
            }
            else if (data.status == db_status.LogoutFail) {
                sweetAlert("注销失败", "", "error");
            }

        },
        dataType: "json"
    });
});

$("#get").click(function () {
    var url = "http://" + window.location.hostname + ":8808/select";
    $.ajax({
        type: 'get',
        url: url,
        async: true,
        success: function (data) {
            console.log(data);
            Addtable("user-table", data);
            $.mobile.changePage("#hrg-usertable-page", { transition: "slide" });
        },
        dataType: "json"
    });
});

$("#btn-register").click(function () {
    var username = $("#register-name")[0].value;
    var userpassword = $("#register-password")[0].value;
    if (!isRegisterUserName(username)) {
        sweetAlert("用户名不合法", "", "warning");
        return;
    }
    if (!isPasswd(userpassword)) {
        sweetAlert("密码不合法", "", "warning");
        return;
    }
    if (userpassword != $("#register-password-agin")[0].value) {
        sweetAlert("密码不一致", "", "error");
        return;
    }
    var url = "http://" + window.location.hostname + ":8808/register";
    $.ajax({
        type: 'post',
        url: url,
        data: { username: username, password: userpassword },
        async: true,
        success: function (data) {
            if (data.status == db_status.RegisterSuccess) {
                $.mobile.changePage("#hrg-load-page", { transition: "slide" });
            }
            else if (data.status == db_status.RegisterFail) {
                sweetAlert("注册失败", "", "error");
            }
            else if (data.status == db_status.RegisterFail_Exist) {
                sweetAlert("注册失败 用户名已存在", "", "error");
            }
        },
        dataType: "json"
    });
});

$("#btn-updata").click(function () {
    if ($("#old-password")[0].value != NavEvent.data.LoginPassword) {
        sweetAlert("原密码输入错误", "", "error");
        return;
    }
    if (!isPasswd($("#new-password")[0].value)) {
        sweetAlert("新密码不合法", "", "warning");
        return;
    }
    if ($("#new-password")[0].value != $("#confirm-password")[0].value) {
        sweetAlert("输入密码不一致", "", "error");
        return;
    }
    var username = NavEvent.data.LoginName;
    var userpassword = $("#new-password")[0].value;
    var url = "http://" + window.location.hostname + ":8808/updata";
    $.ajax({
        type: 'post',
        url: url,
        data: { username: username, password: userpassword },
        async: true,
        success: function (data) {
            console.log(data);
            if (data.status == db_status.UpdataSuccess) {
                NavEvent.data.LoginPassword = userpassword;
                $("#hrg-change-password-popup").popup("close");
            }
            else if (data.status == db_status.UpdataFail) {
                sweetAlert("修改失败", "", "error");
            }

        },
        dataType: "json"
    });
});
function isPasswd(s) {
    var patrn = /^(\w){6,20}$/;
    if (!patrn.exec(s))
        return false
    return true
}
function isRegisterUserName(s) {
    var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
    if (!patrn.exec(s)) return false
    return true
}

function Addtable(dom, data) {
    $("#user-table")[0].innerHTML = "";
    var header = "";
    var headerList = new Array();
    for (var key in data[0]) {
        header += "<th data-priority='1'>" + key + "</th>";
        headerList.push(key);
    }
    var html1 = " <thead><tr>" + header + "</tr></thead>"

    $("#user-table").append(html1);
    var row = "";
    for (var i = 0; i < data.length; i++) {
        var temp = "";
        for (var j = 0; j < headerList.length; j++) {
            temp += "<td>" + data[i][headerList[j]] + "</td>"
        }
        row += "<tr>" + temp + "</tr>";
    }
    var html2 = "<tbody>" + row + "</tbody>";
    $("#user-table").append(html2);

}

window.onbeforeunload = function (e) {
    if (NavEvent.data.LoginName != "")
        $("#logout").click();
}


