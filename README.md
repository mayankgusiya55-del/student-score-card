# Student Score Card

A full-stack app to manage students and generate school/college-style report cards.

- **Backend:** Node.js, Express, MySQL (`mysql2`), CORS, input validation via `express-validator`
- **Frontend:** React (hooks), Axios, plain responsive CSS

## Features
- Subjects are seeded/hard-coded in the database (Mathematics, Science, English, Social Studies, Computer Science)
- Add students
- Enter marks for a student across all subjects, with validation (0–100, required fields)
- View a full report card: per-subject marks, pass/fail, total, percentage, grade, overall result
- Loading and error states throughout the UI

## Project Structure
```
student-scorecard/
  backend/
    config/db.js          MySQL connection pool
    controllers/           Route logic
    middleware/             Error handling + validation
    routes/                  Express routes
    database.sql            Schema + seed data
    server.js                 App entry point
  frontend/
    src/
      api/api.js             Axios API client
      components/          React components
      App.js
      index.js / index.css
```

## Setup

### 1. Database
Make sure MySQL is running locally, then:
```bash
mysql -u root -p < backend/database.sql
```
This creates the `student_scorecard` database with `subjects`, `students`, and `marks` tables, and seeds the subjects.

### 2. Backend
```bash
cd backend
cp .env.example .env    # edit DB_PASSWORD etc. to match your MySQL setup
npm install
npm run dev              # or: npm start
```
Server runs at `http://localhost:5000`. Check `http://localhost:5000/api/health`.

### 3. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm start
```
App runs at `http://localhost:3000`.

## API Endpoints
| Method | Endpoint                     | Description                          |
|--------|-------------------------------|---------------------------------------|
| GET    | /api/subjects                 | List all subjects                     |
| GET    | /api/students                 | List all students                     |
| POST   | /api/students                 | Add a new student                     |
| GET    | /api/students/:id              | Get one student                       |
| GET    | /api/students/:id/result       | Get a student's full report card      |
| POST   | /api/marks                    | Submit/update marks for a student     |

### Example: POST /api/students
```json
{ "name": "Priya Sharma", "roll_no": "2026-101", "class": "10th A" }
```

### Example: POST /api/marks
```json
{
  "student_id": 1,
  "marks": [
    { "subject_id": 1, "marks_obtained": 88 },
    { "subject_id": 2, "marks_obtained": 76 }
  ]
}
```

## Notes / Possible Extensions
- Grading thresholds and pass mark (33%) are set in `controllers/studentsController.js` — easy to adjust.
- Currently no auth/login — could add JWT-based auth for teachers if the task calls for it.
- Subjects table is seeded once; add an admin endpoint if you need to manage subjects dynamically later.
