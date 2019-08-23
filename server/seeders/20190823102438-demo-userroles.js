'use strict';

const userRoles = [{
  id: 1,
  name: 'admin',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: 2,
  name: 'read-only',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: 3,
  name: 'read-write',
  createdAt: new Date(),
  updatedAt: new Date()
}]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserRoles', userRoles, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserRoles', null, {});
  }
};
