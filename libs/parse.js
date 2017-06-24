"use strict"
let request = require('request');
let cheerio = require('cheerio');

var Parser = function() {};

Parser.prototype.get = function(url,selector) {
  return new Promise(function(resolve, reject) {
    request(url, function(err, response, body) {
      if (!err && response.statusCode == 200) {
        var $ = cheerio.load(body);
        var data = $(selector).text().replace(/(?:\r\n|\r|\n|\t)/g, "");
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = Parser;
