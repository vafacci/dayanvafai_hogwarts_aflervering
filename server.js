// Hogwarts Course Management – backend (REST API)
// Start with: npm start  →  http://localhost:3000

import express from 'express'; // web server library
import housesRoutes from './Routes/houses.routes.js';
import teachersRoutes from './Routes/teachers.routes.js';
import studentsRoutes from './Routes/students.routes.js';
import coursesRoutes from './Routes/courses.routes.js';

const app = express();
app.use(express.json()); // lets us read JSON from the body of POST/PUT requests

// Each router handles one resource (see the Routes folder)
app.use("/houses", housesRoutes);     // read only
app.use("/teachers", teachersRoutes); // full CRUD
app.use("/students", studentsRoutes); // full CRUD
app.use("/courses", coursesRoutes);   // full CRUD + teacher and students on a course

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server kører på http://localhost:3000");
});
