
var MysqlEvent = NavEvent || {
    REVISION: '0.0.1.0-2016-11.15'
};

MysqlEvent.status = {
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
MysqlEvent.HtmlID = {
    login_name: "#login-name",
    login_password: "#login-password",

    register_name: "#register-name",
    register_password: "#register-password",
    register_password_agin: "#register-password-agin",

    old_password: "#old-password",
    new_password: "#new-password",
    confirm_password: "#confirm-password",

    user_table:"#user-table",
}

$(function () {

    $("#login").click(function () {
        var username = $(MysqlEvent.HtmlID.login_name)[0].value;
        var userpassword = $(MysqlEvent.HtmlID.login_password)[0].value;
        var url = "http://" + window.location.hostname + ":8808/login";
        $.ajax({
            type: 'post',
            url: url,
            data: { username: username, password: userpassword },
            async: true,
            success: function (data) {
                console.log(data);
                if (data.status == MysqlEvent.status.LoginSuccess) {
                    NavEvent.data.LoginName = username;
                    NavEvent.data.LoginPassword = userpassword;
                    $.mobile.changePage("#hrg-navigation-main-page", { transition: "slide" });
                }
                else if (data.status == MysqlEvent.status.LoginFail_NotExist) {
                    sweetAlert("用户名或者密码错误", "", "error");
                }
                else if (data.status == MysqlEvent.status.LoginFail_LoginedIn) {
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
                if (data.status == MysqlEvent.status.LogoutSuccess) {
                    NavEvent.data.LoginName = "";
                    NavEvent.data.LoginPassword = "";
                    $(MysqlEvent.HtmlID.login_name)[0].value = "";
                    $(MysqlEvent.HtmlID.login_password)[0].value = "";
                    $.mobile.changePage("#hrg-login-page", { transition: "slide" });
                }
                else if (data.status == MysqlEvent.status.LogoutFail) {
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
                AddtableList(data);
                $.mobile.changePage("#hrg-user-table-page", { transition: "slide" });
            },
            dataType: "json"
        });
    });

    $("#btn-register").click(function () {
        var username = $(MysqlEvent.HtmlID.register_name)[0].value;
        var userpassword = $(MysqlEvent.HtmlID.register_password)[0].value;
        if (!isRegisterUserName(username)) {
            sweetAlert("用户名不合法", "", "warning");
            return;
        }
        if (!isPasswd(userpassword)) {
            sweetAlert("密码不合法", "", "warning");
            return;
        }
        if (userpassword != $(MysqlEvent.HtmlID.register_password_agin)[0].value) {
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
                if (data.status == MysqlEvent.status.RegisterSuccess) {
                    $.mobile.changePage("#hrg-login-page", { transition: "slide" });
                }
                else if (data.status == MysqlEvent.status.RegisterFail) {
                    sweetAlert("注册失败", "", "error");
                }
                else if (data.status == MysqlEvent.status.RegisterFail_Exist) {
                    sweetAlert("注册失败 用户名已存在", "", "error");
                }
            },
            dataType: "json"
        });
    });

    $("#btn-updata").click(function () {
        if ($(MysqlEvent.HtmlID.old_password)[0].value != NavEvent.data.LoginPassword) {
            sweetAlert("原密码输入错误", "", "error");
            return;
        }
        if (!isPasswd($(MysqlEvent.HtmlID.new_password)[0].value)) {
            sweetAlert("新密码不合法", "", "warning");
            return;
        }
        if ($("#new-password")[0].value != $(MysqlEvent.HtmlID.confirm_password)[0].value) {
            sweetAlert("输入密码不一致", "", "error");
            return;
        }
        var username = NavEvent.data.LoginName;
        var userpassword = $(MysqlEvent.HtmlID.new_password)[0].value;
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

    function AddtableList(data) {
        $(MysqlEvent.HtmlID.user_table)[0].innerHTML = "";
        var header = "";
        var headerList = new Array();
        for (var key in data[0]) {
            header += "<th data-priority='1'>" + key + "</th>";
            headerList.push(key);
        }
        var html1 = " <thead><tr>" + header + "</tr></thead>"

        $(MysqlEvent.HtmlID.user_table).append(html1);
        var row = "";
        for (var i = 0; i < data.length; i++) {
            var temp = "";
            for (var j = 0; j < headerList.length; j++) {
                temp += "<td>" + data[i][headerList[j]] + "</td>"
            }
            row += "<tr>" + temp + "</tr>";
        }
        var html2 = "<tbody>" + row + "</tbody>";
        $(MysqlEvent.HtmlID.user_table).append(html2);

    }

    window.onbeforeunload = function (e) {
        if (NavEvent.data.LoginName != "")
            $("#logout").click();
    }

})



