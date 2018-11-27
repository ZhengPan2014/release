# history:

| version         | date            | author          | remark
| --------------- | --------------- | --------------- | ---------------
| 1.2.0.1_alpha   | 2018-09-01      | ouiyeah         | restructure git

***

# protocol

rosbridge provides a JSON interface to ROS, allowing any client to send JSON to publish or subscribe to ROS topics, call ROS services, and more. rosbridge supports a variety of transport layers, including WebSockets and TCP. For information on the protocol itself, see the [rosbridge protocol specification](https://github.com/RobotWebTools/rosbridge_suite/blob/develop/ROSBRIDGE_PROTOCOL.md).

## common functions

### 0.0 Custom publish string

```json
{ "op": "publish",
  "topic": "/cmd_string",
  "msg": <string>
}
```

```json
msg <string>
shutdown      : shutdown the remote system                    //关机
reboot        : reboot the remote system                      //重启
cancel        : cancel and stop any moving operation          //取消运动
gmapping      : switch to the mode of mapping                 //建图模式
navigation    : switch to the mode of navigation              //导航模式
save_map      : save map for localization                     //保存定位地图
save_as_map   : import map for localization                   //导入定位地图
save_map_edit : save map for navigation                       //保存导航地图
save_as_map_edit : import map for navigation                  //导入导航地图
version       : get version                                   //获取软件版本信息
null          : empty command                                 //指令为空
```

### 4.2 Custom subscribe string

```json
{ "op": "subscribe",
  "topic": "/ros_mode",
}
```

```json
callback <string>
gmapping      : in the mode of mapping                        //建图模式
navigation    : in the mode of navigation                     //导航模式
busy          : in the mode switching status                  //系统模式切换中
```

### get robot pose

```json
{ "op": "subscribe",
  "topic": "/robot_pose",
  "type": "geometry_msgs/Pose",
}
```

```json
callback <geometry_msgs/Pose>
{ "positon": { "x": <float64>, "y": <float64>, "z": <float64> },
  "orientation": { "x": <float64>, "y": <float64>, "z": <float64>, "w": <float64> }
}
```

### set robot pose

```json
{ "op": "advertise",
  "topic": "/initialpose",
  "type": "geometry_msgs/PoseWithCovarianceStamped",
}
```

```json
{ "op": "publish",
  "topic": "/initialpose",
  "msg": <geometry_msgs/PoseWithCovarianceStamped>,
}
```

```json
msg <geometry_msgs/PoseWithCovarianceStamped>
{ "header": { "frame_id": "/map" },
  "pose": { "pose": 
    { "positon": { "x": <float64>, "y": <float64>, "z": <float64> },
      "orientation": { "x": <float64>, "y": <float64>, "z": <float64>, "w": <float64> }
    }
  }
}
```

#### 4.3.3 Set Robot Goal

```json
{ "op": "advertise",
  "topic": "/move_base/goal",
  "type": "move_base_msgs/MoveBaseActionGoal",
}
```

```json
{ "op": "publish",
  "topic": "/move_base/goal",
  "msg": <move_base_msgs/MoveBaseActionGoal>,
}
```

```json
msg <move_base_msgs/MoveBaseActionGoal>
{ "header": <std_msgs/Header>,
  "goal_id": <actionlib_msgs/GoalID>,
  "goal": {"target_pose": <geometry_msgs/PoseStamped>}
}
```


#### 4.3.4 Get Robot Map

```json
{ "op": "subscribe",
  "topic": "/map",
  "type": "nav_msgs/OccupancyGrid",
}
```

```json
callback <nav_msgs/OccupancyGrid>
{ "header": { "seq": <uint32>, "stamp": { "sec": <int>, "nsec": <int> }, "frame_id": <string> },
  "info": { "map_load_time": { "sec": <int>, "nsec": <int> }, "resolution": <float32>, "width": <uint32>, "height": <uint32>, "origin": <geometry_msgs/Pose> },
  "data": [ <uint8> ]
}
```

#### 4.3.5 Set Robot Map

```json
{ "op": "advertise",
  "topic": "/map",
  "type": "nav_msgs/OccupancyGrid",
}
```

```json
{ "op": "publish",
  "topic": "/move_base/goal",
  "msg": <nav_msgs/OccupancyGrid>,
}
```

#### 4.3.6 Set Robot Velocity

```json
{ "op": "advertise",
  "topic": "/cmd_vel",
  "type": "geometry_msgs/Twist",
}
```

```json
{ "op": "publish",
  "topic": "geometry_msgs/Twist",
  "msg": <geometry_msgs/Twist>,
}
```

```json
<geometry_msgs/Twist>
{ "linear": { "x": <float64>, "y": <float64>, "z": <float64> },
  "angular": { "x": <float64>, "y": <float64>, "z": <float64> },
}
```

#### 4.3.7 Get Diagnostics

```json
{ "op": "subscribe",
  "topic": "/diagnostics_agg",
  "type": "diagnostic_msgs/DiagnosticArray",
}
```

```json
callback <diagnostic_msgs/DiagnosticArray>
definition as listed
```

### 4.4 JavaScript examples

#### 4.4.1 JavaScript citations

```js
//JS引用
easeljs.min.js
eventemitter2.min.js
roslib.min.js
ros2d.min.js
nav2d.min.js
//共5个JS文件来支持导航接口的调用
```

#### 4.4.2 Open websocket

```js
//连接websocket
var ros = new ROSLIB.Ros({
            url: 'ws://192.168.0.7:9090'
          });
```

#### 4.4.3 Create canvas viewer

```js
//创建导航地图画板
var viewer = new ROS2D.Viewer({
                divID: 'nav',
                width: 800,
                height: 800
             });
```

#### 4.4.4 Set nav client

```js
//设置导航客户端
var nav = NAV2D.OccupancyGridClientNav({
            ros: ros,
            rootObject: viewer.scene,
            continuous: true, //连续更新导航地图
            withOrientation: true, //设置导航操作是否带有方向性
            viewer: viewer,
            serverName: '/move_base'
          });
```

#### 4.4.5 Custom string

```js
//自定义命令
var cmd_string = new ROSLIB.Topic({
                   ros : ros,
                   name : '/system_shell/cmd_string',
                   messageType : 'std_msgs/String'
                 });

var string = new ROSLIB.Message({
               data : '[custom_string]' //data命令类型
             });

cmd_string.publish(string); 
```

```js
//自定义反馈
var system_mode = new ROSLIB.Topic({
                    ros : ros,
                    name : '/system_shell/system_mode',
                    messageType : 'std_msgs/String'
                  });

system_mode.subscribe( //订阅命令
  function(string) { //回调函数
    //TODO string.data //data反馈类型
  }
)
```

#### 4.4.6 Custom pose

```js
var goalPos = stage.globalToRos(event.stageX, event.stageY);
var goalPosVec3 = new ROSLIB.Vector3(goalPos);
/*如果要带方向，需要计算方向四元素：
        xDelta =  goalPosVec3.x - positionVec3.x;
        yDelta =  goalPosVec3.y - positionVec3.y;
        thetaRadians  = Math.atan2(xDelta,yDelta);
        if (thetaRadians >= 0 && thetaRadians <= Math.PI) {
          thetaRadians += (3 * Math.PI / 2);
        } else {
          thetaRadians -= (Math.PI/2);
        }
        var qz =  Math.sin(-thetaRadians/2.0);
        var qw =  Math.cos(-thetaRadians/2.0);
        var orientation = new ROSLIB.Quaternion({x:0, y:0, z:qz, w:qw});
*/
//如果要带方向（withOrientation=true）
var pose = new ROSLIB.Pose({
  position :    positionVec3,
  orientation : orientation
});
//如果不带方向（withOrientation=false）
var pose = new ROSLIB.Pose({
  position : goalPosVec3
});
```

```js
// create a goal//发送目标位置
var goal = new ROSLIB.Goal({
  actionClient : actionClient,
  goalMessage : {
    target_pose : {
      header : {
        frame_id : '/map'
      },
      pose : pose
    }
  }
});
goal.send();
goal.on('result', function(result) {
  //TODO 到目标点或不能到达后执行
});
goal.on('status', function(status) {
  //TODO 查询导航当前状态
});
```

```js
状态表：
uint8 status
uint8 PENDING         = 0   # The goal has yet to be processed by the action server
uint8 ACTIVE          = 1   # The goal is currently being processed by the action server
uint8 PREEMPTED       = 2   # The goal received a cancel request after it started executing
                            #   and has since completed its execution (Terminal State)
uint8 SUCCEEDED       = 3   # The goal was achieved successfully by the action server (Terminal State)
uint8 ABORTED         = 4   # The goal was aborted during execution by the action server due
                            #    to some failure (Terminal State)
uint8 REJECTED        = 5   # The goal was rejected by the action server without being processed,
                            #    because the goal was unattainable or invalid (Terminal State)
uint8 PREEMPTING      = 6   # The goal received a cancel request after it started executing
                            #    and has not yet completed execution
uint8 RECALLING       = 7   # The goal received a cancel request before it started executing,
                            #    but the action server has not yet confirmed that the goal is canceled
uint8 RECALLED        = 8   # The goal received a cancel request before it started executing
                            #    and was successfully cancelled (Terminal State)
uint8 LOST            = 9   # An action client can determine that a goal is LOST. This should not be
                            #    sent over the wire by an action server
```

```js
// create a pose//发送位置估计
var initialpose = new ROSLIB.Topic({
  ros : ros,
  name : '/initialpose',
  messageType : 'geometry_msgs/PoseWithCovarianceStamped'
});
var pose_estimate = new ROSLIB.Message({
  header : {
    frame_id : '/map'
  },
  pose : {
    pose : pose
  }
});
initialpose.publish(pose_estimate);
```

```js
//获取机器人当前位置
// setup a listener for the robot pose
var poseListener = new ROSLIB.Topic({
  ros : ros,
  name : '/robot_pose',
  messageType : 'geometry_msgs/Pose',
  throttle_rate : 100
});
poseListener.subscribe(function(pose) {
  // 得到x/y坐标
  // pose.position.x;
  // -pose.position.y;
  // 得到四元素方向
  // pose.orientation
}
