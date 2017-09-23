; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude QueryAGVPose-request.msg.html

(cl:defclass <QueryAGVPose-request> (roslisp-msg-protocol:ros-message)
  ((id
    :reader id
    :initarg :id
    :type cl:integer
    :initform 0))
)

(cl:defclass QueryAGVPose-request (<QueryAGVPose-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <QueryAGVPose-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'QueryAGVPose-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<QueryAGVPose-request> is deprecated: use scheduling_msgs-srv:QueryAGVPose-request instead.")))

(cl:ensure-generic-function 'id-val :lambda-list '(m))
(cl:defmethod id-val ((m <QueryAGVPose-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:id-val is deprecated.  Use scheduling_msgs-srv:id instead.")
  (id m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <QueryAGVPose-request>) ostream)
  "Serializes a message object of type '<QueryAGVPose-request>"
  (cl:let* ((signed (cl:slot-value msg 'id)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <QueryAGVPose-request>) istream)
  "Deserializes a message object of type '<QueryAGVPose-request>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'id) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<QueryAGVPose-request>)))
  "Returns string type for a service object of type '<QueryAGVPose-request>"
  "scheduling_msgs/QueryAGVPoseRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'QueryAGVPose-request)))
  "Returns string type for a service object of type 'QueryAGVPose-request"
  "scheduling_msgs/QueryAGVPoseRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<QueryAGVPose-request>)))
  "Returns md5sum for a message object of type '<QueryAGVPose-request>"
  "25cea3ea137cda52fb0ec38d9b842df0")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'QueryAGVPose-request)))
  "Returns md5sum for a message object of type 'QueryAGVPose-request"
  "25cea3ea137cda52fb0ec38d9b842df0")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<QueryAGVPose-request>)))
  "Returns full string definition for message of type '<QueryAGVPose-request>"
  (cl:format cl:nil "int32 id~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'QueryAGVPose-request)))
  "Returns full string definition for message of type 'QueryAGVPose-request"
  (cl:format cl:nil "int32 id~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <QueryAGVPose-request>))
  (cl:+ 0
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <QueryAGVPose-request>))
  "Converts a ROS message object to a list"
  (cl:list 'QueryAGVPose-request
    (cl:cons ':id (id msg))
))
;//! \htmlinclude QueryAGVPose-response.msg.html

(cl:defclass <QueryAGVPose-response> (roslisp-msg-protocol:ros-message)
  ((pose
    :reader pose
    :initarg :pose
    :type geometry_msgs-msg:PoseStamped
    :initform (cl:make-instance 'geometry_msgs-msg:PoseStamped)))
)

(cl:defclass QueryAGVPose-response (<QueryAGVPose-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <QueryAGVPose-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'QueryAGVPose-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<QueryAGVPose-response> is deprecated: use scheduling_msgs-srv:QueryAGVPose-response instead.")))

(cl:ensure-generic-function 'pose-val :lambda-list '(m))
(cl:defmethod pose-val ((m <QueryAGVPose-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:pose-val is deprecated.  Use scheduling_msgs-srv:pose instead.")
  (pose m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <QueryAGVPose-response>) ostream)
  "Serializes a message object of type '<QueryAGVPose-response>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'pose) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <QueryAGVPose-response>) istream)
  "Deserializes a message object of type '<QueryAGVPose-response>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'pose) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<QueryAGVPose-response>)))
  "Returns string type for a service object of type '<QueryAGVPose-response>"
  "scheduling_msgs/QueryAGVPoseResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'QueryAGVPose-response)))
  "Returns string type for a service object of type 'QueryAGVPose-response"
  "scheduling_msgs/QueryAGVPoseResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<QueryAGVPose-response>)))
  "Returns md5sum for a message object of type '<QueryAGVPose-response>"
  "25cea3ea137cda52fb0ec38d9b842df0")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'QueryAGVPose-response)))
  "Returns md5sum for a message object of type 'QueryAGVPose-response"
  "25cea3ea137cda52fb0ec38d9b842df0")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<QueryAGVPose-response>)))
  "Returns full string definition for message of type '<QueryAGVPose-response>"
  (cl:format cl:nil "geometry_msgs/PoseStamped pose~%~%~%================================================================================~%MSG: geometry_msgs/PoseStamped~%# A Pose with reference coordinate frame and timestamp~%Header header~%Pose pose~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'QueryAGVPose-response)))
  "Returns full string definition for message of type 'QueryAGVPose-response"
  (cl:format cl:nil "geometry_msgs/PoseStamped pose~%~%~%================================================================================~%MSG: geometry_msgs/PoseStamped~%# A Pose with reference coordinate frame and timestamp~%Header header~%Pose pose~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <QueryAGVPose-response>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'pose))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <QueryAGVPose-response>))
  "Converts a ROS message object to a list"
  (cl:list 'QueryAGVPose-response
    (cl:cons ':pose (pose msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'QueryAGVPose)))
  'QueryAGVPose-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'QueryAGVPose)))
  'QueryAGVPose-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'QueryAGVPose)))
  "Returns string type for a service object of type '<QueryAGVPose>"
  "scheduling_msgs/QueryAGVPose")