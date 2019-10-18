'use strict';

const debug = require('debug')('health:index');
const app = require('./app');
const mqtt = require('./lib/mqtt');
const actionsHandler = require('./lib/actions-handler');

const port = process.env.PORT || '3333';

app.listen(port, () => {
  debug(`Listening on http://0.0.0.0:${port}..`);
});

mqtt.initialize();
actionsHandler.initialize();

