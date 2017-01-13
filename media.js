'use strict';
var express = require('express'),
  request = require('request'),
  url = require('url'),
  util = require('util'),
  cheerio = require('cheerio'),
  fs = require('fs'),
  router = express.Router(),
  download = require('./download');

// get data files : images/sound
router.get('/:folder', (req, res) => {
  let folder = req.params.folder;
  let url = 'http://badaronline.com/' + folder + '/nahwu1/';
  request(url, (error, response, html) => {
    if (error) {
      console.log(error);
      return;
    }

    let $ = cheerio.load(html);

    Promise.all($("td a").each((i, el) => {
      
      return new Promise( (resolve, reject) => {
        var fileName = $(el).attr('href');
        var fileUrl = url + fileName;

        fileName = './data/content/' + folder + '/' + fileName;

        download(fileUrl, fileName, () => {
          console.log(i + '. ' + fileUrl + ' downloaded...\n');
        });
        resolve({link:fileUrl, status:'success'})
      });

    })).then((result) => {
      console.log('-=+---------------------------+=-');
      result.map((data)=>{
        console.log(data.link, data.status);
      });
    }).catch((err) => {
      console.log(err);
    });
  });

});