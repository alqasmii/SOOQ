const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class User extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false }
      },
      {
        sequelize,
        modelName: "User",
        tableName: "Users"
      }
    );
  }

  static associate(models) {
    if (models.Store) {
      this.hasOne(models.Store, { foreignKey: "ownerId", as: "store" });
    }
  }
}

module.exports = User;
