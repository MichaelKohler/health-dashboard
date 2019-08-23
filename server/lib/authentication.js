'use strict';

const jwt = require('jwt-simple');
const { User } = require('../models');
const securityConfig = require('../config/security-config');

module.exports = {
  getToken,
};

async function getToken(email, password) {
  const user = await User.findOne({ where: { email } });
  const isValid = user.checkValidPassword(password);

  if (!isValid) {
    throw new Error('WRONG_PASSWORD');
  }

  delete user.password;
  const token = jwt.encode(user, securityConfig.jwtSecret);
  return token;
}
