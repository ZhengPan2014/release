; Auto-generated. Do not edit!


(cl:in-package cob_frame_tracker-msg)


;//! \htmlinclude FrameTrackingGoal.msg.html

(cl:defclass <FrameTrackingGoal> (roslisp-msg-protocol:ros-message)
  ((tracking_frame
    :reader tracking_frame
    :initarg :tracking_frame
    :type cl:string
    :initform "")
   (tracking_duration
    :reader tracking_duration
    :initarg :tracking_duration
    :type cl:float
    :initform 0.0)
   (stop_on_goal
    :reader stop_on_goal
    :initarg :stop_on_goal
    :type cl:boolean
    :initform cl:nil))
)

(cl:defclass FrameTrackingGoal (<FrameTrackingGoal>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <FrameTrackingGoal>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'FrameTrackingGoal)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_frame_tracker-msg:<FrameTrackingGoal> is deprecated: use cob_frame_tracker-msg:FrameTrackingGoal instead.")))

(cl:ensure-generic-function 'tracking_frame-val :lambda-list '(m))
(cl:defmethod tracking_frame-val ((m <FrameTrackingGoal>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_frame_tracker-msg:tracking_frame-val is deprecated.  Use cob_frame_tracker-msg:tracking_frame instead.")
  (tracking_frame m))

(cl:ensure-generic-function 'tracking_duration-val :lambda-list '(m))
(cl:defmethod tracking_duration-val ((m <FrameTrackingGoal>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_frame_tracker-msg:tracking_duration-val is deprecated.  Use cob_frame_tracker-msg:tracking_duration instead.")
  (tracking_duration m))

(cl:ensure-generic-function 'stop_on_goal-val :lambda-list '(m))
(cl:defmethod stop_on_goal-val ((m <FrameTrackingGoal>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_frame_tracker-msg:stop_on_goal-val is deprecated.  Use cob_frame_tracker-msg:stop_on_goal instead.")
  (stop_on_goal m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <FrameTrackingGoal>) ostream)
  "Serializes a message object of type '<FrameTrackingGoal>"
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'tracking_frame))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'tracking_frame))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'tracking_duration))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'stop_on_goal) 1 0)) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <FrameTrackingGoal>) istream)
  "Deserializes a message object of type '<FrameTrackingGoal>"
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'tracking_frame) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'tracking_frame) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'tracking_duration) (roslisp-utils:decode-double-float-bits bits)))
    (cl:setf (cl:slot-value msg 'stop_on_goal) (cl:not (cl:zerop (cl:read-byte istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<FrameTrackingGoal>)))
  "Returns string type for a message object of type '<FrameTrackingGoal>"
  "cob_frame_tracker/FrameTrackingGoal")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'FrameTrackingGoal)))
  "Returns string type for a message object of type 'FrameTrackingGoal"
  "cob_frame_tracker/FrameTrackingGoal")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<FrameTrackingGoal>)))
  "Returns md5sum for a message object of type '<FrameTrackingGoal>"
  "1f45d520be90e58935a41f5719d09f2e")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'FrameTrackingGoal)))
  "Returns md5sum for a message object of type 'FrameTrackingGoal"
  "1f45d520be90e58935a41f5719d09f2e")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<FrameTrackingGoal>)))
  "Returns full string definition for message of type '<FrameTrackingGoal>"
  (cl:format cl:nil "# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%## goal definition~%~%# frame to track~%string tracking_frame~%~%# max time to track~%float64 tracking_duration~%~%# stop tracking when goal is reached?~%bool stop_on_goal~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'FrameTrackingGoal)))
  "Returns full string definition for message of type 'FrameTrackingGoal"
  (cl:format cl:nil "# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%## goal definition~%~%# frame to track~%string tracking_frame~%~%# max time to track~%float64 tracking_duration~%~%# stop tracking when goal is reached?~%bool stop_on_goal~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <FrameTrackingGoal>))
  (cl:+ 0
     4 (cl:length (cl:slot-value msg 'tracking_frame))
     8
     1
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <FrameTrackingGoal>))
  "Converts a ROS message object to a list"
  (cl:list 'FrameTrackingGoal
    (cl:cons ':tracking_frame (tracking_frame msg))
    (cl:cons ':tracking_duration (tracking_duration msg))
    (cl:cons ':stop_on_goal (stop_on_goal msg))
))
