'use strict';

var sch = sch || {
	ns: 'undefined',
	serverIP: 'localhost',
	scheduling: null
};

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
		this.ros = this._initROS();
		this._subWorkstations();
		this._getAGVs();
		this._getTaskIDs();
		this.taskClient = new ROSLIB.Service({
			ros: this.ros,
			name: this._withNs('/add_or_modify_forklift_task'),
			serviceType: 'scheduling_msgs/AddOrModifyForkliftTask'
		});
	}

	addTask(taskID, loadingStation, unloadingStation)
	{
		if (this.taskIDs.indexOf(taskID) === -1)
		{
			console.error(`task [${taskID}] does not exist.`);
			return;
		}
		var req = this._taskSrvMsg(taskID, loadingStation, unloadingStation);
		this._callTaskSrv(req);
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
			console.log(`Connected to ${this.serverIP}`);
			$('#connection-info').text(`[Connection] Connected to server: [${this.serverIP}]`);
			this.isConnected = true;
		});
		ros.on('close', () => {
			console.warn(`${this.serverIP} closed`);
			$('#connection-info').text(`[Connection] Server: [${this.serverIP}] closed`);
			this.isConnected = false;
		});
		ros.on('error', () => {
			console.error(`${this.serverIP} error`);
			$('#connection-info').text(`[Connection] Server: [${this.serverIP}] error`);
			this.isConnected = false;
		});
		return ros;
	}

	_subWorkstations(wType)
	{
		var wType = wType || 'tail';
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
			this._updateUI('#loading-station', this.workstations);
			this._updateUI('#unloading-station', this.workstations);
		});
	}

	_updateUI(el, data)
	{
		$(el).children().remove();
		var els = '';
		for (var d of data)
		{
			els += `<option value="${d}">${d}</option>`;
		}
		$(el).append(els);
	}

	// TODO:
	_getAGVs()
	{
		this.agvs = ['AllocatedByServer'];
		this._updateUI('', this.agvs);
	}

	// TODO:
	_getTaskIDs()
	{
		this.taskIDs = [-1];
		this._updateUI('#task-id', this.taskIDs);
	}

	_taskSrvMsg(taskID, loadingStation, unloadingStation)
	{
		return new ROSLIB.ServiceRequest({
			task_id: taskID,
			loading_station: loadingStation,
			unloading_station: unloadingStation
		});
	}

	_callTaskSrv(request)
	{
		this.taskClient.callSerice(request, (response) => {
			console.log(`--${request.task_id}\n\x20\x20${request.loading_station}\n\x20\x20${request.unloading_station}`);
			console.log(`--Feedback: [response.feedback]`);
			$('#task-eedback').text(`[Task]Task feedback: [${response.feedback}]`);
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
		var taskID = $('#task-id').val();
		var loadingStation = $('#loading-station').val();
		var unloadingStation = $('#unloading-station').val();
		sch.scheduling.addTask(taskID, loadingStation, unloadingStation);
	});
});