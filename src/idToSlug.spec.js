const idToSlug = require('./idToSlug')

const fixtures = {
  1: 'B',
  2: 'C',
  3: 'D',
  1234: 'TS', // TS > JS
  181816: 'sY4',
  258046: '-_-',
  0x09abcdef: 'Jq83v',
  0x12345678: 'SNFZ4',
  0x7f7f7f7f: 'B_f39_',
  0x7fffffff: 'B_____'
}
exports.fixtures = fixtures

for (const id in fixtures) {
  const slug = fixtures[id]
  test(`idToSlug(${id}) => ${slug}`, () => {
    expect(idToSlug(id)).toBe(slug)
  })
}
