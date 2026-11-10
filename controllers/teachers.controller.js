import * as teachersRepository from '../repositorys/teachers.repository.js';
import * as housesRepository from '../repositorys/houses.repository.js';

// R – get all teachers
export async function getAllTeachers(req, res) {
  try {
    const teachers = await teachersRepository.getAllTeachers();
    res.status(200).json(teachers);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// R – get one teacher
export async function getTeacherById(req, res) {
  try {
    const teacher = await teachersRepository.getTeacherById(req.params.id);
    if (!teacher) {
      return res.status(404).send({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// C – create teacher
export async function postTeacher(req, res) {
  try {
    const { name, house_id } = req.body;

    // name is required
    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
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

    // teacher must not already exist (same name)
    const existing = await teachersRepository.getTeacherByName(name);
    if (existing) {
      return res.status(409).send({ message: 'Teacher already exists' });
    }

    const teacher = await teachersRepository.postTeacher(name, house_id);
    return res.status(201).json(teacher);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

// U – update teacher
export async function putTeacher(req, res) {
  try {
    const { id } = req.params;
    const { name, house_id } = req.body;

    // name is required
    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
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

    // teacher must exist
    const existing = await teachersRepository.getTeacherById(id);
    if (!existing) {
      return res.status(404).send({ message: 'Teacher not found' });
    }

    // update in the database
    const teacher = await teachersRepository.putTeacher(name, house_id, id);
    return res.status(200).json(teacher);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}


// D – delete teacher
export async function deleteTeacher(req, res) {
  try {
    const { id } = req.params;

    // teacher must exist
    const existing = await teachersRepository.getTeacherById(id);
    if (!existing) {
      return res.status(404).send({ message: 'Teacher not found' });
    }

    // delete
    await teachersRepository.deleteTeacher(id);

    // send response
    return res.status(200).json({ deleted: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}