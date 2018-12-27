; Auto-generated. Do not edit!


(cl:in-package cob_cartesian_controller-msg)


;//! \htmlinclude Profile.msg.html

(cl:defclass <Profile> (roslisp-msg-protocol:ros-message)
  ((profile_type
    :reader profile_type
    :initarg :profile_type
    :type cl:fixnum
    :initform 0)
   (vel
    :reader vel
    :initarg :vel
    :type cl:float
    :initform 0.0)
   (accl
    :reader accl
    :initarg :accl
    :type cl:float
    :initform 0.0))
)

(cl:defclass Profile (<Profile>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <Profile>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'Profile)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_cartesian_controller-msg:<Profile> is deprecated: use cob_cartesian_controller-msg:Profile instead.")))

(cl:ensure-generic-function 'profile_type-val :lambda-list '(m))
(cl:defmethod profile_type-val ((m <Profile>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_cartesian_controller-msg:profile_type-val is deprecated.  Use cob_cartesian_controller-msg:profile_type instead.")
  (profile_type m))

(cl:ensure-generic-function 'vel-val :lambda-list '(m))
(cl:defmethod vel-val ((m <Profile>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_cartesian_controller-msg:vel-val is deprecated.  Use cob_cartesian_controller-msg:vel instead.")
  (vel m))

(cl:ensure-generic-function 'accl-val :lambda-list '(m))
(cl:defmethod accl-val ((m <Profile>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_cartesian_controller-msg:accl-val is deprecated.  Use cob_cartesian_controller-msg:accl instead.")
  (accl m))
(cl:defmethod roslisp-msg-protocol:symbol-codes ((msg-type (cl:eql '<Profile>)))
    "Constants for message type '<Profile>"
  '((:RAMP . 1)
    (:SINOID . 2))
)
(cl:defmethod roslisp-msg-protocol:symbol-codes ((msg-type (cl:eql 'Profile)))
    "Constants for message type 'Profile"
  '((:RAMP . 1)
    (:SINOID . 2))
)
(cl:defmethod roslisp-msg-protocol:serialize ((msg <Profile>) ostream)
  "Serializes a message object of type '<Profile>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'profile_type)) ostream)
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'vel))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'accl))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <Profile>) istream)
  "Deserializes a message object of type '<Profile>"
    (cl:setf (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'profile_type)) (cl:read-byte istream))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'vel) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'accl) (roslisp-utils:decode-double-float-bits bits)))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<Profile>)))
  "Returns string type for a message object of type '<Profile>"
  "cob_cartesian_controller/Profile")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'Profile)))
  "Returns string type for a message object of type 'Profile"
  "cob_cartesian_controller/Profile")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<Profile>)))
  "Returns md5sum for a message object of type '<Profile>"
  "3631ecf157bdfedf0f8cb3d5f838c11b")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'Profile)))
  "Returns md5sum for a message object of type 'Profile"
  "3631ecf157bdfedf0f8cb3d5f838c11b")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<Profile>)))
  "Returns full string definition for message of type '<Profile>"
  (cl:format cl:nil "uint8 RAMP=1~%uint8 SINOID=2~%uint8 profile_type~%~%float64 vel~%float64 accl~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'Profile)))
  "Returns full string definition for message of type 'Profile"
  (cl:format cl:nil "uint8 RAMP=1~%uint8 SINOID=2~%uint8 profile_type~%~%float64 vel~%float64 accl~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <Profile>))
  (cl:+ 0
     1
     8
     8
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <Profile>))
  "Converts a ROS message object to a list"
  (cl:list 'Profile
    (cl:cons ':profile_type (profile_type msg))
    (cl:cons ':vel (vel msg))
    (cl:cons ':accl (accl msg))
))
