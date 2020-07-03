'use strict';

const express = require('express');
const router = express.Router();

const validate = require('../middlewares/field/validator');
const verifyRequest = require('../middlewares/field/verifyRequest');
const {imageValidate} = require('../middlewares/field/imageValidator');
const {authCheck,adminAuthCheck,userAuthCheck} = require('../middlewares/authentication/authCheckController');
const {
  register,
  profile,
  getUserList

} = require('../modules/user/userController');

router.post('/register', validate('register'), verifyRequest,imageValidate, register);
router.get('/profile', userAuthCheck, profile);
router.get('/user-list', adminAuthCheck,validate('paginate'), verifyRequest, getUserList);

module.exports = router;
