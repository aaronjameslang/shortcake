const ll = require('lambda-local')

test('GET /shortening/{id}', () => {
  return ll.execute({
    event: {
      pathParameters: {
        id: 'test'
      },
      requestContext: {
        httpMethod: 'GET',
        resourcePath: '/shortening/{id}'
      }
    },
    lambdaPath: 'src/index.js'
  }).then(res => {
    expect(res.statusCode).toBe(200)
    const data = JSON.parse(res.body)
    expect(data).toEqual({
      id: 'test',
      cake: '🍰',
      initialUrl: 'https://example.com',
      shorterUrl: 's.ajla.ng/test'
    })
  })
})

test('GET /shortening/{id} 404', () => {
  return ll.execute({
    event: {
      pathParameters: {
        id: 'invalid-id'
      },
      requestContext: {
        httpMethod: 'GET',
        resourcePath: '/shortening/{id}'
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
