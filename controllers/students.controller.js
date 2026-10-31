import * as studentsRepository from '../repositorys/students.repository.js';
import * as housesRepository from '../repositorys/houses.repository.js';

// R – GET /students
export async function getAllStudents(req, res) {
  try {
    const students = await studentsRepository.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// R – GET /students/:id
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

// C – POST /students
export async function postStudent(req, res) {
  try {
    const { name, year, house_id } = req.body;

    // 1) name skal være med
    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
    }

    // 2) year skal være med
    if (!year) {
      return res.status(400).send({ message: 'year is required' });
    }

    // 3) house_id skal være med
    if (!house_id) {
      return res.status(400).send({ message: 'house_id is required' });
    }

    // 4) huset skal findes
    const house = await housesRepository.getHouseById(house_id);
    if (!house) {
      return res.status(404).send({ message: 'House not found' });
    }

    // 5) eleven må ikke findes i forvejen
    const existing = await studentsRepository.getStudentByName(name);
    if (existing) {
      return res.status(409).send({ message: 'Student already exists' });
    }

    // 6) opret elev
    const student = await studentsRepository.postStudent(name, year, house_id);
    return res.status(201).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// U – PUT /students/:id
export async function putStudent(req, res) {
  try {
    const { id } = req.params;
    const { name, year, house_id } = req.body;

    // 1) name skal være med
    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
    }

    // 2) year skal være med
    if (!year) {
      return res.status(400).send({ message: 'year is required' });
    }

    // 3) house_id skal være med
    if (!house_id) {
      return res.status(400).send({ message: 'house_id is required' });
    }

    // 4) huset skal findes
    const house = await housesRepository.getHouseById(house_id);
    if (!house) {
      return res.status(404).send({ message: 'House not found' });
    }

    // 5) eleven skal findes
    const existing = await studentsRepository.getStudentById(id);
    if (!existing) {
      return res.status(404).send({ message: 'Student not found' });
    }

    // 6) opdater elev
    const student = await studentsRepository.putStudent(name, year, house_id, id);
    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// D – DELETE /students/:id
export async function deleteStudent(req, res) {
  try {
    const { id } = req.params;

    // 1) eleven skal findes
    const existing = await studentsRepository.getStudentById(id);
    if (!existing) {
      return res.status(404).send({ message: 'Student not found' });
    }

    // 2) slet elev
    await studentsRepository.deleteStudent(id);
    return res.status(200).json({ deleted: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}
