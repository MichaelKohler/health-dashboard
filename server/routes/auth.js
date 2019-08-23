'use strict';

const debug = require('debug')('health:routes:auth');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jwt-simple');
const User = require('../models')['User'];
const securityConfig = require('../config/security-config');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }});
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (isValidPassword) {
        debug('USER_LOGGED_IN', email);
        delete user.password;
        const token = jwt.encode(user, securityConfig.jwtSecret);
        res.json({ success: true, token: `JWT ${token}`});
    } else {
        debug('WRONG_PASSWORD', email);
        res.json({ success: false, msg: 'Authentication failed' });
    }
});

module.exports = router;