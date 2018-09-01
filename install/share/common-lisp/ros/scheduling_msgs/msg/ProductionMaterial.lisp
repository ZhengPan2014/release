; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-msg)


;//! \htmlinclude ProductionMaterial.msg.html

(cl:defclass <ProductionMaterial> (roslisp-msg-protocol:ros-message)
  ((line
    :reader line
    :initarg :line
    :type cl:string
    :initform "")
   (station
    :reader station
    :initarg :station
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
    :initform "")
   (material_type
    :reader material_type
    :initarg :material_type
    :type cl:string
    :initform "")
   (material_no
    :reader material_no
    :initarg :material_no
    :type cl:string
    :initform ""))
)

(cl:defclass ProductionMaterial (<ProductionMaterial>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <ProductionMaterial>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'ProductionMaterial)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-msg:<ProductionMaterial> is deprecated: use scheduling_msgs-msg:ProductionMaterial instead.")))

(cl:ensure-generic-function 'line-val :lambda-list '(m))
(cl:defmethod line-val ((m <ProductionMaterial>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:line-val is deprecated.  Use scheduling_msgs-msg:line instead.")
  (line m))

(cl:ensure-generic-function 'station-val :lambda-list '(m))
(cl:defmethod station-val ((m <ProductionMaterial>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:station-val is deprecated.  Use scheduling_msgs-msg:station instead.")
  (station m))

(cl:ensure-generic-function 'machine-val :lambda-list '(m))
(cl:defmethod machine-val ((m <ProductionMaterial>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:machine-val is deprecated.  Use scheduling_msgs-msg:machine instead.")
  (machine m))

(cl:ensure-generic-function 'model-val :lambda-list '(m))
(cl:defmethod model-val ((m <ProductionMaterial>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:model-val is deprecated.  Use scheduling_msgs-msg:model instead.")
  (model m))

(cl:ensure-generic-function 'material_type-val :lambda-list '(m))
(cl:defmethod material_type-val ((m <ProductionMaterial>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:material_type-val is deprecated.  Use scheduling_msgs-msg:material_type instead.")
  (material_type m))

(cl:ensure-generic-function 'material_no-val :lambda-list '(m))
(cl:defmethod material_no-val ((m <ProductionMaterial>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:material_no-val is deprecated.  Use scheduling_msgs-msg:material_no instead.")
  (material_no m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <ProductionMaterial>) ostream)
  "Serializes a message object of type '<ProductionMaterial>"
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'line))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'line))
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'station))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'station))
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
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'material_type))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'material_type))
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'material_no))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'material_no))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <ProductionMaterial>) istream)
  "Deserializes a message object of type '<ProductionMaterial>"
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
      (cl:setf (cl:slot-value msg 'station) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'station) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
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
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'material_type) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'material_type) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'material_no) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'material_no) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<ProductionMaterial>)))
  "Returns string type for a message object of type '<ProductionMaterial>"
  "scheduling_msgs/ProductionMaterial")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ProductionMaterial)))
  "Returns string type for a message object of type 'ProductionMaterial"
  "scheduling_msgs/ProductionMaterial")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<ProductionMaterial>)))
  "Returns md5sum for a message object of type '<ProductionMaterial>"
  "2f133b76e8dbe963bb85acf0237dc34a")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'ProductionMaterial)))
  "Returns md5sum for a message object of type 'ProductionMaterial"
  "2f133b76e8dbe963bb85acf0237dc34a")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<ProductionMaterial>)))
  "Returns full string definition for message of type '<ProductionMaterial>"
  (cl:format cl:nil "# msg for innolux~%string line~%string station~%string machine~%string model~%string material_type~%string material_no~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'ProductionMaterial)))
  "Returns full string definition for message of type 'ProductionMaterial"
  (cl:format cl:nil "# msg for innolux~%string line~%string station~%string machine~%string model~%string material_type~%string material_no~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <ProductionMaterial>))
  (cl:+ 0
     4 (cl:length (cl:slot-value msg 'line))
     4 (cl:length (cl:slot-value msg 'station))
     4 (cl:length (cl:slot-value msg 'machine))
     4 (cl:length (cl:slot-value msg 'model))
     4 (cl:length (cl:slot-value msg 'material_type))
     4 (cl:length (cl:slot-value msg 'material_no))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <ProductionMaterial>))
  "Converts a ROS message object to a list"
  (cl:list 'ProductionMaterial
    (cl:cons ':line (line msg))
    (cl:cons ':station (station msg))
    (cl:cons ':machine (machine msg))
    (cl:cons ':model (model msg))
    (cl:cons ':material_type (material_type msg))
    (cl:cons ':material_no (material_no msg))
))
