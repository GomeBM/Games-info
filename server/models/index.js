const sequelize = require("../config/db");
const Game = require("./game");

const db = {};

db.Sequelize = require("sequelize");
db.sequelize = sequelize;

db.Game = Game(sequelize, db.Sequelize.DataTypes);

module.exports = db;
