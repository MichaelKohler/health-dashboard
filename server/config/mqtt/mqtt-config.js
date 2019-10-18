'use strict';

module.exports = {
  host: 'mqtt://mqtt.michael.network',
  port: 31883,
  username: 'mkohler',
  password: 'qoHKwlxpsB3mWnK9Y3qQHVYceFg+1',
  topics: {
    'smarthome/hugo/cigarette': {
      action: 'ADD_CIGARETTE',
    },
    'smarthome/hugo/stairs': {
      action: 'ADD_STAIRS',
      useValue: true,
    },
  },
};
