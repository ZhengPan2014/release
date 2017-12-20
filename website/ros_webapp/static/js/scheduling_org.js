'use strict';

var sch = sch || {
	ns: 'undefined',
	serverIP: 'localhost',
	scheduling: null,
	taskStatusMap: ['空闲', '等待执行', '前往叉货工位', '开始叉货', '叉货完成', '等待前往卸货工位', 
					'前往卸货工位', '开始卸货', '卸货完成', '返回', '完成']
};

class SchInfo
{
	constructor()
	{
		this._connectionInfoEl = $('#connection-infon');
		this._taskInfoEl = $('#task-info');
		this._taskFeedbackEl = $('#task-feedback');
	}

	reset()
	{
		this._connectionInfoEl.text('');
		this._taskInfoEl.text('');
		this._taskFeedbackEl.text('');
	}

	/**
	 * @param  {string} info CONNECTED/ERROR/CLOSED
	 * @param  {string} ip 	 Server ip
	 */
	connectionInfo(info, ip)
	{
		switch(info)
		{
			case 'CONNECTED':
				this._connectionInfoEl.text(`[连接状态] 已连接至服务器: [${ip}]`);
				break;
			case 'ERROR':
				this._connectionInfoEl.text(`[连接状态] 连接错误: [${ip}]`);
				break;
			case 'CLOSED':
				this._connectionInfoEl.text(`[连接状态] 服务器已关闭连接: [${ip}]`);
				break;
			default:
				break;
		}
	}
}

/***********************************************/

class Scheduling
{
	constructor(serverIP, ns)
	{
		this.serverIP = serverIP;
		this.ns = ns;
		this.workstations = [];
		this.taskIDs = [-1];
		this.isConnected = false;
		this.bootedAGVNum = 0;
		// HTML elements
		this._taskIDEl = $('#task-id');
		this._loadingStationEl = $('#loading-station');
		this._unloadingStationEl = $('#unloading-station');
		this._executingTasksEl = $('#executing-tasks');
		this._pendingTasksEl = $('#pending-tasks');
		this._agvInfoListEl = $('#agv-info-list');

		this._resetUI();
		this.ros = this._initROS();
		this._subWorkstations();
		this._subExecutingTasks();
		this._subPendingTasks();
		this._subAGVInfoList();
		this._getAGVs();
		this._getTaskIDs();
		this.taskAddClient = new ROSLIB.Service({
			ros: this.ros,
			name: this._withNs('/add_or_modify_forklift_task'),
			serviceType: 'scheduling_msgs/AddOrModifyForkliftTask'
		});
		this.taskCancelClient = new ROSLIB.Service({
			ros: this.ros,
			name: this._withNs('/cancel_specified_task'),
			serviceType: 'scheduling_msgs/CancelTask'
		});
	}

	addTask(taskID, loadingStation, unloadingStation)
	{
		if (this.taskIDs.indexOf(taskID) === -1)
		{
			console.error(`task [${taskID}] does not exist.`);
			return;
		}
		var req = this._taskAddSrvMsg(taskID, loadingStation, unloadingStation);
		this._callTaskAddSrv(req);
	}

	cancelTask(taskID, loadingStation, unloadingStation)
	{
		var req = this._taskCancelSrvMsg(taskID);
		this._callTaskCancelSrv(req, loadingStation, unloadingStation);
	}

	_initROS()
	{
		if (!this.serverIP.startsWith('ws://'))
		{
			this.serverIP = 'ws://' + this.serverIP;
		}
		if (!this.serverIP.endsWith(':9090'))
		{
			this.serverIP += ':9090';
		}
		var ros = new ROSLIB.Ros();
		ros.connect(this.serverIP);
		ros.on('connection', () => {
			$('#connection-info').text(`[连接状态] 已连接至服务器: [${this.serverIP}]`);
			this.isConnected = true;
		});
		ros.on('close', () => {
			$('#connection-info').text(`[连接状态] 服务器已关闭连接: [${this.serverIP}]`);
			this.isConnected = false;
		});
		ros.on('error', () => {
			$('#connection-info').text(`[连接状态] 连接错误: [${this.serverIP}]`);
			this.isConnected = false;
		});
		return ros;
	}

