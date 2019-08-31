'use strict';

const userRolesMapping = [{
  id: 1,
  UserId: 1,
  UserRoleId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}, {
  id: 2,
  UserId: 2,
  UserRoleId: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
}, {
  id: 3,
  UserId: 3,
  UserRoleId: 3,
  createdAt: new Date(),
  updatedAt: new Date(),
}];

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('UserUserRole', userRolesMapping, {}),

  down: (queryInterface) => queryInterface.bulkDelete('UserUserRole', null, {}),
};
