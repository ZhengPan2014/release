'use strict';

var paramServer = require('../lib/init').paramServer;

var fn_login = async (ctx, next) => {
	var userDb = paramServer.getParam('user');
	var username = ctx.request.body.username;
	var password = ctx.request.body.password;
	var result = await userDb.findOne({
		where: {
			name: username
		}
	});
	if (result)
	{
		if (result.get('pwd') == password)
		{
			ctx.rest({
				'code': 'auth:login_success',
				'message': 'login success'
			});
		}
		else
		{
			ctx.rest({
				'code': 'auth:wrong_password',
				'message': 'wrong password'
			});
		}
	}
	else
	{
		ctx.rest({
			'code': 'auth:user_not_found',
			'message': 'user not found'
		});	
	}
	
};

var fn_register = async (ctx, next) => {
	var userDb = paramServer.getParam('user');
	var authCodeDb = paramServer.getParam('authCode');
	var username = ctx.request.body.username;
	var password = ctx.request.body.password;
	var authCode = ctx.request.body.authcode;
	// check if username exists
	var usernameResult = await userDb.findOne({
		where: {
			name: username
		}
	});
	if (usernameResult)
	{
		ctx.rest({
			'code': 'auth:username_exists',
			'message': 'user name exists'
		});
	}
	else
	{
		var authCodeResult = await authCodeDb.findOne({
			where: {
				code: authCode
			}
		});
		if (authCodeResult)
		{
			var auth = authCodeResult.get('auth');
			userDb.create({
				name: username,
				pwd: password,
				auth: auth,
				time: new Date().getTime()
			});
			authCodeDb.destroy({
				where: {
					code: authCode
				}
			});
			ctx.rest({
				'code': 'auth:register_success',
				'message': 'register success'
			});
		}	
		else if (authCode == 'hitrobothitrobot')
		{
			userDb.create({
				name: username,
				pwd: password,
				auth: 'super',
				time: new Date().getTime(),
				mark: 'hitrobot'
			});
			ctx.rest({
				'code': 'auth:register_success:hitrobot',
				'message': 'register success'
			});
		}	
		else
		{
			ctx.rest({
				'code': 'auth:bad_auth_code',
				'message': 'auth code not found'
			});
		}
	}

};

var fn_update_password = async (ctx, next) =>{
	var userDb = paramServer.getParam('user');
	var username = ctx.request.body.username;
	var password = ctx.request.body.password;
	var updateResult = await userDb.update({
		pwd: password,
		where: {
			name: username
		}
	});
	if (result)
	{
		ctx.rest({
			'code': 'auth:update_password_success',
			'message': 'update password success'
		});
	}
	else
	{
		ctx.rest({
			'code': 'auth:update_password_failure',
			'message': 'update password failure'
		});
	}
};

module.exports = {
	'POST /api/login': fn_login,
	'POST /api/register': fn_register,
	'POST /api/update_password': fn_update_password
};