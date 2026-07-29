import React, { useState } from "react";
import { addStudent } from "../api/api";

function AddStudent(props) {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const saveStudent = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (name.trim() === "") {
      alert("Enter student name");
      return;
    }

    if (rollNo.trim() === "") {
      alert("Enter roll number");
      return;
    }

    if (studentClass.trim() === "") {
      alert("Enter class");
      return;
    }

    const data = {
      name: name,
      roll_no: rollNo,
      class: studentClass,
    };

    try {
      const res = await addStudent(data);

      setSuccess("Student added successfully.");

      setName("");
      setRollNo("");
      setStudentClass("");

      if (props.onStudentAdded) {
        props.onStudentAdded(res);
      }
    } catch (err) {
      setError("Unable to add student.");
    }
  };

  return (
    <div className="card">
      <h2>Add Student</h2>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <form onSubmit={saveStudent}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        <label>Roll Number</label>
        <input
          type="text"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />

        <br />
        <br />

        <label>Class</label>
        <input
          type="text"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;