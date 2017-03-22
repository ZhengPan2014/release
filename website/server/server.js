'use strict'

var fs = require('fs');
var express = require('express');
var db = require('./db');
var app = express();
var bodyParser = require("body-parser");
var crypto = require('crypto'); 

// var log4js = require('log4js');
// var PDFDocument = require('pdfkit');

// log4js.configure({
//     appenders: [
//         {
//             type: 'console'
//         },
//         {
//             type: 'file',
//             filename: 'logs/server.log',
//             maxLogSize: 1024,
//             backups: 4,
//             category: 'normal'
//         }
//     ],
//     replaceConsole: true
// });
// var logger = log4js.getLogger('normal');
// logger.setLevel('INFO');
// app.use(log4js.connectLogger(logger, {level:'auto'}));

var status = {
    LoginSuccess: 0,
    LoginFail_NotExist: -1,
    LoginFail_LoginedIn: -2,
    LoginFail_WrongPwd: -3,

    RegisterSuccess: 1,
    RegisterFail: -4,
    RegisterFail_Exist: -5,
    RegisterFail_InvalidCode: -6,

    LogoutSuccess: 2,
    LogoutFail: -7,

    UpdataSuccess: 3,
    UpdataFail: -8,

    GenerateCodeSuccess: 4,
    GenerateCodeFail: -9,

    InvalidAuthCode: -10,
    RegisterFail_CodeOutOfDate: -11,

    UpdateAuthSuccess: 5,
    UpdateAuthFail: -12,
    UpdateAuthFail_Denied: -13,

    StoreOpRecordSuccess: 6,
    StoreOpRecordFail: -14,

    QueryOpRecordSuccess: 7,
    QueryOpRecordFail: -15
}

var authLevel = {
    "op": 0,
    "tech": 1,
    "admin": 2,
    "super": 3
}

var validInteval = 86400000;// valid inteval for auth code(ms), 24h
var currentUser = new Array();

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

app.listen('8808', function () {
    console.log("nodejs listen on port 8808");
});

app.get('/user_select', function(req, res, next){
    try{
        db.User.findAll().then(function(results){
            var records = [];
            for (var i = 0; i < results.length; i++)
            {
                var record = {
                    name: results[i].get('name'),
                    pwd: results[i].get('pwd'),
                    auth: results[i].get('auth'),
                    registertime: new Date(results[i].get('createdAt')+'UTC')
                };
                records.push(record);
            }
            WriteOut(records, res);
            console.log('get user info success');
        });
    }
    catch(e){
        console.log(e);
    };
});

// Todo: $ne does not work
app.get('/get_users', function(req, res, next){
    try
    {
        db.User.findAll({
            where: {
                mark: {
                    $ne: 'hitrobot'
                }
            }
        }).then(function(results){
            var users = [];
            for (var i = 0; i < results.length; i++)
            {
                users.push(results[i].get('name'));
            }
            WriteOut({users: users}, res);
            console.log('get user names success');           
        });
    }
    catch(e){
        cosole.log(e);
    }
});

app.post('/login', function(req, res,next){
    try{
        var username = req.body.username;
        var password = req.body.password;
        db.User.findAll({where: {name: username}}).then(function(results){
            if (results.length === 1)
            {
                if (results[0].get('pwd') === password)
                {
                    WriteOut({
                        status: status.LoginSuccess,
                        message: "login success",
                        auth: results[0].get('auth')
                    }, res);
                    currentUser.push(username);
                    console.log('user already logged in');
                    return;
                }
                else
                {
                    WriteOut({
                        status: status.LoginFail_WrongPwd,
                        message: "wrong password",
                    }, res);
                    console.log('login failed, wrong pwd');
                    return;
                }
            }
            else
            {
                WriteOut({
                    status: status.LoginFail_NotExist,
                    message: "user name not exist",
                }, res);
                console.log('login failed, user name does not exist');
            }
        });
    }
    catch(e){
        console.log(e);
    };
});

app.post('/logout', function (req, res, next) {
    try{
        var username = req.body.username;
        var index = getIndexFromArray(username, currentUser);
        if (index >= 0) {
            currentUser.del(index);
            WriteOut({ status: status.LogoutSuccess, message: "logout success" }, res);
            console.log(username + ' logout');
        }
        else {
            WriteOut({ status: status.LogoutFail, message: "logout fail" }, res);
            console.log(username + ' logout failed');
        }
    }
    catch(e){
        console.log(e);
    };
});

