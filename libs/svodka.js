"use strict"
var osh = require('../data/meteo/osh.json');
var naryn = require('../data/meteo/naryn.json');
var isyk = require('../data/meteo/isyk.json');
var capitals = require('../data/meteo/capitals.json');
var mes = require('../data/mes/mes.json');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./bucket.json');
var s3 = new AWS.S3();


module.exports = {
  svodkaChui() {
    return new Promise((resolve,reject)=>{
      var params = {
          Bucket: 'meteokgbot',
          Key: "chui.json"
      };
      s3.getObject(params, function(err, data) {
        if (err) {
          console.log(err);
          reject(err);
        }
        var chui = JSON.parse(data.Body.toString()) ;
        var resultat = chui.text.first_day + chui.text.second_day + "\n" +
               chui.second_table.row_1.name +
               "\n Днем: " + chui.second_table.row_1.day_temp + " Ночью: " + chui.second_table.row_1.day_temp + "\n" +
               chui.second_table.row_2.name +
               "\n Днем: " + chui.second_table.row_2.day_temp + " Ночью: " + chui.second_table.row_2.day_temp;
        resolve(resultat);
      })
    });
  },
  svodkaOsh() {
    return new Promise((resolve,reject)=>{
      var params = {
          Bucket: 'meteokgbot',
          Key: "osh.json"
      };
      s3.getObject(params, function(err, data) {
        if (err) {
          console.log(err);
          reject(err);
        }
        var osh = JSON.parse(data.Body.toString()) ;
        var resultat = osh.text.first_day + osh.text.second_day + "\n" +
               osh.second_table.row_1.name +
               "\n Днем: " + osh.second_table.row_1.day_temp + " Ночью: " + osh.second_table.row_1.day_temp + "\n" +
               osh.second_table.row_2.name +
               "\n Днем: " + osh.second_table.row_2.day_temp + " Ночью: " + osh.second_table.row_2.day_temp;
        resolve(resultat);
      })
    });
  },
  svodkaNaryn(){
    return new Promise((resolve,reject)=>{
      var params = {
          Bucket: 'meteokgbot',
          Key: "naryn.json"
      };
      s3.getObject(params, function(err, data) {
        if (err) {
          console.log(err);
          reject(err);
        }
        var naryn = JSON.parse(data.Body.toString()) ;
        var resultat = naryn.text.first_day + naryn.text.second_day + "\n" +
               naryn.second_table.row_1.name +
               "\n Днем: " + naryn.second_table.row_1.day_temp + " Ночью: " + naryn.second_table.row_1.day_temp;
        resolve(resultat);
      })
    });
  },
  svodkaIsyk(){
    return new Promise((resolve,reject)=>{
      var params = {
          Bucket: 'meteokgbot',
          Key: "isyk.json"
      };
      s3.getObject(params, function(err, data) {
        if (err) {
          console.log(err);
          reject(err);
        }
        var isyk = JSON.parse(data.Body.toString()) ;
        var resultat = isyk.text.first_day + isyk.text.second_day + "\n" +
               isyk.second_table.row_1.name +
               "\n Днем: " + isyk.second_table.row_1.day_temp + " Ночью: " + isyk.second_table.row_1.day_temp + "\n" +
               (isyk.first_table.water.first_date.length>0 ? "Вода в озере\n" + isyk.first_table.water.first_date + isyk.first_table.water.first_temp + "\n" +isyk.first_table.water.second_date + isyk.first_table.water.second_temp : "")
        resolve(resultat);
      })
    });
  },
  svodkaBishkek() {
    return new Promise((resolve,reject)=>{
      var params = {
          Bucket: 'meteokgbot',
          Key: "capitals.json"
      };
      s3.getObject(params, function(err, data) {
        if (err) {
          console.log(err);
          reject(err);
        }
        var capitals = JSON.parse(data.Body.toString()) ;
        var resultat = capitals.text.bishek +
               "\nВосход солнца: " + capitals.first_table.sunrise +
               "\nЗаход солнца: " + capitals.first_table.sunset +
               "\nРадиационный фон : " + capitals.first_table.radiation +
               "\nПогода \n" +
               capitals.bishkek_table.date_1.date + " Днем " + capitals.bishkek_table.date_1.day_temp + " Ночью " + capitals.bishkek_table.date_1.night_temp + "\n" +
               capitals.bishkek_table.date_2.date + " Днем " + capitals.bishkek_table.date_2.day_temp + " Ночью " + capitals.bishkek_table.date_2.night_temp + "\n" +
               capitals.bishkek_table.date_3.date + " Днем " + capitals.bishkek_table.date_3.day_temp + " Ночью " + capitals.bishkek_table.date_3.night_temp + "\n" +
               (capitals.text.storm.length>0 ? "Штормовое предупреждение! \n" +capitals.text.storm : "")
        resolve(resultat);
      })
    });
  },
  svodkaSouthCapital(){
    return new Promise((resolve,reject)=>{
      var params = {
          Bucket: 'meteokgbot',
          Key: "capitals.json"
      };
      s3.getObject(params, function(err, data) {
        if (err) {
          console.log(err);
          reject(err);
        }
        var capitals = JSON.parse(data.Body.toString()) ;
        var resultat = capitals.text.osh +
               "\nПогода \n" +
               capitals.osh_table.date_1.date + " Днем " + capitals.osh_table.date_1.day_temp + " Ночью " + capitals.osh_table.date_1.night_temp + "\n"
               + capitals.osh_table.date_2.date + " Днем " + capitals.osh_table.date_2.day_temp + " Ночью " + capitals.osh_table.date_2.night_temp + "\n"
               + capitals.osh_table.date_3.date + " Днем " + capitals.osh_table.date_3.day_temp + " Ночью " + capitals.osh_table.date_3.night_temp + "\n"
               + (capitals.text.storm.length>0 ? "Штормовое предупреждение! \n" + capitals.text.storm : "")
        resolve(resultat);
      })
    });
  },
  svodkaMes(){
    return new Promise((resolve,reject)=>{
      var params = {
          Bucket: 'meteokgbot',
          Key: "mes.json"
      };
      s3.getObject(params, function(err, data) {
        if (err) {
          console.log(err);
          reject(err);
        }
        var resultat = data.Body.toString() ;
        resolve(resultat);
      })
    });
  }
};
