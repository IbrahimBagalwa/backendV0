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
      // models.Classes.hasMany(Cours, { as: "Cours", foreignKey: "ClassId" });
      Cours.belongsTo(models.Classes, {
        as:'Class', 
        foreignKey: "ClassId", 
        targetKey:'id'
      });
    }
  };
  Cours.init({
    nom: DataTypes.STRING,
    titulaire: DataTypes.STRING,
    ponderation: DataTypes.INTEGER,
    ClassId: DataTypes.INTEGER,
    heure: DataTypes.INTEGER,
    createdon: DataTypes.STRING,
    datastatus: DataTypes.INTEGER,
    modifiedby: DataTypes.INTEGER,
    deleteby: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cours',
  });
  return Cours;
};