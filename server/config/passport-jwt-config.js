'use strict';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const securityConfig = require('./security-config');
const { User } = require('../models');

module.exports = () => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: securityConfig.jwtSecret,
  };

  passport.use(new JwtStrategy(options, (jwt_payload, done) => { // eslint-disable-line camelcase
    User.findOne({ where: { id: jwt_payload.id } }) // eslint-disable-line camelcase
      .then((user) => user ? done(null, user) : done(null, false)) // eslint-disable-line promise/no-callback-in-promise
      .catch((err) => done(err, false)); // eslint-disable-line promise/no-callback-in-promise
  }));
};
