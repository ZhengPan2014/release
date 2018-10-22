# This Python file uses the following encoding: utf-8
"""autogenerated by genpy from cartographer_ros_msgs/SubmapQueryRequest.msg. Do not edit."""
import sys
python3 = True if sys.hexversion > 0x03000000 else False
import genpy
import struct


class SubmapQueryRequest(genpy.Message):
  _md5sum = "5fc429a478a6d73822616720a31a2158"
  _type = "cartographer_ros_msgs/SubmapQueryRequest"
  _has_header = False #flag to mark the presence of a Header object
  _full_text = """













int32 trajectory_id
int32 submap_index
"""
  __slots__ = ['trajectory_id','submap_index']
  _slot_types = ['int32','int32']

  def __init__(self, *args, **kwds):
    """
    Constructor. Any message fields that are implicitly/explicitly
    set to None will be assigned a default value. The recommend
    use is keyword arguments as this is more robust to future message
    changes.  You cannot mix in-order arguments and keyword arguments.

    The available fields are:
       trajectory_id,submap_index

    :param args: complete set of field values, in .msg order
    :param kwds: use keyword arguments corresponding to message field names
    to set specific fields.
    """
    if args or kwds:
      super(SubmapQueryRequest, self).__init__(*args, **kwds)
      #message fields cannot be None, assign default values for those that are
      if self.trajectory_id is None:
        self.trajectory_id = 0
      if self.submap_index is None:
        self.submap_index = 0
    else:
      self.trajectory_id = 0
      self.submap_index = 0

  def _get_types(self):
    """
    internal API method
    """
    return self._slot_types

  def serialize(self, buff):
    """
    serialize message into buffer
    :param buff: buffer, ``StringIO``
    """
    try:
      _x = self
      buff.write(_struct_2i.pack(_x.trajectory_id, _x.submap_index))
    except struct.error as se: self._check_types(struct.error("%s: '%s' when writing '%s'" % (type(se), str(se), str(locals().get('_x', self)))))
    except TypeError as te: self._check_types(ValueError("%s: '%s' when writing '%s'" % (type(te), str(te), str(locals().get('_x', self)))))

  def deserialize(self, str):
    """
    unpack serialized message in str into this message instance
    :param str: byte array of serialized message, ``str``
    """
    try:
      end = 0
      _x = self
      start = end
      end += 8
      (_x.trajectory_id, _x.submap_index,) = _struct_2i.unpack(str[start:end])
      return self
    except struct.error as e:
      raise genpy.DeserializationError(e) #most likely buffer underfill


  def serialize_numpy(self, buff, numpy):
    """
    serialize message with numpy array types into buffer
    :param buff: buffer, ``StringIO``
    :param numpy: numpy python module
    """
    try:
      _x = self
      buff.write(_struct_2i.pack(_x.trajectory_id, _x.submap_index))
    except struct.error as se: self._check_types(struct.error("%s: '%s' when writing '%s'" % (type(se), str(se), str(locals().get('_x', self)))))
    except TypeError as te: self._check_types(ValueError("%s: '%s' when writing '%s'" % (type(te), str(te), str(locals().get('_x', self)))))

  def deserialize_numpy(self, str, numpy):
    """
    unpack serialized message in str into this message instance using numpy for array types
    :param str: byte array of serialized message, ``str``
    :param numpy: numpy python module
    """
    try:
      end = 0
      _x = self
      start = end
      end += 8
      (_x.trajectory_id, _x.submap_index,) = _struct_2i.unpack(str[start:end])
      return self
    except struct.error as e:
      raise genpy.DeserializationError(e) #most likely buffer underfill

_struct_I = genpy.struct_I
_struct_2i = struct.Struct("<2i")
# This Python file uses the following encoding: utf-8
"""autogenerated by genpy from cartographer_ros_msgs/SubmapQueryResponse.msg. Do not edit."""
import sys
python3 = True if sys.hexversion > 0x03000000 else False
import genpy
import struct

import cartographer_ros_msgs.msg
import geometry_msgs.msg

