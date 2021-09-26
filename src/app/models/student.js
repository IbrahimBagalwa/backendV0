'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Student.init({
    nom: DataTypes.STRING,
    postnom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    sexe: DataTypes.STRING,
    age: DataTypes.INTEGER,
    etatCivil: DataTypes.STRING,
    avatar: DataTypes.STRING,
    idClass: DataTypes.INTEGER,
    nomCompletTutaire: DataTypes.STRING,
    emailTutaire: DataTypes.STRING,
    phoneTutaire: DataTypes.STRING,
    datastatus: DataTypes.INTEGER,
    createdon: DataTypes.STRING,
    modifiedby: DataTypes.INTEGER,
    deleteby: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};