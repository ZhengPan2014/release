; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-msg)


;//! \htmlinclude AgvPose.msg.html

(cl:defclass <AgvPose> (roslisp-msg-protocol:ros-message)
  ((agvID
    :reader agvID
    :initarg :agvID
    :type cl:integer
    :initform 0)
   (agvName
    :reader agvName
    :initarg :agvName
    :type cl:string
    :initform "")
   (agvPose
    :reader agvPose
    :initarg :agvPose
    :type geometry_msgs-msg:PoseStamped
    :initform (cl:make-instance 'geometry_msgs-msg:PoseStamped)))
)

(cl:defclass AgvPose (<AgvPose>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <AgvPose>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'AgvPose)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-msg:<AgvPose> is deprecated: use scheduling_msgs-msg:AgvPose instead.")))

(cl:ensure-generic-function 'agvID-val :lambda-list '(m))
(cl:defmethod agvID-val ((m <AgvPose>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:agvID-val is deprecated.  Use scheduling_msgs-msg:agvID instead.")
  (agvID m))

(cl:ensure-generic-function 'agvName-val :lambda-list '(m))
(cl:defmethod agvName-val ((m <AgvPose>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:agvName-val is deprecated.  Use scheduling_msgs-msg:agvName instead.")
  (agvName m))

(cl:ensure-generic-function 'agvPose-val :lambda-list '(m))
(cl:defmethod agvPose-val ((m <AgvPose>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:agvPose-val is deprecated.  Use scheduling_msgs-msg:agvPose instead.")
  (agvPose m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <AgvPose>) ostream)
  "Serializes a message object of type '<AgvPose>"
  (cl:let* ((signed (cl:slot-value msg 'agvID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'agvName))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'agvName))
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'agvPose) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <AgvPose>) istream)
  "Deserializes a message object of type '<AgvPose>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'agvID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'agvName) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'agvName) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'agvPose) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<AgvPose>)))
  "Returns string type for a message object of type '<AgvPose>"
  "scheduling_msgs/AgvPose")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'AgvPose)))
  "Returns string type for a message object of type 'AgvPose"
  "scheduling_msgs/AgvPose")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<AgvPose>)))
  "Returns md5sum for a message object of type '<AgvPose>"
  "18320775d72245e409c5b54ce16206d9")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'AgvPose)))
  "Returns md5sum for a message object of type 'AgvPose"
  "18320775d72245e409c5b54ce16206d9")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<AgvPose>)))
  "Returns full string definition for message of type '<AgvPose>"
  (cl:format cl:nil "int32 agvID~%string agvName~%geometry_msgs/PoseStamped agvPose~%~%================================================================================~%MSG: geometry_msgs/PoseStamped~%# A Pose with reference coordinate frame and timestamp~%Header header~%Pose pose~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'AgvPose)))
  "Returns full string definition for message of type 'AgvPose"
  (cl:format cl:nil "int32 agvID~%string agvName~%geometry_msgs/PoseStamped agvPose~%~%================================================================================~%MSG: geometry_msgs/PoseStamped~%# A Pose with reference coordinate frame and timestamp~%Header header~%Pose pose~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <AgvPose>))
  (cl:+ 0
     4
     4 (cl:length (cl:slot-value msg 'agvName))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'agvPose))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <AgvPose>))
  "Converts a ROS message object to a list"
  (cl:list 'AgvPose
    (cl:cons ':agvID (agvID msg))
    (cl:cons ':agvName (agvName msg))
    (cl:cons ':agvPose (agvPose msg))
))
