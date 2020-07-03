'use strict';

const express = require('express');
const router = express.Router();

const validate = require('../middlewares/field/validator');
const verifyRequest = require('../middlewares/field/verifyRequest');
const {authCheck,adminAuthCheck,userAuthCheck} = require('../middlewares/authentication/authCheckController');
const {
  login,
  logout,
} = require('../modules/authentication/authenticationController');

router.post('/login', validate('login'), verifyRequest, login);
router.get('/logout',authCheck, logout);

module.exports = router;
