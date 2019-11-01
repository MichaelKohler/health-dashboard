'use strict';

const debug = require('debug')('health:routes:weights');
const express = require('express');
const passport = require('passport');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const strategy = config.usePassportStrategy;
const authorizedRoles = require('../middleware/roles');

const { Weight } = require('../models');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_ERROR = 500;

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', passport.authenticate(strategy, { session: false }), authorizedRoles('admin', 'readonly'), async (req, res) => {
  debug('GET_WEIGHT');
  const options = {
    order: [['createdAt', 'DESC']],
  };

  if (req.query.limit !== undefined) {
    options.limit = parseInt(req.query.limit, 10);
  }

  Weight.findAll(options)
    .then((weights) => res.json(weights))
    .catch((error) => {
      debug('GET_WEIGHT_ERROR', error.message);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

router.post('/', passport.authenticate(strategy, { session: false }), authorizedRoles('admin'), async (req, res) => {
  debug('CREATE_WEIGHT');
  const { weight } = req.body;
  const params = {
    weight,
  };

  Weight.create(params)
    .then(() => {
      res.status(STATUS_CREATED);
      res.send();
    })
    .catch((error) => {
      debug('CREATE_WEIGHT_ERROR', error.message);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

router.delete('/:weightId', passport.authenticate(strategy, { session: false }), authorizedRoles('admin'), async (req, res) => {
  debug('DELETE_WEIGHT');
  const { weightId } = req.params;

  Weight.destroy({
    where: {
      id: weightId,
    },
  })
    .then(() => {
      res.status(STATUS_OK);
      res.send();
    })
    .catch((error) => {
      debug('DELETE_WEIGHT_ERROR', error.message);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

module.exports = router;
