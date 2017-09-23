'use strict';

class Task extends EventEmitter2
{
	// params:
	// 	1. ROSLIB.Ros ros
	//	2. Vue tasksVm: Vue instance for tasks
	//	3. string robotId: '' by default
	constructor(ros, tasksVm, robotId)
	{
		super();
		this.ros = ros;
		this.tasksVm = tasksVm;
		this.robotId = robotId || '';
		this.tasks = null; 
	}

	// params:
	// 	1. options:
	// 		string name: tasks name, 'AllTasks' by default
	// 		string messageType: tasks msg, 'scheduling_msgs/TaskList' by default
	subTasks(options)
	{
		var options = options || {};
		var name = options.name || '/AllTasks';
		var messageType = options.messageType || 'scheduling_msgs/TaskList';
		var tasksTopic = this.topic(name, messageType);
		tasksTopic.subscribe(this.tasksCb());
	}

	// private:
	// params: 
	// 	1. string name: topic name;
	// 	2. string messageType;
	// return: ROSLIB.Topic
	topic(name, messageType)
	{
		return new ROSLIB.Topic({
			ros: this.ros,
			name: this.robotId + name,
			messageType: messageType
		});
	}

	tasksCb()
	{
		return (tasks) => {
			console.log(`[INFO]Received ${tasks.tasks.length} tasks.`);
			this.tasks = tasks.tasks;
			this.tasksVm.tasks = this.tasks;
		}
	}
}