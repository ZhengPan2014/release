
(cl:in-package :asdf)

(defsystem "pallet_recognition-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :geometry_msgs-msg
)
  :components ((:file "_package")
    (:file "DetectPallet" :depends-on ("_package_DetectPallet"))
    (:file "_package_DetectPallet" :depends-on ("_package"))
  ))