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
