
(cl:in-package :asdf)

(defsystem "cob_footprint_observer-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :geometry_msgs-msg
               :std_msgs-msg
)
  :components ((:file "_package")
    (:file "GetFootprint" :depends-on ("_package_GetFootprint"))
    (:file "_package_GetFootprint" :depends-on ("_package"))
  ))