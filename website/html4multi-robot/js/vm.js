var Vm = Vm || {
	task: {
			el: '#tasks',
			data: {
			    tasks: [],
			    isVisible: false,
			    workTypeMap: {
			        '0': '空闲',
			        '1': '空载导航',
			        '2': '满载导航',
			        '3': '装货',
			        '4': '卸货'
			    },
			    workStatusMap: {
			        '0': '完成',
			        '1': '执行',
			        '2': '等待'
			    },
			    icon: './image/unfold.png'
			},
			methods: {
			    workType: function(workType){
			        var type = `${workType}`;
			        return this.workTypeMap[type];
			    },

			    workStatus: function(workStatus){
			        var type = `${workStatus}`;
			        return this.workStatusMap[type];
			    },

			    dispTasks: function(){
			    	this.isVisible = !this.isVisible;
			    	if (this.isVisible)
			    	{
			    		this.icon = './image/fold.png';
			    	}
			    	else
			    	{
			    		this.icon = './image/unfold.png';
			    	}
			    },

			    status: function(status){
			    	var style = {};
			    	switch (status)
			    	{
			    		case 0:
			    			// style.background = '#EFEBE9';
			    			break;
			    		case 1:
			    			style.background = '#E8EAF6';
			    			break;
			    		case 2:
			    			break;
			    		default:
			    			break;
			    	}
			    	return style;
			    }
			}
    	}, // task,

    addRobot: {
    	el: '#add-robot-app',
    	data: {
    		robotID: '',
    		robotIP: '',
    		robots: [],
    		evtEmitter: window.evtEmitter
    	},
    	methods: {
    		robotName: function(id){
    			return id || 'Default'
    		},

    		addRobot: function(){
    			if (!this.robotIP)
    			{
    				var ip = 'server';
    			}
    			else
    			{
    				if (!this.checkIP(this.robotIP))
	    			{
	    				console.log('[ERROR]Invalid ip');
	    				return;
	    			}
	    			var ip = 'ws://' + this.robotIP + ':9090';
    			}
    			var robotInfo = {
    				robotID: this.robotID,
    				robotIP: ip
    			};
    			if (!this.isAdded(robotInfo))
    			{
    				this.robots.push(robotInfo);
    			}
    		},

    		submit: function(){
    			window.evtEmitter.emit('addRobot', this.robots);
    		},

    		checkIP: function(ipStr){
			    ipStr = ipStr.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/g);
			    if (ipStr == null) 
			    {
			        return false;
			    } 
			    else if (RegExp.$1 > 255 || RegExp.$2 > 255 || RegExp.$3 > 255 || RegExp.$4 > 255) 
			    {
			        return false;
			    } 
			    else 
			    {
			        return true;
			    }
    		},

    		isAdded: function(robotInfo){
    			for (var i = 0; i < this.robots.length; i++)
    			{
    				var id = this.robots[i].robotID;
    				var ip = this.robots[i].robotIP;
    				if (id === robotInfo.robotID && ip === robotInfo.robotIP)
    				{
    					return true;
    				}
    			}
    			return false;
    		}
    	}
    }
};