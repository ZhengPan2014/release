
(cl:in-package :asdf)

(defsystem "cob_camera_sensors-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :sensor_msgs-msg
)
  :components ((:file "_package")
    (:file "GetTOFImages" :depends-on ("_package_GetTOFImages"))
    (:file "_package_GetTOFImages" :depends-on ("_package"))
    (:file "AcquireCalibrationImages" :depends-on ("_package_AcquireCalibrationImages"))
    (:file "_package_AcquireCalibrationImages" :depends-on ("_package"))
  ))