'use strict';

const debug = require('debug')('health:index');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const configurePassport = require('./config/passport-jwt-config');
const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');

const port = process.env.PORT || '3333';

const app = express();
app.use(passport.initialize());
configurePassport();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/health', healthRoutes);

app.listen(port, () => {
  debug(`Listening on http://localhost:${port}..`);
});
