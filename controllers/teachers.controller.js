import * as teachersRepository from '../repositorys/teachers.repository.js';
import * as housesRepository from '../repositorys/houses.repository.js';

export async function getAllTeachers(req, res) {
  try {
    const teachers = await teachersRepository.getAllTeachers();
    res.status(200).json(teachers);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}

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

export async function postTeacher(req, res) {
  try {
    const { name, house_id } = req.body;

    // 1) name skal være med
    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
    }

    // 2) house_id skal være med
    if (!house_id) {
      return res.status(400).send({ message: 'house_id is required' });
    }

    // 3) huset skal findes i databasen
    const house = await housesRepository.getHouseById(house_id);
    if (!house) {
      return res.status(404).send({ message: 'House not found' });
    }

    // 4) læreren må ikke findes i forvejen (samme navn)
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

export async function putTeacher(req, res) {
  try {
    // Fra URL: /teachers/2  →  id = 2
    // Fra body: { "name": "...", "house_id": 1 }
    const { id } = req.params;
    const { name, house_id } = req.body;

    // 1) name skal være med
    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
    }

    // 2) house_id skal være med
    if (!house_id) {
      return res.status(400).send({ message: 'house_id is required' });
    }

    // 3) huset skal findes
    const house = await housesRepository.getHouseById(house_id);
    if (!house) {
      return res.status(404).send({ message: 'House not found' });
    }

    // 4) læreren skal findes (det ekstra ift. POST)
    const existing = await teachersRepository.getTeacherById(id);
    if (!existing) {
      return res.status(404).send({ message: 'Teacher not found' });
    }

    // 5) opdater i databasen
    const teacher = await teachersRepository.putTeacher(name, house_id, id);
    return res.status(200).json(teacher);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}


export async function deleteTeacher(req, res) {
  try {
    const { id } = req.params; // fra URL: /teachers/2

    // 1) findes læreren?
    const existing = await teachersRepository.getTeacherById(id);
    if (!existing) {
      return res.status(404).send({ message: 'Teacher not found' });
    }

    // 2) slet
    await teachersRepository.deleteTeacher(id);

    // 3) svar
    return res.status(200).json({ deleted: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error connecting to database' });
  }
}