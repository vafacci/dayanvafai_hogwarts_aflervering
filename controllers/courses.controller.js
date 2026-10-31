// TODO: courses controller – du bygger den her

import * as coursesRepository from '../repositorys/courses.repository.js';


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
        return res.status(404).send({ message: 'course not found' });
      }
      res.status(200).json(course);
    } catch (error) {
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