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

### `Schema.linkedTypes`

A `Map` with other types used inside of this type. The key is the name of the
struct and the value is a `Schema`.

### `Schema.read(buffer[, offset])`

Read the struct from a buffer into a structured javascript object. Optionally
supply an offset to start reading at that position.

### `Schema.write(data[, targetBuffer[, targetOffset]])`

Write the javascript object `data` into a buffer. If no `targetBuffer` is
supplied, a new one will be created with the same length as the struct.
Optionally supply an offset to start writing at that position.

### `Schema.readArray(count, buffer[, offset])`

Read `count` number of structs from a buffer into an array. Optionally
supply an offset to start reading at that position.

### `Schema.writeArray(data[, targetBuffer[, targetOffset]])`

Write an array of javascript objects into a buffer. If no `targetBuffer` is
supplied, a new one will be created with the same length as the structs combined
size. Optionally supply an offset to start writing at that position.

### `struct.read(typeName, buffer[, offset])`

Read a primitive type from a buffer. Optionally supply an offset to start
reading at that position.

### `struct.write(typeName, data[, targetBuffer[, targetOffset]])`

Write a primitive type into a buffer. If no `targetBuffer` is supplied, a new
one will be created with the same length as the type. Optionally supply an
offset to start writing at that position.

### `struct.readArray(typeName, count, buffer[, offset])`

Read `count` number of primitive types from a buffer into an array. Optionally
supply an offset to start reading at that position.

### `struct.writeArray(typeName, data[, targetBuffer[, targetOffset]])`

Write an array of primitive types into a buffer. If no `targetBuffer` is
supplied, a new one will be created with the same length as the primitive types
combined size. Optionally supply an offset to start writing at that position.

## Endianness

By default reading and writing is done in the current computer's endianness.
All function can be postfixed with `LE` or `BE` to force a specific endianness,
e.g. `struct.readBE('uint32_t', buffer)`.

## Compatibility

Template strings is enabled by default in [io.js][2] but not in [Node.js][3]
version `0.12`. [Babel][4] is capable of transpiling for almost all
environments, including Node.js.

[2]: https://iojs.org/
[3]: https://nodejs.org/
[4]: https://babeljs.io/
