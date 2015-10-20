let os = require('os')
let array = require('./array')
let types = require('./types')
let checkOffset = require('./check-offset')
let checkTargetBuffer = require('./check-target-buffer')

let nextId = 0

export default class Schema {
  constructor (definition, linkedTypes) {
    Object.defineProperty(this, '_id', {
      value: 'user_defined_type_' + (++nextId)
    })

    this.linkedTypes = definition.linkedTypes
    this.attributes = definition.attributes
    this.byteLength = definition.byteLength
  }

  _getType (name) {
    return (this.linkedTypes.get(name) || types.get(name))
  }
  _read (endianness, buffer, offset = 0) {
    checkOffset(offset, this.byteLength, buffer.length)

    let result = {}

    this.attributes.forEach((def) => {
      let type = this._getType(def.type)

      if (def.isArray === false) {
        result[def.name] = type['read' + endianness](buffer, offset + def.offset)
      } else {
        result[def.name] = array['read' + endianness](type, def.count, buffer, offset + def.offset)
      }
    })

    return result
  }
  _write (endianness, data, targetBuffer = null, targetOffset = 0) {
    let { buffer, offset } = checkTargetBuffer(targetBuffer, targetOffset, this.byteLength)

    this.attributes.forEach((def) => {
      let type = this._getType(def.type)

      if (def.isArray === false) {
        type['write' + endianness](data[def.name], buffer, offset + def.offset)
      } else {
        array['write' + endianness](type, def.count, data[def.name], buffer, offset + def.offset)
      }
    })

    return buffer
  }
  _readArray (endianness, count, buffer, offset = 0) {
    return array['read' + endianness](this, count, buffer, offset)
  }
  _writeArray (endianness, data, targetBuffer = null, targetOffset = 0) {
    if (!Array.isArray(data)) throw new TypeError('expected data to be an array')

    return array['write' + endianness](this, data.length, data, targetBuffer, targetOffset)
  }

  read (buffer, offset) {
    return this._read(os.endianness(), buffer, offset)
  }
  readLE (buffer, offset) {
    return this._read('LE', buffer, offset)
  }
  readBE (buffer, offset) {
    return this._read('BE', buffer, offset)
  }
  write (data, targetBuffer, targetOffset) {
    return this._write(os.endianness(), data, targetBuffer, targetOffset)
  }
  writeLE (data, targetBuffer, targetOffset) {
    return this._write('LE', data, targetBuffer, targetOffset)
  }
  writeBE (data, targetBuffer, targetOffset) {
    return this._write('BE', data, targetBuffer, targetOffset)
  }
  readArray (count, buffer, offset = 0) {
    return this._readArray(os.endianness(), count, buffer, offset)
  }
  readArrayLE (count, buffer, offset = 0) {
    return this._readArray('LE', count, buffer, offset)
  }
  readArrayBE (count, buffer, offset = 0) {
    return this._readArray('BE', count, buffer, offset)
  }
  writeArray (data, targetBuffer, targetOffset) {
    return this._writeArray(os.endianness(), data, targetBuffer, targetOffset)
  }
  writeArrayLE (data, targetBuffer, targetOffset) {
    return this._writeArray('LE', data, targetBuffer, targetOffset)
  }
  writeArrayBE (data, targetBuffer, targetOffset) {
    return this._writeArray('BE', data, targetBuffer, targetOffset)
  }
}
