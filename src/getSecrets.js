const AWS = require('aws-sdk')

const client = new AWS.SecretsManager({ region: 'us-east-1' }) // TODO lock API version?

/**
 * @typedef {Object} Secrets
 * @property {string} DB_HOST
 * @property {string} DB_NAME
 * @property {string} DB_PASS
 * @property {string} DB_PORT
 * @property {string} DB_USER
 */

/**
 * @returns {Promise<Secrets>}
 */
module.exports = () => new Promise((resolve, reject) => {
  client.getSecretValue({ SecretId: 'shortcake-dev' }, function (err, data) {
    if (err) return reject(err)
    if (!data.SecretString) return reject(new Error('!data.SecretString'))
    const secrets = JSON.parse(data.SecretString)
    return resolve(secrets)
  })
})

// TODO this could be cached for performance?
