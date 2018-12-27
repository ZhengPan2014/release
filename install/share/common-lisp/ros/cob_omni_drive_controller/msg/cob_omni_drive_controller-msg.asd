
(cl:in-package :asdf)

(defsystem "cob_omni_drive_controller-msg"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :std_msgs-msg
)
  :components ((:file "_package")
    (:file "WheelCommands" :depends-on ("_package_WheelCommands"))
    (:file "_package_WheelCommands" :depends-on ("_package"))
  ))