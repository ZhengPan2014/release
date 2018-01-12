; Auto-generated. Do not edit!


(cl:in-package pallet_recognition-srv)


;//! \htmlinclude DetectPallet-request.msg.html

(cl:defclass <DetectPallet-request> (roslisp-msg-protocol:ros-message)
  ((raw_pose
    :reader raw_pose
    :initarg :raw_pose
    :type geometry_msgs-msg:PoseWithCovarianceStamped
    :initform (cl:make-instance 'geometry_msgs-msg:PoseWithCovarianceStamped))
   (retry_times
    :reader retry_times
    :initarg :retry_times
    :type cl:integer
    :initform 0))
)

(cl:defclass DetectPallet-request (<DetectPallet-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <DetectPallet-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'DetectPallet-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name pallet_recognition-srv:<DetectPallet-request> is deprecated: use pallet_recognition-srv:DetectPallet-request instead.")))

(cl:ensure-generic-function 'raw_pose-val :lambda-list '(m))
(cl:defmethod raw_pose-val ((m <DetectPallet-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader pallet_recognition-srv:raw_pose-val is deprecated.  Use pallet_recognition-srv:raw_pose instead.")
  (raw_pose m))

(cl:ensure-generic-function 'retry_times-val :lambda-list '(m))
(cl:defmethod retry_times-val ((m <DetectPallet-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader pallet_recognition-srv:retry_times-val is deprecated.  Use pallet_recognition-srv:retry_times instead.")
  (retry_times m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <DetectPallet-request>) ostream)
  "Serializes a message object of type '<DetectPallet-request>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'raw_pose) ostream)
  (cl:let* ((signed (cl:slot-value msg 'retry_times)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <DetectPallet-request>) istream)
  "Deserializes a message object of type '<DetectPallet-request>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'raw_pose) istream)
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'retry_times) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<DetectPallet-request>)))
  "Returns string type for a service object of type '<DetectPallet-request>"
  "pallet_recognition/DetectPalletRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'DetectPallet-request)))
  "Returns string type for a service object of type 'DetectPallet-request"
  "pallet_recognition/DetectPalletRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<DetectPallet-request>)))
  "Returns md5sum for a message object of type '<DetectPallet-request>"
  "be52264672531f790ba66789a9749d0c")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'DetectPallet-request)))
  "Returns md5sum for a message object of type 'DetectPallet-request"
  "be52264672531f790ba66789a9749d0c")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<DetectPallet-request>)))
  "Returns full string definition for message of type '<DetectPallet-request>"
  (cl:format cl:nil "geometry_msgs/PoseWithCovarianceStamped raw_pose~%int32 retry_times~%~%================================================================================~%MSG: geometry_msgs/PoseWithCovarianceStamped~%# This expresses an estimated pose with a reference coordinate frame and timestamp~%~%Header header~%PoseWithCovariance pose~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/PoseWithCovariance~%# This represents a pose in free space with uncertainty.~%~%Pose pose~%~%# Row-major representation of the 6x6 covariance matrix~%# The orientation parameters use a fixed-axis representation.~%# In order, the parameters are:~%# (x, y, z, rotation about X axis, rotation about Y axis, rotation about Z axis)~%float64[36] covariance~%~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'DetectPallet-request)))
  "Returns full string definition for message of type 'DetectPallet-request"
  (cl:format cl:nil "geometry_msgs/PoseWithCovarianceStamped raw_pose~%int32 retry_times~%~%================================================================================~%MSG: geometry_msgs/PoseWithCovarianceStamped~%# This expresses an estimated pose with a reference coordinate frame and timestamp~%~%Header header~%PoseWithCovariance pose~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/PoseWithCovariance~%# This represents a pose in free space with uncertainty.~%~%Pose pose~%~%# Row-major representation of the 6x6 covariance matrix~%# The orientation parameters use a fixed-axis representation.~%# In order, the parameters are:~%# (x, y, z, rotation about X axis, rotation about Y axis, rotation about Z axis)~%float64[36] covariance~%~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <DetectPallet-request>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'raw_pose))
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <DetectPallet-request>))
  "Converts a ROS message object to a list"
  (cl:list 'DetectPallet-request
    (cl:cons ':raw_pose (raw_pose msg))
    (cl:cons ':retry_times (retry_times msg))
))
;//! \htmlinclude DetectPallet-response.msg.html

(cl:defclass <DetectPallet-response> (roslisp-msg-protocol:ros-message)
  ((success
    :reader success
    :initarg :success
    :type cl:boolean
    :initform cl:nil)
   (fine_pose
    :reader fine_pose
    :initarg :fine_pose
    :type geometry_msgs-msg:PoseStamped
    :initform (cl:make-instance 'geometry_msgs-msg:PoseStamped)))
)

(cl:defclass DetectPallet-response (<DetectPallet-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <DetectPallet-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'DetectPallet-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name pallet_recognition-srv:<DetectPallet-response> is deprecated: use pallet_recognition-srv:DetectPallet-response instead.")))

(cl:ensure-generic-function 'success-val :lambda-list '(m))
(cl:defmethod success-val ((m <DetectPallet-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader pallet_recognition-srv:success-val is deprecated.  Use pallet_recognition-srv:success instead.")
  (success m))

(cl:ensure-generic-function 'fine_pose-val :lambda-list '(m))
(cl:defmethod fine_pose-val ((m <DetectPallet-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader pallet_recognition-srv:fine_pose-val is deprecated.  Use pallet_recognition-srv:fine_pose instead.")
  (fine_pose m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <DetectPallet-response>) ostream)
  "Serializes a message object of type '<DetectPallet-response>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'success) 1 0)) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'fine_pose) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <DetectPallet-response>) istream)
  "Deserializes a message object of type '<DetectPallet-response>"
    (cl:setf (cl:slot-value msg 'success) (cl:not (cl:zerop (cl:read-byte istream))))
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'fine_pose) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<DetectPallet-response>)))
  "Returns string type for a service object of type '<DetectPallet-response>"
  "pallet_recognition/DetectPalletResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'DetectPallet-response)))
  "Returns string type for a service object of type 'DetectPallet-response"
  "pallet_recognition/DetectPalletResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<DetectPallet-response>)))
  "Returns md5sum for a message object of type '<DetectPallet-response>"
  "be52264672531f790ba66789a9749d0c")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'DetectPallet-response)))
  "Returns md5sum for a message object of type 'DetectPallet-response"
  "be52264672531f790ba66789a9749d0c")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<DetectPallet-response>)))
  "Returns full string definition for message of type '<DetectPallet-response>"
  (cl:format cl:nil "bool success~%geometry_msgs/PoseStamped fine_pose~%~%~%================================================================================~%MSG: geometry_msgs/PoseStamped~%# A Pose with reference coordinate frame and timestamp~%Header header~%Pose pose~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'DetectPallet-response)))
  "Returns full string definition for message of type 'DetectPallet-response"
  (cl:format cl:nil "bool success~%geometry_msgs/PoseStamped fine_pose~%~%~%================================================================================~%MSG: geometry_msgs/PoseStamped~%# A Pose with reference coordinate frame and timestamp~%Header header~%Pose pose~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <DetectPallet-response>))
  (cl:+ 0
     1
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'fine_pose))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <DetectPallet-response>))
  "Converts a ROS message object to a list"
  (cl:list 'DetectPallet-response
    (cl:cons ':success (success msg))
    (cl:cons ':fine_pose (fine_pose msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'DetectPallet)))
  'DetectPallet-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'DetectPallet)))
  'DetectPallet-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'DetectPallet)))
  "Returns string type for a service object of type '<DetectPallet>"
  "pallet_recognition/DetectPallet")