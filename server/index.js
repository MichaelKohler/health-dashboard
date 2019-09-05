'use strict';

const debug = require('debug')('health:index');
const app = require('./app');

const port = process.env.PORT || '3333';

app.listen(port, () => {
  debug(`Listening on http://localhost:${port}..`);
});

