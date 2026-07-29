import React, { useState, useEffect } from "react";
import { getStudents } from "../api/api";

function StudentList(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    try {
      let data = await getStudents();
      setList(data);
      setMsg("");
    } catch (err) {
      setMsg("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Student List</h2>

      <button onClick={loadData}>Refresh</button>

      {loading && <p>Loading...</p>}

      {msg && <p>{msg}</p>}

      {!loading && list.length === 0 && (
        <p>No students available.</p>
      )}

      {!loading && list.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Class</th>
              <th>Result</th>
            </tr>
          </thead>

          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.roll_no}</td>
                <td>{item.name}</td>
                <td>{item.class}</td>
                <td>
                  <button onClick={() => props.onViewResult(item.id)}>
                    View Result
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;