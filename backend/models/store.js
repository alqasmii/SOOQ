const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Store extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: { type: DataTypes.STRING, allowNull: false },
        ownerId: { type: DataTypes.INTEGER, allowNull: false },
        customURL: { type: DataTypes.STRING, unique: true }
      },
      {
        sequelize,
        modelName: "Store",
        tableName: "Stores"
      }
    );
  }

  static associate(models) {
    if (models.User) {
      this.belongsTo(models.User, { foreignKey: "ownerId", as: "owner" });
    }
  }
}

module.exports = Store;
