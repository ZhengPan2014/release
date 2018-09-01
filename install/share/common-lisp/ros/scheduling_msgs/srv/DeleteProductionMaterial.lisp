; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude DeleteProductionMaterial-request.msg.html

(cl:defclass <DeleteProductionMaterial-request> (roslisp-msg-protocol:ros-message)
  ((machine
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

(cl:defclass DeleteProductionMaterial-request (<DeleteProductionMaterial-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <DeleteProductionMaterial-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'DeleteProductionMaterial-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<DeleteProductionMaterial-request> is deprecated: use scheduling_msgs-srv:DeleteProductionMaterial-request instead.")))

(cl:ensure-generic-function 'machine-val :lambda-list '(m))
(cl:defmethod machine-val ((m <DeleteProductionMaterial-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:machine-val is deprecated.  Use scheduling_msgs-srv:machine instead.")
  (machine m))

(cl:ensure-generic-function 'model-val :lambda-list '(m))
(cl:defmethod model-val ((m <DeleteProductionMaterial-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:model-val is deprecated.  Use scheduling_msgs-srv:model instead.")
  (model m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <DeleteProductionMaterial-request>) ostream)
  "Serializes a message object of type '<DeleteProductionMaterial-request>"
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
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <DeleteProductionMaterial-request>) istream)
  "Deserializes a message object of type '<DeleteProductionMaterial-request>"
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
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<DeleteProductionMaterial-request>)))
  "Returns string type for a service object of type '<DeleteProductionMaterial-request>"
  "scheduling_msgs/DeleteProductionMaterialRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'DeleteProductionMaterial-request)))
  "Returns string type for a service object of type 'DeleteProductionMaterial-request"
  "scheduling_msgs/DeleteProductionMaterialRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<DeleteProductionMaterial-request>)))
  "Returns md5sum for a message object of type '<DeleteProductionMaterial-request>"
  "18f1def84fb6241fff91c125cda2a91f")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'DeleteProductionMaterial-request)))
  "Returns md5sum for a message object of type 'DeleteProductionMaterial-request"
  "18f1def84fb6241fff91c125cda2a91f")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<DeleteProductionMaterial-request>)))
  "Returns full string definition for message of type '<DeleteProductionMaterial-request>"
  (cl:format cl:nil "~%~%string machine~%string model~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'DeleteProductionMaterial-request)))
  "Returns full string definition for message of type 'DeleteProductionMaterial-request"
  (cl:format cl:nil "~%~%string machine~%string model~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <DeleteProductionMaterial-request>))
  (cl:+ 0
     4 (cl:length (cl:slot-value msg 'machine))
     4 (cl:length (cl:slot-value msg 'model))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <DeleteProductionMaterial-request>))
  "Converts a ROS message object to a list"
  (cl:list 'DeleteProductionMaterial-request
    (cl:cons ':machine (machine msg))
    (cl:cons ':model (model msg))
))
;//! \htmlinclude DeleteProductionMaterial-response.msg.html

(cl:defclass <DeleteProductionMaterial-response> (roslisp-msg-protocol:ros-message)
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

(cl:defclass DeleteProductionMaterial-response (<DeleteProductionMaterial-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <DeleteProductionMaterial-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'DeleteProductionMaterial-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<DeleteProductionMaterial-response> is deprecated: use scheduling_msgs-srv:DeleteProductionMaterial-response instead.")))

(cl:ensure-generic-function 'feedback-val :lambda-list '(m))
(cl:defmethod feedback-val ((m <DeleteProductionMaterial-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:feedback-val is deprecated.  Use scheduling_msgs-srv:feedback instead.")
  (feedback m))

(cl:ensure-generic-function 'message-val :lambda-list '(m))
(cl:defmethod message-val ((m <DeleteProductionMaterial-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:message-val is deprecated.  Use scheduling_msgs-srv:message instead.")
  (message m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <DeleteProductionMaterial-response>) ostream)
  "Serializes a message object of type '<DeleteProductionMaterial-response>"
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
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <DeleteProductionMaterial-response>) istream)
  "Deserializes a message object of type '<DeleteProductionMaterial-response>"
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
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<DeleteProductionMaterial-response>)))
  "Returns string type for a service object of type '<DeleteProductionMaterial-response>"
  "scheduling_msgs/DeleteProductionMaterialResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'DeleteProductionMaterial-response)))
  "Returns string type for a service object of type 'DeleteProductionMaterial-response"
  "scheduling_msgs/DeleteProductionMaterialResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<DeleteProductionMaterial-response>)))
  "Returns md5sum for a message object of type '<DeleteProductionMaterial-response>"
  "18f1def84fb6241fff91c125cda2a91f")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'DeleteProductionMaterial-response)))
  "Returns md5sum for a message object of type 'DeleteProductionMaterial-response"
  "18f1def84fb6241fff91c125cda2a91f")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<DeleteProductionMaterial-response>)))
  "Returns full string definition for message of type '<DeleteProductionMaterial-response>"
  (cl:format cl:nil "int32 feedback~%~%~%string message~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'DeleteProductionMaterial-response)))
  "Returns full string definition for message of type 'DeleteProductionMaterial-response"
  (cl:format cl:nil "int32 feedback~%~%~%string message~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <DeleteProductionMaterial-response>))
  (cl:+ 0
     4
     4 (cl:length (cl:slot-value msg 'message))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <DeleteProductionMaterial-response>))
  "Converts a ROS message object to a list"
  (cl:list 'DeleteProductionMaterial-response
    (cl:cons ':feedback (feedback msg))
    (cl:cons ':message (message msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'DeleteProductionMaterial)))
  'DeleteProductionMaterial-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'DeleteProductionMaterial)))
  'DeleteProductionMaterial-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'DeleteProductionMaterial)))
  "Returns string type for a service object of type '<DeleteProductionMaterial>"
  "scheduling_msgs/DeleteProductionMaterial")