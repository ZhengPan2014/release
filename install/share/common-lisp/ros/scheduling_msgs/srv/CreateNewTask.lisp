; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude CreateNewTask-request.msg.html

(cl:defclass <CreateNewTask-request> (roslisp-msg-protocol:ros-message)
  ((taskID
    :reader taskID
    :initarg :taskID
    :type cl:integer
    :initform 0)
   (source_station
    :reader source_station
    :initarg :source_station
    :type cl:string
    :initform "")
   (source_action
    :reader source_action
    :initarg :source_action
    :type cl:integer
    :initform 0)
   (destination_station
    :reader destination_station
    :initarg :destination_station
    :type cl:string
    :initform "")
   (destination_action
    :reader destination_action
    :initarg :destination_action
    :type cl:integer
    :initform 0))
)

(cl:defclass CreateNewTask-request (<CreateNewTask-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <CreateNewTask-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'CreateNewTask-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<CreateNewTask-request> is deprecated: use scheduling_msgs-srv:CreateNewTask-request instead.")))

(cl:ensure-generic-function 'taskID-val :lambda-list '(m))
(cl:defmethod taskID-val ((m <CreateNewTask-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:taskID-val is deprecated.  Use scheduling_msgs-srv:taskID instead.")
  (taskID m))

(cl:ensure-generic-function 'source_station-val :lambda-list '(m))
(cl:defmethod source_station-val ((m <CreateNewTask-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:source_station-val is deprecated.  Use scheduling_msgs-srv:source_station instead.")
  (source_station m))

(cl:ensure-generic-function 'source_action-val :lambda-list '(m))
(cl:defmethod source_action-val ((m <CreateNewTask-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:source_action-val is deprecated.  Use scheduling_msgs-srv:source_action instead.")
  (source_action m))

(cl:ensure-generic-function 'destination_station-val :lambda-list '(m))
(cl:defmethod destination_station-val ((m <CreateNewTask-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:destination_station-val is deprecated.  Use scheduling_msgs-srv:destination_station instead.")
  (destination_station m))

(cl:ensure-generic-function 'destination_action-val :lambda-list '(m))
(cl:defmethod destination_action-val ((m <CreateNewTask-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:destination_action-val is deprecated.  Use scheduling_msgs-srv:destination_action instead.")
  (destination_action m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <CreateNewTask-request>) ostream)
  "Serializes a message object of type '<CreateNewTask-request>"
  (cl:let* ((signed (cl:slot-value msg 'taskID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'source_station))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'source_station))
  (cl:let* ((signed (cl:slot-value msg 'source_action)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'destination_station))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'destination_station))
  (cl:let* ((signed (cl:slot-value msg 'destination_action)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <CreateNewTask-request>) istream)
  "Deserializes a message object of type '<CreateNewTask-request>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'taskID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'source_station) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'source_station) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'source_action) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'destination_station) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'destination_station) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'destination_action) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<CreateNewTask-request>)))
  "Returns string type for a service object of type '<CreateNewTask-request>"
  "scheduling_msgs/CreateNewTaskRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'CreateNewTask-request)))
  "Returns string type for a service object of type 'CreateNewTask-request"
  "scheduling_msgs/CreateNewTaskRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<CreateNewTask-request>)))
  "Returns md5sum for a message object of type '<CreateNewTask-request>"
  "f8d9e69067075cee94e925f955e1ce6d")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'CreateNewTask-request)))
  "Returns md5sum for a message object of type 'CreateNewTask-request"
  "f8d9e69067075cee94e925f955e1ce6d")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<CreateNewTask-request>)))
  "Returns full string definition for message of type '<CreateNewTask-request>"
  (cl:format cl:nil "int32 taskID~%string source_station~%int32 source_action~%string destination_station~%int32 destination_action~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'CreateNewTask-request)))
  "Returns full string definition for message of type 'CreateNewTask-request"
  (cl:format cl:nil "int32 taskID~%string source_station~%int32 source_action~%string destination_station~%int32 destination_action~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <CreateNewTask-request>))
  (cl:+ 0
     4
     4 (cl:length (cl:slot-value msg 'source_station))
     4
     4 (cl:length (cl:slot-value msg 'destination_station))
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <CreateNewTask-request>))
  "Converts a ROS message object to a list"
  (cl:list 'CreateNewTask-request
    (cl:cons ':taskID (taskID msg))
    (cl:cons ':source_station (source_station msg))
    (cl:cons ':source_action (source_action msg))
    (cl:cons ':destination_station (destination_station msg))
    (cl:cons ':destination_action (destination_action msg))
))
;//! \htmlinclude CreateNewTask-response.msg.html

(cl:defclass <CreateNewTask-response> (roslisp-msg-protocol:ros-message)
  ((feedback
    :reader feedback
    :initarg :feedback
    :type cl:integer
    :initform 0))
)

(cl:defclass CreateNewTask-response (<CreateNewTask-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <CreateNewTask-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'CreateNewTask-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<CreateNewTask-response> is deprecated: use scheduling_msgs-srv:CreateNewTask-response instead.")))

(cl:ensure-generic-function 'feedback-val :lambda-list '(m))
(cl:defmethod feedback-val ((m <CreateNewTask-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:feedback-val is deprecated.  Use scheduling_msgs-srv:feedback instead.")
  (feedback m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <CreateNewTask-response>) ostream)
  "Serializes a message object of type '<CreateNewTask-response>"
  (cl:let* ((signed (cl:slot-value msg 'feedback)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <CreateNewTask-response>) istream)
  "Deserializes a message object of type '<CreateNewTask-response>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'feedback) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<CreateNewTask-response>)))
  "Returns string type for a service object of type '<CreateNewTask-response>"
  "scheduling_msgs/CreateNewTaskResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'CreateNewTask-response)))
  "Returns string type for a service object of type 'CreateNewTask-response"
  "scheduling_msgs/CreateNewTaskResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<CreateNewTask-response>)))
  "Returns md5sum for a message object of type '<CreateNewTask-response>"
  "f8d9e69067075cee94e925f955e1ce6d")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'CreateNewTask-response)))
  "Returns md5sum for a message object of type 'CreateNewTask-response"
  "f8d9e69067075cee94e925f955e1ce6d")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<CreateNewTask-response>)))
  "Returns full string definition for message of type '<CreateNewTask-response>"
  (cl:format cl:nil "int32 feedback~%~%~%~%~%~%~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'CreateNewTask-response)))
  "Returns full string definition for message of type 'CreateNewTask-response"
  (cl:format cl:nil "int32 feedback~%~%~%~%~%~%~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <CreateNewTask-response>))
  (cl:+ 0
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <CreateNewTask-response>))
  "Converts a ROS message object to a list"
  (cl:list 'CreateNewTask-response
    (cl:cons ':feedback (feedback msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'CreateNewTask)))
  'CreateNewTask-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'CreateNewTask)))
  'CreateNewTask-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'CreateNewTask)))
  "Returns string type for a service object of type '<CreateNewTask>"
  "scheduling_msgs/CreateNewTask")