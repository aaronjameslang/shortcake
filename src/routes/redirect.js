const ApiBuilder = require('claudia-api-builder')
const selectShortening = require('../db/selectShortening')
const slugToId = require('../slugToId')

exports.handler = async event => {
  const { slug } = event.pathParameters
  const id = slugToId(slug)
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
      shorterUrl: 's.ajla.ng/' + slug
    },
    { Location: initialUrl },
    301
  )
}

exports.mount = api => {
  api.get('/{slug}', exports.handler)
}
