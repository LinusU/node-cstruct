'use strict'

/* eslint-env mocha */

const assert = require('assert')
const struct = require('../')

describe('api', () => {
  it('should work with string templates', () => {
    const legs = 6
    const eyes = 2

    const Animal = struct`
      uint8 legs, eyes;
    `

    const expected = Buffer.from([ legs, eyes ])
    const actual = Animal.write({ legs, eyes })

    assert.deepEqual(actual, expected)
  })

  it('should work with values in string templates', () => {
    const legs = 6
    const eyes = 2
    const a = 'legs'
    const b = 'eyes'

    const Animal = struct`
      uint8 ${a}, ${b};
    `

    const expected = Buffer.from([ legs, eyes ])
    const actual = Animal.write({ legs, eyes })

    assert.deepEqual(actual, expected)
  })

  it('should handle nested structs', () => {
    const A = struct`
      uint8 foo;
    `
    const B = struct`
      uint8 bar;
    `
    const C = struct`
      ${A} a;
      ${B} b;
    `

    const a = { foo: 8 }
    const b = { bar: 6 }
    const expected = Buffer.from([ a.foo, b.bar ])
    const actual = C.write({ a, b })

    assert.deepEqual(actual, expected)
  })

  it('should work with the example from the readme', () => {
    const Color = struct`
      uint8 r, g, b;
    `
    const Point = struct`
      uint8 x, y;
      ${Color} color;
    `

    const raw = Buffer.from('7823ff00ff', 'hex')
    const data = { x: 120, y: 35, color: { r: 255, g: 0, b: 255 } }

    assert.deepEqual(Point.read(raw), data)
    assert.deepEqual(Point.write(data), raw)
  })
})
