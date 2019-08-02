module.exports = id => {
  if (id <= 0) {
    throw new Error('id <= 0')
  }
  if (id > 0x7FFFFFFF) {
    throw new Error('id > 0x7FFFFFFF')
  }
  /**
   * - 3 bytes is 4 characters of base64
   * - IDs are 4 bytes
   * - In order to get nice short b64 (i.e. A, B, C, ..., AB, AC),
   *   we need to right-align our id to a 3-byte boundary
   * - Hence a 6 byte buffer and a 2 byte offset
   */
  const buf = Buffer.alloc(6)
  buf.writeInt32BE(id, 2)
  const slug = buf.toString('base64')
    .replace(/\+/g, '-') // url safe
    .replace(/\//g, '_') // url safe
    .replace(/^A+/, '') // trim leading "zeros"
  return slug
}
