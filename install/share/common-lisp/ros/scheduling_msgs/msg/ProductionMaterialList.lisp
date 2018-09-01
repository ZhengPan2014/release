; Auto-generated. Do not edit!


(cl:in-package scheduling_msgs-msg)


;//! \htmlinclude ProductionMaterialList.msg.html

(cl:defclass <ProductionMaterialList> (roslisp-msg-protocol:ros-message)
  ((materials
    :reader materials
    :initarg :materials
    :type (cl:vector scheduling_msgs-msg:ProductionMaterial)
   :initform (cl:make-array 0 :element-type 'scheduling_msgs-msg:ProductionMaterial :initial-element (cl:make-instance 'scheduling_msgs-msg:ProductionMaterial))))
)

(cl:defclass ProductionMaterialList (<ProductionMaterialList>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <ProductionMaterialList>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'ProductionMaterialList)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name scheduling_msgs-msg:<ProductionMaterialList> is deprecated: use scheduling_msgs-msg:ProductionMaterialList instead.")))

(cl:ensure-generic-function 'materials-val :lambda-list '(m))
(cl:defmethod materials-val ((m <ProductionMaterialList>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader scheduling_msgs-msg:materials-val is deprecated.  Use scheduling_msgs-msg:materials instead.")
  (materials m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <ProductionMaterialList>) ostream)
  "Serializes a message object of type '<ProductionMaterialList>"
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'materials))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (roslisp-msg-protocol:serialize ele ostream))
   (cl:slot-value msg 'materials))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <ProductionMaterialList>) istream)
  "Deserializes a message object of type '<ProductionMaterialList>"
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'materials) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'materials)))
    (cl:dotimes (i __ros_arr_len)
    (cl:setf (cl:aref vals i) (cl:make-instance 'scheduling_msgs-msg:ProductionMaterial))
  (roslisp-msg-protocol:deserialize (cl:aref vals i) istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<ProductionMaterialList>)))
  "Returns string type for a message object of type '<ProductionMaterialList>"
  "scheduling_msgs/ProductionMaterialList")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ProductionMaterialList)))
  "Returns string type for a message object of type 'ProductionMaterialList"
  "scheduling_msgs/ProductionMaterialList")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<ProductionMaterialList>)))
  "Returns md5sum for a message object of type '<ProductionMaterialList>"
  "1dada5f7ba7a8f32db51b8a7e9e26cb3")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'ProductionMaterialList)))
  "Returns md5sum for a message object of type 'ProductionMaterialList"
  "1dada5f7ba7a8f32db51b8a7e9e26cb3")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<ProductionMaterialList>)))
  "Returns full string definition for message of type '<ProductionMaterialList>"
  (cl:format cl:nil "# msg for innolux~%ProductionMaterial[] materials~%================================================================================~%MSG: scheduling_msgs/ProductionMaterial~%# msg for innolux~%string line~%string station~%string machine~%string model~%string material_type~%string material_no~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'ProductionMaterialList)))
  "Returns full string definition for message of type 'ProductionMaterialList"
  (cl:format cl:nil "# msg for innolux~%ProductionMaterial[] materials~%================================================================================~%MSG: scheduling_msgs/ProductionMaterial~%# msg for innolux~%string line~%string station~%string machine~%string model~%string material_type~%string material_no~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <ProductionMaterialList>))
  (cl:+ 0
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'materials) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ (roslisp-msg-protocol:serialization-length ele))))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <ProductionMaterialList>))
  "Converts a ROS message object to a list"
  (cl:list 'ProductionMaterialList
    (cl:cons ':materials (materials msg))
))
