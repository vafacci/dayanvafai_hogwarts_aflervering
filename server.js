// Hogwarts Course Management – backend (REST API)
// CRUD = Create, Read, Update, Delete
// Start med: npm start   →  http://localhost:3000


import studentsRoutes from './Routes/students.routes.js';
import teachersRoutes from './Routes/teachers.routes.js';
import housesRoutes from './Routes/houses.routes.js';
import coursesRoutes from './Routes/courses.routes.js';
import express from 'express'; // web-server bibliotek

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

// COURSES – fuld CRUD
// hent alle + hent et (med teacher og students) + opret + opdater navn + slet
// ekstra: sæt teacher (PUT /:id/teacher), tilføj elev (POST /:id/students), fjern elev (DELETE /:id/students/:studentId)
app.use("/courses", coursesRoutes);

// Start serveren på port 3000
app.listen(3000, () => {
  console.log("Server kører på http://localhost:3000");
});
