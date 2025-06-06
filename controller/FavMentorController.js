import { FavMentor, Mentor } from '../model/Model.js';

//get all mentor
async function getMentors(req, res) {
    try {
        const mentors = await Mentor.findAll();
        res.status(200).json(mentors);
    } catch (error) {
        console.error("Error fetching Mentor:", error);
        res.status(500).json({ message: "Failed to fetch Mentors" });
    }
}

//get favourite mentor of a user
async function getFavouriteMentors(req, res) {
    try {
        const userId = req.query.userId;
        const favourite = await FavMentor.findAll({
            where: { userId },
            include: [{ model: Mentor, as: "mentor" }],
        });

        const favouriteMentors = favourite.map((fav) => fav.mentor)
        res.status(200).json(favouriteMentors);
    } catch (error) {
        console.error("Error fetching Connected Mentors:", error);
        res.status(500).json({ message: "Failed to fetch Connected Mentor" });
    }
}

//add to favourites
async function addFavouriteMentor(req, res) {
    try {
        const { userId, mentorId } = req.body;
        if (!userId || !mentorId) {
            return res.status(400).json({ message: "User ID and Mentor ID are required" });
        }

        const existingFavourite = await FavMentor.findOne({
            where: { userId, mentorId },
        });
        if (existingFavourite) {
            return res.status(400).json({ message: "You already connected to this Mentor" });
        }

        const favouriteMentor= await FavMentor.create({ userId, mentorId });
        res.status(201).json({
            success: true,
            message: "Connect to Mentor successfully",
            data: favouriteMentor
        });
    } catch (error) {
        console.error("Error Connect to Mentor:", error);
        res.status(500).json({ message: "Failed Connect to Mentor" });
    }
}

//remove mentor from favourites
async function removeFavouriteMentor(req, res) {
    try {
        const mentorId = parseInt(req.params.mentorId);
        const userId = parseInt(req.query.userId);
        if (!userId || !mentorId) {
            return res.status(400).json({ message: "User ID and Mentor ID are required" });
        }

        const deletedRows = await FavMentor.destroy({
            where: { userId, mentorId },
        });
        if (deletedRows === 0) {
            return res.status(404).json({ message: "Connected Mentors not found" });
        }

        res.status(200).json({
            success: true,
            message: "Remove connection to the Mentor successfully"
        });
    } catch (error) {
        console.error("Error removing connection to the Mentor:", error);
        res.status(500).json({ message: "Failed to remove connection to the Mentor" });
    }
}

export {
    getMentors,
    getFavouriteMentors,
    addFavouriteMentor,
    removeFavouriteMentor
};