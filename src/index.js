const ApiBuilder = require('claudia-api-builder')
const mountGetShortening = require('./routes/getShortening').mount
const mountPostShortening = require('./routes/postShortening').mount
const mountRedirect = require('./routes/redirect').mount

const api = new ApiBuilder({ requestFormat: 'AWS_PROXY' })

mountGetShortening(api)
mountPostShortening(api)
mountRedirect(api)

exports.handler = api.proxyRouter
