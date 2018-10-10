
(cl:in-package :asdf)

(defsystem "cob_mimic-msg"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :actionlib_msgs-msg
               :std_msgs-msg
)
  :components ((:file "_package")
    (:file "SetMimicGoal" :depends-on ("_package_SetMimicGoal"))
    (:file "_package_SetMimicGoal" :depends-on ("_package"))
    (:file "SetMimicActionGoal" :depends-on ("_package_SetMimicActionGoal"))
    (:file "_package_SetMimicActionGoal" :depends-on ("_package"))
    (:file "SetMimicActionResult" :depends-on ("_package_SetMimicActionResult"))
    (:file "_package_SetMimicActionResult" :depends-on ("_package"))
    (:file "SetMimicAction" :depends-on ("_package_SetMimicAction"))
    (:file "_package_SetMimicAction" :depends-on ("_package"))
    (:file "SetMimicResult" :depends-on ("_package_SetMimicResult"))
    (:file "_package_SetMimicResult" :depends-on ("_package"))
    (:file "SetMimicActionFeedback" :depends-on ("_package_SetMimicActionFeedback"))
    (:file "_package_SetMimicActionFeedback" :depends-on ("_package"))
    (:file "SetMimicFeedback" :depends-on ("_package_SetMimicFeedback"))
    (:file "_package_SetMimicFeedback" :depends-on ("_package"))
  ))