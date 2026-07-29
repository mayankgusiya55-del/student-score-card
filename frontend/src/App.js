import React, { useState } from "react";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import MarksForm from "./components/MarksForm";
import ResultCard from "./components/ResultCard";
import "./index.css";

function App() {
  const [page, setPage] = useState("list");
  const [studentId, setStudentId] = useState(null);

  const showResult = (id) => {
    setStudentId(id);
    setPage("result");
  };

  const marksAdded = (id) => {
    showResult(id);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Student Score Card</h1>
      </header>

      <div className="tabs">
        <button
          className={page === "list" ? "active" : ""}
          onClick={() => setPage("list")}
        >
          Students
        </button>

        <button
          className={page === "add" ? "active" : ""}
          onClick={() => setPage("add")}
        >
          Add Student
        </button>

        <button
          className={page === "marks" ? "active" : ""}
          onClick={() => setPage("marks")}
        >
          Enter Marks
        </button>
      </div>

      <div className="app-main">
        {page === "list" && (
          <StudentList onViewResult={showResult} />
        )}

        {page === "add" && (
          <AddStudent
            onStudentAdded={() => setPage("list")}
          />
        )}

        {page === "marks" && (
          <MarksForm
            onMarksSubmitted={marksAdded}
          />
        )}

        {page === "result" && (
          <ResultCard
            studentId={studentId}
            onBack={() => setPage("list")}
          />
        )}
      </div>
    </div>
  );
}

export default App;