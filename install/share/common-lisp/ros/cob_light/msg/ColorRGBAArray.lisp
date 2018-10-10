; Auto-generated. Do not edit!


(cl:in-package cob_light-msg)


;//! \htmlinclude ColorRGBAArray.msg.html

(cl:defclass <ColorRGBAArray> (roslisp-msg-protocol:ros-message)
  ((colors
    :reader colors
    :initarg :colors
    :type (cl:vector std_msgs-msg:ColorRGBA)
   :initform (cl:make-array 0 :element-type 'std_msgs-msg:ColorRGBA :initial-element (cl:make-instance 'std_msgs-msg:ColorRGBA))))
)

(cl:defclass ColorRGBAArray (<ColorRGBAArray>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <ColorRGBAArray>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'ColorRGBAArray)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_light-msg:<ColorRGBAArray> is deprecated: use cob_light-msg:ColorRGBAArray instead.")))

(cl:ensure-generic-function 'colors-val :lambda-list '(m))
(cl:defmethod colors-val ((m <ColorRGBAArray>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_light-msg:colors-val is deprecated.  Use cob_light-msg:colors instead.")
  (colors m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <ColorRGBAArray>) ostream)
  "Serializes a message object of type '<ColorRGBAArray>"
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'colors))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (roslisp-msg-protocol:serialize ele ostream))
   (cl:slot-value msg 'colors))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <ColorRGBAArray>) istream)
  "Deserializes a message object of type '<ColorRGBAArray>"
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
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<ColorRGBAArray>)))
  "Returns string type for a message object of type '<ColorRGBAArray>"
  "cob_light/ColorRGBAArray")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ColorRGBAArray)))
  "Returns string type for a message object of type 'ColorRGBAArray"
  "cob_light/ColorRGBAArray")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<ColorRGBAArray>)))
  "Returns md5sum for a message object of type '<ColorRGBAArray>"
  "8a8aae411a07648ba08dd6bedf519336")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'ColorRGBAArray)))
  "Returns md5sum for a message object of type 'ColorRGBAArray"
  "8a8aae411a07648ba08dd6bedf519336")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<ColorRGBAArray>)))
  "Returns full string definition for message of type '<ColorRGBAArray>"
  (cl:format cl:nil "std_msgs/ColorRGBA[] colors~%~%================================================================================~%MSG: std_msgs/ColorRGBA~%float32 r~%float32 g~%float32 b~%float32 a~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'ColorRGBAArray)))
  "Returns full string definition for message of type 'ColorRGBAArray"
  (cl:format cl:nil "std_msgs/ColorRGBA[] colors~%~%================================================================================~%MSG: std_msgs/ColorRGBA~%float32 r~%float32 g~%float32 b~%float32 a~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <ColorRGBAArray>))
  (cl:+ 0
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'colors) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ (roslisp-msg-protocol:serialization-length ele))))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <ColorRGBAArray>))
  "Converts a ROS message object to a list"
  (cl:list 'ColorRGBAArray
    (cl:cons ':colors (colors msg))
))
