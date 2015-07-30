/* eslint-env mocha */

let assert = require('assert')

let read = require('../src/read')
let parse = require('../src/parse')
let fixtures = require('./_fixtures')

describe('read', function () {
  fixtures.forEach(function (info) {
    let schema = parse(info.struct)

    it('should read ' + info.name + ' from buffer', function () {
      info.examples.forEach(function (ex) {
        let raw = new Buffer(ex.hex, 'hex')
        let actual = read(schema, raw)

        assert.deepEqual(actual, ex.data)
      })
    })

    it('should read ' + info.name + ' at random offset', function () {
      info.examples.forEach(function (ex) {
        let raw = new Buffer(ex.hex, 'hex')
        let buffer = new Buffer(1024)
        let offset = Math.floor(Math.random() * (1024 - raw.length))

        raw.copy(buffer, offset)
        let actual = read(schema, buffer, offset)

        assert.deepEqual(actual, ex.data)
      })
    })
  })
})
