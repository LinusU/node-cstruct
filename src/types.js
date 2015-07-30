let types = new Map()
export default types

{
  function readInt (bytes) {
    return function (buffer, offset) {
      return buffer.readIntLE(offset, bytes, true)
    }
  }

  function writeInt (bytes) {
    return function (value, buffer, offset) {
      buffer.writeIntLE(value, offset, bytes, true)
    }
  }

  types.set('int8', { byteLength: 1, read: readInt(1), write: writeInt(1) })
  types.set('int16', { byteLength: 2, read: readInt(2), write: writeInt(2) })
  types.set('int32', { byteLength: 4, read: readInt(4), write: writeInt(4) })
}

{
  function readUInt (bytes) {
    return function (buffer, offset) {
      return buffer.readUIntLE(offset, bytes, true)
    }
  }

  function writeUInt (bytes) {
    return function (value, buffer, offset) {
      buffer.writeUIntLE(value, offset, bytes, true)
    }
  }

  types.set('uint8', { byteLength: 1, read: readUInt(1), write: writeUInt(1) })
  types.set('uint16', { byteLength: 2, read: readUInt(2), write: writeUInt(2) })
  types.set('uint32', { byteLength: 4, read: readUInt(4), write: writeUInt(4) })
}

{
  function readFloat (buffer, offset) {
    return buffer.readFloatLE(offset, true)
  }

  function writeFloat (value, buffer, offset) {
    buffer.writeFloatLE(value, offset, true)
  }

  types.set('float', { byteLength: 4, read: readFloat, write: writeFloat })
}

{
  function readDouble (buffer, offset) {
    return buffer.readDoubleLE(offset, true)
  }

  function writeDouble (value, buffer, offset) {
    buffer.writeDoubleLE(value, offset, true)
  }

  types.set('double', { byteLength: 8, read: readDouble, write: writeDouble })
}

{
  function readBool (buffer, offset) {
    return (buffer.readUInt8(offset, true) !== 0)
  }

  function writeBool (value, buffer, offset) {
    buffer.writeUInt8(value ? 1 : 0, offset, true)
  }

  types.set('bool', { byteLength: 1, read: readBool, write: writeBool })
}

// Aliases

types.set('char', types.get('uint8'))

types.set('int8_t', types.get('int8'))
types.set('int16_t', types.get('int16'))
types.set('int32_t', types.get('int32'))

types.set('uint8_t', types.get('uint8'))
types.set('uint16_t', types.get('uint16'))
types.set('uint32_t', types.get('uint32'))

types.set('float32', types.get('float'))
types.set('float32_t', types.get('float'))

types.set('float64', types.get('double'))
types.set('float64_t', types.get('double'))
