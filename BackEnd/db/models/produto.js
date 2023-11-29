'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Produto.belongsToMany(models.Pedido, {
      //   through: 'ItemPedido',
      //   foreignKey: 'ProdutoID',
      //   as: 'pedidos'
      // });
      
    }
  }
  Produto.init({
    Categoria: DataTypes.STRING,
    Nome: DataTypes.STRING,
    Descricao: DataTypes.TEXT,
    Preco: DataTypes.DECIMAL,
    Estoque: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Produto',
  });
  return Produto;
};