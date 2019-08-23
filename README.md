# health-dashboard

Some health dashboard.. or just something so I can play around..

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

```
$ npm run start:server
```

### Adding seed data

```
$ cd server
$ npm run seed
```

### Start frontend

TBD
