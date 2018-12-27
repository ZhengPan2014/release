; Auto-generated. Do not edit!


(cl:in-package cob_control_msgs-srv)


;//! \htmlinclude GetObstacleDistance-request.msg.html

(cl:defclass <GetObstacleDistance-request> (roslisp-msg-protocol:ros-message)
  ((links
    :reader links
    :initarg :links
    :type (cl:vector cl:string)
   :initform (cl:make-array 0 :element-type 'cl:string :initial-element ""))
   (objects
    :reader objects
    :initarg :objects
    :type (cl:vector cl:string)
   :initform (cl:make-array 0 :element-type 'cl:string :initial-element "")))
)

(cl:defclass GetObstacleDistance-request (<GetObstacleDistance-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <GetObstacleDistance-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'GetObstacleDistance-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_control_msgs-srv:<GetObstacleDistance-request> is deprecated: use cob_control_msgs-srv:GetObstacleDistance-request instead.")))

(cl:ensure-generic-function 'links-val :lambda-list '(m))
(cl:defmethod links-val ((m <GetObstacleDistance-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_control_msgs-srv:links-val is deprecated.  Use cob_control_msgs-srv:links instead.")
  (links m))

(cl:ensure-generic-function 'objects-val :lambda-list '(m))
(cl:defmethod objects-val ((m <GetObstacleDistance-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_control_msgs-srv:objects-val is deprecated.  Use cob_control_msgs-srv:objects instead.")
  (objects m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <GetObstacleDistance-request>) ostream)
  "Serializes a message object of type '<GetObstacleDistance-request>"
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'links))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (cl:let ((__ros_str_len (cl:length ele)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) ele))
   (cl:slot-value msg 'links))
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'objects))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (cl:let ((__ros_str_len (cl:length ele)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) ele))
   (cl:slot-value msg 'objects))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <GetObstacleDistance-request>) istream)
  "Deserializes a message object of type '<GetObstacleDistance-request>"
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'links) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'links)))
    (cl:dotimes (i __ros_arr_len)
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:aref vals i) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:aref vals i) __ros_str_idx) (cl:code-char (cl:read-byte istream))))))))
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'objects) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'objects)))
    (cl:dotimes (i __ros_arr_len)
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:aref vals i) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:aref vals i) __ros_str_idx) (cl:code-char (cl:read-byte istream))))))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<GetObstacleDistance-request>)))
  "Returns string type for a service object of type '<GetObstacleDistance-request>"
  "cob_control_msgs/GetObstacleDistanceRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'GetObstacleDistance-request)))
  "Returns string type for a service object of type 'GetObstacleDistance-request"
  "cob_control_msgs/GetObstacleDistanceRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<GetObstacleDistance-request>)))
  "Returns md5sum for a message object of type '<GetObstacleDistance-request>"
  "f7fa899b8b5bba2d5f4beecae1d4101b")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'GetObstacleDistance-request)))
  "Returns md5sum for a message object of type 'GetObstacleDistance-request"
  "f7fa899b8b5bba2d5f4beecae1d4101b")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<GetObstacleDistance-request>)))
  "Returns full string definition for message of type '<GetObstacleDistance-request>"
  (cl:format cl:nil "string[] links~%string[] objects~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'GetObstacleDistance-request)))
  "Returns full string definition for message of type 'GetObstacleDistance-request"
  (cl:format cl:nil "string[] links~%string[] objects~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <GetObstacleDistance-request>))
  (cl:+ 0
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'links) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 4 (cl:length ele))))
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'objects) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 4 (cl:length ele))))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <GetObstacleDistance-request>))
  "Converts a ROS message object to a list"
  (cl:list 'GetObstacleDistance-request
    (cl:cons ':links (links msg))
    (cl:cons ':objects (objects msg))
))
;//! \htmlinclude GetObstacleDistance-response.msg.html

(cl:defclass <GetObstacleDistance-response> (roslisp-msg-protocol:ros-message)
  ((link_to_object
    :reader link_to_object
    :initarg :link_to_object
    :type (cl:vector cl:string)
   :initform (cl:make-array 0 :element-type 'cl:string :initial-element ""))
   (distances
    :reader distances
    :initarg :distances
    :type (cl:vector cl:float)
   :initform (cl:make-array 0 :element-type 'cl:float :initial-element 0.0)))
)

(cl:defclass GetObstacleDistance-response (<GetObstacleDistance-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <GetObstacleDistance-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'GetObstacleDistance-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_control_msgs-srv:<GetObstacleDistance-response> is deprecated: use cob_control_msgs-srv:GetObstacleDistance-response instead.")))

(cl:ensure-generic-function 'link_to_object-val :lambda-list '(m))
(cl:defmethod link_to_object-val ((m <GetObstacleDistance-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_control_msgs-srv:link_to_object-val is deprecated.  Use cob_control_msgs-srv:link_to_object instead.")
  (link_to_object m))

(cl:ensure-generic-function 'distances-val :lambda-list '(m))
(cl:defmethod distances-val ((m <GetObstacleDistance-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_control_msgs-srv:distances-val is deprecated.  Use cob_control_msgs-srv:distances instead.")
  (distances m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <GetObstacleDistance-response>) ostream)
  "Serializes a message object of type '<GetObstacleDistance-response>"
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'link_to_object))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (cl:let ((__ros_str_len (cl:length ele)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) ele))
   (cl:slot-value msg 'link_to_object))
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'distances))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (cl:let ((bits (roslisp-utils:encode-double-float-bits ele)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream)))
   (cl:slot-value msg 'distances))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <GetObstacleDistance-response>) istream)
  "Deserializes a message object of type '<GetObstacleDistance-response>"
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'link_to_object) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'link_to_object)))
    (cl:dotimes (i __ros_arr_len)
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:aref vals i) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:aref vals i) __ros_str_idx) (cl:code-char (cl:read-byte istream))))))))
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'distances) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'distances)))
    (cl:dotimes (i __ros_arr_len)
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:aref vals i) (roslisp-utils:decode-double-float-bits bits))))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<GetObstacleDistance-response>)))
  "Returns string type for a service object of type '<GetObstacleDistance-response>"
  "cob_control_msgs/GetObstacleDistanceResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'GetObstacleDistance-response)))
  "Returns string type for a service object of type 'GetObstacleDistance-response"
  "cob_control_msgs/GetObstacleDistanceResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<GetObstacleDistance-response>)))
  "Returns md5sum for a message object of type '<GetObstacleDistance-response>"
  "f7fa899b8b5bba2d5f4beecae1d4101b")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'GetObstacleDistance-response)))
  "Returns md5sum for a message object of type 'GetObstacleDistance-response"
  "f7fa899b8b5bba2d5f4beecae1d4101b")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<GetObstacleDistance-response>)))
  "Returns full string definition for message of type '<GetObstacleDistance-response>"
  (cl:format cl:nil "string[] link_to_object~%float64[] distances~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'GetObstacleDistance-response)))
  "Returns full string definition for message of type 'GetObstacleDistance-response"
  (cl:format cl:nil "string[] link_to_object~%float64[] distances~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <GetObstacleDistance-response>))
  (cl:+ 0
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'link_to_object) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 4 (cl:length ele))))
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'distances) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 8)))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <GetObstacleDistance-response>))
  "Converts a ROS message object to a list"
  (cl:list 'GetObstacleDistance-response
    (cl:cons ':link_to_object (link_to_object msg))
    (cl:cons ':distances (distances msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'GetObstacleDistance)))
  'GetObstacleDistance-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'GetObstacleDistance)))
  'GetObstacleDistance-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'GetObstacleDistance)))
  "Returns string type for a service object of type '<GetObstacleDistance>"
  "cob_control_msgs/GetObstacleDistance")