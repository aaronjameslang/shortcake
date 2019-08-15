const selectShortening = require('./selectShortening')

test('selectShortening', async () => {
  const id = 'test'
  const url = await selectShortening(id)
  expect(url).toBe('https://example.com')
})

test('selectShortening 404', async () => {
  const id = 'no-test-id'
  const url = await selectShortening(id)
  expect(url).toBeFalsy()
})
