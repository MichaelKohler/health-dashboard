'use strict';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const securityConfig = require('./security-config');
const { User } = require('../models');

module.exports = () => {
    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: securityConfig.jwtSecret,
    };

    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
      User.findOne({ where: { id: jwt_payload.id }})
        .then((user) => {
          return user ? done(null, user) : done(null, false)
        })
        .catch((err) => done(err, false));
    }));
};