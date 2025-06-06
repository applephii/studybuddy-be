import express from 'express';
import {
    getMentors,
    getFavouriteMentors,
    addFavouriteMentor,
    removeFavouriteMentor
} from '../controller/FavMentorController.js';

const favMentorRouter = express.Router();
favMentorRouter.get('/mentors', getMentors);
favMentorRouter.get('/connected-mentors', getFavouriteMentors);
favMentorRouter.post('/connected-mentors', addFavouriteMentor);
favMentorRouter.delete('/connected-mentors/:mentorId', removeFavouriteMentor);

export default favMentorRouter;