; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude ReportNavigationControlStatus-request.msg.html

(cl:defclass <ReportNavigationControlStatus-request> (roslisp-msg-protocol:ros-message)
  ((status
    :reader status
    :initarg :status
    :type cl:fixnum
    :initform 0)
   (waypoint_name
    :reader waypoint_name
    :initarg :waypoint_name
    :type cl:string
    :initform ""))
)

(cl:defclass ReportNavigationControlStatus-request (<ReportNavigationControlStatus-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <ReportNavigationControlStatus-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'ReportNavigationControlStatus-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<ReportNavigationControlStatus-request> is deprecated: use scheduling_msgs-srv:ReportNavigationControlStatus-request instead.")))

(cl:ensure-generic-function 'status-val :lambda-list '(m))
(cl:defmethod status-val ((m <ReportNavigationControlStatus-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:status-val is deprecated.  Use scheduling_msgs-srv:status instead.")
  (status m))

(cl:ensure-generic-function 'waypoint_name-val :lambda-list '(m))
(cl:defmethod waypoint_name-val ((m <ReportNavigationControlStatus-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:waypoint_name-val is deprecated.  Use scheduling_msgs-srv:waypoint_name instead.")
  (waypoint_name m))
(cl:defmethod roslisp-msg-protocol:symbol-codes ((msg-type (cl:eql '<ReportNavigationControlStatus-request>)))
    "Constants for message type '<ReportNavigationControlStatus-request>"
  '((:ERROR . -1)
    (:IDLING . 0)
    (:RUNNING . 1)
    (:PAUSED . 2)
    (:COMPLETED . 3)
    (:CANCELLED . 4)
    (:SUB_CANCELLED . 5))
)
(cl:defmethod roslisp-msg-protocol:symbol-codes ((msg-type (cl:eql 'ReportNavigationControlStatus-request)))
    "Constants for message type 'ReportNavigationControlStatus-request"
  '((:ERROR . -1)
    (:IDLING . 0)
    (:RUNNING . 1)
    (:PAUSED . 2)
    (:COMPLETED . 3)
    (:CANCELLED . 4)
    (:SUB_CANCELLED . 5))
)
(cl:defmethod roslisp-msg-protocol:serialize ((msg <ReportNavigationControlStatus-request>) ostream)
  "Serializes a message object of type '<ReportNavigationControlStatus-request>"
  (cl:let* ((signed (cl:slot-value msg 'status)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 256) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    )
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'waypoint_name))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'waypoint_name))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <ReportNavigationControlStatus-request>) istream)
  "Deserializes a message object of type '<ReportNavigationControlStatus-request>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'status) (cl:if (cl:< unsigned 128) unsigned (cl:- unsigned 256))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'waypoint_name) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'waypoint_name) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<ReportNavigationControlStatus-request>)))
  "Returns string type for a service object of type '<ReportNavigationControlStatus-request>"
  "scheduling_msgs/ReportNavigationControlStatusRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ReportNavigationControlStatus-request)))
  "Returns string type for a service object of type 'ReportNavigationControlStatus-request"
  "scheduling_msgs/ReportNavigationControlStatusRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<ReportNavigationControlStatus-request>)))
  "Returns md5sum for a message object of type '<ReportNavigationControlStatus-request>"
  "36e9fda8440e71d1bf5663b853455b22")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'ReportNavigationControlStatus-request)))
  "Returns md5sum for a message object of type 'ReportNavigationControlStatus-request"
  "36e9fda8440e71d1bf5663b853455b22")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<ReportNavigationControlStatus-request>)))
  "Returns full string definition for message of type '<ReportNavigationControlStatus-request>"
  (cl:format cl:nil "int8 status~%~%int8 ERROR     = -1~%int8 IDLING    = 0~%int8 RUNNING   = 1~%int8 PAUSED    = 2~%int8 COMPLETED = 3~%int8 CANCELLED = 4~%int8 SUB_CANCELLED = 5~%~%~%string waypoint_name~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'ReportNavigationControlStatus-request)))
  "Returns full string definition for message of type 'ReportNavigationControlStatus-request"
  (cl:format cl:nil "int8 status~%~%int8 ERROR     = -1~%int8 IDLING    = 0~%int8 RUNNING   = 1~%int8 PAUSED    = 2~%int8 COMPLETED = 3~%int8 CANCELLED = 4~%int8 SUB_CANCELLED = 5~%~%~%string waypoint_name~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <ReportNavigationControlStatus-request>))
  (cl:+ 0
     1
     4 (cl:length (cl:slot-value msg 'waypoint_name))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <ReportNavigationControlStatus-request>))
  "Converts a ROS message object to a list"
  (cl:list 'ReportNavigationControlStatus-request
    (cl:cons ':status (status msg))
    (cl:cons ':waypoint_name (waypoint_name msg))
))
;//! \htmlinclude ReportNavigationControlStatus-response.msg.html

(cl:defclass <ReportNavigationControlStatus-response> (roslisp-msg-protocol:ros-message)
  ((received
    :reader received
    :initarg :received
    :type cl:boolean
    :initform cl:nil))
)

(cl:defclass ReportNavigationControlStatus-response (<ReportNavigationControlStatus-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <ReportNavigationControlStatus-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'ReportNavigationControlStatus-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<ReportNavigationControlStatus-response> is deprecated: use scheduling_msgs-srv:ReportNavigationControlStatus-response instead.")))

(cl:ensure-generic-function 'received-val :lambda-list '(m))
(cl:defmethod received-val ((m <ReportNavigationControlStatus-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:received-val is deprecated.  Use scheduling_msgs-srv:received instead.")
  (received m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <ReportNavigationControlStatus-response>) ostream)
  "Serializes a message object of type '<ReportNavigationControlStatus-response>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'received) 1 0)) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <ReportNavigationControlStatus-response>) istream)
  "Deserializes a message object of type '<ReportNavigationControlStatus-response>"
    (cl:setf (cl:slot-value msg 'received) (cl:not (cl:zerop (cl:read-byte istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<ReportNavigationControlStatus-response>)))
  "Returns string type for a service object of type '<ReportNavigationControlStatus-response>"
  "scheduling_msgs/ReportNavigationControlStatusResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ReportNavigationControlStatus-response)))
  "Returns string type for a service object of type 'ReportNavigationControlStatus-response"
  "scheduling_msgs/ReportNavigationControlStatusResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<ReportNavigationControlStatus-response>)))
  "Returns md5sum for a message object of type '<ReportNavigationControlStatus-response>"
  "36e9fda8440e71d1bf5663b853455b22")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'ReportNavigationControlStatus-response)))
  "Returns md5sum for a message object of type 'ReportNavigationControlStatus-response"
  "36e9fda8440e71d1bf5663b853455b22")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<ReportNavigationControlStatus-response>)))
  "Returns full string definition for message of type '<ReportNavigationControlStatus-response>"
  (cl:format cl:nil "bool received~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'ReportNavigationControlStatus-response)))
  "Returns full string definition for message of type 'ReportNavigationControlStatus-response"
  (cl:format cl:nil "bool received~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <ReportNavigationControlStatus-response>))
  (cl:+ 0
     1
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <ReportNavigationControlStatus-response>))
  "Converts a ROS message object to a list"
  (cl:list 'ReportNavigationControlStatus-response
    (cl:cons ':received (received msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'ReportNavigationControlStatus)))
  'ReportNavigationControlStatus-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'ReportNavigationControlStatus)))
  'ReportNavigationControlStatus-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ReportNavigationControlStatus)))
  "Returns string type for a service object of type '<ReportNavigationControlStatus>"
  "scheduling_msgs/ReportNavigationControlStatus")