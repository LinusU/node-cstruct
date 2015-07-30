/* eslint-env mocha */

let assert = require('assert')

let write = require('../src/write')
let parse = require('../src/parse')
let fixtures = require('./_fixtures')

describe('write', function () {
  fixtures.forEach(function (info) {
    let schema = parse(info.struct)

    it('should write ' + info.name + ' to new buffer', function () {
      info.examples.forEach(function (ex) {
        let actual = write(schema, ex.data)
        let expected = new Buffer(ex.hex, 'hex')

        assert.deepEqual(actual, expected)
      })
    })

    it('should write ' + info.name + ' at random offset', function () {
      info.examples.forEach(function (ex) {
        let buffer = new Buffer(1024)
        let offset = Math.floor(Math.random() * (1024 - schema.byteLength))

        write(schema, ex.data, buffer, offset)

        let actual = buffer.slice(offset, offset + schema.byteLength)
        let expected = new Buffer(ex.hex, 'hex')

        assert.deepEqual(actual, expected)
      })
    })
  })
})
