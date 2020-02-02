const fs = require('fs');
const path = require('path');
const moment = require('moment');

module.exports = {
  logController: (req, res, next) => {
    fs.appendFile(path.resolve(__dirname, '../logs/logs.txt'),
      `${moment().format('LLL')}
      hostname: ${req.hostname}
      clientIP: ${req.ip}
      protocol: ${req.protocol}
      method: ${req.method}
      URL: ${req.path}
      params: ${JSON.stringify(req.params)}\n`,
      (err) => {
        if (err) {
          console.log(err);
        }
      });
    next();
  }
}