; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude CancelPath-request.msg.html

(cl:defclass <CancelPath-request> (roslisp-msg-protocol:ros-message)
  ((agvID
    :reader agvID
    :initarg :agvID
    :type cl:integer
    :initform 0)
   (pathID
    :reader pathID
    :initarg :pathID
    :type cl:integer
    :initform 0))
)

(cl:defclass CancelPath-request (<CancelPath-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <CancelPath-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'CancelPath-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<CancelPath-request> is deprecated: use scheduling_msgs-srv:CancelPath-request instead.")))

(cl:ensure-generic-function 'agvID-val :lambda-list '(m))
(cl:defmethod agvID-val ((m <CancelPath-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:agvID-val is deprecated.  Use scheduling_msgs-srv:agvID instead.")
  (agvID m))

(cl:ensure-generic-function 'pathID-val :lambda-list '(m))
(cl:defmethod pathID-val ((m <CancelPath-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:pathID-val is deprecated.  Use scheduling_msgs-srv:pathID instead.")
  (pathID m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <CancelPath-request>) ostream)
  "Serializes a message object of type '<CancelPath-request>"
  (cl:let* ((signed (cl:slot-value msg 'agvID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'pathID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <CancelPath-request>) istream)
  "Deserializes a message object of type '<CancelPath-request>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'agvID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'pathID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<CancelPath-request>)))
  "Returns string type for a service object of type '<CancelPath-request>"
  "scheduling_msgs/CancelPathRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'CancelPath-request)))
  "Returns string type for a service object of type 'CancelPath-request"
  "scheduling_msgs/CancelPathRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<CancelPath-request>)))
  "Returns md5sum for a message object of type '<CancelPath-request>"
  "7da36ca53b57c9ab8c96a055f5a1d1e1")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'CancelPath-request)))
  "Returns md5sum for a message object of type 'CancelPath-request"
  "7da36ca53b57c9ab8c96a055f5a1d1e1")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<CancelPath-request>)))
  "Returns full string definition for message of type '<CancelPath-request>"
  (cl:format cl:nil "int32 agvID~%int32 pathID~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'CancelPath-request)))
  "Returns full string definition for message of type 'CancelPath-request"
  (cl:format cl:nil "int32 agvID~%int32 pathID~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <CancelPath-request>))
  (cl:+ 0
     4
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <CancelPath-request>))
  "Converts a ROS message object to a list"
  (cl:list 'CancelPath-request
    (cl:cons ':agvID (agvID msg))
    (cl:cons ':pathID (pathID msg))
))
;//! \htmlinclude CancelPath-response.msg.html

(cl:defclass <CancelPath-response> (roslisp-msg-protocol:ros-message)
  ((feedback
    :reader feedback
    :initarg :feedback
    :type cl:integer
    :initform 0))
)

(cl:defclass CancelPath-response (<CancelPath-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <CancelPath-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'CancelPath-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<CancelPath-response> is deprecated: use scheduling_msgs-srv:CancelPath-response instead.")))

(cl:ensure-generic-function 'feedback-val :lambda-list '(m))
(cl:defmethod feedback-val ((m <CancelPath-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:feedback-val is deprecated.  Use scheduling_msgs-srv:feedback instead.")
  (feedback m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <CancelPath-response>) ostream)
  "Serializes a message object of type '<CancelPath-response>"
  (cl:let* ((signed (cl:slot-value msg 'feedback)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <CancelPath-response>) istream)
  "Deserializes a message object of type '<CancelPath-response>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'feedback) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<CancelPath-response>)))
  "Returns string type for a service object of type '<CancelPath-response>"
  "scheduling_msgs/CancelPathResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'CancelPath-response)))
  "Returns string type for a service object of type 'CancelPath-response"
  "scheduling_msgs/CancelPathResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<CancelPath-response>)))
  "Returns md5sum for a message object of type '<CancelPath-response>"
  "7da36ca53b57c9ab8c96a055f5a1d1e1")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'CancelPath-response)))
  "Returns md5sum for a message object of type 'CancelPath-response"
  "7da36ca53b57c9ab8c96a055f5a1d1e1")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<CancelPath-response>)))
  "Returns full string definition for message of type '<CancelPath-response>"
  (cl:format cl:nil "int32 feedback~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'CancelPath-response)))
  "Returns full string definition for message of type 'CancelPath-response"
  (cl:format cl:nil "int32 feedback~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <CancelPath-response>))
  (cl:+ 0
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <CancelPath-response>))
  "Converts a ROS message object to a list"
  (cl:list 'CancelPath-response
    (cl:cons ':feedback (feedback msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'CancelPath)))
  'CancelPath-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'CancelPath)))
  'CancelPath-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'CancelPath)))
  "Returns string type for a service object of type '<CancelPath>"
  "scheduling_msgs/CancelPath")