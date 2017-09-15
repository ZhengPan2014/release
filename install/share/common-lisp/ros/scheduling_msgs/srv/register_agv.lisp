; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude register_agv-request.msg.html

(cl:defclass <register_agv-request> (roslisp-msg-protocol:ros-message)
  ((id
    :reader id
    :initarg :id
    :type cl:integer
    :initform 0)
   (type
    :reader type
    :initarg :type
    :type cl:integer
    :initform 0)
   (name
    :reader name
    :initarg :name
    :type cl:string
    :initform "")
   (charging
    :reader charging
    :initarg :charging
    :type cl:boolean
    :initform cl:nil))
)

(cl:defclass register_agv-request (<register_agv-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <register_agv-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'register_agv-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<register_agv-request> is deprecated: use scheduling_msgs-srv:register_agv-request instead.")))

(cl:ensure-generic-function 'id-val :lambda-list '(m))
(cl:defmethod id-val ((m <register_agv-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:id-val is deprecated.  Use scheduling_msgs-srv:id instead.")
  (id m))

(cl:ensure-generic-function 'type-val :lambda-list '(m))
(cl:defmethod type-val ((m <register_agv-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:type-val is deprecated.  Use scheduling_msgs-srv:type instead.")
  (type m))

(cl:ensure-generic-function 'name-val :lambda-list '(m))
(cl:defmethod name-val ((m <register_agv-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:name-val is deprecated.  Use scheduling_msgs-srv:name instead.")
  (name m))

(cl:ensure-generic-function 'charging-val :lambda-list '(m))
(cl:defmethod charging-val ((m <register_agv-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:charging-val is deprecated.  Use scheduling_msgs-srv:charging instead.")
  (charging m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <register_agv-request>) ostream)
  "Serializes a message object of type '<register_agv-request>"
  (cl:let* ((signed (cl:slot-value msg 'id)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'type)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'name))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'name))
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'charging) 1 0)) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <register_agv-request>) istream)
  "Deserializes a message object of type '<register_agv-request>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'id) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'type) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'name) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'name) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:setf (cl:slot-value msg 'charging) (cl:not (cl:zerop (cl:read-byte istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<register_agv-request>)))
  "Returns string type for a service object of type '<register_agv-request>"
  "scheduling_msgs/register_agvRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'register_agv-request)))
  "Returns string type for a service object of type 'register_agv-request"
  "scheduling_msgs/register_agvRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<register_agv-request>)))
  "Returns md5sum for a message object of type '<register_agv-request>"
  "714c2174858e231e7d345289f3b87caa")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'register_agv-request)))
  "Returns md5sum for a message object of type 'register_agv-request"
  "714c2174858e231e7d345289f3b87caa")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<register_agv-request>)))
  "Returns full string definition for message of type '<register_agv-request>"
  (cl:format cl:nil "int32 id~%int32 type~%string name~%bool   charging~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'register_agv-request)))
  "Returns full string definition for message of type 'register_agv-request"
  (cl:format cl:nil "int32 id~%int32 type~%string name~%bool   charging~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <register_agv-request>))
  (cl:+ 0
     4
     4
     4 (cl:length (cl:slot-value msg 'name))
     1
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <register_agv-request>))
  "Converts a ROS message object to a list"
  (cl:list 'register_agv-request
    (cl:cons ':id (id msg))
    (cl:cons ':type (type msg))
    (cl:cons ':name (name msg))
    (cl:cons ':charging (charging msg))
))
;//! \htmlinclude register_agv-response.msg.html

(cl:defclass <register_agv-response> (roslisp-msg-protocol:ros-message)
  ((res
    :reader res
    :initarg :res
    :type cl:integer
    :initform 0))
)

(cl:defclass register_agv-response (<register_agv-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <register_agv-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'register_agv-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<register_agv-response> is deprecated: use scheduling_msgs-srv:register_agv-response instead.")))

(cl:ensure-generic-function 'res-val :lambda-list '(m))
(cl:defmethod res-val ((m <register_agv-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:res-val is deprecated.  Use scheduling_msgs-srv:res instead.")
  (res m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <register_agv-response>) ostream)
  "Serializes a message object of type '<register_agv-response>"
  (cl:let* ((signed (cl:slot-value msg 'res)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <register_agv-response>) istream)
  "Deserializes a message object of type '<register_agv-response>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'res) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<register_agv-response>)))
  "Returns string type for a service object of type '<register_agv-response>"
  "scheduling_msgs/register_agvResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'register_agv-response)))
  "Returns string type for a service object of type 'register_agv-response"
  "scheduling_msgs/register_agvResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<register_agv-response>)))
  "Returns md5sum for a message object of type '<register_agv-response>"
  "714c2174858e231e7d345289f3b87caa")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'register_agv-response)))
  "Returns md5sum for a message object of type 'register_agv-response"
  "714c2174858e231e7d345289f3b87caa")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<register_agv-response>)))
  "Returns full string definition for message of type '<register_agv-response>"
  (cl:format cl:nil "int32 res~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'register_agv-response)))
  "Returns full string definition for message of type 'register_agv-response"
  (cl:format cl:nil "int32 res~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <register_agv-response>))
  (cl:+ 0
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <register_agv-response>))
  "Converts a ROS message object to a list"
  (cl:list 'register_agv-response
    (cl:cons ':res (res msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'register_agv)))
  'register_agv-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'register_agv)))
  'register_agv-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'register_agv)))
  "Returns string type for a service object of type '<register_agv>"
  "scheduling_msgs/register_agv")