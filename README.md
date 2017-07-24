# history

| 版本            | 日期            | 发布人          | 更新内容
| --------------- | --------------- | --------------- | --------------- 
| 1.1.4.6_alpha   | 2017-07-24      | 张邺            | 改进scan_marker和waypoints_navi功能；实现自动充电
| 1.1.4.5_beta    | 2017-07-21      | 韩立芹          | 增加hrg3参数；修改网络、路点；增加音频功能
| 1.1.4.5_alpha   | 2017-07-20      | 张邺            | 改进path/lock/log机制
| 1.1.4.4_beta    | 2017-07-19      | 张邺            | 改进source和path机制
| 1.1.4.4_alpha   | 2017-07-17      | 张邺            | 增加comm.sh网络自适应脚本；移动bash脚本结构
| 1.1.4.3_beta    | 2017-07-14      | 仇隽挺          | 调整叉车导航参数
| 1.1.4.3_alpha   | 2017-07-12      | 仇隽挺          | 并入forklift的launch文件
| 1.1.4.2_beta    | 2017-07-10      | 韩立芹          | 增加base_calibration节点；hrg的voxel改为obstacle
| 1.1.4.2_alpha   | 2017-07-04      | 潘力澜          | 增加laser_sensor_pose_calibration和static_laser_relocalization节点；
| 1.1.4.1_beta    | 2017-06-28      | 秦伟明          | 改进hostname相关环境变量；新增odom的timestamp重置机制
| 1.1.4.1_alpha   | 2017-06-27      | 孙昆明          | 改进路点界面；新增上位机测试版本
| 1.1.4.0_beta    | 2017-06-26      | 韩立芹          | 改进ster2参数测试通过
| 1.1.4.0_alpha   | 2017-06-23      | 张邺            | 新增系统自检功能的初步架构
| 1.1.3.21_beta   | 2017-05-30      | 张邺            | 新增绕行选择功能
| 1.1.3.20_beta   | 2017-05-28      | 张邺            | 新增上位机任务管理功能；新增scan_marker二次定位功能
| 1.1.3.19_alpha  | 2017-03-26      | 张邺            | 改进上位机页面逻辑功能；改进scan_rectifier滤奇点功能
| 1.1.3.18_beta   | 2017-03-22      | 张邺            | 增加hrg/exhibt2/ster2型号；改进速度控制效果；改进上位机界面
| 1.1.3.17_beta   | 2017-02-24      | 张邺            | 增加comm-ttys.sh修复usb预配置问题
| 1.1.3.16_alpha  | 2017-02-23      | 张邺            | 增加waypoint的LOOP；增加comm-reset
| 1.1.3.15_alpha  | 2017-02-15      | 张邺            | 增加will2ssh；修复dbparam问题
| 1.1.3.14_alpha  | 2017-01-20      | 张邺            | 调试侧向雷达
| 1.1.3.13_beta   | 2017-01-17      | 陆亚辉          | 增加node_module以及gruntjs功能
| 1.1.3.12_beta   | 2017-01-16      | 张邺            | 增加工作空间dbparam功能
| 1.1.3.11_beta   | 2017-01-12      | 张邺            | 增加waypoints_navi包的依赖项
| 1.1.3.10_beta   | 2017-01-05      | 张邺            | 更新ros_node建图问题；增加imu_drift_check功能
| 1.1.3.9_beta    | 2017-01-03      | 张邺            | 更新威尔2并发保存地图问题
| 1.1.3.8_alpha   | 2016-12-29      | 张邺            | 同步各个文档；加入ar_tool包；加入yujin_ocs
| 1.1.3.7_alpha   | 2016-12-27      | 陆亚辉          | 更新rosbridge_stm32wangke的旋转问题
| 1.1.3.6_alpha   | 2016-12-26      | 张邺            | 改进imu跳变机制；更新will2半自动设置
| 1.1.3.5_alpha   | 2016-12-16      | 张邺            | 暂时修复dwa_planner开机原地旋转footprint初始化的问题
| 1.1.3.4_beta    | 2016-12-15      | 张邺            | 优化rosbridge_driver资源占用率；增加imu_hop_check防跳变机制
| 1.1.3.3_beta    | 2016-12-14      | 张邺            | 删除stm32_driver/aqmd_driver冗余代码；修改imu_reverse问题
| 1.1.3.2_beta    | 2016-12-13      | 张邺            | 更新整理了html代码；完善了与威尔2的代码兼容性和自动更新问题
| 1.1.3.1_alpha   | 2016-11-14      | 张邺            | 修改了map/waypoint的git方式；修复了rosbridge_drver的spinOnce问题
| 1.1.3.0_alpha   | 2016-11-03      | 张邺            | 重新更新了系统架构；加入http和tcp服务器
| 1.1.2.0_beta    | 2016-09-14      | 韩立芹          | 修复了开机位置有可能丢失问题；增加自动更新功能
| 1.1.1.5_beta    | 2016-08-29      | 仇隽挺          | 恢复到了原来膨胀层的版本，修改了gmapping_pose
| 1.1.1.4_beta    | 2016-08-11      | 韩立芹          | 修改move_base中的recovery_behaviour；修改imu的timeout问题
| 1.1.1.3_beta    | 2016-06-23      | 仇隽挺          | 修改gmapping_pose，更改robot_pose_ekf位置
| 1.1.1.2_beta    | 2016-06-17      | 张邺            | 增加imu设备的相关功能；开机时不启动手柄；增大xy_tolerance参数
| 1.1.1.1_beta    | 2016-05-27      | 张邺            | 修改reboot的权限问题
| 1.1.1.0_beta    | 2016-05-23      | 韩立芹          | 改进了windows调试，串口权限，开机timeout，ip恢复默认，取消速度滤除
| 1.1.0.1_alpha   | 2016-05-05      | 张邺            | 改进了clear_costmaps/map/version/

