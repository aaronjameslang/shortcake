const insertShortening = require('./insertShortening')

test('insertShortening', async () => {
  const initialUrl = 'http://example.com'
  const id = await insertShortening(initialUrl)
  expect(typeof id).toBe('string')
  expect(id).toHaveLength(4)
})
