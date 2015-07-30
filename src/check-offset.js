export default function checkOffset (offset, ext, length) {
  if (offset < 0 || offset + ext > length) {
    throw new RangeError('index out of range')
  }
}
