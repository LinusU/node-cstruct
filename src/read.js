let types = require('./types')
let checkOffset = require('./check-offset')

export default function read (schema, buffer, offset = 0) {
  checkOffset(offset, schema.byteLength, buffer.length)

  let result = {}

  function getType (name) {
    return (schema.linkedTypes.get(name) || types.get(name))
  }

  schema.attributes.forEach(function (def) {
    let type = getType(def.type)

    if (def.isArray === false) {
      result[def.name] = type.read(buffer, offset + def.offset)
      return
    }

    let size = type.byteLength
    result[def.name] = new Array(def.count)

    for (let i = 0; i < def.count; i++) {
      result[def.name][i] = type.read(buffer, offset + def.offset + (i * size))
    }
  })

  return result
}
