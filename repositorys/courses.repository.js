// TODO: courses repository – du bygger den her
import { pool } from '../db.js';


export async function getAllCourses () {
    const result = await pool.query("SELECT * FROM courses");
    return result.rows;
  }

  export async function getCourseById(id) {
    const one = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
    if (one.rowCount === 0) return null;
    const course = one.rows[0]

    const teacher = await pool.query('SELECT * FROM teachers WHERE id = $1', [course.teacher_id]);
    const students = await pool.query(
        `SELECT s.* FROM students s
         JOIN course_students cs ON s.id = cs.student_id
         WHERE cs.course_id = $1`,
        [id]
      );

    return {...course, teacher: teacher.rows[0], students: students.rows }
}  
  

// C – opret kursus
// Body: { "name": "Charms", "teacher_id": 3 }
app.post("/courses", async (req, res) => {
    const { name, teacher_id } = req.body;
    const result = await pool.query(
      "INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *",
      [name, teacher_id]
    );
    res.json(result.rows[0]);
  });



// U – opdater kun kursus-navn
// Body: { "name": "Advanced Potions" }
// 
export async function putCourse(name,id) {
    const result = await pool.query(
        "UPDATE courses SET name = $1 WHERE id = $2 RETURNING *",
        [name,id]
    );
    return result.rows[0];
  }