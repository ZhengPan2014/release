; Auto-generated. Do not edit!


(cl:in-package yocs_msgs-srv)


;//! \htmlinclude NavgationCtrlService-request.msg.html

(cl:defclass <NavgationCtrlService-request> (roslisp-msg-protocol:ros-message)
  ((msg
    :reader msg
    :initarg :msg
    :type yocs_msgs-msg:NavigationControl
    :initform (cl:make-instance 'yocs_msgs-msg:NavigationControl)))
)

(cl:defclass NavgationCtrlService-request (<NavgationCtrlService-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <NavgationCtrlService-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'NavgationCtrlService-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name yocs_msgs-srv:<NavgationCtrlService-request> is deprecated: use yocs_msgs-srv:NavgationCtrlService-request instead.")))

(cl:ensure-generic-function 'msg-val :lambda-list '(m))
(cl:defmethod msg-val ((m <NavgationCtrlService-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader yocs_msgs-srv:msg-val is deprecated.  Use yocs_msgs-srv:msg instead.")
  (msg m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <NavgationCtrlService-request>) ostream)
  "Serializes a message object of type '<NavgationCtrlService-request>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'msg) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <NavgationCtrlService-request>) istream)
  "Deserializes a message object of type '<NavgationCtrlService-request>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'msg) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<NavgationCtrlService-request>)))
  "Returns string type for a service object of type '<NavgationCtrlService-request>"
  "yocs_msgs/NavgationCtrlServiceRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'NavgationCtrlService-request)))
  "Returns string type for a service object of type 'NavgationCtrlService-request"
  "yocs_msgs/NavgationCtrlServiceRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<NavgationCtrlService-request>)))
  "Returns md5sum for a message object of type '<NavgationCtrlService-request>"
  "7a0a7e8479acaa6ce70d517956274341")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'NavgationCtrlService-request)))
  "Returns md5sum for a message object of type 'NavgationCtrlService-request"
  "7a0a7e8479acaa6ce70d517956274341")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<NavgationCtrlService-request>)))
  "Returns full string definition for message of type '<NavgationCtrlService-request>"
  (cl:format cl:nil "NavigationControl msg~%~%================================================================================~%MSG: yocs_msgs/NavigationControl~%# control the way point/trajectory navigation~%int8 control~%~%int8 STOP  = 0~%int8 START = 1~%int8 PAUSE = 2~%~%# name of the way point(s) / trajectory to be execute~%# leave empty, when stopping or pausing~%string goal_name~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'NavgationCtrlService-request)))
  "Returns full string definition for message of type 'NavgationCtrlService-request"
  (cl:format cl:nil "NavigationControl msg~%~%================================================================================~%MSG: yocs_msgs/NavigationControl~%# control the way point/trajectory navigation~%int8 control~%~%int8 STOP  = 0~%int8 START = 1~%int8 PAUSE = 2~%~%# name of the way point(s) / trajectory to be execute~%# leave empty, when stopping or pausing~%string goal_name~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <NavgationCtrlService-request>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'msg))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <NavgationCtrlService-request>))
  "Converts a ROS message object to a list"
  (cl:list 'NavgationCtrlService-request
    (cl:cons ':msg (msg msg))
))
;//! \htmlinclude NavgationCtrlService-response.msg.html

(cl:defclass <NavgationCtrlService-response> (roslisp-msg-protocol:ros-message)
  ((success
    :reader success
    :initarg :success
    :type cl:boolean
    :initform cl:nil))
)

(cl:defclass NavgationCtrlService-response (<NavgationCtrlService-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <NavgationCtrlService-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'NavgationCtrlService-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name yocs_msgs-srv:<NavgationCtrlService-response> is deprecated: use yocs_msgs-srv:NavgationCtrlService-response instead.")))

(cl:ensure-generic-function 'success-val :lambda-list '(m))
(cl:defmethod success-val ((m <NavgationCtrlService-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader yocs_msgs-srv:success-val is deprecated.  Use yocs_msgs-srv:success instead.")
  (success m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <NavgationCtrlService-response>) ostream)
  "Serializes a message object of type '<NavgationCtrlService-response>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'success) 1 0)) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <NavgationCtrlService-response>) istream)
  "Deserializes a message object of type '<NavgationCtrlService-response>"
    (cl:setf (cl:slot-value msg 'success) (cl:not (cl:zerop (cl:read-byte istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<NavgationCtrlService-response>)))
  "Returns string type for a service object of type '<NavgationCtrlService-response>"
  "yocs_msgs/NavgationCtrlServiceResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'NavgationCtrlService-response)))
  "Returns string type for a service object of type 'NavgationCtrlService-response"
  "yocs_msgs/NavgationCtrlServiceResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<NavgationCtrlService-response>)))
  "Returns md5sum for a message object of type '<NavgationCtrlService-response>"
  "7a0a7e8479acaa6ce70d517956274341")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'NavgationCtrlService-response)))
  "Returns md5sum for a message object of type 'NavgationCtrlService-response"
  "7a0a7e8479acaa6ce70d517956274341")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<NavgationCtrlService-response>)))
  "Returns full string definition for message of type '<NavgationCtrlService-response>"
  (cl:format cl:nil "bool success~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'NavgationCtrlService-response)))
  "Returns full string definition for message of type 'NavgationCtrlService-response"
  (cl:format cl:nil "bool success~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <NavgationCtrlService-response>))
  (cl:+ 0
     1
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <NavgationCtrlService-response>))
  "Converts a ROS message object to a list"
  (cl:list 'NavgationCtrlService-response
    (cl:cons ':success (success msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'NavgationCtrlService)))
  'NavgationCtrlService-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'NavgationCtrlService)))
  'NavgationCtrlService-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'NavgationCtrlService)))
  "Returns string type for a service object of type '<NavgationCtrlService>"
  "yocs_msgs/NavgationCtrlService")