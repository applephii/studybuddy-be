import { Task } from '../model/Model.js';

// read data
async function getTasks(req, res) {
    try {
        const userId = req.query.userId;
        const tasks = await Task.findAll({ where: { userId } });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
}

// create data
async function createTask(req, res) {
    try {
        const userId = req.query.userId;
        await Task.create({ ...req.body, userId });

        res.status(201).json({
            success: true,
            message: "Task is successfully added!"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to create task" });
    }
}

// update data
async function updateTask(req, res) {
    try {
        const id = req.params.id_task;
        const userId = req.query.userId;
        const [updatedRows] = await Task.update(req.body, {
            where: { id, userId },
        });
        if (updatedRows === 0) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        res.status(200).json({
            success: true,
            message: "Task is successfully updated!"
        });
    } catch (error) {
        console.log(error.message);
    }
}

// delete data
async function deleteTask(req, res) {
    try {
        const id = req.params.id_task;
        const userId = req.query.userId;
        const deletedRows = await Task.destroy({ where: { id, userId } });
        if (deletedRows === 0) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        res.status(200).json({
            success: true,
            message: "Task is successfully deleted!"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to delete task" });
    }
}

// get task by ID
async function getTaskById(req, res) {
    try {
        const id = req.params.id_task;
        const userId = req.query.userId;
        const task = await Task.findOne({ where: { id, userId } });
        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        res.status(200).json(task);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to fetch task" });
    }
}

export {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById
};