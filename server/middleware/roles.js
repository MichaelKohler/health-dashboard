'use strict';

const debug = require('debug')('health:middleware:roles');
const _intersection = require('lodash.intersection');

const NOT_PERMITTED_STATUS = 403;

module.exports = (...authorizedRoles) => async (req, res, next) => {
  const userRoles = await req.user.getUserRoles();
  const currentUserRoles = userRoles.map((role) => role.dataValues.name);
  if (!_intersection(currentUserRoles, authorizedRoles).length) {
    debug('NOT_PERMITTED');
    res.status(NOT_PERMITTED_STATUS);
    res.json({});
    return;
  }
  next();
};
