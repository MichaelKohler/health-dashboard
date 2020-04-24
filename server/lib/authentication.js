'use strict';

const jwt = require('jsonwebtoken');
const { User } = require('../models');
const securityConfig = require('../config/security-config');

const WRONG_USER_OR_PASSWORD = 'WRONG_USER_OR_PASSWORD';

module.exports = {
  getToken,
};

async function getToken(email, password) {
  if (!email || !password) {
    throw new Error('NO_EMAIL_OR_PASSWORD_PASSED');
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error(WRONG_USER_OR_PASSWORD);
  }

  const isValid = user.checkValidPassword(password);

  if (!isValid) {
    throw new Error(WRONG_USER_OR_PASSWORD);
  }

  const token = jwt.sign({
    id: user.id,
    email: user.email,
  }, securityConfig.jwtSecret, {
    expiresIn: securityConfig.tokenExpirationInS,
  });

  return token;
}
