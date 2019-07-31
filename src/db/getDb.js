const { Client } = require('pg')
const getSecrets = require('../getSecrets')

// TODO consider a connection pool for performance

/**
 * N.B. Please `await db.end()` to close the connection
 *   before returning or throwing
 */
module.exports = async () => {
  const secrets = await getSecrets()
  const client = new Client({
    database: secrets.DB_NAME,
    host: secrets.DB_HOST,
    password: secrets.DB_PASS,
    port: secrets.DB_PORT,
    user: secrets.DB_USER
  })
  await client.connect()
  return client
}
