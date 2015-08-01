/* eslint-env mocha */

let assert = require('assert')
let struct = require('../src/api')

const FIXTURES = require('./fixtures/plain')

describe('Type', function () {
  FIXTURES.forEach(function (info) {
    describe(info.name, function () {
      it('should read value', function () {
        info.examples.forEach(function (ex) {
          let raw = new Buffer(ex.hex, 'hex')
          let value = struct.read(info.name, raw)

          assert.deepEqual(value, ex.value)
        })
      })

      it('should write value', function () {
        info.examples.forEach(function (ex) {
          let raw = struct.write(info.name, ex.value)
          let expected = new Buffer(ex.hex, 'hex')

          assert.deepEqual(raw, expected)
        })
      })

      it('should read array of values', function () {
        let raw = new Buffer(info.examples.map(ex => ex.hex).join(''), 'hex')
        let actual = struct.readArray(info.name, info.examples.length, raw)
        let expected = info.examples.map(ex => ex.value)

        assert.deepEqual(actual, expected)
      })

      it('should write array of values', function () {
        let values = info.examples.map(ex => ex.value)
        let actual = struct.writeArray(info.name, values)
        let expected = new Buffer(info.examples.map(ex => ex.hex).join(''), 'hex')

        assert.deepEqual(actual, expected)
      })
    })
  })
})
