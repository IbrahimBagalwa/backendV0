'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      postnom: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      sexe: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      etatCivil: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      idClass: {
        type: Sequelize.INTEGER
      },
      nomCompletTutaire: {
        type: Sequelize.STRING
      },
      emailTutaire: {
        type: Sequelize.STRING
      },
      phoneTutaire: {
        type: Sequelize.STRING
      },
      datastatus: {
        type: Sequelize.INTEGER
      },
      createdon: {
        type: Sequelize.STRING
      },
      modifiedby: {
        type: Sequelize.INTEGER
      },
      deleteby: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Students');
  }
};