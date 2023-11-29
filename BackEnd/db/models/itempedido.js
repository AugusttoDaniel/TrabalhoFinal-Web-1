"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ItemPedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemPedido.belongsTo(models.Pedido, {
        foreignKey: "PedidoID",
        as: "pedido",
      });
      // Associação muitos-para-um com Produto
      ItemPedido.belongsTo(models.Produto, {
        foreignKey: "ProdutoID",
        as: "produto",
      });
    }
  }
  ItemPedido.init(
    {
      PedidoID: DataTypes.INTEGER,
      ProdutoID: DataTypes.INTEGER,
      Quantidade: DataTypes.INTEGER,
      PrecoUnitario: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "ItemPedido",
    }
  );
  return ItemPedido;
};
