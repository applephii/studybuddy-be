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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.listen(3000, '0.0.0.0', () => {
//     console.log("Server is connected...");
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