***

# protocol

hitrobot Websocket/Tcp Protocol Specification

This document outlines the hitrobot websocket/tcp protocol. The hitrobot protocol
incorporates a number of requirements which have arisen since the second version
of rosbridge was released, and makes a small number of modifications to
facilitate greater extensibility to the protocol.

The message transport of hitrobot is JSON objects. The only required field is
the 'op' field, which specifies the operation of that message. Each 'op' then
specifies its own message semantics.

The hitrobot protocol is a set of 'op' codes which define a number of
operations, along with the semantics for each operation.

The hitrobot server is a server which accepts websockets connections and
implements the hitrobot protocol.

## 1. The hitrobot transport

A hitrobot message is, in the base case, a JSON object with a string field
called "op". For example:

```json
{ "op": "Example" }
```

The op field indicates the type of message that this is. Messages with
different values for op may be handled differently.

So long as the message is a JSON object with the op field, it is a valid
hitrobot message.

Optionally, a message can also provide an arbitrary string or integer ID:

```json
{ "op": "Example",
  "id":"fred"
}
```

If an ID is provided with a message to the server, then related response
messages will typically contain that ID as well. Log messages caused by this
operation will also contain the ID.

Semantically, the ID is not an identifier of the specific message that it is
in, but instead is an identifier for an interaction which may consist of a
number of operations in back-and-forth messages. Thus, the ID may be used by
multiple messages referring to the same transaction.

## 2. The hitrobot protocol

The hitrobot protocol defines a number of different operations. They are as follows:

Message compression / transformation:

  * **fragment** - a part of a fragmented message
  * **png** - a part of a PNG compressed fragmented message

hitrobot status messages:

  * **set_status_level** - a request to set the reporting level for hitrobot status messages
  * **status** - a status message

Authentication:
  * **auth** - a set of authentication credentials to authenticate a client connection

ROS operations:

  * **advertise** – advertise that you are publishing a topic
  * **unadvertise** – stop advertising that you are publishing topic publish - a published ROS-message
  * **subscribe** - a request to subscribe to a topic
  * **unsubscribe** - a request to unsubscribe from a topic
  * **call_service** - a service call
  * **advertise_service** - advertise an external service server
  * **unadvertise_service** - unadvertise an external service server
  * **service_request** - a service request
  * **service_response** - a service response

