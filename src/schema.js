let array = require('./array')
let types = require('./types')
let checkOffset = require('./check-offset')
let checkTargetBuffer = require('./check-target-buffer')
// let read = require('./read')
// let write = require('./write')

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
  read (buffer, offset = 0) {
    checkOffset(offset, this.byteLength, buffer.length)

    let result = {}

    this.attributes.forEach((def) => {
      let type = this._getType(def.type)

      if (def.isArray === false) {
        result[def.name] = type.read(buffer, offset + def.offset)
      } else {
        result[def.name] = array.read(type, def.count, buffer, offset + def.offset)
      }
    })

    return result
  }
  write (data, targetBuffer = null, targetOffset = 0) {
    let { buffer, offset } = checkTargetBuffer(targetBuffer, targetOffset, this.byteLength)

    this.attributes.forEach((def) => {
      let type = this._getType(def.type)

      if (def.isArray === false) {
        type.write(data[def.name], buffer, offset + def.offset)
      } else {
        array.write(type, def.count, data[def.name], buffer, offset + def.offset)
      }
    })

    return buffer
  }
  readArray (count, buffer, offset = 0) {
    return array.read(this, count, buffer, offset)
  }
  writeArray (data, buffer = null, offset = 0) {
    if (!Array.isArray(data)) throw new TypeError('expected data to be an array')

    return array.write(this, data.length, data, buffer, offset)
  }
}
