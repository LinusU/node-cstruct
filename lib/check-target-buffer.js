'use strict'

const checkOffset = require('./check-offset')

function checkTargetBuffer (targetBuffer, targetOffset, byteLength) {
  if (targetBuffer) {
    checkOffset(targetOffset, byteLength, targetBuffer.length)
    return { buffer: targetBuffer, offset: targetOffset }
  } else {
    return { buffer: Buffer.alloc(byteLength), offset: 0 }
  }
}

module.exports = checkTargetBuffer
