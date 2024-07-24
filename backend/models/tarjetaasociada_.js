'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TarjetaAsociada extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TarjetaAsociada.init({
    nombre: DataTypes.STRING,
    ultimos_4: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TarjetaAsociada_',
    tableName: 'TarjetaAsociada_',
  });
  return TarjetaAsociada;
};