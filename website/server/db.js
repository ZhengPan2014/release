'use strict'

var Sequelie = require('sequelize');

// connect to mysql
// database: tailin
// user: root
// pwd: lll
var sequelize = new Sequelie('tailin', 'root', 'lll', 
    {
        host: 'localhost',
        dialect: 'mysql',
        pool: 
            {
                max: 50,
                min: 0,
                idle: 10000
            },
        timezone: '+08:00',
    });


// table: user
// +----+-------+-----------+---------------------+--------+---------+
// | ID | name  | pwd       | auth                | time   | mark    |
// +----+-------+-----------+---------------------+--------+---------+
// |  1 | string| string    | super/admin/tech/op | double | string  |
// +----+-------+-----------+---------------------+--------+---------+
var User = sequelize.define('user',{
    name: {
        type: Sequelie.STRING,
        allowNull: false
    },
    pwd:{
        type: Sequelie.STRING,
        allowNull: false
    },
    auth: {
        type: Sequelie.STRING,
        allowNull: false
    },
    time: {
        type: Sequelie.DOUBLE,
        allowNull: false
    },
    mark: {
        type: Sequelie.STRING,
        allowNull: true
    },
},
{
    freezeTableName: true
});


// table: auth_code
// +----+-------+-----------+------------+-------------------------+
// | ID | code  | name      | time       | auth                    |
// +----+-------+-----------+------------+-------------------------+
// |  1 | string| string    | double     | super/ admin/ tech/ op  |
// +----+-------+-----------+------------+-------------------------+
var AuthCode = sequelize.define('auth_code',{
    code: {
        type: Sequelie.STRING,
        allowNull: false
    },
    name: {
        type: Sequelie.STRING,
        allowNull: false
    },
    time: {
        type: Sequelie.DOUBLE,
        allowNull: false
    },
    auth: {
        type: Sequelie.STRING,
        allowNull: false
    }
},
{
    freezeTableName: true
});

// table: op_record
// operation records
// +----+-------+-----------+------------+
// | ID | time  | name      | operation  |
// +----+-------+-----------+------------+
// |  1 | Date  | string    | string     |
// +----+-------+-----------+------------+
var OpRecord = sequelize.define('op_record', {
    time: {
        type: Sequelie.DATE,
        allowNull: false
    },
    name: {
        type: Sequelie.STRING,
        allowNull: false
    },
    operation: {
        type: Sequelie.STRING,
        allowNull: false
    }
},
{
    freezeTableName: true
});

// check if exists tables
AuthCode.sync({force: false}).then(function(result){});
User.sync({force: false}).then(function(result){});
OpRecord.sync({force: false}).then(function(result){});

function delAuthCode(days)
{
    var validInteval = 86400000 * days;
    var p = new Date().getTime() - validInteval;
    AuthCode.destroy({
        where: {
            time: {
                $lt: p
            }
        }
    }).then(function(result){
        console.log('invalid auth code deleted');
    });
}

// delAuthCode(7);

module.exports = {
    User: User,
    AuthCode: AuthCode,
    OpRecord: OpRecord
};





