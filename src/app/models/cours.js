'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cours.init({
    nom: DataTypes.STRING,
    cotation: DataTypes.FLOAT,
    idClasse: DataTypes.INTEGER,
    titulaire: DataTypes.STRING,
    heure: DataTypes.INTEGER,
    datastus: DataTypes.INTEGER,
    createdon: DataTypes.INTEGER,
    modifiedby: DataTypes.INTEGER,
    deleteby: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cours',
  });
  return Cours;
};