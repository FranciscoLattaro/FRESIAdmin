'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pedido_shopify_ extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pedido_shopify_.init({
    id: DataTypes.STRING,
    detalle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pedido_shopify_',
    tableName: 'pedido_shopify_'
  });
  return pedido_shopify_;
};