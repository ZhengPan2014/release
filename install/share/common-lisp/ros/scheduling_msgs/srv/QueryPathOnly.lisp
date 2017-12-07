; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude QueryPathOnly-request.msg.html

(cl:defclass <QueryPathOnly-request> (roslisp-msg-protocol:ros-message)
  ((agvID
    :reader agvID
    :initarg :agvID
    :type cl:integer
    :initform 0)
   (agvPos
    :reader agvPos
    :initarg :agvPos
    :type geometry_msgs-msg:Pose2D
    :initform (cl:make-instance 'geometry_msgs-msg:Pose2D))
   (goalPos
    :reader goalPos
    :initarg :goalPos
    :type geometry_msgs-msg:Pose2D
    :initform (cl:make-instance 'geometry_msgs-msg:Pose2D)))
)

(cl:defclass QueryPathOnly-request (<QueryPathOnly-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <QueryPathOnly-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'QueryPathOnly-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<QueryPathOnly-request> is deprecated: use scheduling_msgs-srv:QueryPathOnly-request instead.")))

(cl:ensure-generic-function 'agvID-val :lambda-list '(m))
(cl:defmethod agvID-val ((m <QueryPathOnly-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:agvID-val is deprecated.  Use scheduling_msgs-srv:agvID instead.")
  (agvID m))

(cl:ensure-generic-function 'agvPos-val :lambda-list '(m))
(cl:defmethod agvPos-val ((m <QueryPathOnly-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:agvPos-val is deprecated.  Use scheduling_msgs-srv:agvPos instead.")
  (agvPos m))

(cl:ensure-generic-function 'goalPos-val :lambda-list '(m))
(cl:defmethod goalPos-val ((m <QueryPathOnly-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:goalPos-val is deprecated.  Use scheduling_msgs-srv:goalPos instead.")
  (goalPos m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <QueryPathOnly-request>) ostream)
  "Serializes a message object of type '<QueryPathOnly-request>"
  (cl:let* ((signed (cl:slot-value msg 'agvID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'agvPos) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'goalPos) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <QueryPathOnly-request>) istream)
  "Deserializes a message object of type '<QueryPathOnly-request>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'agvID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'agvPos) istream)
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'goalPos) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<QueryPathOnly-request>)))
  "Returns string type for a service object of type '<QueryPathOnly-request>"
  "scheduling_msgs/QueryPathOnlyRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'QueryPathOnly-request)))
  "Returns string type for a service object of type 'QueryPathOnly-request"
  "scheduling_msgs/QueryPathOnlyRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<QueryPathOnly-request>)))
  "Returns md5sum for a message object of type '<QueryPathOnly-request>"
  "1405c334a431797812c1007b03f031ec")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'QueryPathOnly-request)))
  "Returns md5sum for a message object of type 'QueryPathOnly-request"
  "1405c334a431797812c1007b03f031ec")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<QueryPathOnly-request>)))
  "Returns full string definition for message of type '<QueryPathOnly-request>"
  (cl:format cl:nil "int32 agvID~%geometry_msgs/Pose2D agvPos~%geometry_msgs/Pose2D goalPos~%~%================================================================================~%MSG: geometry_msgs/Pose2D~%# This expresses a position and orientation on a 2D manifold.~%~%float64 x~%float64 y~%float64 theta~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'QueryPathOnly-request)))
  "Returns full string definition for message of type 'QueryPathOnly-request"
  (cl:format cl:nil "int32 agvID~%geometry_msgs/Pose2D agvPos~%geometry_msgs/Pose2D goalPos~%~%================================================================================~%MSG: geometry_msgs/Pose2D~%# This expresses a position and orientation on a 2D manifold.~%~%float64 x~%float64 y~%float64 theta~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <QueryPathOnly-request>))
  (cl:+ 0
     4
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'agvPos))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'goalPos))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <QueryPathOnly-request>))
  "Converts a ROS message object to a list"
  (cl:list 'QueryPathOnly-request
    (cl:cons ':agvID (agvID msg))
    (cl:cons ':agvPos (agvPos msg))
    (cl:cons ':goalPos (goalPos msg))
))
;//! \htmlinclude QueryPathOnly-response.msg.html

(cl:defclass <QueryPathOnly-response> (roslisp-msg-protocol:ros-message)
  ((isValid
    :reader isValid
    :initarg :isValid
    :type cl:boolean
    :initform cl:nil))
)

(cl:defclass QueryPathOnly-response (<QueryPathOnly-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <QueryPathOnly-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'QueryPathOnly-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<QueryPathOnly-response> is deprecated: use scheduling_msgs-srv:QueryPathOnly-response instead.")))

(cl:ensure-generic-function 'isValid-val :lambda-list '(m))
(cl:defmethod isValid-val ((m <QueryPathOnly-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:isValid-val is deprecated.  Use scheduling_msgs-srv:isValid instead.")
  (isValid m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <QueryPathOnly-response>) ostream)
  "Serializes a message object of type '<QueryPathOnly-response>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'isValid) 1 0)) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <QueryPathOnly-response>) istream)
  "Deserializes a message object of type '<QueryPathOnly-response>"
    (cl:setf (cl:slot-value msg 'isValid) (cl:not (cl:zerop (cl:read-byte istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<QueryPathOnly-response>)))
  "Returns string type for a service object of type '<QueryPathOnly-response>"
  "scheduling_msgs/QueryPathOnlyResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'QueryPathOnly-response)))
  "Returns string type for a service object of type 'QueryPathOnly-response"
  "scheduling_msgs/QueryPathOnlyResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<QueryPathOnly-response>)))
  "Returns md5sum for a message object of type '<QueryPathOnly-response>"
  "1405c334a431797812c1007b03f031ec")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'QueryPathOnly-response)))
  "Returns md5sum for a message object of type 'QueryPathOnly-response"
  "1405c334a431797812c1007b03f031ec")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<QueryPathOnly-response>)))
  "Returns full string definition for message of type '<QueryPathOnly-response>"
  (cl:format cl:nil "bool isValid~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'QueryPathOnly-response)))
  "Returns full string definition for message of type 'QueryPathOnly-response"
  (cl:format cl:nil "bool isValid~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <QueryPathOnly-response>))
  (cl:+ 0
     1
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <QueryPathOnly-response>))
  "Converts a ROS message object to a list"
  (cl:list 'QueryPathOnly-response
    (cl:cons ':isValid (isValid msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'QueryPathOnly)))
  'QueryPathOnly-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'QueryPathOnly)))
  'QueryPathOnly-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'QueryPathOnly)))
  "Returns string type for a service object of type '<QueryPathOnly>"
  "scheduling_msgs/QueryPathOnly")