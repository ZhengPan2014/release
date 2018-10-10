; Auto-generated. Do not edit!


(cl:in-package cob_light-msg)


;//! \htmlinclude Sequence.msg.html

(cl:defclass <Sequence> (roslisp-msg-protocol:ros-message)
  ((color
    :reader color
    :initarg :color
    :type std_msgs-msg:ColorRGBA
    :initform (cl:make-instance 'std_msgs-msg:ColorRGBA))
   (hold_time
    :reader hold_time
    :initarg :hold_time
    :type cl:float
    :initform 0.0)
   (cross_time
    :reader cross_time
    :initarg :cross_time
    :type cl:float
    :initform 0.0))
)

(cl:defclass Sequence (<Sequence>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <Sequence>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'Sequence)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_light-msg:<Sequence> is deprecated: use cob_light-msg:Sequence instead.")))

(cl:ensure-generic-function 'color-val :lambda-list '(m))
(cl:defmethod color-val ((m <Sequence>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-msg:color-val is deprecated.  Use cob_light-msg:color instead.")
  (color m))

(cl:ensure-generic-function 'hold_time-val :lambda-list '(m))
(cl:defmethod hold_time-val ((m <Sequence>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-msg:hold_time-val is deprecated.  Use cob_light-msg:hold_time instead.")
  (hold_time m))

(cl:ensure-generic-function 'cross_time-val :lambda-list '(m))
(cl:defmethod cross_time-val ((m <Sequence>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-msg:cross_time-val is deprecated.  Use cob_light-msg:cross_time instead.")
  (cross_time m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <Sequence>) ostream)
  "Serializes a message object of type '<Sequence>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'color) ostream)
  (cl:let ((bits (roslisp-utils:encode-single-float-bits (cl:slot-value msg 'hold_time))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-single-float-bits (cl:slot-value msg 'cross_time))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <Sequence>) istream)
  "Deserializes a message object of type '<Sequence>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'color) istream)
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'hold_time) (roslisp-utils:decode-single-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'cross_time) (roslisp-utils:decode-single-float-bits bits)))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<Sequence>)))
  "Returns string type for a message object of type '<Sequence>"
  "cob_light/Sequence")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'Sequence)))
  "Returns string type for a message object of type 'Sequence"
  "cob_light/Sequence")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<Sequence>)))
  "Returns md5sum for a message object of type '<Sequence>"
  "7093bc102ba3b6d78256c69c48c6a43b")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'Sequence)))
  "Returns md5sum for a message object of type 'Sequence"
  "7093bc102ba3b6d78256c69c48c6a43b")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<Sequence>)))
  "Returns full string definition for message of type '<Sequence>"
  (cl:format cl:nil "std_msgs/ColorRGBA   color       #sequence color~%float32              hold_time   #time how long the color should be hold [s]~%float32              cross_time  #time how long it take to fade to this color [s]~%================================================================================~%MSG: std_msgs/ColorRGBA~%float32 r~%float32 g~%float32 b~%float32 a~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'Sequence)))
  "Returns full string definition for message of type 'Sequence"
  (cl:format cl:nil "std_msgs/ColorRGBA   color       #sequence color~%float32              hold_time   #time how long the color should be hold [s]~%float32              cross_time  #time how long it take to fade to this color [s]~%================================================================================~%MSG: std_msgs/ColorRGBA~%float32 r~%float32 g~%float32 b~%float32 a~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <Sequence>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'color))
     4
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <Sequence>))
  "Converts a ROS message object to a list"
  (cl:list 'Sequence
    (cl:cons ':color (color msg))
    (cl:cons ':hold_time (hold_time msg))
    (cl:cons ':cross_time (cross_time msg))
))
