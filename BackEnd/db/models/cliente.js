"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cliente.hasMany(models.Pedido, {
        foreignKey: "ClienteID",
        as: "pedidos",
      });
    }
  }
  Cliente.init(
    {
      Nome: DataTypes.STRING,
      Email: DataTypes.STRING,
      Endereco: DataTypes.TEXT,
      Telefone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cliente",
    }
  );
  return Cliente;
};
