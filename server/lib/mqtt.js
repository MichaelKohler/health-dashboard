'use strict';

const debug = require('debug')('health:mqtt');
const mqtt = require('mqtt');
const { EventEmitter } = require('events');

let config;
let instance;

try {
  config = require('../config/mqtt/mqtt-config');
}
catch (err) {
  debug('Did not find MQTT config file..');
}

module.exports = {
  initialize,
};

function initialize() {
  if (instance) {
    return instance;
  }

  if (!config) {
    debug('Not initializing MQTT');
    return null;
  }

  try {
    validateConfig();
  }
  catch (error) {
    console.error(error);
    debug('Not initializing MQTT');
    return null;
  }

  instance = new MQTT(config);
  return instance;
}

function validateConfig() {
  if (!config.host) {
    throw new Error('MQTT_HOST_NOT_SET');
  }

  if (!Number.isInteger(config.port)) {
    throw new Error('MQTT_PORT_NOT_SET_OR_NOT_A_NUMBER');
  }

  if (!config.topics || !Object.keys(config.topics).length) {
    throw new Error('MQTT_TOPICS_ARRAY_EMPTY');
  }

  if (!config.username || !config.password) {
    debug('No username or password set!');
  }
}

class MQTT extends EventEmitter {
  constructor(configuration) {
    debug('Initializing client..');
    super();

    this.config = configuration;

    const url = `${configuration.host}:${configuration.port}`;
    this.client = mqtt.connect(url, {
      username: configuration.username,
      password: configuration.password,
    });

    this.client.on('connect', () => {
      debug('MQTT connected');
    });

    this.client.on('disconnect', () => {
      debug('MQTT disconnected');
    });

    this.subscribe();
  }

  subscribe() {
    debug('Subscribing to messages..');
    const topics = Object.keys(config.topics);
    this.client.subscribe(topics, (error) => {
      if (error) {
        debug('Error subscribing..', error);
        return;
      }

      this.client.on('message', (topic, message) => this.handleMessage(topic, message));
    });
  }

  handleMessage(topic, messageBuffer) {
    const message = messageBuffer.toString();
    debug('Handling message', topic, message);

    const topicDefinition = this.config.topics[topic];

    if (!topicDefinition || !topicDefinition.action) {
      debug('No suitable action found');
    }

    this.emit(topicDefinition.action, message);
  }
}