	_subWorkstations(wType)
	{
		var wType = wType || 'workstation';
		var topic = new ROSLIB.Topic({
			ros: this.ros,
			name: this._withNs('/waypoints'),
			messageType: 'yocs_msgs/WaypointList'
		});
		topic.subscribe((waypoints) => {
			console.log(`Got ${waypoints.waypoints.length} waypoints`);
			this.workstations = [];
			for(var waypoint of waypoints.waypoints)
			{
				var type;
				try
				{
					var info = JSON.parse(waypoint.header.frame_id);
					type = info.type;
				}
				catch(e)
				{
					console.error(
						'Invalid waypoints. Make sure you use the waypoint which contains a JSON obejct in header.frame_id.');
					continue;
				}
				if (type === wType)
				{
					this.workstations.push(waypoint.name);
				}
			}
			console.log(`Got ${this.workstations.length} workstations`);
			this._updateUI(this._loadingStationEl, this.workstations);
			this._updateUI(this._unloadingStationEl, this.workstations);
		});
	}

	// TODO:
	_getAGVs()
	{
		this.agvs = ['AllocatedByServer'];
		// this._updateUI(el, this.agvs);
	}

	// TODO:
	_getTaskIDs()
	{
		this.taskIDs = [-1];
		this._updateUI(this._taskIDEl, this.taskIDs);
	}

	_subExecutingTasks()
	{
		var topic = new ROSLIB.Topic({
			ros: this.ros,
			name: this._withNs('/executing_task_list'),
			messageType: 'scheduling_msgs/TaskList2',
		});
		topic.subscribe((tasks) => {
			this._updateExecutingTasksUI(tasks.status);
		});
	}

	_subPendingTasks()
	{
		var topic = new ROSLIB.Topic({
			ros: this.ros,
			name: this._withNs('/pending_task_list'),
			messageType: 'scheduling_msgs/TaskList2',
		});
		topic.subscribe((tasks) => {
			this._updatePendingTasksUI(tasks.status);
		});
	}

	_subAGVInfoList()
	{
		var topic = new ROSLIB.Topic({
			ros: this.ros,
			name: this._withNs('/all_agvs_info'),
			messageType: 'scheduling_msgs/AgvList'
		});
		topic.subscribe((agvList) => {
			this._updateAGVListUI(agvList.agvList);
		});
	}

	_resetUI()
	{
		$('#connection-info').text('');
		$('#task-info').text('');
		$('#task-feedback').text('');
		$('.executing-task').remove();
		$('.pending-task').remove();
		$('.agv-info').remove();
		this._loadingStationEl.children().remove();
		this._unloadingStationEl.children().remove();
		this._taskIDEl.children().remove();
	}

	/**
	 * update task id, loading station, unloading station options UI
	 * @param  {object} el   
	 * @param  {list} data
	 */
	_updateUI(el, data)
	{
		el.children().remove();
		var els = '<option value=""></option>';
		for (var d of data)
		{
			els += `<option value="${d}">${d}</option>`;
		}
		el.append(els);
	}

	_updateExecutingTasksUI(tasks)
	{
		$('.executing-task').remove();
		var els = '';
		for (var task of tasks)
		{
			els += `<p class="executing-task">`;
			els += `<button class="executing-task-btn" id="executing-task#${task.task_id}#${task.loading_station}#${task.unloading_station}">X</button>`;
			els += `[任务信息] 任务ID: ${task.task_id}; AGV ID: ${task.agv_id}; 上料点: ${task.loading_station}; 下料点: ${task.unloading_station}; `;
			var status = task.status < 0 ? '任务出错' : sch.taskStatusMap[task.status];
			els += `状态: ${status}`;
			els += '</p>';
		}
		this._executingTasksEl.append(els);
		
		$('.executing-task-btn').on('click', (el) => {
			var info = this._getTaskInfoFromElID($(el.currentTarget).attr('id'));
			sch.scheduling.cancelTask(parseInt(info.taskID), info.loadingStation, info.unloadingStation);
		});
	}

