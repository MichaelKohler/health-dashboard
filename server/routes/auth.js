'use strict';

const debug = require('debug')('health:routes:auth');
const express = require('express');
const authentication = require('../lib/authentication');

const router = express.Router(); // eslint-disable-line new-cap

const STATUS_OK = 200;
const STATUS_NOT_AUTHORIZED = 401;

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authentication.getToken(email, password);
    debug('USER_LOGGED_IN', email);
    res.status(STATUS_OK);
    res.json({
      success: true,
      token: `JWT ${token}`,
    });
  }
  catch (error) {
    debug('AUTHENTICATION_FAILED', email, error);
    res.status(STATUS_NOT_AUTHORIZED);
    res.json({
      success: false,
      message: 'Authentication failed',
    });
  }
});

module.exports = router;
