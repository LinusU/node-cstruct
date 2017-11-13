'use strict'

const types = require('./types')

const RE_SEMIC = /\s*;\s*/m
const RE_COMMA = /\s*,\s*/m
const RE_SPACE = /\s+/m
const RE_BRACK = /\s*\[\s*([0-9]+)\s*\]$/m

function splitFirst (str, re) {
  const match = re.exec(str)
  const head = str.substring(0, match.index)
  const tail = str.substring(match.index + match[0].length)

  return [head, tail]
}

function parse (raw, extraTypes) {
  let attributes = []
  let offset = 0

  const input = raw.trim().split(RE_SEMIC).filter(Boolean)
  const linkedTypes = new Map()

  function extraHasType (name) {
    return (extraTypes && extraTypes.has(name))
  }

  function hasType (name) {
    return (extraHasType(name) || types.has(name))
  }

  function getType (name) {
    return (extraHasType(name) ? extraTypes.get(name) : types.get(name))
  }

  for (const def of input) {
    const [ typeName, tail ] = splitFirst(def, RE_SPACE)
    const names = tail.split(RE_COMMA)

    if (hasType(typeName) === false) {
      throw new Error(`Unknown type: ${typeName}`)
    }

    const type = getType(typeName)

    if (extraHasType(typeName)) {
      linkedTypes.set(typeName, type)
    }

    for (let name of names) {
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
    }
  }

  return { linkedTypes, attributes, byteLength: offset }
}

module.exports = parse
