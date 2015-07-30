let types = require('./types')

const RE_SEMIC = /\s*;\s*/m
const RE_COMMA = /\s*,\s*/m
const RE_SPACE = /\s+/m
const RE_BRACK = /\s*\[\s*([0-9]+)\s*\]$/m

function splitFirst (str, re) {
  let match = re.exec(str)
  let head = str.substring(0, match.index)
  let tail = str.substring(match.index + match[0].length)

  return [head, tail]
}

export default function parse (raw, extraTypes) {
  let attributes = []
  let offset = 0
  let input = raw.trim().split(RE_SEMIC).filter(Boolean)
  let linkedTypes = new Map()

  function extraHasType (name) {
    return (extraTypes && extraTypes.has(name))
  }

  function hasType (name) {
    return (extraHasType(name) || types.has(name))
  }

  function getType (name) {
    return (extraHasType(name) ? extraTypes.get(name) : types.get(name))
  }

  input.forEach(function (def) {
    let [ typeName, tail ] = splitFirst(def, RE_SPACE)
    let names = tail.split(RE_COMMA)

    if (hasType(typeName) === false) {
      throw new Error('Unknown type: ' + typeName)
    }

    let type = getType(typeName)

    if (extraHasType(typeName)) {
      linkedTypes.set(typeName, type)
    }

    names.forEach(function (name) {
      let count = 1
      let isArray = false
      let m = RE_BRACK.exec(name)

      if (m !== null) {
        isArray = true
        count = parseInt(m[1], 10)
        name = name.substring(0, m.index)
      }

      attributes.push({ name, type: typeName, offset, isArray, count })
      offset += type.byteLength * count
    })
  })

  return { linkedTypes, attributes, byteLength: offset }
}
