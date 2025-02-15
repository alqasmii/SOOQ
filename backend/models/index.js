"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

// Read all model files (except index.js)
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.endsWith(".js"))
  .forEach((file) => {
    // Supports both CommonJS and ES6 exports
    const modelFile = require(path.join(__dirname, file));
    const model = modelFile.default ? modelFile.default : modelFile;
    if (typeof model.init === "function") {
      model.init(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }
  });

// Run associations if they exist
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
