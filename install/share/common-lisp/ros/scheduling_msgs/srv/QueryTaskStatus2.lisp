; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude QueryTaskStatus2-request.msg.html

(cl:defclass <QueryTaskStatus2-request> (roslisp-msg-protocol:ros-message)
  ((task_id
    :reader task_id
    :initarg :task_id
    :type cl:integer
    :initform 0))
)

(cl:defclass QueryTaskStatus2-request (<QueryTaskStatus2-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <QueryTaskStatus2-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'QueryTaskStatus2-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<QueryTaskStatus2-request> is deprecated: use scheduling_msgs-srv:QueryTaskStatus2-request instead.")))

(cl:ensure-generic-function 'task_id-val :lambda-list '(m))
(cl:defmethod task_id-val ((m <QueryTaskStatus2-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:task_id-val is deprecated.  Use scheduling_msgs-srv:task_id instead.")
  (task_id m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <QueryTaskStatus2-request>) ostream)
  "Serializes a message object of type '<QueryTaskStatus2-request>"
  (cl:let* ((signed (cl:slot-value msg 'task_id)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <QueryTaskStatus2-request>) istream)
  "Deserializes a message object of type '<QueryTaskStatus2-request>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'task_id) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<QueryTaskStatus2-request>)))
  "Returns string type for a service object of type '<QueryTaskStatus2-request>"
  "scheduling_msgs/QueryTaskStatus2Request")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'QueryTaskStatus2-request)))
  "Returns string type for a service object of type 'QueryTaskStatus2-request"
  "scheduling_msgs/QueryTaskStatus2Request")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<QueryTaskStatus2-request>)))
  "Returns md5sum for a message object of type '<QueryTaskStatus2-request>"
  "7a5583fc59eb5013dd086a429f3f2d59")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'QueryTaskStatus2-request)))
  "Returns md5sum for a message object of type 'QueryTaskStatus2-request"
  "7a5583fc59eb5013dd086a429f3f2d59")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<QueryTaskStatus2-request>)))
  "Returns full string definition for message of type '<QueryTaskStatus2-request>"
  (cl:format cl:nil "int32 task_id~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'QueryTaskStatus2-request)))
  "Returns full string definition for message of type 'QueryTaskStatus2-request"
  (cl:format cl:nil "int32 task_id~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <QueryTaskStatus2-request>))
  (cl:+ 0
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <QueryTaskStatus2-request>))
  "Converts a ROS message object to a list"
  (cl:list 'QueryTaskStatus2-request
    (cl:cons ':task_id (task_id msg))
))
;//! \htmlinclude QueryTaskStatus2-response.msg.html

(cl:defclass <QueryTaskStatus2-response> (roslisp-msg-protocol:ros-message)
  ((task_id
    :reader task_id
    :initarg :task_id
    :type cl:integer
    :initform 0)
   (agv_id
    :reader agv_id
    :initarg :agv_id
    :type cl:integer
    :initform 0)
   (loading_station
    :reader loading_station
    :initarg :loading_station
    :type cl:string
    :initform "")
   (unloading_sation
    :reader unloading_sation
    :initarg :unloading_sation
    :type cl:string
    :initform "")
   (status
    :reader status
    :initarg :status
    :type cl:integer
    :initform 0)
   (text
    :reader text
    :initarg :text
    :type cl:string
    :initform ""))
)

(cl:defclass QueryTaskStatus2-response (<QueryTaskStatus2-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <QueryTaskStatus2-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'QueryTaskStatus2-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<QueryTaskStatus2-response> is deprecated: use scheduling_msgs-srv:QueryTaskStatus2-response instead.")))

(cl:ensure-generic-function 'task_id-val :lambda-list '(m))
(cl:defmethod task_id-val ((m <QueryTaskStatus2-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:task_id-val is deprecated.  Use scheduling_msgs-srv:task_id instead.")
  (task_id m))

(cl:ensure-generic-function 'agv_id-val :lambda-list '(m))
(cl:defmethod agv_id-val ((m <QueryTaskStatus2-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:agv_id-val is deprecated.  Use scheduling_msgs-srv:agv_id instead.")
  (agv_id m))

(cl:ensure-generic-function 'loading_station-val :lambda-list '(m))
(cl:defmethod loading_station-val ((m <QueryTaskStatus2-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:loading_station-val is deprecated.  Use scheduling_msgs-srv:loading_station instead.")
  (loading_station m))

(cl:ensure-generic-function 'unloading_sation-val :lambda-list '(m))
(cl:defmethod unloading_sation-val ((m <QueryTaskStatus2-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:unloading_sation-val is deprecated.  Use scheduling_msgs-srv:unloading_sation instead.")
  (unloading_sation m))

(cl:ensure-generic-function 'status-val :lambda-list '(m))
(cl:defmethod status-val ((m <QueryTaskStatus2-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:status-val is deprecated.  Use scheduling_msgs-srv:status instead.")
  (status m))

(cl:ensure-generic-function 'text-val :lambda-list '(m))
(cl:defmethod text-val ((m <QueryTaskStatus2-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:text-val is deprecated.  Use scheduling_msgs-srv:text instead.")
  (text m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <QueryTaskStatus2-response>) ostream)
  "Serializes a message object of type '<QueryTaskStatus2-response>"
  (cl:let* ((signed (cl:slot-value msg 'task_id)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'agv_id)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'loading_station))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'loading_station))
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'unloading_sation))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'unloading_sation))
  (cl:let* ((signed (cl:slot-value msg 'status)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'text))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'text))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <QueryTaskStatus2-response>) istream)
  "Deserializes a message object of type '<QueryTaskStatus2-response>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'task_id) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'agv_id) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
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
      (cl:setf (cl:slot-value msg 'unloading_sation) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'unloading_sation) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'status) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'text) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'text) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<QueryTaskStatus2-response>)))
  "Returns string type for a service object of type '<QueryTaskStatus2-response>"
  "scheduling_msgs/QueryTaskStatus2Response")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'QueryTaskStatus2-response)))
  "Returns string type for a service object of type 'QueryTaskStatus2-response"
  "scheduling_msgs/QueryTaskStatus2Response")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<QueryTaskStatus2-response>)))
  "Returns md5sum for a message object of type '<QueryTaskStatus2-response>"
  "7a5583fc59eb5013dd086a429f3f2d59")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'QueryTaskStatus2-response)))
  "Returns md5sum for a message object of type 'QueryTaskStatus2-response"
  "7a5583fc59eb5013dd086a429f3f2d59")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<QueryTaskStatus2-response>)))
  "Returns full string definition for message of type '<QueryTaskStatus2-response>"
  (cl:format cl:nil "int32 task_id~%int32 agv_id~%string loading_station~%string unloading_sation~%int32 status~%string text~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'QueryTaskStatus2-response)))
  "Returns full string definition for message of type 'QueryTaskStatus2-response"
  (cl:format cl:nil "int32 task_id~%int32 agv_id~%string loading_station~%string unloading_sation~%int32 status~%string text~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <QueryTaskStatus2-response>))
  (cl:+ 0
     4
     4
     4 (cl:length (cl:slot-value msg 'loading_station))
     4 (cl:length (cl:slot-value msg 'unloading_sation))
     4
     4 (cl:length (cl:slot-value msg 'text))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <QueryTaskStatus2-response>))
  "Converts a ROS message object to a list"
  (cl:list 'QueryTaskStatus2-response
    (cl:cons ':task_id (task_id msg))
    (cl:cons ':agv_id (agv_id msg))
    (cl:cons ':loading_station (loading_station msg))
    (cl:cons ':unloading_sation (unloading_sation msg))
    (cl:cons ':status (status msg))
    (cl:cons ':text (text msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'QueryTaskStatus2)))
  'QueryTaskStatus2-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'QueryTaskStatus2)))
  'QueryTaskStatus2-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'QueryTaskStatus2)))
  "Returns string type for a service object of type '<QueryTaskStatus2>"
  "scheduling_msgs/QueryTaskStatus2")