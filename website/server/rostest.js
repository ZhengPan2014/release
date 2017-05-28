'use strict'

var rosnodejs = require('rosnodejs');
rosnodejs.initNode('my_node').then((nodeHandle) => {
	  console.log("haha1");
}).catch(() => {
	  console.log("haha2");
});
