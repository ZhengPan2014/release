// Generated by gencpp from file pallet_recognition/DetectPallet.msg
// DO NOT EDIT!


#ifndef PALLET_RECOGNITION_MESSAGE_DETECTPALLET_H
#define PALLET_RECOGNITION_MESSAGE_DETECTPALLET_H

#include <ros/service_traits.h>


#include <pallet_recognition/DetectPalletRequest.h>
#include <pallet_recognition/DetectPalletResponse.h>


namespace pallet_recognition
{

struct DetectPallet
{

typedef DetectPalletRequest Request;
typedef DetectPalletResponse Response;
Request request;
Response response;

typedef Request RequestType;
typedef Response ResponseType;

}; // struct DetectPallet
} // namespace pallet_recognition


namespace ros
{
namespace service_traits
{


template<>
struct MD5Sum< ::pallet_recognition::DetectPallet > {
  static const char* value()
  {
    return "be52264672531f790ba66789a9749d0c";
  }

  static const char* value(const ::pallet_recognition::DetectPallet&) { return value(); }
};

template<>
struct DataType< ::pallet_recognition::DetectPallet > {
  static const char* value()
  {
    return "pallet_recognition/DetectPallet";
  }

  static const char* value(const ::pallet_recognition::DetectPallet&) { return value(); }
};


// service_traits::MD5Sum< ::pallet_recognition::DetectPalletRequest> should match 
// service_traits::MD5Sum< ::pallet_recognition::DetectPallet > 
template<>
struct MD5Sum< ::pallet_recognition::DetectPalletRequest>
{
  static const char* value()
  {
    return MD5Sum< ::pallet_recognition::DetectPallet >::value();
  }
  static const char* value(const ::pallet_recognition::DetectPalletRequest&)
  {
    return value();
  }
};

// service_traits::DataType< ::pallet_recognition::DetectPalletRequest> should match 
// service_traits::DataType< ::pallet_recognition::DetectPallet > 
template<>
struct DataType< ::pallet_recognition::DetectPalletRequest>
{
  static const char* value()
  {
    return DataType< ::pallet_recognition::DetectPallet >::value();
  }
  static const char* value(const ::pallet_recognition::DetectPalletRequest&)
  {
    return value();
  }
};

// service_traits::MD5Sum< ::pallet_recognition::DetectPalletResponse> should match 
// service_traits::MD5Sum< ::pallet_recognition::DetectPallet > 
template<>
struct MD5Sum< ::pallet_recognition::DetectPalletResponse>
{
  static const char* value()
  {
    return MD5Sum< ::pallet_recognition::DetectPallet >::value();
  }
  static const char* value(const ::pallet_recognition::DetectPalletResponse&)
  {
    return value();
  }
};

// service_traits::DataType< ::pallet_recognition::DetectPalletResponse> should match 
// service_traits::DataType< ::pallet_recognition::DetectPallet > 
template<>
struct DataType< ::pallet_recognition::DetectPalletResponse>
{
  static const char* value()
  {
    return DataType< ::pallet_recognition::DetectPallet >::value();
  }
  static const char* value(const ::pallet_recognition::DetectPalletResponse&)
  {
    return value();
  }
};

} // namespace service_traits
} // namespace ros

#endif // PALLET_RECOGNITION_MESSAGE_DETECTPALLET_H