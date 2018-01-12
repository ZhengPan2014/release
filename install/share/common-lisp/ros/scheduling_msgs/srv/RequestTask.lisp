; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude RequestTask-request.msg.html

(cl:defclass <RequestTask-request> (roslisp-msg-protocol:ros-message)
  ((agvID
    :reader agvID
    :initarg :agvID
    :type cl:integer
    :initform 0))
)

(cl:defclass RequestTask-request (<RequestTask-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <RequestTask-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'RequestTask-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<RequestTask-request> is deprecated: use scheduling_msgs-srv:RequestTask-request instead.")))

(cl:ensure-generic-function 'agvID-val :lambda-list '(m))
(cl:defmethod agvID-val ((m <RequestTask-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:agvID-val is deprecated.  Use scheduling_msgs-srv:agvID instead.")
  (agvID m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <RequestTask-request>) ostream)
  "Serializes a message object of type '<RequestTask-request>"
  (cl:let* ((signed (cl:slot-value msg 'agvID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <RequestTask-request>) istream)
  "Deserializes a message object of type '<RequestTask-request>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'agvID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<RequestTask-request>)))
  "Returns string type for a service object of type '<RequestTask-request>"
  "scheduling_msgs/RequestTaskRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'RequestTask-request)))
  "Returns string type for a service object of type 'RequestTask-request"
  "scheduling_msgs/RequestTaskRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<RequestTask-request>)))
  "Returns md5sum for a message object of type '<RequestTask-request>"
  "6d74112c93ec461d6c0075e4f344eb10")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'RequestTask-request)))
  "Returns md5sum for a message object of type 'RequestTask-request"
  "6d74112c93ec461d6c0075e4f344eb10")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<RequestTask-request>)))
  "Returns full string definition for message of type '<RequestTask-request>"
  (cl:format cl:nil "int32 agvID~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'RequestTask-request)))
  "Returns full string definition for message of type 'RequestTask-request"
  (cl:format cl:nil "int32 agvID~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <RequestTask-request>))
  (cl:+ 0
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <RequestTask-request>))
  "Converts a ROS message object to a list"
  (cl:list 'RequestTask-request
    (cl:cons ':agvID (agvID msg))
))
;//! \htmlinclude RequestTask-response.msg.html

(cl:defclass <RequestTask-response> (roslisp-msg-protocol:ros-message)
  ((isDispatchTask
    :reader isDispatchTask
    :initarg :isDispatchTask
    :type cl:boolean
    :initform cl:nil))
)

(cl:defclass RequestTask-response (<RequestTask-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <RequestTask-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'RequestTask-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<RequestTask-response> is deprecated: use scheduling_msgs-srv:RequestTask-response instead.")))

(cl:ensure-generic-function 'isDispatchTask-val :lambda-list '(m))
(cl:defmethod isDispatchTask-val ((m <RequestTask-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:isDispatchTask-val is deprecated.  Use scheduling_msgs-srv:isDispatchTask instead.")
  (isDispatchTask m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <RequestTask-response>) ostream)
  "Serializes a message object of type '<RequestTask-response>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'isDispatchTask) 1 0)) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <RequestTask-response>) istream)
  "Deserializes a message object of type '<RequestTask-response>"
    (cl:setf (cl:slot-value msg 'isDispatchTask) (cl:not (cl:zerop (cl:read-byte istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<RequestTask-response>)))
  "Returns string type for a service object of type '<RequestTask-response>"
  "scheduling_msgs/RequestTaskResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'RequestTask-response)))
  "Returns string type for a service object of type 'RequestTask-response"
  "scheduling_msgs/RequestTaskResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<RequestTask-response>)))
  "Returns md5sum for a message object of type '<RequestTask-response>"
  "6d74112c93ec461d6c0075e4f344eb10")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'RequestTask-response)))
  "Returns md5sum for a message object of type 'RequestTask-response"
  "6d74112c93ec461d6c0075e4f344eb10")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<RequestTask-response>)))
  "Returns full string definition for message of type '<RequestTask-response>"
  (cl:format cl:nil "bool isDispatchTask~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'RequestTask-response)))
  "Returns full string definition for message of type 'RequestTask-response"
  (cl:format cl:nil "bool isDispatchTask~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <RequestTask-response>))
  (cl:+ 0
     1
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <RequestTask-response>))
  "Converts a ROS message object to a list"
  (cl:list 'RequestTask-response
    (cl:cons ':isDispatchTask (isDispatchTask msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'RequestTask)))
  'RequestTask-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'RequestTask)))
  'RequestTask-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'RequestTask)))
  "Returns string type for a service object of type '<RequestTask>"
  "scheduling_msgs/RequestTask")