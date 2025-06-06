import { Course } from '../model/Model.js';

// Get all courses without filtering by mentorId
async function getAllCourses(req, res) {
    try {
        const courses = await Course.findAll();
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
}

// Get all courses (optionally filter by mentorId)
async function getCourses(req, res) {
    try {
        const mentorId = req.query.mentorId;
        const where = mentorId ? { mentorId } : {};
        const courses = await Course.findAll({ where });
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
}

// Get course by ID
async function getCourseById(req, res) {
    try {
        const id = req.params.id;
        const course = await Course.findByPk(id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.status(200).json(course);
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ message: "Failed to fetch course" });
    }
}

// Create a new course
async function createCourse(req, res) {
    try {
        const { mentorId, status_publish, price, title, desc } = req.body;
        if (!mentorId || !price || !title) {
            return res.status(400).json({ message: "Mentor ID, price, and title are required" });
        }
        const newCourse = await Course.create({
            mentorId,
            status_publish: status_publish ?? false,
            price,
            title,
            desc,
        });
        res.status(201).json(newCourse);
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Failed to create course" });
    }
}

// Update course by ID
async function updateCourse(req, res) {
    try {
        const id = req.params.id;
        const { status_publish, price, title, desc } = req.body;
        const course = await Course.findByPk(id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        course.status_publish = status_publish ?? course.status_publish;
        course.price = price ?? course.price;
        course.title = title ?? course.title;
        course.desc = desc ?? course.desc;

        await course.save();
        res.status(200).json(course);
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ message: "Failed to update course" });
    }
}

// Delete course by ID
async function deleteCourse(req, res) {
    try {
        const id = req.params.id;
        const deleted = await Course.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: "Course not found" });

        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ message: "Failed to delete course" });
    }
}

export {
    getAllCourses,
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
};
