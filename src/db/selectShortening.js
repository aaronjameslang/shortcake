const getDb = require('./getDb')

module.exports = async id => {
  const db = await getDb()
  const sql = 'SELECT url FROM shortening WHERE id = $1'
  const res = await db.query(sql, [id])
  await db.end()
  return res.rows[0].url
}
