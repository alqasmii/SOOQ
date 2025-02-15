const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Store extends Model {
  static associate(models) {
    Store.belongsTo(models.User, { foreignKey: "ownerId", as: "owner" });
  }
}

Store.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Store",
  }
);

module.exports = Store;