app.post('/register', function(req, res, next){
    try{
        var username = req.body.username;
        var password = req.body.password;
        var authCode = req.body.authCode;
        db.User.findAll({where: {name: username}}).then(function(results){
            if (results.length)
            {
                WriteOut({status: status.RegisterFail_Exist, 
                    message: "register failed, user name already exist"}, res);
                console.log('register failed, username already exist');
                return;
            }
            else
            {
                if (authCode === 'hitrobot')
                {
                    db.User.create({
                        name: username,
                        pwd: password,
                        auth: 'super',
                        time: new Date().getTime(),
                        mark: 'hitrobot'
                    }).then(function(result){
                        if (result)
                        {
                            WriteOut({status: status.RegisterSuccess, message: "Register success"},res);
                            console.log('register success with auth code: ' + authCode);
                            return;
                        }
                        else
                        {
                            WriteOut({status: status.RegisterFail, message: "Register failure"}, res);
                            console.log('register failed with auth code: ' + authCode);
                            return;
                        }
                    });
                } 
                else
                {
                    db.AuthCode.findAll({where: {code: authCode}}).then(function(results){
                        if (results.length === 1)
                        {
                            var inteval = new Date().getTime() - results[0].get('time');
                            var auth = results[0].get('auth');
                            if (inteval < validInteval)
                            {
                                db.User.create({
                                    name: username,
                                    pwd: password,
                                    auth: auth,
                                    time: new Date().getTime()
                                }).then(function(result){
                                    if (result)
                                    {
                                        db.AuthCode.destroy({where: {code: authCode}}).then(function(result){});
                                        WriteOut({status: status.RegisterSuccess, message: "Register success"},res);
                                        console.log('register success with auth code: ' + authCode);
                                        return;
                                    }
                                    else
                                    {
                                        WriteOut({status: status.RegisterFail, message: "Register failure"}, res);
                                        console.log('register failed with auth code: ' + authCode);
                                        return;
                                    }
                                });
                            } // if inteval
                            else
                            {
                                db.AuthCode.destroy({where: {code: authCode}}).then(function(result){});
                                WriteOut({
                                    status: status.RegisterFail_CodeOutOfDate, 
                                    message: "invalid auth code"}, 
                                    res);
                                console.log('register failed, invalid auth code');
                            }
                        } // if results.length
                        else
                        {
                            WriteOut({status: status.RegisterFail_InvalidCode, message: "invalid auth code"}, res);
                            console.log('register failed, invalid auth code');
                        }
                    });
                }// if auth_code else
            }// if results.length else
        });
    }// try
    catch(e){
        console.log(e);
    }
});

app.post('/update', function(req, res, next){
    try
    {
        var username = req.body.username;
        var password = req.body.password;
        console.log('username' + username);
        console.log('password' + password);
        db.User.update({pwd: password},{where: {name: username}}).then(function(result){
            if (result)
            {
                WriteOut({status: status.UpdataSuccess, message: "update success"}, res);
                console.log('update pwd success');
            }
            else
            {
                WriteOut({status: status.UpdataFail, message: "update failure"}, res);
                console.log('update pwd failed');
            }
        });
    }
    catch(e){
        console.log(e);
    }
});

app.post('/code', function(req, res, next){
    try
    {
        var username = req.body.username;
        var auth = req.body.auth;
        db.User.findOne({where: {name: username}}).then(function(result){
            if (result)
            {
                var result_auth = result.get('auth');
                if (authLevel[result_auth] > authLevel[auth] || result_auth == 'super')
                {
                    var timeStamp = new Date().getTime();
                    var rawCode = username + auth + timeStamp;
                    var hash = crypto.createHash('MD5');
                    hash.update(rawCode);
                    var code = hash.digest('hex'); 
                    db.AuthCode.create({
                        code: code,
                        name: username,
                        time: timeStamp,
                        auth: auth
                    }).then(function(result){
                        if (result)
                        {
                            WriteOut({
                                status: status.GenerateCodeSuccess, 
                                message: "generate auth code success",
                                authcode: code}, res);
                            console.log('generate auth code success: ' + code);
                        }
                        else
                        {
                            WriteOut({status: status.GenerateCodeFail, 
                                message: "db error when generating auth code"}, res);
                            console.log('generate auth code failed');
                        }
                    });
                }// if check auth level
                else
                {
                    WriteOut({status: status.GenerateCodeFail, 
                        message: "no permission to generate higher level auth code"}, res);
                    console.log('no permission to generate higher level auth code');
                }
            }
            else
            {
                WriteOut({status: status.GenerateCodeFail, message: "user not found"}, res);
                console.log('user not found');
            }
        });
    } // try
    catch(e){
        console.log(e);
    }
});

