; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude TaskQueryPath-request.msg.html

(cl:defclass <TaskQueryPath-request> (roslisp-msg-protocol:ros-message)
  ((header
    :reader header
    :initarg :header
    :type std_msgs-msg:Header
    :initform (cl:make-instance 'std_msgs-msg:Header))
   (agvID
    :reader agvID
    :initarg :agvID
    :type cl:integer
    :initform 0)
   (agvName
    :reader agvName
    :initarg :agvName
    :type cl:string
    :initform "")
   (agvPos
    :reader agvPos
    :initarg :agvPos
    :type geometry_msgs-msg:PoseStamped
    :initform (cl:make-instance 'geometry_msgs-msg:PoseStamped))
   (goalPos
    :reader goalPos
    :initarg :goalPos
    :type geometry_msgs-msg:PoseStamped
    :initform (cl:make-instance 'geometry_msgs-msg:PoseStamped)))
)

(cl:defclass TaskQueryPath-request (<TaskQueryPath-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <TaskQueryPath-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'TaskQueryPath-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<TaskQueryPath-request> is deprecated: use scheduling_msgs-srv:TaskQueryPath-request instead.")))

(cl:ensure-generic-function 'header-val :lambda-list '(m))
(cl:defmethod header-val ((m <TaskQueryPath-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:header-val is deprecated.  Use scheduling_msgs-srv:header instead.")
  (header m))

(cl:ensure-generic-function 'agvID-val :lambda-list '(m))
(cl:defmethod agvID-val ((m <TaskQueryPath-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:agvID-val is deprecated.  Use scheduling_msgs-srv:agvID instead.")
  (agvID m))

(cl:ensure-generic-function 'agvName-val :lambda-list '(m))
(cl:defmethod agvName-val ((m <TaskQueryPath-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:agvName-val is deprecated.  Use scheduling_msgs-srv:agvName instead.")
  (agvName m))

(cl:ensure-generic-function 'agvPos-val :lambda-list '(m))
(cl:defmethod agvPos-val ((m <TaskQueryPath-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:agvPos-val is deprecated.  Use scheduling_msgs-srv:agvPos instead.")
  (agvPos m))

(cl:ensure-generic-function 'goalPos-val :lambda-list '(m))
(cl:defmethod goalPos-val ((m <TaskQueryPath-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:goalPos-val is deprecated.  Use scheduling_msgs-srv:goalPos instead.")
  (goalPos m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <TaskQueryPath-request>) ostream)
  "Serializes a message object of type '<TaskQueryPath-request>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'header) ostream)
  (cl:let* ((signed (cl:slot-value msg 'agvID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'agvName))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'agvName))
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'agvPos) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'goalPos) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <TaskQueryPath-request>) istream)
  "Deserializes a message object of type '<TaskQueryPath-request>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'header) istream)
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'agvID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'agvName) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'agvName) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'agvPos) istream)
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'goalPos) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<TaskQueryPath-request>)))
  "Returns string type for a service object of type '<TaskQueryPath-request>"
  "scheduling_msgs/TaskQueryPathRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'TaskQueryPath-request)))
  "Returns string type for a service object of type 'TaskQueryPath-request"
  "scheduling_msgs/TaskQueryPathRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<TaskQueryPath-request>)))
  "Returns md5sum for a message object of type '<TaskQueryPath-request>"
  "3fda7de461c4194d724c2408e8af4317")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'TaskQueryPath-request)))
  "Returns md5sum for a message object of type 'TaskQueryPath-request"
  "3fda7de461c4194d724c2408e8af4317")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<TaskQueryPath-request>)))
  "Returns full string definition for message of type '<TaskQueryPath-request>"
  (cl:format cl:nil "Header header~%int32 agvID~%string agvName~%geometry_msgs/PoseStamped agvPos~%geometry_msgs/PoseStamped goalPos~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/PoseStamped~%# A Pose with reference coordinate frame and timestamp~%Header header~%Pose pose~%~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'TaskQueryPath-request)))
  "Returns full string definition for message of type 'TaskQueryPath-request"
  (cl:format cl:nil "Header header~%int32 agvID~%string agvName~%geometry_msgs/PoseStamped agvPos~%geometry_msgs/PoseStamped goalPos~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/PoseStamped~%# A Pose with reference coordinate frame and timestamp~%Header header~%Pose pose~%~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <TaskQueryPath-request>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'header))
     4
     4 (cl:length (cl:slot-value msg 'agvName))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'agvPos))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'goalPos))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <TaskQueryPath-request>))
  "Converts a ROS message object to a list"
  (cl:list 'TaskQueryPath-request
    (cl:cons ':header (header msg))
    (cl:cons ':agvID (agvID msg))
    (cl:cons ':agvName (agvName msg))
    (cl:cons ':agvPos (agvPos msg))
    (cl:cons ':goalPos (goalPos msg))
))
;//! \htmlinclude TaskQueryPath-response.msg.html

(cl:defclass <TaskQueryPath-response> (roslisp-msg-protocol:ros-message)
  ((isValid
    :reader isValid
    :initarg :isValid
    :type cl:boolean
    :initform cl:nil)
   (pathID
    :reader pathID
    :initarg :pathID
    :type cl:integer
    :initform 0)
   (pathTopic
    :reader pathTopic
    :initarg :pathTopic
    :type cl:string
    :initform "")
   (bufferID
    :reader bufferID
    :initarg :bufferID
    :type cl:integer
    :initform 0))
)

(cl:defclass TaskQueryPath-response (<TaskQueryPath-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <TaskQueryPath-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'TaskQueryPath-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<TaskQueryPath-response> is deprecated: use scheduling_msgs-srv:TaskQueryPath-response instead.")))

(cl:ensure-generic-function 'isValid-val :lambda-list '(m))
(cl:defmethod isValid-val ((m <TaskQueryPath-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:isValid-val is deprecated.  Use scheduling_msgs-srv:isValid instead.")
  (isValid m))

(cl:ensure-generic-function 'pathID-val :lambda-list '(m))
(cl:defmethod pathID-val ((m <TaskQueryPath-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:pathID-val is deprecated.  Use scheduling_msgs-srv:pathID instead.")
  (pathID m))

(cl:ensure-generic-function 'pathTopic-val :lambda-list '(m))
(cl:defmethod pathTopic-val ((m <TaskQueryPath-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:pathTopic-val is deprecated.  Use scheduling_msgs-srv:pathTopic instead.")
  (pathTopic m))

(cl:ensure-generic-function 'bufferID-val :lambda-list '(m))
(cl:defmethod bufferID-val ((m <TaskQueryPath-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:bufferID-val is deprecated.  Use scheduling_msgs-srv:bufferID instead.")
  (bufferID m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <TaskQueryPath-response>) ostream)
  "Serializes a message object of type '<TaskQueryPath-response>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'isValid) 1 0)) ostream)
  (cl:let* ((signed (cl:slot-value msg 'pathID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'pathTopic))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'pathTopic))
  (cl:let* ((signed (cl:slot-value msg 'bufferID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <TaskQueryPath-response>) istream)
  "Deserializes a message object of type '<TaskQueryPath-response>"
    (cl:setf (cl:slot-value msg 'isValid) (cl:not (cl:zerop (cl:read-byte istream))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'pathID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'pathTopic) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'pathTopic) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'bufferID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<TaskQueryPath-response>)))
  "Returns string type for a service object of type '<TaskQueryPath-response>"
  "scheduling_msgs/TaskQueryPathResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'TaskQueryPath-response)))
  "Returns string type for a service object of type 'TaskQueryPath-response"
  "scheduling_msgs/TaskQueryPathResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<TaskQueryPath-response>)))
  "Returns md5sum for a message object of type '<TaskQueryPath-response>"
  "3fda7de461c4194d724c2408e8af4317")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'TaskQueryPath-response)))
  "Returns md5sum for a message object of type 'TaskQueryPath-response"
  "3fda7de461c4194d724c2408e8af4317")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<TaskQueryPath-response>)))
  "Returns full string definition for message of type '<TaskQueryPath-response>"
  (cl:format cl:nil "bool isValid~%int32 pathID~%string pathTopic~%int32 bufferID~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'TaskQueryPath-response)))
  "Returns full string definition for message of type 'TaskQueryPath-response"
  (cl:format cl:nil "bool isValid~%int32 pathID~%string pathTopic~%int32 bufferID~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <TaskQueryPath-response>))
  (cl:+ 0
     1
     4
     4 (cl:length (cl:slot-value msg 'pathTopic))
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <TaskQueryPath-response>))
  "Converts a ROS message object to a list"
  (cl:list 'TaskQueryPath-response
    (cl:cons ':isValid (isValid msg))
    (cl:cons ':pathID (pathID msg))
    (cl:cons ':pathTopic (pathTopic msg))
    (cl:cons ':bufferID (bufferID msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'TaskQueryPath)))
  'TaskQueryPath-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'TaskQueryPath)))
  'TaskQueryPath-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'TaskQueryPath)))
  "Returns string type for a service object of type '<TaskQueryPath>"
  "scheduling_msgs/TaskQueryPath")