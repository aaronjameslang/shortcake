const crypto = require('crypto')
const util = require('util')

const randomBytes = util.promisify(crypto.randomBytes)

module.exports = async () => {
  // 3 bytes of data is 4 b64 chars
  // TODO At a rate of once per second
  //   this space will fill in 194 days,
  //   and have 50% chance of collision within 100 days
  const buf = await randomBytes(3)
  const id = buf.toString('base64')
    .replace(/\+/g, '-') // url safe
    .replace(/\//g, '_') // url safe
  return id
}
