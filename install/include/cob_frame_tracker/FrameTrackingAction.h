// Generated by gencpp from file cob_frame_tracker/FrameTrackingAction.msg
// DO NOT EDIT!


#ifndef COB_FRAME_TRACKER_MESSAGE_FRAMETRACKINGACTION_H
#define COB_FRAME_TRACKER_MESSAGE_FRAMETRACKINGACTION_H


#include <string>
#include <vector>
#include <map>

#include <ros/types.h>
#include <ros/serialization.h>
#include <ros/builtin_message_traits.h>
#include <ros/message_operations.h>

#include <cob_frame_tracker/FrameTrackingActionGoal.h>
#include <cob_frame_tracker/FrameTrackingActionResult.h>
#include <cob_frame_tracker/FrameTrackingActionFeedback.h>

namespace cob_frame_tracker
{
template <class ContainerAllocator>
struct FrameTrackingAction_
{
  typedef FrameTrackingAction_<ContainerAllocator> Type;

  FrameTrackingAction_()
    : action_goal()
    , action_result()
    , action_feedback()  {
    }
  FrameTrackingAction_(const ContainerAllocator& _alloc)
    : action_goal(_alloc)
    , action_result(_alloc)
    , action_feedback(_alloc)  {
  (void)_alloc;
    }



   typedef  ::cob_frame_tracker::FrameTrackingActionGoal_<ContainerAllocator>  _action_goal_type;
  _action_goal_type action_goal;

   typedef  ::cob_frame_tracker::FrameTrackingActionResult_<ContainerAllocator>  _action_result_type;
  _action_result_type action_result;

   typedef  ::cob_frame_tracker::FrameTrackingActionFeedback_<ContainerAllocator>  _action_feedback_type;
  _action_feedback_type action_feedback;




  typedef boost::shared_ptr< ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator> > Ptr;
  typedef boost::shared_ptr< ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator> const> ConstPtr;

}; // struct FrameTrackingAction_

typedef ::cob_frame_tracker::FrameTrackingAction_<std::allocator<void> > FrameTrackingAction;

typedef boost::shared_ptr< ::cob_frame_tracker::FrameTrackingAction > FrameTrackingActionPtr;
typedef boost::shared_ptr< ::cob_frame_tracker::FrameTrackingAction const> FrameTrackingActionConstPtr;

// constants requiring out of line definition



template<typename ContainerAllocator>
std::ostream& operator<<(std::ostream& s, const ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator> & v)
{
ros::message_operations::Printer< ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator> >::stream(s, "", v);
return s;
}

} // namespace cob_frame_tracker

namespace ros
{
namespace message_traits
{



// BOOLTRAITS {'IsFixedSize': False, 'IsMessage': True, 'HasHeader': False}
// {'geometry_msgs': ['/opt/ros/indigo/share/geometry_msgs/cmake/../msg'], 'actionlib_msgs': ['/opt/ros/indigo/share/actionlib_msgs/cmake/../msg'], 'std_msgs': ['/opt/ros/indigo/share/std_msgs/cmake/../msg'], 'cob_frame_tracker': ['/home/ouiyeah/catkin_ws/devel/share/cob_frame_tracker/msg']}

// !!!!!!!!!!! ['__class__', '__delattr__', '__dict__', '__doc__', '__eq__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_parsed_fields', 'constants', 'fields', 'full_name', 'has_header', 'header_present', 'names', 'package', 'parsed_fields', 'short_name', 'text', 'types']




template <class ContainerAllocator>
struct IsFixedSize< ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator> const>
  : FalseType
  { };

template <class ContainerAllocator>
struct IsMessage< ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct HasHeader< ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct HasHeader< ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator> const>
  : FalseType
  { };


template<class ContainerAllocator>
struct MD5Sum< ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator> >
{
  static const char* value()
  {
    return "16582ddc5d15eb6f94e19f890cd956ff";
  }

  static const char* value(const ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator>&) { return value(); }
  static const uint64_t static_value1 = 0x16582ddc5d15eb6fULL;
  static const uint64_t static_value2 = 0x94e19f890cd956ffULL;
};

template<class ContainerAllocator>
struct DataType< ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator> >
{
  static const char* value()
  {
    return "cob_frame_tracker/FrameTrackingAction";
  }

