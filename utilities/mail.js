'use strict';

const sgMail = require('@sendgrid/mail');
const loggerUtil = require('./logger');

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

exports.sendMail = async (email, subject, text, html) => {
  try {
    const mail = {
      from: process.env.SEND_GRID_SENDER,
      to: email,
      subject: subject,
    };

    if (text)
      mail.text = text;

    if (html)
      mail.html = html;

    await sgMail.send(mail);
    return true;
  } catch (ex) {
    loggerUtil.error({
      message: ex.toString(),
      level: 'error',
    });
    return false;
  }
};
