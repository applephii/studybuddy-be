import Sequelize from "sequelize";
import db from "../config/Database.js";

// User model
const User = db.define("user", {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: Sequelize.STRING,
    photo_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
});

// Note model
const Note = db.define("note", {
    author: Sequelize.STRING,
    title: Sequelize.STRING,
    notes: Sequelize.TEXT,
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "CASCADE",
    },
});

// Task model
const Task = db.define("task", {
    title: Sequelize.STRING,
    task: Sequelize.TEXT,
    statusTask: Sequelize.STRING,
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "CASCADE",
    },
});

User.hasMany(Note, { foreignKey: "userId" });
Note.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

// Place model
const Place = db.define("place", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: Sequelize.STRING,
    latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    description: Sequelize.TEXT,
});

// FavouritePlace model (join table)
const FavouritePlace = db.define("favourite_place", {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: User, key: "id" },
        onDelete: "CASCADE",
    },
    placeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: Place, key: "id" },
        onDelete: "CASCADE",
    },
});

// Associations
User.hasMany(FavouritePlace, { foreignKey: "userId" });
FavouritePlace.belongsTo(User, { foreignKey: "userId" });

Place.hasMany(FavouritePlace, { foreignKey: "placeId" });
FavouritePlace.belongsTo(Place, { foreignKey: "placeId" });

//Mentor
const Mentor = db.define("mentor", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    expertise: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    timezone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    timezoneOffset: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    imgUrl: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

// FavMentor
const FavMentor = db.define("fav_mentor", {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: User, key: "id" },
        onDelete: "CASCADE",
    },
    mentorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: Mentor, key: "id" },
        onDelete: "CASCADE",
    },
});

const Course = db.define("course", {
    mentorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: Mentor, key: "id" },
        onDelete: "CASCADE",
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    desc: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    status_publish: {
        type: Sequelize.ENUM("coming soon", "published"),
        allowNull: false,
        defaultValue: "coming soon",
    },
});


// Associations
User.hasMany(FavMentor, { foreignKey: "userId" });
FavMentor.belongsTo(User, { foreignKey: "userId" });

Mentor.hasMany(FavMentor, { foreignKey: "mentorId" });
FavMentor.belongsTo(Mentor, { foreignKey: "mentorId" });

Mentor.hasMany(Course, { foreignKey: "mentorId" });
Course.belongsTo(Mentor, { foreignKey: "mentorId" });

db.sync().then(() => console.log("Database is synced..."));

export { User, Note, Task, Place, FavouritePlace, Mentor, FavMentor, Course };