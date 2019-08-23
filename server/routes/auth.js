'use strict';

const debug = require('debug')('health:routes:auth');
const express = require('express');
const authentication = require('../lib/authentication');

const router = express.Router(); // eslint-disable-line new-cap

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authentication.getToken(email, password);
    debug('USER_LOGGED_IN', email);
    res.json({
      success: true,
      token: `JWT ${token}`,
    });
  }
  catch (error) {
    debug('AUTHENTICATION_FAILED', email, error);
    res.json({
      success: false,
      msg: 'Authentication failed',
    });
  }
});

module.exports = router;
