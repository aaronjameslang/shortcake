const ll = require('lambda-local')

test('GET /shortening/{slug}', () => {
  return ll.execute({
    event: {
      pathParameters: {
        slug: 'B'
      },
      requestContext: {
        httpMethod: 'GET',
        resourcePath: '/shortening/{slug}'
      }
    },
    lambdaPath: 'src/index.js'
  }).then(res => {
    expect(res.statusCode).toBe(200)
    const data = JSON.parse(res.body)
    expect(data).toEqual({
      id: 1,
      cake: '🍰',
      initialUrl: 'https://example.com',
      shorterUrl: 's.ajla.ng/B'
    })
  })
})

test('GET /shortening/{slug} 404', () => {
  return ll.execute({
    event: {
      pathParameters: {
        slug: 'B_____'
      },
      requestContext: {
        httpMethod: 'GET',
        resourcePath: '/shortening/{slug}'
      }
    },
    lambdaPath: 'src/index.js'
  }).then(res => {
    expect(res.statusCode).toBe(404)
    const data = JSON.parse(res.body)
    expect(data).toEqual({
      cake: null,
      errorMessage: 'Not Found'
    })
  })
})
