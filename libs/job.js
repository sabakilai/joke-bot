"use strict"
var meteoparser = require('./meteoparser');
var mesparser = require('./mesparser');
var fs = require('fs');

module.exports = {
  MainJob(){
    Chui();
    Osh();
    Naryn();
    Isyk();
    Capitals();
    GetMesMessage();
  }
};

function Chui() {
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
      fs.writeFile('./data/meteo/chui.json', output, 'utf8', () => {console.log('Added Chui file ' + currenttime);});
    }
  ).catch(
    (err)=>{console.log(err);}
  )
};

function Osh() {
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
      fs.writeFile('./data/meteo/osh.json', output, 'utf8', () => {console.log('Added Osh file ' + currenttime);});
    }
  ).catch(
    (err)=>{console.log(err);}
  )
};

function Naryn() {
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
      fs.writeFile('./data/meteo/naryn.json', output, 'utf8', () => {console.log('Added Naryn file ' + currenttime);});
    }
  ).catch(
    (err)=>{console.log(err);}
  )
};

function Isyk() {
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
      fs.writeFile('./data/meteo/isyk.json', output, 'utf8', () => {console.log('Added Isyk file ' + currenttime);});
    }
  ).catch(
    (err)=>{console.log(err);}
  )
};

 function Capitals() {
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
      fs.writeFile('./data/meteo/capitals.json', output, 'utf8', () => {console.log('Added Capitals file ' + currenttime);});
    }
  ).catch(
    (err)=>{console.log(err);}
  )
};

function GetMesMessage() {
  mesparser.GetLinks().then(
    (parsed_links) => {
      parsed_links = parsed_links.replace(/[\[\]']+/g, '').split(",");
      fs.readFile('./data/mes/links.json', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        var file_links = data.replace(/[\[\]']+/g, '').split(",")
        if (file_links[0]!=parsed_links[0]){

          var url = parsed_links[0].replace(/['"]+/g, '');
          mesparser.WriteMesMessage(url);
          fs.writeFile('./data/mes/links.json', parsed_links, 'utf8', () => {console.log('Added new links file ');});

        } else {
          console.log('No new event on mes.kg');
        }
      });
    }
  ).catch(
    (err)=>{console.log(err);}
  )
};

function SendMessages() {
  
}
