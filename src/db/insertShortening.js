const getDb = require('./getDb')

/**
 * @returns {number} id
 */
module.exports = async url => {
  const db = await getDb()
  const sql = 'INSERT INTO shortening(url) VALUES($1) RETURNING id'
  const res = await db.query(sql, [url])
  await db.end()
  return res.rows[0].id
}
