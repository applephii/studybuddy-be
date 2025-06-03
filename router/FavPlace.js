import express from 'express';
import {
    getPlaces,
    getFavouritePlaces,
    addFavouritePlace,
    removeFavouritePlace
} from '../controller/FavPlaceController.js';

const favPlaceRouter = express.Router();
favPlaceRouter.get('/places', getPlaces);
favPlaceRouter.get('/favourite-places', getFavouritePlaces);
favPlaceRouter.post('/favourite-places', addFavouritePlace);
favPlaceRouter.delete('/favourite-places/:placeId', removeFavouritePlace);

export default favPlaceRouter;