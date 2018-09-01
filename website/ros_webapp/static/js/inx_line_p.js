//连接 ros
var ros = new ROSLIB.Ros();
var url = 'ws://' + window.location.hostname + ':9090';
ros.connect(url);	
//连接成功
ros.on('connection', function () {
	global_vue.startUp = "连接成功:点击启动任务";
	global_vue.defaultColor = global_vue.normalColor;
})	
//连接失败
ros.on('error', function ()	{
	global_vue.startUp = "连接失败";
	global_vue.defaultColor = global_vue.errorColor;	
})
//连接断开
ros.on("close", function() {
	global_vue.startUp = "连接已断开";
	global_vue.defaultColor = global_vue.interruptColor;	
})

//任务开始启动
function waypoint_user_pub(){
	var WaypointUserPub = new ROSLIB.Topic({
		ros : ros,
		name : '/waypoint_user_pub',
		messageType : 'std_msgs/String'
	})
	var msg = new ROSLIB.Message({
		data : 'start_line_p'
	})
	WaypointUserPub.publish(msg);
}

//货架状态
function timeout_shelves(	){
	var timeoutShelves = new ROSLIB.Topic({
		ros : ros,
		name : '/timeout_shelves',
		messageType : 'scheduling_msgs/ShelvesStatus'
	})			
	timeoutShelves.subscribe(function(message){
		global_vue.agv_ints = message.agv_shelves;
		global_vue.station_shelves = message.agv_shelves;		
	})
}


//正在执行任务状态
function executing_tasks(){
	var executingTasks = new ROSLIB.Topic({
		ros : ros,
		name : '/executing_tasks',
		messageType : 'scheduling_msgs/TaskInxLinePList'
	})			
	executingTasks.subscribe(function(message){
		if(message.tasks.length === 0){
			return
		}
		global_vue.shelf_id = message.tasks[0].shelf_id;
		global_vue.task_type = message.tasks[0].task_type;
		global_vue.materiarls_strings = message.tasks[0].materials;
		global_vue.layers_ints = message.tasks[0].layers;
	})
}


//等待执行任务状态
function pending_tasks(){
	var pendingTasks = new ROSLIB.Topic({
		ros : ros,
		name : '/pending_tasks',
		messageType : 'scheduling_msgs/TaskInxLinePList'
	})			
	pendingTasks.subscribe(function(message){
		global_vue.alls = message.tasks;
	})
}


//任务管理程序状态
function task_manager_status(){
	var taskManagerStatus = new ROSLIB.Topic({
		ros : ros,
		name : '/task_manager_status',
		messageType : 'std_msgs/String'
	})			
	taskManagerStatus.subscribe(function(message){
		global_vue.data_data = message.data;
		// 货架状态
		// paused 
		// running
		if (message.data === 'paused')
		{
			global_vue.defaultImage = global_vue.errorImage
		}
		else if(message.data === 'running')
		{
			global_vue.defaultImage = global_vue.normalImage
		}
	})
}

var global_vue = null;

$(function () {	
	var app = new Vue({
		el: '#app',
		data: {
			//任务开启按钮状态变化
			startUp : "连接状态",
			defaultImage : 'url(../static/images/default.png)',
			normalImage : 'url(../static/images/normal.png)',
			errorImage : 'url(../static/images/error.png)',
			defaultColor : 'black',
			interruptColor : 'yellow',
			normalColor : 'green',
			errorColor : 'red',
			
			//货架状态
			agv_ints : [],
			station_shelves : [],
			
			//正在执行任务状态
			shelf_id : -1,
			task_type : 'unknown',
			materiarls_strings : [],
			layers_ints : [],
			
			//等待执行任务状态
			alls : [],
			//任务管理程序状态
			data_data : 'paused',
			
			
		},
		methods: {
			start () {
				waypoint_user_pub()
			},
		},
	});
	
	global_vue = app;
	
	timeout_shelves();
	executing_tasks();
	pending_tasks();
	task_manager_status();
})

