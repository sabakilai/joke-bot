"use strict"
var meteoparser = require('./meteoparser');
var mesparser = require('./mesparser');
var fs = require('fs');
var db = require('../data/db.js');
var svodka = require('./svodka');
var async = require('async')
var sms = require("../models/sms.js");
var newChat = require("../models/newchat.js");
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./bucket.json');
var s3 = new AWS.S3();

var newMesMessage = 0;

module.exports = {
  MainJob(){
    let message = [];
    message.push(Chui());
    message.push(Osh());
    message.push(Naryn());
    message.push(Isyk());
    message.push(Capitals());
    message.push(GetMesMessage());

    Promise.all(message).then((messages)=>{
      console.log(messages);
      //SendDailyMessages();
    }).catch(
        (err)=>{console.log(err);}
      )
    }
};

function Chui() {
  return new Promise((resolve ,reject )=>{
    meteoparser.Chui().then(
      (datas) => {
        var output = {
          text: {first_day:datas[0], second_day:datas[1]},
          first_table: {sunrise:datas[2], sunset:datas[3], radiation:datas[4]},
          second_table: {
            row_1: {name:datas[5], day_temp:datas[6], night_temp:datas[7]},
            row_2: {name:datas[8],day_temp:datas[9],night_temp:datas[10]}
          }
        };
        output = JSON.stringify(output);
        var currenttime = new Date().toLocaleString();
        var params = {
            Bucket: 'meteokgbot',
            Key: "chui.json",
            Body: output
        };
        s3.putObject(params, function (perr, pres) {
            if (perr) {
                console.log("Error uploading data: ", perr);
            } else {
                resolve('Added Chui file ' + currenttime);
            }
        });
      }
    ).catch(
      (err)=>{
        console.log(err);
        reject(err);
      }
    )
  })

};

function Osh() {
  return new Promise((resolve ,reject )=>{
    meteoparser.Osh().then(
      (datas) => {
        var output = {
          text: {first_day:datas[0], second_day:datas[1]},
          second_table:{
            row_1: {name:datas[2], day_temp:datas[3],night_temp:datas[4]},
            row_2: {name:datas[5], day_temp:datas[6],night_temp:datas[7]}
          }
        };
        output = JSON.stringify(output);
        var currenttime = new Date().toLocaleString();
        var params = {
            Bucket: 'meteokgbot',
            Key: "osh.json",
            Body: output
        };
        s3.putObject(params, function (perr, pres) {
            if (perr) {
                console.log("Error uploading data: ", perr);
            } else {
                resolve('Added Osh file ' + currenttime);
            }
        });
      }
    ).catch(
      (err)=>{
        console.log(err);
        reject(err);
      }
    )
  })
};

function Naryn() {
  return new Promise((resolve ,reject )=>{
    meteoparser.Naryn().then(
      (datas) => {
        var output = {
          text:{first_day:datas[0],second_day:datas[1]},
          second_table:{
            row_1:{name:datas[2],day_temp:datas[3],night_temp:datas[4]}
          }
        };
        output = JSON.stringify(output);
        var currenttime = new Date().toLocaleString();
        var params = {
            Bucket: 'meteokgbot',
            Key: "naryn.json",
            Body: output
        };
        s3.putObject(params, function (perr, pres) {
            if (perr) {
                console.log("Error uploading data: ", perr);
            } else {
                resolve('Added Naryn file ' + currenttime);
            }
        });
      }
    ).catch(
      (err)=>{
        console.log(err);
        reject(err);
      }
    )
  })
};

