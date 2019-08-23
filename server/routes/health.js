'use strict';

const debug = require('debug')('health:routes:health');
const express = require('express');
const passport = require('passport');
const authorizedRoles = require('../middleware/roles');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', passport.authenticate('jwt', { session: false }), authorizedRoles('admin', 'readonly'), async (req, res) => {
  debug('GET_HEALTH');
  res.json({ foo: 'bar' });
});

module.exports = router;
