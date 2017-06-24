"use stricts";
var express = require('express');
var db = require("../data/db.js");
var sms = require("../models/sms.js");
var newChat = require("../models/newchat.js");
var async = require('async');
var router = express.Router();
var pg = require('pg');
var chui = require('../data/meteo/chui.json');
var osh = require('../data/meteo/osh.json');
var naryn = require('../data/meteo/naryn.json');
var isyk = require('../data/meteo/isyk.json');
var capitals = require('../data/meteo/capitals.json');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", function(req, res, next) {
  var ip = req.connection.remoteAddress;
    var event = req.body.event;
    var selectRegion = function() {
      return " Выберите регион в котором вы находитесь, для этого введите нужную цифру:\n1⃣ Чуйская и Таласcкая области.\n2⃣Ошская, Жалалабадская и Баткенская области. \n3 Нарынская область. \n4 Иссык-Кульская область.  \n5 Бишкек. \n6 Ош.";
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
        if (user.state){
          if(content == "1") {
            var svodka = function () {
              return chui.text.first_day + chui.text.second_day + "\n" +
                     chui.second_table.row_1.name +
                     "\n Днем: " + chui.second_table.row_1.day_temp + " Ночью: " + chui.second_table.row_1.day_temp + "\n" +
                     chui.second_table.row_2.name +
                     "\n Днем: " + chui.second_table.row_2.day_temp + " Ночью: " + chui.second_table.row_2.day_temp
            }
            var message = "Вы установили рассылку на Чуйскую и Таласcкую области. Вот последняя сводка по этому региону";

            db.update({region: 1, state:false}, {where: {userId: userId}}).then(function(user) {
              sms(message, chatId, ip, function() {
                setTimeout(function() {
                  sms(svodka(), chatId, ip);
                }, 1000);
              })
            })
          }
          else if(content == "2") {
            var svodka = function () {
              return osh.text.first_day + osh.text.second_day + "\n" +
                     osh.second_table.row_1.name +
                     "\n Днем: " + osh.second_table.row_1.day_temp + " Ночью: " + osh.second_table.row_1.day_temp + "\n" +
                     osh.second_table.row_2.name +
                     "\n Днем: " + osh.second_table.row_2.day_temp + " Ночью: " + osh.second_table.row_2.day_temp
            }
            var message = "Вы установили рассылку на Ошскую, Жалалабадскую и Баткенскую области. Вот последняя сводка по этому региону";

            db.update({region: 2, state:false}, {where: {userId: userId}}).then(function(user) {
              sms(message, chatId, ip, function() {
                setTimeout(function() {
                  sms(svodka(), chatId, ip);
                }, 1000);
              })
            })
          }
          else if(content == "3") {
            var svodka = function () {
              return naryn.text.first_day + naryn.text.second_day + "\n" +
                     naryn.second_table.row_1.name +
                     "\n Днем: " + naryn.second_table.row_1.day_temp + " Ночью: " + naryn.second_table.row_1.day_temp
            }
            var message = "Вы установили рассылку на Нарынскую область. Вот последняя сводка по этому региону";

            db.update({region: 3, state:false}, {where: {userId: userId}}).then(function(user) {
              sms(message, chatId, ip, function() {
                setTimeout(function() {
                  sms(svodka(), chatId, ip);
                }, 1000);
              })
            })
          }
          else if(content == "4") {
            var svodka = function () {
              return isyk.text.first_day + isyk.text.second_day + "\n" +
                     isyk.second_table.row_1.name +
                     "\n Днем: " + isyk.second_table.row_1.day_temp + " Ночью: " + isyk.second_table.row_1.day_temp + "\n" +
                     (isyk.first_table.water.first_date.length>0 ? "Вода в озере\n" + isyk.first_table.water.first_date + isyk.first_table.water.first_temp + "\n" +isyk.first_table.water.second_date + isyk.first_table.water.second_temp : "")
            }
            var message = "Вы установили рассылку на Иссык-Кульская область. Вот последняя сводка по этому региону";

            db.update({region: 4, state:false}, {where: {userId: userId}}).then(function(user) {
              sms(message, chatId, ip, function() {
                setTimeout(function() {
                  sms(svodka(), chatId, ip);
                }, 1000);
              })
            })
          }
          else if(content == "5") {
            var svodka = function () {
              return capitals.text.bishek +
                     "\nВосход солнца: " + capitals.first_table.sunrise +
                     "\nЗаход солнца: " + capitals.first_table.sunset +
                     "\nРадиационный фон : " + capitals.first_table.radiation +
                     "\nПогода \n" +
                     capitals.bishkek_table.date_1.date + " днем " + capitals.bishkek_table.date_1.day_temp + " ночью " + capitals.bishkek_table.date_1.night_temp + "\n"
                     capitals.bishkek_table.date_2.date + " днем " + capitals.bishkek_table.date_2.day_temp + " ночью " + capitals.bishkek_table.date_2.night_temp + "\n"
                     capitals.bishkek_table.date_3.date + " днем " + capitals.bishkek_table.date_3.day_temp + " ночью " + capitals.bishkek_table.date_3.night_temp + "\n"
                     (capitals.text.storm.length>0 ? capitals.text.storm : "")
            }
            var message = "Вы установили рассылку на Бишкек. Вот последняя сводка по этому региону";

            db.update({region: 5, state:false}, {where: {userId: userId}}).then(function(user) {
              sms(message, chatId, ip, function() {
                setTimeout(function() {
                  sms(svodka(), chatId, ip);
                }, 1000);
              })
            })
          }
          else if(content == "6") {
            var svodka = function () {
              return capitals.text.osh +
                     "\nПогода \n" +
                     capitals.osh_table.date_1.date + " днем " + capitals.osh_table.date_1.day_temp + " ночью " + capitals.osh_table.date_1.night_temp + "\n"
                     capitals.osh_table.date_2.date + " днем " + capitals.osh_table.date_2.day_temp + " ночью " + capitals.osh_table.date_2.night_temp + "\n"
                     capitals.osh_table.date_3.date + " днем " + capitals.osh_table.date_3.day_temp + " ночью " + capitals.osh_table.date_3.night_temp + "\n"
                     (capitals.text.storm.length>0 ? capitals.text.storm : "")

            }
            var message = "Вы установили рассылку на Ош. Вот последняя сводка по этому региону";

            db.update({region: 6, state:false}, {where: {userId: userId}}).then(function(user) {
              sms(message, chatId, ip, function() {
                setTimeout(function() {
                  sms(svodka(), chatId, ip);
                }, 1000);
              })
            })
          }
          else {
            console.log(errMessage);
        		sms(errMessage, chatId, ip);
          }
        } else {
          if(content == "Сменить регион"){
            db.update({state: true}, {where: {userId: userId}}).then(function(user) {
              sms(selectRegion(), chatId, ip);
            })
          } else {
            console.log(errMessage);
        		sms(errMessage, chatId, ip);
          }
        }
     })
    }
  res.end();
});



module.exports = router;
