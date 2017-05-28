; Auto-generated. Do not edit!


(cl:in-package task_manager-msg)


;//! \htmlinclude TaskControl.msg.html

(cl:defclass <TaskControl> (roslisp-msg-protocol:ros-message)
  ((control
    :reader control
    :initarg :control
    :type cl:fixnum
    :initform 0)
   (goal_name
    :reader goal_name
    :initarg :goal_name
    :type cl:string
    :initform ""))
)

(cl:defclass TaskControl (<TaskControl>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <TaskControl>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'TaskControl)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name task_manager-msg:<TaskControl> is deprecated: use task_manager-msg:TaskControl instead.")))

(cl:ensure-generic-function 'control-val :lambda-list '(m))
(cl:defmethod control-val ((m <TaskControl>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader task_manager-msg:control-val is deprecated.  Use task_manager-msg:control instead.")
  (control m))

(cl:ensure-generic-function 'goal_name-val :lambda-list '(m))
(cl:defmethod goal_name-val ((m <TaskControl>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader task_manager-msg:goal_name-val is deprecated.  Use task_manager-msg:goal_name instead.")
  (goal_name m))
(cl:defmethod roslisp-msg-protocol:symbol-codes ((msg-type (cl:eql '<TaskControl>)))
    "Constants for message type '<TaskControl>"
  '((:STOP . 0)
    (:START . 1)
    (:PAUSE . 2))
)
(cl:defmethod roslisp-msg-protocol:symbol-codes ((msg-type (cl:eql 'TaskControl)))
    "Constants for message type 'TaskControl"
  '((:STOP . 0)
    (:START . 1)
    (:PAUSE . 2))
)
(cl:defmethod roslisp-msg-protocol:serialize ((msg <TaskControl>) ostream)
  "Serializes a message object of type '<TaskControl>"
  (cl:let* ((signed (cl:slot-value msg 'control)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 256) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    )
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'goal_name))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'goal_name))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <TaskControl>) istream)
  "Deserializes a message object of type '<TaskControl>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'control) (cl:if (cl:< unsigned 128) unsigned (cl:- unsigned 256))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'goal_name) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'goal_name) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<TaskControl>)))
  "Returns string type for a message object of type '<TaskControl>"
  "task_manager/TaskControl")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'TaskControl)))
  "Returns string type for a message object of type 'TaskControl"
  "task_manager/TaskControl")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<TaskControl>)))
  "Returns md5sum for a message object of type '<TaskControl>"
  "f2ddf02b376d1d00aed5addfb5cfe0ba")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'TaskControl)))
  "Returns md5sum for a message object of type 'TaskControl"
  "f2ddf02b376d1d00aed5addfb5cfe0ba")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<TaskControl>)))
  "Returns full string definition for message of type '<TaskControl>"
  (cl:format cl:nil "# control the task execution~%int8 control~%~%int8 STOP  = 0~%int8 START = 1~%int8 PAUSE = 2~%~%# name of the task to be execute~%# leave empty, when stopping or pausing~%string goal_name~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'TaskControl)))
  "Returns full string definition for message of type 'TaskControl"
  (cl:format cl:nil "# control the task execution~%int8 control~%~%int8 STOP  = 0~%int8 START = 1~%int8 PAUSE = 2~%~%# name of the task to be execute~%# leave empty, when stopping or pausing~%string goal_name~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <TaskControl>))
  (cl:+ 0
     1
     4 (cl:length (cl:slot-value msg 'goal_name))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <TaskControl>))
  "Converts a ROS message object to a list"
  (cl:list 'TaskControl
    (cl:cons ':control (control msg))
    (cl:cons ':goal_name (goal_name msg))
))
