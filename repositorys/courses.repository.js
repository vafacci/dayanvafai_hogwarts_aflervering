import { pool } from '../db.js';

// R – get all courses
export async function getAllCourses() {
  const result = await pool.query('SELECT * FROM courses');
  return result.rows;
}

// R – get one course WITH teacher and students
export async function getCourseById(id) {
  const one = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
  if (one.rowCount === 0) return null;
  const course = one.rows[0];

  const teacher = await pool.query('SELECT * FROM teachers WHERE id = $1', [course.teacher_id]);
  const students = await pool.query(
    `SELECT s.* FROM students s
     JOIN course_students cs ON s.id = cs.student_id
     WHERE cs.course_id = $1`,
    [id]
  );

  return { ...course, teacher: teacher.rows[0], students: students.rows };
}

// R – get course by name (used to check for duplicates)
export async function getCourseByName(name) {
  const one = await pool.query('SELECT * FROM courses WHERE name = $1', [name]);
  if (one.rowCount === 0) return null;
  return one.rows[0];
}

// R – get a student's link to a course (used to check for duplicates)
export async function getCourseStudent(course_id, student_id) {
  const one = await pool.query(
    'SELECT * FROM course_students WHERE course_id = $1 AND student_id = $2',
    [course_id, student_id]
  );
  if (one.rowCount === 0) return null;
  return one.rows[0];
}

// C – create course
export async function postCourse(name, teacher_id) {
  const result = await pool.query(
    'INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *',
    [name, teacher_id]
  );
  return result.rows[0];
}

// U – update course name
export async function putCourse(name, id) {
  const result = await pool.query(
    'UPDATE courses SET name = $1 WHERE id = $2 RETURNING *',
    [name, id]
  );
  return result.rows[0];
}

// U – set / change teacher on a course
export async function putCourseTeacher(teacher_id, id) {
  const result = await pool.query(
    'UPDATE courses SET teacher_id = $1 WHERE id = $2 RETURNING *',
    [teacher_id, id]
  );
  return result.rows[0];
}

// U – add student to course
export async function postCourseStudent(course_id, student_id) {
  const result = await pool.query(
    'INSERT INTO course_students (course_id, student_id) VALUES ($1, $2) RETURNING *',
    [course_id, student_id]
  );
  return result.rows[0];
}

// U – remove student from course
export async function deleteCourseStudent(course_id, student_id) {
  await pool.query(
    'DELETE FROM course_students WHERE course_id = $1 AND student_id = $2',
    [course_id, student_id]
  );
  return true;
}

// D – delete course (the database also deletes its course_students rows)
export async function deleteCourse(id) {
  await pool.query('DELETE FROM courses WHERE id = $1', [id]);
  return true;
}
