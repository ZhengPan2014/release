
(cl:in-package :asdf)

(defsystem "task_manager-msg"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :std_msgs-msg
)
  :components ((:file "_package")
    (:file "TaskControlStatus" :depends-on ("_package_TaskControlStatus"))
    (:file "_package_TaskControlStatus" :depends-on ("_package"))
    (:file "TaskControl" :depends-on ("_package_TaskControl"))
    (:file "_package_TaskControl" :depends-on ("_package"))
    (:file "Task" :depends-on ("_package_Task"))
    (:file "_package_Task" :depends-on ("_package"))
    (:file "TaskList" :depends-on ("_package_TaskList"))
    (:file "_package_TaskList" :depends-on ("_package"))
  ))