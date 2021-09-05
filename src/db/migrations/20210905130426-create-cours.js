'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      cotation: {
        type: Sequelize.FLOAT
      },
      idClasse: {
        type: Sequelize.INTEGER
      },
      titulaire: {
        type: Sequelize.STRING
      },
      heure: {
        type: Sequelize.INTEGER
      },
      datastus: {
        type: Sequelize.INTEGER
      },
      createdon: {
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
    await queryInterface.dropTable('Cours');
  }
};