'use strict';

let rosnodejs = require('../rosnodejslib/index.js');
let paramServer = require('../lib/init').paramServer;

let fs = require('fs');
let gm = require('gm').subClass({imageMagick: true});

// map edit param
const MAP_EDIT = '/home/hitrobot/workspaces/hitrobot/dbparam/map_edit.pgm';
const OBSTACLE_COLOR = '#000';
const CLEAR_COLOR = '#fff';
const OBSTACLE_SIZE = 2;
const CLEAR_SIZE = 5;
// mapping status
const MAPPING_STATUS = {
	Navigation: "navigation",
    Gmapping: "gmapping",
    GamppingPose: "gmapping_pose",
    SaveMap: "save_map",
    SaveMapEdit: "save_map_edit",
    SaveAsMap: "save_as_map",
    SaveAsMapEdit: "save_as_map_edit",
    LoadMap: "load_map",
    LoadMapEdit: "load_map_edit"
}

class RosNodeJs
{
	constructor(){
		(async () =>{
			let nh = await rosnodejs.initNode('rosnodejs', {
					onTheFly: true	
				});
			this.std_msgs = rosnodejs.require('std_msgs').msg;
			this.mapEditImg = null;

			this.cmdStringPub = nh.advertise('/cmd_string', 'std_msgs/String', {
				queueSize: 1,
				latching: true,
				throttleMs: -1
			});

			this.mapSub = nh.subscribe('/map', 'nav_msgs/OccupancyGrid', this.mapSubCb());
			this.mapEditObstacleSub = nh.subscribe('/map_edit_obstacle', 'geometry_msgs/Polygon', this.mapEditObstacleSubCb(), {
				queueSize: 1000
			});
			this.mapEditDoneSub = nh.subscribe('/cmd_string', 'std_msgs/String', this.mapEditDoneSubCb(), {
				queueSize: 1000
			});
			// gmapping status
			this.mappingStatusPub = nh.advertise('/rosnodejs/mappingStatus', 'std_msgs/String', {
				queueSize: 10,
				latching: true,
				throttleMs: -1
			});
			this.rosModeSub = nh.subscribe('/ros_mode', 'std_msgs/String', this.mappingStatusCb());
			this.shellFeedbackSub = nh.subscribe('/shell_feedback', 'std_msgs/String', this.mappingStatusCb());
		})();
	}

	mapSubCb(msg){
		return (msg) => {
			rosnodejs.log.info('Got map_edit info');
			this.mapOrgin = {
				x: msg.info.origin.position.x,
				y: msg.info.origin.position.y,
			}
			this.mapWidth = msg.info.width;
			this.mapHeight = msg.info.height;
			this.mapResolution = msg.info.resolution;
			// read map
			this.mapEditImg = gm(MAP_EDIT).fill("none");
		};
	}

	mapEditObstacleSubCb(msg){
		return (msg) => {
			var msgMap = this.mapToPx(msg);
			if (msgMap.points.length === 0)
			{
				rosnodejs.log.warn('Got empty map_edit obstacle msg');
				return;
			}
			if (!this.mapEditImg)
			{
				rosnodejs.log.error('Read map_edit failed');
				return;
			}
			if (msgMap.points[0].z < 0)
			{
				this.mapEditImg.stroke("#fff", CLEAR_SIZE);
			}
			else
			{
				this.mapEditImg.stroke("#000", OBSTACLE_SIZE);
			}
			// circle
			if (msgMap.points.length === 1 && msgMap.points[0].z > 0)
			{
				var radius = msgMap.points[0].z;
				var center = msgMap.points[0];
				this.mapEditImg.drawCircle(center.x, center.y, center.x+radius, center.y);
			}
			// rectangle
			else if (msgMap.points.length === 4)
			{
				for (var i = 0; i < msgMap.points.length - 1; i++)
				{
					var start = msgMap.points[i];
					var end = msgMap.points[i+1];
					this.mapEditImg.drawLine(start.x, start.y, end.x, end.y);
				}
				start = end;
				end = msgMap.points[0];
				this.mapEditImg.drawLine(start.x, start.y, end.x, end.y);
			}
			// points
			else
			{
				for (var i = 0; i < msgMap.points.length - 1; i++)
				{
					var start = msgMap.points[i];
					var end = msgMap.points[i+1];
					this.mapEditImg.drawLine(start.x, start.y, end.x, end.y);
				}
			}

		};
	}

	mapEditDoneSubCb(msg){
		return (msg) => {
			if (msg.data === 'map_edit_done')
			{
				// write to pgm
				this.mapEditImg.write(MAP_EDIT, (err) => {
					if (err)
					{
						rosnodejs.log.error('pgm writting error');
						console.log(err);
					}
					else
					{
						rosnodejs.log.info('map_edit saved');
						// switch to navigation
						var navigationMsg = new this.std_msgs.String();
						navigationMsg.data = 'navigation';
						this.cmdStringPub.publish(navigationMsg);
					}
				});
			}
		};
	}

	mappingStatusCb(msg){
		return (msg) => {
			if (this.isMappingStatus(msg.data))
			{
				this.mappingStatusPub.publish(msg);
				rosnodejs.log.info(`Mapping status: ${msg.data}`);
			}
		}
	}

	isMappingStatus(status){
		var flag = false;
		for (var key in MAPPING_STATUS)
		{
			if (MAPPING_STATUS[key] === status)
			{
				flag = true;
				break;
			}
		}
		return flag;
	}

	mapToPx(msg){
		var msgMap = {
			points: []
		}
		for (var i = 0; i < msg.points.length; i++)
		{
			var point = {
				x: (msg.points[i].x - this.mapOrgin.x) / this.mapResolution,
				y: this.mapHeight - (msg.points[i].y - this.mapOrgin.y) / this.mapResolution,
				z: msg.points[i].z / this.mapResolution
			}
			msgMap.points.push(point);
		}
		return msgMap;
	}
}

module.exports = {
	initROS: () => {
		new RosNodeJs();
	}
};