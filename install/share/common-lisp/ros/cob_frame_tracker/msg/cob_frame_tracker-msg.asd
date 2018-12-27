
(cl:in-package :asdf)

(defsystem "cob_frame_tracker-msg"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :actionlib_msgs-msg
               :geometry_msgs-msg
               :std_msgs-msg
)
  :components ((:file "_package")
    (:file "FrameTrackingResult" :depends-on ("_package_FrameTrackingResult"))
    (:file "_package_FrameTrackingResult" :depends-on ("_package"))
    (:file "FrameTrackingGoal" :depends-on ("_package_FrameTrackingGoal"))
    (:file "_package_FrameTrackingGoal" :depends-on ("_package"))
    (:file "FrameTrackingActionGoal" :depends-on ("_package_FrameTrackingActionGoal"))
    (:file "_package_FrameTrackingActionGoal" :depends-on ("_package"))
    (:file "FrameTrackingActionResult" :depends-on ("_package_FrameTrackingActionResult"))
    (:file "_package_FrameTrackingActionResult" :depends-on ("_package"))
    (:file "FrameTrackingActionFeedback" :depends-on ("_package_FrameTrackingActionFeedback"))
    (:file "_package_FrameTrackingActionFeedback" :depends-on ("_package"))
    (:file "FrameTrackingAction" :depends-on ("_package_FrameTrackingAction"))
    (:file "_package_FrameTrackingAction" :depends-on ("_package"))
    (:file "FrameTrackingFeedback" :depends-on ("_package_FrameTrackingFeedback"))
    (:file "_package_FrameTrackingFeedback" :depends-on ("_package"))
  ))