In general, actions or operations that the client takes (such as publishing and
subscribing) have opcodes which are verbs (subscribe, call_service, unadvertise
etc.).

Response messages from the server are things that the client is giving back, so
they are nouns (fragment, status, service_response etc.)

(The only slight exception to this naming convention is publish)

## 3. Details of the hitrobot protocol

Following is the specification of operations in the hitrobot protocol,
supported by the hitrobot server. Anything marked with [experimental] may be
subject to change after review.

### 3.1 Data Encoding and Transformation

The hitrobot protocol provides the ability to fragment messages and to compress messages.

#### 3.1.1 Fragmentation ( _fragment_ ) [experimental]

Messages may be fragmented if they are particularly large, or if the client
requests fragmentation. A fragmented message has the following format:

```json
{ "op": "fragment",
  "id": <string>,
  "data": <string>,
  "num": <int>,
  "total": <int>
}
```

**id** - an id is required for fragmented messages, in order to identify
corresponding fragments for the fragmented message:

 * **data** - a fragment of data that, when combined with other fragments of data, makes up another message
 * **num** - the index of the fragment in the message
 * **total** - the total number of fragments

To fragment a message, its JSON string is taken and split up into multiple
substrings. For each substring, a fragment message is constructed, with the
data field of the fragment populated by the substring.

To reconstruct an original message, the data fields of the fragments are
concatenated, resulting in the JSON string of the original message.

#### 3.1.2 PNG compression ( _png_ ) [experimental]

Some messages (such as point clouds) can be extremely large, and for efficiency
reasons we may wish to transfer them as PNG-encoded bytes. The PNG opcode
duplicates the fragmentation logic of the FRG opcode (and it is possible and
reasonable to only have a single fragment), except that the data field consists
of ASCII-encoded PNG bytes.

```json
{ "op": "png",
  (optional) "id": <string>,
  "data": <string>,
  (optional) "num": <int>,
  (optional) "total": <int>
}
```

 * **id** – only required if the message is fragmented. Identifies the
    fragments for the fragmented message.
 * **data** – a fragment of a PNG-encoded message or an entire message.
 * **num** – only required if the message is fragmented. The index of the fragment.
 * **total** – only required if the message is fragmented. The total number of fragments.

To construct a PNG compressed message, take the JSON string of the original
message and read the bytes of the string into a PNG image. Then, ASCII-encode
the image. This string is now used as the data field. If fragmentation is
necessary, then fragment the data and set the ID, num and total fields to the
appropriate values in the fragments. Otherwise these fields can be left out.

### 3.2 Status messages

hitrobot sends status messages to the client relating to the successes and
failures of hitrobot protocol commands. There are four status levels: info,
warning, error, none. By default, hitrobot uses a status level of error.

