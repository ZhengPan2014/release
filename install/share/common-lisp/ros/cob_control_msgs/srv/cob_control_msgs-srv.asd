
(cl:in-package :asdf)

(defsystem "cob_control_msgs-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils )
  :components ((:file "_package")
    (:file "GetObstacleDistance" :depends-on ("_package_GetObstacleDistance"))
    (:file "_package_GetObstacleDistance" :depends-on ("_package"))
  ))