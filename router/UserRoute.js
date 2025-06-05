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
    upload,
    deletePhoto
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
userRouter.delete('/users/:id/delete-photo', deletePhoto);

export default userRouter;