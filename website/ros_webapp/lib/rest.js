'use strict';

var restify = function(pathPrefix){
	pathPrefix = pathPrefix || '/api/';
	return async (ctx, next) => {
		if (ctx.request.path.startsWith(pathPrefix))
		{
			ctx.rest = (data) => {
				ctx.response.type = 'application/json';
				ctx.response.body = data;
			};
			await next();
		}
		else
		{
			await next();
		}
	};
};

var APIError = function(code, message){
	this.code = code || 'internal: unknown_error';
	this.message = message || '';
};

module.exports = {
	APIError: APIError,
	restify: restify
};