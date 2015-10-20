/* eslint-env mocha */

let os = require('os')
let assert = require('assert')

let Schema = require('../src/schema')
const FIXTURES = require('./fixtures/struct')
const ENDIANNESS = [
  { name: 'System endian', fnPostfix: '', hexPostfix: os.endianness() },
  { name: 'Little endian', fnPostfix: 'LE', hexPostfix: 'LE' },
  { name: 'Big endian', fnPostfix: 'BE', hexPostfix: 'BE'}
]

function atRandomOffset (dataOrLength) {
  let offset
  let buffer = new Buffer(1024)

  if (typeof dataOrLength === 'number') {
    offset = Math.floor(Math.random() * (1024 - dataOrLength))
  } else {
    offset = Math.floor(Math.random() * (1024 - dataOrLength.length))
    dataOrLength.copy(buffer, offset)
  }

  return { buffer, offset }
}

describe('Schema', function () {
  ENDIANNESS.forEach(function (endianness) {
    describe(endianness.name, function () {
      FIXTURES.forEach(function (info) {
        describe(info.name, function () {
          let { linkedTypes, attributes, byteLength } = info
          let schema = new Schema({ linkedTypes, attributes, byteLength })

          it('should expose properties', function () {
            assert.equal(schema.linkedTypes, linkedTypes)
            assert.equal(schema.attributes, attributes)
            assert.equal(schema.byteLength, byteLength)
          })

          it('should read from buffer', function () {
            info.examples.forEach(function (ex) {
              let raw = new Buffer(ex['hex' + endianness.hexPostfix], 'hex')
              let actual = schema['read' + endianness.fnPostfix](raw)

              assert.deepEqual(actual, ex.data)
            })
          })

          it('should write to new buffer', function () {
            info.examples.forEach(function (ex) {
              let actual = schema['write' + endianness.fnPostfix](ex.data)
              let expected = new Buffer(ex['hex' + endianness.hexPostfix], 'hex')

              assert.deepEqual(actual, expected)
            })
          })

          it('should read at random offset', function () {
            info.examples.forEach(function (ex) {
              let { buffer, offset } = atRandomOffset(new Buffer(ex['hex' + endianness.hexPostfix], 'hex'))
              let actual = schema['read' + endianness.fnPostfix](buffer, offset)

              assert.deepEqual(actual, ex.data)
            })
          })

          it('should write ' + info.name + ' at random offset', function () {
            info.examples.forEach(function (ex) {
              let { buffer, offset } = atRandomOffset(schema.byteLength)

              schema['write' + endianness.fnPostfix](ex.data, buffer, offset)

              let actual = buffer.slice(offset, offset + schema.byteLength)
              let expected = new Buffer(ex['hex' + endianness.hexPostfix], 'hex')

              assert.deepEqual(actual, expected)
            })
          })

          it('should read an array from buffer', function () {
            let raw = new Buffer(info.examples.map(ex => ex['hex' + endianness.hexPostfix]).join(''), 'hex')
            let actual = schema['readArray' + endianness.fnPostfix](info.examples.length, raw)
            let expected = info.examples.map(ex => ex.data)

            assert.deepEqual(actual, expected)
          })

          it('should write an array from buffer', function () {
            let data = info.examples.map(ex => ex.data)
            let actual = schema['writeArray' + endianness.fnPostfix](data)
            let expected = new Buffer(info.examples.map(ex => ex['hex' + endianness.hexPostfix]).join(''), 'hex')

            assert.deepEqual(actual, expected)
          })

          it('should read an array at random offset', function () {
            let raw = new Buffer(info.examples.map(ex => ex['hex' + endianness.hexPostfix]).join(''), 'hex')
            let { buffer, offset } = atRandomOffset(raw)
            let actual = schema['readArray' + endianness.fnPostfix](info.examples.length, buffer, offset)
            let expected = info.examples.map(ex => ex.data)

            assert.deepEqual(actual, expected)
          })

          it('should write an array of ' + info.name + ' at random offset', function () {
            let size = (schema.byteLength * info.examples.length)
            let data = info.examples.map(ex => ex.data)
            let { buffer, offset} = atRandomOffset(size)

            schema['writeArray' + endianness.fnPostfix](data, buffer, offset)

            let actual = buffer.slice(offset, offset + size)
            let expected = new Buffer(info.examples.map(ex => ex['hex' + endianness.hexPostfix]).join(''), 'hex')

            assert.deepEqual(actual, expected)
          })
        })
      })
    })
  })
})
