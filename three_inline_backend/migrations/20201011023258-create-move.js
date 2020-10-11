'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Moves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      game_id: {
        type: Sequelize.INTEGER
      },
      obj: {
        type: Sequelize.JSON
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Moves');
  }
};