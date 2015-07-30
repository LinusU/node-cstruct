/* eslint-env mocha */

let assert = require('assert')
let struct = require('../src/api')

describe('api', function () {
  it('should work with string templates', function () {
    let legs = 6
    let eyes = 2

    let Animal = struct `
      uint8 legs, eyes;
    `

    let expected = new Buffer([ legs, eyes ])
    let actual = Animal.write({ legs, eyes })

    assert.deepEqual(actual, expected)
  })

  it('should work with values in string templates', function () {
    let legs = 6
    let eyes = 2
    let a = 'legs'
    let b = 'eyes'

    let Animal = struct `
      uint8 ${a}, ${b};
    `

    let expected = new Buffer([ legs, eyes ])
    let actual = Animal.write({ legs, eyes })

    assert.deepEqual(actual, expected)
  })

  it('should handle nested structs', function () {
    let A = struct `
      uint8 foo;
    `
    let B = struct `
      uint8 bar;
    `
    let C = struct `
      ${A} a;
      ${B} b;
    `

    let a = { foo: 8 }
    let b = { bar: 6 }
    let expected = new Buffer([ a.foo, b.bar ])
    let actual = C.write({ a, b })

    assert.deepEqual(actual, expected)
  })

  it('should work with the example from the readme', function () {
    const Color = struct `
      uint8 r, g, b;
    `
    const Point = struct `
      uint8 x, y;
      ${Color} color;
    `

    let raw = new Buffer('7823ff00ff', 'hex')
    let data = { x: 120, y: 35, color: { r: 255, g: 0, b: 255 } }

    assert.deepEqual(Point.read(raw), data)
    assert.deepEqual(Point.write(data), raw)
  })
})
