import * as studentsRepository from '../repositorys/students.repository.js';
import * as housesRepository from '../repositorys/houses.repository.js';

// R – get all students
export async function getAllStudents(req, res) {
  try {
    const students = await studentsRepository.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// R – get one student
export async function getStudentById(req, res) {
  try {
    const student = await studentsRepository.getStudentById(req.params.id);
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// C – create student
export async function postStudent(req, res) {
  try {
    const { name, year, house_id } = req.body;

    // name is required
    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
    }

    // year is required
    if (!year) {
      return res.status(400).send({ message: 'year is required' });
    }

    // house_id is required
    if (!house_id) {
      return res.status(400).send({ message: 'house_id is required' });
    }

    // house must exist
    const house = await housesRepository.getHouseById(house_id);
    if (!house) {
      return res.status(404).send({ message: 'House not found' });
    }

    // student must not already exist (same name)
    const existing = await studentsRepository.getStudentByName(name);
    if (existing) {
      return res.status(409).send({ message: 'Student already exists' });
    }

    // create student
    const student = await studentsRepository.postStudent(name, year, house_id);
    return res.status(201).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// U – update student
export async function putStudent(req, res) {
  try {
    const { id } = req.params;
    const { name, year, house_id } = req.body;

    // name is required
    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
    }

    // year is required
    if (!year) {
      return res.status(400).send({ message: 'year is required' });
    }

    // house_id is required
    if (!house_id) {
      return res.status(400).send({ message: 'house_id is required' });
    }

    // house must exist
    const house = await housesRepository.getHouseById(house_id);
    if (!house) {
      return res.status(404).send({ message: 'House not found' });
    }

    // student must exist
    const existing = await studentsRepository.getStudentById(id);
    if (!existing) {
      return res.status(404).send({ message: 'Student not found' });
    }

    // update student
    const student = await studentsRepository.putStudent(name, year, house_id, id);
    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// D – delete student
export async function deleteStudent(req, res) {
  try {
    const { id } = req.params;

    // student must exist
    const existing = await studentsRepository.getStudentById(id);
    if (!existing) {
      return res.status(404).send({ message: 'Student not found' });
    }

    // delete student
    await studentsRepository.deleteStudent(id);
    return res.status(200).json({ deleted: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}
