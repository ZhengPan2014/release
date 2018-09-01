$(function () {	
	//定义 nav width
	var TabNavLiLength = $("#tabNav li").length;
	var Percentage = 100;
	var TabNavWidth = Percentage/TabNavLiLength + '%';
	$("#tabNav li").css("width", TabNavWidth);
	//定义物料面板高度
	var height = $(window).height();
	var width = $(window).width();
	$("#app").css("width", width).css("height", height);	
})
