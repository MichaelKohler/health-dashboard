'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'UserUserRole',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      UserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      UserRoleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    }
  ),

  down: (queryInterface) => queryInterface.dropTable('UserUserRole'),
};
