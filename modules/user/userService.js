'use strict';

const models = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getUser = (where) => {
    return models.user.findOne({
        where: where,
        attributes:['guid','name','email','phone','address','profilePic']
    },
    );
};

exports.create = (params) => {
    return models.user.create(params);
};

exports.getAllUser = (params) => {
    return models.user.findAll({
        raw:false,
        nest: false,
        attributes: ['guid', 'name', 'email','phone','profilePic'],
        offset: params.skip,
        limit: params.limit,
        where: params.where
    });
};

exports.countUsers = (where) => {
    return models.user.count({
        where: where
    });
};