let checkOffset = require('./check-offset')

export default function checkTargetBuffer (targetBuffer, targetOffset, byteLength) {
  if (targetBuffer) {
    checkOffset(targetOffset, byteLength, targetBuffer.length)
    return { buffer: targetBuffer, offset: targetOffset }
  } else {
    return { buffer: new Buffer(byteLength), offset: 0 }
  }
}
