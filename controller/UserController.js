import { User } from "../model/Model.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

//Get all users
async function getUsers(req, res) {
    try {
        const users = await User.findAll();
        res.statsus(200).json({ status: "Success", message: "Retrieved users", data: users });
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
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { username },
                    { email }
                ]
            }
        });
        if (existingUser) {
            return res.status(409).json({ status: "Error", message: "Username or email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        res.status(201).json({ status: "Success", message: "User created successfully", data: newUser });
    } catch (error) {
        res.status(error.statusCode || 500).json({ status: "Error", message: error.message });
    }
}

//Update user by ID
async function updateUser(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email ) {
        return res.status(400).json({ status: "Error", message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        const updateData = { username, email };
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
    logoutUser
};