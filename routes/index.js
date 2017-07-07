"use stricts";
var express = require('express');
var db = require("../data/db.js");
var sms = require("../models/sms.js");
var newChat = require("../models/newchat.js");
var async = require('async');
var router = express.Router();
var pg = require('pg');
var svodka = require('../libs/svodka');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", function(req, res, next) {
  var ip = req.connection.remoteAddress;
    var event = req.body.event;
    var selectRegion = function() {
      return " Выберите регион в котором вы находитесь, для этого введите нужную цифру:\n1⃣ Чуйская и Таласcкая области.\n2⃣Ошская, Жалалабадская и Баткенская области. \n3⃣ Нарынская область. \n4⃣ Иссык-Кульская область.  \n5⃣ Бишкек. \n6⃣ Ош.";
    }
    var changeRegion = function (subscribed) {
      return "Введите 'Cменить', чтобы сменить регион.\nВведите 'Подписка', чтобы " +(subscribed ? "отключить" : "включить") + " ежедневную рассылку." +
              (subscribed ? "" : "\nВведите 'Последнее', чтобы получить последнюю сводку по Вашему региону.")
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
          var message = "Здравствуйте! Я буду присылать вам самые свежие сообщения о погоде." + selectRegion();
          sms(message, chatId, ip);
        })
      });

    }
    if(event == "message/new") {
      var userId = req.body.data.sender_id;
      db.find({where: {userId: userId}})
      .then(function(user) {

      	var content = req.body.data.content;
      	var chatId = req.body.data.chat_id;
        var subscribed = user.subscribed;
        console.log(subscribed);
      	if(req.body.data.type != 'text/plain') {
      		console.log(errMessage);
      		sms(errMessage, chatId, ip);
      		return;
      	}
        if (user.state){
          var errMessage = "Некорректный ввод. " + selectRegion();
          if(content == "1") {
            var message = "Вы установили рассылку на Чуйскую и Таласcкую области. Вот последняя сводка по этому региону";
            db.update({region: 1, state:false}, {where: {userId: userId}}).then(function(user) {

              sms(message, chatId, ip, function() {
                setTimeout(function() {
                  svodka.svodkaChui().then(
                    (result)=>{
                      sms(result, chatId, ip,function() {
                        setTimeout(function() {
                          sms(changeRegion(subscribed), chatId, ip);
                        }, 3000);
                      });
                    }
                  ).catch((err)=>{
                    console.log(err);
                  });

                }, 1000);
              })
            })
          }
          else if(content == "2") {
            var message = "Вы установили рассылку на Ошскую, Жалалабадскую и Баткенскую области. Вот последняя сводка по этому региону";
            db.update({region: 2, state:false}, {where: {userId: userId}}).then(function(user) {
              sms(message, chatId, ip, function() {
                setTimeout(function() {
                  svodka.svodkaOsh().then(
                    (result)=>{
                      sms(result, chatId, ip,function() {
                        setTimeout(function() {
                          sms(changeRegion(subscribed), chatId, ip);
                        }, 3000);
                      });
                    }
                  ).catch((err)=>{
                    console.log(err);
                  });
                }, 1000);
              })
            })
          }
          else if(content == "3") {
            var message = "Вы установили рассылку на Нарынскую область. Вот последняя сводка по этому региону";
            db.update({region: 3, state:false}, {where: {userId: userId}}).then(function(user) {
              sms(message, chatId, ip, function() {
                setTimeout(function() {
                  svodka.svodkaNaryn().then(
                    (result)=>{
                      sms(result, chatId, ip,function() {
                        setTimeout(function() {
                          sms(changeRegion(subscribed), chatId, ip);
                        }, 3000);
                      });
                    }
                  ).catch((err)=>{
                    console.log(err);
                  });
                }, 1000);
              })
            })
          }
          else if(content == "4") {
            var message = "Вы установили рассылку на Иссык-Кульскую область. Вот последняя сводка по этому региону";
            db.update({region: 4, state:false}, {where: {userId: userId}}).then(function(user) {
              sms(message, chatId, ip, function() {
                setTimeout(function() {
                  svodka.svodkaIsyk().then(
                    (result)=>{
                      sms(result, chatId, ip,function() {
                        setTimeout(function() {
                          sms(changeRegion(subscribed), chatId, ip);
                        }, 3000);
                      });
                    }
                  ).catch((err)=>{
                    console.log(err);
                  });
                }, 1000);
              })
            })
          }
          else if(content == "5") {
            var message = "Вы установили рассылку на Бишкек. Вот последняя сводка по этому региону";

            db.update({region: 5, state:false}, {where: {userId: userId}}).then(function(user) {
              sms(message, chatId, ip, function() {
                setTimeout(function() {
                  svodka.svodkaBishkek().then(
                    (result)=>{
                      sms(result, chatId, ip,function() {
                        setTimeout(function() {
                          sms(changeRegion(subscribed), chatId, ip);
                        }, 3000);
                      });
                    }
                  ).catch((err)=>{
                    console.log(err);
                  });
                }, 1000);
              })
            })
          }
          else if(content == "6") {
            var message = "Вы установили рассылку на Ош. Вот последняя сводка по этому региону";
            db.update({region: 6, state:false}, {where: {userId: userId}}).then(function(user) {
              sms(message, chatId, ip, function() {
                setTimeout(function() {
                  svodka.svodkaSouthCapital().then(
                    (result)=>{
                      sms(result, chatId, ip,function() {
                        setTimeout(function() {
                          console.log(subscribed);
                          sms(changeRegion(subscribed), chatId, ip);
                        }, 3000);
                      });
                    }
                  ).catch((err)=>{
                    console.log(err);
                  });
                }, 1000);
              })
            })
          }
          else {
            console.log(errMessage);
        		sms(errMessage, chatId, ip);
          }
        } else {
          var errMessage = "Некорректный ввод. " + changeRegion(subscribed);
          if(content == "Сменить"){
            db.update({state: true}, {where: {userId: userId}}).then(function(user) {
              sms(selectRegion(), chatId, ip);
            })
          }
          else if (content == "Подписка") {
            if(subscribed) {
             db.update({subscribed: false}, {where: {userId: userId}}).then(function(user) {
               let message = "Вы отключили ежедневную рассылку. "+changeRegion(!subscribed);
               sms(message, chatId, ip);
             })
           } else {
             db.update({subscribed: true}, {where: {userId: userId, ip: ip}}).then(function(user) {
               let message = "Вы включили ежедневную рассылку. "+changeRegion(!subscribed);
               sms(message, chatId, ip);
             })
           }
          }
          else if (content == "Последнее") {
            var output;
            svodka.svodkaOne(user.region).then((result)=>{
              sms(result, chatId, ip, function () {
                setTimeout(function() {
                  sms(changeRegion(subscribed), chatId, ip);
                }, 3000);
              });
            })
          }
          else {
            console.log(errMessage);
        		sms(errMessage, chatId, ip);
          }
        }
     })
    }
  res.end();
});



module.exports = router;
