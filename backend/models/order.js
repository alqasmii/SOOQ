module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Stores", key: "id" }
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Store, { foreignKey: "storeId" });
  };

  return Order;
};
