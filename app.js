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

const download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

app.get("/content", function(req, res) {
  var loadContent = fs.readFileSync('table-of-content.json');
  var tableOfContent = JSON.parse(loadContent);

  tableOfContent.each(function(i, o){

    var data = [];
    request(o.link, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        
        var $ = cheerio.load(html);
        var img = [];

        var entire = $("#main-wrapper .entry").html();

        $("#main-wrapper .entry img").each(function(i, image) {
          var srcUrl = url.resolve(page_url, $(image).attr('src'));
          var fileName = './images/' + srcUrl.split("/").pop();

          download(srcUrl, fileName, function(){
            console.log(fileName + ' downloaded...\n');
          });

          img.push({url:srcUrl, local:fileName});
        });
        
        data.push({content:entire, img: img});

      } else {
        console.log(error);
      }
    });

  });

});

app.listen(3000, function () {
  console.log('Magic happen on port 3000!');
});