#!/bin/bash

cd server
NODE_ENV=production npm run migrate
pm2-runtime ecosystem.config.js
