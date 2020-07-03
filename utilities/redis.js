'use strict';

const bluebird = require('bluebird');
const redis = require('redis');
const jwt = require('jsonwebtoken');

bluebird.promisifyAll(redis.RedisClient.prototype);

const config = require('../config');
const loggerUtil = require('./logger');

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

exports.loginSession = async (userData) => {
  const token = jwt.sign(userData, config.JWT.SECRET_KEY);
  try {
    let expiry = process.env.REDIS_TOKEN_EXP||1000;
    await client.setAsync(token, JSON.stringify(userData), 'EX', expiry);
    return token;
  } catch (ex) {
    loggerUtil.error({
      message: ex.toString(),
      level: 'error',
    });
    return false;
  }
};

exports.checkSession = async (token) => {
  try {
    let userData = await client.getAsync(token);
    return JSON.parse(userData);
  } catch (ex) {
    loggerUtil.error({
      message: ex.toString(),
      level: 'error',
    });
    return false;
  }
};

exports.logoutSession = async (token) => {
  try {
    await client.delAsync(token);
    return true;
  } catch (ex) {
    loggerUtil.error({
      message: ex.toString(),
      level: 'error',
    });
    return false;
  }
};

