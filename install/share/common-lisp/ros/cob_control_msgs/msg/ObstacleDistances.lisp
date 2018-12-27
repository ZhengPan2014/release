; Auto-generated. Do not edit!


(cl:in-package cob_control_msgs-msg)


;//! \htmlinclude ObstacleDistances.msg.html

(cl:defclass <ObstacleDistances> (roslisp-msg-protocol:ros-message)
  ((distances
    :reader distances
    :initarg :distances
    :type (cl:vector cob_control_msgs-msg:ObstacleDistance)
   :initform (cl:make-array 0 :element-type 'cob_control_msgs-msg:ObstacleDistance :initial-element (cl:make-instance 'cob_control_msgs-msg:ObstacleDistance))))
)

(cl:defclass ObstacleDistances (<ObstacleDistances>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <ObstacleDistances>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'ObstacleDistances)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_control_msgs-msg:<ObstacleDistances> is deprecated: use cob_control_msgs-msg:ObstacleDistances instead.")))

(cl:ensure-generic-function 'distances-val :lambda-list '(m))
(cl:defmethod distances-val ((m <ObstacleDistances>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_control_msgs-msg:distances-val is deprecated.  Use cob_control_msgs-msg:distances instead.")
  (distances m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <ObstacleDistances>) ostream)
  "Serializes a message object of type '<ObstacleDistances>"
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'distances))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (roslisp-msg-protocol:serialize ele ostream))
   (cl:slot-value msg 'distances))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <ObstacleDistances>) istream)
  "Deserializes a message object of type '<ObstacleDistances>"
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'distances) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'distances)))
    (cl:dotimes (i __ros_arr_len)
    (cl:setf (cl:aref vals i) (cl:make-instance 'cob_control_msgs-msg:ObstacleDistance))
  (roslisp-msg-protocol:deserialize (cl:aref vals i) istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<ObstacleDistances>)))
  "Returns string type for a message object of type '<ObstacleDistances>"
  "cob_control_msgs/ObstacleDistances")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ObstacleDistances)))
  "Returns string type for a message object of type 'ObstacleDistances"
  "cob_control_msgs/ObstacleDistances")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<ObstacleDistances>)))
  "Returns md5sum for a message object of type '<ObstacleDistances>"
  "58f6b8a2511da851588441c695d51807")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'ObstacleDistances)))
  "Returns md5sum for a message object of type 'ObstacleDistances"
  "58f6b8a2511da851588441c695d51807")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<ObstacleDistances>)))
  "Returns full string definition for message of type '<ObstacleDistances>"
  (cl:format cl:nil "ObstacleDistance[] distances~%================================================================================~%MSG: cob_control_msgs/ObstacleDistance~%Header header~%~%## Collision pair consists of link of interest and obstacle~%# Registration name of the link of interest~%string link_of_interest~%# Registration name of the obstacle~%string obstacle_id~%~%## distance between the nearest points on obstacle and link of interest~%float64 distance~%~%## Vector pointing to the origin of the link~%geometry_msgs/Vector3 frame_vector~%~%## Vector pointing to the nearest point on the link collision geometry (e.g. mesh)~%geometry_msgs/Vector3 nearest_point_frame_vector~%~%## Vector pointing to the nearest point on the obstacle collision geometry (e.g. mesh)~%geometry_msgs/Vector3 nearest_point_obstacle_vector~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/Vector3~%# This represents a vector in free space. ~%# It is only meant to represent a direction. Therefore, it does not~%# make sense to apply a translation to it (e.g., when applying a ~%# generic rigid transformation to a Vector3, tf2 will only apply the~%# rotation). If you want your data to be translatable too, use the~%# geometry_msgs/Point message instead.~%~%float64 x~%float64 y~%float64 z~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'ObstacleDistances)))
  "Returns full string definition for message of type 'ObstacleDistances"
  (cl:format cl:nil "ObstacleDistance[] distances~%================================================================================~%MSG: cob_control_msgs/ObstacleDistance~%Header header~%~%## Collision pair consists of link of interest and obstacle~%# Registration name of the link of interest~%string link_of_interest~%# Registration name of the obstacle~%string obstacle_id~%~%## distance between the nearest points on obstacle and link of interest~%float64 distance~%~%## Vector pointing to the origin of the link~%geometry_msgs/Vector3 frame_vector~%~%## Vector pointing to the nearest point on the link collision geometry (e.g. mesh)~%geometry_msgs/Vector3 nearest_point_frame_vector~%~%## Vector pointing to the nearest point on the obstacle collision geometry (e.g. mesh)~%geometry_msgs/Vector3 nearest_point_obstacle_vector~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/Vector3~%# This represents a vector in free space. ~%# It is only meant to represent a direction. Therefore, it does not~%# make sense to apply a translation to it (e.g., when applying a ~%# generic rigid transformation to a Vector3, tf2 will only apply the~%# rotation). If you want your data to be translatable too, use the~%# geometry_msgs/Point message instead.~%~%float64 x~%float64 y~%float64 z~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <ObstacleDistances>))
  (cl:+ 0
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'distances) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ (roslisp-msg-protocol:serialization-length ele))))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <ObstacleDistances>))
  "Converts a ROS message object to a list"
  (cl:list 'ObstacleDistances
    (cl:cons ':distances (distances msg))
))
