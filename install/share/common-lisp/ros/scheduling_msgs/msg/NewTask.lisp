; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-msg)


;//! \htmlinclude NewTask.msg.html

(cl:defclass <NewTask> (roslisp-msg-protocol:ros-message)
  ((taskID
    :reader taskID
    :initarg :taskID
    :type cl:integer
    :initform 0)
   (source_stationID
    :reader source_stationID
    :initarg :source_stationID
    :type cl:integer
    :initform 0)
   (source_action
    :reader source_action
    :initarg :source_action
    :type cl:integer
    :initform 0)
   (destination_stationID
    :reader destination_stationID
    :initarg :destination_stationID
    :type cl:integer
    :initform 0)
   (destination_action
    :reader destination_action
    :initarg :destination_action
    :type cl:integer
    :initform 0))
)

(cl:defclass NewTask (<NewTask>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <NewTask>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'NewTask)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-msg:<NewTask> is deprecated: use scheduling_msgs-msg:NewTask instead.")))

(cl:ensure-generic-function 'taskID-val :lambda-list '(m))
(cl:defmethod taskID-val ((m <NewTask>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:taskID-val is deprecated.  Use scheduling_msgs-msg:taskID instead.")
  (taskID m))

(cl:ensure-generic-function 'source_stationID-val :lambda-list '(m))
(cl:defmethod source_stationID-val ((m <NewTask>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:source_stationID-val is deprecated.  Use scheduling_msgs-msg:source_stationID instead.")
  (source_stationID m))

(cl:ensure-generic-function 'source_action-val :lambda-list '(m))
(cl:defmethod source_action-val ((m <NewTask>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:source_action-val is deprecated.  Use scheduling_msgs-msg:source_action instead.")
  (source_action m))

(cl:ensure-generic-function 'destination_stationID-val :lambda-list '(m))
(cl:defmethod destination_stationID-val ((m <NewTask>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:destination_stationID-val is deprecated.  Use scheduling_msgs-msg:destination_stationID instead.")
  (destination_stationID m))

(cl:ensure-generic-function 'destination_action-val :lambda-list '(m))
(cl:defmethod destination_action-val ((m <NewTask>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:destination_action-val is deprecated.  Use scheduling_msgs-msg:destination_action instead.")
  (destination_action m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <NewTask>) ostream)
  "Serializes a message object of type '<NewTask>"
  (cl:let* ((signed (cl:slot-value msg 'taskID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'source_stationID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'source_action)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'destination_stationID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'destination_action)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <NewTask>) istream)
  "Deserializes a message object of type '<NewTask>"
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
      (cl:setf (cl:slot-value msg 'source_stationID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'source_action) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'destination_stationID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'destination_action) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<NewTask>)))
  "Returns string type for a message object of type '<NewTask>"
  "scheduling_msgs/NewTask")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'NewTask)))
  "Returns string type for a message object of type 'NewTask"
  "scheduling_msgs/NewTask")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<NewTask>)))
  "Returns md5sum for a message object of type '<NewTask>"
  "eb9b965ae452a7d2f5b77f9dcab2f6e9")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'NewTask)))
  "Returns md5sum for a message object of type 'NewTask"
  "eb9b965ae452a7d2f5b77f9dcab2f6e9")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<NewTask>)))
  "Returns full string definition for message of type '<NewTask>"
  (cl:format cl:nil "int32 taskID~%int32 source_stationID~%int32 source_action~%int32 destination_stationID~%int32 destination_action~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'NewTask)))
  "Returns full string definition for message of type 'NewTask"
  (cl:format cl:nil "int32 taskID~%int32 source_stationID~%int32 source_action~%int32 destination_stationID~%int32 destination_action~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <NewTask>))
  (cl:+ 0
     4
     4
     4
     4
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <NewTask>))
  "Converts a ROS message object to a list"
  (cl:list 'NewTask
    (cl:cons ':taskID (taskID msg))
    (cl:cons ':source_stationID (source_stationID msg))
    (cl:cons ':source_action (source_action msg))
    (cl:cons ':destination_stationID (destination_stationID msg))
    (cl:cons ':destination_action (destination_action msg))
))
