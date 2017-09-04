'use strict';

var DATA = new DataServer();

function DataServer(){
	// TODO
};

DataServer.prototype.register = function(key, value, options){
	if (this.hasOwnProperty(key))
	{
		return;
	}
	var fnGetDefault = function(){
		return value;
	};
	var fnSetDefault = function(val){
		if (val === value)
		{
			return;
		}
		if (val.hasOwnProperty('property'))
		{
			console.log(`Got key-value: ${val.property}`);
			value = val.value; 
		}
		else
		{
			value = val;	
		}
	};
	var fnGet = options.fnGet || fnGetDefault;
	var fnSetOptions = options.fnSet || function(){};
	var fnSet = function(val){
		fnSetDefault(val);
		fnSetOptions(val);
	};
	Object.defineProperty(this, key, {
		get: fnGet,
		set: fnSet
	});
};

DataServer.prototype.syncToLocalStorage = function(){
	//TODO
};

/**********************/
function test()
{
	DATA.register('map', null, {
		fnSet: setFunc
		}
	)
}

function setFunc(val)
{
	if (val.hasOwnProperty('property'))
	{
		if (val.value)
		{
			var func = 'test' + val.property;
			funcList[func]();
		}
		else
		{
			console.log('undisplay sth');
		}
	}
}

var funcList = {
	test1: () => {
		console.log('test1');
	},
	test2: () => {
		console.log('test2');
	}
};

test();
DATA.map = {
	property: 1,
	value: false 
};

//DATA.map = 3
console.log(DATA.map);