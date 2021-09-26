'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      idOption: {
        type: Sequelize.INTEGER
      },
      titulaire: {
        type: Sequelize.STRING
      },
      createdon: {
        type: Sequelize.STRING
      },
      datastatus: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Classes');
  }
};