var app = require('express')(),
  request = require('request'),
  url = require('url'),
  cheerio = require('cheerio'),
  fs = require('fs');

app.get('/', function(req, res) {
  res.send("Hello Badar Scrap");
});

app.get('/table-of-content', function(req, res) {
  var url = "http://badaronline.com/daftar-isi";

  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      var data = [];

      $("#main-wrapper .entry ul li").each(function(i, dom){
        var link = $(dom).closest("a").attr("href");
        var title = $(dom).closest("a").html();

        data.push({link:link, title:title});
      });

      fs.writeFile('table-of-content.json', JSON.stringify(data, null, 2), function(err){
        if (err) throw err;
        console.log('Table of content moved to json file!');
      });

    } else {
      console.log(error);
    }
  });

  res.send("Check your logs!");

});

app.listen(3000, function () {
  console.log('Magic happen on port 3000!');
});