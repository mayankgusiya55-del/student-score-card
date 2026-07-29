import React, { useEffect, useState } from "react";
import { getStudentResult } from "../api/api";

function ResultCard(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (props.studentId) {
      loadResult();
    }
  }, [props.studentId]);

  const loadResult = async () => {
    setLoading(true);

    try {
      const res = await getStudentResult(props.studentId);
      setData(res);
      setError("");
    } catch (err) {
      setError("Unable to load result.");
    }

    setLoading(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={props.onBack}>Back</button>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="card">
      <h2>Student Result</h2>

      <button onClick={props.onBack}>Back</button>

      <p><b>Name:</b> {data.student.name}</p>
      <p><b>Roll No:</b> {data.student.roll_no}</p>
      <p><b>Class:</b> {data.student.class}</p>

      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
            <th>Max</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.subjects.map((item, index) => (
            <tr key={index}>
              <td>{item.subject}</td>
              <td>{item.marks_obtained}</td>
              <td>{item.max_marks}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <p><b>Total:</b> {data.total_obtained} / {data.total_max}</p>
      <p><b>Percentage:</b> {data.percentage}%</p>
      <p><b>Grade:</b> {data.grade}</p>
      <p><b>Result:</b> {data.overall_status}</p>
    </div>
  );
}

export default ResultCard;