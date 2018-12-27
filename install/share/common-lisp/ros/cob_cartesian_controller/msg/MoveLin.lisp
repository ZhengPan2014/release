; Auto-generated. Do not edit!


(cl:in-package cob_cartesian_controller-msg)


;//! \htmlinclude MoveLin.msg.html

(cl:defclass <MoveLin> (roslisp-msg-protocol:ros-message)
  ((pose_goal
    :reader pose_goal
    :initarg :pose_goal
    :type geometry_msgs-msg:Pose
    :initform (cl:make-instance 'geometry_msgs-msg:Pose))
   (frame_id
    :reader frame_id
    :initarg :frame_id
    :type cl:string
    :initform ""))
)

(cl:defclass MoveLin (<MoveLin>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <MoveLin>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'MoveLin)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_cartesian_controller-msg:<MoveLin> is deprecated: use cob_cartesian_controller-msg:MoveLin instead.")))

(cl:ensure-generic-function 'pose_goal-val :lambda-list '(m))
(cl:defmethod pose_goal-val ((m <MoveLin>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_cartesian_controller-msg:pose_goal-val is deprecated.  Use cob_cartesian_controller-msg:pose_goal instead.")
  (pose_goal m))

(cl:ensure-generic-function 'frame_id-val :lambda-list '(m))
(cl:defmethod frame_id-val ((m <MoveLin>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_cartesian_controller-msg:frame_id-val is deprecated.  Use cob_cartesian_controller-msg:frame_id instead.")
  (frame_id m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <MoveLin>) ostream)
  "Serializes a message object of type '<MoveLin>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'pose_goal) ostream)
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'frame_id))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'frame_id))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <MoveLin>) istream)
  "Deserializes a message object of type '<MoveLin>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'pose_goal) istream)
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'frame_id) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'frame_id) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<MoveLin>)))
  "Returns string type for a message object of type '<MoveLin>"
  "cob_cartesian_controller/MoveLin")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'MoveLin)))
  "Returns string type for a message object of type 'MoveLin"
  "cob_cartesian_controller/MoveLin")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<MoveLin>)))
  "Returns md5sum for a message object of type '<MoveLin>"
  "70cac8ff7d59d99584e4fc6cb33417df")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'MoveLin)))
  "Returns md5sum for a message object of type 'MoveLin"
  "70cac8ff7d59d99584e4fc6cb33417df")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<MoveLin>)))
  "Returns full string definition for message of type '<MoveLin>"
  (cl:format cl:nil "geometry_msgs/Pose pose_goal~%string frame_id~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'MoveLin)))
  "Returns full string definition for message of type 'MoveLin"
  (cl:format cl:nil "geometry_msgs/Pose pose_goal~%string frame_id~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <MoveLin>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'pose_goal))
     4 (cl:length (cl:slot-value msg 'frame_id))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <MoveLin>))
  "Converts a ROS message object to a list"
  (cl:list 'MoveLin
    (cl:cons ':pose_goal (pose_goal msg))
    (cl:cons ':frame_id (frame_id msg))
))
