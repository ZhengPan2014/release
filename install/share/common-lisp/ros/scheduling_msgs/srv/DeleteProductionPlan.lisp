; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude DeleteProductionPlan-request.msg.html

(cl:defclass <DeleteProductionPlan-request> (roslisp-msg-protocol:ros-message)
  ((line
    :reader line
    :initarg :line
    :type cl:string
    :initform "")
   (machine
    :reader machine
    :initarg :machine
    :type cl:string
    :initform "")
   (model
    :reader model
    :initarg :model
    :type cl:string
    :initform ""))
)

(cl:defclass DeleteProductionPlan-request (<DeleteProductionPlan-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <DeleteProductionPlan-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'DeleteProductionPlan-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<DeleteProductionPlan-request> is deprecated: use scheduling_msgs-srv:DeleteProductionPlan-request instead.")))

(cl:ensure-generic-function 'line-val :lambda-list '(m))
(cl:defmethod line-val ((m <DeleteProductionPlan-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:line-val is deprecated.  Use scheduling_msgs-srv:line instead.")
  (line m))

(cl:ensure-generic-function 'machine-val :lambda-list '(m))
(cl:defmethod machine-val ((m <DeleteProductionPlan-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:machine-val is deprecated.  Use scheduling_msgs-srv:machine instead.")
  (machine m))

(cl:ensure-generic-function 'model-val :lambda-list '(m))
(cl:defmethod model-val ((m <DeleteProductionPlan-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:model-val is deprecated.  Use scheduling_msgs-srv:model instead.")
  (model m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <DeleteProductionPlan-request>) ostream)
  "Serializes a message object of type '<DeleteProductionPlan-request>"
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'line))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'line))
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'machine))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'machine))
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'model))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'model))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <DeleteProductionPlan-request>) istream)
  "Deserializes a message object of type '<DeleteProductionPlan-request>"
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'line) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'line) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'machine) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'machine) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'model) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'model) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<DeleteProductionPlan-request>)))
  "Returns string type for a service object of type '<DeleteProductionPlan-request>"
  "scheduling_msgs/DeleteProductionPlanRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'DeleteProductionPlan-request)))
  "Returns string type for a service object of type 'DeleteProductionPlan-request"
  "scheduling_msgs/DeleteProductionPlanRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<DeleteProductionPlan-request>)))
  "Returns md5sum for a message object of type '<DeleteProductionPlan-request>"
  "0882b4c73bfea1a46e93d9185c0c6bc7")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'DeleteProductionPlan-request)))
  "Returns md5sum for a message object of type 'DeleteProductionPlan-request"
  "0882b4c73bfea1a46e93d9185c0c6bc7")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<DeleteProductionPlan-request>)))
  "Returns full string definition for message of type '<DeleteProductionPlan-request>"
  (cl:format cl:nil "~%~%string line~%string machine~%string model~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'DeleteProductionPlan-request)))
  "Returns full string definition for message of type 'DeleteProductionPlan-request"
  (cl:format cl:nil "~%~%string line~%string machine~%string model~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <DeleteProductionPlan-request>))
  (cl:+ 0
     4 (cl:length (cl:slot-value msg 'line))
     4 (cl:length (cl:slot-value msg 'machine))
     4 (cl:length (cl:slot-value msg 'model))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <DeleteProductionPlan-request>))
  "Converts a ROS message object to a list"
  (cl:list 'DeleteProductionPlan-request
    (cl:cons ':line (line msg))
    (cl:cons ':machine (machine msg))
    (cl:cons ':model (model msg))
))
;//! \htmlinclude DeleteProductionPlan-response.msg.html

(cl:defclass <DeleteProductionPlan-response> (roslisp-msg-protocol:ros-message)
  ((feedback
    :reader feedback
    :initarg :feedback
    :type cl:integer
    :initform 0)
   (message
    :reader message
    :initarg :message
    :type cl:string
    :initform ""))
)

(cl:defclass DeleteProductionPlan-response (<DeleteProductionPlan-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <DeleteProductionPlan-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'DeleteProductionPlan-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<DeleteProductionPlan-response> is deprecated: use scheduling_msgs-srv:DeleteProductionPlan-response instead.")))

(cl:ensure-generic-function 'feedback-val :lambda-list '(m))
(cl:defmethod feedback-val ((m <DeleteProductionPlan-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:feedback-val is deprecated.  Use scheduling_msgs-srv:feedback instead.")
  (feedback m))

(cl:ensure-generic-function 'message-val :lambda-list '(m))
(cl:defmethod message-val ((m <DeleteProductionPlan-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:message-val is deprecated.  Use scheduling_msgs-srv:message instead.")
  (message m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <DeleteProductionPlan-response>) ostream)
  "Serializes a message object of type '<DeleteProductionPlan-response>"
  (cl:let* ((signed (cl:slot-value msg 'feedback)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'message))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'message))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <DeleteProductionPlan-response>) istream)
  "Deserializes a message object of type '<DeleteProductionPlan-response>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'feedback) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
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
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<DeleteProductionPlan-response>)))
  "Returns string type for a service object of type '<DeleteProductionPlan-response>"
  "scheduling_msgs/DeleteProductionPlanResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'DeleteProductionPlan-response)))
  "Returns string type for a service object of type 'DeleteProductionPlan-response"
  "scheduling_msgs/DeleteProductionPlanResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<DeleteProductionPlan-response>)))
  "Returns md5sum for a message object of type '<DeleteProductionPlan-response>"
  "0882b4c73bfea1a46e93d9185c0c6bc7")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'DeleteProductionPlan-response)))
  "Returns md5sum for a message object of type 'DeleteProductionPlan-response"
  "0882b4c73bfea1a46e93d9185c0c6bc7")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<DeleteProductionPlan-response>)))
  "Returns full string definition for message of type '<DeleteProductionPlan-response>"
  (cl:format cl:nil "int32 feedback~%~%~%string message~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'DeleteProductionPlan-response)))
  "Returns full string definition for message of type 'DeleteProductionPlan-response"
  (cl:format cl:nil "int32 feedback~%~%~%string message~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <DeleteProductionPlan-response>))
  (cl:+ 0
     4
     4 (cl:length (cl:slot-value msg 'message))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <DeleteProductionPlan-response>))
  "Converts a ROS message object to a list"
  (cl:list 'DeleteProductionPlan-response
    (cl:cons ':feedback (feedback msg))
    (cl:cons ':message (message msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'DeleteProductionPlan)))
  'DeleteProductionPlan-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'DeleteProductionPlan)))
  'DeleteProductionPlan-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'DeleteProductionPlan)))
  "Returns string type for a service object of type '<DeleteProductionPlan>"
  "scheduling_msgs/DeleteProductionPlan")