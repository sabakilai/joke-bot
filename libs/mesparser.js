"use strict"
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./bucket.json');
var s3 = new AWS.S3();

module.exports = {
  GetLinks(){
    return new Promise(function(resolve, reject) {
      request('http://mes.kg/ru/events/', function (error, response, html) {
        if (!error && response.statusCode == 200) {
          var $ = cheerio.load(html);
          var links = [];
          $('.svodka ul li a').each(function (i,element) {
            links[i] = 'http://mes.kg' + $(this).attr('href');
          });
          links.join(', ');
          links = JSON.stringify(links);
          resolve(links);
        } else {
          reject(error);
        }
      });
    });
  },
  WriteMesMessage(url){
    request(url,function (error,response,html) {
      if (!error && response.statusCode == 200){
        var $ = cheerio.load(html);
        var data = [];
        $('.svodka-full p').each(function (i,element) {
          data[i] = $(this).text().replace(/(?:\r\n|\r|\n|\t)/g, "");
        });
        var message = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i] != 'Прогноз погоды ' ){
            message[i] = data[i];
          }else {
            break;
          }
        }
        message = message.join(" ");
        var output = {text:message};

        console.log("output" + output);
        var params = {
            Bucket: 'meteokgbot',
            Key: "mes.json",
            Body: output
        };
        s3.putObject(params, function (perr, pres) {
            if (perr) {
                console.log("Error uploading data: ", perr);
            } else {
                console.log('Added Mes file ');
            }
        });
      } else {
        console.log('Error: ' + error );
      }
    })
  }
};
