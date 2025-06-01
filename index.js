import express from 'express';
import cors from 'cors';
import userRouter from './router/UserRoute.js';
import noteRouter from './router/NoteRoute.js';
import taskRouter from './router/TaskRoute.js';
import favPlaceRouter from './router/FavPlace.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(noteRouter);
app.use(taskRouter);
app.use(favPlaceRouter);

app.listen(3000, () => {
    console.log("Server is connected...");
});