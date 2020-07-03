'use strict';

const config = require('../config');
const loggerUtil = require('./logger');

exports.successResponse = (res, message, result) => {
  let response = {
    success: true,
    message: message,
  };

  if (result)
    response.result = result;

  res.status(config.HTTP_STATUS_CODES.OK).send(response);
};

exports.serverErrorResponse = (res, error) => {
  loggerUtil.error({
    message: error.toString(),
    level: 'error',
  });
  res.status(config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
    success: false,
    error: error.toString(),
    message: 'Internal Server Error',
  });
};

exports.validationErrorResponse = (res, errors) => {
  res.status(config.HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({
    success: false,
    errors: errors,
    message: 'Validation Errors',
  });
};

exports.badRequestErrorResponse = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.BAD_REQUEST).send({
    success: false,
    message: message,
  });
};

exports.authorizationErrorResponse = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.UNAUTHORIZED).send({
    success: false,
    message: message,
  });
};
exports.forbiddenErrorResponse = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.FORBIDDEN).send({
    success: false,
    message: message,
  });
};

