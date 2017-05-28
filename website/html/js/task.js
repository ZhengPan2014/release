var Task = Task || {
    dumpedTasks: [],

    taskCtrlStatusCb: function(msg){
        console.log(msg);
        // 1: running
    },

    addTrajsToTaskSelect: function(trajs){
        $('#task_trajectory').empty();
        var trajsHtml = '';
        for (var i = 0; i < trajs.length; i++)
        {
            var traj = trajs[i];
            trajsHtml += `<option value="${traj.name}">${traj.name}</option>`;
        }
        $('#task_trajectory').append(trajsHtml);
    },

    addTask: function(task){
        var taskAddTopic = NavEvent.Topic(NavEvent.TopicEnum.taskAdd);
        var taskMsg = new ROSLIB.Message({
            name: task.name,
            address: task.address,
            trajectory: task.trajectory,
            enable_expect: task.enable_expect,
            disable_expect: task.disable_expect,
            priority: task.priority
        });
        taskAddTopic.publish(taskMsg);
        console.log(`Task ${task.name} added.`);
    },

    delTask: function(taskName){
        var taskRemoveTopic = NavEvent.Topic(NavEvent.TopicEnum.taskRemove);
        var taskMsg = isInDumpedTasks(taskName);
        taskRemoveTopic.publish(taskMsg);
        console.log(`Task ${taskMsg.name} deleted.`);
    },

    ctrlTask: function(cmds){
        var cmd = cmds.cmd;
        var goalName = cmds.goalName;
        if (cmd == 'run')
        {
            cmd = 1;
        }
        else if (cmd == 'stop')
        {
            cmd = 0;
        }
        else
        {
            console.log(`Unknown cmd ${cmd}.`)
            return;
        }
        var taskCtrlTopic = NavEvent.Topic(NavEvent.TopicEnum.taskCtrl);
        var taskCtrlMsg = new ROSLIB.Message({
            goal_name: goalName,
            control: cmd
        });
        taskCtrlTopic.publish(taskCtrlMsg);
    },

    dumpedTasksCb: function(msg){
        console.log('dumped tasks:')
        console.log(msg)
        $('#task-list').empty();
        var dumpedTasks = msg.tasks;
        var dumpedTasksHtml = '';
        Task.dumpedTasks = [];
        for (var i = 0; i < dumpedTasks.length; i++)
        {
            var task = dumpedTasks[i];
            var divId = 'div' + task.name;
            var delId = 'del' + task.name;
            dumpedTasksHtml += `<div class='ui-grid-a', id='div-${task.name}'>
                                    <div class='ui-block-a'>
                                        <a style='padding:0.1em; margin-left: 0;' data-icon='' 
                                        class='btn btn1' id='btn-taskname-${task.name}' onclick='showTaskDetail(this)'>${task.name}</a>
                                    </div>
                                    <div class='ui-block-b'>
                                        <a style='padding:0.1em; margin-left: 0;' data-icon='' 
                                        class='btn btn1' onclick='delTask(this)' id='del-btn-${task.name}'>删除</a>
                                    </div>
                                </div>`;
            Task.dumpedTasks.push(task);
        }
        $('#task-list').append(dumpedTasksHtml);
        $('.btn').button();
    },

    tasksQueueCb: function(msg){
        console.log('tasks queue:');
        console.log(msg);
        $('#tasks-queue-list').empty();
        var tasksQueue = msg.tasks;
        var tasksQueueHtml = `<div data-role="controlgroup" data-type="horizontal">`
        for (var i = 0; i < tasksQueue.length; i++)
        {
            var task = tasksQueue[i];
            tasksQueueHtml += `<a href="#" data-role="button" id="task-queue-${task.name}">${task.name}</a>`;
        }
        tasksQueueHtml += `</div>`;
        $('#tasks-queue-list').append(tasksQueueHtml);
        $('.btn').button();
    }
}