	_updatePendingTasksUI(tasks)
	{
		$('.pending-task').remove();
		var els = '';
		for (var task of tasks)
		{
			// els += `<button class="pending-task-btn" id="pending-task#${task.task_id}#${task.loading_station}#${task.unloading_station}">X</button>`;
			els += `<p class="pending-task" id="pending-task-${task.agv_id}">`;
			els += `<button class="pending-task-btn" id="pending-task#${task.task_id}#${task.loading_station}#${task.unloading_station}">X</button>`;
			els += `[任务信息] 任务ID: ${task.task_id}; AGV ID: ${task.agv_id}; 上料点: ${task.loading_station}; 下料点: ${task.unloading_station}; `;
			els += '</p>';
		}
		this._pendingTasksEl.append(els);

		$('.pending-task-btn').on('click', (el) => {
			var info = this._getTaskInfoFromElID($(el.currentTarget).attr('id'));
			sch.scheduling.cancelTask(parseInt(info.taskID), info.loadingStation, info.unloadingStation);
		});
	}

	_updateAGVListUI(agvList)
	{
		$('.agv-info').remove();
		this.bootedAGVNum = 0;
		var bootedListEls = '';
		var unbootedListEls = '';
		for (var agv of agvList)
		{	
			var agvName = agv.agvName.startsWith('/') ? agv.agvName.slice(1) : agv.agvName;
			if (agv.isAgvBoot)
			{
				this.bootedAGVNum++;
				var workingStatus = agv.isWorking ? '忙碌' : '空闲';
				var stationInfo = agv.isWorking ? `工作站点: ${agv.working_station_name}` : `所在站点: ${agv.working_station_name}`; 
				bootedListEls += `<p class="agv-info">`;
				bootedListEls += `[叉车信息] 叉车ID: ${agv.agvID}; 名称: ${agvName}; 已开机; `;
				bootedListEls += `工作状态: ${workingStatus}; ${stationInfo}`;
				bootedListEls += '</p>'
			}
			else
			{
				bootedListEls += `<p class="agv-info">`;
				bootedListEls += `[叉车信息] 叉车ID: ${agv.agvID}; 名称: ${agvName}; 未开机; `;
				bootedListEls += '</p>'
			}
		}
		if (this.bootedAGVNum < 1)
		{
			this._taskInfoEl.text('[叉车状态] 所有叉车均为开机');
			this._taskFeedbackEl.text('');
		}
		this._agvInfoListEl.append(bootedListEls);
		this._agvInfoListEl.append(unbootedListEls)
	}

	_getTaskInfoFromElID(idStr)
	{
		var info = idStr.split('#');
		return {
			taskID: info[1],
			loadingStation: info[2],
			unloadingStation: info[3]
		};
	}

	_taskAddSrvMsg(taskID, loadingStation, unloadingStation)
	{
		return new ROSLIB.ServiceRequest({
			task_id: taskID,
			loading_station: loadingStation,
			unloading_station: unloadingStation
		});
	}

	_taskCancelSrvMsg(taskID)
	{
		return new ROSLIB.ServiceRequest({
			id: taskID
		});
	}

