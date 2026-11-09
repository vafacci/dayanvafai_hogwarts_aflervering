import { Router } from "express";
import * as coursesController from '../controllers/courses.controller.js'

const router = Router();

router.get('/', coursesController.getAllCourses);                                // GET    /courses
router.get('/:id', coursesController.getCourseById);                             // GET    /courses/1
router.post('/', coursesController.postCourse);                                  // POST   /courses
router.put('/:id', coursesController.putCourse);                                 // PUT    /courses/1
router.put('/:id/teacher', coursesController.putCourseTeacher);                  // PUT    /courses/1/teacher
router.post('/:id/students', coursesController.postCourseStudent);               // POST   /courses/1/students
router.delete('/:id/students/:studentId', coursesController.deleteCourseStudent); // DELETE /courses/1/students/2
router.delete('/:id', coursesController.deleteCourse);                           // DELETE /courses/1

export default router;
