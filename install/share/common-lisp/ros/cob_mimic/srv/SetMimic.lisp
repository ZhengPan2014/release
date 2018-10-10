; Auto-generated. Do not edit!


(cl:in-package cob_mimic-srv)


;//! \htmlinclude SetMimic-request.msg.html

(cl:defclass <SetMimic-request> (roslisp-msg-protocol:ros-message)
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

(cl:defclass SetMimic-request (<SetMimic-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <SetMimic-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'SetMimic-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_mimic-srv:<SetMimic-request> is deprecated: use cob_mimic-srv:SetMimic-request instead.")))

(cl:ensure-generic-function 'mimic-val :lambda-list '(m))
(cl:defmethod mimic-val ((m <SetMimic-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_mimic-srv:mimic-val is deprecated.  Use cob_mimic-srv:mimic instead.")
  (mimic m))

(cl:ensure-generic-function 'speed-val :lambda-list '(m))
(cl:defmethod speed-val ((m <SetMimic-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_mimic-srv:speed-val is deprecated.  Use cob_mimic-srv:speed instead.")
  (speed m))

(cl:ensure-generic-function 'repeat-val :lambda-list '(m))
(cl:defmethod repeat-val ((m <SetMimic-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_mimic-srv:repeat-val is deprecated.  Use cob_mimic-srv:repeat instead.")
  (repeat m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <SetMimic-request>) ostream)
  "Serializes a message object of type '<SetMimic-request>"
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
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <SetMimic-request>) istream)
  "Deserializes a message object of type '<SetMimic-request>"
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
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<SetMimic-request>)))
  "Returns string type for a service object of type '<SetMimic-request>"
  "cob_mimic/SetMimicRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'SetMimic-request)))
  "Returns string type for a service object of type 'SetMimic-request"
  "cob_mimic/SetMimicRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<SetMimic-request>)))
  "Returns md5sum for a message object of type '<SetMimic-request>"
  "6208b318f8a11d5e267db8872705f8c3")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'SetMimic-request)))
  "Returns md5sum for a message object of type 'SetMimic-request"
  "6208b318f8a11d5e267db8872705f8c3")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<SetMimic-request>)))
  "Returns full string definition for message of type '<SetMimic-request>"
  (cl:format cl:nil "string mimic~%float32 speed~%int64 repeat~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'SetMimic-request)))
  "Returns full string definition for message of type 'SetMimic-request"
  (cl:format cl:nil "string mimic~%float32 speed~%int64 repeat~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <SetMimic-request>))
  (cl:+ 0
     4 (cl:length (cl:slot-value msg 'mimic))
     4
     8
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <SetMimic-request>))
  "Converts a ROS message object to a list"
  (cl:list 'SetMimic-request
    (cl:cons ':mimic (mimic msg))
    (cl:cons ':speed (speed msg))
    (cl:cons ':repeat (repeat msg))
))
;//! \htmlinclude SetMimic-response.msg.html

(cl:defclass <SetMimic-response> (roslisp-msg-protocol:ros-message)
  ((success
    :reader success
    :initarg :success
    :type cl:boolean
    :initform cl:nil)
   (message
    :reader message
    :initarg :message
    :type cl:string
    :initform ""))
)

(cl:defclass SetMimic-response (<SetMimic-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <SetMimic-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'SetMimic-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_mimic-srv:<SetMimic-response> is deprecated: use cob_mimic-srv:SetMimic-response instead.")))

(cl:ensure-generic-function 'success-val :lambda-list '(m))
(cl:defmethod success-val ((m <SetMimic-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_mimic-srv:success-val is deprecated.  Use cob_mimic-srv:success instead.")
  (success m))

(cl:ensure-generic-function 'message-val :lambda-list '(m))
(cl:defmethod message-val ((m <SetMimic-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_mimic-srv:message-val is deprecated.  Use cob_mimic-srv:message instead.")
  (message m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <SetMimic-response>) ostream)
  "Serializes a message object of type '<SetMimic-response>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'success) 1 0)) ostream)
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'message))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'message))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <SetMimic-response>) istream)
  "Deserializes a message object of type '<SetMimic-response>"
    (cl:setf (cl:slot-value msg 'success) (cl:not (cl:zerop (cl:read-byte istream))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'message) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'message) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<SetMimic-response>)))
  "Returns string type for a service object of type '<SetMimic-response>"
  "cob_mimic/SetMimicResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'SetMimic-response)))
  "Returns string type for a service object of type 'SetMimic-response"
  "cob_mimic/SetMimicResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<SetMimic-response>)))
  "Returns md5sum for a message object of type '<SetMimic-response>"
  "6208b318f8a11d5e267db8872705f8c3")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'SetMimic-response)))
  "Returns md5sum for a message object of type 'SetMimic-response"
  "6208b318f8a11d5e267db8872705f8c3")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<SetMimic-response>)))
  "Returns full string definition for message of type '<SetMimic-response>"
  (cl:format cl:nil "bool success~%string message~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'SetMimic-response)))
  "Returns full string definition for message of type 'SetMimic-response"
  (cl:format cl:nil "bool success~%string message~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <SetMimic-response>))
  (cl:+ 0
     1
     4 (cl:length (cl:slot-value msg 'message))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <SetMimic-response>))
  "Converts a ROS message object to a list"
  (cl:list 'SetMimic-response
    (cl:cons ':success (success msg))
    (cl:cons ':message (message msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'SetMimic)))
  'SetMimic-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'SetMimic)))
  'SetMimic-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'SetMimic)))
  "Returns string type for a service object of type '<SetMimic>"
  "cob_mimic/SetMimic")