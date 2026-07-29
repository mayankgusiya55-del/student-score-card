import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function getError(err) {
  if (err.response) {
    if (err.response.data.errors) {
      return err.response.data.errors
        .map((item) => item.message)
        .join(", ");
    }

    return err.response.data.message || "Something went wrong";
  }

  if (err.request) {
    return "Server is not responding";
  }

  return err.message;
}

export async function getStudents() {
  try {
    const res = await api.get("/students");
    return res.data.data;
  } catch (err) {
    throw new Error(getError(err));
  }
}

export async function getSubjects() {
  try {
    const res = await api.get("/subjects");
    return res.data.data;
  } catch (err) {
    throw new Error(getError(err));
  }
}

export async function addStudent(student) {
  try {
    const res = await api.post("/students", student);
    return res.data.data;
  } catch (err) {
    throw new Error(getError(err));
  }
}

export async function submitMarks(data) {
  try {
    const res = await api.post("/marks", data);
    return res.data;
  } catch (err) {
    throw new Error(getError(err));
  }
}

export async function getStudentResult(id) {
  try {
    const res = await api.get(`/students/${id}/result`);
    return res.data.data;
  } catch (err) {
    throw new Error(getError(err));
  }
}

export default api;