'use strict';

module.exports = {
  jwtSecret: process.env.HEALTH_JWT_SECRET || 'this-is-very-secret',
  saltRounds: parseInt(process.env.HEALTH_SALT_ROUNDS, 10) || 10, // eslint-disable-line no-magic-numbers
  tokenExpirationInS: parseInt(process.env.HEALTH_TOKEN_EXPIRATION_S, 10) || 72 * 60 * 60, // eslint-disable-line no-magic-numbers
};
