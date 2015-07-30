let read = require('./read')
let write = require('./write')

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
  read (buffer, offset) {
    return read(this, buffer, offset)
  }
  write (data, buffer, offset) {
    return write(this, data, buffer, offset)
  }
  readArray (count, buffer, offset = 0) {
    let result = new Array(count)

    for (let i = 0; i < count; i++) {
      result[i] = this.read(buffer, offset + (i * this.byteLength))
    }

    return result
  }
  writeArray (data, buffer = null, offset = 0) {
    if (!Array.isArray(data)) throw new TypeError('expected data to be an array')

    if (buffer === null) {
      buffer = new Buffer(this.byteLength * data.length)
      offset = 0
    }

    for (let i = 0; i < data.length; i++) {
      this.write(data[i], buffer, offset + (i * this.byteLength))
    }

    return buffer
  }
}
