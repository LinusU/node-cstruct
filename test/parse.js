/* eslint-env mocha */

let assert = require('assert')

let parse = require('../src/parse')
const FIXTURES = require('./fixtures/struct')

describe('parse', function () {
  FIXTURES.forEach(function (info) {
    it('should parse ' + info.name, function () {
      let { linkedTypes, attributes, byteLength } = info
      let actual = parse(info.struct)
      let expected = { linkedTypes, attributes, byteLength }

      assert.deepEqual(actual, expected)
    })
  })
})
