; Auto-generated. Do not edit!


(cl:in-package cob_control_msgs-msg)


;//! \htmlinclude ObstacleDistance.msg.html

(cl:defclass <ObstacleDistance> (roslisp-msg-protocol:ros-message)
  ((header
    :reader header
    :initarg :header
    :type std_msgs-msg:Header
    :initform (cl:make-instance 'std_msgs-msg:Header))
   (link_of_interest
    :reader link_of_interest
    :initarg :link_of_interest
    :type cl:string
    :initform "")
   (obstacle_id
    :reader obstacle_id
    :initarg :obstacle_id
    :type cl:string
    :initform "")
   (distance
    :reader distance
    :initarg :distance
    :type cl:float
    :initform 0.0)
   (frame_vector
    :reader frame_vector
    :initarg :frame_vector
    :type geometry_msgs-msg:Vector3
    :initform (cl:make-instance 'geometry_msgs-msg:Vector3))
   (nearest_point_frame_vector
    :reader nearest_point_frame_vector
    :initarg :nearest_point_frame_vector
    :type geometry_msgs-msg:Vector3
    :initform (cl:make-instance 'geometry_msgs-msg:Vector3))
   (nearest_point_obstacle_vector
    :reader nearest_point_obstacle_vector
    :initarg :nearest_point_obstacle_vector
    :type geometry_msgs-msg:Vector3
    :initform (cl:make-instance 'geometry_msgs-msg:Vector3)))
)

(cl:defclass ObstacleDistance (<ObstacleDistance>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <ObstacleDistance>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'ObstacleDistance)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_control_msgs-msg:<ObstacleDistance> is deprecated: use cob_control_msgs-msg:ObstacleDistance instead.")))

(cl:ensure-generic-function 'header-val :lambda-list '(m))
(cl:defmethod header-val ((m <ObstacleDistance>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_control_msgs-msg:header-val is deprecated.  Use cob_control_msgs-msg:header instead.")
  (header m))

(cl:ensure-generic-function 'link_of_interest-val :lambda-list '(m))
(cl:defmethod link_of_interest-val ((m <ObstacleDistance>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_control_msgs-msg:link_of_interest-val is deprecated.  Use cob_control_msgs-msg:link_of_interest instead.")
  (link_of_interest m))

(cl:ensure-generic-function 'obstacle_id-val :lambda-list '(m))
(cl:defmethod obstacle_id-val ((m <ObstacleDistance>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_control_msgs-msg:obstacle_id-val is deprecated.  Use cob_control_msgs-msg:obstacle_id instead.")
  (obstacle_id m))

(cl:ensure-generic-function 'distance-val :lambda-list '(m))
(cl:defmethod distance-val ((m <ObstacleDistance>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_control_msgs-msg:distance-val is deprecated.  Use cob_control_msgs-msg:distance instead.")
  (distance m))

(cl:ensure-generic-function 'frame_vector-val :lambda-list '(m))
(cl:defmethod frame_vector-val ((m <ObstacleDistance>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_control_msgs-msg:frame_vector-val is deprecated.  Use cob_control_msgs-msg:frame_vector instead.")
  (frame_vector m))

(cl:ensure-generic-function 'nearest_point_frame_vector-val :lambda-list '(m))
(cl:defmethod nearest_point_frame_vector-val ((m <ObstacleDistance>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_control_msgs-msg:nearest_point_frame_vector-val is deprecated.  Use cob_control_msgs-msg:nearest_point_frame_vector instead.")
  (nearest_point_frame_vector m))

(cl:ensure-generic-function 'nearest_point_obstacle_vector-val :lambda-list '(m))
(cl:defmethod nearest_point_obstacle_vector-val ((m <ObstacleDistance>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_control_msgs-msg:nearest_point_obstacle_vector-val is deprecated.  Use cob_control_msgs-msg:nearest_point_obstacle_vector instead.")
  (nearest_point_obstacle_vector m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <ObstacleDistance>) ostream)
  "Serializes a message object of type '<ObstacleDistance>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'header) ostream)
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'link_of_interest))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'link_of_interest))
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'obstacle_id))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'obstacle_id))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'distance))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'frame_vector) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'nearest_point_frame_vector) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'nearest_point_obstacle_vector) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <ObstacleDistance>) istream)
  "Deserializes a message object of type '<ObstacleDistance>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'header) istream)
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'link_of_interest) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'link_of_interest) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'obstacle_id) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'obstacle_id) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'distance) (roslisp-utils:decode-double-float-bits bits)))
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'frame_vector) istream)
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'nearest_point_frame_vector) istream)
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'nearest_point_obstacle_vector) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<ObstacleDistance>)))
  "Returns string type for a message object of type '<ObstacleDistance>"
  "cob_control_msgs/ObstacleDistance")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ObstacleDistance)))
  "Returns string type for a message object of type 'ObstacleDistance"
  "cob_control_msgs/ObstacleDistance")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<ObstacleDistance>)))
  "Returns md5sum for a message object of type '<ObstacleDistance>"
  "fbbcad171002ad96c1fc44941d7a1bf1")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'ObstacleDistance)))
  "Returns md5sum for a message object of type 'ObstacleDistance"
  "fbbcad171002ad96c1fc44941d7a1bf1")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<ObstacleDistance>)))
  "Returns full string definition for message of type '<ObstacleDistance>"
  (cl:format cl:nil "Header header~%~%## Collision pair consists of link of interest and obstacle~%# Registration name of the link of interest~%string link_of_interest~%# Registration name of the obstacle~%string obstacle_id~%~%## distance between the nearest points on obstacle and link of interest~%float64 distance~%~%## Vector pointing to the origin of the link~%geometry_msgs/Vector3 frame_vector~%~%## Vector pointing to the nearest point on the link collision geometry (e.g. mesh)~%geometry_msgs/Vector3 nearest_point_frame_vector~%~%## Vector pointing to the nearest point on the obstacle collision geometry (e.g. mesh)~%geometry_msgs/Vector3 nearest_point_obstacle_vector~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/Vector3~%# This represents a vector in free space. ~%# It is only meant to represent a direction. Therefore, it does not~%# make sense to apply a translation to it (e.g., when applying a ~%# generic rigid transformation to a Vector3, tf2 will only apply the~%# rotation). If you want your data to be translatable too, use the~%# geometry_msgs/Point message instead.~%~%float64 x~%float64 y~%float64 z~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'ObstacleDistance)))
  "Returns full string definition for message of type 'ObstacleDistance"
  (cl:format cl:nil "Header header~%~%## Collision pair consists of link of interest and obstacle~%# Registration name of the link of interest~%string link_of_interest~%# Registration name of the obstacle~%string obstacle_id~%~%## distance between the nearest points on obstacle and link of interest~%float64 distance~%~%## Vector pointing to the origin of the link~%geometry_msgs/Vector3 frame_vector~%~%## Vector pointing to the nearest point on the link collision geometry (e.g. mesh)~%geometry_msgs/Vector3 nearest_point_frame_vector~%~%## Vector pointing to the nearest point on the obstacle collision geometry (e.g. mesh)~%geometry_msgs/Vector3 nearest_point_obstacle_vector~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/Vector3~%# This represents a vector in free space. ~%# It is only meant to represent a direction. Therefore, it does not~%# make sense to apply a translation to it (e.g., when applying a ~%# generic rigid transformation to a Vector3, tf2 will only apply the~%# rotation). If you want your data to be translatable too, use the~%# geometry_msgs/Point message instead.~%~%float64 x~%float64 y~%float64 z~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <ObstacleDistance>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'header))
     4 (cl:length (cl:slot-value msg 'link_of_interest))
     4 (cl:length (cl:slot-value msg 'obstacle_id))
     8
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'frame_vector))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'nearest_point_frame_vector))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'nearest_point_obstacle_vector))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <ObstacleDistance>))
  "Converts a ROS message object to a list"
  (cl:list 'ObstacleDistance
    (cl:cons ':header (header msg))
    (cl:cons ':link_of_interest (link_of_interest msg))
    (cl:cons ':obstacle_id (obstacle_id msg))
    (cl:cons ':distance (distance msg))
    (cl:cons ':frame_vector (frame_vector msg))
    (cl:cons ':nearest_point_frame_vector (nearest_point_frame_vector msg))
    (cl:cons ':nearest_point_obstacle_vector (nearest_point_obstacle_vector msg))
))
