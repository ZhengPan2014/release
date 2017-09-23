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
    :initform ""))
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
  "d5c3d9da008fc08c632ddde4bbf572ba")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'Agv)))
  "Returns md5sum for a message object of type 'Agv"
  "d5c3d9da008fc08c632ddde4bbf572ba")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<Agv>)))
  "Returns full string definition for message of type '<Agv>"
  (cl:format cl:nil "int32 agvID~%string agvName~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'Agv)))
  "Returns full string definition for message of type 'Agv"
  (cl:format cl:nil "int32 agvID~%string agvName~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <Agv>))
  (cl:+ 0
     4
     4 (cl:length (cl:slot-value msg 'agvName))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <Agv>))
  "Converts a ROS message object to a list"
  (cl:list 'Agv
    (cl:cons ':agvID (agvID msg))
    (cl:cons ':agvName (agvName msg))
))
