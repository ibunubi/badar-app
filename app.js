"use strict";

var app = require('express')(),
  request = require('request'),
  url = require('url'),
  cheerio = require('cheerio'),
  fs = require('fs');

app.get('/', function(req, res) {
  var dirStucture = ['data', 'content', 'images'];
  let dir = '';
  dirStucture.map((value, index) => {
    if(index < 1)
      dir = '.';
    dir += '/' + value;
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
  });
  
  res.send("Run me first please muehehehe :D");
});

app.get('/table-of-content', function(req, res) {
  let url = "http://badaronline.com/daftar-isi";

  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      
      let $ = cheerio.load(html);
      let data = [];

      $("#main-wrapper .entry ul li a").each(function(i, dom){
        var url = $(dom).attr("href");
        var title = $(dom).html();
        data.push({url:url, title:title});
      });

      fs.writeFile('./data/table-of-content.json', JSON.stringify(data, null, 2), function(err){
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
  let loadContent = fs.readFileSync('./data/table-of-content.json');
  let tableOfContent = JSON.parse(loadContent);

  Promise.all(tableOfContent.map(function(o, i){
    return new Promise(function(resolve, reject){
      console.log("request : " + o.url);
      request(o.url, function (error, response, html) {
        if (error) {return reject(error);}

        let $ = cheerio.load(html);
        let img = [];

        $("#main-wrapper .entry img").each(function(i, image) {
          let srcUrl = $(image).attr('src');
          let localUrl = './data/content/images/' + srcUrl.split("/").pop();

          download(srcUrl, localUrl, function(){
            console.log(localUrl + ' downloaded...\n');
          });

          img.push({url:srcUrl, local:localUrl});

          $(image).attr('src', localUrl);
        });

        let entire = $("#main-wrapper .entry").html();
        
        resolve({content:entire, img:img, title:o.title});

      });
    });
  })).then(function(result) {

    result.map(function(data, index){

      let onDisk = index + '-' + data.title.replace(/ /g, '-').replace(/:/g, '').replace(/&#x2018;/g, '').replace(/&#x2019;/g, '').toLowerCase();

      fs.writeFile('./data/content/' + onDisk + '.json', JSON.stringify(data, null, 2), function(err){
        if (err) throw err;
        console.log('Table of content moved to json file!');
      });

    });

  }).catch(function (err) {
    console.log(err);
  });

});

app.listen(3000, function () {
  console.log('Magic happen on http://localhost:3000/');
});