const pool = require('../config/db');


async function getStudents(req, res) {
  const [rows] = await pool.query(
    'SELECT id, name, roll_no, class, created_at FROM students ORDER BY created_at DESC'
  );
  res.json({ success: true, data: rows });
}


async function getStudentById(req, res) {
  const { id } = req.params;
  const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
  if (rows.length === 0) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }
  res.json({ success: true, data: rows[0] });
}

async function createStudent(req, res) {
  const { name, roll_no, class: studentClass } = req.body;

  const [existing] = await pool.query('SELECT id FROM students WHERE roll_no = ?', [roll_no]);
  if (existing.length > 0) {
    return res.status(409).json({ success: false, message: 'A student with this roll number already exists' });
  }

  const [result] = await pool.query(
    'INSERT INTO students (name, roll_no, class) VALUES (?, ?, ?)',
    [name, roll_no, studentClass]
  );

  const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [result.insertId]);
  res.status(201).json({ success: true, message: 'Student added successfully', data: rows[0] });
}


async function getStudentResult(req, res) {
  const { id } = req.params;

  const [students] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
  if (students.length === 0) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }
  const student = students[0];

  const [subjects] = await pool.query('SELECT id, name, max_marks FROM subjects ORDER BY id');
  const [marks] = await pool.query('SELECT subject_id, marks_obtained FROM marks WHERE student_id = ?', [id]);

  if (marks.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No marks have been entered for this student yet'
    });
  }

  const marksMap = {};
  marks.forEach(m => { marksMap[m.subject_id] = Number(m.marks_obtained); });

  let totalObtained = 0;
  let totalMax = 0;
  const subjectResults = subjects.map(subj => {
    const obtained = marksMap[subj.id] ?? 0;
    totalObtained += obtained;
    totalMax += subj.max_marks;
    return {
      subject: subj.name,
      marks_obtained: obtained,
      max_marks: subj.max_marks,
      status: obtained >= subj.max_marks * 0.33 ? 'Pass' : 'Fail'
    };
  });

  const percentage = totalMax > 0 ? ((totalObtained / totalMax) * 100) : 0;
  const grade = getGrade(percentage);
  const overallStatus = subjectResults.every(s => s.status === 'Pass') ? 'PASS' : 'FAIL';

  res.json({
    success: true,
    data: {
      student: { id: student.id, name: student.name, roll_no: student.roll_no, class: student.class },
      subjects: subjectResults,
      total_obtained: totalObtained,
      total_max: totalMax,
      percentage: Math.round(percentage * 100) / 100,
      grade,
      overall_status: overallStatus
    }
  });
}

function getGrade(percentage) {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  if (percentage >= 33) return 'E';
  return 'F';
}

module.exports = { getStudents, getStudentById, createStudent, getStudentResult };
