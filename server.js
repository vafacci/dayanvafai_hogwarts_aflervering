// Hogwarts Course Management – backend (REST API)
// CRUD = Create, Read, Update, Delete
// Start med: npm start   →  http://localhost:3000


import * as coursesController from './controllers/courses.controller.js';
import studentsRoutes from './Routes/students.routes.js';
import teachersRoutes from './Routes/teachers.routes.js';
import housesRoutes from './Routes/houses.routes.js';
import express from 'express'; // web-server bibliotek
import { pool } from './db.js'; // database-forbindelse fra db.js

const app = express();
app.use(express.json()); // gør at vi kan læse JSON fra POST/PUT body


// HOUSES 
// GET /houses  →  hent ALLE huse + hent ÉT hus
app.use('/houses', housesRoutes);

// TEACHERS – fuld CRUD 
// hent alle teachers + hent en teacher + opret ny teacher + opdater en teacher + slet en teacher
app.use("/teachers", teachersRoutes);

// STUDENTS – fuld CRUD  
// hent alle students + hent en student + opret ny student + opdater en student + slet en student
app.use("/students", studentsRoutes);

// COURSES
// Har ekstra Update: set teacher, add/remove student

// R – alle kurser 
app.get("/courses", coursesController.getAllCourses);

// R – ét kursus MED teacher + students
app.get("/courses/:id", coursesController.getCourseById);

// C – opret kursus
app.post("/courses", async (req, res) => {
  const { name, teacher_id } = req.body;
  const result = await pool.query(
    "INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *",
    [name, teacher_id]
  );
  res.json(result.rows[0]);
});

// U – opdater kun kursus-navn
app.put("/courses/:id", coursesController.putCourse);

// U – sæt / skift teacher på et kursus
app.put("/courses/:id/teacher", async (req, res) => {
  const { teacher_id } = req.body;
  const result = await pool.query(
    "UPDATE courses SET teacher_id = $1 WHERE id = $2 RETURNING *",
    [teacher_id, req.params.id]
  );
  res.json(result.rows[0]);
});

// U – tilføj elev til kursus
app.post("/courses/:id/students", async (req, res) => {
  const { student_id } = req.body;
  await pool.query(
    "INSERT INTO course_students (course_id, student_id) VALUES ($1, $2)",
    [req.params.id, student_id]
  );
  res.json({ added: true });
});

// U – fjern elev fra kursus
app.delete("/courses/:id/students/:studentId", async (req, res) => {
  await pool.query(
    "DELETE FROM course_students WHERE course_id = $1 AND student_id = $2",
    [req.params.id, req.params.studentId]
  );
  res.json({ removed: true });
});

// D – slet kursus (sletter først eleverne på kurset)
app.delete("/courses/:id", async (req, res) => {
  await pool.query("DELETE FROM course_students WHERE course_id = $1", [
    req.params.id,
  ]);
  await pool.query("DELETE FROM courses WHERE id = $1", [req.params.id]);
  res.json({ deleted: true });
});

// Start serveren på port 3000
app.listen(3000, () => {
  console.log("Server kører på http://localhost:3000");
});
