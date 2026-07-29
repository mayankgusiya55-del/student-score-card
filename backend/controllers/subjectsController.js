const pool = require('../config/db');

// GET /api/subjects — subjects are hard-coded/seeded in the DB, read-only via API
async function getSubjects(req, res) {
  const [rows] = await pool.query('SELECT id, name, max_marks FROM subjects ORDER BY id');
  res.json({ success: true, data: rows });
}

module.exports = { getSubjects };
