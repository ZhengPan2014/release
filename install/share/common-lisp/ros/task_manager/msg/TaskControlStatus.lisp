; Auto-generated. Do not edit!


(cl:in-package task_manager-msg)


;//! \htmlinclude TaskControlStatus.msg.html

(cl:defclass <TaskControlStatus> (roslisp-msg-protocol:ros-message)
  ((status
    :reader status
    :initarg :status
    :type cl:fixnum
    :initform 0)
   (status_desc
    :reader status_desc
    :initarg :status_desc
    :type cl:string
    :initform "")
   (task_name
    :reader task_name
    :initarg :task_name
    :type cl:string
    :initform ""))
)

(cl:defclass TaskControlStatus (<TaskControlStatus>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <TaskControlStatus>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'TaskControlStatus)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name task_manager-msg:<TaskControlStatus> is deprecated: use task_manager-msg:TaskControlStatus instead.")))

(cl:ensure-generic-function 'status-val :lambda-list '(m))
(cl:defmethod status-val ((m <TaskControlStatus>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader task_manager-msg:status-val is deprecated.  Use task_manager-msg:status instead.")
  (status m))

(cl:ensure-generic-function 'status_desc-val :lambda-list '(m))
(cl:defmethod status_desc-val ((m <TaskControlStatus>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader task_manager-msg:status_desc-val is deprecated.  Use task_manager-msg:status_desc instead.")
  (status_desc m))

(cl:ensure-generic-function 'task_name-val :lambda-list '(m))
(cl:defmethod task_name-val ((m <TaskControlStatus>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader task_manager-msg:task_name-val is deprecated.  Use task_manager-msg:task_name instead.")
  (task_name m))
(cl:defmethod roslisp-msg-protocol:symbol-codes ((msg-type (cl:eql '<TaskControlStatus>)))
    "Constants for message type '<TaskControlStatus>"
  '((:ERROR . -1)
    (:IDLING . 0)
    (:RUNNING . 1)
    (:PAUSED . 2)
    (:COMPLETED . 3)
    (:CANCELLED . 4)
    (:SUB_CANCELLED . 5))
)
(cl:defmethod roslisp-msg-protocol:symbol-codes ((msg-type (cl:eql 'TaskControlStatus)))
    "Constants for message type 'TaskControlStatus"
  '((:ERROR . -1)
    (:IDLING . 0)
    (:RUNNING . 1)
    (:PAUSED . 2)
    (:COMPLETED . 3)
    (:CANCELLED . 4)
    (:SUB_CANCELLED . 5))
)
(cl:defmethod roslisp-msg-protocol:serialize ((msg <TaskControlStatus>) ostream)
  "Serializes a message object of type '<TaskControlStatus>"
  (cl:let* ((signed (cl:slot-value msg 'status)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 256) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    )
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'status_desc))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'status_desc))
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'task_name))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'task_name))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <TaskControlStatus>) istream)
  "Deserializes a message object of type '<TaskControlStatus>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'status) (cl:if (cl:< unsigned 128) unsigned (cl:- unsigned 256))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'status_desc) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'status_desc) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'task_name) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'task_name) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<TaskControlStatus>)))
  "Returns string type for a message object of type '<TaskControlStatus>"
  "task_manager/TaskControlStatus")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'TaskControlStatus)))
  "Returns string type for a message object of type 'TaskControlStatus"
  "task_manager/TaskControlStatus")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<TaskControlStatus>)))
  "Returns md5sum for a message object of type '<TaskControlStatus>"
  "ab313481ad0d72bce6bc5e140447df06")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'TaskControlStatus)))
  "Returns md5sum for a message object of type 'TaskControlStatus"
  "ab313481ad0d72bce6bc5e140447df06")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<TaskControlStatus>)))
  "Returns full string definition for message of type '<TaskControlStatus>"
  (cl:format cl:nil "# Control the task navigation~%int8 status~%~%int8 ERROR     = -1~%int8 IDLING    = 0~%int8 RUNNING   = 1~%int8 PAUSED    = 2~%int8 COMPLETED = 3~%int8 CANCELLED = 4~%int8 SUB_CANCELLED = 5~%~%# Human-readable status description~%string status_desc~%string task_name~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'TaskControlStatus)))
  "Returns full string definition for message of type 'TaskControlStatus"
  (cl:format cl:nil "# Control the task navigation~%int8 status~%~%int8 ERROR     = -1~%int8 IDLING    = 0~%int8 RUNNING   = 1~%int8 PAUSED    = 2~%int8 COMPLETED = 3~%int8 CANCELLED = 4~%int8 SUB_CANCELLED = 5~%~%# Human-readable status description~%string status_desc~%string task_name~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <TaskControlStatus>))
  (cl:+ 0
     1
     4 (cl:length (cl:slot-value msg 'status_desc))
     4 (cl:length (cl:slot-value msg 'task_name))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <TaskControlStatus>))
  "Converts a ROS message object to a list"
  (cl:list 'TaskControlStatus
    (cl:cons ':status (status msg))
    (cl:cons ':status_desc (status_desc msg))
    (cl:cons ':task_name (task_name msg))
))
