'use strict';

const debug = require('debug')('health:index');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const configurePassport = require('./config/passport-jwt-config');
const authRoutes = require('./routes/auth');

const app = express();
app.use(passport.initialize());
configurePassport();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.listen(3333, () => {
  debug('Listening on http://localhost:3333..');
});