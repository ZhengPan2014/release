; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude TaskQueryAndGainPath-request.msg.html

(cl:defclass <TaskQueryAndGainPath-request> (roslisp-msg-protocol:ros-message)
  ((header
    :reader header
    :initarg :header
    :type std_msgs-msg:Header
    :initform (cl:make-instance 'std_msgs-msg:Header))
   (agvID
    :reader agvID
    :initarg :agvID
    :type cl:integer
    :initform 0)
   (agvPos
    :reader agvPos
    :initarg :agvPos
    :type geometry_msgs-msg:PoseStamped
    :initform (cl:make-instance 'geometry_msgs-msg:PoseStamped))
   (goalPos
    :reader goalPos
    :initarg :goalPos
    :type geometry_msgs-msg:PoseStamped
    :initform (cl:make-instance 'geometry_msgs-msg:PoseStamped)))
)

(cl:defclass TaskQueryAndGainPath-request (<TaskQueryAndGainPath-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <TaskQueryAndGainPath-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'TaskQueryAndGainPath-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<TaskQueryAndGainPath-request> is deprecated: use scheduling_msgs-srv:TaskQueryAndGainPath-request instead.")))

(cl:ensure-generic-function 'header-val :lambda-list '(m))
(cl:defmethod header-val ((m <TaskQueryAndGainPath-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:header-val is deprecated.  Use scheduling_msgs-srv:header instead.")
  (header m))

(cl:ensure-generic-function 'agvID-val :lambda-list '(m))
(cl:defmethod agvID-val ((m <TaskQueryAndGainPath-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:agvID-val is deprecated.  Use scheduling_msgs-srv:agvID instead.")
  (agvID m))

(cl:ensure-generic-function 'agvPos-val :lambda-list '(m))
(cl:defmethod agvPos-val ((m <TaskQueryAndGainPath-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:agvPos-val is deprecated.  Use scheduling_msgs-srv:agvPos instead.")
  (agvPos m))

(cl:ensure-generic-function 'goalPos-val :lambda-list '(m))
(cl:defmethod goalPos-val ((m <TaskQueryAndGainPath-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:goalPos-val is deprecated.  Use scheduling_msgs-srv:goalPos instead.")
  (goalPos m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <TaskQueryAndGainPath-request>) ostream)
  "Serializes a message object of type '<TaskQueryAndGainPath-request>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'header) ostream)
  (cl:let* ((signed (cl:slot-value msg 'agvID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'agvPos) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'goalPos) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <TaskQueryAndGainPath-request>) istream)
  "Deserializes a message object of type '<TaskQueryAndGainPath-request>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'header) istream)
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
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<TaskQueryAndGainPath-request>)))
  "Returns string type for a service object of type '<TaskQueryAndGainPath-request>"
  "scheduling_msgs/TaskQueryAndGainPathRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'TaskQueryAndGainPath-request)))
  "Returns string type for a service object of type 'TaskQueryAndGainPath-request"
  "scheduling_msgs/TaskQueryAndGainPathRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<TaskQueryAndGainPath-request>)))
  "Returns md5sum for a message object of type '<TaskQueryAndGainPath-request>"
  "2558b785b45a88b34b4d9ecdb1d64193")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'TaskQueryAndGainPath-request)))
  "Returns md5sum for a message object of type 'TaskQueryAndGainPath-request"
  "2558b785b45a88b34b4d9ecdb1d64193")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<TaskQueryAndGainPath-request>)))
  "Returns full string definition for message of type '<TaskQueryAndGainPath-request>"
  (cl:format cl:nil "Header header~%int32 agvID~%geometry_msgs/PoseStamped agvPos~%geometry_msgs/PoseStamped goalPos~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/PoseStamped~%# A Pose with reference coordinate frame and timestamp~%Header header~%Pose pose~%~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'TaskQueryAndGainPath-request)))
  "Returns full string definition for message of type 'TaskQueryAndGainPath-request"
  (cl:format cl:nil "Header header~%int32 agvID~%geometry_msgs/PoseStamped agvPos~%geometry_msgs/PoseStamped goalPos~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/PoseStamped~%# A Pose with reference coordinate frame and timestamp~%Header header~%Pose pose~%~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <TaskQueryAndGainPath-request>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'header))
     4
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'agvPos))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'goalPos))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <TaskQueryAndGainPath-request>))
  "Converts a ROS message object to a list"
  (cl:list 'TaskQueryAndGainPath-request
    (cl:cons ':header (header msg))
    (cl:cons ':agvID (agvID msg))
    (cl:cons ':agvPos (agvPos msg))
    (cl:cons ':goalPos (goalPos msg))
))
;//! \htmlinclude TaskQueryAndGainPath-response.msg.html

(cl:defclass <TaskQueryAndGainPath-response> (roslisp-msg-protocol:ros-message)
  ((isValid
    :reader isValid
    :initarg :isValid
    :type cl:boolean
    :initform cl:nil)
   (path
    :reader path
    :initarg :path
    :type (cl:vector geometry_msgs-msg:Pose2D)
   :initform (cl:make-array 0 :element-type 'geometry_msgs-msg:Pose2D :initial-element (cl:make-instance 'geometry_msgs-msg:Pose2D))))
)

(cl:defclass TaskQueryAndGainPath-response (<TaskQueryAndGainPath-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <TaskQueryAndGainPath-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'TaskQueryAndGainPath-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<TaskQueryAndGainPath-response> is deprecated: use scheduling_msgs-srv:TaskQueryAndGainPath-response instead.")))

(cl:ensure-generic-function 'isValid-val :lambda-list '(m))
(cl:defmethod isValid-val ((m <TaskQueryAndGainPath-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:isValid-val is deprecated.  Use scheduling_msgs-srv:isValid instead.")
  (isValid m))

(cl:ensure-generic-function 'path-val :lambda-list '(m))
(cl:defmethod path-val ((m <TaskQueryAndGainPath-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:path-val is deprecated.  Use scheduling_msgs-srv:path instead.")
  (path m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <TaskQueryAndGainPath-response>) ostream)
  "Serializes a message object of type '<TaskQueryAndGainPath-response>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'isValid) 1 0)) ostream)
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'path))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (roslisp-msg-protocol:serialize ele ostream))
   (cl:slot-value msg 'path))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <TaskQueryAndGainPath-response>) istream)
  "Deserializes a message object of type '<TaskQueryAndGainPath-response>"
    (cl:setf (cl:slot-value msg 'isValid) (cl:not (cl:zerop (cl:read-byte istream))))
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'path) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'path)))
    (cl:dotimes (i __ros_arr_len)
    (cl:setf (cl:aref vals i) (cl:make-instance 'geometry_msgs-msg:Pose2D))
  (roslisp-msg-protocol:deserialize (cl:aref vals i) istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<TaskQueryAndGainPath-response>)))
  "Returns string type for a service object of type '<TaskQueryAndGainPath-response>"
  "scheduling_msgs/TaskQueryAndGainPathResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'TaskQueryAndGainPath-response)))
  "Returns string type for a service object of type 'TaskQueryAndGainPath-response"
  "scheduling_msgs/TaskQueryAndGainPathResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<TaskQueryAndGainPath-response>)))
  "Returns md5sum for a message object of type '<TaskQueryAndGainPath-response>"
  "2558b785b45a88b34b4d9ecdb1d64193")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'TaskQueryAndGainPath-response)))
  "Returns md5sum for a message object of type 'TaskQueryAndGainPath-response"
  "2558b785b45a88b34b4d9ecdb1d64193")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<TaskQueryAndGainPath-response>)))
  "Returns full string definition for message of type '<TaskQueryAndGainPath-response>"
  (cl:format cl:nil "bool isValid~%geometry_msgs/Pose2D[] path~%~%~%================================================================================~%MSG: geometry_msgs/Pose2D~%# This expresses a position and orientation on a 2D manifold.~%~%float64 x~%float64 y~%float64 theta~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'TaskQueryAndGainPath-response)))
  "Returns full string definition for message of type 'TaskQueryAndGainPath-response"
  (cl:format cl:nil "bool isValid~%geometry_msgs/Pose2D[] path~%~%~%================================================================================~%MSG: geometry_msgs/Pose2D~%# This expresses a position and orientation on a 2D manifold.~%~%float64 x~%float64 y~%float64 theta~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <TaskQueryAndGainPath-response>))
  (cl:+ 0
     1
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'path) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ (roslisp-msg-protocol:serialization-length ele))))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <TaskQueryAndGainPath-response>))
  "Converts a ROS message object to a list"
  (cl:list 'TaskQueryAndGainPath-response
    (cl:cons ':isValid (isValid msg))
    (cl:cons ':path (path msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'TaskQueryAndGainPath)))
  'TaskQueryAndGainPath-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'TaskQueryAndGainPath)))
  'TaskQueryAndGainPath-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'TaskQueryAndGainPath)))
  "Returns string type for a service object of type '<TaskQueryAndGainPath>"
  "scheduling_msgs/TaskQueryAndGainPath")