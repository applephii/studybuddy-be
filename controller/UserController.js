import { User } from "../model/Model.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import multer from "multer";
import path from "path";
import fs from "fs";

//photo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const upload_dir = "./uploads";
        if (!fs.existsSync(upload_dir)) {
            fs.mkdirSync(upload_dir);
        }
        cb(null, upload_dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, req.params.id + ext);
    },
});
const upload = multer({ storage });

async function UploadPhoto(req, res) {
    try {
        const userId = req.params.id;

        if (!req.file) {
            return res.status(400).json({ status: "Error", message: "No file uploaded" });
        }

        const urlPict = `/uploads/${req.file.filename}`;


        await User.update({ photo_url: urlPict }, { where: { id: userId } });

        res.status(200).json({ status: "Success", message: "Photo uploaded", photo_url });
    } catch (error) {
        res.status(error.statusCode || 500).json({ status: "Error", message: error.message });
    }
}

async function deletePhoto(req, res) {
    const userId = req.params.id;

    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        if (user.photo_url) {
            const filePath = path.join('.', user.photo_url);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await User.update({ photo_url: null }, { where: { id: userId } });

        res.status(200).json({ status: "Success", message: "Photo deleted successfully" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ status: "Error", message: error.message });
    }
}


//Get all users
async function getUsers(req, res) {
    try {
        const users = await User.findAll();
        res.status(200).json({ status: "Success", message: "Retrieved users", data: users });
    } catch (error) {
        res.status(error.statusCode || 500).json({ status: "Error", message: error.message });
    }
}

//Get user by ID
async function getUserById(req, res) {
    try {
        const user = await User.findOne({ where: { id: req.params.id }, attributes: { exclude: ['password'] } });
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }
        res.status(200).json({ status: "Success", message: "Retrieved user", data: user });
    } catch (error) {
        res.status(error.statusCode || 500).json({ status: "Error", message: error.message });
    }
}

//Create a new user
async function createUser(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ status: "Error", message: "All fields are required" });
    }

    try {
        const existingEmail = await User.findOne({ where: { email } });
        const existingUsername = await User.findOne({ where: { username } });
        const errors = {};
        if (existingEmail) errors.email = 'Email is already in use';
        if (existingUsername) errors.username = 'Username is already taken';
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            // photo_url: photo_url || null,
        });
        res.status(201).json({ status: "Success", message: "User created successfully", data: newUser });
    } catch (error) {
        res.status(error.statusCode || 500).json({ status: "Error", message: error.message });
    }
}

//Update user by ID
async function updateUser(req, res) {
    const { username, email, password, photo_url  } = req.body;
    if (!username || !email) {
        return res.status(400).json({ status: "Error", message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        const existingUsername = await User.findOne({
            where: {
                username,
                id: { [Op.ne]: req.params.id }
            }
        });

        const existingEmail = await User.findOne({
            where: {
                email,
                id: { [Op.ne]: req.params.id }
            }
        });

        const errors = {};
        if (existingUsername) errors.username = 'Username is already taken';
        if (existingEmail) errors.email = 'Email is already in use';

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (photo_url !== undefined) updateData.photo_url = photo_url;
        if (password && password.trim() !== "") {
            const isSamePass = await bcrypt.compare(password, user.password);
            if (!isSamePass) {
                updateData.password = await bcrypt.hash(password, 5);
            }
        }

        await User.update(updateData, { where: { id: req.params.id } });

        res.status(200).json({ status: "Success", message: "User updated successfully" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ status: "Error", message: error.message });
    }
}

//Delete user by ID
async function deleteUser(req, res) {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        await User.destroy({ where: { id: req.params.id } });
        res.status(200).json({ status: "Success", message: "User deleted successfully" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ status: "Error", message: error.message });
    }
}

//login user
async function loginUser(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ status: "Error", message: "Username and password are required" });
    }

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: "Error", message: "Invalid password" });
        }

        res.status(200).json({ status: "Success", message: "Login successful", data: user });
    } catch (error) {
        res.status(error.statusCode || 500).json({ status: "Error", message: error.message });
    }
}

//logout user
async function logoutUser(req, res) {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ status: "Error", message: "User ID is required" });
    }

    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        res.status(200).json({ status: "Success", message: "Logout successful" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ status: "Error", message: error.message });
    }
}

export {
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
};

