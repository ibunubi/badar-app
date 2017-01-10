var app = require('express')(),
  request = require('request'),
  cheerio = require('cheerio');

app.get('/', function(req, res) {
  res.send("Hello Badar Scrap");
});

app.listen(3000, function () {
  console.log('Magic happen on port 3000!');
});