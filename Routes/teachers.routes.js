import { Router } from "express";
import * as teachersController from '../controllers/teachers.controller.js'

const router = Router();

router.get("/", teachersController.getAllTeachers);     // GET /houses
router.get("/:id", teachersController.getTeacherById);  // GET /houses/1
router.post('/', teachersController.postTeacher);       // POST   /teachers
router.put('/:id', teachersController.putTeacher);      // PUT    /teachers/1
router.delete('/:id', teachersController.deleteTeacher); // DELETE /teachers/1

export default router;