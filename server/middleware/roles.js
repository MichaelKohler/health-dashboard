'use strict';

const debug = require('debug')('health:middleware:roles');
const _intersection = require('lodash.intersection');

module.exports = (...authorizedRoles) => {
  return async (req, res, next) => {
    const userRoles = await req.user.getUserRoles();
    const currentUserRoles = userRoles.map((role) => role.dataValues.name);
    if (!_intersection(currentUserRoles, authorizedRoles).length) {
      debug('NOT_PERMITTED');
      res.status(403);
      res.json({});
      return;
    }
    next();
  }
};