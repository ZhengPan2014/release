; Auto-generated. Do not edit!


(cl:in-package cob_cartesian_controller-msg)


;//! \htmlinclude CartesianControllerGoal.msg.html

(cl:defclass <CartesianControllerGoal> (roslisp-msg-protocol:ros-message)
  ((move_type
    :reader move_type
    :initarg :move_type
    :type cl:fixnum
    :initform 0)
   (move_lin
    :reader move_lin
    :initarg :move_lin
    :type cob_cartesian_controller-msg:MoveLin
    :initform (cl:make-instance 'cob_cartesian_controller-msg:MoveLin))
   (move_circ
    :reader move_circ
    :initarg :move_circ
    :type cob_cartesian_controller-msg:MoveCirc
    :initform (cl:make-instance 'cob_cartesian_controller-msg:MoveCirc))
   (profile
    :reader profile
    :initarg :profile
    :type cob_cartesian_controller-msg:Profile
    :initform (cl:make-instance 'cob_cartesian_controller-msg:Profile)))
)

(cl:defclass CartesianControllerGoal (<CartesianControllerGoal>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <CartesianControllerGoal>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'CartesianControllerGoal)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_cartesian_controller-msg:<CartesianControllerGoal> is deprecated: use cob_cartesian_controller-msg:CartesianControllerGoal instead.")))

(cl:ensure-generic-function 'move_type-val :lambda-list '(m))
(cl:defmethod move_type-val ((m <CartesianControllerGoal>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_cartesian_controller-msg:move_type-val is deprecated.  Use cob_cartesian_controller-msg:move_type instead.")
  (move_type m))

(cl:ensure-generic-function 'move_lin-val :lambda-list '(m))
(cl:defmethod move_lin-val ((m <CartesianControllerGoal>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_cartesian_controller-msg:move_lin-val is deprecated.  Use cob_cartesian_controller-msg:move_lin instead.")
  (move_lin m))

(cl:ensure-generic-function 'move_circ-val :lambda-list '(m))
(cl:defmethod move_circ-val ((m <CartesianControllerGoal>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_cartesian_controller-msg:move_circ-val is deprecated.  Use cob_cartesian_controller-msg:move_circ instead.")
  (move_circ m))

(cl:ensure-generic-function 'profile-val :lambda-list '(m))
(cl:defmethod profile-val ((m <CartesianControllerGoal>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_cartesian_controller-msg:profile-val is deprecated.  Use cob_cartesian_controller-msg:profile instead.")
  (profile m))
(cl:defmethod roslisp-msg-protocol:symbol-codes ((msg-type (cl:eql '<CartesianControllerGoal>)))
    "Constants for message type '<CartesianControllerGoal>"
  '((:LIN . 1)
    (:CIRC . 2))
)
(cl:defmethod roslisp-msg-protocol:symbol-codes ((msg-type (cl:eql 'CartesianControllerGoal)))
    "Constants for message type 'CartesianControllerGoal"
  '((:LIN . 1)
    (:CIRC . 2))
)
(cl:defmethod roslisp-msg-protocol:serialize ((msg <CartesianControllerGoal>) ostream)
  "Serializes a message object of type '<CartesianControllerGoal>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'move_type)) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'move_lin) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'move_circ) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'profile) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <CartesianControllerGoal>) istream)
  "Deserializes a message object of type '<CartesianControllerGoal>"
    (cl:setf (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'move_type)) (cl:read-byte istream))
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'move_lin) istream)
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'move_circ) istream)
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'profile) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<CartesianControllerGoal>)))
  "Returns string type for a message object of type '<CartesianControllerGoal>"
  "cob_cartesian_controller/CartesianControllerGoal")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'CartesianControllerGoal)))
  "Returns string type for a message object of type 'CartesianControllerGoal"
  "cob_cartesian_controller/CartesianControllerGoal")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<CartesianControllerGoal>)))
  "Returns md5sum for a message object of type '<CartesianControllerGoal>"
  "4991c8597bfb03ca23473e74f0163c3e")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'CartesianControllerGoal)))
  "Returns md5sum for a message object of type 'CartesianControllerGoal"
  "4991c8597bfb03ca23473e74f0163c3e")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<CartesianControllerGoal>)))
  "Returns full string definition for message of type '<CartesianControllerGoal>"
  (cl:format cl:nil "# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%# goal definition~%uint8 LIN=1~%uint8 CIRC=2~%uint8 move_type~%~%cob_cartesian_controller/MoveLin move_lin~%cob_cartesian_controller/MoveCirc move_circ~%cob_cartesian_controller/Profile profile~%~%================================================================================~%MSG: cob_cartesian_controller/MoveLin~%geometry_msgs/Pose pose_goal~%string frame_id~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%================================================================================~%MSG: cob_cartesian_controller/MoveCirc~%geometry_msgs/Pose pose_center~%string frame_id~%~%float64 start_angle~%float64 end_angle~%float64 radius~%================================================================================~%MSG: cob_cartesian_controller/Profile~%uint8 RAMP=1~%uint8 SINOID=2~%uint8 profile_type~%~%float64 vel~%float64 accl~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'CartesianControllerGoal)))
  "Returns full string definition for message of type 'CartesianControllerGoal"
  (cl:format cl:nil "# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%# goal definition~%uint8 LIN=1~%uint8 CIRC=2~%uint8 move_type~%~%cob_cartesian_controller/MoveLin move_lin~%cob_cartesian_controller/MoveCirc move_circ~%cob_cartesian_controller/Profile profile~%~%================================================================================~%MSG: cob_cartesian_controller/MoveLin~%geometry_msgs/Pose pose_goal~%string frame_id~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%================================================================================~%MSG: cob_cartesian_controller/MoveCirc~%geometry_msgs/Pose pose_center~%string frame_id~%~%float64 start_angle~%float64 end_angle~%float64 radius~%================================================================================~%MSG: cob_cartesian_controller/Profile~%uint8 RAMP=1~%uint8 SINOID=2~%uint8 profile_type~%~%float64 vel~%float64 accl~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <CartesianControllerGoal>))
  (cl:+ 0
     1
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'move_lin))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'move_circ))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'profile))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <CartesianControllerGoal>))
  "Converts a ROS message object to a list"
  (cl:list 'CartesianControllerGoal
    (cl:cons ':move_type (move_type msg))
    (cl:cons ':move_lin (move_lin msg))
    (cl:cons ':move_circ (move_circ msg))
    (cl:cons ':profile (profile msg))
))
