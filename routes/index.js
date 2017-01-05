"use stricts";
var express = require('express');
var db = require("../data/db.js");
var sms = require("../models/sms.js");
var newChat = require("../models/newchat.js");
var parse = require("../models/parse.js");
var router = express.Router();
var TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDM0LCJwaG9uZSI6IjEyMzQ1Njc4Njc1NDUzNDI0MyIsInBhc3N3b3JkIjoiJDJhJDEwJHV4TnlHSlBuYkJjMUNDSVFLUi9nNWV4UnFNN1c0QUQyR2hIQzRBdWJwN1V5dVlnbDBRRWRPIiwiaXNCb3QiOnRydWUsImNvdW50cnkiOnRydWUsImlhdCI6MTQ4MzU5NTI5N30.ZLZ9BtUwhJqSMJgWc0Ln7iYT7W944BB4RAIIDMVkzg8";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", function(req, res, next) {
  var event = req.body.event;
  var ip = req.connection.remoteAddress;
  var errMessage = "Некорректный ввод";
  if(event == "user/unfollow") {
  	let userId = req.body.data.id;
  	db.destroy({where:{userId: userId, ip: ip}});
  	console.log("db destroyed");
  }
  if(event == "user/follow") {
  let userId = req.body.data.id;
  db.create({userId: userId, ip: ip});
  console.log("user follows");
  newChat(userId, TOKEN, ip, function(err, res, body) {
  	let chatId = body.data.id;
  	let message = "Здравствуйте!Я буду присылать вам самые свежие анекдоты. Введите команду '/r',чтобы получить случайный анекдот. Команда '/m',чтобы получить 20 случайных анекдотов";
    sms(message, chatId, TOKEN, ip);
  })
  }
  if(event == "message/new") {
  	var content = req.body.data.content;
  	var chatId = req.body.data.chat_id;
  	if(req.body.data.type != 'text/plain') {
  		console.log(errMessage);
  		sms(errMessage, chatId, TOKEN, ip);
  		return;
  	}
    
    if(content == "/r") {
     parse.getRandomJoke(function(result) {
     	console.log(result);
     	sms(result, chatId, TOKEN, ip);
     })
    }
    else if(content == "/m") {
        	parse.getJokes(function(result) {
          	for(var idx in result) {
    			console.log(result[idx]);
    			sms(result[idx], chatId, TOKEN, ip);
   		}
     })
    }
    else {
   console.log(errMessage);
  		sms(errMessage, chatId, TOKEN, ip);
    }
  }
  res.end();
})
module.exports = router;
