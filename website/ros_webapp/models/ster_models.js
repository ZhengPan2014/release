'use strict';

var paramServer = require('../lib/init').paramServer;

var user = {
	name: 'user',
	table: {
		name: 'string',
		pwd: 'string',
		auth: 'string',
		time: 'double',
		mark: {
			type: 'string',
			allowNull: true
		}
	}
};

var authCode = {
	name: 'authCode',
	table: {
		code: 'string',
		name: 'string',
		time: 'double',
		auth: 'string'
	}
};

var opRecord = {
	name: 'opRecord',
	table: {
		time: 'date',
		name: 'string',
		operation: 'string'
	}
};

module.exports = {
	user: user,
	authCode: authCode,
	opRecord: opRecord
}
