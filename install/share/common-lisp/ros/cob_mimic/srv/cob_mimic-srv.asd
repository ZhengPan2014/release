
(cl:in-package :asdf)

(defsystem "cob_mimic-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils )
  :components ((:file "_package")
    (:file "SetMimic" :depends-on ("_package_SetMimic"))
    (:file "_package_SetMimic" :depends-on ("_package"))
  ))