  static const char* value(const ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator>&) { return value(); }
};

template<class ContainerAllocator>
struct Definition< ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator> >
{
  static const char* value()
  {
    return "# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======\n\
\n\
FrameTrackingActionGoal action_goal\n\
FrameTrackingActionResult action_result\n\
FrameTrackingActionFeedback action_feedback\n\
\n\
================================================================================\n\
MSG: cob_frame_tracker/FrameTrackingActionGoal\n\
# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======\n\
\n\
Header header\n\
actionlib_msgs/GoalID goal_id\n\
FrameTrackingGoal goal\n\
\n\
================================================================================\n\
MSG: std_msgs/Header\n\
# Standard metadata for higher-level stamped data types.\n\
# This is generally used to communicate timestamped data \n\
# in a particular coordinate frame.\n\
# \n\
# sequence ID: consecutively increasing ID \n\
uint32 seq\n\
#Two-integer timestamp that is expressed as:\n\
# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')\n\
# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')\n\
# time-handling sugar is provided by the client library\n\
time stamp\n\
#Frame this data is associated with\n\
# 0: no frame\n\
# 1: global frame\n\
string frame_id\n\
\n\
================================================================================\n\
MSG: actionlib_msgs/GoalID\n\
# The stamp should store the time at which this goal was requested.\n\
# It is used by an action server when it tries to preempt all\n\
# goals that were requested before a certain time\n\
time stamp\n\
\n\
# The id provides a way to associate feedback and\n\
# result message with specific goal requests. The id\n\
# specified must be unique.\n\
string id\n\
\n\
\n\
================================================================================\n\
MSG: cob_frame_tracker/FrameTrackingGoal\n\
# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======\n\
## goal definition\n\
\n\
# frame to track\n\
string tracking_frame\n\
\n\
# max time to track\n\
float64 tracking_duration\n\
\n\
# stop tracking when goal is reached?\n\
bool stop_on_goal\n\
\n\
\n\
================================================================================\n\
MSG: cob_frame_tracker/FrameTrackingActionResult\n\
# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======\n\
\n\
Header header\n\
actionlib_msgs/GoalStatus status\n\
FrameTrackingResult result\n\
\n\
================================================================================\n\
MSG: actionlib_msgs/GoalStatus\n\
GoalID goal_id\n\
uint8 status\n\
uint8 PENDING         = 0   # The goal has yet to be processed by the action server\n\
uint8 ACTIVE          = 1   # The goal is currently being processed by the action server\n\
uint8 PREEMPTED       = 2   # The goal received a cancel request after it started executing\n\
                            #   and has since completed its execution (Terminal State)\n\
uint8 SUCCEEDED       = 3   # The goal was achieved successfully by the action server (Terminal State)\n\
uint8 ABORTED         = 4   # The goal was aborted during execution by the action server due\n\
                            #    to some failure (Terminal State)\n\
uint8 REJECTED        = 5   # The goal was rejected by the action server without being processed,\n\
                            #    because the goal was unattainable or invalid (Terminal State)\n\
uint8 PREEMPTING      = 6   # The goal received a cancel request after it started executing\n\
                            #    and has not yet completed execution\n\
uint8 RECALLING       = 7   # The goal received a cancel request before it started executing,\n\
                            #    but the action server has not yet confirmed that the goal is canceled\n\
uint8 RECALLED        = 8   # The goal received a cancel request before it started executing\n\
                            #    and was successfully cancelled (Terminal State)\n\
uint8 LOST            = 9   # An action client can determine that a goal is LOST. This should not be\n\
                            #    sent over the wire by an action server\n\
\n\
#Allow for the user to associate a string with GoalStatus for debugging\n\
string text\n\
\n\
\n\
================================================================================\n\
MSG: cob_frame_tracker/FrameTrackingResult\n\
# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======\n\
\n\
# result definition\n\
bool success\n\
string message\n\
\n\
\n\
================================================================================\n\
MSG: cob_frame_tracker/FrameTrackingActionFeedback\n\
# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======\n\
\n\
Header header\n\
actionlib_msgs/GoalStatus status\n\
FrameTrackingFeedback feedback\n\
\n\
================================================================================\n\
MSG: cob_frame_tracker/FrameTrackingFeedback\n\
# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======\n\
\n\
# feedback definition\n\
geometry_msgs/Twist twist\n\
float64 distance\n\
\n\
\n\
================================================================================\n\
MSG: geometry_msgs/Twist\n\
# This expresses velocity in free space broken into its linear and angular parts.\n\
Vector3  linear\n\
Vector3  angular\n\
\n\
================================================================================\n\
MSG: geometry_msgs/Vector3\n\
# This represents a vector in free space. \n\
# It is only meant to represent a direction. Therefore, it does not\n\
# make sense to apply a translation to it (e.g., when applying a \n\
# generic rigid transformation to a Vector3, tf2 will only apply the\n\
# rotation). If you want your data to be translatable too, use the\n\
# geometry_msgs/Point message instead.\n\
\n\
float64 x\n\
float64 y\n\
float64 z\n\
";
  }

  static const char* value(const ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator>&) { return value(); }
};

} // namespace message_traits
} // namespace ros

namespace ros
{
namespace serialization
{

  template<class ContainerAllocator> struct Serializer< ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator> >
  {
    template<typename Stream, typename T> inline static void allInOne(Stream& stream, T m)
    {
      stream.next(m.action_goal);
      stream.next(m.action_result);
      stream.next(m.action_feedback);
    }

    ROS_DECLARE_ALLINONE_SERIALIZER
  }; // struct FrameTrackingAction_

} // namespace serialization
} // namespace ros

namespace ros
{
namespace message_operations
{

template<class ContainerAllocator>
struct Printer< ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator> >
{
  template<typename Stream> static void stream(Stream& s, const std::string& indent, const ::cob_frame_tracker::FrameTrackingAction_<ContainerAllocator>& v)
  {
    s << indent << "action_goal: ";
    s << std::endl;
    Printer< ::cob_frame_tracker::FrameTrackingActionGoal_<ContainerAllocator> >::stream(s, indent + "  ", v.action_goal);
    s << indent << "action_result: ";
    s << std::endl;
    Printer< ::cob_frame_tracker::FrameTrackingActionResult_<ContainerAllocator> >::stream(s, indent + "  ", v.action_result);
    s << indent << "action_feedback: ";
    s << std::endl;
    Printer< ::cob_frame_tracker::FrameTrackingActionFeedback_<ContainerAllocator> >::stream(s, indent + "  ", v.action_feedback);
  }
};

} // namespace message_operations
} // namespace ros

#endif // COB_FRAME_TRACKER_MESSAGE_FRAMETRACKINGACTION_H
