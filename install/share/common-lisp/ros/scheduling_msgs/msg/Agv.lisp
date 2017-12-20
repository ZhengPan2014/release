; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-msg)


;//! \htmlinclude Agv.msg.html

(cl:defclass <Agv> (roslisp-msg-protocol:ros-message)
  ((agvID
    :reader agvID
    :initarg :agvID
    :type cl:integer
    :initform 0)
   (agvName
    :reader agvName
    :initarg :agvName
    :type cl:string
    :initform "")
   (isWorking
    :reader isWorking
    :initarg :isWorking
    :type cl:boolean
    :initform cl:nil)
   (isAgvBoot
    :reader isAgvBoot
    :initarg :isAgvBoot
    :type cl:boolean
    :initform cl:nil)
   (errorInfo
    :reader errorInfo
    :initarg :errorInfo
    :type cl:integer
    :initform 0)
   (working_station_name
    :reader working_station_name
    :initarg :working_station_name
    :type cl:string
    :initform "")
   (pose
    :reader pose
    :initarg :pose
    :type geometry_msgs-msg:Pose
    :initform (cl:make-instance 'geometry_msgs-msg:Pose)))
)

(cl:defclass Agv (<Agv>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <Agv>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'Agv)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-msg:<Agv> is deprecated: use scheduling_msgs-msg:Agv instead.")))

(cl:ensure-generic-function 'agvID-val :lambda-list '(m))
(cl:defmethod agvID-val ((m <Agv>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:agvID-val is deprecated.  Use scheduling_msgs-msg:agvID instead.")
  (agvID m))

(cl:ensure-generic-function 'agvName-val :lambda-list '(m))
(cl:defmethod agvName-val ((m <Agv>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:agvName-val is deprecated.  Use scheduling_msgs-msg:agvName instead.")
  (agvName m))

(cl:ensure-generic-function 'isWorking-val :lambda-list '(m))
(cl:defmethod isWorking-val ((m <Agv>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:isWorking-val is deprecated.  Use scheduling_msgs-msg:isWorking instead.")
  (isWorking m))

(cl:ensure-generic-function 'isAgvBoot-val :lambda-list '(m))
(cl:defmethod isAgvBoot-val ((m <Agv>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:isAgvBoot-val is deprecated.  Use scheduling_msgs-msg:isAgvBoot instead.")
  (isAgvBoot m))

(cl:ensure-generic-function 'errorInfo-val :lambda-list '(m))
(cl:defmethod errorInfo-val ((m <Agv>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:errorInfo-val is deprecated.  Use scheduling_msgs-msg:errorInfo instead.")
  (errorInfo m))

(cl:ensure-generic-function 'working_station_name-val :lambda-list '(m))
(cl:defmethod working_station_name-val ((m <Agv>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:working_station_name-val is deprecated.  Use scheduling_msgs-msg:working_station_name instead.")
  (working_station_name m))

(cl:ensure-generic-function 'pose-val :lambda-list '(m))
(cl:defmethod pose-val ((m <Agv>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:pose-val is deprecated.  Use scheduling_msgs-msg:pose instead.")
  (pose m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <Agv>) ostream)
  "Serializes a message object of type '<Agv>"
  (cl:let* ((signed (cl:slot-value msg 'agvID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'agvName))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'agvName))
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'isWorking) 1 0)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'isAgvBoot) 1 0)) ostream)
  (cl:let* ((signed (cl:slot-value msg 'errorInfo)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'working_station_name))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'working_station_name))
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'pose) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <Agv>) istream)
  "Deserializes a message object of type '<Agv>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'agvID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'agvName) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'agvName) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:setf (cl:slot-value msg 'isWorking) (cl:not (cl:zerop (cl:read-byte istream))))
    (cl:setf (cl:slot-value msg 'isAgvBoot) (cl:not (cl:zerop (cl:read-byte istream))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'errorInfo) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'working_station_name) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'working_station_name) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'pose) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<Agv>)))
  "Returns string type for a message object of type '<Agv>"
  "scheduling_msgs/Agv")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'Agv)))
  "Returns string type for a message object of type 'Agv"
  "scheduling_msgs/Agv")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<Agv>)))
  "Returns md5sum for a message object of type '<Agv>"
  "f01657a2f82714212a73e3a8e964b946")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'Agv)))
  "Returns md5sum for a message object of type 'Agv"
  "f01657a2f82714212a73e3a8e964b946")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<Agv>)))
  "Returns full string definition for message of type '<Agv>"
  (cl:format cl:nil "int32 agvID~%string agvName~%bool isWorking~%bool isAgvBoot~%#bool isTaskOverTime~%int32 errorInfo~%#0 : no error~%#1 : obstacle~%#2 : battery low~%#3 : navigation error ~%string working_station_name~%geometry_msgs/Pose pose~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'Agv)))
  "Returns full string definition for message of type 'Agv"
  (cl:format cl:nil "int32 agvID~%string agvName~%bool isWorking~%bool isAgvBoot~%#bool isTaskOverTime~%int32 errorInfo~%#0 : no error~%#1 : obstacle~%#2 : battery low~%#3 : navigation error ~%string working_station_name~%geometry_msgs/Pose pose~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <Agv>))
  (cl:+ 0
     4
     4 (cl:length (cl:slot-value msg 'agvName))
     1
     1
     4
     4 (cl:length (cl:slot-value msg 'working_station_name))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'pose))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <Agv>))
  "Converts a ROS message object to a list"
  (cl:list 'Agv
    (cl:cons ':agvID (agvID msg))
    (cl:cons ':agvName (agvName msg))
    (cl:cons ':isWorking (isWorking msg))
    (cl:cons ':isAgvBoot (isAgvBoot msg))
    (cl:cons ':errorInfo (errorInfo msg))
    (cl:cons ':working_station_name (working_station_name msg))
    (cl:cons ':pose (pose msg))
))
