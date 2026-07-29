-- Run this file first to set up the database:
--   mysql -u root -p < database.sql

CREATE DATABASE IF NOT EXISTS student_scorecard;
USE student_scorecard;

-- Subjects are hard-coded / seeded once. Not editable via the app.
CREATE TABLE IF NOT EXISTS subjects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  max_marks INT NOT NULL DEFAULT 100
);

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  roll_no VARCHAR(50) NOT NULL UNIQUE,
  class VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS marks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  subject_id INT NOT NULL,
  marks_obtained DECIMAL(5,2) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
  UNIQUE KEY unique_student_subject (student_id, subject_id)
);

-- Seed hard-coded subjects
INSERT INTO subjects (name, max_marks) VALUES
  ('Mathematics', 100),
  ('Science', 100),
  ('English', 100),
  ('Social Studies', 100),
  ('Computer Science', 100)
ON DUPLICATE KEY UPDATE name = name;
