; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude SelectProductionMaterial-request.msg.html

(cl:defclass <SelectProductionMaterial-request> (roslisp-msg-protocol:ros-message)
  ((key
    :reader key
    :initarg :key
    :type cl:string
    :initform "")
   (value
    :reader value
    :initarg :value
    :type cl:string
    :initform ""))
)

(cl:defclass SelectProductionMaterial-request (<SelectProductionMaterial-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <SelectProductionMaterial-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'SelectProductionMaterial-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<SelectProductionMaterial-request> is deprecated: use scheduling_msgs-srv:SelectProductionMaterial-request instead.")))

(cl:ensure-generic-function 'key-val :lambda-list '(m))
(cl:defmethod key-val ((m <SelectProductionMaterial-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:key-val is deprecated.  Use scheduling_msgs-srv:key instead.")
  (key m))

(cl:ensure-generic-function 'value-val :lambda-list '(m))
(cl:defmethod value-val ((m <SelectProductionMaterial-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:value-val is deprecated.  Use scheduling_msgs-srv:value instead.")
  (value m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <SelectProductionMaterial-request>) ostream)
  "Serializes a message object of type '<SelectProductionMaterial-request>"
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'key))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'key))
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'value))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'value))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <SelectProductionMaterial-request>) istream)
  "Deserializes a message object of type '<SelectProductionMaterial-request>"
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'key) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'key) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'value) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'value) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<SelectProductionMaterial-request>)))
  "Returns string type for a service object of type '<SelectProductionMaterial-request>"
  "scheduling_msgs/SelectProductionMaterialRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'SelectProductionMaterial-request)))
  "Returns string type for a service object of type 'SelectProductionMaterial-request"
  "scheduling_msgs/SelectProductionMaterialRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<SelectProductionMaterial-request>)))
  "Returns md5sum for a message object of type '<SelectProductionMaterial-request>"
  "fa13a52e9de25ddcdcba687daa1cfd4f")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'SelectProductionMaterial-request)))
  "Returns md5sum for a message object of type 'SelectProductionMaterial-request"
  "fa13a52e9de25ddcdcba687daa1cfd4f")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<SelectProductionMaterial-request>)))
  "Returns full string definition for message of type '<SelectProductionMaterial-request>"
  (cl:format cl:nil "~%~%string key~%~%string value~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'SelectProductionMaterial-request)))
  "Returns full string definition for message of type 'SelectProductionMaterial-request"
  (cl:format cl:nil "~%~%string key~%~%string value~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <SelectProductionMaterial-request>))
  (cl:+ 0
     4 (cl:length (cl:slot-value msg 'key))
     4 (cl:length (cl:slot-value msg 'value))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <SelectProductionMaterial-request>))
  "Converts a ROS message object to a list"
  (cl:list 'SelectProductionMaterial-request
    (cl:cons ':key (key msg))
    (cl:cons ':value (value msg))
))
;//! \htmlinclude SelectProductionMaterial-response.msg.html

(cl:defclass <SelectProductionMaterial-response> (roslisp-msg-protocol:ros-message)
  ((feedback
    :reader feedback
    :initarg :feedback
    :type cl:integer
    :initform 0)
   (message
    :reader message
    :initarg :message
    :type cl:string
    :initform "")
   (materials
    :reader materials
    :initarg :materials
    :type scheduling_msgs-msg:ProductionMaterialList
    :initform (cl:make-instance 'scheduling_msgs-msg:ProductionMaterialList)))
)

(cl:defclass SelectProductionMaterial-response (<SelectProductionMaterial-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <SelectProductionMaterial-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'SelectProductionMaterial-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<SelectProductionMaterial-response> is deprecated: use scheduling_msgs-srv:SelectProductionMaterial-response instead.")))

(cl:ensure-generic-function 'feedback-val :lambda-list '(m))
(cl:defmethod feedback-val ((m <SelectProductionMaterial-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:feedback-val is deprecated.  Use scheduling_msgs-srv:feedback instead.")
  (feedback m))

(cl:ensure-generic-function 'message-val :lambda-list '(m))
(cl:defmethod message-val ((m <SelectProductionMaterial-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:message-val is deprecated.  Use scheduling_msgs-srv:message instead.")
  (message m))

(cl:ensure-generic-function 'materials-val :lambda-list '(m))
(cl:defmethod materials-val ((m <SelectProductionMaterial-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:materials-val is deprecated.  Use scheduling_msgs-srv:materials instead.")
  (materials m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <SelectProductionMaterial-response>) ostream)
  "Serializes a message object of type '<SelectProductionMaterial-response>"
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
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'materials) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <SelectProductionMaterial-response>) istream)
  "Deserializes a message object of type '<SelectProductionMaterial-response>"
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
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'materials) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<SelectProductionMaterial-response>)))
  "Returns string type for a service object of type '<SelectProductionMaterial-response>"
  "scheduling_msgs/SelectProductionMaterialResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'SelectProductionMaterial-response)))
  "Returns string type for a service object of type 'SelectProductionMaterial-response"
  "scheduling_msgs/SelectProductionMaterialResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<SelectProductionMaterial-response>)))
  "Returns md5sum for a message object of type '<SelectProductionMaterial-response>"
  "fa13a52e9de25ddcdcba687daa1cfd4f")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'SelectProductionMaterial-response)))
  "Returns md5sum for a message object of type 'SelectProductionMaterial-response"
  "fa13a52e9de25ddcdcba687daa1cfd4f")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<SelectProductionMaterial-response>)))
  "Returns full string definition for message of type '<SelectProductionMaterial-response>"
  (cl:format cl:nil "int32 feedback~%~%~%~%string message~%ProductionMaterialList materials~%~%================================================================================~%MSG: scheduling_msgs/ProductionMaterialList~%# msg for innolux~%ProductionMaterial[] materials~%================================================================================~%MSG: scheduling_msgs/ProductionMaterial~%# msg for innolux~%string line~%string station~%string machine~%string model~%string material_type~%string material_no~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'SelectProductionMaterial-response)))
  "Returns full string definition for message of type 'SelectProductionMaterial-response"
  (cl:format cl:nil "int32 feedback~%~%~%~%string message~%ProductionMaterialList materials~%~%================================================================================~%MSG: scheduling_msgs/ProductionMaterialList~%# msg for innolux~%ProductionMaterial[] materials~%================================================================================~%MSG: scheduling_msgs/ProductionMaterial~%# msg for innolux~%string line~%string station~%string machine~%string model~%string material_type~%string material_no~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <SelectProductionMaterial-response>))
  (cl:+ 0
     4
     4 (cl:length (cl:slot-value msg 'message))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'materials))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <SelectProductionMaterial-response>))
  "Converts a ROS message object to a list"
  (cl:list 'SelectProductionMaterial-response
    (cl:cons ':feedback (feedback msg))
    (cl:cons ':message (message msg))
    (cl:cons ':materials (materials msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'SelectProductionMaterial)))
  'SelectProductionMaterial-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'SelectProductionMaterial)))
  'SelectProductionMaterial-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'SelectProductionMaterial)))
  "Returns string type for a service object of type '<SelectProductionMaterial>"
  "scheduling_msgs/SelectProductionMaterial")