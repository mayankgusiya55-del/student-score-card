import React, { useEffect, useState } from "react";
import { getStudents, getSubjects, submitMarks } from "../api/api";

function MarksForm(props) {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [marks, setMarks] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    try {
      const studentData = await getStudents();
      const subjectData = await getSubjects();

      setStudents(studentData);
      setSubjects(subjectData);
    } catch (err) {
      setError("Unable to load data.");
    }

    setLoading(false);
  };

  const changeMarks = (id, value) => {
    setMarks({
      ...marks,
      [id]: value,
    });
  };

  const saveMarks = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (studentId === "") {
      alert("Select a student");
      return;
    }

    for (let i = 0; i < subjects.length; i++) {
      const mark = marks[subjects[i].id];

      if (mark === "" || mark === undefined) {
        alert("Enter marks for " + subjects[i].name);
        return;
      }

      if (mark < 0 || mark > subjects[i].max_marks) {
        alert(
          subjects[i].name +
            " marks should be between 0 and " +
            subjects[i].max_marks
        );
        return;
      }
    }

    const data = {
      student_id: Number(studentId),
      marks: subjects.map((item) => ({
        subject_id: item.id,
        marks_obtained: Number(marks[item.id]),
      })),
    };

    try {
      await submitMarks(data);

      setSuccess("Marks submitted successfully.");
      setMarks({});

      if (props.onMarksSubmitted) {
        props.onMarksSubmitted(studentId);
      }
    } catch (err) {
      setError("Unable to submit marks.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="card">
      <h2>Enter Student Marks</h2>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <form onSubmit={saveMarks}>
        <label>Student</label>

        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        >
          <option value="">Select Student</option>

          {students.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <br />
        <br />

        {subjects.map((item) => (
          <div key={item.id}>
            <label>
              {item.name} ({item.max_marks})
            </label>

            <input
              type="number"
              value={marks[item.id] || ""}
              onChange={(e) => changeMarks(item.id, e.target.value)}
            />

            <br />
            <br />
          </div>
        ))}

        <button type="submit">Submit Marks</button>
      </form>
    </div>
  );
}

export default MarksForm;