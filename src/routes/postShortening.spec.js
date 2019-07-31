const ll = require('lambda-local')

test('POST /shortening', () => {
  const initialUrl = 'http://example.com'
  return ll.execute({
    event: {
      body: JSON.stringify({ initialUrl }),
      requestContext: {
        httpMethod: 'POST',
        resourcePath: '/shortening'
      }
    },
    lambdaPath: 'src/index.js'
  }).then(res => {
    expect(res.statusCode).toBe(201)
    const data = JSON.parse(res.body)
    expect(data.cake).toBeTruthy()
    expect(data.id).toBeGreaterThan(0)
    expect(data.initialUrl).toBe(initialUrl)
    expect(data.shorterUrl).toBeTruthy()
  })
})
