'use strict';

const config = require('../../config');
const messageUtil = require('../../utilities/message');
const responseUtil = require('../../utilities/response');

exports.adminPermission = async (req, res, next) => {
  try {
    let role = req.userData.role;
    if (role !== config.DB_CONSTANTS.USERS.ROLE.ADMIN)
      return responseUtil.authorizationErrorResponse(res, messageUtil.invalidPermission);

    next();
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};
