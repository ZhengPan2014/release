// Generated by gencpp from file cob_light/ColorRGBAArray.msg
// DO NOT EDIT!


#ifndef COB_LIGHT_MESSAGE_COLORRGBAARRAY_H
#define COB_LIGHT_MESSAGE_COLORRGBAARRAY_H


#include <string>
#include <vector>
#include <map>

#include <ros/types.h>
#include <ros/serialization.h>
#include <ros/builtin_message_traits.h>
#include <ros/message_operations.h>

#include <std_msgs/ColorRGBA.h>

namespace cob_light
{
template <class ContainerAllocator>
struct ColorRGBAArray_
{
  typedef ColorRGBAArray_<ContainerAllocator> Type;

  ColorRGBAArray_()
    : colors()  {
    }
  ColorRGBAArray_(const ContainerAllocator& _alloc)
    : colors(_alloc)  {
  (void)_alloc;
    }



   typedef std::vector< ::std_msgs::ColorRGBA_<ContainerAllocator> , typename ContainerAllocator::template rebind< ::std_msgs::ColorRGBA_<ContainerAllocator> >::other >  _colors_type;
  _colors_type colors;




  typedef boost::shared_ptr< ::cob_light::ColorRGBAArray_<ContainerAllocator> > Ptr;
  typedef boost::shared_ptr< ::cob_light::ColorRGBAArray_<ContainerAllocator> const> ConstPtr;

}; // struct ColorRGBAArray_

typedef ::cob_light::ColorRGBAArray_<std::allocator<void> > ColorRGBAArray;

typedef boost::shared_ptr< ::cob_light::ColorRGBAArray > ColorRGBAArrayPtr;
typedef boost::shared_ptr< ::cob_light::ColorRGBAArray const> ColorRGBAArrayConstPtr;

// constants requiring out of line definition



template<typename ContainerAllocator>
std::ostream& operator<<(std::ostream& s, const ::cob_light::ColorRGBAArray_<ContainerAllocator> & v)
{
ros::message_operations::Printer< ::cob_light::ColorRGBAArray_<ContainerAllocator> >::stream(s, "", v);
return s;
}

} // namespace cob_light

namespace ros
{
namespace message_traits
{



// BOOLTRAITS {'IsFixedSize': False, 'IsMessage': True, 'HasHeader': False}
// {'sensor_msgs': ['/opt/ros/indigo/share/sensor_msgs/cmake/../msg'], 'std_msgs': ['/opt/ros/indigo/share/std_msgs/cmake/../msg'], 'actionlib_msgs': ['/opt/ros/indigo/share/actionlib_msgs/cmake/../msg'], 'cob_light': ['/home/ouiyeah/catkin_ws/src/cob_driver/cob_light/msg', '/home/ouiyeah/catkin_ws/devel/share/cob_light/msg'], 'geometry_msgs': ['/opt/ros/indigo/share/geometry_msgs/cmake/../msg']}

// !!!!!!!!!!! ['__class__', '__delattr__', '__dict__', '__doc__', '__eq__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_parsed_fields', 'constants', 'fields', 'full_name', 'has_header', 'header_present', 'names', 'package', 'parsed_fields', 'short_name', 'text', 'types']




template <class ContainerAllocator>
struct IsFixedSize< ::cob_light::ColorRGBAArray_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::cob_light::ColorRGBAArray_<ContainerAllocator> const>
  : FalseType
  { };

template <class ContainerAllocator>
struct IsMessage< ::cob_light::ColorRGBAArray_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::cob_light::ColorRGBAArray_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct HasHeader< ::cob_light::ColorRGBAArray_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct HasHeader< ::cob_light::ColorRGBAArray_<ContainerAllocator> const>
  : FalseType
  { };


template<class ContainerAllocator>
struct MD5Sum< ::cob_light::ColorRGBAArray_<ContainerAllocator> >
{
  static const char* value()
  {
    return "8a8aae411a07648ba08dd6bedf519336";
  }

  static const char* value(const ::cob_light::ColorRGBAArray_<ContainerAllocator>&) { return value(); }
  static const uint64_t static_value1 = 0x8a8aae411a07648bULL;
  static const uint64_t static_value2 = 0xa08dd6bedf519336ULL;
};

template<class ContainerAllocator>
struct DataType< ::cob_light::ColorRGBAArray_<ContainerAllocator> >
{
  static const char* value()
  {
    return "cob_light/ColorRGBAArray";
  }

  static const char* value(const ::cob_light::ColorRGBAArray_<ContainerAllocator>&) { return value(); }
};

template<class ContainerAllocator>
struct Definition< ::cob_light::ColorRGBAArray_<ContainerAllocator> >
{
  static const char* value()
  {
    return "std_msgs/ColorRGBA[] colors\n\
\n\
================================================================================\n\
MSG: std_msgs/ColorRGBA\n\
float32 r\n\
float32 g\n\
float32 b\n\
float32 a\n\
";
  }

  static const char* value(const ::cob_light::ColorRGBAArray_<ContainerAllocator>&) { return value(); }
};

} // namespace message_traits
} // namespace ros

namespace ros
{
namespace serialization
{

  template<class ContainerAllocator> struct Serializer< ::cob_light::ColorRGBAArray_<ContainerAllocator> >
  {
    template<typename Stream, typename T> inline static void allInOne(Stream& stream, T m)
    {
      stream.next(m.colors);
    }

    ROS_DECLARE_ALLINONE_SERIALIZER
  }; // struct ColorRGBAArray_

} // namespace serialization
} // namespace ros

namespace ros
{
namespace message_operations
{

template<class ContainerAllocator>
struct Printer< ::cob_light::ColorRGBAArray_<ContainerAllocator> >
{
  template<typename Stream> static void stream(Stream& s, const std::string& indent, const ::cob_light::ColorRGBAArray_<ContainerAllocator>& v)
  {
    s << indent << "colors[]" << std::endl;
    for (size_t i = 0; i < v.colors.size(); ++i)
    {
      s << indent << "  colors[" << i << "]: ";
      s << std::endl;
      s << indent;
      Printer< ::std_msgs::ColorRGBA_<ContainerAllocator> >::stream(s, indent + "    ", v.colors[i]);
    }
  }
};

} // namespace message_operations
} // namespace ros

#endif // COB_LIGHT_MESSAGE_COLORRGBAARRAY_H