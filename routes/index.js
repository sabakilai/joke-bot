"use stricts";
var express = require('express');
var db = require("../data/db.js");
var sms = require("../models/sms.js");
var newChat = require("../models/newchat.js");
var parse = require("../models/parse.js");
var async = require('async');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", function(req, res, next) {
  var ip = req.connection.remoteAddress;
    var event = req.body.event;
    var commandMessage = function(user) {
      return " Введите нужную цифру:\n\uE21Cполучить случайный анекдот.\n\uE21Dполучить 10 случайных анекдотов.\n\uE21E"+(user.state ? "Отключить" : "Включить")+" ежедневную рассылку.";
    }
    if(event == "user/unfollow") {
    	let userId = req.body.data.id;
    	db.destroy({where:{userId: userId, ip: ip}}).then(function(err) {
        console.log("db destroyed");
      });
    }
    if(event == "user/follow") {
      let userId = req.body.data.id;
      db.create({userId: userId, ip: ip}).then(function(user) {
        console.log("user follows");
        newChat(userId, ip, function(err, res, body) {
          let chatId = body.data.id;
          let message = "Здравствуйте!Я буду присылать вам самые свежие анекдоты." + commandMessage(user);
          sms(message, chatId, ip);
        })
      });
    }
    if(event == "message/new") {
      var userId = req.body.data.sender_id;
      db.find({where: {userId: userId, ip: ip}})
      .then(function(user) {
        var errMessage = "Некорректный ввод." + commandMessage(user);
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
         	sms(result, chatId, ip, function() {
            sms("Хотите ли еще получить свежий анекдот? "+commandMessage(user), chatId, ip);
          });
         })
        }
        else if(content == "2") {
          parse.getJokes(function(result) {
          	async.forEachOf(result, function(joke, idx, callback) {
              if(idx == 10) {
                return callback();
              }
              sms(joke, chatId, ip, function() {
                callback();
              });
            }, function(err) {
              sms("Хотите ли еще получить свежий анекдот?"+commandMessage(user), chatId, ip);
            })
          })
        }
        else if(content == "3") {
          db.find({where: {userId: userId, ip: ip}})
          .then(function(user) {
            if(user.state) {
              db.update({state: false}, {where: {userId: userId, ip: ip}}).then(function(user) {
                let message = "Вы отключили ежедневную рассылку."+commandMessage(user);
                sms(message, chatId, ip);    
              })
            } else {
              db.update({state: true}, {where: {userId: userId, ip: ip}}).then(function(user) {
                let message = "Вы включили ежедневную рассылку."+commandMessage(user);
                sms(message, chatId, ip);
              })
            }
          })
        }
        else {
          console.log(errMessage);
      		sms(errMessage, chatId, ip);
        }
     })
    }
  res.end();
})
module.exports = router;
