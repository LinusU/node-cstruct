let types = new Map()
export default types

{
  function readIntLE (bytes) {
    return function (buffer, offset) {
      return buffer.readIntLE(offset, bytes, true)
    }
  }
  function readIntBE (bytes) {
    return function (buffer, offset) {
      return buffer.readIntBE(offset, bytes, true)
    }
  }

  function writeIntLE (bytes) {
    return function (value, buffer, offset) {
      buffer.writeIntLE(value, offset, bytes, true)
    }
  }
  function writeIntBE (bytes) {
    return function (value, buffer, offset) {
      buffer.writeIntBE(value, offset, bytes, true)
    }
  }

  types.set('int8', { byteLength: 1, readLE: readIntLE(1), writeLE: writeIntLE(1), readBE: readIntBE(1), writeBE: writeIntBE(1) })
  types.set('int16', { byteLength: 2, readLE: readIntLE(2), writeLE: writeIntLE(2), readBE: readIntBE(2), writeBE: writeIntBE(2) })
  types.set('int32', { byteLength: 4, readLE: readIntLE(4), writeLE: writeIntLE(4), readBE: readIntBE(4), writeBE: writeIntBE(4) })
}

{
  function readUIntLE (bytes) {
    return function (buffer, offset) {
      return buffer.readUIntLE(offset, bytes, true)
    }
  }
  function readUIntBE (bytes) {
    return function (buffer, offset) {
      return buffer.readUIntBE(offset, bytes, true)
    }
  }

  function writeUIntLE (bytes) {
    return function (value, buffer, offset) {
      buffer.writeUIntLE(value, offset, bytes, true)
    }
  }
  function writeUIntBE (bytes) {
    return function (value, buffer, offset) {
      buffer.writeUIntBE(value, offset, bytes, true)
    }
  }

  types.set('uint8', { byteLength: 1, readLE: readUIntLE(1), writeLE: writeUIntLE(1), readBE: readUIntBE(1), writeBE: writeUIntBE(1) })
  types.set('uint16', { byteLength: 2, readLE: readUIntLE(2), writeLE: writeUIntLE(2), readBE: readUIntBE(2), writeBE: writeUIntBE(2) })
  types.set('uint32', { byteLength: 4, readLE: readUIntLE(4), writeLE: writeUIntLE(4), readBE: readUIntBE(4), writeBE: writeUIntBE(4) })
}

{
  function readFloatLE (buffer, offset) {
    return buffer.readFloatLE(offset, true)
  }
  function readFloatBE (buffer, offset) {
    return buffer.readFloatBE(offset, true)
  }

  function writeFloatLE (value, buffer, offset) {
    buffer.writeFloatLE(value, offset, true)
  }
  function writeFloatBE (value, buffer, offset) {
    buffer.writeFloatBE(value, offset, true)
  }

  types.set('float', { byteLength: 4, readLE: readFloatLE, writeLE: writeFloatLE, readBE: readFloatBE, writeBE: writeFloatBE })
}

{
  function readDoubleLE (buffer, offset) {
    return buffer.readDoubleLE(offset, true)
  }
  function readDoubleBE (buffer, offset) {
    return buffer.readDoubleBE(offset, true)
  }

  function writeDoubleLE (value, buffer, offset) {
    buffer.writeDoubleLE(value, offset, true)
  }
  function writeDoubleBE (value, buffer, offset) {
    buffer.writeDoubleBE(value, offset, true)
  }

  types.set('double', { byteLength: 8, readLE: readDoubleLE, writeLE: writeDoubleLE, readBE: readDoubleBE, writeBE: writeDoubleBE })
}

{
  function readBool (buffer, offset) {
    return (buffer.readUInt8(offset, true) !== 0)
  }

  function writeBool (value, buffer, offset) {
    buffer.writeUInt8(value ? 1 : 0, offset, true)
  }

  types.set('bool', { byteLength: 1, readLE: readBool, writeLE: writeBool, readBE: readBool, writeBE: writeBool })
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
