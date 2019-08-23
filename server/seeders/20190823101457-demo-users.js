'use strict';

const bcrypt = require('bcrypt');
const securityConfig = require('../config/security-config');

const users = [{
  id: 1,
  email: 'admin@example.com',
  password: bcrypt.hashSync('admin', bcrypt.genSaltSync(securityConfig.saltRounds)),
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: 2,
  email: 'readonly@example.com',
  password: bcrypt.hashSync('readonly', bcrypt.genSaltSync(securityConfig.saltRounds)),
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: 3,
  email: 'readwrite@example.com',
  password: bcrypt.hashSync('readwrite', bcrypt.genSaltSync(securityConfig.saltRounds)),
  createdAt: new Date(),
  updatedAt: new Date()
}];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
