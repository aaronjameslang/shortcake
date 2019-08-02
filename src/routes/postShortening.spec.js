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

test('POST /shortening 400', () => {
  const initialUrl = 'example.com'
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
    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res.body)
    expect(data).toEqual({
      cake: null,
      errorMessage: 'The URL provided may be invalid. Be sure to specify the protocol.'
    })
  })
})
