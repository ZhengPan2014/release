; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude AddOrModifyForkliftTask-request.msg.html

(cl:defclass <AddOrModifyForkliftTask-request> (roslisp-msg-protocol:ros-message)
  ((task_id
    :reader task_id
    :initarg :task_id
    :type cl:integer
    :initform 0)
   (loading_station
    :reader loading_station
    :initarg :loading_station
    :type cl:string
    :initform "")
   (unloading_station
    :reader unloading_station
    :initarg :unloading_station
    :type cl:string
    :initform ""))
)

(cl:defclass AddOrModifyForkliftTask-request (<AddOrModifyForkliftTask-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <AddOrModifyForkliftTask-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'AddOrModifyForkliftTask-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<AddOrModifyForkliftTask-request> is deprecated: use scheduling_msgs-srv:AddOrModifyForkliftTask-request instead.")))

(cl:ensure-generic-function 'task_id-val :lambda-list '(m))
(cl:defmethod task_id-val ((m <AddOrModifyForkliftTask-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:task_id-val is deprecated.  Use scheduling_msgs-srv:task_id instead.")
  (task_id m))

(cl:ensure-generic-function 'loading_station-val :lambda-list '(m))
(cl:defmethod loading_station-val ((m <AddOrModifyForkliftTask-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:loading_station-val is deprecated.  Use scheduling_msgs-srv:loading_station instead.")
  (loading_station m))

(cl:ensure-generic-function 'unloading_station-val :lambda-list '(m))
(cl:defmethod unloading_station-val ((m <AddOrModifyForkliftTask-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:unloading_station-val is deprecated.  Use scheduling_msgs-srv:unloading_station instead.")
  (unloading_station m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <AddOrModifyForkliftTask-request>) ostream)
  "Serializes a message object of type '<AddOrModifyForkliftTask-request>"
  (cl:let* ((signed (cl:slot-value msg 'task_id)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'loading_station))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'loading_station))
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'unloading_station))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'unloading_station))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <AddOrModifyForkliftTask-request>) istream)
  "Deserializes a message object of type '<AddOrModifyForkliftTask-request>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'task_id) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'loading_station) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'loading_station) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'unloading_station) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'unloading_station) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<AddOrModifyForkliftTask-request>)))
  "Returns string type for a service object of type '<AddOrModifyForkliftTask-request>"
  "scheduling_msgs/AddOrModifyForkliftTaskRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'AddOrModifyForkliftTask-request)))
  "Returns string type for a service object of type 'AddOrModifyForkliftTask-request"
  "scheduling_msgs/AddOrModifyForkliftTaskRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<AddOrModifyForkliftTask-request>)))
  "Returns md5sum for a message object of type '<AddOrModifyForkliftTask-request>"
  "8f59951b0beaab467988840cbcef68be")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'AddOrModifyForkliftTask-request)))
  "Returns md5sum for a message object of type 'AddOrModifyForkliftTask-request"
  "8f59951b0beaab467988840cbcef68be")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<AddOrModifyForkliftTask-request>)))
  "Returns full string definition for message of type '<AddOrModifyForkliftTask-request>"
  (cl:format cl:nil "int32 task_id~%string loading_station~%string unloading_station~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'AddOrModifyForkliftTask-request)))
  "Returns full string definition for message of type 'AddOrModifyForkliftTask-request"
  (cl:format cl:nil "int32 task_id~%string loading_station~%string unloading_station~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <AddOrModifyForkliftTask-request>))
  (cl:+ 0
     4
     4 (cl:length (cl:slot-value msg 'loading_station))
     4 (cl:length (cl:slot-value msg 'unloading_station))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <AddOrModifyForkliftTask-request>))
  "Converts a ROS message object to a list"
  (cl:list 'AddOrModifyForkliftTask-request
    (cl:cons ':task_id (task_id msg))
    (cl:cons ':loading_station (loading_station msg))
    (cl:cons ':unloading_station (unloading_station msg))
))
;//! \htmlinclude AddOrModifyForkliftTask-response.msg.html

(cl:defclass <AddOrModifyForkliftTask-response> (roslisp-msg-protocol:ros-message)
  ((feedback
    :reader feedback
    :initarg :feedback
    :type cl:integer
    :initform 0))
)

(cl:defclass AddOrModifyForkliftTask-response (<AddOrModifyForkliftTask-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <AddOrModifyForkliftTask-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'AddOrModifyForkliftTask-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<AddOrModifyForkliftTask-response> is deprecated: use scheduling_msgs-srv:AddOrModifyForkliftTask-response instead.")))

(cl:ensure-generic-function 'feedback-val :lambda-list '(m))
(cl:defmethod feedback-val ((m <AddOrModifyForkliftTask-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:feedback-val is deprecated.  Use scheduling_msgs-srv:feedback instead.")
  (feedback m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <AddOrModifyForkliftTask-response>) ostream)
  "Serializes a message object of type '<AddOrModifyForkliftTask-response>"
  (cl:let* ((signed (cl:slot-value msg 'feedback)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <AddOrModifyForkliftTask-response>) istream)
  "Deserializes a message object of type '<AddOrModifyForkliftTask-response>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'feedback) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<AddOrModifyForkliftTask-response>)))
  "Returns string type for a service object of type '<AddOrModifyForkliftTask-response>"
  "scheduling_msgs/AddOrModifyForkliftTaskResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'AddOrModifyForkliftTask-response)))
  "Returns string type for a service object of type 'AddOrModifyForkliftTask-response"
  "scheduling_msgs/AddOrModifyForkliftTaskResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<AddOrModifyForkliftTask-response>)))
  "Returns md5sum for a message object of type '<AddOrModifyForkliftTask-response>"
  "8f59951b0beaab467988840cbcef68be")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'AddOrModifyForkliftTask-response)))
  "Returns md5sum for a message object of type 'AddOrModifyForkliftTask-response"
  "8f59951b0beaab467988840cbcef68be")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<AddOrModifyForkliftTask-response>)))
  "Returns full string definition for message of type '<AddOrModifyForkliftTask-response>"
  (cl:format cl:nil "int32 feedback~%~%~%~%~%~%~%~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'AddOrModifyForkliftTask-response)))
  "Returns full string definition for message of type 'AddOrModifyForkliftTask-response"
  (cl:format cl:nil "int32 feedback~%~%~%~%~%~%~%~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <AddOrModifyForkliftTask-response>))
  (cl:+ 0
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <AddOrModifyForkliftTask-response>))
  "Converts a ROS message object to a list"
  (cl:list 'AddOrModifyForkliftTask-response
    (cl:cons ':feedback (feedback msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'AddOrModifyForkliftTask)))
  'AddOrModifyForkliftTask-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'AddOrModifyForkliftTask)))
  'AddOrModifyForkliftTask-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'AddOrModifyForkliftTask)))
  "Returns string type for a service object of type '<AddOrModifyForkliftTask>"
  "scheduling_msgs/AddOrModifyForkliftTask")