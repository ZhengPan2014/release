; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-msg)


;//! \htmlinclude TaskInxLinePList.msg.html

(cl:defclass <TaskInxLinePList> (roslisp-msg-protocol:ros-message)
  ((tasks
    :reader tasks
    :initarg :tasks
    :type (cl:vector scheduling_msgs-msg:TaskInxLineP)
   :initform (cl:make-array 0 :element-type 'scheduling_msgs-msg:TaskInxLineP :initial-element (cl:make-instance 'scheduling_msgs-msg:TaskInxLineP))))
)

(cl:defclass TaskInxLinePList (<TaskInxLinePList>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <TaskInxLinePList>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'TaskInxLinePList)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-msg:<TaskInxLinePList> is deprecated: use scheduling_msgs-msg:TaskInxLinePList instead.")))

(cl:ensure-generic-function 'tasks-val :lambda-list '(m))
(cl:defmethod tasks-val ((m <TaskInxLinePList>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:tasks-val is deprecated.  Use scheduling_msgs-msg:tasks instead.")
  (tasks m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <TaskInxLinePList>) ostream)
  "Serializes a message object of type '<TaskInxLinePList>"
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'tasks))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (roslisp-msg-protocol:serialize ele ostream))
   (cl:slot-value msg 'tasks))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <TaskInxLinePList>) istream)
  "Deserializes a message object of type '<TaskInxLinePList>"
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'tasks) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'tasks)))
    (cl:dotimes (i __ros_arr_len)
    (cl:setf (cl:aref vals i) (cl:make-instance 'scheduling_msgs-msg:TaskInxLineP))
  (roslisp-msg-protocol:deserialize (cl:aref vals i) istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<TaskInxLinePList>)))
  "Returns string type for a message object of type '<TaskInxLinePList>"
  "scheduling_msgs/TaskInxLinePList")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'TaskInxLinePList)))
  "Returns string type for a message object of type 'TaskInxLinePList"
  "scheduling_msgs/TaskInxLinePList")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<TaskInxLinePList>)))
  "Returns md5sum for a message object of type '<TaskInxLinePList>"
  "5ef51127ee7c1ee3f72506dbc4c2c793")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'TaskInxLinePList)))
  "Returns md5sum for a message object of type 'TaskInxLinePList"
  "5ef51127ee7c1ee3f72506dbc4c2c793")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<TaskInxLinePList>)))
  "Returns full string definition for message of type '<TaskInxLinePList>"
  (cl:format cl:nil "TaskInxLineP[] tasks~%================================================================================~%MSG: scheduling_msgs/TaskInxLineP~%int32 shelf_id~%string task_type~%string[] materials~%int32[] layers~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'TaskInxLinePList)))
  "Returns full string definition for message of type 'TaskInxLinePList"
  (cl:format cl:nil "TaskInxLineP[] tasks~%================================================================================~%MSG: scheduling_msgs/TaskInxLineP~%int32 shelf_id~%string task_type~%string[] materials~%int32[] layers~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <TaskInxLinePList>))
  (cl:+ 0
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'tasks) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ (roslisp-msg-protocol:serialization-length ele))))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <TaskInxLinePList>))
  "Converts a ROS message object to a list"
  (cl:list 'TaskInxLinePList
    (cl:cons ':tasks (tasks msg))
))
