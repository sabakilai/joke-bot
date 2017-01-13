"use stricts";
var express = require('express');
var db = require("../data/db.js");
var sms = require("../models/sms.js");
var newChat = require("../models/newchat.js");
var parse = require("../models/parse.js");
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", function(req, res, next) {
  var event = req.body.event;
  var ip = req.connection.remoteAddress;

  var errMessage = "Некорректный ввод. Введите команду '/r',чтобы получить случайный анекдот. Команда '/m',чтобы получить 20 случайных анекдотов";
  if(event == "user/unfollow") {
  	let userId = req.body.data.id;
  	db.destroy({where:{userId: userId, ip: ip}});
  	console.log("db destroyed");
  }
  if(event == "user/follow") {
  let userId = req.body.data.id;
  db.create({userId: userId, ip: ip});
  console.log("user follows");
  newChat(userId, ip, function(err, res, body) {
  	let chatId = body.data.id;
  	let message = "Здравствуйте!Я буду присылать вам самые свежие анекдоты. Введите команду '/r',чтобы получить случайный анекдот. Команда '/m',чтобы получить 20 случайных анекдотов.\nЧтобы отключить ежедневную рассылку,введите команду '/off'";
    sms(message, chatId, ip);
  })
  }
  if(event == "message/new") {
    var userId = req.body.data.sender_id;
  	var content = req.body.data.content;
  	var chatId = req.body.data.chat_id;
  	if(req.body.data.type != 'text/plain') {
  		console.log(errMessage);
  		sms(errMessage, chatId, ip);
  		return;
  	}
    
    if(content == "/r") {
     parse.getRandomJoke(function(result) {
     	console.log(result);
     	sms(result, chatId, ip);
     })
    }
    else if(content == "/m") {
        	parse.getJokes(function(result) {
          	for(var idx in result) {
    			console.log(result[idx]);
    			sms(result[idx], chatId, ip);
   		}
     })
    }
    else if(content == "/off") {
      db.update({state: false},{where: {userId: userId,ip: ip}});
      let message = "Вы отключили ежедневную рассылку. Чтобы включить обратно,введите команду '/on'";
      console.log(message);
      sms(message, chatId, ip);

    }
    else if(content == "/on") {
      db.update({state: true},{where: {userId: userId,ip: ip}});
      let message = "Вы включили ежедневную рассылку. Чтобы выключить обратно,введите команду '/off'";
      console.log(message);
      sms(message, chatId, ip);
      
    }
    else {
   console.log(errMessage);
  		sms(errMessage, chatId, ip);
    }
  }
  res.end();
})
module.exports = router;
