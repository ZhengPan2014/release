; Auto-generated. Do not edit!


(cl:in-package cob_light-msg)


;//! \htmlinclude LightMode.msg.html

(cl:defclass <LightMode> (roslisp-msg-protocol:ros-message)
  ((mode
    :reader mode
    :initarg :mode
    :type cl:fixnum
    :initform 0)
   (frequency
    :reader frequency
    :initarg :frequency
    :type cl:float
    :initform 0.0)
   (timeout
    :reader timeout
    :initarg :timeout
    :type cl:float
    :initform 0.0)
   (pulses
    :reader pulses
    :initarg :pulses
    :type cl:integer
    :initform 0)
   (priority
    :reader priority
    :initarg :priority
    :type cl:fixnum
    :initform 0)
   (colors
    :reader colors
    :initarg :colors
    :type (cl:vector std_msgs-msg:ColorRGBA)
   :initform (cl:make-array 0 :element-type 'std_msgs-msg:ColorRGBA :initial-element (cl:make-instance 'std_msgs-msg:ColorRGBA)))
   (sequences
    :reader sequences
    :initarg :sequences
    :type (cl:vector cob_light-msg:Sequence)
   :initform (cl:make-array 0 :element-type 'cob_light-msg:Sequence :initial-element (cl:make-instance 'cob_light-msg:Sequence))))
)

