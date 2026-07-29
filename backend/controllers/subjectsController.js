const pool = require('../config/db');


async function getSubjects(req, res) {
  const [rows] = await pool.query('SELECT id, name, max_marks FROM subjects ORDER BY id');
  res.json({ success: true, data: rows });
}

module.exports = { getSubjects };
