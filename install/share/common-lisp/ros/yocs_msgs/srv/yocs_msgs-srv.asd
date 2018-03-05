
(cl:in-package :asdf)

(defsystem "yocs_msgs-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :geometry_msgs-msg
               :yocs_msgs-msg
)
  :components ((:file "_package")
    (:file "DbparamControl" :depends-on ("_package_DbparamControl"))
    (:file "_package_DbparamControl" :depends-on ("_package"))
    (:file "WaypointListService" :depends-on ("_package_WaypointListService"))
    (:file "_package_WaypointListService" :depends-on ("_package"))
    (:file "VirtualObstacles" :depends-on ("_package_VirtualObstacles"))
    (:file "_package_VirtualObstacles" :depends-on ("_package"))
    (:file "NavgationCtrlService" :depends-on ("_package_NavgationCtrlService"))
    (:file "_package_NavgationCtrlService" :depends-on ("_package"))
  ))