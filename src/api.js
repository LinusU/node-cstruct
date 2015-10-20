let os = require('os')
let array = require('./array')
let parse = require('./parse')
let types = require('./types')
let Schema = require('./schema')
let checkOffset = require('./check-offset')
let checkTargetBuffer = require('./check-target-buffer')

function structRead (endianness, typeName, buffer, offset = 0) {
  let type = types.get(typeName)
  checkOffset(offset, type.byteLength, buffer.length)
  return type['read' + endianness](buffer, offset)
}

function structReadArray (endianness, typeName, count, buffer, offset = 0) {
  let type = types.get(typeName)
  checkOffset(offset, type.byteLength * count, buffer.length)
  return array['read' + endianness](type, count, buffer, offset)
}

function structWrite (endianness, typeName, data, targetBuffer = null, targetOffset = 0) {
  let type = types.get(typeName)
  let { buffer, offset } = checkTargetBuffer(targetBuffer, targetOffset, type.byteLength)
  type['write' + endianness](data, buffer, offset)
  return buffer
}

function structWriteArray (endianness, typeName, data, targetBuffer = null, targetOffset = 0) {
  if (!Array.isArray(data)) throw new TypeError('expected data to be an array')

  let type = types.get(typeName)
  let { buffer, offset } = checkTargetBuffer(targetBuffer, targetOffset, type.byteLength * data.length)
  return array['write' + endianness](type, data.length, data, buffer, offset)
}

struct.read = function (typeName, buffer, offset) {
  return structRead(os.endianness(), typeName, buffer, offset)
}

struct.readLE = function (typeName, buffer, offset) {
  return structRead('LE', typeName, buffer, offset)
}

struct.readBE = function (typeName, buffer, offset) {
  return structRead('BE', typeName, buffer, offset)
}

struct.readArray = function (typeName, count, buffer, offset) {
  return structReadArray(os.endianness(), typeName, count, buffer, offset)
}

struct.readArrayLE = function (typeName, count, buffer, offset) {
  return structReadArray('LE', typeName, count, buffer, offset)
}

struct.readArrayBE = function (typeName, count, buffer, offset) {
  return structReadArray('BE', typeName, count, buffer, offset)
}

struct.write = function (typeName, data, targetBuffer, targetOffset) {
  return structWrite(os.endianness(), typeName, data, targetBuffer, targetOffset)
}

struct.writeLE = function (typeName, data, targetBuffer, targetOffset) {
  return structWrite('LE', typeName, data, targetBuffer, targetOffset)
}

struct.writeBE = function (typeName, data, targetBuffer, targetOffset) {
  return structWrite('BE', typeName, data, targetBuffer, targetOffset)
}

struct.writeArray = function (typeName, data, targetBuffer, targetOffset) {
  return structWriteArray(os.endianness(), typeName, data, targetBuffer, targetOffset)
}

struct.writeArrayLE = function (typeName, data, targetBuffer, targetOffset) {
  return structWriteArray('LE', typeName, data, targetBuffer, targetOffset)
}

struct.writeArrayBE = function (typeName, data, targetBuffer, targetOffset) {
  return structWriteArray('BE', typeName, data, targetBuffer, targetOffset)
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
