'use strict';

const debug = require('debug')('health:routes:cigarettes');
const express = require('express');
const passport = require('passport');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const strategy = config.usePassportStrategy;
const authorizedRoles = require('../middleware/roles');

const { Cigarette } = require('../models');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_ERROR = 500;

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', passport.authenticate(strategy, { session: false }), authorizedRoles('admin', 'readonly'), async (req, res) => {
  debug('GET_CIGARETTES');
  Cigarette.findAll()
    .then((cigarettes) => res.json(cigarettes))
    .catch((error) => {
      debug('GET_CIGARETTE_ERROR', error.message);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

router.post('/', passport.authenticate(strategy, { session: false }), authorizedRoles('admin'), async (req, res) => {
  debug('CREATE_CIGARETTE');
  const { rolled } = req.body;
  const params = {
    rolled: rolled !== false,
  };

  Cigarette.create(params)
    .then(() => {
      res.status(STATUS_CREATED);
      res.send();
    })
    .catch((error) => {
      debug('CREATE_CIGARETTE_ERROR', error.message);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

router.delete('/:cigarette', passport.authenticate(strategy, { session: false }), authorizedRoles('admin'), async (req, res) => {
  debug('DELETE_CIGARETTE');
  const { cigarette: cigaretteId } = req.params;

  Cigarette.destroy({
    where: {
      id: cigaretteId,
    },
  })
    .then(() => {
      res.status(STATUS_OK);
      res.send();
    })
    .catch((error) => {
      debug('DELETE_CIGARETTE_ERROR', error.message);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

module.exports = router;
