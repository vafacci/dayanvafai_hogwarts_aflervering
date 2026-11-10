import * as coursesRepository from '../repositorys/courses.repository.js';
import * as teachersRepository from '../repositorys/teachers.repository.js';
import * as studentsRepository from '../repositorys/students.repository.js';

// R – get all courses
export async function getAllCourses(req, res) {
  try {
    const courses = await coursesRepository.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// R – get one course (with teacher and students)
export async function getCourseById(req, res) {
  try {
    const course = await coursesRepository.getCourseById(req.params.id);
    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// C – create course
export async function postCourse(req, res) {
  try {
    const { name, teacher_id } = req.body;

    // name is required
    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
    }

    // teacher_id is required
    if (!teacher_id) {
      return res.status(400).send({ message: 'teacher_id is required' });
    }

    // teacher must exist
    const teacher = await teachersRepository.getTeacherById(teacher_id);
    if (!teacher) {
      return res.status(404).send({ message: 'Teacher not found' });
    }

    // course must not already exist (same name)
    const existing = await coursesRepository.getCourseByName(name);
    if (existing) {
      return res.status(409).send({ message: 'Course already exists' });
    }

    const course = await coursesRepository.postCourse(name, teacher_id);
    return res.status(201).json(course);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// U – update course name
export async function putCourse(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
    }

    const existing = await coursesRepository.getCourseById(id);
    if (!existing) {
      return res.status(404).send({ message: 'Course not found' });
    }

    const course = await coursesRepository.putCourse(name, id);
    return res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// U – set / change teacher
export async function putCourseTeacher(req, res) {
  try {
    const { id } = req.params;
    const { teacher_id } = req.body;

    // teacher_id is required
    if (!teacher_id) {
      return res.status(400).send({ message: 'teacher_id is required' });
    }

    // course must exist
    const existing = await coursesRepository.getCourseById(id);
    if (!existing) {
      return res.status(404).send({ message: 'Course not found' });
    }

    // teacher must exist
    const teacher = await teachersRepository.getTeacherById(teacher_id);
    if (!teacher) {
      return res.status(404).send({ message: 'Teacher not found' });
    }

    const course = await coursesRepository.putCourseTeacher(teacher_id, id);
    return res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// U – add student to course
export async function postCourseStudent(req, res) {
  try {
    const { id } = req.params;
    const { student_id } = req.body;

    // student_id is required
    if (!student_id) {
      return res.status(400).send({ message: 'student_id is required' });
    }

    // course must exist
    const course = await coursesRepository.getCourseById(id);
    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }

    // student must exist
    const student = await studentsRepository.getStudentById(student_id);
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }

    // student must not already be on the course
    const existing = await coursesRepository.getCourseStudent(id, student_id);
    if (existing) {
      return res.status(409).send({ message: 'Student already on course' });
    }

    await coursesRepository.postCourseStudent(id, student_id);
    return res.status(201).json({ added: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// U – remove student from course
export async function deleteCourseStudent(req, res) {
  try {
    const { id, studentId } = req.params;

    // student must be on the course
    const existing = await coursesRepository.getCourseStudent(id, studentId);
    if (!existing) {
      return res.status(404).send({ message: 'Student not on course' });
    }

    // remove student from course
    await coursesRepository.deleteCourseStudent(id, studentId);

    // send response
    return res.status(200).json({ removed: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// D – delete course
export async function deleteCourse(req, res) {
  try {
    const { id } = req.params;

    // course must exist
    const existing = await coursesRepository.getCourseById(id);
    if (!existing) {
      return res.status(404).send({ message: 'Course not found' });
    }

    // delete
    await coursesRepository.deleteCourse(id);

    // send response
    return res.status(200).json({ deleted: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}
