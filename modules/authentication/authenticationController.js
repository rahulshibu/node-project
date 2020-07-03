'use strict';

const messageUtil = require('../../utilities/message');
const passwordUtil = require('../../utilities/password');
const redisUtil = require('../../utilities/redis');
const responseUtil = require('../../utilities/response');

const authenticationService = require('./authenticationService');

exports.login = async (req, res, next) => {
  try {
    let username = req.body.username;
    let password = req.body.password;

    let userData = await authenticationService.getUserByUsername(username);

    if (!userData)
      return responseUtil.badRequestErrorResponse(res, messageUtil.invalidLoginCredentials);

    let comparePassword = await passwordUtil.comparePasswords(password, userData.password);

    if (!comparePassword)
      return responseUtil.badRequestErrorResponse(res, messageUtil.invalidLoginCredentials);

    let token = await redisUtil.loginSession({
      id: userData.id,
      role: userData.role,
    });

    if (!token)
      return responseUtil.badRequestErrorResponse(res, messageUtil.somethingWentWrong);

    responseUtil.successResponse(res, messageUtil.loginSuccess, {
      token: token,
      id: userData.guid,
      role: userData.role,
    });
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};


exports.logout = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    await redisUtil.logoutSession(token);
    responseUtil.successResponse(res, messageUtil.logoutSuccess, null);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};
