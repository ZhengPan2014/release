; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude AddProductionMaterial-request.msg.html

(cl:defclass <AddProductionMaterial-request> (roslisp-msg-protocol:ros-message)
  ((materials
    :reader materials
    :initarg :materials
    :type scheduling_msgs-msg:ProductionMaterialList
    :initform (cl:make-instance 'scheduling_msgs-msg:ProductionMaterialList)))
)

(cl:defclass AddProductionMaterial-request (<AddProductionMaterial-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <AddProductionMaterial-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'AddProductionMaterial-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<AddProductionMaterial-request> is deprecated: use scheduling_msgs-srv:AddProductionMaterial-request instead.")))

(cl:ensure-generic-function 'materials-val :lambda-list '(m))
(cl:defmethod materials-val ((m <AddProductionMaterial-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:materials-val is deprecated.  Use scheduling_msgs-srv:materials instead.")
  (materials m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <AddProductionMaterial-request>) ostream)
  "Serializes a message object of type '<AddProductionMaterial-request>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'materials) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <AddProductionMaterial-request>) istream)
  "Deserializes a message object of type '<AddProductionMaterial-request>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'materials) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<AddProductionMaterial-request>)))
  "Returns string type for a service object of type '<AddProductionMaterial-request>"
  "scheduling_msgs/AddProductionMaterialRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'AddProductionMaterial-request)))
  "Returns string type for a service object of type 'AddProductionMaterial-request"
  "scheduling_msgs/AddProductionMaterialRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<AddProductionMaterial-request>)))
  "Returns md5sum for a message object of type '<AddProductionMaterial-request>"
  "42e2dd3ce9a8829f53d3b4b242875ecf")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'AddProductionMaterial-request)))
  "Returns md5sum for a message object of type 'AddProductionMaterial-request"
  "42e2dd3ce9a8829f53d3b4b242875ecf")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<AddProductionMaterial-request>)))
  "Returns full string definition for message of type '<AddProductionMaterial-request>"
  (cl:format cl:nil "~%~%ProductionMaterialList materials~%~%================================================================================~%MSG: scheduling_msgs/ProductionMaterialList~%# msg for innolux~%ProductionMaterial[] materials~%================================================================================~%MSG: scheduling_msgs/ProductionMaterial~%# msg for innolux~%string line~%string station~%string machine~%string model~%string material_type~%string material_no~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'AddProductionMaterial-request)))
  "Returns full string definition for message of type 'AddProductionMaterial-request"
  (cl:format cl:nil "~%~%ProductionMaterialList materials~%~%================================================================================~%MSG: scheduling_msgs/ProductionMaterialList~%# msg for innolux~%ProductionMaterial[] materials~%================================================================================~%MSG: scheduling_msgs/ProductionMaterial~%# msg for innolux~%string line~%string station~%string machine~%string model~%string material_type~%string material_no~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <AddProductionMaterial-request>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'materials))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <AddProductionMaterial-request>))
  "Converts a ROS message object to a list"
  (cl:list 'AddProductionMaterial-request
    (cl:cons ':materials (materials msg))
))
;//! \htmlinclude AddProductionMaterial-response.msg.html

(cl:defclass <AddProductionMaterial-response> (roslisp-msg-protocol:ros-message)
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

(cl:defclass AddProductionMaterial-response (<AddProductionMaterial-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <AddProductionMaterial-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'AddProductionMaterial-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<AddProductionMaterial-response> is deprecated: use scheduling_msgs-srv:AddProductionMaterial-response instead.")))

(cl:ensure-generic-function 'feedback-val :lambda-list '(m))
(cl:defmethod feedback-val ((m <AddProductionMaterial-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:feedback-val is deprecated.  Use scheduling_msgs-srv:feedback instead.")
  (feedback m))

(cl:ensure-generic-function 'message-val :lambda-list '(m))
(cl:defmethod message-val ((m <AddProductionMaterial-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:message-val is deprecated.  Use scheduling_msgs-srv:message instead.")
  (message m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <AddProductionMaterial-response>) ostream)
  "Serializes a message object of type '<AddProductionMaterial-response>"
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
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <AddProductionMaterial-response>) istream)
  "Deserializes a message object of type '<AddProductionMaterial-response>"
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
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<AddProductionMaterial-response>)))
  "Returns string type for a service object of type '<AddProductionMaterial-response>"
  "scheduling_msgs/AddProductionMaterialResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'AddProductionMaterial-response)))
  "Returns string type for a service object of type 'AddProductionMaterial-response"
  "scheduling_msgs/AddProductionMaterialResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<AddProductionMaterial-response>)))
  "Returns md5sum for a message object of type '<AddProductionMaterial-response>"
  "42e2dd3ce9a8829f53d3b4b242875ecf")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'AddProductionMaterial-response)))
  "Returns md5sum for a message object of type 'AddProductionMaterial-response"
  "42e2dd3ce9a8829f53d3b4b242875ecf")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<AddProductionMaterial-response>)))
  "Returns full string definition for message of type '<AddProductionMaterial-response>"
  (cl:format cl:nil "int32 feedback~%~%~%string message~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'AddProductionMaterial-response)))
  "Returns full string definition for message of type 'AddProductionMaterial-response"
  (cl:format cl:nil "int32 feedback~%~%~%string message~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <AddProductionMaterial-response>))
  (cl:+ 0
     4
     4 (cl:length (cl:slot-value msg 'message))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <AddProductionMaterial-response>))
  "Converts a ROS message object to a list"
  (cl:list 'AddProductionMaterial-response
    (cl:cons ':feedback (feedback msg))
    (cl:cons ':message (message msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'AddProductionMaterial)))
  'AddProductionMaterial-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'AddProductionMaterial)))
  'AddProductionMaterial-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'AddProductionMaterial)))
  "Returns string type for a service object of type '<AddProductionMaterial>"
  "scheduling_msgs/AddProductionMaterial")