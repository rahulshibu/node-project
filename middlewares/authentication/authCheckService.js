'use strict';

const models = require('../../models');

exports.getUser = (userId) => {
  return models.user.findOne({
    where: {
      id: userId,
    },
    attributes: ['id', 'guid', 'name', 'email', 'role'],
  });
};
