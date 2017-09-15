
(cl:in-package :asdf)

(defsystem "scheduling_msgs-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils )
  :components ((:file "_package")
    (:file "register_agv" :depends-on ("_package_register_agv"))
    (:file "_package_register_agv" :depends-on ("_package"))
  ))