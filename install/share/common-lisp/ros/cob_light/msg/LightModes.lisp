; Auto-generated. Do not edit!


(cl:in-package cob_light-msg)


;//! \htmlinclude LightModes.msg.html

(cl:defclass <LightModes> (roslisp-msg-protocol:ros-message)
  ()
)

(cl:defclass LightModes (<LightModes>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <LightModes>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'LightModes)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name cob_light-msg:<LightModes> is deprecated: use cob_light-msg:LightModes instead.")))
(cl:defmethod roslisp-msg-protocol:symbol-codes ((msg-type (cl:eql '<LightModes>)))
    "Constants for message type '<LightModes>"
  '((:NONE . 0)
    (:STATIC . 1)
    (:FLASH . 2)
    (:BREATH . 3)
    (:BREATH_COLOR . 4)
    (:FADE_COLOR . 5)
    (:SEQ . 6)
    (:CIRCLE_COLORS . 7)
    (:SWEEP . 8)
    (:DIST_APPROX . 9)
    (:GLOW . 10)
    (:XMAS . 11))
)
(cl:defmethod roslisp-msg-protocol:symbol-codes ((msg-type (cl:eql 'LightModes)))
    "Constants for message type 'LightModes"
  '((:NONE . 0)
    (:STATIC . 1)
    (:FLASH . 2)
    (:BREATH . 3)
    (:BREATH_COLOR . 4)
    (:FADE_COLOR . 5)
    (:SEQ . 6)
    (:CIRCLE_COLORS . 7)
    (:SWEEP . 8)
    (:DIST_APPROX . 9)
    (:GLOW . 10)
    (:XMAS . 11))
)
(cl:defmethod roslisp-msg-protocol:serialize ((msg <LightModes>) ostream)
  "Serializes a message object of type '<LightModes>"
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <LightModes>) istream)
  "Deserializes a message object of type '<LightModes>"
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<LightModes>)))
  "Returns string type for a message object of type '<LightModes>"
  "cob_light/LightModes")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'LightModes)))
  "Returns string type for a message object of type 'LightModes"
  "cob_light/LightModes")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<LightModes>)))
  "Returns md5sum for a message object of type '<LightModes>"
  "a8bc2f81613e751ed7ec7ea0d8d7e7f4")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'LightModes)))
  "Returns md5sum for a message object of type 'LightModes"
  "a8bc2f81613e751ed7ec7ea0d8d7e7f4")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<LightModes>)))
  "Returns full string definition for message of type '<LightModes>"
  (cl:format cl:nil "uint8 NONE =           0           # will turn everything off~%uint8 STATIC =         1           # will change the LEDs to \"color\"~%uint8 FLASH =          2           # will change the LEDs frequently with \"frequency\" from \"color\" to black~%uint8 BREATH =         3           # will change the LEDs smoothly with \"frequency\" from \"color\" to black~%uint8 BREATH_COLOR =   4           # will change the LEDs smoothly with \"frequency\" from \"color\" to black~%                                   # and flips color in time~%uint8 FADE_COLOR =     5           # will fade the colors in rainbow~%uint8 SEQ =            6           # executes one sequence after another as defined in sequences array~%uint8 CIRCLE_COLORS =  7           # circle through specific colors, if one color is set only one color will circle~%                                   # if more than one color is set, that this colors will circle through~%uint8 SWEEP =          8           # circle color from front to back on both sides~%uint8 DIST_APPROX =    9           # color led circle from green to red depended on the measured laserscan dists~%uint8 GLOW =          10           # glow the color~%uint8 XMAS =          11           # red white christmas mode~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'LightModes)))
  "Returns full string definition for message of type 'LightModes"
  (cl:format cl:nil "uint8 NONE =           0           # will turn everything off~%uint8 STATIC =         1           # will change the LEDs to \"color\"~%uint8 FLASH =          2           # will change the LEDs frequently with \"frequency\" from \"color\" to black~%uint8 BREATH =         3           # will change the LEDs smoothly with \"frequency\" from \"color\" to black~%uint8 BREATH_COLOR =   4           # will change the LEDs smoothly with \"frequency\" from \"color\" to black~%                                   # and flips color in time~%uint8 FADE_COLOR =     5           # will fade the colors in rainbow~%uint8 SEQ =            6           # executes one sequence after another as defined in sequences array~%uint8 CIRCLE_COLORS =  7           # circle through specific colors, if one color is set only one color will circle~%                                   # if more than one color is set, that this colors will circle through~%uint8 SWEEP =          8           # circle color from front to back on both sides~%uint8 DIST_APPROX =    9           # color led circle from green to red depended on the measured laserscan dists~%uint8 GLOW =          10           # glow the color~%uint8 XMAS =          11           # red white christmas mode~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <LightModes>))
  (cl:+ 0
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <LightModes>))
  "Converts a ROS message object to a list"
  (cl:list 'LightModes
))
