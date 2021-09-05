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
      models.Classes.hasMany(Cours, { as: "Cours", foreignKey: "idClasse" });
      Cours.belongsTo(models.Classes);
    }
  };
  Cours.init({
    nom: DataTypes.STRING,
    cotation: DataTypes.FLOAT,
    idClasse: DataTypes.INTEGER,
    titulaire: DataTypes.STRING,
    heure: DataTypes.INTEGER,
    datastatus: DataTypes.INTEGER,
    createdon: DataTypes.STRING,
    modifiedby: DataTypes.INTEGER,
    deletedby: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cours',
  });
  return Cours;
};