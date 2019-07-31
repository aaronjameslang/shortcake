module.exports = slug => {
  slug = slug.padStart(8, 'A')
  const buf = Buffer.from(slug, 'base64')
  const id = buf.readInt32BE(2)
  return id
}