(cl:defclass LightMode (<LightMode>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <LightMode>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'LightMode)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_light-msg:<LightMode> is deprecated: use cob_light-msg:LightMode instead.")))

(cl:ensure-generic-function 'mode-val :lambda-list '(m))
(cl:defmethod mode-val ((m <LightMode>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-msg:mode-val is deprecated.  Use cob_light-msg:mode instead.")
  (mode m))

(cl:ensure-generic-function 'frequency-val :lambda-list '(m))
(cl:defmethod frequency-val ((m <LightMode>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-msg:frequency-val is deprecated.  Use cob_light-msg:frequency instead.")
  (frequency m))

(cl:ensure-generic-function 'timeout-val :lambda-list '(m))
(cl:defmethod timeout-val ((m <LightMode>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-msg:timeout-val is deprecated.  Use cob_light-msg:timeout instead.")
  (timeout m))

(cl:ensure-generic-function 'pulses-val :lambda-list '(m))
(cl:defmethod pulses-val ((m <LightMode>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-msg:pulses-val is deprecated.  Use cob_light-msg:pulses instead.")
  (pulses m))

(cl:ensure-generic-function 'priority-val :lambda-list '(m))
(cl:defmethod priority-val ((m <LightMode>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-msg:priority-val is deprecated.  Use cob_light-msg:priority instead.")
  (priority m))

(cl:ensure-generic-function 'colors-val :lambda-list '(m))
(cl:defmethod colors-val ((m <LightMode>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-msg:colors-val is deprecated.  Use cob_light-msg:colors instead.")
  (colors m))

(cl:ensure-generic-function 'sequences-val :lambda-list '(m))
(cl:defmethod sequences-val ((m <LightMode>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-msg:sequences-val is deprecated.  Use cob_light-msg:sequences instead.")
  (sequences m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <LightMode>) ostream)
  "Serializes a message object of type '<LightMode>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'mode)) ostream)
  (cl:let ((bits (roslisp-utils:encode-single-float-bits (cl:slot-value msg 'frequency))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-single-float-bits (cl:slot-value msg 'timeout))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream))
  (cl:let* ((signed (cl:slot-value msg 'pulses)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'priority)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 256) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    )
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'colors))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (roslisp-msg-protocol:serialize ele ostream))
   (cl:slot-value msg 'colors))
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'sequences))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (roslisp-msg-protocol:serialize ele ostream))
   (cl:slot-value msg 'sequences))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <LightMode>) istream)
  "Deserializes a message object of type '<LightMode>"
    (cl:setf (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'mode)) (cl:read-byte istream))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'frequency) (roslisp-utils:decode-single-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'timeout) (roslisp-utils:decode-single-float-bits bits)))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'pulses) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'priority) (cl:if (cl:< unsigned 128) unsigned (cl:- unsigned 256))))
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'colors) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'colors)))
    (cl:dotimes (i __ros_arr_len)
    (cl:setf (cl:aref vals i) (cl:make-instance 'std_msgs-msg:ColorRGBA))
  (roslisp-msg-protocol:deserialize (cl:aref vals i) istream))))
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'sequences) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'sequences)))
    (cl:dotimes (i __ros_arr_len)
    (cl:setf (cl:aref vals i) (cl:make-instance 'cob_light-msg:Sequence))
  (roslisp-msg-protocol:deserialize (cl:aref vals i) istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<LightMode>)))
  "Returns string type for a message object of type '<LightMode>"
  "cob_light/LightMode")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'LightMode)))
  "Returns string type for a message object of type 'LightMode"
  "cob_light/LightMode")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<LightMode>)))
  "Returns md5sum for a message object of type '<LightMode>"
  "7aecb45b0da2ee8d387f2bec4ee2faf9")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'LightMode)))
  "Returns md5sum for a message object of type 'LightMode"
  "7aecb45b0da2ee8d387f2bec4ee2faf9")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<LightMode>)))
  "Returns full string definition for message of type '<LightMode>"
  (cl:format cl:nil "uint8 mode                         # mode to switch on~%~%float32                frequency   # in Hz~%float32                timeout     # in s, requested mode will be executed for max timeout s.~%                                   # default is 0 and means no timeout.~%int32                  pulses      # specifies the amount of pulses which will be executed.~%                                   # eg: mode = flash, pulses = 2. Means the light will flash two times~%int8                   priority    # priority [-20,20] default = 0. Modes with same or higher priorities will~%                                   # be executed.~%std_msgs/ColorRGBA[]   colors      # array of colors.~%                                   # size > 1: each color represent one led (size should match the amount of leds)~%                                   # size = 1: one color for all leds or color for specific mode~%                                   # size = 0: undefined~%cob_light/Sequence[]   sequences   # an array of sequence definitions, used only if mode is set to SEQ~%~%================================================================================~%MSG: std_msgs/ColorRGBA~%float32 r~%float32 g~%float32 b~%float32 a~%~%================================================================================~%MSG: cob_light/Sequence~%std_msgs/ColorRGBA   color       #sequence color~%float32              hold_time   #time how long the color should be hold [s]~%float32              cross_time  #time how long it take to fade to this color [s]~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'LightMode)))
  "Returns full string definition for message of type 'LightMode"
  (cl:format cl:nil "uint8 mode                         # mode to switch on~%~%float32                frequency   # in Hz~%float32                timeout     # in s, requested mode will be executed for max timeout s.~%                                   # default is 0 and means no timeout.~%int32                  pulses      # specifies the amount of pulses which will be executed.~%                                   # eg: mode = flash, pulses = 2. Means the light will flash two times~%int8                   priority    # priority [-20,20] default = 0. Modes with same or higher priorities will~%                                   # be executed.~%std_msgs/ColorRGBA[]   colors      # array of colors.~%                                   # size > 1: each color represent one led (size should match the amount of leds)~%                                   # size = 1: one color for all leds or color for specific mode~%                                   # size = 0: undefined~%cob_light/Sequence[]   sequences   # an array of sequence definitions, used only if mode is set to SEQ~%~%================================================================================~%MSG: std_msgs/ColorRGBA~%float32 r~%float32 g~%float32 b~%float32 a~%~%================================================================================~%MSG: cob_light/Sequence~%std_msgs/ColorRGBA   color       #sequence color~%float32              hold_time   #time how long the color should be hold [s]~%float32              cross_time  #time how long it take to fade to this color [s]~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <LightMode>))
  (cl:+ 0
     1
     4
     4
     4
     1
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'colors) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ (roslisp-msg-protocol:serialization-length ele))))
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'sequences) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ (roslisp-msg-protocol:serialization-length ele))))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <LightMode>))
  "Converts a ROS message object to a list"
  (cl:list 'LightMode
    (cl:cons ':mode (mode msg))
    (cl:cons ':frequency (frequency msg))
    (cl:cons ':timeout (timeout msg))
    (cl:cons ':pulses (pulses msg))
    (cl:cons ':priority (priority msg))
    (cl:cons ':colors (colors msg))
    (cl:cons ':sequences (sequences msg))
))
