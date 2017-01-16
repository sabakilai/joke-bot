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

  var errMessage = "Некорректный ввод.Введите нужную цифру:\n\uE21Cполучить случайный анекдот.\n\uE21Dполучить 20 случайных анекдотов.\n\uE21Eотключить ежедневную рассылку,введите команду '/off'";
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
  	let message = "Здравствуйте!Я буду присылать вам самые свежие анекдоты. Введите нужную цифру:\n\uE21Cполучить случайный анекдот.\n\uE21Dполучить 20 случайных анекдотов.\n\uE21Eотключить ежедневную рассылку,введите команду '/off'";
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
    
    if(content == "1") {
     parse.getRandomJoke(function(result) {
     	console.log(result);
     	sms(result, chatId, ip);
     })
    }
    else if(content == "2") {
        	parse.getJokes(function(result) {
          	for(var idx in result) {
    			console.log(result[idx]);
    			sms(result[idx], chatId, ip);
   		}
     })
    }
    else if(content == "3") {
      db.find({where: {state: false, userId: userId, ip: ip}})
      .then(function(user) {
        console.log(user);
        let message = "";
        if(user) {
          message = "Рассылка уже отключена.\n\uE21FВключить обратно";
        } else {
          db.update({state: false},{where: {userId: userId,ip: ip}});
          message = "Вы отключили ежедневную рассылку.\n\uE21FВключить обратно";
        }
        console.log(message);
        sms(message, chatId, ip);
      })

    }
    else if(content == "4") {
      db.update({state: true},{where: {userId: userId,ip: ip}});
      let message = "Вы включили ежедневную рассылку.\n\uE21CВыключить обратно";
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
