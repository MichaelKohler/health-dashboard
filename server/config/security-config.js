'use strict';

module.exports = {
  jwtSecret: process.env.HEALTH_JWT_SECRET || 'this-is-very-secret',
  saltRounds: process.env.HEALTH_SALT_ROUNDS || 10,
  tokenExpirationInMS: process.env.HEALTH_TOKEN_EXPIRATION_MS || 72 * 60 * 60 * 1000,
};
