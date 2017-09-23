; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-msg)


;//! \htmlinclude AgvList.msg.html

(cl:defclass <AgvList> (roslisp-msg-protocol:ros-message)
  ((agvList
    :reader agvList
    :initarg :agvList
    :type (cl:vector scheduling_msgs-msg:Agv)
   :initform (cl:make-array 0 :element-type 'scheduling_msgs-msg:Agv :initial-element (cl:make-instance 'scheduling_msgs-msg:Agv))))
)

(cl:defclass AgvList (<AgvList>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <AgvList>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'AgvList)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-msg:<AgvList> is deprecated: use scheduling_msgs-msg:AgvList instead.")))

(cl:ensure-generic-function 'agvList-val :lambda-list '(m))
(cl:defmethod agvList-val ((m <AgvList>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:agvList-val is deprecated.  Use scheduling_msgs-msg:agvList instead.")
  (agvList m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <AgvList>) ostream)
  "Serializes a message object of type '<AgvList>"
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'agvList))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (roslisp-msg-protocol:serialize ele ostream))
   (cl:slot-value msg 'agvList))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <AgvList>) istream)
  "Deserializes a message object of type '<AgvList>"
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'agvList) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'agvList)))
    (cl:dotimes (i __ros_arr_len)
    (cl:setf (cl:aref vals i) (cl:make-instance 'scheduling_msgs-msg:Agv))
  (roslisp-msg-protocol:deserialize (cl:aref vals i) istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<AgvList>)))
  "Returns string type for a message object of type '<AgvList>"
  "scheduling_msgs/AgvList")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'AgvList)))
  "Returns string type for a message object of type 'AgvList"
  "scheduling_msgs/AgvList")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<AgvList>)))
  "Returns md5sum for a message object of type '<AgvList>"
  "159cc8fbfdec43c0feb1a4ce0218db38")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'AgvList)))
  "Returns md5sum for a message object of type 'AgvList"
  "159cc8fbfdec43c0feb1a4ce0218db38")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<AgvList>)))
  "Returns full string definition for message of type '<AgvList>"
  (cl:format cl:nil "Agv[] agvList~%~%================================================================================~%MSG: scheduling_msgs/Agv~%int32 agvID~%string agvName~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'AgvList)))
  "Returns full string definition for message of type 'AgvList"
  (cl:format cl:nil "Agv[] agvList~%~%================================================================================~%MSG: scheduling_msgs/Agv~%int32 agvID~%string agvName~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <AgvList>))
  (cl:+ 0
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'agvList) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ (roslisp-msg-protocol:serialization-length ele))))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <AgvList>))
  "Converts a ROS message object to a list"
  (cl:list 'AgvList
    (cl:cons ':agvList (agvList msg))
))
