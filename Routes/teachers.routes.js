// TEACHERS router – full CRUD
// server.js sends everything on /teachers here, so we only write the rest of the path.
import { Router } from "express";
import * as teachersController from '../controllers/teachers.controller.js'

const router = Router();

// R – get all teachers
router.get("/", teachersController.getAllTeachers);

// R – get one teacher
router.get("/:id", teachersController.getTeacherById);

// C – create teacher
router.post('/', teachersController.postTeacher);

// U – update teacher
router.put('/:id', teachersController.putTeacher);

// D – delete teacher
router.delete('/:id', teachersController.deleteTeacher);

export default router;
