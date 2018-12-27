; Auto-generated. Do not edit!


(cl:in-package cob_cartesian_controller-msg)


;//! \htmlinclude MoveCirc.msg.html

(cl:defclass <MoveCirc> (roslisp-msg-protocol:ros-message)
  ((pose_center
    :reader pose_center
    :initarg :pose_center
    :type geometry_msgs-msg:Pose
    :initform (cl:make-instance 'geometry_msgs-msg:Pose))
   (frame_id
    :reader frame_id
    :initarg :frame_id
    :type cl:string
    :initform "")
   (start_angle
    :reader start_angle
    :initarg :start_angle
    :type cl:float
    :initform 0.0)
   (end_angle
    :reader end_angle
    :initarg :end_angle
    :type cl:float
    :initform 0.0)
   (radius
    :reader radius
    :initarg :radius
    :type cl:float
    :initform 0.0))
)

(cl:defclass MoveCirc (<MoveCirc>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <MoveCirc>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'MoveCirc)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_cartesian_controller-msg:<MoveCirc> is deprecated: use cob_cartesian_controller-msg:MoveCirc instead.")))

(cl:ensure-generic-function 'pose_center-val :lambda-list '(m))
(cl:defmethod pose_center-val ((m <MoveCirc>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_cartesian_controller-msg:pose_center-val is deprecated.  Use cob_cartesian_controller-msg:pose_center instead.")
  (pose_center m))

(cl:ensure-generic-function 'frame_id-val :lambda-list '(m))
(cl:defmethod frame_id-val ((m <MoveCirc>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_cartesian_controller-msg:frame_id-val is deprecated.  Use cob_cartesian_controller-msg:frame_id instead.")
  (frame_id m))

(cl:ensure-generic-function 'start_angle-val :lambda-list '(m))
(cl:defmethod start_angle-val ((m <MoveCirc>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_cartesian_controller-msg:start_angle-val is deprecated.  Use cob_cartesian_controller-msg:start_angle instead.")
  (start_angle m))

(cl:ensure-generic-function 'end_angle-val :lambda-list '(m))
(cl:defmethod end_angle-val ((m <MoveCirc>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_cartesian_controller-msg:end_angle-val is deprecated.  Use cob_cartesian_controller-msg:end_angle instead.")
  (end_angle m))

(cl:ensure-generic-function 'radius-val :lambda-list '(m))
(cl:defmethod radius-val ((m <MoveCirc>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_cartesian_controller-msg:radius-val is deprecated.  Use cob_cartesian_controller-msg:radius instead.")
  (radius m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <MoveCirc>) ostream)
  "Serializes a message object of type '<MoveCirc>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'pose_center) ostream)
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'frame_id))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'frame_id))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'start_angle))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'end_angle))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'radius))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <MoveCirc>) istream)
  "Deserializes a message object of type '<MoveCirc>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'pose_center) istream)
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'frame_id) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'frame_id) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'start_angle) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'end_angle) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'radius) (roslisp-utils:decode-double-float-bits bits)))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<MoveCirc>)))
  "Returns string type for a message object of type '<MoveCirc>"
  "cob_cartesian_controller/MoveCirc")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'MoveCirc)))
  "Returns string type for a message object of type 'MoveCirc"
  "cob_cartesian_controller/MoveCirc")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<MoveCirc>)))
  "Returns md5sum for a message object of type '<MoveCirc>"
  "803efebbec7e0afea7443ebc778555f3")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'MoveCirc)))
  "Returns md5sum for a message object of type 'MoveCirc"
  "803efebbec7e0afea7443ebc778555f3")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<MoveCirc>)))
  "Returns full string definition for message of type '<MoveCirc>"
  (cl:format cl:nil "geometry_msgs/Pose pose_center~%string frame_id~%~%float64 start_angle~%float64 end_angle~%float64 radius~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'MoveCirc)))
  "Returns full string definition for message of type 'MoveCirc"
  (cl:format cl:nil "geometry_msgs/Pose pose_center~%string frame_id~%~%float64 start_angle~%float64 end_angle~%float64 radius~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <MoveCirc>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'pose_center))
     4 (cl:length (cl:slot-value msg 'frame_id))
     8
     8
     8
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <MoveCirc>))
  "Converts a ROS message object to a list"
  (cl:list 'MoveCirc
    (cl:cons ':pose_center (pose_center msg))
    (cl:cons ':frame_id (frame_id msg))
    (cl:cons ':start_angle (start_angle msg))
    (cl:cons ':end_angle (end_angle msg))
    (cl:cons ':radius (radius msg))
))
