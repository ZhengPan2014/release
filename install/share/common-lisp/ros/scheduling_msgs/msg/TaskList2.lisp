; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-msg)


;//! \htmlinclude TaskList2.msg.html

(cl:defclass <TaskList2> (roslisp-msg-protocol:ros-message)
  ((header
    :reader header
    :initarg :header
    :type std_msgs-msg:Header
    :initform (cl:make-instance 'std_msgs-msg:Header))
   (status
    :reader status
    :initarg :status
    :type (cl:vector scheduling_msgs-msg:TaskStatus2)
   :initform (cl:make-array 0 :element-type 'scheduling_msgs-msg:TaskStatus2 :initial-element (cl:make-instance 'scheduling_msgs-msg:TaskStatus2))))
)

(cl:defclass TaskList2 (<TaskList2>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <TaskList2>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'TaskList2)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-msg:<TaskList2> is deprecated: use scheduling_msgs-msg:TaskList2 instead.")))

(cl:ensure-generic-function 'header-val :lambda-list '(m))
(cl:defmethod header-val ((m <TaskList2>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:header-val is deprecated.  Use scheduling_msgs-msg:header instead.")
  (header m))

(cl:ensure-generic-function 'status-val :lambda-list '(m))
(cl:defmethod status-val ((m <TaskList2>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:status-val is deprecated.  Use scheduling_msgs-msg:status instead.")
  (status m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <TaskList2>) ostream)
  "Serializes a message object of type '<TaskList2>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'header) ostream)
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'status))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (roslisp-msg-protocol:serialize ele ostream))
   (cl:slot-value msg 'status))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <TaskList2>) istream)
  "Deserializes a message object of type '<TaskList2>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'header) istream)
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'status) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'status)))
    (cl:dotimes (i __ros_arr_len)
    (cl:setf (cl:aref vals i) (cl:make-instance 'scheduling_msgs-msg:TaskStatus2))
  (roslisp-msg-protocol:deserialize (cl:aref vals i) istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<TaskList2>)))
  "Returns string type for a message object of type '<TaskList2>"
  "scheduling_msgs/TaskList2")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'TaskList2)))
  "Returns string type for a message object of type 'TaskList2"
  "scheduling_msgs/TaskList2")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<TaskList2>)))
  "Returns md5sum for a message object of type '<TaskList2>"
  "e0ca7d1c14533cef7eda1e79bb6f2dba")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'TaskList2)))
  "Returns md5sum for a message object of type 'TaskList2"
  "e0ca7d1c14533cef7eda1e79bb6f2dba")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<TaskList2>)))
  "Returns full string definition for message of type '<TaskList2>"
  (cl:format cl:nil "Header header~%TaskStatus2[] status~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: scheduling_msgs/TaskStatus2~%int32 task_id~%int32 agv_id~%string loading_station~%string unloading_station~%int32 status~%string text~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'TaskList2)))
  "Returns full string definition for message of type 'TaskList2"
  (cl:format cl:nil "Header header~%TaskStatus2[] status~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: scheduling_msgs/TaskStatus2~%int32 task_id~%int32 agv_id~%string loading_station~%string unloading_station~%int32 status~%string text~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <TaskList2>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'header))
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'status) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ (roslisp-msg-protocol:serialization-length ele))))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <TaskList2>))
  "Converts a ROS message object to a list"
  (cl:list 'TaskList2
    (cl:cons ':header (header msg))
    (cl:cons ':status (status msg))
))
