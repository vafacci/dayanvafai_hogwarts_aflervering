import { Router } from "express";
import * as studentsController from '../controllers/students.controller.js'

const router = Router();

router.get("/", studentsController.getAllstudents);     // GET /houses
router.get("/:id", studentsController.getStudentsById);  // GET /houses/1
router.post('/', studentsController.postStudents);       // POST   /students
router.put('/:id', studentsController.putStudents);      // PUT    /students/1
router.delete('/:id', studentsController.deleteStudents); // DELETE /students/1

export default router;