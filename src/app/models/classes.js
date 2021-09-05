'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    
    }
  };
  Classes.init({
    nom: DataTypes.STRING,
    titulaire: DataTypes.STRING,
    createdon: DataTypes.STRING,
    datastatus: DataTypes.INTEGER,
    modifiedby: DataTypes.INTEGER,
    deleteby: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Classes',
  });
  return Classes;
};