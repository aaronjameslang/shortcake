const ApiBuilder = require('claudia-api-builder')
const selectShortening = require('../db/selectShortening')
const slugToId = require('../slugToId')

exports.handler = async event => {
  const { slug } = event.pathParameters
  if (!slug) {
    throw new Error()
  }
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
  return {
    cake: '🍰',
    id,
    initialUrl,
    shorterUrl: 's.ajla.ng/' + slug
  }
}

exports.mount = api => {
  api.get('/shortening/{slug}', exports.handler)
}
