import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser
} from '../controller/UserController.js';

const userRouter = express.Router();
userRouter.get('/users', getUsers);
userRouter.post('/users', createUser);
userRouter.put('/users/:id', updateUser);
userRouter.delete('/users/:id', deleteUser);
userRouter.get('/users/:id', getUserById);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);

export default userRouter;