const pool = require('../config/db');

// POST /api/marks — submit marks for a student across all subjects
// Body: { student_id, marks: [{ subject_id, marks_obtained }, ...] }
async function submitMarks(req, res) {
  const { student_id, marks } = req.body;

  const [students] = await pool.query('SELECT id FROM students WHERE id = ?', [student_id]);
  if (students.length === 0) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  const [subjects] = await pool.query('SELECT id FROM subjects');
  const validSubjectIds = new Set(subjects.map(s => s.id));
  for (const m of marks) {
    if (!validSubjectIds.has(Number(m.subject_id))) {
      return res.status(400).json({ success: false, message: `Invalid subject_id: ${m.subject_id}` });
    }
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    for (const m of marks) {
      await connection.query(
        `INSERT INTO marks (student_id, subject_id, marks_obtained)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE marks_obtained = VALUES(marks_obtained)`,
        [student_id, m.subject_id, m.marks_obtained]
      );
    }

    await connection.commit();
    res.status(201).json({ success: true, message: 'Marks submitted successfully' });
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

module.exports = { submitMarks };
