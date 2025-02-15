"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

// Load models dynamically
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.endsWith(".js"))
  .forEach((file) => {
    console.log(`Loading model: ${file}`); // Debug log

    const model = require(path.join(__dirname, file));
    
    if (model.init) {
      model.init(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }
  });

// Associate models if needed
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Debugging logs
console.log("✅ Loaded Models:", Object.keys(db));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
