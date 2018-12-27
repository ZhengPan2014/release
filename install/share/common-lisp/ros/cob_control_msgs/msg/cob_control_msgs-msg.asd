
(cl:in-package :asdf)

(defsystem "cob_control_msgs-msg"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :geometry_msgs-msg
               :std_msgs-msg
)
  :components ((:file "_package")
    (:file "ObstacleDistance" :depends-on ("_package_ObstacleDistance"))
    (:file "_package_ObstacleDistance" :depends-on ("_package"))
    (:file "ObstacleDistances" :depends-on ("_package_ObstacleDistances"))
    (:file "_package_ObstacleDistances" :depends-on ("_package"))
  ))