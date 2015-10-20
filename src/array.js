function arrayRead (endianness, type, count, buffer, offset) {
  let result = new Array(count)
  let size = type.byteLength

  for (let i = 0; i < count; i++) {
    result[i] = type['read' + endianness](buffer, offset + (i * size))
  }

  return result
}

function arrayWrite (endianness, type, count, data, targetBuffer, targetOffset) {
  let size = type.byteLength
  let buffer = (targetBuffer === null ? new Buffer(size * count) : targetBuffer)
  let offset = (targetBuffer === null ? 0 : targetOffset)

  for (let i = 0; i < count; i++) {
    type['write' + endianness](data[i], buffer, offset + (i * size))
  }

  return buffer
}

export function readLE (type, count, buffer, offset) {
  return arrayRead('LE', type, count, buffer, offset)
}

export function readBE (type, count, buffer, offset) {
  return arrayRead('BE', type, count, buffer, offset)
}

export function writeLE (type, count, data, targetBuffer, targetOffset) {
  return arrayWrite('LE', type, count, data, targetBuffer, targetOffset)
}

export function writeBE (type, count, data, targetBuffer, targetOffset) {
  return arrayWrite('BE', type, count, data, targetBuffer, targetOffset)
}
