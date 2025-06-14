import express from 'express';
import cors from 'cors';
import userRouter from './router/UserRoute.js';
import noteRouter from './router/NoteRoute.js';
import taskRouter from './router/TaskRoute.js';
import favPlaceRouter from './router/FavPlace.js';
import path from 'path';
import favMentorRouter from './router/FavMentor.js';
import Courserouter from './router/Courses.js';

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(noteRouter);
app.use(taskRouter);
app.use(favPlaceRouter);
app.use(favMentorRouter);
app.use(Courserouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

