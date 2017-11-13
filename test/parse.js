'use strict'

/* eslint-env mocha */

const assert = require('assert')

const parse = require('../lib/parse')
const FIXTURES = require('./fixtures/struct')

describe('parse', () => {
  for (const info of FIXTURES) {
    it(`should parse ${info.name}`, () => {
      const { linkedTypes, attributes, byteLength } = info
      const actual = parse(info.struct)
      const expected = { linkedTypes, attributes, byteLength }

      assert.deepEqual(actual, expected)
    })
  }
})