$(function () {
    // pause task
    $('#pause_task').click(function(){
        var cmds = {
            cmd: 'stop',
            goalName: ''
        };
        Task.ctrlTask(cmds);
    });
    // restart task
    $('#resume_task').click(function(){
        var cmds = {
            cmd: 'run',
            goalName: ''
        };
        Task.ctrlTask(cmds);
    });
    // cancel task
    $('#cancel_pause').click(function(){
        var cmds = {
            cmd: 'stop',
            goalName: 'current'
        };
        Task.ctrlTask(cmds);
    })
    // clear task queue
    $('#clear_queue').click(function(){
        var cmds = {
            cmd: 'stop',
            goalName: 'all'
        };
        Task.ctrlTask(cmds);
    })
    // add task
    $('#btn-add-task').click(function(){
        var task = {};
        task.name = $('#task_name')[0].value;
        if (checkStr(task.name))
        {
            if (isInDumpedTasks(task.name))
            {
                sweetAlert("任务名称已存在", "", "error");
                return;
            }
        }
        else
        {
            sweetAlert("字符不合法", "", "error");
            return;
        }
        task.address = parseInt($('#task_address')[0].value);
        if (checkStr(task.address))
        {
            if (isAddressValid(task.address))
            {
                sweetAlert("任务地址已存在", "", "error");
                return;
            }
        }
        else
        {
            sweetAlert("字符不合法", "", "error");
            return;
        }
        task.trajectory = $('#task_trajectory').val() || '';
        var enable_operator = $('#task_enable_operator').val();
        var enable_condition = $('#task_enable_condition')[0].value;
        if (enable_operator == 'true' || enable_operator == 'false')
        {
            task.enable_expect = enable_operator;
        }
        else
        {
            // !!! need a SPACE between operator and condition
            if (enable_condition == '')
            {
                sweetAlert("任务执行条件不能为空", "", "error");
                return;
            }
            task.enable_expect = enable_operator + ' ' + enable_condition;     
        }

        var disable_operator = $('#task_disable_operator').val();
        var disable_condition = $('#task_disable_condition')[0].value;
        if (disable_operator == 'true' || disable_operator == 'false')
        {
            task.disable_expect = disable_operator;
        }
        else
        {
            // !!! need a SPACE between operator and condition
            if (disable_condition == '')
            {
                sweetAlert("任务取消条件不能为空", "", "error");
                return;
            }
            task.disable_expect = disable_operator + ' ' + disable_condition;     
        }

        task.priority = parseInt($('#task_priority').val());
        Task.addTask(task);
        $.mobile.changePage("#hrg-task-manager-page", { transition: "slide" });
    })
})

function delTask(dom)
{
    var delBtnId = $(dom).attr('id');
    var taskName = delBtnId.split('-')[2];
    Task.delTask(taskName);
}

function executeTask()
{
    // TODO:
}

function showTaskDetail(dom)
{
    $('#tasks-detail-list').empty();
    var delBtnId = $(dom).attr('id');
    var taskName = delBtnId.split('-')[2];
    var task = isInDumpedTasks(taskName);
    var taskDetailHtml = '';
    for (var key in task)
    {
        if (task.hasOwnProperty(key) && key != 'header')
        {
            taskDetailHtml += `<li>${key}: ${task[key]}</li>`;
        }
    }
    $('#tasks-detail-list').append(taskDetailHtml);
    $.mobile.changePage("#hrg-task-detail-page", { transition: "slide" });
}

// check if task already in dumped tasks
// return the task msg if so, otherwise return false
function isInDumpedTasks(taskName)
{
    for (var i = 0; i < Task.dumpedTasks.length; i++)
    {
        var task = Task.dumpedTasks[i];
        if (task.name == taskName)
        {
            return task;
        }
    }
    return false;
}

function isAddressValid(address)
{
    for (var i = 0; i < Task.dumpedTasks.length; i++)
    {
        var task = Task.dumpedTasks[i];
        if (address == task.address)
        {
            return task;
        }
    }
    return false;
}

function checkStr(str) {
    var myReg = /^[^@\/\'\\\"\‘\’#$%&\^\*]+$/;
    return myReg.test(str);
}