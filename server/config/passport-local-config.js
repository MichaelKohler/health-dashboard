'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = {
  admin: {
    id: 1,
    email: 'admin@example.com',
    getUserRoles: () => Promise.resolve([{ dataValues: { name: 'admin' } }]),
  },
  readonly: {
    id: 2,
    email: 'readonly@example.com',
    getUserRoles: () => Promise.resolve([{ dataValues: { name: 'readonly' } }]),
  },
  inexistent: {
    id: 3,
    email: 'inexistent@example.com',
    getUserRoles: () => Promise.resolve([]),
  },
};

module.exports = () => {
  passport.use(new LocalStrategy((username, password, done) => {
    if (users[username]) {
      return done(null, users[username]);
    }

    return done(null, false);
  }));
};
