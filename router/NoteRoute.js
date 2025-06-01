import express from 'express';
import {
    createNote,
    getNote,
    updateNote,
    deleteNote,
    getNote1
} from '../controller/NoteController.js';

const noteRouter = express.Router();
noteRouter.get('/notes', getNote);
noteRouter.post('/notes', createNote);
noteRouter.put('/notes/:id_note', updateNote);
noteRouter.delete('/notes/:id_note', deleteNote);
noteRouter.get('/notes/:id_note', getNote1);

export default noteRouter;