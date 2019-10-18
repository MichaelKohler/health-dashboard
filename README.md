# health-dashboard

[![Greenkeeper badge](https://badges.greenkeeper.io/MichaelKohler/health-dashboard.svg)](https://greenkeeper.io/)

Some health dashboard.. or just something so I can play around..

![](screenshot.png?raw=true)

## Prerequisites

* Docker and docker-compose
* Node.js

## Running it locally

First you need to install dependencies:

```
$ npm install
```

### Start MariaDB instance

```
$ docker-compose up
```

### Start backend server

Copy the MQTT config example and adjust it to your use case. If you don't want MQTT functionality, do not copy the config.

```
$ cp server/config/mqtt/mqtt-config-example.js server/config/mqtt/mqtt-config.js
```

Then you can start the server:

```
$ npm run start:server
```

### Adding seed data

```
$ cd server
$ npm run seed
```

### Start frontend

```
$ npm run start:web
```

## MQTT Config

Topic Key is the mqtt topic name.

Topic Properties:
* action: action to call on message (see below for values)
* useValue: (optional) boolean value to indicate whether to use the message's value for the action

Possible values for `action`:
* ADD_CIGARETTE
* ADD_STAIRS