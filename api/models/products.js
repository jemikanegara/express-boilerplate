const products = (sequelize, dataTypes) => {
  return sequelize.define("products", {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  });
};
