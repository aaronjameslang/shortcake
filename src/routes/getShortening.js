const ApiBuilder = require('claudia-api-builder')
const selectShortening = require('../db/selectShortening')

exports.handler = async event => {
  const { id } = event.pathParameters
  const initialUrl = await selectShortening(id)
  if (!initialUrl) {
    return new ApiBuilder.ApiResponse(
      {
        cake: null,
        errorMessage: 'Not Found'
      },
      {},
      404
    )
  }
  return {
    cake: '🍰',
    id,
    initialUrl,
    shorterUrl: 's.ajla.ng/' + id
  }
}

exports.mount = api => {
  api.get('/shortening/{id}', exports.handler)
}
