// STUDENTS router – full CRUD
// server.js sends everything on /students here, so we only write the rest of the path.
import { Router } from "express";
import * as studentsController from '../controllers/students.controller.js'

const router = Router();

// R – get all students
router.get("/", studentsController.getAllStudents);

// R – get one student
router.get("/:id", studentsController.getStudentById);

// C – create student
router.post('/', studentsController.postStudent);

// U – update student
router.put('/:id', studentsController.putStudent);

// D – delete student
router.delete('/:id', studentsController.deleteStudent);

export default router;
