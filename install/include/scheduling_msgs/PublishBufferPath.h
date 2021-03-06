// Generated by gencpp from file scheduling_msgs/PublishBufferPath.msg
// DO NOT EDIT!


#ifndef SCHEDULING_MSGS_MESSAGE_PUBLISHBUFFERPATH_H
#define SCHEDULING_MSGS_MESSAGE_PUBLISHBUFFERPATH_H

#include <ros/service_traits.h>


#include <scheduling_msgs/PublishBufferPathRequest.h>
#include <scheduling_msgs/PublishBufferPathResponse.h>


namespace scheduling_msgs
{

struct PublishBufferPath
{

typedef PublishBufferPathRequest Request;
typedef PublishBufferPathResponse Response;
Request request;
Response response;

typedef Request RequestType;
typedef Response ResponseType;

}; // struct PublishBufferPath
} // namespace scheduling_msgs


namespace ros
{
namespace service_traits
{


template<>
struct MD5Sum< ::scheduling_msgs::PublishBufferPath > {
  static const char* value()
  {
    return "dc3812d2f9bd7e262d95135164970230";
  }

  static const char* value(const ::scheduling_msgs::PublishBufferPath&) { return value(); }
};

template<>
struct DataType< ::scheduling_msgs::PublishBufferPath > {
  static const char* value()
  {
    return "scheduling_msgs/PublishBufferPath";
  }

  static const char* value(const ::scheduling_msgs::PublishBufferPath&) { return value(); }
};


// service_traits::MD5Sum< ::scheduling_msgs::PublishBufferPathRequest> should match 
// service_traits::MD5Sum< ::scheduling_msgs::PublishBufferPath > 
template<>
struct MD5Sum< ::scheduling_msgs::PublishBufferPathRequest>
{
  static const char* value()
  {
    return MD5Sum< ::scheduling_msgs::PublishBufferPath >::value();
  }
  static const char* value(const ::scheduling_msgs::PublishBufferPathRequest&)
  {
    return value();
  }
};

// service_traits::DataType< ::scheduling_msgs::PublishBufferPathRequest> should match 
// service_traits::DataType< ::scheduling_msgs::PublishBufferPath > 
template<>
struct DataType< ::scheduling_msgs::PublishBufferPathRequest>
{
  static const char* value()
  {
    return DataType< ::scheduling_msgs::PublishBufferPath >::value();
  }
  static const char* value(const ::scheduling_msgs::PublishBufferPathRequest&)
  {
    return value();
  }
};

// service_traits::MD5Sum< ::scheduling_msgs::PublishBufferPathResponse> should match 
// service_traits::MD5Sum< ::scheduling_msgs::PublishBufferPath > 
template<>
struct MD5Sum< ::scheduling_msgs::PublishBufferPathResponse>
{
  static const char* value()
  {
    return MD5Sum< ::scheduling_msgs::PublishBufferPath >::value();
  }
  static const char* value(const ::scheduling_msgs::PublishBufferPathResponse&)
  {
    return value();
  }
};

// service_traits::DataType< ::scheduling_msgs::PublishBufferPathResponse> should match 
// service_traits::DataType< ::scheduling_msgs::PublishBufferPath > 
template<>
struct DataType< ::scheduling_msgs::PublishBufferPathResponse>
{
  static const char* value()
  {
    return DataType< ::scheduling_msgs::PublishBufferPath >::value();
  }
  static const char* value(const ::scheduling_msgs::PublishBufferPathResponse&)
  {
    return value();
  }
};

} // namespace service_traits
} // namespace ros

#endif // SCHEDULING_MSGS_MESSAGE_PUBLISHBUFFERPATH_H
