'use strict';

const debug = require('debug')('health:actionsHandler');
const mqtt = require('./mqtt');
const { Cigarette, Stairs } = require('../models');

module.exports = {
  initialize,
};

function initialize() {
  debug('Stating listener for MQTT events..');
  const mqttEvents = mqtt.initialize();

  if (!mqttEvents) {
    return;
  }

  mqttEvents.on('ADD_CIGARETTE', () => {
    debug('Adding cigarette through action');
    const params = {
      rolled: true,
    };

    Cigarette.create(params)
      .then(() => {
        debug('Cigarette added through action');
      })
      .catch((error) => {
        debug('CREATE_CIGARETTE_ACTION_ERROR', error.message);
      });
  });

  mqttEvents.on('ADD_STAIRS', (value) => {
    debug('Adding stairs through action', value);

    const params = {
      stairs: value,
    };

    Stairs.create(params)
      .then(() => {
        debug('Stairs added through action');
      })
      .catch((error) => {
        debug('CREATE_STAIRS_ACTION_ERROR', error.message);
      });
  });
}
