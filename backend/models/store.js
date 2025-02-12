module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define("Store", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" }
    },
    customURL: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Store.associate = (models) => {
    Store.belongsTo(models.User, { foreignKey: "ownerId" });
  };

  return Store;
};
