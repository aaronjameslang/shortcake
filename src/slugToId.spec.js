const slugToId = require('./slugToId')
const { fixtures } = require('./idToSlug.spec')

for (const id in fixtures) {
  const slug = fixtures[id]
  test(`slugToId(${slug}) => ${id}`, () => {
    expect(slugToId(slug)).toBe(Number(id))
  })
}
