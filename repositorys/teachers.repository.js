import { pool } from '../db.js';

// R – get all teachers
export async function getAllTeachers() {
  const result = await pool.query('SELECT * FROM teachers');
  return result.rows;
}

// R – get one teacher by id
export async function getTeacherById(id) {
  const one = await pool.query('SELECT * FROM teachers WHERE id = $1', [id]);
  if (one.rowCount === 0) return null;
  return one.rows[0];
}

// R – get teacher by name (used to check for duplicates)
export async function getTeacherByName(name) {
  const one = await pool.query('SELECT * FROM teachers WHERE name = $1', [name]);
  if (one.rowCount === 0) return null;
  return one.rows[0];
}

// C – create teacher
export async function postTeacher(name, house_id) {
  const result = await pool.query(
    'INSERT INTO teachers (name, house_id) VALUES ($1, $2) RETURNING *',
    [name, house_id]
  );
  return result.rows[0];
}

// U – update teacher
export async function putTeacher(name, house_id, id) {
  const result = await pool.query(
    'UPDATE teachers SET name = $1, house_id = $2 WHERE id = $3 RETURNING *',
    [name, house_id, id]
  );
  return result.rows[0];
}

// D – delete teacher
export async function deleteTeacher(id) {
  await pool.query('DELETE FROM teachers WHERE id = $1', [id]);
  return true;
}
