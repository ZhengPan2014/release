; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-msg)


;//! \htmlinclude NewTask2.msg.html

(cl:defclass <NewTask2> (roslisp-msg-protocol:ros-message)
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

(cl:defclass NewTask2 (<NewTask2>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <NewTask2>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'NewTask2)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-msg:<NewTask2> is deprecated: use scheduling_msgs-msg:NewTask2 instead.")))

(cl:ensure-generic-function 'taskID-val :lambda-list '(m))
(cl:defmethod taskID-val ((m <NewTask2>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:taskID-val is deprecated.  Use scheduling_msgs-msg:taskID instead.")
  (taskID m))

(cl:ensure-generic-function 'source_station-val :lambda-list '(m))
(cl:defmethod source_station-val ((m <NewTask2>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:source_station-val is deprecated.  Use scheduling_msgs-msg:source_station instead.")
  (source_station m))

(cl:ensure-generic-function 'source_action-val :lambda-list '(m))
(cl:defmethod source_action-val ((m <NewTask2>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:source_action-val is deprecated.  Use scheduling_msgs-msg:source_action instead.")
  (source_action m))

(cl:ensure-generic-function 'destination_station-val :lambda-list '(m))
(cl:defmethod destination_station-val ((m <NewTask2>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:destination_station-val is deprecated.  Use scheduling_msgs-msg:destination_station instead.")
  (destination_station m))

(cl:ensure-generic-function 'destination_action-val :lambda-list '(m))
(cl:defmethod destination_action-val ((m <NewTask2>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:destination_action-val is deprecated.  Use scheduling_msgs-msg:destination_action instead.")
  (destination_action m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <NewTask2>) ostream)
  "Serializes a message object of type '<NewTask2>"
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
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <NewTask2>) istream)
  "Deserializes a message object of type '<NewTask2>"
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
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<NewTask2>)))
  "Returns string type for a message object of type '<NewTask2>"
  "scheduling_msgs/NewTask2")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'NewTask2)))
  "Returns string type for a message object of type 'NewTask2"
  "scheduling_msgs/NewTask2")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<NewTask2>)))
  "Returns md5sum for a message object of type '<NewTask2>"
  "6227bbc971ea152cf51a61b9dec59db0")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'NewTask2)))
  "Returns md5sum for a message object of type 'NewTask2"
  "6227bbc971ea152cf51a61b9dec59db0")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<NewTask2>)))
  "Returns full string definition for message of type '<NewTask2>"
  (cl:format cl:nil "int32 taskID~%string source_station~%int32 source_action~%string destination_station~%int32 destination_action~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'NewTask2)))
  "Returns full string definition for message of type 'NewTask2"
  (cl:format cl:nil "int32 taskID~%string source_station~%int32 source_action~%string destination_station~%int32 destination_action~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <NewTask2>))
  (cl:+ 0
     4
     4 (cl:length (cl:slot-value msg 'source_station))
     4
     4 (cl:length (cl:slot-value msg 'destination_station))
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <NewTask2>))
  "Converts a ROS message object to a list"
  (cl:list 'NewTask2
    (cl:cons ':taskID (taskID msg))
    (cl:cons ':source_station (source_station msg))
    (cl:cons ':source_action (source_action msg))
    (cl:cons ':destination_station (destination_station msg))
    (cl:cons ':destination_action (destination_action msg))
))
