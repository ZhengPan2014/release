var express = require('express');
var db = require('./db');
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));


//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

var status = {
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

app.listen('8808', function () {
    console.log("listen on port 8808");
});

var currentUser = new Array();

app.get('/select', function (req, res, next) {
    try {
        db.query("select * from login", function (err, result) {
            WriteOut(result, res);
        }); 
    }
    catch (e) { };
});

app.post('/login', function (req, res, next) {
    try {
        //for (var i = 0; i < currentUser.length; i++) {
        //    if (req.body.username == currentUser[i]) {
        //        WriteOut({ status: status.LoginFail_LoginedIn, message: "login fail User name is logged in" }, res);
        //        return;
        //    }
        //}
        db.query("select * from login", function (err, result) {
            for (var i = 0; i < result.length; i++) {
                if (req.body.username == result[i].name) {
                    if (req.body.password == result[i].password) {
                        WriteOut({ status: status.LoginSuccess, message: "login success" }, res);
                        currentUser.push(req.body.username);
                        return;
                    }
                }
            }
            WriteOut({ status: status.LoginFail_NotExist, message: "login fail User name does not exist" }, res);
        });
    }
    catch (e) { };
});

app.post('/logout', function (req, res, next) {
    try{
        console.log(req.body.username + "  logout");
        var index = getIndexFromArray(req.body.username, currentUser);
        if (index >= 0) {
            currentUser.del(index);
            WriteOut({ status: status.LogoutSuccess, message: "logout success" }, res);
        }
        else {
            WriteOut({ status: status.LogoutFail, message: "logout fail" }, res);
        }
    }
    catch(e){};
});

app.post('/register', function (req, res, next) {
    try{
        db.query("select * from login", function (err, result) {
            for (var i = 0; i < result.length; i++) {
                if (req.body.username == result[i].name) {
                    WriteOut({ status: status.RegisterFail_Exist, message: "register fail User name has exist" }, res);
                    return;
                }
            }
        });
	
	var date = new Date().toLocaleString();
        var sqlstring = "INSERT INTO login(time,name,password,auth,mark)VALUES"
          + "('"+date+"','" + req.body.username + "','" + req.body.password + "','test1','test');";
        db.query(sqlstring, function (err, result) {
            if (err) {
                WriteOut({ status: status.RegisterFail, message: "register fail" }, res);
            }
            else {
                WriteOut({ status: status.RegisterSuccess, message: "register success" }, res);
            }
        });
    }
    catch (e) { }
});

app.post('/updata', function (req, res, next) {
    try{
        var sqlstring = "UPDATE login SET password='" + req.body.password + "' WHERE name='" + req.body.username + "'";
        db.query(sqlstring, function (err, result) {
            if (err) {
                WriteOut({ status: status.UpdataFail, message: "updata fail" }, res);
            }
            else {
                WriteOut({ status: status.UpdataSuccess, message: "updata success" }, res);
            }
        });
    }
    catch(e){};
});

function WriteOut(value, res) {
    res.send(JSON.stringify(value));
}

Array.prototype.del = function (index) {

    if (isNaN(index) || index >= this.length) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[index]) {
            this[n++] = this[i];
        }
    }
    this.length -= 1;
};

function getIndexFromArray(name, list) {
    var index = -1;
    for (var i = 0; i < list.length; i++) {
        if (name == list[i]) {
            index = i;
            return index;
        }
    }
    return index;
}

