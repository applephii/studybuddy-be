import { FavouritePlace, Place } from '../model/Model.js';

//get all places
async function getPlaces(req, res) {
    try {
        const places = await Place.findAll();
        res.status(200).json(places);
    } catch (error) {
        console.error("Error fetching places:", error);
        res.status(500).json({ message: "Failed to fetch places" });
    }
}

//get favourite places of a user
async function getFavouritePlaces(req, res) {
    try {
        const userId = req.query.userId;
        const favourite = await FavouritePlace.findAll({
            where: { userId },
            include: [{ model: Place }],
        });

        const favouritePlaces = favourite.map((fav) => fav.Place)
        res.status(200).json(favouritePlaces);
    } catch (error) {
        console.error("Error fetching favourite places:", error);
        res.status(500).json({ message: "Failed to fetch favourite places" });
    }
}

//add a place to favourites
async function addFavouritePlace(req, res) {
    try {
        const { userId, placeId } = req.body;
        if (!userId || !placeId) {
            return res.status(400).json({ message: "User ID and Place ID are required" });
        }

        const existingFavourite = await FavouritePlace.findOne({
            where: { userId, placeId },
        });
        if (existingFavourite) {
            return res.status(400).json({ message: "This place is already in your favourites" });
        }

        const favouritePlace = await FavouritePlace.create({ userId, placeId });
        res.status(201).json({
            success: true,
            message: "Favourite place added successfully",
            data: favourite
        });
    } catch (error) {
        console.error("Error adding favourite place:", error);
        res.status(500).json({ message: "Failed to add favourite place" });
    }
}

//remove a place from favourites
async function removeFavouritePlace(req, res) {
    try {
        const placeId = req.params.placeId;
        const userId = req.query.userId;

        if (!userId || !placeId) {
            return res.status(400).json({ message: "User ID and Place ID are required" });
        }

        const deletedRows = await FavouritePlace.destroy({
            where: { userId, placeId },
        });
        if (deletedRows === 0) {
            return res.status(404).json({ message: "Favourite place not found" });
        }

        res.status(200).json({
            success: true,
            message: "Favourite place removed successfully"
        });
    } catch (error) {
        console.error("Error removing favourite place:", error);
        res.status(500).json({ message: "Failed to remove favourite place" });
    }
}

export {
    getPlaces,
    getFavouritePlaces,
    addFavouritePlace,
    removeFavouritePlace
};