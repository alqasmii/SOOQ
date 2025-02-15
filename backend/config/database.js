const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions:
    process.env.NODE_ENV === "production"
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {}
});

module.exports = sequelize;
