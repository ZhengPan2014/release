; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-msg)


;//! \htmlinclude Task.msg.html

(cl:defclass <Task> (roslisp-msg-protocol:ros-message)
  ((header
    :reader header
    :initarg :header
    :type std_msgs-msg:Header
    :initform (cl:make-instance 'std_msgs-msg:Header))
   (taskID
    :reader taskID
    :initarg :taskID
    :type cl:integer
    :initform 0)
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
   (stationID
    :reader stationID
    :initarg :stationID
    :type cl:integer
    :initform 0)
   (workType
    :reader workType
    :initarg :workType
    :type cl:integer
    :initform 0)
   (workStatus
    :reader workStatus
    :initarg :workStatus
    :type cl:integer
    :initform 0))
)

(cl:defclass Task (<Task>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <Task>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'Task)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-msg:<Task> is deprecated: use scheduling_msgs-msg:Task instead.")))

(cl:ensure-generic-function 'header-val :lambda-list '(m))
(cl:defmethod header-val ((m <Task>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:header-val is deprecated.  Use scheduling_msgs-msg:header instead.")
  (header m))

(cl:ensure-generic-function 'taskID-val :lambda-list '(m))
(cl:defmethod taskID-val ((m <Task>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:taskID-val is deprecated.  Use scheduling_msgs-msg:taskID instead.")
  (taskID m))

(cl:ensure-generic-function 'agvID-val :lambda-list '(m))
(cl:defmethod agvID-val ((m <Task>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:agvID-val is deprecated.  Use scheduling_msgs-msg:agvID instead.")
  (agvID m))

(cl:ensure-generic-function 'agvName-val :lambda-list '(m))
(cl:defmethod agvName-val ((m <Task>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:agvName-val is deprecated.  Use scheduling_msgs-msg:agvName instead.")
  (agvName m))

(cl:ensure-generic-function 'stationID-val :lambda-list '(m))
(cl:defmethod stationID-val ((m <Task>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:stationID-val is deprecated.  Use scheduling_msgs-msg:stationID instead.")
  (stationID m))

(cl:ensure-generic-function 'workType-val :lambda-list '(m))
(cl:defmethod workType-val ((m <Task>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:workType-val is deprecated.  Use scheduling_msgs-msg:workType instead.")
  (workType m))

(cl:ensure-generic-function 'workStatus-val :lambda-list '(m))
(cl:defmethod workStatus-val ((m <Task>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:workStatus-val is deprecated.  Use scheduling_msgs-msg:workStatus instead.")
  (workStatus m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <Task>) ostream)
  "Serializes a message object of type '<Task>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'header) ostream)
  (cl:let* ((signed (cl:slot-value msg 'taskID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
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
  (cl:let* ((signed (cl:slot-value msg 'stationID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'workType)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'workStatus)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <Task>) istream)
  "Deserializes a message object of type '<Task>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'header) istream)
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'taskID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
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
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'stationID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'workType) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'workStatus) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<Task>)))
  "Returns string type for a message object of type '<Task>"
  "scheduling_msgs/Task")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'Task)))
  "Returns string type for a message object of type 'Task"
  "scheduling_msgs/Task")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<Task>)))
  "Returns md5sum for a message object of type '<Task>"
  "3bdee9c97c7338d330686f66947e38e5")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'Task)))
  "Returns md5sum for a message object of type 'Task"
  "3bdee9c97c7338d330686f66947e38e5")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<Task>)))
  "Returns full string definition for message of type '<Task>"
  (cl:format cl:nil "Header header~%int32 taskID~%int32 agvID~%string agvName~%int32 stationID~%int32 workType #0: Idle, 1: navigation without load, 2: navigation with load, 3: loading, 4: unloading~%int32 workStatus #0: completed, 1: executing, 2: waiting~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'Task)))
  "Returns full string definition for message of type 'Task"
  (cl:format cl:nil "Header header~%int32 taskID~%int32 agvID~%string agvName~%int32 stationID~%int32 workType #0: Idle, 1: navigation without load, 2: navigation with load, 3: loading, 4: unloading~%int32 workStatus #0: completed, 1: executing, 2: waiting~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <Task>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'header))
     4
     4
     4 (cl:length (cl:slot-value msg 'agvName))
     4
     4
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <Task>))
  "Converts a ROS message object to a list"
  (cl:list 'Task
    (cl:cons ':header (header msg))
    (cl:cons ':taskID (taskID msg))
    (cl:cons ':agvID (agvID msg))
    (cl:cons ':agvName (agvName msg))
    (cl:cons ':stationID (stationID msg))
    (cl:cons ':workType (workType msg))
    (cl:cons ':workStatus (workStatus msg))
))
