import * as coursesRepository from '../repositorys/courses.repository.js';
import * as teachersRepository from '../repositorys/teachers.repository.js';
import * as studentsRepository from '../repositorys/students.repository.js';

export async function getAllCourses(req, res) {
  try {
    const courses = await coursesRepository.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

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

export async function postCourse(req, res) {
  try {
    const { name, teacher_id } = req.body;

    // 1) name skal være med
    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
    }

    // 2) teacher_id skal være med
    if (!teacher_id) {
      return res.status(400).send({ message: 'teacher_id is required' });
    }

    // 3) læreren skal findes i databasen
    const teacher = await teachersRepository.getTeacherById(teacher_id);
    if (!teacher) {
      return res.status(404).send({ message: 'Teacher not found' });
    }

    // 4) kurset må ikke findes i forvejen (samme navn)
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

export async function putCourseTeacher(req, res) {
  try {
    // Fra URL: /courses/1/teacher  →  id = 1
    // Fra body: { "teacher_id": 2 }
    const { id } = req.params;
    const { teacher_id } = req.body;

    // 1) teacher_id skal være med
    if (!teacher_id) {
      return res.status(400).send({ message: 'teacher_id is required' });
    }

    // 2) kurset skal findes
    const existing = await coursesRepository.getCourseById(id);
    if (!existing) {
      return res.status(404).send({ message: 'Course not found' });
    }

    // 3) læreren skal findes
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

export async function postCourseStudent(req, res) {
  try {
    // Fra URL: /courses/1/students  →  id = 1
    // Fra body: { "student_id": 4 }
    const { id } = req.params;
    const { student_id } = req.body;

    // 1) student_id skal være med
    if (!student_id) {
      return res.status(400).send({ message: 'student_id is required' });
    }

    // 2) kurset skal findes
    const course = await coursesRepository.getCourseById(id);
    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }

    // 3) eleven skal findes
    const student = await studentsRepository.getStudentById(student_id);
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }

    // 4) eleven må ikke være på kurset i forvejen
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

export async function deleteCourseStudent(req, res) {
  try {
    // Fra URL: /courses/1/students/2  →  id = 1, studentId = 2
    const { id, studentId } = req.params;

    // 1) er eleven på kurset?
    const existing = await coursesRepository.getCourseStudent(id, studentId);
    if (!existing) {
      return res.status(404).send({ message: 'Student not on course' });
    }

    // 2) fjern
    await coursesRepository.deleteCourseStudent(id, studentId);

    // 3) svar
    return res.status(200).json({ removed: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

export async function deleteCourse(req, res) {
  try {
    const { id } = req.params;

    // 1) findes kurset?
    const existing = await coursesRepository.getCourseById(id);
    if (!existing) {
      return res.status(404).send({ message: 'Course not found' });
    }

    // 2) slet
    await coursesRepository.deleteCourse(id);

    // 3) svar
    return res.status(200).json({ deleted: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}
