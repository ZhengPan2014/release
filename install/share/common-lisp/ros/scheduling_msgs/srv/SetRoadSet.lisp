; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-srv)


;//! \htmlinclude SetRoadSet-request.msg.html

(cl:defclass <SetRoadSet-request> (roslisp-msg-protocol:ros-message)
  ((agvID
    :reader agvID
    :initarg :agvID
    :type cl:integer
    :initform 0)
   (roadsets
    :reader roadsets
    :initarg :roadsets
    :type (cl:vector scheduling_msgs-msg:RoadSet)
   :initform (cl:make-array 0 :element-type 'scheduling_msgs-msg:RoadSet :initial-element (cl:make-instance 'scheduling_msgs-msg:RoadSet))))
)

(cl:defclass SetRoadSet-request (<SetRoadSet-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <SetRoadSet-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'SetRoadSet-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<SetRoadSet-request> is deprecated: use scheduling_msgs-srv:SetRoadSet-request instead.")))

(cl:ensure-generic-function 'agvID-val :lambda-list '(m))
(cl:defmethod agvID-val ((m <SetRoadSet-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:agvID-val is deprecated.  Use scheduling_msgs-srv:agvID instead.")
  (agvID m))

(cl:ensure-generic-function 'roadsets-val :lambda-list '(m))
(cl:defmethod roadsets-val ((m <SetRoadSet-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:roadsets-val is deprecated.  Use scheduling_msgs-srv:roadsets instead.")
  (roadsets m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <SetRoadSet-request>) ostream)
  "Serializes a message object of type '<SetRoadSet-request>"
  (cl:let* ((signed (cl:slot-value msg 'agvID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'roadsets))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (roslisp-msg-protocol:serialize ele ostream))
   (cl:slot-value msg 'roadsets))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <SetRoadSet-request>) istream)
  "Deserializes a message object of type '<SetRoadSet-request>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'agvID) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'roadsets) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'roadsets)))
    (cl:dotimes (i __ros_arr_len)
    (cl:setf (cl:aref vals i) (cl:make-instance 'scheduling_msgs-msg:RoadSet))
  (roslisp-msg-protocol:deserialize (cl:aref vals i) istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<SetRoadSet-request>)))
  "Returns string type for a service object of type '<SetRoadSet-request>"
  "scheduling_msgs/SetRoadSetRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'SetRoadSet-request)))
  "Returns string type for a service object of type 'SetRoadSet-request"
  "scheduling_msgs/SetRoadSetRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<SetRoadSet-request>)))
  "Returns md5sum for a message object of type '<SetRoadSet-request>"
  "41789a451e3fffe698a3671dfc57117c")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'SetRoadSet-request)))
  "Returns md5sum for a message object of type 'SetRoadSet-request"
  "41789a451e3fffe698a3671dfc57117c")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<SetRoadSet-request>)))
  "Returns full string definition for message of type '<SetRoadSet-request>"
  (cl:format cl:nil "int32 agvID~%scheduling_msgs/RoadSet[] roadsets~%~%================================================================================~%MSG: scheduling_msgs/RoadSet~%geometry_msgs/Pose2D start~%geometry_msgs/Pose2D end~%~%================================================================================~%MSG: geometry_msgs/Pose2D~%# This expresses a position and orientation on a 2D manifold.~%~%float64 x~%float64 y~%float64 theta~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'SetRoadSet-request)))
  "Returns full string definition for message of type 'SetRoadSet-request"
  (cl:format cl:nil "int32 agvID~%scheduling_msgs/RoadSet[] roadsets~%~%================================================================================~%MSG: scheduling_msgs/RoadSet~%geometry_msgs/Pose2D start~%geometry_msgs/Pose2D end~%~%================================================================================~%MSG: geometry_msgs/Pose2D~%# This expresses a position and orientation on a 2D manifold.~%~%float64 x~%float64 y~%float64 theta~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <SetRoadSet-request>))
  (cl:+ 0
     4
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'roadsets) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ (roslisp-msg-protocol:serialization-length ele))))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <SetRoadSet-request>))
  "Converts a ROS message object to a list"
  (cl:list 'SetRoadSet-request
    (cl:cons ':agvID (agvID msg))
    (cl:cons ':roadsets (roadsets msg))
))
;//! \htmlinclude SetRoadSet-response.msg.html

(cl:defclass <SetRoadSet-response> (roslisp-msg-protocol:ros-message)
  ((feedback
    :reader feedback
    :initarg :feedback
    :type cl:integer
    :initform 0))
)

(cl:defclass SetRoadSet-response (<SetRoadSet-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <SetRoadSet-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'SetRoadSet-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-srv:<SetRoadSet-response> is deprecated: use scheduling_msgs-srv:SetRoadSet-response instead.")))

(cl:ensure-generic-function 'feedback-val :lambda-list '(m))
(cl:defmethod feedback-val ((m <SetRoadSet-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-srv:feedback-val is deprecated.  Use scheduling_msgs-srv:feedback instead.")
  (feedback m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <SetRoadSet-response>) ostream)
  "Serializes a message object of type '<SetRoadSet-response>"
  (cl:let* ((signed (cl:slot-value msg 'feedback)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <SetRoadSet-response>) istream)
  "Deserializes a message object of type '<SetRoadSet-response>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'feedback) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<SetRoadSet-response>)))
  "Returns string type for a service object of type '<SetRoadSet-response>"
  "scheduling_msgs/SetRoadSetResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'SetRoadSet-response)))
  "Returns string type for a service object of type 'SetRoadSet-response"
  "scheduling_msgs/SetRoadSetResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<SetRoadSet-response>)))
  "Returns md5sum for a message object of type '<SetRoadSet-response>"
  "41789a451e3fffe698a3671dfc57117c")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'SetRoadSet-response)))
  "Returns md5sum for a message object of type 'SetRoadSet-response"
  "41789a451e3fffe698a3671dfc57117c")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<SetRoadSet-response>)))
  "Returns full string definition for message of type '<SetRoadSet-response>"
  (cl:format cl:nil "int32 feedback~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'SetRoadSet-response)))
  "Returns full string definition for message of type 'SetRoadSet-response"
  (cl:format cl:nil "int32 feedback~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <SetRoadSet-response>))
  (cl:+ 0
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <SetRoadSet-response>))
  "Converts a ROS message object to a list"
  (cl:list 'SetRoadSet-response
    (cl:cons ':feedback (feedback msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'SetRoadSet)))
  'SetRoadSet-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'SetRoadSet)))
  'SetRoadSet-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'SetRoadSet)))
  "Returns string type for a service object of type '<SetRoadSet>"
  "scheduling_msgs/SetRoadSet")