class SubmapQueryResponse(genpy.Message):
  _md5sum = "ffc82c14b81fa551bc249c31ba402b2e"
  _type = "cartographer_ros_msgs/SubmapQueryResponse"
  _has_header = False #flag to mark the presence of a Header object
  _full_text = """cartographer_ros_msgs/StatusResponse status
int32 submap_version
cartographer_ros_msgs/SubmapTexture[] textures


================================================================================
MSG: cartographer_ros_msgs/StatusResponse
# Copyright 2018 The Cartographer Authors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# A common message type to indicate the outcome of a service call.
uint8 code
string message

================================================================================
MSG: cartographer_ros_msgs/SubmapTexture
# Copyright 2017 The Cartographer Authors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

uint8[] cells
int32 width
int32 height
float64 resolution
geometry_msgs/Pose slice_pose

================================================================================
MSG: geometry_msgs/Pose
# A representation of pose in free space, composed of postion and orientation. 
Point position
Quaternion orientation

================================================================================
MSG: geometry_msgs/Point
# This contains the position of a point in free space
float64 x
float64 y
float64 z

================================================================================
MSG: geometry_msgs/Quaternion
# This represents an orientation in free space in quaternion form.

float64 x
float64 y
float64 z
float64 w
"""
  __slots__ = ['status','submap_version','textures']
  _slot_types = ['cartographer_ros_msgs/StatusResponse','int32','cartographer_ros_msgs/SubmapTexture[]']

  def __init__(self, *args, **kwds):
    """
    Constructor. Any message fields that are implicitly/explicitly
    set to None will be assigned a default value. The recommend
    use is keyword arguments as this is more robust to future message
    changes.  You cannot mix in-order arguments and keyword arguments.

    The available fields are:
       status,submap_version,textures

    :param args: complete set of field values, in .msg order
    :param kwds: use keyword arguments corresponding to message field names
    to set specific fields.
    """
    if args or kwds:
      super(SubmapQueryResponse, self).__init__(*args, **kwds)
      #message fields cannot be None, assign default values for those that are
      if self.status is None:
        self.status = cartographer_ros_msgs.msg.StatusResponse()
      if self.submap_version is None:
        self.submap_version = 0
      if self.textures is None:
        self.textures = []
    else:
      self.status = cartographer_ros_msgs.msg.StatusResponse()
      self.submap_version = 0
      self.textures = []

  def _get_types(self):
    """
    internal API method
    """
    return self._slot_types

  def serialize(self, buff):
    """
    serialize message into buffer
    :param buff: buffer, ``StringIO``
    """
    try:
      buff.write(_struct_B.pack(self.status.code))
      _x = self.status.message
      length = len(_x)
      if python3 or type(_x) == unicode:
        _x = _x.encode('utf-8')
        length = len(_x)
      if python3:
        buff.write(struct.pack('<I%sB'%length, length, *_x))
      else:
        buff.write(struct.pack('<I%ss'%length, length, _x))
      buff.write(_struct_i.pack(self.submap_version))
      length = len(self.textures)
      buff.write(_struct_I.pack(length))
      for val1 in self.textures:
        _x = val1.cells
        length = len(_x)
        # - if encoded as a list instead, serialize as bytes instead of string
        if type(_x) in [list, tuple]:
          buff.write(struct.pack('<I%sB'%length, length, *_x))
        else:
          buff.write(struct.pack('<I%ss'%length, length, _x))
        _x = val1
        buff.write(_struct_2id.pack(_x.width, _x.height, _x.resolution))
        _v1 = val1.slice_pose
        _v2 = _v1.position
        _x = _v2
        buff.write(_struct_3d.pack(_x.x, _x.y, _x.z))
        _v3 = _v1.orientation
        _x = _v3
        buff.write(_struct_4d.pack(_x.x, _x.y, _x.z, _x.w))
    except struct.error as se: self._check_types(struct.error("%s: '%s' when writing '%s'" % (type(se), str(se), str(locals().get('_x', self)))))
    except TypeError as te: self._check_types(ValueError("%s: '%s' when writing '%s'" % (type(te), str(te), str(locals().get('_x', self)))))

  def deserialize(self, str):
    """
    unpack serialized message in str into this message instance
    :param str: byte array of serialized message, ``str``
    """
    try:
      if self.status is None:
        self.status = cartographer_ros_msgs.msg.StatusResponse()
      if self.textures is None:
        self.textures = None
      end = 0
      start = end
      end += 1
      (self.status.code,) = _struct_B.unpack(str[start:end])
      start = end
      end += 4
      (length,) = _struct_I.unpack(str[start:end])
      start = end
      end += length
      if python3:
        self.status.message = str[start:end].decode('utf-8')
      else:
        self.status.message = str[start:end]
      start = end
      end += 4
      (self.submap_version,) = _struct_i.unpack(str[start:end])
      start = end
      end += 4
      (length,) = _struct_I.unpack(str[start:end])
      self.textures = []
      for i in range(0, length):
        val1 = cartographer_ros_msgs.msg.SubmapTexture()
        start = end
        end += 4
        (length,) = _struct_I.unpack(str[start:end])
        start = end
        end += length
        val1.cells = str[start:end]
        _x = val1
        start = end
        end += 16
        (_x.width, _x.height, _x.resolution,) = _struct_2id.unpack(str[start:end])
        _v4 = val1.slice_pose
        _v5 = _v4.position
        _x = _v5
        start = end
        end += 24
        (_x.x, _x.y, _x.z,) = _struct_3d.unpack(str[start:end])
        _v6 = _v4.orientation
        _x = _v6
        start = end
        end += 32
        (_x.x, _x.y, _x.z, _x.w,) = _struct_4d.unpack(str[start:end])
        self.textures.append(val1)
      return self
    except struct.error as e:
      raise genpy.DeserializationError(e) #most likely buffer underfill


  def serialize_numpy(self, buff, numpy):
    """
    serialize message with numpy array types into buffer
    :param buff: buffer, ``StringIO``
    :param numpy: numpy python module
    """
    try:
      buff.write(_struct_B.pack(self.status.code))
      _x = self.status.message
      length = len(_x)
      if python3 or type(_x) == unicode:
        _x = _x.encode('utf-8')
        length = len(_x)
      if python3:
        buff.write(struct.pack('<I%sB'%length, length, *_x))
      else:
        buff.write(struct.pack('<I%ss'%length, length, _x))
      buff.write(_struct_i.pack(self.submap_version))
      length = len(self.textures)
      buff.write(_struct_I.pack(length))
      for val1 in self.textures:
        _x = val1.cells
        length = len(_x)
        # - if encoded as a list instead, serialize as bytes instead of string
        if type(_x) in [list, tuple]:
          buff.write(struct.pack('<I%sB'%length, length, *_x))
        else:
          buff.write(struct.pack('<I%ss'%length, length, _x))
        _x = val1
        buff.write(_struct_2id.pack(_x.width, _x.height, _x.resolution))
        _v7 = val1.slice_pose
        _v8 = _v7.position
        _x = _v8
        buff.write(_struct_3d.pack(_x.x, _x.y, _x.z))
        _v9 = _v7.orientation
        _x = _v9
        buff.write(_struct_4d.pack(_x.x, _x.y, _x.z, _x.w))
    except struct.error as se: self._check_types(struct.error("%s: '%s' when writing '%s'" % (type(se), str(se), str(locals().get('_x', self)))))
    except TypeError as te: self._check_types(ValueError("%s: '%s' when writing '%s'" % (type(te), str(te), str(locals().get('_x', self)))))

  def deserialize_numpy(self, str, numpy):
    """
    unpack serialized message in str into this message instance using numpy for array types
    :param str: byte array of serialized message, ``str``
    :param numpy: numpy python module
    """
    try:
      if self.status is None:
        self.status = cartographer_ros_msgs.msg.StatusResponse()
      if self.textures is None:
        self.textures = None
      end = 0
      start = end
      end += 1
      (self.status.code,) = _struct_B.unpack(str[start:end])
      start = end
      end += 4
      (length,) = _struct_I.unpack(str[start:end])
      start = end
      end += length
      if python3:
        self.status.message = str[start:end].decode('utf-8')
      else:
        self.status.message = str[start:end]
      start = end
      end += 4
      (self.submap_version,) = _struct_i.unpack(str[start:end])
      start = end
      end += 4
      (length,) = _struct_I.unpack(str[start:end])
      self.textures = []
      for i in range(0, length):
        val1 = cartographer_ros_msgs.msg.SubmapTexture()
        start = end
        end += 4
        (length,) = _struct_I.unpack(str[start:end])
        start = end
        end += length
        val1.cells = str[start:end]
        _x = val1
        start = end
        end += 16
        (_x.width, _x.height, _x.resolution,) = _struct_2id.unpack(str[start:end])
        _v10 = val1.slice_pose
        _v11 = _v10.position
        _x = _v11
        start = end
        end += 24
        (_x.x, _x.y, _x.z,) = _struct_3d.unpack(str[start:end])
        _v12 = _v10.orientation
        _x = _v12
        start = end
        end += 32
        (_x.x, _x.y, _x.z, _x.w,) = _struct_4d.unpack(str[start:end])
        self.textures.append(val1)
      return self
    except struct.error as e:
      raise genpy.DeserializationError(e) #most likely buffer underfill

_struct_I = genpy.struct_I
_struct_i = struct.Struct("<i")
_struct_2id = struct.Struct("<2id")
_struct_B = struct.Struct("<B")
_struct_4d = struct.Struct("<4d")
_struct_3d = struct.Struct("<3d")
class SubmapQuery(object):
  _type          = 'cartographer_ros_msgs/SubmapQuery'
  _md5sum = 'd39f26c172921775c4ad99dbf7cb0792'
  _request_class  = SubmapQueryRequest
  _response_class = SubmapQueryResponse
