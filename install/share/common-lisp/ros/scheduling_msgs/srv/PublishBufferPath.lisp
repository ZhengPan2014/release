; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude PublishBufferPath-request.msg.html

(cl:defclass <PublishBufferPath-request> (roslisp-msg-protocol:ros-message)
  ((bufferID
    :reader bufferID
    :initarg :bufferID
    :type cl:integer
    :initform 0))
)

(cl:defclass PublishBufferPath-request (<PublishBufferPath-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <PublishBufferPath-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'PublishBufferPath-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<PublishBufferPath-request> is deprecated: use scheduling_msgs-srv:PublishBufferPath-request instead.")))

(cl:ensure-generic-function 'bufferID-val :lambda-list '(m))
(cl:defmethod bufferID-val ((m <PublishBufferPath-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:bufferID-val is deprecated.  Use scheduling_msgs-srv:bufferID instead.")
  (bufferID m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <PublishBufferPath-request>) ostream)
  "Serializes a message object of type '<PublishBufferPath-request>"
  (cl:let* ((signed (cl:slot-value msg 'bufferID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <PublishBufferPath-request>) istream)
  "Deserializes a message object of type '<PublishBufferPath-request>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'bufferID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<PublishBufferPath-request>)))
  "Returns string type for a service object of type '<PublishBufferPath-request>"
  "scheduling_msgs/PublishBufferPathRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'PublishBufferPath-request)))
  "Returns string type for a service object of type 'PublishBufferPath-request"
  "scheduling_msgs/PublishBufferPathRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<PublishBufferPath-request>)))
  "Returns md5sum for a message object of type '<PublishBufferPath-request>"
  "dc3812d2f9bd7e262d95135164970230")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'PublishBufferPath-request)))
  "Returns md5sum for a message object of type 'PublishBufferPath-request"
  "dc3812d2f9bd7e262d95135164970230")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<PublishBufferPath-request>)))
  "Returns full string definition for message of type '<PublishBufferPath-request>"
  (cl:format cl:nil "int32 bufferID~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'PublishBufferPath-request)))
  "Returns full string definition for message of type 'PublishBufferPath-request"
  (cl:format cl:nil "int32 bufferID~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <PublishBufferPath-request>))
  (cl:+ 0
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <PublishBufferPath-request>))
  "Converts a ROS message object to a list"
  (cl:list 'PublishBufferPath-request
    (cl:cons ':bufferID (bufferID msg))
))
;//! \htmlinclude PublishBufferPath-response.msg.html

(cl:defclass <PublishBufferPath-response> (roslisp-msg-protocol:ros-message)
  ((success
    :reader success
    :initarg :success
    :type cl:boolean
    :initform cl:nil))
)

(cl:defclass PublishBufferPath-response (<PublishBufferPath-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <PublishBufferPath-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'PublishBufferPath-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<PublishBufferPath-response> is deprecated: use scheduling_msgs-srv:PublishBufferPath-response instead.")))

(cl:ensure-generic-function 'success-val :lambda-list '(m))
(cl:defmethod success-val ((m <PublishBufferPath-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:success-val is deprecated.  Use scheduling_msgs-srv:success instead.")
  (success m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <PublishBufferPath-response>) ostream)
  "Serializes a message object of type '<PublishBufferPath-response>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'success) 1 0)) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <PublishBufferPath-response>) istream)
  "Deserializes a message object of type '<PublishBufferPath-response>"
    (cl:setf (cl:slot-value msg 'success) (cl:not (cl:zerop (cl:read-byte istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<PublishBufferPath-response>)))
  "Returns string type for a service object of type '<PublishBufferPath-response>"
  "scheduling_msgs/PublishBufferPathResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'PublishBufferPath-response)))
  "Returns string type for a service object of type 'PublishBufferPath-response"
  "scheduling_msgs/PublishBufferPathResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<PublishBufferPath-response>)))
  "Returns md5sum for a message object of type '<PublishBufferPath-response>"
  "dc3812d2f9bd7e262d95135164970230")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'PublishBufferPath-response)))
  "Returns md5sum for a message object of type 'PublishBufferPath-response"
  "dc3812d2f9bd7e262d95135164970230")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<PublishBufferPath-response>)))
  "Returns full string definition for message of type '<PublishBufferPath-response>"
  (cl:format cl:nil "bool success~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'PublishBufferPath-response)))
  "Returns full string definition for message of type 'PublishBufferPath-response"
  (cl:format cl:nil "bool success~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <PublishBufferPath-response>))
  (cl:+ 0
     1
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <PublishBufferPath-response>))
  "Converts a ROS message object to a list"
  (cl:list 'PublishBufferPath-response
    (cl:cons ':success (success msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'PublishBufferPath)))
  'PublishBufferPath-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'PublishBufferPath)))
  'PublishBufferPath-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'PublishBufferPath)))
  "Returns string type for a service object of type '<PublishBufferPath>"
  "scheduling_msgs/PublishBufferPath")