'use strict';

const messageUtil = require('../../utilities/message');
const redisUtil = require('../../utilities/redis');
const responseUtil = require('../../utilities/response');
const config = require('../../config/index');

const authCheckService = require('./authCheckService');

module.exports.userAuthCheck = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token)
      return responseUtil.authorizationErrorResponse(res, messageUtil.authorizationRequired);

    let userSession = await redisUtil.checkSession(token);
    if (!userSession)
      return responseUtil.authorizationErrorResponse(res, messageUtil.tokenExpired);

    let userData = await authCheckService.getUser(userSession.id);

    if (userData.role !== config.USERS.USER)
      return responseUtil.forbiddenErrorResponse(res, messageUtil.forbidden);


    req.userData = userData;
    next();
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

module.exports.adminAuthCheck = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token)
      return responseUtil.authorizationErrorResponse(res, messageUtil.authorizationRequired);

    let userSession = await redisUtil.checkSession(token);
    if (!userSession)
      return responseUtil.authorizationErrorResponse(res, messageUtil.tokenExpired);

    let userData = await authCheckService.getUser(userSession.id);

    if (userData.role !== config.USERS.ADMIN)
      return responseUtil.forbiddenErrorResponse(res, messageUtil.forbidden);

    req.userData = userData;
    next();
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

module.exports.authCheck = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token)
      return responseUtil.authorizationErrorResponse(res, messageUtil.authorizationRequired);

    let userSession = await redisUtil.checkSession(token);
    if (!userSession)
      return responseUtil.authorizationErrorResponse(res, messageUtil.tokenExpired);

    let userData = await authCheckService.getUser(userSession.id);

    req.userData = userData;
    next();
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};
