#!/bin/bash

cd server
npm run migrate
pm2-runtime ecosystem.config.js
