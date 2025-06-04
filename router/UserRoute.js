import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    UploadPhoto,
    upload
} from '../controller/UserController.js';

const userRouter = express.Router();
userRouter.get('/users', getUsers);
userRouter.post('/users', createUser);
userRouter.put('/users/:id', updateUser);
userRouter.delete('/users/:id', deleteUser);
userRouter.get('/users/:id', getUserById);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);

userRouter.post("/users/:id/upload-photo", upload.single("photo"), UploadPhoto);

export default userRouter;