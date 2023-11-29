'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pedido.belongsTo(models.Cliente, {
        foreignKey: 'ClienteID',
        as: 'cliente'
      });
      Pedido.hasMany(models.ItemPedido, {
        foreignKey: 'PedidoID',
        as: 'itensPedido'
      });
    }
  }
  Pedido.init({
    ClienteID: DataTypes.INTEGER,
    DataPedido: DataTypes.DATE,
    Status: DataTypes.STRING,
    PrecoTotal: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};