function Isyk() {
  return new Promise((resolve ,reject )=>{
    meteoparser.Isyk().then(
      (datas) => {
        var output = {
          text:{first_day:datas[0],second_day:datas[1]},
          first_table:{
            radiation:datas[2],
            water:{first_date:datas[3],first_temp:datas[4],second_date:datas[5],second_temp:datas[6]}
          },
          second_table:{
            row_1:{name:datas[7],day_temp:datas[8],night_temp:datas[9]}
          }
        };
        output = JSON.stringify(output);
        var currenttime = new Date().toLocaleString();
        var params = {
            Bucket: 'meteokgbot',
            Key: "isyk.json",
            Body: output
        };
        s3.putObject(params, function (perr, pres) {
            if (perr) {
                console.log("Error uploading data: ", perr);
            } else {
                resolve('Added Isyk file ' + currenttime);
            }
        });
      }
    ).catch(
      (err)=>{
        console.log(err);
        reject(err);
      }
    )
  })
};

 function Capitals() {
   return new Promise((resolve ,reject )=>{
    meteoparser.Capitals().then(
      (datas) => {
        var output = {
          text:{bishek:datas[0],osh:datas[1],storm:datas[2]},
          first_table:{sunrise:datas[3],sunset:datas[4],radiation:datas[5]},
          bishkek_table:{
            date_1:{date:datas[6],day_temp:datas[7],night_temp:datas[8]},
            date_2:{date:datas[9],day_temp:datas[10],night_temp:datas[11]},
            date_3:{date:datas[12],day_temp:datas[13],night_temp:datas[14]}
          },
          osh_table:{
            date_1:{date:datas[15],day_temp:datas[16],night_temp:datas[17]},
            date_2:{date:datas[18],day_temp:datas[19],night_temp:datas[20]},
            date_3:{date:datas[21],day_temp:datas[22],night_temp:datas[23]}
          }
        };
        output = JSON.stringify(output);
        var currenttime = new Date().toLocaleString();
        var params = {
            Bucket: 'meteokgbot',
            Key: "capitals.json",
            Body: output
        };
        s3.putObject(params, function (perr, pres) {
            if (perr) {
                console.log("Error uploading data: ", perr);
            } else {
                resolve('Added Capitals file ' + currenttime);
            }
        });
      }
    ).catch(
      (err)=>{
        console.log(err);
        reject(err);
      }
    )
  })
};

function GetMesMessage() {
  return new Promise((resolve ,reject )=>{
    mesparser.GetLinks().then(
      (parsed_links) => {
        parsed_links = parsed_links.replace(/[\[\]']+/g, '').split(",");
        var params = {
            Bucket: 'meteokgbot',
            Key: "links.json"
        };
        s3.getObject(params, function(err, data) {
          if (err) {
            console.log(err)
          }
          else {
            var file_links = data.Body.toString().replace(/[\[\]']+/g, '').split(",")
            if (file_links[0]!=parsed_links[0]){
              var url = parsed_links[0].replace(/['"]+/g, '');
              mesparser.WriteMesMessage(url);
              var params = {
                  Bucket: 'meteokgbot',
                  Key: "links.json",
                  Body: parsed_links
              };
              newMesMessage = 1;
              s3.putObject(params, function (perr, pres) {
                  if (perr) {
                      console.log("Error uploading data: ", perr);
                  } else {
                      resolve('Added new links file ' + currenttime);
                  }
              });
            } else {
              resolve('No new event on mes.kg');
            }
          }
        });
      }
    ).catch(
      (err)=>{
        console.log(err);
        reject(err);
      }
    )
  })
};

function SendDailyMessages() {
  db.findAll().then(function(results) {
    async.each(results, function(result,callback){
      var output;
      var userId = result.userId;
      var ip = result.ip;
      var region = result.region;
      switch(region) {
          case 1:
              output = svodka.svodkaChui();
              break;
          case 2:
              output = svodka.svodkaOsh();
              break;
          case 3:
              output = svodka.svodkaNaryn();
              break;
          case 4:
              output = svodka.svodkaIsyk();
              break;
          case 5:
              output = svodka.svodkaBishkek();
              break;
          case 6:
              output = svodka.svodkaSouthCapital();
              break;
      }
      newChat(userId, ip, function(err, res, body) {
        if(body.data) {
          var chatId = body.data.id;
        }
        sms(output, chatId, ip, function() {
          setTimeout(function() {
            if (newMesMessage == 1){
              sms(svodka.svodkaMes(), chatId, ip);
            }
          }, 3000);
        });
      })
    })
  });
}
