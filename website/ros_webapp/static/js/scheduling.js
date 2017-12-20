'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sch = sch || {
	ns: 'undefined',
	serverIP: 'localhost',
	scheduling: null,
	taskStatusMap: ['空闲', '等待执行', '前往叉货工位', '开始叉货', '叉货完成', '等待前往卸货工位', '前往卸货工位', '开始卸货', '卸货完成', '返回', '完成']
};

var SchInfo = function () {
	function SchInfo() {
		_classCallCheck(this, SchInfo);

		this._connectionInfoEl = $('#connection-infon');
		this._taskInfoEl = $('#task-info');
		this._taskFeedbackEl = $('#task-feedback');
	}

	_createClass(SchInfo, [{
		key: 'reset',
		value: function reset() {
			this._connectionInfoEl.text('');
			this._taskInfoEl.text('');
			this._taskFeedbackEl.text('');
		}

		/**
   * @param  {string} info CONNECTED/ERROR/CLOSED
   * @param  {string} ip 	 Server ip
   */

	}, {
		key: 'connectionInfo',
		value: function connectionInfo(info, ip) {
			switch (info) {
				case 'CONNECTED':
					this._connectionInfoEl.text('[\u8FDE\u63A5\u72B6\u6001] \u5DF2\u8FDE\u63A5\u81F3\u670D\u52A1\u5668: [' + ip + ']');
					break;
				case 'ERROR':
					this._connectionInfoEl.text('[\u8FDE\u63A5\u72B6\u6001] \u8FDE\u63A5\u9519\u8BEF: [' + ip + ']');
					break;
				case 'CLOSED':
					this._connectionInfoEl.text('[\u8FDE\u63A5\u72B6\u6001] \u670D\u52A1\u5668\u5DF2\u5173\u95ED\u8FDE\u63A5: [' + ip + ']');
					break;
				default:
					break;
			}
		}
	}]);

	return SchInfo;
}();

/***********************************************/

