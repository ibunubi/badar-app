'use strict';
var app = require('express')(),
  router = require('./router'),
  media = require('./media');

app.use('/', router);
app.use('/media', media);

app.listen(3000, function () {
  console.log('Magic happen on http://localhost:3000/');
});