'use strict'

const os = require('os')
const array = require('./array')
const parse = require('./parse')
const types = require('./types')
const Schema = require('./schema')
const checkOffset = require('./check-offset')
const checkTargetBuffer = require('./check-target-buffer')

function structRead (endianness, typeName, buffer, offset = 0) {
  const type = types.get(typeName)
  checkOffset(offset, type.byteLength, buffer.length)
  return type['read' + endianness](buffer, offset)
}

function structReadArray (endianness, typeName, count, buffer, offset = 0) {
  const type = types.get(typeName)
  checkOffset(offset, type.byteLength * count, buffer.length)
  return array['read' + endianness](type, count, buffer, offset)
}

function structWrite (endianness, typeName, data, targetBuffer = null, targetOffset = 0) {
  const type = types.get(typeName)
  const { buffer, offset } = checkTargetBuffer(targetBuffer, targetOffset, type.byteLength)
  type['write' + endianness](data, buffer, offset)
  return buffer
}

function structWriteArray (endianness, typeName, data, targetBuffer = null, targetOffset = 0) {
  if (!Array.isArray(data)) throw new TypeError('expected data to be an array')

  const type = types.get(typeName)
  const { buffer, offset } = checkTargetBuffer(targetBuffer, targetOffset, type.byteLength * data.length)
  return array['write' + endianness](type, data.length, data, buffer, offset)
}

function struct (strings, ...values) {
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

struct.read = function read (typeName, buffer, offset) {
  return structRead(os.endianness(), typeName, buffer, offset)
}

struct.readLE = function readLE (typeName, buffer, offset) {
  return structRead('LE', typeName, buffer, offset)
}

struct.readBE = function readBE (typeName, buffer, offset) {
  return structRead('BE', typeName, buffer, offset)
}

struct.readArray = function readArray (typeName, count, buffer, offset) {
  return structReadArray(os.endianness(), typeName, count, buffer, offset)
}

struct.readArrayLE = function readArrayLE (typeName, count, buffer, offset) {
  return structReadArray('LE', typeName, count, buffer, offset)
}

struct.readArrayBE = function readArrayBE (typeName, count, buffer, offset) {
  return structReadArray('BE', typeName, count, buffer, offset)
}

struct.write = function write (typeName, data, targetBuffer, targetOffset) {
  return structWrite(os.endianness(), typeName, data, targetBuffer, targetOffset)
}

struct.writeLE = function writeLE (typeName, data, targetBuffer, targetOffset) {
  return structWrite('LE', typeName, data, targetBuffer, targetOffset)
}

struct.writeBE = function writeBE (typeName, data, targetBuffer, targetOffset) {
  return structWrite('BE', typeName, data, targetBuffer, targetOffset)
}

struct.writeArray = function writeArray (typeName, data, targetBuffer, targetOffset) {
  return structWriteArray(os.endianness(), typeName, data, targetBuffer, targetOffset)
}

struct.writeArrayLE = function writeArrayLE (typeName, data, targetBuffer, targetOffset) {
  return structWriteArray('LE', typeName, data, targetBuffer, targetOffset)
}

struct.writeArrayBE = function writeArrayBE (typeName, data, targetBuffer, targetOffset) {
  return structWriteArray('BE', typeName, data, targetBuffer, targetOffset)
}

module.exports = struct