A rough guide for what causes the levels of status message:

 * **error** – Whenever a user sends a message that is invalid or requests
    something that does not exist (ie. Sending an incorrect opcode or publishing
    to a topic that doesn't exist)
 * **warning** – error, plus, whenever a user does something that may succeed
    but the user has still done something incorrectly (ie. Providing a
    partially-complete published message)
 * **info** – warning, plus messages indicating success of various operations

#### 3.2.1 Set Status Level ( _status_level_ ) [experimental]

```json
{ "op": "set_level",
  (optional) "id": <string>,
  "level": <string>
}
```

 * **level** – one of 'info', 'warning', 'error', or 'none'

Sets the status level to the level specified. If a bad string is specified, the
message is dropped.

#### 3.2.2 Status message ( _status_ ) [experimental]

```json
{ "op": "status",
  (optional) "id": <string>,
  "level": <string>,
  "msg": <string>
}
```

 * **level** – the level of this status message
 * **msg** – the string message being logged
 * **id** – if the status message was the result of some operation that had an
    id, then that id is included

### 3.3 Authentication message

Optional authentication information can be passed via the hitrobot protocol
to authenticate a client connection. This information should come from some
trusted third-party authenticator. 

Authentication is based on the MAC (message authentication code) scheme. The
key to using MAC is that it does not tie users to a single "user database."
It simply requires some trusted third-party to provide the hash-keys.

#### 3.3.1 Authenticate ( _auth_ )

To send authentication credentials, use the auth command.

```json
{ "op": "auth", 
  "mac": <string>, 
  "client": <string>, 
  "dest": <string>, 
  "rand": <string>, 
  "t": <int>, 
  "level": <string>, 
  "end": <int>
}
```

 * **mac** – MAC (hashed) string given by the client
 * **client** – IP of the client
 * **dest** – IP of the destination
 * **rand** – random string given by the client
 * **t** – time of the authorization request
 * **level** – user level as a string given by the client
 * **end** – end time of the client's session

   * Any server that enabled authentication should wait for
     this request to come in first before accepting any other 
     `op` code from the client.
   * Once the request comes in, it would verify the information 
     (in a ROS system, using `rosauth`; however, the verification
     method is not tied to ROS). 
   * If the authentication is good, the connection would be kept
     and hitrobot would function as normal. If the authentication
     is bad, the connection would be severed. 
   * In the case that authentication is not enabled on the server, 
     this `op` code can be ignored.

### 3.4 ROS messages

These hitrobot messages interact with ROS, and correspond roughly to the
messages that already exist in the current version of hitrobot.

#### 3.4.1 Advertise ( _advertise_ )

If you wish to advertise that you are or will be publishing a topic, then use
the advertise command.

```json
{ "op": "advertise",
  (optional) "id": <string>,
  "topic": <string>,
  "type": <string>
}
```

 * **topic** – the string name of the topic to advertise
 * **type** – the string type to advertise for the topic

   * If the topic does not already exist, and the type specified is a valid
     type, then the topic will be established with this type.
   * If the topic already exists with a different type, an error status message
     is sent and this message is dropped.
   * If the topic already exists with the same type, the sender of this message
     is registered as another publisher.
   * If the topic doesnt already exist but the type cannot be resolved, then an
     error status message is sent and this message is dropped.

#### 3.4.2 Unadvertise ( _unadvertise_ )

This stops advertising that you are publishing a topic.

```json
{ "op": "unadvertise",
  (optional) "id": <string>,
  "topic": <string>
}
```
￼
 * **topic** – the string name of the topic being unadvertised

   * If the topic does not exist, a warning status message is sent and this
     message is dropped
   * If the topic exists and there are still clients left advertising it,
     hitrobot will continue to advertise it until all of them have unadvertised
   * If the topic exists but hitrobot is not advertising it, a warning status
     message is sent and this message is dropped

#### 3.4.3 Publish ( _publish_ )

The publish message is used to send data on a topic.

```json
{ "op": "publish",
  (optional) "id": <string>,
  "topic": <string>,
  "msg": <json>
}
```

The publish command publishes a message on a topic.

 * **topic** - the string name of the topic to publish to
 * **msg** - the message to publish on the topic

   * If the topic does not exist, then an error status message is sent and this
     message is dropped
   * If the msg does not conform to the type of the topic, then an error status
     message is sent and this message is dropped
   * If the msg is a subset of the type of the topic, then a warning status
     message is sent and the unspecified fields are filled in with defaults

Special case: if the type being published has a 'header' field, then the client
can optionally omit the header from the msg. If this happens, hitrobot will
automatically populate the header with a frame id of "" and the timestamp as
the current time. Alternatively, just the timestamp field can be omitted, and
then the current time will be automatically inserted.

#### 3.4.4 Subscribe

```json
{ "op": "subscribe",
  (optional) "id": <string>,
  "topic": <string>,
  (optional) "type": <string>,
  (optional) "throttle_rate": <int>,
  (optional) "queue_length": <int>,
  (optional) "fragment_size": <int>,
  (optional) "compression": <string>
}
```

This command subscribes the client to the specified topic. It is recommended
that if the client has multiple components subscribing to the same topic, that
each component makes its own subscription request providing an ID. That way,
each can individually unsubscribe and hitrobot can select the correct rate at
which to send messages.

 * **type** – the (expected) type of the topic to subscribe to. If left off,
    type will be inferred, and if the topic doesn't exist then the command to
    subscribe will fail
 * **topic** – the name of the topic to subscribe to
 * **throttle_rate** – the minimum amount of time (in ms) that must elapse
    between messages being sent. Defaults to 0
 * **queue_length** – the size of the queue to buffer messages. Messages are
    buffered as a result of the throttle_rate. Defaults to 1.
 * **id** – if specified, then this specific subscription can be unsubscribed
    by referencing the ID.
 * **fragment_size** – the maximum size that a message can take before it is to
    be fragmented.
 * **compression** – an optional string to specify the compression scheme to be
    used on messages. Valid values are "none" and "png"

If queue_length is specified, then messages are placed into the queue before
being sent. Messages are sent from the head of the queue. If the queue gets
full, the oldest message is removed and replaced by the newest message.

If a client has multiple subscriptions to the same topic, then messages are
sent at the lowest throttle_rate, with the lowest fragmentation size, and
highest queue_length. It is recommended that the client provides IDs for its
subscriptions, to enable hitrobot to effectively choose the appropriate
fragmentation size and publishing rate.

#### 3.4.5 Unsubscribe

```json
{ "op": "unsubscribe",
  (optional) "id": <string>,
  "topic": <string>
}
```

 * **topic** – the name of the topic to unsubscribe from
 * **id** – an id of the subscription to unsubscribe

If an id is provided, then only the corresponding subscription is unsubscribed.
If no ID is provided, then all subscriptions are unsubscribed.

#### 3.4.6 Call Service

```json
{ "op": "call_service",
  (optional) "id": <string>,
  "service": <string>,
  (optional) "args": <list<json>>,
  (optional) "fragment_size": <int>,
  (optional) "compression": <string>
}
```

Calls a ROS service

 * **service** – the name of the service to call
 * **args** – if the service has no args, then args does not have to be
    provided, though an empty list is equally acceptable. Args should be a list
    of json objects representing the arguments to the service
 * **id** – an optional id to distinguish this service call
 * **fragment_size** – the maximum size that the response message can take
    before it is fragmented
 * **compression** – an optional string to specify the compression scheme to be
    used on messages. Valid values are "none" and "png"

#### 3.4.7 Advertise Service

```json
{ "op": "advertise_service",
  "type": <string>,
  "service": <string>
}
```

Advertises an external ROS service server. Requests come to the client via Call Service.

 * **service** – the name of the service to advertise
 * **type** – the advertised service message type

#### 3.4.8 Unadvertise Service

```json
{ "op": "unadvertise_service",
  "service": <string>
}
```

Stops advertising an external ROS service server

 * **service** – the name of the service to unadvertise

#### 3.4.9 Service Response

```json
{ "op": "service_response",
  (optional) "id": <string>,
  "service": <string>,
  (optional) "values": <list<json>>,
  "result": <boolean>
}
```

A response to a ROS service call

 * **service** – the name of the service that was called
 * **values** – the return values. If the service had no return values, then
    this field can be omitted (and will be by the hitrobot server)
 * **id** – if an ID was provided to the service request, then the service
    response will contain the ID
 * **result** - return value of service callback. true means success, false failure.

## 4 Custom functions

Custom functions for the hitrobot protocol are listed below.

### 4.1 Custom publish string

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

### 4.3 Conventional operations

#### 4.3.1 Get Robot Pose

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

#### 4.3.2 Set Robot Pose

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
  "pose": { "pose": <geometry_msgs/Pose> }
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
{ "target_pose": { "header": { "frame_id": "/map" }, "pose": <geometry_msgs/Pose> },
  "base_position": { "header": { "frame_id": "/map" }, "pose": <geometry_msgs/Pose> }
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
