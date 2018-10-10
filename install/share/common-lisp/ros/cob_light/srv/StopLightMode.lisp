; Auto-generated. Do not edit!


(cl:in-package cob_light-srv)


;//! \htmlinclude StopLightMode-request.msg.html

(cl:defclass <StopLightMode-request> (roslisp-msg-protocol:ros-message)
  ((track_id
    :reader track_id
    :initarg :track_id
    :type cl:integer
    :initform 0))
)

(cl:defclass StopLightMode-request (<StopLightMode-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <StopLightMode-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'StopLightMode-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_light-srv:<StopLightMode-request> is deprecated: use cob_light-srv:StopLightMode-request instead.")))

(cl:ensure-generic-function 'track_id-val :lambda-list '(m))
(cl:defmethod track_id-val ((m <StopLightMode-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-srv:track_id-val is deprecated.  Use cob_light-srv:track_id instead.")
  (track_id m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <StopLightMode-request>) ostream)
  "Serializes a message object of type '<StopLightMode-request>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'track_id)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 8) (cl:slot-value msg 'track_id)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 16) (cl:slot-value msg 'track_id)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 24) (cl:slot-value msg 'track_id)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 32) (cl:slot-value msg 'track_id)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 40) (cl:slot-value msg 'track_id)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 48) (cl:slot-value msg 'track_id)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 56) (cl:slot-value msg 'track_id)) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <StopLightMode-request>) istream)
  "Deserializes a message object of type '<StopLightMode-request>"
    (cl:setf (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'track_id)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) (cl:slot-value msg 'track_id)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) (cl:slot-value msg 'track_id)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) (cl:slot-value msg 'track_id)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 32) (cl:slot-value msg 'track_id)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 40) (cl:slot-value msg 'track_id)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 48) (cl:slot-value msg 'track_id)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 56) (cl:slot-value msg 'track_id)) (cl:read-byte istream))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<StopLightMode-request>)))
  "Returns string type for a service object of type '<StopLightMode-request>"
  "cob_light/StopLightModeRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'StopLightMode-request)))
  "Returns string type for a service object of type 'StopLightMode-request"
  "cob_light/StopLightModeRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<StopLightMode-request>)))
  "Returns md5sum for a message object of type '<StopLightMode-request>"
  "ff63610bc77a2ca5f01313df1d115bd4")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'StopLightMode-request)))
  "Returns md5sum for a message object of type 'StopLightMode-request"
  "ff63610bc77a2ca5f01313df1d115bd4")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<StopLightMode-request>)))
  "Returns full string definition for message of type '<StopLightMode-request>"
  (cl:format cl:nil "uint64 track_id~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'StopLightMode-request)))
  "Returns full string definition for message of type 'StopLightMode-request"
  (cl:format cl:nil "uint64 track_id~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <StopLightMode-request>))
  (cl:+ 0
     8
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <StopLightMode-request>))
  "Converts a ROS message object to a list"
  (cl:list 'StopLightMode-request
    (cl:cons ':track_id (track_id msg))
))
;//! \htmlinclude StopLightMode-response.msg.html

(cl:defclass <StopLightMode-response> (roslisp-msg-protocol:ros-message)
  ((active_mode
    :reader active_mode
    :initarg :active_mode
    :type cl:fixnum
    :initform 0)
   (active_priority
    :reader active_priority
    :initarg :active_priority
    :type cl:fixnum
    :initform 0)
   (track_id
    :reader track_id
    :initarg :track_id
    :type cl:integer
    :initform 0))
)

(cl:defclass StopLightMode-response (<StopLightMode-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <StopLightMode-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'StopLightMode-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_light-srv:<StopLightMode-response> is deprecated: use cob_light-srv:StopLightMode-response instead.")))

(cl:ensure-generic-function 'active_mode-val :lambda-list '(m))
(cl:defmethod active_mode-val ((m <StopLightMode-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-srv:active_mode-val is deprecated.  Use cob_light-srv:active_mode instead.")
  (active_mode m))

(cl:ensure-generic-function 'active_priority-val :lambda-list '(m))
(cl:defmethod active_priority-val ((m <StopLightMode-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-srv:active_priority-val is deprecated.  Use cob_light-srv:active_priority instead.")
  (active_priority m))

(cl:ensure-generic-function 'track_id-val :lambda-list '(m))
(cl:defmethod track_id-val ((m <StopLightMode-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-srv:track_id-val is deprecated.  Use cob_light-srv:track_id instead.")
  (track_id m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <StopLightMode-response>) ostream)
  "Serializes a message object of type '<StopLightMode-response>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'active_mode)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'active_priority)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'track_id)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 8) (cl:slot-value msg 'track_id)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 16) (cl:slot-value msg 'track_id)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 24) (cl:slot-value msg 'track_id)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 32) (cl:slot-value msg 'track_id)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 40) (cl:slot-value msg 'track_id)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 48) (cl:slot-value msg 'track_id)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 56) (cl:slot-value msg 'track_id)) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <StopLightMode-response>) istream)
  "Deserializes a message object of type '<StopLightMode-response>"
    (cl:setf (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'active_mode)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'active_priority)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'track_id)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) (cl:slot-value msg 'track_id)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) (cl:slot-value msg 'track_id)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) (cl:slot-value msg 'track_id)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 32) (cl:slot-value msg 'track_id)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 40) (cl:slot-value msg 'track_id)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 48) (cl:slot-value msg 'track_id)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 56) (cl:slot-value msg 'track_id)) (cl:read-byte istream))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<StopLightMode-response>)))
  "Returns string type for a service object of type '<StopLightMode-response>"
  "cob_light/StopLightModeResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'StopLightMode-response)))
  "Returns string type for a service object of type 'StopLightMode-response"
  "cob_light/StopLightModeResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<StopLightMode-response>)))
  "Returns md5sum for a message object of type '<StopLightMode-response>"
  "ff63610bc77a2ca5f01313df1d115bd4")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'StopLightMode-response)))
  "Returns md5sum for a message object of type 'StopLightMode-response"
  "ff63610bc77a2ca5f01313df1d115bd4")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<StopLightMode-response>)))
  "Returns full string definition for message of type '<StopLightMode-response>"
  (cl:format cl:nil "uint8 active_mode~%uint8 active_priority~%uint64 track_id~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'StopLightMode-response)))
  "Returns full string definition for message of type 'StopLightMode-response"
  (cl:format cl:nil "uint8 active_mode~%uint8 active_priority~%uint64 track_id~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <StopLightMode-response>))
  (cl:+ 0
     1
     1
     8
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <StopLightMode-response>))
  "Converts a ROS message object to a list"
  (cl:list 'StopLightMode-response
    (cl:cons ':active_mode (active_mode msg))
    (cl:cons ':active_priority (active_priority msg))
    (cl:cons ':track_id (track_id msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'StopLightMode)))
  'StopLightMode-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'StopLightMode)))
  'StopLightMode-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'StopLightMode)))
  "Returns string type for a service object of type '<StopLightMode>"
  "cob_light/StopLightMode")