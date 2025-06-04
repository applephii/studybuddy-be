import express from 'express';
import cors from 'cors';
import userRouter from './router/UserRoute.js';
import noteRouter from './router/NoteRoute.js';
import taskRouter from './router/TaskRoute.js';
import favPlaceRouter from './router/FavPlace.js';
import path from 'path';

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(noteRouter);
app.use(taskRouter);
app.use(favPlaceRouter);
app.use("/upload", express.static(path.join(__dirname, "upload")));

app.listen(3000, '0.0.0.0', () => {
    console.log("Server is connected...");
});