const ll = require('lambda-local')

test('GET /{slug}', () => {
  return ll.execute({
    event: {
      pathParameters: {
        slug: 'B'
      },
      requestContext: {
        httpMethod: 'GET',
        resourcePath: '/{slug}'
      }
    },
    lambdaPath: 'src/index.js'
  }).then(res => {
    expect(res.statusCode).toBe(301)
    expect(res.headers.Location).toBe('https://example.com')
    const data = JSON.parse(res.body)
    expect(data).toEqual({
      id: 1,
      cake: '🍰',
      initialUrl: 'https://example.com',
      shorterUrl: 's.ajla.ng/B'
    })
  })
})

test('GET /{slug} 404', () => {
  return ll.execute({
    event: {
      pathParameters: {
        slug: 'B_____'
      },
      requestContext: {
        httpMethod: 'GET',
        resourcePath: '/{slug}'
      }
    },
    lambdaPath: 'src/index.js'
  }).then(res => {
    expect(res.statusCode).toBe(404)
    expect(res.headers.Location).toBeUndefined()
    const data = JSON.parse(res.body)
    expect(data).toEqual({
      cake: null,
      errorMessage: 'Not Found'
    })
  })
})
