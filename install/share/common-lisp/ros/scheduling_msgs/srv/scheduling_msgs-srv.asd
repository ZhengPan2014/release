
(cl:in-package :asdf)

(defsystem "scheduling_msgs-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :geometry_msgs-msg
               :std_msgs-msg
)
  :components ((:file "_package")
    (:file "CancelPath" :depends-on ("_package_CancelPath"))
    (:file "_package_CancelPath" :depends-on ("_package"))
    (:file "TaskQueryPath" :depends-on ("_package_TaskQueryPath"))
    (:file "_package_TaskQueryPath" :depends-on ("_package"))
    (:file "register_agv" :depends-on ("_package_register_agv"))
    (:file "_package_register_agv" :depends-on ("_package"))
    (:file "PublishBufferPath" :depends-on ("_package_PublishBufferPath"))
    (:file "_package_PublishBufferPath" :depends-on ("_package"))
    (:file "QueryAGVPose" :depends-on ("_package_QueryAGVPose"))
    (:file "_package_QueryAGVPose" :depends-on ("_package"))
  ))