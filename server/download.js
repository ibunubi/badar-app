'use strict';
var request = require('request'),
  fs = require('fs');

const download = (uri, filename, callback) => {
  request.head(uri, (err, res, body) => {
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};



module.exports = download;