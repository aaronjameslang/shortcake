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
  return new ApiBuilder.ApiResponse(
    {
      cake: '🍰',
      id,
      initialUrl,
      shorterUrl: 's.ajla.ng/' + id
    },
    { Location: initialUrl },
    301
  )
}

exports.mount = api => {
  api.get('/{id}', exports.handler)
}
