/* eslint-env mocha */

let os = require('os')
let assert = require('assert')
let struct = require('../src/api')

const FIXTURES = require('./fixtures/plain')
const ENDIANNESS = [
  { name: 'System endian', fnPostfix: '', hexPostfix: os.endianness() },
  { name: 'Little endian', fnPostfix: 'LE', hexPostfix: 'LE' },
  { name: 'Big endian', fnPostfix: 'BE', hexPostfix: 'BE'}
]

describe('Type', function () {
  ENDIANNESS.forEach(function (endianness) {
    describe(endianness.name, function () {
      FIXTURES.forEach(function (info) {
        describe(info.name, function () {
          it('should read value', function () {
            info.examples.forEach(function (ex) {
              let raw = new Buffer(ex['hex' + endianness.hexPostfix], 'hex')
              let value = struct['read' + endianness.fnPostfix](info.name, raw)

              assert.deepEqual(value, ex.value)
            })
          })

          it('should write value', function () {
            info.examples.forEach(function (ex) {
              let raw = struct['write' + endianness.fnPostfix](info.name, ex.value)
              let expected = new Buffer(ex['hex' + endianness.hexPostfix], 'hex')

              assert.deepEqual(raw, expected)
            })
          })

          it('should read array of values', function () {
            let raw = new Buffer(info.examples.map(ex => ex['hex' + endianness.hexPostfix]).join(''), 'hex')
            let actual = struct['readArray' + endianness.fnPostfix](info.name, info.examples.length, raw)
            let expected = info.examples.map(ex => ex.value)

            assert.deepEqual(actual, expected)
          })

          it('should write array of values', function () {
            let values = info.examples.map(ex => ex.value)
            let actual = struct['writeArray' + endianness.fnPostfix](info.name, values)
            let expected = new Buffer(info.examples.map(ex => ex['hex' + endianness.hexPostfix]).join(''), 'hex')

            assert.deepEqual(actual, expected)
          })
        })
      })
    })
  })
})
