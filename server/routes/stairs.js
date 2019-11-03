'use strict';

const debug = require('debug')('health:routes:stats');
const express = require('express');
const passport = require('passport');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const strategy = config.usePassportStrategy;
const authorizedRoles = require('../middleware/roles');

const { Stairs } = require('../models');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_ERROR = 500;

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', passport.authenticate(strategy, { session: false }), authorizedRoles('admin', 'readonly'), async (req, res) => {
  debug('GET_STAIRS');
  const options = {
    order: [['createdAt', 'DESC']],
  };

  if (req.query.limit !== undefined) {
    options.limit = parseInt(req.query.limit, 10);
  }

  Stairs.findAll(options)
    .then((stairs) => res.json(stairs))
    .catch((error) => {
      debug('GET_STAIRS_ERROR', error.message);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

router.put('/', passport.authenticate(strategy, { session: false }), authorizedRoles('admin'), async (req, res) => {
  debug('CREATE_STAIRS');
  const { stairs } = req.body;
  const params = {
    stairs,
  };

  Stairs.create(params)
    .then(() => {
      res.status(STATUS_CREATED);
      res.send();
    })
    .catch((error) => {
      debug('CREATE_STAIRS_ERROR', error.message);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

router.delete('/:stairsId', passport.authenticate(strategy, { session: false }), authorizedRoles('admin'), async (req, res) => {
  debug('DELETE_STAIRS');
  const { stairsId } = req.params;

  Stairs.destroy({
    where: {
      id: stairsId,
    },
  })
    .then(() => {
      res.status(STATUS_OK);
      res.send();
    })
    .catch((error) => {
      debug('DELETE_STAIRS_ERROR', error.message);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

module.exports = router;
