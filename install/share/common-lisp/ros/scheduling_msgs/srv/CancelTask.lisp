; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude CancelTask-request.msg.html

(cl:defclass <CancelTask-request> (roslisp-msg-protocol:ros-message)
  ((id
    :reader id
    :initarg :id
    :type cl:integer
    :initform 0))
)

(cl:defclass CancelTask-request (<CancelTask-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <CancelTask-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'CancelTask-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<CancelTask-request> is deprecated: use scheduling_msgs-srv:CancelTask-request instead.")))

(cl:ensure-generic-function 'id-val :lambda-list '(m))
(cl:defmethod id-val ((m <CancelTask-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:id-val is deprecated.  Use scheduling_msgs-srv:id instead.")
  (id m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <CancelTask-request>) ostream)
  "Serializes a message object of type '<CancelTask-request>"
  (cl:let* ((signed (cl:slot-value msg 'id)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <CancelTask-request>) istream)
  "Deserializes a message object of type '<CancelTask-request>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'id) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<CancelTask-request>)))
  "Returns string type for a service object of type '<CancelTask-request>"
  "scheduling_msgs/CancelTaskRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'CancelTask-request)))
  "Returns string type for a service object of type 'CancelTask-request"
  "scheduling_msgs/CancelTaskRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<CancelTask-request>)))
  "Returns md5sum for a message object of type '<CancelTask-request>"
  "c66583786e60ff524f511d901ff09db8")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'CancelTask-request)))
  "Returns md5sum for a message object of type 'CancelTask-request"
  "c66583786e60ff524f511d901ff09db8")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<CancelTask-request>)))
  "Returns full string definition for message of type '<CancelTask-request>"
  (cl:format cl:nil "int32 id~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'CancelTask-request)))
  "Returns full string definition for message of type 'CancelTask-request"
  (cl:format cl:nil "int32 id~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <CancelTask-request>))
  (cl:+ 0
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <CancelTask-request>))
  "Converts a ROS message object to a list"
  (cl:list 'CancelTask-request
    (cl:cons ':id (id msg))
))
;//! \htmlinclude CancelTask-response.msg.html

(cl:defclass <CancelTask-response> (roslisp-msg-protocol:ros-message)
  ((feedback
    :reader feedback
    :initarg :feedback
    :type cl:integer
    :initform 0))
)

(cl:defclass CancelTask-response (<CancelTask-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <CancelTask-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'CancelTask-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<CancelTask-response> is deprecated: use scheduling_msgs-srv:CancelTask-response instead.")))

(cl:ensure-generic-function 'feedback-val :lambda-list '(m))
(cl:defmethod feedback-val ((m <CancelTask-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:feedback-val is deprecated.  Use scheduling_msgs-srv:feedback instead.")
  (feedback m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <CancelTask-response>) ostream)
  "Serializes a message object of type '<CancelTask-response>"
  (cl:let* ((signed (cl:slot-value msg 'feedback)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <CancelTask-response>) istream)
  "Deserializes a message object of type '<CancelTask-response>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'feedback) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<CancelTask-response>)))
  "Returns string type for a service object of type '<CancelTask-response>"
  "scheduling_msgs/CancelTaskResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'CancelTask-response)))
  "Returns string type for a service object of type 'CancelTask-response"
  "scheduling_msgs/CancelTaskResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<CancelTask-response>)))
  "Returns md5sum for a message object of type '<CancelTask-response>"
  "c66583786e60ff524f511d901ff09db8")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'CancelTask-response)))
  "Returns md5sum for a message object of type 'CancelTask-response"
  "c66583786e60ff524f511d901ff09db8")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<CancelTask-response>)))
  "Returns full string definition for message of type '<CancelTask-response>"
  (cl:format cl:nil "int32 feedback~%~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'CancelTask-response)))
  "Returns full string definition for message of type 'CancelTask-response"
  (cl:format cl:nil "int32 feedback~%~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <CancelTask-response>))
  (cl:+ 0
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <CancelTask-response>))
  "Converts a ROS message object to a list"
  (cl:list 'CancelTask-response
    (cl:cons ':feedback (feedback msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'CancelTask)))
  'CancelTask-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'CancelTask)))
  'CancelTask-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'CancelTask)))
  "Returns string type for a service object of type '<CancelTask>"
  "scheduling_msgs/CancelTask")