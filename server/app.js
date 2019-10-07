'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];
const configureJWTPassport = require('./config/passport-jwt-config');
const configureLocalPassport = require('./config/passport-local-config');
const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');
const cigarettesRoutes = require('./routes/cigarettes');
const weightsRoutes = require('./routes/weights');
const statsRoutes = require('./routes/stats');
const stairsRoutes = require('./routes/stairs');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

switch (config.usePassportStrategy) {
case 'local':
  configureLocalPassport();
  break;
case 'jwt':
default:
  configureJWTPassport();
  break;
}

app.use('/auth', authRoutes);
app.use('/health', healthRoutes);
app.use('/cigarettes', cigarettesRoutes);
app.use('/weights', weightsRoutes);
app.use('/stairs', stairsRoutes);
app.use('/stats', statsRoutes);

module.exports = app;
