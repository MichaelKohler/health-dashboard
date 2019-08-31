'use strict';

const bcrypt = require('bcrypt');
const securityConfig = require('../config/security-config');

const users = [{
  id: 1,
  email: 'admin@example.com',
  // eslint-disable-next-line no-sync
  password: bcrypt.hashSync('admin', bcrypt.genSaltSync(securityConfig.saltRounds)),
  createdAt: new Date(),
  updatedAt: new Date(),
}, {
  id: 2,
  email: 'readonly@example.com',
  // eslint-disable-next-line no-sync
  password: bcrypt.hashSync('readonly', bcrypt.genSaltSync(securityConfig.saltRounds)),
  createdAt: new Date(),
  updatedAt: new Date(),
}, {
  id: 3,
  email: 'readwrite@example.com',
  // eslint-disable-next-line no-sync
  password: bcrypt.hashSync('readwrite', bcrypt.genSaltSync(securityConfig.saltRounds)),
  createdAt: new Date(),
  updatedAt: new Date(),
}];

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', users, {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
