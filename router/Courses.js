import express from 'express';
import {
    getAllCourses,
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
} from '../controller/CoursesController.js';

const Courserouter = express.Router();

Courserouter.get('/allcourses', getAllCourses);
Courserouter.get('/courses', getCourses);
Courserouter.get('/courses/:id', getCourseById);
Courserouter.post('/courses', createCourse);
Courserouter.put('/courses/:id', updateCourse);
Courserouter.delete('/courses/:id', deleteCourse);

export default Courserouter;
