let parse = require('./parse')
let Schema = require('./schema')

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
