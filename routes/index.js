"use stricts";
var express = require('express');
var db = require("../data/db.js");
var sms = require("../models/sms.js");
var newChat = require("../models/newchat.js");
var parse = require("../models/parse.js");
var async = require('async');
var router = express.Router();
var pg = require('pg');
var chui = require('../data/meteo/chui.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", function(req, res, next) {
  var ip = req.connection.remoteAddress;
    var event = req.body.event;
    var selectRegion = function() {
      return " Выберите регион в котором вы находитесь, для этого введите нужную цифру:\n1⃣ Чуйская и Таласcкая области.\n2⃣Ошская, Жалалабадская и Баткенская области. \n3 Нарынская область. \n4 Иссык-Кульская область. \n5 Нарынская область. \n6 Бишкек. \n7 Ош.";
    }
    var sendMeteoMessage = function () {
      return "Сообщение с метео.кг"
    }

    if(event == "user/unfollow") {
    	var userId = req.body.data.id;
    	db.destroy({where:{userId: userId}}).then(function(err) {
        console.log("db destroyed");
      });
    }
    if(event == "user/follow") {
      var userId = req.body.data.id;
      db.create({userId: userId, ip: ip}).then(function(user) {
        console.log("user follows");
        newChat(userId, ip, function(err, res, body) {
          var chatId = body.data.id;
          var message = "Здравствуйте!Я буду присылать вам самые свежие сообщения о погоде." + selectRegion();
          sms(message, chatId, ip);
        })
      });
    }
    if(event == "message/new") {
      var userId = req.body.data.sender_id;
      db.find({where: {userId: userId}})
      .then(function(user) {
        var errMessage = "Некорректный ввод." + selectRegion();
      	var content = req.body.data.content;
      	var chatId = req.body.data.chat_id;
      	if(req.body.data.type != 'text/plain') {
      		console.log(errMessage);
      		sms(errMessage, chatId, ip);
      		return;
      	}

        if(content == "1") {
          //set region to proper
            console.log(chui.second_table);
            var svodka = function () {
              return chui.text.first_day + chui.text.second_day ;//+ "\n" +
                     //chui.second_table.row1.name +
                     //" днем: " + chui.second_table.row1.day_temp + " ночью: " + chui.second_table.row1.day_temp + "\n" +
                     //chui.second_table.row2.name +
                     //" днем: " + chui.second_table.row2.day_temp + " ночью: " + chui.second_table.row2.day_temp
            }
            var message = "Вы установили рассылку на Чуйскую и Таласcкую области. Вот последняя сводка по этому региону";
            console.log(svodka());
            sms(message, chatId, ip, function() {
              setTimeout(function() {
                sms(svodka(), chatId, ip);
              }, 1000);
            })

          //set last message of region


        }
        else if(content == "2") {
          parse.getJokes(function(result) {
            sms(result, chatId, ip, function() {
              setTimeout(function() {
                sms("Хотите ли еще получить свежий анекдот?"+commandMessage(user), chatId, ip);
              }, 1000);
            })
          })
        }
        else if(content == "3") {
          db.find({where: {userId: userId, ip: ip}})
          .then(function(user) {
            if(user.state) {
              db.update({state: false}, {where: {userId: userId, ip: ip}}).then(function(user) {
                var message = "Вы отключили ежедневную рассылку."+commandMessage(user);
                sms(message, chatId, ip);
              })
            } else {
              db.update({state: true}, {where: {userId: userId, ip: ip}}).then(function(user) {
                var message = "Вы включили ежедневную рассылку."+commandMessage(user);
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
});



module.exports = router;
