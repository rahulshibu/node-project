'use strict';

const models = require('../../models');

exports.getUserByUsername = (username) => {
  return models.user.findOne({
    where: {
      email: username,
    },
  });
};
