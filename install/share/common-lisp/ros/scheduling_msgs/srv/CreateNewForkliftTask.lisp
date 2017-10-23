; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude CreateNewForkliftTask-request.msg.html

(cl:defclass <CreateNewForkliftTask-request> (roslisp-msg-protocol:ros-message)
  ((loading_station
    :reader loading_station
    :initarg :loading_station
    :type cl:string
    :initform "")
   (unloading_station
    :reader unloading_station
    :initarg :unloading_station
    :type cl:string
    :initform ""))
)

(cl:defclass CreateNewForkliftTask-request (<CreateNewForkliftTask-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <CreateNewForkliftTask-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'CreateNewForkliftTask-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<CreateNewForkliftTask-request> is deprecated: use scheduling_msgs-srv:CreateNewForkliftTask-request instead.")))

(cl:ensure-generic-function 'loading_station-val :lambda-list '(m))
(cl:defmethod loading_station-val ((m <CreateNewForkliftTask-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:loading_station-val is deprecated.  Use scheduling_msgs-srv:loading_station instead.")
  (loading_station m))

(cl:ensure-generic-function 'unloading_station-val :lambda-list '(m))
(cl:defmethod unloading_station-val ((m <CreateNewForkliftTask-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:unloading_station-val is deprecated.  Use scheduling_msgs-srv:unloading_station instead.")
  (unloading_station m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <CreateNewForkliftTask-request>) ostream)
  "Serializes a message object of type '<CreateNewForkliftTask-request>"
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'loading_station))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'loading_station))
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'unloading_station))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'unloading_station))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <CreateNewForkliftTask-request>) istream)
  "Deserializes a message object of type '<CreateNewForkliftTask-request>"
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'loading_station) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'loading_station) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'unloading_station) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'unloading_station) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<CreateNewForkliftTask-request>)))
  "Returns string type for a service object of type '<CreateNewForkliftTask-request>"
  "scheduling_msgs/CreateNewForkliftTaskRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'CreateNewForkliftTask-request)))
  "Returns string type for a service object of type 'CreateNewForkliftTask-request"
  "scheduling_msgs/CreateNewForkliftTaskRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<CreateNewForkliftTask-request>)))
  "Returns md5sum for a message object of type '<CreateNewForkliftTask-request>"
  "7deec0d962e4aaff484c07a2fb92eea6")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'CreateNewForkliftTask-request)))
  "Returns md5sum for a message object of type 'CreateNewForkliftTask-request"
  "7deec0d962e4aaff484c07a2fb92eea6")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<CreateNewForkliftTask-request>)))
  "Returns full string definition for message of type '<CreateNewForkliftTask-request>"
  (cl:format cl:nil "string loading_station~%string unloading_station~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'CreateNewForkliftTask-request)))
  "Returns full string definition for message of type 'CreateNewForkliftTask-request"
  (cl:format cl:nil "string loading_station~%string unloading_station~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <CreateNewForkliftTask-request>))
  (cl:+ 0
     4 (cl:length (cl:slot-value msg 'loading_station))
     4 (cl:length (cl:slot-value msg 'unloading_station))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <CreateNewForkliftTask-request>))
  "Converts a ROS message object to a list"
  (cl:list 'CreateNewForkliftTask-request
    (cl:cons ':loading_station (loading_station msg))
    (cl:cons ':unloading_station (unloading_station msg))
))
;//! \htmlinclude CreateNewForkliftTask-response.msg.html

(cl:defclass <CreateNewForkliftTask-response> (roslisp-msg-protocol:ros-message)
  ((feedback
    :reader feedback
    :initarg :feedback
    :type cl:integer
    :initform 0))
)

(cl:defclass CreateNewForkliftTask-response (<CreateNewForkliftTask-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <CreateNewForkliftTask-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'CreateNewForkliftTask-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<CreateNewForkliftTask-response> is deprecated: use scheduling_msgs-srv:CreateNewForkliftTask-response instead.")))

(cl:ensure-generic-function 'feedback-val :lambda-list '(m))
(cl:defmethod feedback-val ((m <CreateNewForkliftTask-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:feedback-val is deprecated.  Use scheduling_msgs-srv:feedback instead.")
  (feedback m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <CreateNewForkliftTask-response>) ostream)
  "Serializes a message object of type '<CreateNewForkliftTask-response>"
  (cl:let* ((signed (cl:slot-value msg 'feedback)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <CreateNewForkliftTask-response>) istream)
  "Deserializes a message object of type '<CreateNewForkliftTask-response>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'feedback) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<CreateNewForkliftTask-response>)))
  "Returns string type for a service object of type '<CreateNewForkliftTask-response>"
  "scheduling_msgs/CreateNewForkliftTaskResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'CreateNewForkliftTask-response)))
  "Returns string type for a service object of type 'CreateNewForkliftTask-response"
  "scheduling_msgs/CreateNewForkliftTaskResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<CreateNewForkliftTask-response>)))
  "Returns md5sum for a message object of type '<CreateNewForkliftTask-response>"
  "7deec0d962e4aaff484c07a2fb92eea6")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'CreateNewForkliftTask-response)))
  "Returns md5sum for a message object of type 'CreateNewForkliftTask-response"
  "7deec0d962e4aaff484c07a2fb92eea6")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<CreateNewForkliftTask-response>)))
  "Returns full string definition for message of type '<CreateNewForkliftTask-response>"
  (cl:format cl:nil "int32 feedback~%~%~%~%~%~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'CreateNewForkliftTask-response)))
  "Returns full string definition for message of type 'CreateNewForkliftTask-response"
  (cl:format cl:nil "int32 feedback~%~%~%~%~%~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <CreateNewForkliftTask-response>))
  (cl:+ 0
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <CreateNewForkliftTask-response>))
  "Converts a ROS message object to a list"
  (cl:list 'CreateNewForkliftTask-response
    (cl:cons ':feedback (feedback msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'CreateNewForkliftTask)))
  'CreateNewForkliftTask-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'CreateNewForkliftTask)))
  'CreateNewForkliftTask-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'CreateNewForkliftTask)))
  "Returns string type for a service object of type '<CreateNewForkliftTask>"
  "scheduling_msgs/CreateNewForkliftTask")