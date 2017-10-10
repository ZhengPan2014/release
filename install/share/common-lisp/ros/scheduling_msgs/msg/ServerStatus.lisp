; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-msg)


;//! \htmlinclude ServerStatus.msg.html

(cl:defclass <ServerStatus> (roslisp-msg-protocol:ros-message)
  ((isReady
    :reader isReady
    :initarg :isReady
    :type cl:boolean
    :initform cl:nil)
   (text
    :reader text
    :initarg :text
    :type cl:string
    :initform ""))
)

(cl:defclass ServerStatus (<ServerStatus>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <ServerStatus>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'ServerStatus)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-msg:<ServerStatus> is deprecated: use scheduling_msgs-msg:ServerStatus instead.")))

(cl:ensure-generic-function 'isReady-val :lambda-list '(m))
(cl:defmethod isReady-val ((m <ServerStatus>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:isReady-val is deprecated.  Use scheduling_msgs-msg:isReady instead.")
  (isReady m))

(cl:ensure-generic-function 'text-val :lambda-list '(m))
(cl:defmethod text-val ((m <ServerStatus>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:text-val is deprecated.  Use scheduling_msgs-msg:text instead.")
  (text m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <ServerStatus>) ostream)
  "Serializes a message object of type '<ServerStatus>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'isReady) 1 0)) ostream)
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'text))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'text))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <ServerStatus>) istream)
  "Deserializes a message object of type '<ServerStatus>"
    (cl:setf (cl:slot-value msg 'isReady) (cl:not (cl:zerop (cl:read-byte istream))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'text) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'text) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<ServerStatus>)))
  "Returns string type for a message object of type '<ServerStatus>"
  "scheduling_msgs/ServerStatus")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ServerStatus)))
  "Returns string type for a message object of type 'ServerStatus"
  "scheduling_msgs/ServerStatus")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<ServerStatus>)))
  "Returns md5sum for a message object of type '<ServerStatus>"
  "1f32731daa648ed70582388913e0d5a3")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'ServerStatus)))
  "Returns md5sum for a message object of type 'ServerStatus"
  "1f32731daa648ed70582388913e0d5a3")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<ServerStatus>)))
  "Returns full string definition for message of type '<ServerStatus>"
  (cl:format cl:nil "bool isReady~%string text~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'ServerStatus)))
  "Returns full string definition for message of type 'ServerStatus"
  (cl:format cl:nil "bool isReady~%string text~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <ServerStatus>))
  (cl:+ 0
     1
     4 (cl:length (cl:slot-value msg 'text))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <ServerStatus>))
  "Converts a ROS message object to a list"
  (cl:list 'ServerStatus
    (cl:cons ':isReady (isReady msg))
    (cl:cons ':text (text msg))
))
