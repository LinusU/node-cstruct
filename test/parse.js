/* eslint-env mocha */

let assert = require('assert')

let parse = require('../src/parse')
let fixtures = require('./_fixtures')

describe('parse', function () {
  fixtures.forEach(function (info) {
    it('parses ' + info.name, function () {
      let { linkedTypes, attributes, byteLength } = info
      let actual = parse(info.struct)
      let expected = { linkedTypes, attributes, byteLength }

      assert.deepEqual(actual, expected)
    })
  })
})
