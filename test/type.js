'use strict'

/* eslint-env mocha */

const os = require('os')
const assert = require('assert')
const struct = require('../lib/api')

const FIXTURES = require('./fixtures/plain')
const ENDIANNESS = [
  { name: 'System endian', fnPostfix: '', hexPostfix: os.endianness() },
  { name: 'Little endian', fnPostfix: 'LE', hexPostfix: 'LE' },
  { name: 'Big endian', fnPostfix: 'BE', hexPostfix: 'BE' }
]

describe('Type', () => {
  for (const endianness of ENDIANNESS) {
    describe(endianness.name, () => {
      for (const info of FIXTURES) {
        describe(info.name, () => {
          it('should read value', () => {
            for (const ex of info.examples) {
              const raw = Buffer.from(ex['hex' + endianness.hexPostfix], 'hex')
              const value = struct['read' + endianness.fnPostfix](info.name, raw)

              assert.deepEqual(value, ex.value)
            }
          })

          it('should write value', () => {
            for (const ex of info.examples) {
              const raw = struct['write' + endianness.fnPostfix](info.name, ex.value)
              const expected = Buffer.from(ex['hex' + endianness.hexPostfix], 'hex')

              assert.deepEqual(raw, expected)
            }
          })

          it('should read array of values', () => {
            const raw = Buffer.from(info.examples.map(ex => ex['hex' + endianness.hexPostfix]).join(''), 'hex')
            const actual = struct['readArray' + endianness.fnPostfix](info.name, info.examples.length, raw)
            const expected = info.examples.map(ex => ex.value)

            assert.deepEqual(actual, expected)
          })

          it('should write array of values', () => {
            const values = info.examples.map(ex => ex.value)
            const actual = struct['writeArray' + endianness.fnPostfix](info.name, values)
            const expected = Buffer.from(info.examples.map(ex => ex['hex' + endianness.hexPostfix]).join(''), 'hex')

            assert.deepEqual(actual, expected)
          })
        })
      }
    })
  }
})
