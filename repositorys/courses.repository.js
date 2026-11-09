import { pool } from '../db.js';

// R – alle kurser
export async function getAllCourses() {
  const result = await pool.query('SELECT * FROM courses');
  return result.rows;
}

// R – ét kursus MED teacher og students
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

// R – find kursus via navn (bruges til duplikat-tjek)
export async function getCourseByName(name) {
  const one = await pool.query('SELECT * FROM courses WHERE name = $1', [name]);
  if (one.rowCount === 0) return null;
  return one.rows[0];
}

// R – er eleven allerede på kurset? (bruges til duplikat-tjek)
export async function getCourseStudent(course_id, student_id) {
  const one = await pool.query(
    'SELECT * FROM course_students WHERE course_id = $1 AND student_id = $2',
    [course_id, student_id]
  );
  if (one.rowCount === 0) return null;
  return one.rows[0];
}

// C – opret kursus
export async function postCourse(name, teacher_id) {
  const result = await pool.query(
    'INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *',
    [name, teacher_id]
  );
  return result.rows[0];
}

// U – opdater kun kursus-navn
export async function putCourse(name, id) {
  const result = await pool.query(
    'UPDATE courses SET name = $1 WHERE id = $2 RETURNING *',
    [name, id]
  );
  return result.rows[0];
}

// U – sæt / skift teacher på et kursus
export async function putCourseTeacher(teacher_id, id) {
  const result = await pool.query(
    'UPDATE courses SET teacher_id = $1 WHERE id = $2 RETURNING *',
    [teacher_id, id]
  );
  return result.rows[0];
}

// U – tilføj elev til kursus
export async function postCourseStudent(course_id, student_id) {
  const result = await pool.query(
    'INSERT INTO course_students (course_id, student_id) VALUES ($1, $2) RETURNING *',
    [course_id, student_id]
  );
  return result.rows[0];
}

// U – fjern elev fra kursus
export async function deleteCourseStudent(course_id, student_id) {
  await pool.query(
    'DELETE FROM course_students WHERE course_id = $1 AND student_id = $2',
    [course_id, student_id]
  );
  return true;
}

// D – slet kursus (course_students slettes automatisk pga. ON DELETE CASCADE i databasen)
export async function deleteCourse(id) {
  await pool.query('DELETE FROM courses WHERE id = $1', [id]);
  return true;
}
