; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-msg)


;//! \htmlinclude ShelvesStatus.msg.html

(cl:defclass <ShelvesStatus> (roslisp-msg-protocol:ros-message)
  ((agv_shelves
    :reader agv_shelves
    :initarg :agv_shelves
    :type (cl:vector cl:integer)
   :initform (cl:make-array 0 :element-type 'cl:integer :initial-element 0))
   (station_shelves
    :reader station_shelves
    :initarg :station_shelves
    :type (cl:vector cl:integer)
   :initform (cl:make-array 0 :element-type 'cl:integer :initial-element 0)))
)

(cl:defclass ShelvesStatus (<ShelvesStatus>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <ShelvesStatus>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'ShelvesStatus)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-msg:<ShelvesStatus> is deprecated: use scheduling_msgs-msg:ShelvesStatus instead.")))

(cl:ensure-generic-function 'agv_shelves-val :lambda-list '(m))
(cl:defmethod agv_shelves-val ((m <ShelvesStatus>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:agv_shelves-val is deprecated.  Use scheduling_msgs-msg:agv_shelves instead.")
  (agv_shelves m))

(cl:ensure-generic-function 'station_shelves-val :lambda-list '(m))
(cl:defmethod station_shelves-val ((m <ShelvesStatus>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:station_shelves-val is deprecated.  Use scheduling_msgs-msg:station_shelves instead.")
  (station_shelves m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <ShelvesStatus>) ostream)
  "Serializes a message object of type '<ShelvesStatus>"
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'agv_shelves))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (cl:let* ((signed ele) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    ))
   (cl:slot-value msg 'agv_shelves))
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'station_shelves))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (cl:let* ((signed ele) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    ))
   (cl:slot-value msg 'station_shelves))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <ShelvesStatus>) istream)
  "Deserializes a message object of type '<ShelvesStatus>"
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'agv_shelves) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'agv_shelves)))
    (cl:dotimes (i __ros_arr_len)
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:aref vals i) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296)))))))
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'station_shelves) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'station_shelves)))
    (cl:dotimes (i __ros_arr_len)
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:aref vals i) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296)))))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<ShelvesStatus>)))
  "Returns string type for a message object of type '<ShelvesStatus>"
  "scheduling_msgs/ShelvesStatus")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ShelvesStatus)))
  "Returns string type for a message object of type 'ShelvesStatus"
  "scheduling_msgs/ShelvesStatus")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<ShelvesStatus>)))
  "Returns md5sum for a message object of type '<ShelvesStatus>"
  "545d9e51b088123e4a1f5ca7c806306b")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'ShelvesStatus)))
  "Returns md5sum for a message object of type 'ShelvesStatus"
  "545d9e51b088123e4a1f5ca7c806306b")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<ShelvesStatus>)))
  "Returns full string definition for message of type '<ShelvesStatus>"
  (cl:format cl:nil "int32[] agv_shelves~%int32[] station_shelves~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'ShelvesStatus)))
  "Returns full string definition for message of type 'ShelvesStatus"
  (cl:format cl:nil "int32[] agv_shelves~%int32[] station_shelves~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <ShelvesStatus>))
  (cl:+ 0
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'agv_shelves) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 4)))
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'station_shelves) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 4)))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <ShelvesStatus>))
  "Converts a ROS message object to a list"
  (cl:list 'ShelvesStatus
    (cl:cons ':agv_shelves (agv_shelves msg))
    (cl:cons ':station_shelves (station_shelves msg))
))
