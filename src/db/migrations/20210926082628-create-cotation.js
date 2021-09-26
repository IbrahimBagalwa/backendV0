'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cotations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idClass: {
        type: Sequelize.INTEGER
      },
      idCours: {
        type: Sequelize.INTEGER
      },
      idStudent: {
        type: Sequelize.INTEGER
      },
      typeCotation: {
        type: Sequelize.STRING
      },
      cotation: {
        type: Sequelize.FLOAT
      },
      periode: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Cotations');
  }
};