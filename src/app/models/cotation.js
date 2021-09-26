'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cotation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cotation.init({
    idClass: DataTypes.INTEGER,
    idCours: DataTypes.INTEGER,
    idStudent: DataTypes.INTEGER,
    typeCotation: DataTypes.STRING,
    cotation: DataTypes.FLOAT,
    periode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cotation',
  });
  return Cotation;
};