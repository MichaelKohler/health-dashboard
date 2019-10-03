'use strict';

const debug = require('debug')('health:routes:cigarettes');
const express = require('express');
const passport = require('passport');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const strategy = config.usePassportStrategy;
const authorizedRoles = require('../middleware/roles');
const Sequelize = require('sequelize');

const { Cigarette, Weight } = require('../models');

const STATUS_ERROR = 500;
const STATS_LIMIT = 5;

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', passport.authenticate(strategy, { session: false }), authorizedRoles('admin', 'readonly'), async (req, res) => {
  debug('GET_STATS');
  const cigarettesPromise = Cigarette.findAll({
    attributes: [[Sequelize.literal(`DATE(createdAt)`), 'date'], [Sequelize.literal(`COUNT(*)`), 'count']],
    order: [['createdAt', 'DESC']],
    group: ['date'],
    limit: STATS_LIMIT,
  });

  const weightsPromise = Weight.findAll({
    order: [['createdAt', 'DESC']],
    limit: STATS_LIMIT,
  });

  Promise.all([cigarettesPromise, weightsPromise])
    .then(([cigarettesStats, weightStats]) => res.json({
      cigarettes: cigarettesStats.reverse(),
      weight: weightStats.reverse(),
    }))
    .catch((error) => {
      debug('GET_STATS_ERROR', error.message);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

module.exports = router;
