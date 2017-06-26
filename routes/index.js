var express = require('express');
var router = express.Router();
var request = require('request');
var iconv = require('iconv-lite');

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.status(200).json({
    message: 'Ok!',
  });
});

module.exports = router;
