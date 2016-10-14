; Auto-generated. Do not edit!


(cl:in-package waypoints_nav-srv)


;//! \htmlinclude Pose-request.msg.html

(cl:defclass <Pose-request> (roslisp-msg-protocol:ros-message)
  ((pose
    :reader pose
    :initarg :pose
    :type geometry_msgs-msg:Pose
    :initform (cl:make-instance 'geometry_msgs-msg:Pose)))
)

(cl:defclass Pose-request (<Pose-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <Pose-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'Pose-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name waypoints_nav-srv:<Pose-request> is deprecated: use waypoints_nav-srv:Pose-request instead.")))

(cl:ensure-generic-function 'pose-val :lambda-list '(m))
(cl:defmethod pose-val ((m <Pose-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader waypoints_nav-srv:pose-val is deprecated.  Use waypoints_nav-srv:pose instead.")
  (pose m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <Pose-request>) ostream)
  "Serializes a message object of type '<Pose-request>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'pose) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <Pose-request>) istream)
  "Deserializes a message object of type '<Pose-request>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'pose) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<Pose-request>)))
  "Returns string type for a service object of type '<Pose-request>"
  "waypoints_nav/PoseRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'Pose-request)))
  "Returns string type for a service object of type 'Pose-request"
  "waypoints_nav/PoseRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<Pose-request>)))
  "Returns md5sum for a message object of type '<Pose-request>"
  "2c06c39bfac810268e3bcf68619273a5")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'Pose-request)))
  "Returns md5sum for a message object of type 'Pose-request"
  "2c06c39bfac810268e3bcf68619273a5")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<Pose-request>)))
  "Returns full string definition for message of type '<Pose-request>"
  (cl:format cl:nil "geometry_msgs/Pose pose~%~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'Pose-request)))
  "Returns full string definition for message of type 'Pose-request"
  (cl:format cl:nil "geometry_msgs/Pose pose~%~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of postion and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <Pose-request>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'pose))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <Pose-request>))
  "Converts a ROS message object to a list"
  (cl:list 'Pose-request
    (cl:cons ':pose (pose msg))
))
;//! \htmlinclude Pose-response.msg.html

(cl:defclass <Pose-response> (roslisp-msg-protocol:ros-message)
  ((status
    :reader status
    :initarg :status
    :type cl:boolean
    :initform cl:nil))
)

(cl:defclass Pose-response (<Pose-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <Pose-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'Pose-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name waypoints_nav-srv:<Pose-response> is deprecated: use waypoints_nav-srv:Pose-response instead.")))

(cl:ensure-generic-function 'status-val :lambda-list '(m))
(cl:defmethod status-val ((m <Pose-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader waypoints_nav-srv:status-val is deprecated.  Use waypoints_nav-srv:status instead.")
  (status m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <Pose-response>) ostream)
  "Serializes a message object of type '<Pose-response>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'status) 1 0)) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <Pose-response>) istream)
  "Deserializes a message object of type '<Pose-response>"
    (cl:setf (cl:slot-value msg 'status) (cl:not (cl:zerop (cl:read-byte istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<Pose-response>)))
  "Returns string type for a service object of type '<Pose-response>"
  "waypoints_nav/PoseResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'Pose-response)))
  "Returns string type for a service object of type 'Pose-response"
  "waypoints_nav/PoseResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<Pose-response>)))
  "Returns md5sum for a message object of type '<Pose-response>"
  "2c06c39bfac810268e3bcf68619273a5")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'Pose-response)))
  "Returns md5sum for a message object of type 'Pose-response"
  "2c06c39bfac810268e3bcf68619273a5")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<Pose-response>)))
  "Returns full string definition for message of type '<Pose-response>"
  (cl:format cl:nil "bool status~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'Pose-response)))
  "Returns full string definition for message of type 'Pose-response"
  (cl:format cl:nil "bool status~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <Pose-response>))
  (cl:+ 0
     1
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <Pose-response>))
  "Converts a ROS message object to a list"
  (cl:list 'Pose-response
    (cl:cons ':status (status msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'Pose)))
  'Pose-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'Pose)))
  'Pose-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'Pose)))
  "Returns string type for a service object of type '<Pose>"
  "waypoints_nav/Pose")