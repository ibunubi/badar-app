'use strict';

var app = require('express')(),
  url = require('url'),
  router = require('./router');

app.use('/', router);

app.get('/query', (req, res) => {
  var qs = 'animation=yes&encode=yes&initialvolume=60&remaining=no&noinfo=no&buffer=5&checkpolicy=no&rtl=no&bg=E5E5E5&text=333333&leftbg=CCCCCC&lefticon=333333&volslider=666666&voltrack=FFFFFF&rightbg=B4B4B4&rightbghover=999999&righticon=333333&righticonhover=FFFFFF&track=FFFFFF&loader=009900&border=CCCCCC&tracker=DDDDDD&skip=666666&soundFile=aHR0cDovL2JhZGFyb25saW5lLmNvbS9zb3VuZHMvbmFod3UxL2Rhc2FyLTMubXAzA&playerID=audioplayer_1';
  qs = '?' + qs;
  qs = qs.replace(/&amp;/g, '&');
  qs = url.parse(qs, true );
  qs = qs.query;
  res.write(qs.soundFile);
  res.end();
})

app.listen(3000, function () {
  console.log('Magic happen on http://localhost:3000/');
});