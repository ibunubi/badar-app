'use strict';
var express = require('express'),
  request = require('request'),
  url = require('url'),
  util = require('util'),
  cheerio = require('cheerio'),
  fs = require('fs'),
  routerMedia = express.Router(),
  download = require('./download');

// get data files : images/sound
routerMedia.get('/:folderMedia', (req, res) => {
  let folderMedia = req.params.folderMedia;
  let url = 'http://badaronline.com/' + folderMedia + '/nahwu1/';
  request(url, (error, response, html) => {
    if (error) {
      console.log(error);
      return;
    }

    let $ = cheerio.load(html);

    let downloadUrl = [];
    let countingDownload = 0;

    $("td a").each((i, el) => {
      var ext = $(el).attr('href').split('.').pop();
      if(ext == 'jpg' || ext == 'png' || ext == 'mp3')
      downloadUrl.push({url:$(el).attr('href')});
    });

    Promise.all(downloadUrl.map((el, i) => {
      
      return new Promise( (resolve, reject) => {
        var fileName = el.url;
        var fileUrl = url + fileName;

        fileName = './data/content/' + folderMedia + '/' + fileName;

        download(fileUrl, fileName, () => {
          countingDownload++;
          console.log(countingDownload + ' of ' + downloadUrl.length + '. ' + fileUrl + ' downloaded and moved to folder ' + folderMedia + '...\n');
        });
        resolve({link:fileUrl, status:'success / loaded'})
      });

    })).then((result) => {
      result.map((data)=>{
        console.log(data.link, data.status);
      });
    }).catch((err) => {
      console.log(err);
    });
  });

});


module.exports = routerMedia;