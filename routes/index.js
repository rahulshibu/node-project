'use strict';

const express = require('express');
const router = express.Router();

const authentication = require('./authentication');
const user = require('./user');

router.use('/auth', authentication);
router.use('/user', user);

module.exports = router;
