; Auto-generated. Do not edit!


(cl:in-package cob_light-srv)


;//! \htmlinclude SetLightMode-request.msg.html

(cl:defclass <SetLightMode-request> (roslisp-msg-protocol:ros-message)
  ((mode
    :reader mode
    :initarg :mode
    :type cob_light-msg:LightMode
    :initform (cl:make-instance 'cob_light-msg:LightMode)))
)

(cl:defclass SetLightMode-request (<SetLightMode-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <SetLightMode-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'SetLightMode-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_light-srv:<SetLightMode-request> is deprecated: use cob_light-srv:SetLightMode-request instead.")))

(cl:ensure-generic-function 'mode-val :lambda-list '(m))
(cl:defmethod mode-val ((m <SetLightMode-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-srv:mode-val is deprecated.  Use cob_light-srv:mode instead.")
  (mode m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <SetLightMode-request>) ostream)
  "Serializes a message object of type '<SetLightMode-request>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'mode) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <SetLightMode-request>) istream)
  "Deserializes a message object of type '<SetLightMode-request>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'mode) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<SetLightMode-request>)))
  "Returns string type for a service object of type '<SetLightMode-request>"
  "cob_light/SetLightModeRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'SetLightMode-request)))
  "Returns string type for a service object of type 'SetLightMode-request"
  "cob_light/SetLightModeRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<SetLightMode-request>)))
  "Returns md5sum for a message object of type '<SetLightMode-request>"
  "f950166d97058c12e842261aa35075dd")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'SetLightMode-request)))
  "Returns md5sum for a message object of type 'SetLightMode-request"
  "f950166d97058c12e842261aa35075dd")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<SetLightMode-request>)))
  "Returns full string definition for message of type '<SetLightMode-request>"
  (cl:format cl:nil "cob_light/LightMode mode~%~%================================================================================~%MSG: cob_light/LightMode~%uint8 mode                         # mode to switch on~%~%float32                frequency   # in Hz~%float32                timeout     # in s, requested mode will be executed for max timeout s.~%                                   # default is 0 and means no timeout.~%int32                  pulses      # specifies the amount of pulses which will be executed.~%                                   # eg: mode = flash, pulses = 2. Means the light will flash two times~%int8                   priority    # priority [-20,20] default = 0. Modes with same or higher priorities will~%                                   # be executed.~%std_msgs/ColorRGBA[]   colors      # array of colors.~%                                   # size > 1: each color represent one led (size should match the amount of leds)~%                                   # size = 1: one color for all leds or color for specific mode~%                                   # size = 0: undefined~%cob_light/Sequence[]   sequences   # an array of sequence definitions, used only if mode is set to SEQ~%~%================================================================================~%MSG: std_msgs/ColorRGBA~%float32 r~%float32 g~%float32 b~%float32 a~%~%================================================================================~%MSG: cob_light/Sequence~%std_msgs/ColorRGBA   color       #sequence color~%float32              hold_time   #time how long the color should be hold [s]~%float32              cross_time  #time how long it take to fade to this color [s]~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'SetLightMode-request)))
  "Returns full string definition for message of type 'SetLightMode-request"
  (cl:format cl:nil "cob_light/LightMode mode~%~%================================================================================~%MSG: cob_light/LightMode~%uint8 mode                         # mode to switch on~%~%float32                frequency   # in Hz~%float32                timeout     # in s, requested mode will be executed for max timeout s.~%                                   # default is 0 and means no timeout.~%int32                  pulses      # specifies the amount of pulses which will be executed.~%                                   # eg: mode = flash, pulses = 2. Means the light will flash two times~%int8                   priority    # priority [-20,20] default = 0. Modes with same or higher priorities will~%                                   # be executed.~%std_msgs/ColorRGBA[]   colors      # array of colors.~%                                   # size > 1: each color represent one led (size should match the amount of leds)~%                                   # size = 1: one color for all leds or color for specific mode~%                                   # size = 0: undefined~%cob_light/Sequence[]   sequences   # an array of sequence definitions, used only if mode is set to SEQ~%~%================================================================================~%MSG: std_msgs/ColorRGBA~%float32 r~%float32 g~%float32 b~%float32 a~%~%================================================================================~%MSG: cob_light/Sequence~%std_msgs/ColorRGBA   color       #sequence color~%float32              hold_time   #time how long the color should be hold [s]~%float32              cross_time  #time how long it take to fade to this color [s]~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <SetLightMode-request>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'mode))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <SetLightMode-request>))
  "Converts a ROS message object to a list"
  (cl:list 'SetLightMode-request
    (cl:cons ':mode (mode msg))
))
;//! \htmlinclude SetLightMode-response.msg.html

(cl:defclass <SetLightMode-response> (roslisp-msg-protocol:ros-message)
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

(cl:defclass SetLightMode-response (<SetLightMode-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <SetLightMode-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'SetLightMode-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_light-srv:<SetLightMode-response> is deprecated: use cob_light-srv:SetLightMode-response instead.")))

(cl:ensure-generic-function 'active_mode-val :lambda-list '(m))
(cl:defmethod active_mode-val ((m <SetLightMode-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-srv:active_mode-val is deprecated.  Use cob_light-srv:active_mode instead.")
  (active_mode m))

(cl:ensure-generic-function 'active_priority-val :lambda-list '(m))
(cl:defmethod active_priority-val ((m <SetLightMode-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-srv:active_priority-val is deprecated.  Use cob_light-srv:active_priority instead.")
  (active_priority m))

(cl:ensure-generic-function 'track_id-val :lambda-list '(m))
(cl:defmethod track_id-val ((m <SetLightMode-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-srv:track_id-val is deprecated.  Use cob_light-srv:track_id instead.")
  (track_id m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <SetLightMode-response>) ostream)
  "Serializes a message object of type '<SetLightMode-response>"
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
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <SetLightMode-response>) istream)
  "Deserializes a message object of type '<SetLightMode-response>"
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
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<SetLightMode-response>)))
  "Returns string type for a service object of type '<SetLightMode-response>"
  "cob_light/SetLightModeResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'SetLightMode-response)))
  "Returns string type for a service object of type 'SetLightMode-response"
  "cob_light/SetLightModeResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<SetLightMode-response>)))
  "Returns md5sum for a message object of type '<SetLightMode-response>"
  "f950166d97058c12e842261aa35075dd")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'SetLightMode-response)))
  "Returns md5sum for a message object of type 'SetLightMode-response"
  "f950166d97058c12e842261aa35075dd")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<SetLightMode-response>)))
  "Returns full string definition for message of type '<SetLightMode-response>"
  (cl:format cl:nil "uint8 active_mode~%uint8 active_priority~%uint64 track_id~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'SetLightMode-response)))
  "Returns full string definition for message of type 'SetLightMode-response"
  (cl:format cl:nil "uint8 active_mode~%uint8 active_priority~%uint64 track_id~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <SetLightMode-response>))
  (cl:+ 0
     1
     1
     8
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <SetLightMode-response>))
  "Converts a ROS message object to a list"
  (cl:list 'SetLightMode-response
    (cl:cons ':active_mode (active_mode msg))
    (cl:cons ':active_priority (active_priority msg))
    (cl:cons ':track_id (track_id msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'SetLightMode)))
  'SetLightMode-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'SetLightMode)))
  'SetLightMode-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'SetLightMode)))
  "Returns string type for a service object of type '<SetLightMode>"
  "cob_light/SetLightMode")