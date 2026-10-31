import { pool } from '../db.js';

// R – alle lærere
export async function getAllTeachers() {
  const result = await pool.query('SELECT * FROM teachers');
  return result.rows;
}

// R – én lærer via id
export async function getTeacherById(id) {
  const one = await pool.query('SELECT * FROM teachers WHERE id = $1', [id]);
  if (one.rowCount === 0) return null;
  return one.rows[0];
}

// R – find lærer via navn (bruges til duplikat-tjek)
export async function getTeacherByName(name) {
  const one = await pool.query('SELECT * FROM teachers WHERE name = $1', [name]);
  if (one.rowCount === 0) return null;
  return one.rows[0];
}

// C – opret lærer
export async function postTeacher(name, house_id) {
  const result = await pool.query(
    'INSERT INTO teachers (name, house_id) VALUES ($1, $2) RETURNING *',
    [name, house_id]
  );
  return result.rows[0];
}

// U – opdater lærer
export async function putTeacher(name, house_id, id) {
  const result = await pool.query(
    'UPDATE teachers SET name = $1, house_id = $2 WHERE id = $3 RETURNING *',
    [name, house_id, id]
  );
  return result.rows[0];
}

// D – slet lærer
export async function deleteTeacher(id) {
  await pool.query('DELETE FROM teachers WHERE id = $1', [id]);
  return true;
}
