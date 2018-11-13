const customers = (sequelize, DataTypes) => {
  return sequelize.define("customers", {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  });
};

module.exports = customers;
