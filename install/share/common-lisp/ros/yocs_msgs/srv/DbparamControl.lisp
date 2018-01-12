; Auto-generated. Do not edit!


(cl:in-package yocs_msgs-srv)


;//! \htmlinclude DbparamControl-request.msg.html

(cl:defclass <DbparamControl-request> (roslisp-msg-protocol:ros-message)
  ((control
    :reader control
    :initarg :control
    :type cl:string
    :initform "")
   (params
    :reader params
    :initarg :params
    :type cl:string
    :initform ""))
)

(cl:defclass DbparamControl-request (<DbparamControl-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <DbparamControl-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'DbparamControl-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name yocs_msgs-srv:<DbparamControl-request> is deprecated: use yocs_msgs-srv:DbparamControl-request instead.")))

(cl:ensure-generic-function 'control-val :lambda-list '(m))
(cl:defmethod control-val ((m <DbparamControl-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader yocs_msgs-srv:control-val is deprecated.  Use yocs_msgs-srv:control instead.")
  (control m))

(cl:ensure-generic-function 'params-val :lambda-list '(m))
(cl:defmethod params-val ((m <DbparamControl-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader yocs_msgs-srv:params-val is deprecated.  Use yocs_msgs-srv:params instead.")
  (params m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <DbparamControl-request>) ostream)
  "Serializes a message object of type '<DbparamControl-request>"
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'control))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'control))
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'params))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'params))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <DbparamControl-request>) istream)
  "Deserializes a message object of type '<DbparamControl-request>"
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'control) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'control) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'params) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'params) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<DbparamControl-request>)))
  "Returns string type for a service object of type '<DbparamControl-request>"
  "yocs_msgs/DbparamControlRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'DbparamControl-request)))
  "Returns string type for a service object of type 'DbparamControl-request"
  "yocs_msgs/DbparamControlRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<DbparamControl-request>)))
  "Returns md5sum for a message object of type '<DbparamControl-request>"
  "7cf3fb1e2aa2ce5fbceda13ef8ec9f9f")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'DbparamControl-request)))
  "Returns md5sum for a message object of type 'DbparamControl-request"
  "7cf3fb1e2aa2ce5fbceda13ef8ec9f9f")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<DbparamControl-request>)))
  "Returns full string definition for message of type '<DbparamControl-request>"
  (cl:format cl:nil "~%~%~%~%~%~%~%~%~%~%~%string control~%string params~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'DbparamControl-request)))
  "Returns full string definition for message of type 'DbparamControl-request"
  (cl:format cl:nil "~%~%~%~%~%~%~%~%~%~%~%string control~%string params~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <DbparamControl-request>))
  (cl:+ 0
     4 (cl:length (cl:slot-value msg 'control))
     4 (cl:length (cl:slot-value msg 'params))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <DbparamControl-request>))
  "Converts a ROS message object to a list"
  (cl:list 'DbparamControl-request
    (cl:cons ':control (control msg))
    (cl:cons ':params (params msg))
))
;//! \htmlinclude DbparamControl-response.msg.html

(cl:defclass <DbparamControl-response> (roslisp-msg-protocol:ros-message)
  ((success
    :reader success
    :initarg :success
    :type cl:boolean
    :initform cl:nil)
   (message
    :reader message
    :initarg :message
    :type cl:string
    :initform "")
   (branches
    :reader branches
    :initarg :branches
    :type (cl:vector cl:string)
   :initform (cl:make-array 0 :element-type 'cl:string :initial-element "")))
)

(cl:defclass DbparamControl-response (<DbparamControl-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <DbparamControl-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'DbparamControl-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name yocs_msgs-srv:<DbparamControl-response> is deprecated: use yocs_msgs-srv:DbparamControl-response instead.")))

(cl:ensure-generic-function 'success-val :lambda-list '(m))
(cl:defmethod success-val ((m <DbparamControl-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader yocs_msgs-srv:success-val is deprecated.  Use yocs_msgs-srv:success instead.")
  (success m))

(cl:ensure-generic-function 'message-val :lambda-list '(m))
(cl:defmethod message-val ((m <DbparamControl-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader yocs_msgs-srv:message-val is deprecated.  Use yocs_msgs-srv:message instead.")
  (message m))

(cl:ensure-generic-function 'branches-val :lambda-list '(m))
(cl:defmethod branches-val ((m <DbparamControl-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader yocs_msgs-srv:branches-val is deprecated.  Use yocs_msgs-srv:branches instead.")
  (branches m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <DbparamControl-response>) ostream)
  "Serializes a message object of type '<DbparamControl-response>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'success) 1 0)) ostream)
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'message))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'message))
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'branches))))
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
   (cl:slot-value msg 'branches))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <DbparamControl-response>) istream)
  "Deserializes a message object of type '<DbparamControl-response>"
    (cl:setf (cl:slot-value msg 'success) (cl:not (cl:zerop (cl:read-byte istream))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'message) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'message) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'branches) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'branches)))
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
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<DbparamControl-response>)))
  "Returns string type for a service object of type '<DbparamControl-response>"
  "yocs_msgs/DbparamControlResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'DbparamControl-response)))
  "Returns string type for a service object of type 'DbparamControl-response"
  "yocs_msgs/DbparamControlResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<DbparamControl-response>)))
  "Returns md5sum for a message object of type '<DbparamControl-response>"
  "7cf3fb1e2aa2ce5fbceda13ef8ec9f9f")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'DbparamControl-response)))
  "Returns md5sum for a message object of type 'DbparamControl-response"
  "7cf3fb1e2aa2ce5fbceda13ef8ec9f9f")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<DbparamControl-response>)))
  "Returns full string definition for message of type '<DbparamControl-response>"
  (cl:format cl:nil "bool success~%string message~%string[] branches~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'DbparamControl-response)))
  "Returns full string definition for message of type 'DbparamControl-response"
  (cl:format cl:nil "bool success~%string message~%string[] branches~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <DbparamControl-response>))
  (cl:+ 0
     1
     4 (cl:length (cl:slot-value msg 'message))
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'branches) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 4 (cl:length ele))))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <DbparamControl-response>))
  "Converts a ROS message object to a list"
  (cl:list 'DbparamControl-response
    (cl:cons ':success (success msg))
    (cl:cons ':message (message msg))
    (cl:cons ':branches (branches msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'DbparamControl)))
  'DbparamControl-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'DbparamControl)))
  'DbparamControl-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'DbparamControl)))
  "Returns string type for a service object of type '<DbparamControl>"
  "yocs_msgs/DbparamControl")