'use strict'

const types = new Map()

{
  const readIntLE = (bytes) => (buffer, offset) => buffer.readIntLE(offset, bytes, true)
  const readIntBE = (bytes) => (buffer, offset) => buffer.readIntBE(offset, bytes, true)
  const writeIntLE = (bytes) => (value, buffer, offset) => buffer.writeIntLE(value, offset, bytes, true)
  const writeIntBE = (bytes) => (value, buffer, offset) => buffer.writeIntBE(value, offset, bytes, true)

  types.set('int8', { byteLength: 1, readLE: readIntLE(1), writeLE: writeIntLE(1), readBE: readIntBE(1), writeBE: writeIntBE(1) })
  types.set('int16', { byteLength: 2, readLE: readIntLE(2), writeLE: writeIntLE(2), readBE: readIntBE(2), writeBE: writeIntBE(2) })
  types.set('int32', { byteLength: 4, readLE: readIntLE(4), writeLE: writeIntLE(4), readBE: readIntBE(4), writeBE: writeIntBE(4) })
}

{
  const readUIntLE = (bytes) => (buffer, offset) => buffer.readUIntLE(offset, bytes, true)
  const readUIntBE = (bytes) => (buffer, offset) => buffer.readUIntBE(offset, bytes, true)
  const writeUIntLE = (bytes) => (value, buffer, offset) => buffer.writeUIntLE(value, offset, bytes, true)
  const writeUIntBE = (bytes) => (value, buffer, offset) => buffer.writeUIntBE(value, offset, bytes, true)

  types.set('uint8', { byteLength: 1, readLE: readUIntLE(1), writeLE: writeUIntLE(1), readBE: readUIntBE(1), writeBE: writeUIntBE(1) })
  types.set('uint16', { byteLength: 2, readLE: readUIntLE(2), writeLE: writeUIntLE(2), readBE: readUIntBE(2), writeBE: writeUIntBE(2) })
  types.set('uint32', { byteLength: 4, readLE: readUIntLE(4), writeLE: writeUIntLE(4), readBE: readUIntBE(4), writeBE: writeUIntBE(4) })
}

{
  const readFloatLE = (buffer, offset) => buffer.readFloatLE(offset, true)
  const readFloatBE = (buffer, offset) => buffer.readFloatBE(offset, true)
  const writeFloatLE = (value, buffer, offset) => buffer.writeFloatLE(value, offset, true)
  const writeFloatBE = (value, buffer, offset) => buffer.writeFloatBE(value, offset, true)

  types.set('float', { byteLength: 4, readLE: readFloatLE, writeLE: writeFloatLE, readBE: readFloatBE, writeBE: writeFloatBE })
}

{
  const readDoubleLE = (buffer, offset) => buffer.readDoubleLE(offset, true)
  const readDoubleBE = (buffer, offset) => buffer.readDoubleBE(offset, true)
  const writeDoubleLE = (value, buffer, offset) => buffer.writeDoubleLE(value, offset, true)
  const writeDoubleBE = (value, buffer, offset) => buffer.writeDoubleBE(value, offset, true)

  types.set('double', { byteLength: 8, readLE: readDoubleLE, writeLE: writeDoubleLE, readBE: readDoubleBE, writeBE: writeDoubleBE })
}

{
  const readBool = (buffer, offset) => (buffer.readUInt8(offset, true) !== 0)
  const writeBool = (value, buffer, offset) => buffer.writeUInt8(value ? 1 : 0, offset, true)

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

module.exports = types
