'use strict'

/* eslint-env mocha */

const os = require('os')
const assert = require('assert')

const Schema = require('../lib/schema')
const FIXTURES = require('./fixtures/struct')

const ENDIANNESS = [
  { name: 'System endian', fnPostfix: '', hexPostfix: os.endianness() },
  { name: 'Little endian', fnPostfix: 'LE', hexPostfix: 'LE' },
  { name: 'Big endian', fnPostfix: 'BE', hexPostfix: 'BE' }
]

function atRandomOffset (dataOrLength) {
  let offset
  let buffer = Buffer.allocUnsafe(1024)

  if (typeof dataOrLength === 'number') {
    offset = Math.floor(Math.random() * (1024 - dataOrLength))
  } else {
    offset = Math.floor(Math.random() * (1024 - dataOrLength.length))
    dataOrLength.copy(buffer, offset)
  }

  return { buffer, offset }
}

describe('Schema', () => {
  for (const endianness of ENDIANNESS) {
    describe(endianness.name, () => {
      for (const info of FIXTURES) {
        describe(info.name, () => {
          const { linkedTypes, attributes, byteLength } = info
          const schema = new Schema({ linkedTypes, attributes, byteLength })

          it('should expose properties', () => {
            assert.equal(schema.linkedTypes, linkedTypes)
            assert.equal(schema.attributes, attributes)
            assert.equal(schema.byteLength, byteLength)
          })

          it('should read from buffer', () => {
            for (const ex of info.examples) {
              const raw = Buffer.from(ex['hex' + endianness.hexPostfix], 'hex')
              const actual = schema['read' + endianness.fnPostfix](raw)

              assert.deepEqual(actual, ex.data)
            }
          })

          it('should write to new buffer', () => {
            for (const ex of info.examples) {
              const actual = schema['write' + endianness.fnPostfix](ex.data)
              const expected = Buffer.from(ex['hex' + endianness.hexPostfix], 'hex')

              assert.deepEqual(actual, expected)
            }
          })

          it('should read at random offset', () => {
            for (const ex of info.examples) {
              const { buffer, offset } = atRandomOffset(Buffer.from(ex['hex' + endianness.hexPostfix], 'hex'))
              const actual = schema['read' + endianness.fnPostfix](buffer, offset)

              assert.deepEqual(actual, ex.data)
            }
          })

          it(`should write ${info.name} at random offset`, () => {
            for (const ex of info.examples) {
              const { buffer, offset } = atRandomOffset(schema.byteLength)

              schema['write' + endianness.fnPostfix](ex.data, buffer, offset)

              const actual = buffer.slice(offset, offset + schema.byteLength)
              const expected = Buffer.from(ex['hex' + endianness.hexPostfix], 'hex')

              assert.deepEqual(actual, expected)
            }
          })

          it('should read an array from buffer', () => {
            const raw = Buffer.from(info.examples.map(ex => ex['hex' + endianness.hexPostfix]).join(''), 'hex')
            const actual = schema['readArray' + endianness.fnPostfix](info.examples.length, raw)
            const expected = info.examples.map(ex => ex.data)

            assert.deepEqual(actual, expected)
          })

          it('should write an array from buffer', () => {
            const data = info.examples.map(ex => ex.data)
            const actual = schema['writeArray' + endianness.fnPostfix](data)
            const expected = Buffer.from(info.examples.map(ex => ex['hex' + endianness.hexPostfix]).join(''), 'hex')

            assert.deepEqual(actual, expected)
          })

          it('should read an array at random offset', () => {
            const raw = Buffer.from(info.examples.map(ex => ex['hex' + endianness.hexPostfix]).join(''), 'hex')
            const { buffer, offset } = atRandomOffset(raw)
            const actual = schema['readArray' + endianness.fnPostfix](info.examples.length, buffer, offset)
            const expected = info.examples.map(ex => ex.data)

            assert.deepEqual(actual, expected)
          })

          it(`should write an array of ${info.name} at random offset`, () => {
            const size = (schema.byteLength * info.examples.length)
            const data = info.examples.map(ex => ex.data)
            const { buffer, offset } = atRandomOffset(size)

            schema['writeArray' + endianness.fnPostfix](data, buffer, offset)

            const actual = buffer.slice(offset, offset + size)
            const expected = Buffer.from(info.examples.map(ex => ex['hex' + endianness.hexPostfix]).join(''), 'hex')

            assert.deepEqual(actual, expected)
          })
        })
      }
    })
  }
})