var Scheduling = function () {
	function Scheduling(serverIP, ns) {
		_classCallCheck(this, Scheduling);

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

	_createClass(Scheduling, [{
		key: 'addTask',
		value: function addTask(taskID, loadingStation, unloadingStation) {
			if (this.taskIDs.indexOf(taskID) === -1) {
				console.error('task [' + taskID + '] does not exist.');
				return;
			}
			var req = this._taskAddSrvMsg(taskID, loadingStation, unloadingStation);
			this._callTaskAddSrv(req);
		}
	}, {
		key: 'cancelTask',
		value: function cancelTask(taskID, loadingStation, unloadingStation) {
			var req = this._taskCancelSrvMsg(taskID);
			this._callTaskCancelSrv(req, loadingStation, unloadingStation);
		}
	}, {
		key: '_initROS',
		value: function _initROS() {
			var _this = this;

			if (!this.serverIP.startsWith('ws://')) {
				this.serverIP = 'ws://' + this.serverIP;
			}
			if (!this.serverIP.endsWith(':9090')) {
				this.serverIP += ':9090';
			}
			var ros = new ROSLIB.Ros();
			ros.connect(this.serverIP);
			ros.on('connection', function () {
				$('#connection-info').text('[\u8FDE\u63A5\u72B6\u6001] \u5DF2\u8FDE\u63A5\u81F3\u670D\u52A1\u5668: [' + _this.serverIP + ']');
				_this.isConnected = true;
			});
			ros.on('close', function () {
				$('#connection-info').text('[\u8FDE\u63A5\u72B6\u6001] \u670D\u52A1\u5668\u5DF2\u5173\u95ED\u8FDE\u63A5: [' + _this.serverIP + ']');
				_this.isConnected = false;
			});
			ros.on('error', function () {
				$('#connection-info').text('[\u8FDE\u63A5\u72B6\u6001] \u8FDE\u63A5\u9519\u8BEF: [' + _this.serverIP + ']');
				_this.isConnected = false;
			});
			return ros;
		}
	}, {
		key: '_subWorkstations',
		value: function _subWorkstations(wType) {
			var _this2 = this;

			var wType = wType || 'workstation';
			var topic = new ROSLIB.Topic({
				ros: this.ros,
				name: this._withNs('/waypoints'),
				messageType: 'yocs_msgs/WaypointList'
			});
			topic.subscribe(function (waypoints) {
				console.log('Got ' + waypoints.waypoints.length + ' waypoints');
				_this2.workstations = [];
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = waypoints.waypoints[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var waypoint = _step.value;

						var type;
						try {
							var info = JSON.parse(waypoint.header.frame_id);
							type = info.type;
						} catch (e) {
							console.error('Invalid waypoints. Make sure you use the waypoint which contains a JSON obejct in header.frame_id.');
							continue;
						}
						if (type === wType) {
							_this2.workstations.push(waypoint.name);
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				console.log('Got ' + _this2.workstations.length + ' workstations');
				_this2._updateUI(_this2._loadingStationEl, _this2.workstations);
				_this2._updateUI(_this2._unloadingStationEl, _this2.workstations);
			});
		}

		// TODO:

	}, {
		key: '_getAGVs',
		value: function _getAGVs() {
			this.agvs = ['AllocatedByServer'];
			// this._updateUI(el, this.agvs);
		}

		// TODO:

	}, {
		key: '_getTaskIDs',
		value: function _getTaskIDs() {
			this.taskIDs = [-1];
			this._updateUI(this._taskIDEl, this.taskIDs);
		}
	}, {
		key: '_subExecutingTasks',
		value: function _subExecutingTasks() {
			var _this3 = this;

			var topic = new ROSLIB.Topic({
				ros: this.ros,
				name: this._withNs('/executing_task_list'),
				messageType: 'scheduling_msgs/TaskList2'
			});
			topic.subscribe(function (tasks) {
				_this3._updateExecutingTasksUI(tasks.status);
			});
		}
	}, {
		key: '_subPendingTasks',
		value: function _subPendingTasks() {
			var _this4 = this;

			var topic = new ROSLIB.Topic({
				ros: this.ros,
				name: this._withNs('/pending_task_list'),
				messageType: 'scheduling_msgs/TaskList2'
			});
			topic.subscribe(function (tasks) {
				_this4._updatePendingTasksUI(tasks.status);
			});
		}
	}, {
		key: '_subAGVInfoList',
		value: function _subAGVInfoList() {
			var _this5 = this;

			var topic = new ROSLIB.Topic({
				ros: this.ros,
				name: this._withNs('/all_agvs_info'),
				messageType: 'scheduling_msgs/AgvList'
			});
			topic.subscribe(function (agvList) {
				_this5._updateAGVListUI(agvList.agvList);
			});
		}
	}, {
		key: '_resetUI',
		value: function _resetUI() {
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

	}, {
		key: '_updateUI',
		value: function _updateUI(el, data) {
			el.children().remove();
			var els = '<option value=""></option>';
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var d = _step2.value;

					els += '<option value="' + d + '">' + d + '</option>';
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			el.append(els);
		}
	}, {
		key: '_updateExecutingTasksUI',
		value: function _updateExecutingTasksUI(tasks) {
			var _this6 = this;

			$('.executing-task').remove();
			var els = '';
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = tasks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var task = _step3.value;

					els += '<p class="executing-task">';
					els += '<button class="executing-task-btn" id="executing-task#' + task.task_id + '#' + task.loading_station + '#' + task.unloading_station + '">X</button>';
					els += '[\u4EFB\u52A1\u4FE1\u606F] \u4EFB\u52A1ID: ' + task.task_id + '; AGV ID: ' + task.agv_id + '; \u4E0A\u6599\u70B9: ' + task.loading_station + '; \u4E0B\u6599\u70B9: ' + task.unloading_station + '; ';
					var status = task.status < 0 ? '任务出错' : sch.taskStatusMap[task.status];
					els += '\u72B6\u6001: ' + status;
					els += '</p>';
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			this._executingTasksEl.append(els);

			$('.executing-task-btn').on('click', function (el) {
				var info = _this6._getTaskInfoFromElID($(el.currentTarget).attr('id'));
				sch.scheduling.cancelTask(parseInt(info.taskID), info.loadingStation, info.unloadingStation);
			});
		}
	}, {
		key: '_updatePendingTasksUI',
		value: function _updatePendingTasksUI(tasks) {
			var _this7 = this;

			$('.pending-task').remove();
			var els = '';
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = tasks[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var task = _step4.value;

					// els += `<button class="pending-task-btn" id="pending-task#${task.task_id}#${task.loading_station}#${task.unloading_station}">X</button>`;
					els += '<p class="pending-task" id="pending-task-' + task.agv_id + '">';
					els += '<button class="pending-task-btn" id="pending-task#' + task.task_id + '#' + task.loading_station + '#' + task.unloading_station + '">X</button>';
					els += '[\u4EFB\u52A1\u4FE1\u606F] \u4EFB\u52A1ID: ' + task.task_id + '; AGV ID: ' + task.agv_id + '; \u4E0A\u6599\u70B9: ' + task.loading_station + '; \u4E0B\u6599\u70B9: ' + task.unloading_station + '; ';
					els += '</p>';
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}

			this._pendingTasksEl.append(els);

			$('.pending-task-btn').on('click', function (el) {
				var info = _this7._getTaskInfoFromElID($(el.currentTarget).attr('id'));
				sch.scheduling.cancelTask(parseInt(info.taskID), info.loadingStation, info.unloadingStation);
			});
		}
	}, {
		key: '_updateAGVListUI',
		value: function _updateAGVListUI(agvList) {
			$('.agv-info').remove();
			this.bootedAGVNum = 0;
			var bootedListEls = '';
			var unbootedListEls = '';
			var _iteratorNormalCompletion5 = true;
			var _didIteratorError5 = false;
			var _iteratorError5 = undefined;

			try {
				for (var _iterator5 = agvList[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
					var agv = _step5.value;

					var agvName = agv.agvName.startsWith('/') ? agv.agvName.slice(1) : agv.agvName;
					if (agv.isAgvBoot) {
						this.bootedAGVNum++;
						var workingStatus = agv.isWorking ? '忙碌' : '空闲';
						var stationInfo = agv.isWorking ? '\u5DE5\u4F5C\u7AD9\u70B9: ' + agv.working_station_name : '\u6240\u5728\u7AD9\u70B9: ' + agv.working_station_name;
						bootedListEls += '<p class="agv-info">';
						bootedListEls += '[\u53C9\u8F66\u4FE1\u606F] \u53C9\u8F66ID: ' + agv.agvID + '; \u540D\u79F0: ' + agvName + '; \u5DF2\u5F00\u673A; ';
						bootedListEls += '\u5DE5\u4F5C\u72B6\u6001: ' + workingStatus + '; ' + stationInfo;
						bootedListEls += '</p>';
					} else {
						bootedListEls += '<p class="agv-info">';
						bootedListEls += '[\u53C9\u8F66\u4FE1\u606F] \u53C9\u8F66ID: ' + agv.agvID + '; \u540D\u79F0: ' + agvName + '; \u672A\u5F00\u673A; ';
						bootedListEls += '</p>';
					}
				}
			} catch (err) {
				_didIteratorError5 = true;
				_iteratorError5 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion5 && _iterator5.return) {
						_iterator5.return();
					}
				} finally {
					if (_didIteratorError5) {
						throw _iteratorError5;
					}
				}
			}

			if (this.bootedAGVNum < 1) {
				this._taskInfoEl.text('[叉车状态] 所有叉车均为开机');
				this._taskFeedbackEl.text('');
			}
			this._agvInfoListEl.append(bootedListEls);
			this._agvInfoListEl.append(unbootedListEls);
		}
	}, {
		key: '_getTaskInfoFromElID',
		value: function _getTaskInfoFromElID(idStr) {
			var info = idStr.split('#');
			return {
				taskID: info[1],
				loadingStation: info[2],
				unloadingStation: info[3]
			};
		}
	}, {
		key: '_taskAddSrvMsg',
		value: function _taskAddSrvMsg(taskID, loadingStation, unloadingStation) {
			return new ROSLIB.ServiceRequest({
				task_id: taskID,
				loading_station: loadingStation,
				unloading_station: unloadingStation
			});
		}
	}, {
		key: '_taskCancelSrvMsg',
		value: function _taskCancelSrvMsg(taskID) {
			return new ROSLIB.ServiceRequest({
				id: taskID
			});
		}
	}, {
		key: '_callTaskAddSrv',
		value: function _callTaskAddSrv(request) {
			$('#task-info').text('[\u4EFB\u52A1\u6DFB\u52A0] \u6B63\u5728\u6DFB\u52A0\u4EFB\u52A1 ID: ' + request.task_id + '; \u4E0A\u6599\u70B9: ' + request.loading_station + '; \u4E0B\u6599\u70B9: ' + request.unloading_station);
			this.taskAddClient.callService(request, function (response) {
				$('#task-info').text('[\u4EFB\u52A1\u6DFB\u52A0] \u4EFB\u52A1ID: ' + request.task_id + '; \u4E0A\u6599\u70B9: ' + request.loading_station + '; \u4E0B\u6599\u70B9: ' + request.unloading_station);
				var info = '[任务状态] ';
				switch (response.feedback) {
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
	}, {
		key: '_callTaskCancelSrv',
		value: function _callTaskCancelSrv(request, loadingStation, unloadingStation) {
			$('#task-info').text('[\u4EFB\u52A1\u53D6\u6D88] \u6B63\u5728\u53D6\u6D88\u4EFB\u52A1 ID: ' + request.id + '; \u4E0A\u6599\u70B9: ' + loadingStation + '; \u4E0B\u6599\u70B9: ' + unloadingStation);
			this.taskCancelClient.callService(request, function (response) {
				$('#task-info').text('[\u4EFB\u52A1\u53D6\u6D88] \u4EFB\u52A1ID: ' + request.id + '; \u4E0A\u6599\u70B9: ' + loadingStation + '; \u4E0B\u6599\u70B9: ' + unloadingStation);
				var info = '[任务状态] ';
				switch (response.feedback) {
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
						info += '任务取消成功';
						break;
				}
				$('#task-feedback').text(info);
			});
		}
	}, {
		key: '_withNs',
		value: function _withNs(name) {
			var name = name.startsWith('/') ? name : '/' + name;
			if (this.ns === 'undefined') {
				return name;
			}
			return this.ns.startsWith('/') ? this.ns + name : '/' + this.ns + name;
		}
	}]);

	return Scheduling;
}();

/******************************************************************/

function getNamespace() {
	var url = "http://" + sch.serverIP + ":8808/api/namespace";
	$.ajax({
		type: 'get',
		url: url,
		async: false,
		success: function success(data) {
			sch.namespace = data.namespace;
			console.log('ROS namespace: ' + data.namespace);
		},
		dataType: 'json'
	});
}

function showSidedrawer(sidedrawerEl) {
	return function () {
		var options = {
			onclose: function onclose() {
				sidedrawerEl.removeClass('active').appendTo(document.body);
			}
		};
		var overlayEl = $(mui.overlay('on', options));
		sidedrawerEl.appendTo(overlayEl);
		setTimeout(function () {
			sidedrawerEl.addClass('active');
		}, 20);
	};
}

function hideSidedrawer(bodyEl) {
	return function () {
		bodyEl.toggleClass('hide-sidedrawer');
	};
}

// main
$(function () {
	var bodyEl = $('body');
	var sidedrawerEl = $('#sidedrawer');
	var titleEls = $('strong', sidedrawerEl);
	$('.js-show-sidedrawer').on('click', showSidedrawer(sidedrawerEl));
	$('.js-hide-sidedrawer').on('click', hideSidedrawer(bodyEl));
	titleEls.next().hide();
	titleEls.on('click', function () {
		$(this).next().slideToggle(200);
	});

	$('#connect-ros').on('click', function () {
		var ip = $('#server-ip')[0].value.trim();
		sch.serverIP = ip;
		sch.scheduling = new Scheduling(sch.serverIP, sch.ns);
	});

	$('#add-task').on('click', function () {
		if (!sch.scheduling) {
			console.log('Server not connected.');
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
		if (!loadingStation || !unloadingStation) {
			$('#task-info').text('[\u4EFB\u52A1\u6DFB\u52A0] \u4E0A\u6599\u70B9\u548C\u4E0B\u6599\u70B9\u5747\u4E0D\u80FD\u4E3A\u7A7A');
			return;
		}
		sch.scheduling.addTask(-1, loadingStation, unloadingStation);
	});
});