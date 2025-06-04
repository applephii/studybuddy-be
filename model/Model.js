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

//photo
const Photo = db.define("photo", {
    url: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    uploadedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "CASCADE",
    },
});

User.hasMany(Photo, { foreignKey: "userId" });
Photo.belongsTo(User, { foreignKey: "userId" });


db.sync().then(() => console.log("Database is synced..."));

export { User, Note, Task, Place, FavouritePlace, Photo };