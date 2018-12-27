; Auto-generated. Do not edit!


(cl:in-package cob_footprint_observer-srv)


;//! \htmlinclude GetFootprint-request.msg.html

(cl:defclass <GetFootprint-request> (roslisp-msg-protocol:ros-message)
  ()
)

(cl:defclass GetFootprint-request (<GetFootprint-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <GetFootprint-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'GetFootprint-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_footprint_observer-srv:<GetFootprint-request> is deprecated: use cob_footprint_observer-srv:GetFootprint-request instead.")))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <GetFootprint-request>) ostream)
  "Serializes a message object of type '<GetFootprint-request>"
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <GetFootprint-request>) istream)
  "Deserializes a message object of type '<GetFootprint-request>"
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<GetFootprint-request>)))
  "Returns string type for a service object of type '<GetFootprint-request>"
  "cob_footprint_observer/GetFootprintRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'GetFootprint-request)))
  "Returns string type for a service object of type 'GetFootprint-request"
  "cob_footprint_observer/GetFootprintRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<GetFootprint-request>)))
  "Returns md5sum for a message object of type '<GetFootprint-request>"
  "f40d48f5ad16c4c6dbedafd967306675")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'GetFootprint-request)))
  "Returns md5sum for a message object of type 'GetFootprint-request"
  "f40d48f5ad16c4c6dbedafd967306675")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<GetFootprint-request>)))
  "Returns full string definition for message of type '<GetFootprint-request>"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'GetFootprint-request)))
  "Returns full string definition for message of type 'GetFootprint-request"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <GetFootprint-request>))
  (cl:+ 0
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <GetFootprint-request>))
  "Converts a ROS message object to a list"
  (cl:list 'GetFootprint-request
))
;//! \htmlinclude GetFootprint-response.msg.html

(cl:defclass <GetFootprint-response> (roslisp-msg-protocol:ros-message)
  ((footprint
    :reader footprint
    :initarg :footprint
    :type geometry_msgs-msg:PolygonStamped
    :initform (cl:make-instance 'geometry_msgs-msg:PolygonStamped))
   (success
    :reader success
    :initarg :success
    :type std_msgs-msg:Bool
    :initform (cl:make-instance 'std_msgs-msg:Bool)))
)

(cl:defclass GetFootprint-response (<GetFootprint-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <GetFootprint-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'GetFootprint-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_footprint_observer-srv:<GetFootprint-response> is deprecated: use cob_footprint_observer-srv:GetFootprint-response instead.")))

(cl:ensure-generic-function 'footprint-val :lambda-list '(m))
(cl:defmethod footprint-val ((m <GetFootprint-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_footprint_observer-srv:footprint-val is deprecated.  Use cob_footprint_observer-srv:footprint instead.")
  (footprint m))

(cl:ensure-generic-function 'success-val :lambda-list '(m))
(cl:defmethod success-val ((m <GetFootprint-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader cob_footprint_observer-srv:success-val is deprecated.  Use cob_footprint_observer-srv:success instead.")
  (success m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <GetFootprint-response>) ostream)
  "Serializes a message object of type '<GetFootprint-response>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'footprint) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'success) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <GetFootprint-response>) istream)
  "Deserializes a message object of type '<GetFootprint-response>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'footprint) istream)
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'success) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<GetFootprint-response>)))
  "Returns string type for a service object of type '<GetFootprint-response>"
  "cob_footprint_observer/GetFootprintResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'GetFootprint-response)))
  "Returns string type for a service object of type 'GetFootprint-response"
  "cob_footprint_observer/GetFootprintResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<GetFootprint-response>)))
  "Returns md5sum for a message object of type '<GetFootprint-response>"
  "f40d48f5ad16c4c6dbedafd967306675")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'GetFootprint-response)))
  "Returns md5sum for a message object of type 'GetFootprint-response"
  "f40d48f5ad16c4c6dbedafd967306675")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<GetFootprint-response>)))
  "Returns full string definition for message of type '<GetFootprint-response>"
  (cl:format cl:nil "geometry_msgs/PolygonStamped footprint~%std_msgs/Bool success~%~%~%================================================================================~%MSG: geometry_msgs/PolygonStamped~%# This represents a Polygon with reference coordinate frame and timestamp~%Header header~%Polygon polygon~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/Polygon~%#A specification of a polygon where the first and last points are assumed to be connected~%Point32[] points~%~%================================================================================~%MSG: geometry_msgs/Point32~%# This contains the position of a point in free space(with 32 bits of precision).~%# It is recommeded to use Point wherever possible instead of Point32.  ~%# ~%# This recommendation is to promote interoperability.  ~%#~%# This message is designed to take up less space when sending~%# lots of points at once, as in the case of a PointCloud.  ~%~%float32 x~%float32 y~%float32 z~%================================================================================~%MSG: std_msgs/Bool~%bool data~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'GetFootprint-response)))
  "Returns full string definition for message of type 'GetFootprint-response"
  (cl:format cl:nil "geometry_msgs/PolygonStamped footprint~%std_msgs/Bool success~%~%~%================================================================================~%MSG: geometry_msgs/PolygonStamped~%# This represents a Polygon with reference coordinate frame and timestamp~%Header header~%Polygon polygon~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/Polygon~%#A specification of a polygon where the first and last points are assumed to be connected~%Point32[] points~%~%================================================================================~%MSG: geometry_msgs/Point32~%# This contains the position of a point in free space(with 32 bits of precision).~%# It is recommeded to use Point wherever possible instead of Point32.  ~%# ~%# This recommendation is to promote interoperability.  ~%#~%# This message is designed to take up less space when sending~%# lots of points at once, as in the case of a PointCloud.  ~%~%float32 x~%float32 y~%float32 z~%================================================================================~%MSG: std_msgs/Bool~%bool data~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <GetFootprint-response>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'footprint))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'success))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <GetFootprint-response>))
  "Converts a ROS message object to a list"
  (cl:list 'GetFootprint-response
    (cl:cons ':footprint (footprint msg))
    (cl:cons ':success (success msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'GetFootprint)))
  'GetFootprint-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'GetFootprint)))
  'GetFootprint-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'GetFootprint)))
  "Returns string type for a service object of type '<GetFootprint>"
  "cob_footprint_observer/GetFootprint")