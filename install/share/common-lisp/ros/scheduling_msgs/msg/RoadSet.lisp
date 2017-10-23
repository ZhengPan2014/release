; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-msg)


;//! \htmlinclude RoadSet.msg.html

(cl:defclass <RoadSet> (roslisp-msg-protocol:ros-message)
  ((start
    :reader start
    :initarg :start
    :type geometry_msgs-msg:Pose2D
    :initform (cl:make-instance 'geometry_msgs-msg:Pose2D))
   (end
    :reader end
    :initarg :end
    :type geometry_msgs-msg:Pose2D
    :initform (cl:make-instance 'geometry_msgs-msg:Pose2D)))
)

(cl:defclass RoadSet (<RoadSet>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <RoadSet>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'RoadSet)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-msg:<RoadSet> is deprecated: use scheduling_msgs-msg:RoadSet instead.")))

(cl:ensure-generic-function 'start-val :lambda-list '(m))
(cl:defmethod start-val ((m <RoadSet>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:start-val is deprecated.  Use scheduling_msgs-msg:start instead.")
  (start m))

(cl:ensure-generic-function 'end-val :lambda-list '(m))
(cl:defmethod end-val ((m <RoadSet>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:end-val is deprecated.  Use scheduling_msgs-msg:end instead.")
  (end m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <RoadSet>) ostream)
  "Serializes a message object of type '<RoadSet>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'start) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'end) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <RoadSet>) istream)
  "Deserializes a message object of type '<RoadSet>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'start) istream)
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'end) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<RoadSet>)))
  "Returns string type for a message object of type '<RoadSet>"
  "scheduling_msgs/RoadSet")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'RoadSet)))
  "Returns string type for a message object of type 'RoadSet"
  "scheduling_msgs/RoadSet")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<RoadSet>)))
  "Returns md5sum for a message object of type '<RoadSet>"
  "0b8443ecd7e3cff1eb6612b7dcfe9406")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'RoadSet)))
  "Returns md5sum for a message object of type 'RoadSet"
  "0b8443ecd7e3cff1eb6612b7dcfe9406")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<RoadSet>)))
  "Returns full string definition for message of type '<RoadSet>"
  (cl:format cl:nil "geometry_msgs/Pose2D start~%geometry_msgs/Pose2D end~%~%================================================================================~%MSG: geometry_msgs/Pose2D~%# This expresses a position and orientation on a 2D manifold.~%~%float64 x~%float64 y~%float64 theta~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'RoadSet)))
  "Returns full string definition for message of type 'RoadSet"
  (cl:format cl:nil "geometry_msgs/Pose2D start~%geometry_msgs/Pose2D end~%~%================================================================================~%MSG: geometry_msgs/Pose2D~%# This expresses a position and orientation on a 2D manifold.~%~%float64 x~%float64 y~%float64 theta~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <RoadSet>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'start))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'end))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <RoadSet>))
  "Converts a ROS message object to a list"
  (cl:list 'RoadSet
    (cl:cons ':start (start msg))
    (cl:cons ':end (end msg))
))
