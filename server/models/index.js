const sequelize = require("../config/db");
const Game = require("./Game");
const User = require("./User"); // Import the User model

const db = {};

db.Sequelize = require("sequelize");
db.sequelize = sequelize;

db.Game = Game(sequelize, db.Sequelize.DataTypes);
db.User = User(sequelize, db.Sequelize.DataTypes); // Initialize the User model

//setting up associations
if (db.Game.associate) {
  db.Game.associate(db);
}

if (db.User.associate) {
  db.User.associate(db);
}

module.exports = db;
