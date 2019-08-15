const ll = require('lambda-local')

test('GET /{id}', () => {
  return ll.execute({
    event: {
      pathParameters: {
        id: 'test'
      },
      requestContext: {
        httpMethod: 'GET',
        resourcePath: '/{id}'
      }
    },
    lambdaPath: 'src/index.js'
  }).then(res => {
    expect(res.statusCode).toBe(301)
    expect(res.headers.Location).toBe('https://example.com')
    const data = JSON.parse(res.body)
    expect(data).toEqual({
      id: 'test',
      cake: '🍰',
      initialUrl: 'https://example.com',
      shorterUrl: 's.ajla.ng/test'
    })
  })
})

test('GET /{id} 404', () => {
  return ll.execute({
    event: {
      pathParameters: {
        id: 'test-404'
      },
      requestContext: {
        httpMethod: 'GET',
        resourcePath: '/{id}'
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
