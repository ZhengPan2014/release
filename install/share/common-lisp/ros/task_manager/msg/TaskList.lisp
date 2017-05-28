; Auto-generated. Do not edit!


(cl:in-package task_manager-msg)


;//! \htmlinclude TaskList.msg.html

(cl:defclass <TaskList> (roslisp-msg-protocol:ros-message)
  ((tasks
    :reader tasks
    :initarg :tasks
    :type (cl:vector task_manager-msg:Task)
   :initform (cl:make-array 0 :element-type 'task_manager-msg:Task :initial-element (cl:make-instance 'task_manager-msg:Task))))
)

(cl:defclass TaskList (<TaskList>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <TaskList>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'TaskList)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name task_manager-msg:<TaskList> is deprecated: use task_manager-msg:TaskList instead.")))

(cl:ensure-generic-function 'tasks-val :lambda-list '(m))
(cl:defmethod tasks-val ((m <TaskList>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader task_manager-msg:tasks-val is deprecated.  Use task_manager-msg:tasks instead.")
  (tasks m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <TaskList>) ostream)
  "Serializes a message object of type '<TaskList>"
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'tasks))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (roslisp-msg-protocol:serialize ele ostream))
   (cl:slot-value msg 'tasks))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <TaskList>) istream)
  "Deserializes a message object of type '<TaskList>"
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'tasks) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'tasks)))
    (cl:dotimes (i __ros_arr_len)
    (cl:setf (cl:aref vals i) (cl:make-instance 'task_manager-msg:Task))
  (roslisp-msg-protocol:deserialize (cl:aref vals i) istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<TaskList>)))
  "Returns string type for a message object of type '<TaskList>"
  "task_manager/TaskList")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'TaskList)))
  "Returns string type for a message object of type 'TaskList"
  "task_manager/TaskList")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<TaskList>)))
  "Returns md5sum for a message object of type '<TaskList>"
  "50b3ed352bbee8f42ed4129aae11e5ea")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'TaskList)))
  "Returns md5sum for a message object of type 'TaskList"
  "50b3ed352bbee8f42ed4129aae11e5ea")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<TaskList>)))
  "Returns full string definition for message of type '<TaskList>"
  (cl:format cl:nil "Task[] tasks~%~%================================================================================~%MSG: task_manager/Task~%Header header~%string name~%int32  address~%string trajectory~%string enable_expect~%string disable_expect~%int8  priority~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'TaskList)))
  "Returns full string definition for message of type 'TaskList"
  (cl:format cl:nil "Task[] tasks~%~%================================================================================~%MSG: task_manager/Task~%Header header~%string name~%int32  address~%string trajectory~%string enable_expect~%string disable_expect~%int8  priority~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <TaskList>))
  (cl:+ 0
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'tasks) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ (roslisp-msg-protocol:serialization-length ele))))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <TaskList>))
  "Converts a ROS message object to a list"
  (cl:list 'TaskList
    (cl:cons ':tasks (tasks msg))
))
