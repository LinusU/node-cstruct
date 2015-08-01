let array = require('./array')
let parse = require('./parse')
let types = require('./types')
let Schema = require('./schema')
let checkOffset = require('./check-offset')
let checkTargetBuffer = require('./check-target-buffer')

struct.read = function (typeName, buffer, offset = 0) {
  let type = types.get(typeName)
  checkOffset(offset, type.byteLength, buffer.length)
  return type.read(buffer, offset)
}

struct.readArray = function (typeName, count, buffer, offset = 0) {
  let type = types.get(typeName)
  checkOffset(offset, type.byteLength * count, buffer.length)
  return array.read(type, count, buffer, offset)
}

struct.write = function (typeName, data, targetBuffer = null, targetOffset = 0) {
  let type = types.get(typeName)
  let { buffer, offset } = checkTargetBuffer(targetBuffer, targetOffset, type.byteLength)
  type.write(data, buffer, offset)
  return buffer
}

struct.writeArray = function (typeName, data, targetBuffer = null, targetOffset = 0) {
  if (!Array.isArray(data)) throw new TypeError('expected data to be an array')

  let type = types.get(typeName)
  let { buffer, offset } = checkTargetBuffer(targetBuffer, targetOffset, type.byteLength * data.length)
  return array.write(type, data.length, data, buffer, offset)
}

export default function struct (strings, ...values) {
  let source = ''
  let extraTypes = new Map()

  for (let i = 0; i < strings.length; i++) {
    source += strings[i]

    if (i < values.length) {
      if (values[i] instanceof Schema) {
        source += values[i]._id
        extraTypes.set(values[i]._id, values[i])
      } else {
        source += values[i]
      }
    }
  }

  return new Schema(parse(source, extraTypes), extraTypes)
}
