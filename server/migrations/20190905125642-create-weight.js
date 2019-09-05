'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Weights', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    weight: {
      type: Sequelize.FLOAT,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => {
    return queryInterface.dropTable('Weights');
  },
};
