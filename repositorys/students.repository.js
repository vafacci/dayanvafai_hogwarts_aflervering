import { pool } from '../db.js';

// R – alle elever
export async function getAllStudents() {
  const result = await pool.query('SELECT * FROM students');
  return result.rows;
}

// R – én elev via id
export async function getStudentById(id) {
  const one = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
  if (one.rowCount === 0) return null;
  return one.rows[0];
}

// R – find elev via navn (bruges til duplikat-tjek)
export async function getStudentByName(name) {
  const one = await pool.query('SELECT * FROM students WHERE name = $1', [name]);
  if (one.rowCount === 0) return null;
  return one.rows[0];
}

// C – opret elev
export async function postStudent(name, year, house_id) {
  const result = await pool.query(
    'INSERT INTO students (name, year, house_id) VALUES ($1, $2, $3) RETURNING *',
    [name, year, house_id]
  );
  return result.rows[0];
}

// U – opdater elev
export async function putStudent(name, year, house_id, id) {
  const result = await pool.query(
    'UPDATE students SET name = $1, year = $2, house_id = $3 WHERE id = $4 RETURNING *',
    [name, year, house_id, id]
  );
  return result.rows[0];
}

// D – slet elev
export async function deleteStudent(id) {
  await pool.query('DELETE FROM students WHERE id = $1', [id]);
  return true;
}
