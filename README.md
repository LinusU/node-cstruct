# `cstruct`

Use C  `struct`s in Javascript while keeping the syntax intact.

## Installation

```sh
npm install --save cstruct
```

## Usage

```javascript
let struct = require('cstruct')

const Color = struct `
  uint8 r, g, b;
`

const Point = struct `
  uint8 x, y;
  ${Color} color;
`

// Read from buffer
let raw = new Buffer('7823ff00ff', 'hex')
let data = Point.read(raw)

// Write to buffer
let data = { x: 120, y: 35, color: { r: 255, g: 0, b: 255 } }
let raw = Point.write(data)
```

## API

### `struct`

This is a function that is suppose to be used together with [tagged template
strings][1]. The template string is a struct definition as you write it in C.

The return value is a new instance of `Schema`.

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings

### `Schema.byteLength`

The length of the struct in bytes.

### `Schema.attributes`

An array of the attributes of the struct. Each attribute is an object with the
following properties: `name`, `type`, `offset`, `isArray`, `count`.

### `Schema.read(buffer[, offset])`

Read the struct from a buffer into a structured javascript object. Optionally
supply an offset to start reading at that position.

### `Schema.write(data[, targetBuffer[, targetOffset]])`

Write the javascript object `data` into a buffer. If no `targetBuffer` is
supplied, a new one will be created with the same length as the struct.
Optionally an offset to start writing at that position.

## Compatibility

Template strings is enabled by default in [io.js][2] but not in [Node.js][3]
version `0.12`. [Babel][4] is capable of transpiling for almost all
environments, including Node.js.

[2]: https://iojs.org/
[3]: https://nodejs.org/
[4]: https://babeljs.io/
