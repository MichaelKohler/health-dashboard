'use strict';

module.exports = {
  jwtSecret: 'this-is-very-secret',
  saltRounds: 10,
  tokenExpirationInMS: 72 * 60 * 60 * 1000,
};
