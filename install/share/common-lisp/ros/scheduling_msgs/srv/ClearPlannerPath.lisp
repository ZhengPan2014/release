; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude ClearPlannerPath-request.msg.html

(cl:defclass <ClearPlannerPath-request> (roslisp-msg-protocol:ros-message)
  ((pathID
    :reader pathID
    :initarg :pathID
    :type cl:integer
    :initform 0))
)

(cl:defclass ClearPlannerPath-request (<ClearPlannerPath-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <ClearPlannerPath-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'ClearPlannerPath-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<ClearPlannerPath-request> is deprecated: use scheduling_msgs-srv:ClearPlannerPath-request instead.")))

(cl:ensure-generic-function 'pathID-val :lambda-list '(m))
(cl:defmethod pathID-val ((m <ClearPlannerPath-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:pathID-val is deprecated.  Use scheduling_msgs-srv:pathID instead.")
  (pathID m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <ClearPlannerPath-request>) ostream)
  "Serializes a message object of type '<ClearPlannerPath-request>"
  (cl:let* ((signed (cl:slot-value msg 'pathID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <ClearPlannerPath-request>) istream)
  "Deserializes a message object of type '<ClearPlannerPath-request>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'pathID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<ClearPlannerPath-request>)))
  "Returns string type for a service object of type '<ClearPlannerPath-request>"
  "scheduling_msgs/ClearPlannerPathRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ClearPlannerPath-request)))
  "Returns string type for a service object of type 'ClearPlannerPath-request"
  "scheduling_msgs/ClearPlannerPathRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<ClearPlannerPath-request>)))
  "Returns md5sum for a message object of type '<ClearPlannerPath-request>"
  "1d4dc4e04a07da2647bb3169520a44c4")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'ClearPlannerPath-request)))
  "Returns md5sum for a message object of type 'ClearPlannerPath-request"
  "1d4dc4e04a07da2647bb3169520a44c4")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<ClearPlannerPath-request>)))
  "Returns full string definition for message of type '<ClearPlannerPath-request>"
  (cl:format cl:nil "int32 pathID~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'ClearPlannerPath-request)))
  "Returns full string definition for message of type 'ClearPlannerPath-request"
  (cl:format cl:nil "int32 pathID~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <ClearPlannerPath-request>))
  (cl:+ 0
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <ClearPlannerPath-request>))
  "Converts a ROS message object to a list"
  (cl:list 'ClearPlannerPath-request
    (cl:cons ':pathID (pathID msg))
))
;//! \htmlinclude ClearPlannerPath-response.msg.html

(cl:defclass <ClearPlannerPath-response> (roslisp-msg-protocol:ros-message)
  ((feedback
    :reader feedback
    :initarg :feedback
    :type cl:integer
    :initform 0))
)

(cl:defclass ClearPlannerPath-response (<ClearPlannerPath-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <ClearPlannerPath-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'ClearPlannerPath-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<ClearPlannerPath-response> is deprecated: use scheduling_msgs-srv:ClearPlannerPath-response instead.")))

(cl:ensure-generic-function 'feedback-val :lambda-list '(m))
(cl:defmethod feedback-val ((m <ClearPlannerPath-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:feedback-val is deprecated.  Use scheduling_msgs-srv:feedback instead.")
  (feedback m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <ClearPlannerPath-response>) ostream)
  "Serializes a message object of type '<ClearPlannerPath-response>"
  (cl:let* ((signed (cl:slot-value msg 'feedback)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <ClearPlannerPath-response>) istream)
  "Deserializes a message object of type '<ClearPlannerPath-response>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'feedback) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<ClearPlannerPath-response>)))
  "Returns string type for a service object of type '<ClearPlannerPath-response>"
  "scheduling_msgs/ClearPlannerPathResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ClearPlannerPath-response)))
  "Returns string type for a service object of type 'ClearPlannerPath-response"
  "scheduling_msgs/ClearPlannerPathResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<ClearPlannerPath-response>)))
  "Returns md5sum for a message object of type '<ClearPlannerPath-response>"
  "1d4dc4e04a07da2647bb3169520a44c4")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'ClearPlannerPath-response)))
  "Returns md5sum for a message object of type 'ClearPlannerPath-response"
  "1d4dc4e04a07da2647bb3169520a44c4")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<ClearPlannerPath-response>)))
  "Returns full string definition for message of type '<ClearPlannerPath-response>"
  (cl:format cl:nil "int32 feedback~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'ClearPlannerPath-response)))
  "Returns full string definition for message of type 'ClearPlannerPath-response"
  (cl:format cl:nil "int32 feedback~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <ClearPlannerPath-response>))
  (cl:+ 0
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <ClearPlannerPath-response>))
  "Converts a ROS message object to a list"
  (cl:list 'ClearPlannerPath-response
    (cl:cons ':feedback (feedback msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'ClearPlannerPath)))
  'ClearPlannerPath-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'ClearPlannerPath)))
  'ClearPlannerPath-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ClearPlannerPath)))
  "Returns string type for a service object of type '<ClearPlannerPath>"
  "scheduling_msgs/ClearPlannerPath")