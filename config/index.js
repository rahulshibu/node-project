'use strict';

module.exports = {
      USERS: {
        ADMIN: 1,
        USER: 2
    },
  HTTP_STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
  },
  JWT: {
    SECRET_KEY: process.env.JWT_SECRET_KEY||'1234567890qwertyuiop',
  },
  SECRETS: {
    SALT_ROUNDS: 10,
  },
  IMAGE:{
    MIME_TYPE: ['image/jpeg', 'image/png'],
    SIZE:5242880
  }
};
