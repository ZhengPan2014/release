
(cl:in-package :asdf)

(defsystem "scheduling_msgs-msg"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :geometry_msgs-msg
               :std_msgs-msg
)
  :components ((:file "_package")
    (:file "Path" :depends-on ("_package_Path"))
    (:file "_package_Path" :depends-on ("_package"))
    (:file "PathWithID" :depends-on ("_package_PathWithID"))
    (:file "_package_PathWithID" :depends-on ("_package"))
  ))