app.post('/update_auth', function(req, res, next){
    try
    {
        var username = req.body.username;
        var target = req.body.target;
        var auth = req.body.auth;
        db.User.findOne({where: {name: username}}).then(function(result){
            if (result)
            {
                var result_auth = result.get('auth');
                if (authLevel[result_auth] > authLevel[auth])
                {
                    db.update({auth: auth}, {where: {name: target}}).then(function(result){
                        if (result)
                        {
                            WriteOut({status: status.UpdateAuthSuccess, message: "update auth success"}, res);
                            console.log('update auth success');
                        }
                        else
                        {
                            WriteOut({status: status.UpdateAuthFail, message: "update auth failure"}, res);
                            console.log('update auth failed');
                        }
                    });
                } // if authLevel
                else
                {
                    WriteOut({status: status.UpdateAuthFail_Denied, message: "update auth denied"}, res);
                    console.log('update auth denied');
                }
            }// if result
            else
            {
                WriteOut({status: status.UpdateAuthFail, message: "update auth failure"}, res);
                console.log('update auth failed');
            }
        });
    }
    catch(e){
        console.log(e);
    }
});

// store operation records
app.post('/store_record', function(req, res, next){
    try
    {
        var time = new Date(req.body.time);
        var username = req.body.username;
        var operation = req.body.operation;
        db.OpRecord.create({
            time: time,
            name: username,
            operation: operation
        }).then(function(result){
            if (result)
            {
                WriteOut({
                    status: status.StoreOpRecordSuccess, 
                    message: "store operation records success"
                }, res);
                console.log('store operation records success');
            }
            else
            {
                WriteOut({
                    status: status.StoreOpRecordFail,
                    message: "store operation records failure"
                }, res);
                console.log('store operation records failed');
            }
        });
    }
    catch(e){
        console.log(e);
    }
});

// get operation records
app.post('/query_op', function(req, res, next){
    try
    {
        var start = new Date(req.body.start);
        var end = new Date(req.body.end);
        var username = req.body.username;
        if (typeof(username) === undefined)
        {
            db.OpRecord.findAll({
                where: {
                    time: {
                        $between: [start, end]
                    }
                }
            }).then(function(results){
                var records = getOpRecords(results);
                WriteOut({
                    status: status.QueryOpRecordSuccess,
                    message: "query operation records success",
                    records: records
                }, res);
                console.log('query operation records success, mode: by date');
            });
        }
        else
        {
            db.OpRecord.findAll({
                where: {
                    time: {
                        $between: [start, end]
                    },
                    name: username
                }
            }).then(function(results){
                var records = getOpRecords(results);
                WriteOut({
                    status: status.QueryOpRecordSuccess,
                    message: "query operation records success",
                    records: records
                }, res);
                console.log('query operation records success, mode: by user');
            });
        }
    }
    catch(e){
        console.log(e);
    }
});

app.get('/pdf', function(req, res, next){
    convertPDF(res);
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

function getOpRecords(results)
{
    var records = [];
    for (var i = 0; i < results.length; i++)
    {
        var time = results[i].get('time');
        var localTime = new Date(time + "UTC");
        var record = {
            time: localTime,
            user: results[i].get('name'),
            operation: results[i].get('operation')
        };
        records.push(record);
    }
    return records;
}

function convertPDF(res)
{
    var doc = new PDFDocument;
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.fontSize(25)
        .text('Some text with an embedded font!', 100, 100) 
    doc.end();
    res.download('output.pdf');
}