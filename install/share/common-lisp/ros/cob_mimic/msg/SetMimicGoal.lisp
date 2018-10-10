; Auto-generated. Do not edit!


(cl:in-package cob_mimic-msg)


;//! \htmlinclude SetMimicGoal.msg.html

(cl:defclass <SetMimicGoal> (roslisp-msg-protocol:ros-message)
  ((mimic
    :reader mimic
    :initarg :mimic
    :type cl:string
    :initform "")
   (speed
    :reader speed
    :initarg :speed
    :type cl:float
    :initform 0.0)
   (repeat
    :reader repeat
    :initarg :repeat
    :type cl:integer
    :initform 0))
)

(cl:defclass SetMimicGoal (<SetMimicGoal>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <SetMimicGoal>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'SetMimicGoal)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_mimic-msg:<SetMimicGoal> is deprecated: use cob_mimic-msg:SetMimicGoal instead.")))

(cl:ensure-generic-function 'mimic-val :lambda-list '(m))
(cl:defmethod mimic-val ((m <SetMimicGoal>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_mimic-msg:mimic-val is deprecated.  Use cob_mimic-msg:mimic instead.")
  (mimic m))

(cl:ensure-generic-function 'speed-val :lambda-list '(m))
(cl:defmethod speed-val ((m <SetMimicGoal>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_mimic-msg:speed-val is deprecated.  Use cob_mimic-msg:speed instead.")
  (speed m))

(cl:ensure-generic-function 'repeat-val :lambda-list '(m))
(cl:defmethod repeat-val ((m <SetMimicGoal>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_mimic-msg:repeat-val is deprecated.  Use cob_mimic-msg:repeat instead.")
  (repeat m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <SetMimicGoal>) ostream)
  "Serializes a message object of type '<SetMimicGoal>"
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'mimic))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'mimic))
  (cl:let ((bits (roslisp-utils:encode-single-float-bits (cl:slot-value msg 'speed))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream))
  (cl:let* ((signed (cl:slot-value msg 'repeat)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 18446744073709551616) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <SetMimicGoal>) istream)
  "Deserializes a message object of type '<SetMimicGoal>"
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'mimic) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'mimic) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'speed) (roslisp-utils:decode-single-float-bits bits)))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'repeat) (cl:if (cl:< unsigned 9223372036854775808) unsigned (cl:- unsigned 18446744073709551616))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<SetMimicGoal>)))
  "Returns string type for a message object of type '<SetMimicGoal>"
  "cob_mimic/SetMimicGoal")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'SetMimicGoal)))
  "Returns string type for a message object of type 'SetMimicGoal"
  "cob_mimic/SetMimicGoal")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<SetMimicGoal>)))
  "Returns md5sum for a message object of type '<SetMimicGoal>"
  "6046fb0fc821e346cac6470d0911e088")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'SetMimicGoal)))
  "Returns md5sum for a message object of type 'SetMimicGoal"
  "6046fb0fc821e346cac6470d0911e088")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<SetMimicGoal>)))
  "Returns full string definition for message of type '<SetMimicGoal>"
  (cl:format cl:nil "# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%string mimic~%float32 speed~%int64 repeat~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'SetMimicGoal)))
  "Returns full string definition for message of type 'SetMimicGoal"
  (cl:format cl:nil "# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%string mimic~%float32 speed~%int64 repeat~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <SetMimicGoal>))
  (cl:+ 0
     4 (cl:length (cl:slot-value msg 'mimic))
     4
     8
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <SetMimicGoal>))
  "Converts a ROS message object to a list"
  (cl:list 'SetMimicGoal
    (cl:cons ':mimic (mimic msg))
    (cl:cons ':speed (speed msg))
    (cl:cons ':repeat (repeat msg))
))
