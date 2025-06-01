import express from 'express';
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById
} from '../controller/TaskController.js';

const taskRouter = express.Router();
taskRouter.get('/tasks', getTasks);
taskRouter.post('/tasks', createTask);
taskRouter.put('/tasks/:id_task', updateTask);
taskRouter.delete('/tasks/:id_task', deleteTask);
taskRouter.get('/tasks/:id_task', getTaskById);

export default taskRouter;