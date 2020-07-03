'use strict';

const { check } = require('express-validator');

module.exports = (method) => {
  switch (method) {
    case 'login': {
      return [
        check('username').trim().not().isEmpty().withMessage(
          'Username cannot be left blank',
        ).bail().isEmail().withMessage(
          'Username must be a valid email',
        ).isLength({
          max: 100,
        }).withMessage(
          'Username entered exceeds the maximum length',
        ),
        check('password').trim().not().isEmpty().withMessage(
          'Password cannot be left blank',
        ).bail().isLength({
          min: 6,
        }).withMessage(
          'Password must be at least 6 characters',
        ).bail().isLength({
          max: 100,
        }).withMessage(
          'Password entered exceeds the maximum length',
        ),
        check('stay_logged_in').optional().isBoolean(),
      ];
    }
    case 'forgotPassword': {
      return [
        check('username').trim().not().isEmpty().withMessage(
          'Username cannot be left blank',
        ).bail().isEmail().withMessage(
          'Username must be a valid email',
        ).isLength({
          max: 100,
        }).withMessage(
          'Username entered exceeds the maximum length',
        ),
      ];
    }
    case 'resetPassword': {
      return [
        check('username').trim().not().isEmpty().withMessage(
          'Username cannot be left blank',
        ).bail().isEmail().withMessage(
          'Username must be a valid email',
        ).isLength({
          max: 100,
        }).withMessage(
          'Username entered exceeds the maximum length',
        ),
        check('new_password').trim().not().isEmpty().withMessage(
          'Password cannot be left blank',
        ).bail().isLength({
          min: 6,
        }).withMessage(
          'Password must be at least 6 characters',
        ).bail().isLength({
          max: 100,
        }).withMessage(
          'Password entered exceeds the maximum length',
        ),
        check('otp').trim().not().isEmpty().withMessage(
          'OTP cannot be left blank',
        ).bail().isLength({
          min: 6,
          max: 6,
        }).withMessage(
          'OTP must be 6 character long',
        ),
      ];
    }
    case 'changePassword': {
      return [
        check('old_password').trim().not().isEmpty().withMessage(
          'Password cannot be left blank',
        ).bail().isLength({
          min: 6,
        }).withMessage(
          'Password must be at least 6 characters',
        ).bail().isLength({
          max: 100,
        }).withMessage(
          'Password entered exceeds the maximum length',
        ),
        check('new_password').trim().not().isEmpty().withMessage(
          'Password cannot be left blank',
        ).bail().isLength({
          min: 6,
        }).withMessage(
          'Password must be at least 6 characters',
        ).bail().isLength({
          max: 100,
        }).withMessage(
          'Password entered exceeds the maximum length',
        ),
      ];
    }
    case 'register': {
      return [
        check('name').trim().not().isEmpty().withMessage(
            'Name cannot be left blank',
        ).bail().isLength({
          min: 3,
        }).withMessage(
            'Name must be at least 3 characters',
        ).bail().isLength({
          max: 150,
        }).withMessage(
            'Name entered exceeds the maximum length',
        ),
        check('email').trim().not().isEmpty().withMessage(
            'Email cannot be left blank',
        ).bail().isEmail().withMessage(
            'Invaid email format',
        ).isLength({
          max: 100,
        }).withMessage(
            'Email entered exceeds the maximum length',
        ),
        check('phone').trim().not().isEmpty().withMessage(
            'Phone cannot be left blank',
        ).bail().isLength({
          min: 10
        }).withMessage(
            'Phone must be at least 10 characters',
        ).bail().isLength({
          max: 12,
        }).withMessage(
            'Phone entered exceeds the maximum length',
        ),
        check('password').trim().not().isEmpty().withMessage(
            'Password cannot be left blank',
        ).bail().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "i")
            .withMessage(
                'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long',
            ).bail().isLength({
          min: 8,
        }).withMessage(
            'Password must be at least 6 characters',
        ).bail().isLength({
          max: 100,
        }).withMessage(
            'Password entered exceeds the maximum length',
        ),
        check('address').trim().not().isEmpty().withMessage(
            'Address cannot be left blank',
        ).bail().isLength({
          min: 5,
        }).withMessage(
            'Address must be at least 3 characters',
        ).bail().isLength({
          max: 250,
        }).withMessage(
            'Address entered exceeds the maximum length',
        ),
      ];
    }
    case 'paginate': {
      return [
        check('limit').isInt({ min: 1 }),
        check('page').isInt({ min: 1 }),
        check('search').optional(),
      ];
    }
  };
};
