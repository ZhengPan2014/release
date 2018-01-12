; Auto-generated. Do not edit!


(cl:in-package yocs_msgs-srv)


;//! \htmlinclude VirtualObstacles-request.msg.html

(cl:defclass <VirtualObstacles-request> (roslisp-msg-protocol:ros-message)
  ((obstacles
    :reader obstacles
    :initarg :obstacles
    :type (cl:vector geometry_msgs-msg:Polygon)
   :initform (cl:make-array 0 :element-type 'geometry_msgs-msg:Polygon :initial-element (cl:make-instance 'geometry_msgs-msg:Polygon))))
)

(cl:defclass VirtualObstacles-request (<VirtualObstacles-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <VirtualObstacles-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'VirtualObstacles-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name yocs_msgs-srv:<VirtualObstacles-request> is deprecated: use yocs_msgs-srv:VirtualObstacles-request instead.")))

(cl:ensure-generic-function 'obstacles-val :lambda-list '(m))
(cl:defmethod obstacles-val ((m <VirtualObstacles-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader yocs_msgs-srv:obstacles-val is deprecated.  Use yocs_msgs-srv:obstacles instead.")
  (obstacles m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <VirtualObstacles-request>) ostream)
  "Serializes a message object of type '<VirtualObstacles-request>"
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'obstacles))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (roslisp-msg-protocol:serialize ele ostream))
   (cl:slot-value msg 'obstacles))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <VirtualObstacles-request>) istream)
  "Deserializes a message object of type '<VirtualObstacles-request>"
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'obstacles) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'obstacles)))
    (cl:dotimes (i __ros_arr_len)
    (cl:setf (cl:aref vals i) (cl:make-instance 'geometry_msgs-msg:Polygon))
  (roslisp-msg-protocol:deserialize (cl:aref vals i) istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<VirtualObstacles-request>)))
  "Returns string type for a service object of type '<VirtualObstacles-request>"
  "yocs_msgs/VirtualObstaclesRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'VirtualObstacles-request)))
  "Returns string type for a service object of type 'VirtualObstacles-request"
  "yocs_msgs/VirtualObstaclesRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<VirtualObstacles-request>)))
  "Returns md5sum for a message object of type '<VirtualObstacles-request>"
  "5f239ab4c346711409318bb572e09921")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'VirtualObstacles-request)))
  "Returns md5sum for a message object of type 'VirtualObstacles-request"
  "5f239ab4c346711409318bb572e09921")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<VirtualObstacles-request>)))
  "Returns full string definition for message of type '<VirtualObstacles-request>"
  (cl:format cl:nil "~%~%~%~%~%geometry_msgs/Polygon[] obstacles~%~%================================================================================~%MSG: geometry_msgs/Polygon~%#A specification of a polygon where the first and last points are assumed to be connected~%Point32[] points~%~%================================================================================~%MSG: geometry_msgs/Point32~%# This contains the position of a point in free space(with 32 bits of precision).~%# It is recommeded to use Point wherever possible instead of Point32.  ~%# ~%# This recommendation is to promote interoperability.  ~%#~%# This message is designed to take up less space when sending~%# lots of points at once, as in the case of a PointCloud.  ~%~%float32 x~%float32 y~%float32 z~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'VirtualObstacles-request)))
  "Returns full string definition for message of type 'VirtualObstacles-request"
  (cl:format cl:nil "~%~%~%~%~%geometry_msgs/Polygon[] obstacles~%~%================================================================================~%MSG: geometry_msgs/Polygon~%#A specification of a polygon where the first and last points are assumed to be connected~%Point32[] points~%~%================================================================================~%MSG: geometry_msgs/Point32~%# This contains the position of a point in free space(with 32 bits of precision).~%# It is recommeded to use Point wherever possible instead of Point32.  ~%# ~%# This recommendation is to promote interoperability.  ~%#~%# This message is designed to take up less space when sending~%# lots of points at once, as in the case of a PointCloud.  ~%~%float32 x~%float32 y~%float32 z~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <VirtualObstacles-request>))
  (cl:+ 0
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'obstacles) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ (roslisp-msg-protocol:serialization-length ele))))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <VirtualObstacles-request>))
  "Converts a ROS message object to a list"
  (cl:list 'VirtualObstacles-request
    (cl:cons ':obstacles (obstacles msg))
))
;//! \htmlinclude VirtualObstacles-response.msg.html

(cl:defclass <VirtualObstacles-response> (roslisp-msg-protocol:ros-message)
  ((success
    :reader success
    :initarg :success
    :type cl:boolean
    :initform cl:nil)
   (message
    :reader message
    :initarg :message
    :type cl:string
    :initform ""))
)

(cl:defclass VirtualObstacles-response (<VirtualObstacles-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <VirtualObstacles-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'VirtualObstacles-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name yocs_msgs-srv:<VirtualObstacles-response> is deprecated: use yocs_msgs-srv:VirtualObstacles-response instead.")))

(cl:ensure-generic-function 'success-val :lambda-list '(m))
(cl:defmethod success-val ((m <VirtualObstacles-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader yocs_msgs-srv:success-val is deprecated.  Use yocs_msgs-srv:success instead.")
  (success m))

(cl:ensure-generic-function 'message-val :lambda-list '(m))
(cl:defmethod message-val ((m <VirtualObstacles-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader yocs_msgs-srv:message-val is deprecated.  Use yocs_msgs-srv:message instead.")
  (message m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <VirtualObstacles-response>) ostream)
  "Serializes a message object of type '<VirtualObstacles-response>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'success) 1 0)) ostream)
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'message))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'message))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <VirtualObstacles-response>) istream)
  "Deserializes a message object of type '<VirtualObstacles-response>"
    (cl:setf (cl:slot-value msg 'success) (cl:not (cl:zerop (cl:read-byte istream))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'message) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'message) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<VirtualObstacles-response>)))
  "Returns string type for a service object of type '<VirtualObstacles-response>"
  "yocs_msgs/VirtualObstaclesResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'VirtualObstacles-response)))
  "Returns string type for a service object of type 'VirtualObstacles-response"
  "yocs_msgs/VirtualObstaclesResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<VirtualObstacles-response>)))
  "Returns md5sum for a message object of type '<VirtualObstacles-response>"
  "5f239ab4c346711409318bb572e09921")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'VirtualObstacles-response)))
  "Returns md5sum for a message object of type 'VirtualObstacles-response"
  "5f239ab4c346711409318bb572e09921")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<VirtualObstacles-response>)))
  "Returns full string definition for message of type '<VirtualObstacles-response>"
  (cl:format cl:nil "bool success~%string message~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'VirtualObstacles-response)))
  "Returns full string definition for message of type 'VirtualObstacles-response"
  (cl:format cl:nil "bool success~%string message~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <VirtualObstacles-response>))
  (cl:+ 0
     1
     4 (cl:length (cl:slot-value msg 'message))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <VirtualObstacles-response>))
  "Converts a ROS message object to a list"
  (cl:list 'VirtualObstacles-response
    (cl:cons ':success (success msg))
    (cl:cons ':message (message msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'VirtualObstacles)))
  'VirtualObstacles-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'VirtualObstacles)))
  'VirtualObstacles-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'VirtualObstacles)))
  "Returns string type for a service object of type '<VirtualObstacles>"
  "yocs_msgs/VirtualObstacles")