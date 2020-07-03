'use strict';

const express = require('express');
const http = require('http');

const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const config = require('./config');
const models = require('./models');
const routes = require('./routes');
const loggerUtil = require('./utilities/logger');

// create express app
const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(compression());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan('combined', { stream: loggerUtil.stream }));
app.use(routes);

// handle 404 error
app.use(function (req, res, next) {
  let status = config.HTTP_STATUS_CODES.NOT_FOUND;
  let message = 'Method or URL Not Found';
  loggerUtil.error({
    message: `${status} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    level: 'error',
  });
  res.status(status).send({
    success: false,
    message: message,
  });
});

models.sequelize.sync().then(function () {
  const port = process.env.PORT || 3000;
  server.listen(port, error => {
    if (error)
      loggerUtil.error({
        message: `Server error - ${error.toString()}`,
        level: 'error',
      });
    else
      loggerUtil.log({
        message: `Server listening at port ${port}`,
        level: 'info',
      });
  });
});
