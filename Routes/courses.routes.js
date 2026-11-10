// COURSES router – full CRUD + extra endpoints for teacher and students
// server.js sends everything on /courses here, so we only write the rest of the path.
import { Router } from "express";
import * as coursesController from '../controllers/courses.controller.js'

const router = Router();

// ---------- Standard CRUD ----------

// R – get all courses
router.get('/', coursesController.getAllCourses);

// R – get one course WITH teacher and students
router.get('/:id', coursesController.getCourseById);

// C – create course
router.post('/', coursesController.postCourse);

// U – update the name only
router.put('/:id', coursesController.putCourse);

// D – delete course (students on the course are deleted automatically by the database)
router.delete('/:id', coursesController.deleteCourse);

// ---------- Extra: teacher and students on a course ----------

// U – set / change teacher
router.put('/:id/teacher', coursesController.putCourseTeacher);

// U – add student to course
router.post('/:id/students', coursesController.postCourseStudent);

// U – remove student from course (:studentId is the student being removed)
router.delete('/:id/students/:studentId', coursesController.deleteCourseStudent);

export default router;
