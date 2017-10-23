
(cl:in-package :asdf)

(defsystem "scheduling_msgs-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :geometry_msgs-msg
               :scheduling_msgs-msg
               :std_msgs-msg
)
  :components ((:file "_package")
    (:file "SetRoadSet" :depends-on ("_package_SetRoadSet"))
    (:file "_package_SetRoadSet" :depends-on ("_package"))
    (:file "ClearOccupiedRoad" :depends-on ("_package_ClearOccupiedRoad"))
    (:file "_package_ClearOccupiedRoad" :depends-on ("_package"))
    (:file "CreateNewForkliftTask" :depends-on ("_package_CreateNewForkliftTask"))
    (:file "_package_CreateNewForkliftTask" :depends-on ("_package"))
    (:file "CreateNewTask" :depends-on ("_package_CreateNewTask"))
    (:file "_package_CreateNewTask" :depends-on ("_package"))
    (:file "CancelPath" :depends-on ("_package_CancelPath"))
    (:file "_package_CancelPath" :depends-on ("_package"))
    (:file "TaskQueryPath" :depends-on ("_package_TaskQueryPath"))
    (:file "_package_TaskQueryPath" :depends-on ("_package"))
    (:file "AddOrModifyForkliftTask" :depends-on ("_package_AddOrModifyForkliftTask"))
    (:file "_package_AddOrModifyForkliftTask" :depends-on ("_package"))
    (:file "QueryTaskStatus2" :depends-on ("_package_QueryTaskStatus2"))
    (:file "_package_QueryTaskStatus2" :depends-on ("_package"))
    (:file "register_agv" :depends-on ("_package_register_agv"))
    (:file "_package_register_agv" :depends-on ("_package"))
    (:file "PublishBufferPath" :depends-on ("_package_PublishBufferPath"))
    (:file "_package_PublishBufferPath" :depends-on ("_package"))
    (:file "QueryAGVPose" :depends-on ("_package_QueryAGVPose"))
    (:file "_package_QueryAGVPose" :depends-on ("_package"))
  ))