export function read (type, count, buffer, offset) {
  let result = new Array(count)
  let size = type.byteLength

  for (let i = 0; i < count; i++) {
    result[i] = type.read(buffer, offset + (i * size))
  }

  return result
}

export function write (type, count, data, targetBuffer, targetOffset) {
  let size = type.byteLength
  let buffer = (targetBuffer === null ? new Buffer(size * count) : targetBuffer)
  let offset = (targetBuffer === null ? 0 : targetOffset)

  for (let i = 0; i < count; i++) {
    type.write(data[i], buffer, offset + (i * size))
  }

  return buffer
}