	_callTaskAddSrv(request)
	{
		$('#task-info').text(
			`[任务添加] 正在添加任务 ID: ${request.task_id}; 上料点: ${request.loading_station}; 下料点: ${request.unloading_station}`);
		this.taskAddClient.callService(request, (response) => {
			$('#task-info').text(
				`[任务添加] 任务ID: ${request.task_id}; 上料点: ${request.loading_station}; 下料点: ${request.unloading_station}`);
			var info = '[任务状态] ';
			switch(response.feedback)
			{
				case -1:
					info += '无效的站点名称';
					break;
				case -2:
					info += '无效的动作';
					break;
				case -3:
					info += '任务列表已满';
					break;
				case -4:
					info += '已存在相同的任务';
					break;
				case -5:
					info += '任务ID不存在';
					break;
				case -6:
					info += '该任务已完成';
					break;
				case -7:
					info += '该任务无法调整';
					break;
				default:
					info += '任务添加/调整成功';
					break;
			}
			$('#task-feedback').text(info);
		});
	}

	_callTaskCancelSrv(request, loadingStation, unloadingStation)
	{
		$('#task-info').text(
			`[任务取消] 正在取消任务 ID: ${request.id}; 上料点: ${loadingStation}; 下料点: ${unloadingStation}`);
		this.taskCancelClient.callService(request, (response) => {
			$('#task-info').text(
				`[任务取消] 任务ID: ${request.id}; 上料点: ${loadingStation}; 下料点: ${unloadingStation}`);
			var info = '[任务状态] ';
			switch(response.feedback)
			{
				case -1:
					info += '该AGV不在列表中';
					break;
				case -2:
					info += '该AGV无任务';
					break;
				case -3:
					info += '该任务无法被取消';
					break;
				default:
					info += '任务取消成功'
					break;
			}
			$('#task-feedback').text(info);
		});
	}

	_withNs(name)
	{
		var name = name.startsWith('/') ? name : '/'+name;
		if (this.ns === 'undefined')
		{
			return name;
		}
		return this.ns.startsWith('/') ? this.ns+name : '/'+this.ns+name;
	}
}

/******************************************************************/

function getNamespace()
{
    var url = "http://" + sch.serverIP + ":8808/api/namespace";
    $.ajax({
        type: 'get',
        url: url,
        async: false,
        success: (data) => {
            sch.namespace = data.namespace;
            console.log(`ROS namespace: ${data.namespace}`);
        },
        dataType: 'json'
    });
}


function showSidedrawer(sidedrawerEl)
{
	return () => {
		var options = {
			onclose: () => {
				sidedrawerEl.removeClass('active').appendTo(document.body);
			}
		};
		var overlayEl = $(mui.overlay('on', options));
		sidedrawerEl.appendTo(overlayEl);
		setTimeout(() => {
			sidedrawerEl.addClass('active');
		}, 20);
	}
}

function hideSidedrawer(bodyEl)
{
	return () => {
		bodyEl.toggleClass('hide-sidedrawer');
	}
}

// main
$(()=>{
	var bodyEl = $('body');
	var	sidedrawerEl = $('#sidedrawer');
	var titleEls = $('strong', sidedrawerEl);
	$('.js-show-sidedrawer').on('click', showSidedrawer(sidedrawerEl));
  	$('.js-hide-sidedrawer').on('click', hideSidedrawer(bodyEl));
  	titleEls.next().hide();
	titleEls.on('click', function() {
		$(this).next().slideToggle(200);
	});

	$('#connect-ros').on('click', () => {
		var ip = $('#server-ip')[0].value.trim();
		sch.serverIP = ip;
		sch.scheduling = new Scheduling(sch.serverIP, sch.ns);
	});

	$('#add-task').on('click', () => {
		if (!sch.scheduling)
		{
			console.log(`Server not connected.`);
			return;
		}
		// var taskID = parseInt($('#task-id').val());
		var loadingStation = $('#loading-station').val();
		var unloadingStation = $('#unloading-station').val();
		// if (taskID === 'NaN')
		// {	
		// 	$('#task-info').text(`[任务添加] 任务ID不能为空`);
		// 	return;
		// }
		if (!loadingStation || !unloadingStation)
		{
			$('#task-info').text(`[任务添加] 上料点和下料点均不能为空`);
			return;
		}
		sch.scheduling.addTask(-1, loadingStation, unloadingStation);
	});
});