const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class User extends Model {
  static associate(models) {
    User.hasOne(models.Store, { foreignKey: "ownerId", as: "store" });
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
