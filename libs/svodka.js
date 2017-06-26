"use strict"
var chui = require('../data/meteo/chui.json');
var osh = require('../data/meteo/osh.json');
var naryn = require('../data/meteo/naryn.json');
var isyk = require('../data/meteo/isyk.json');
var capitals = require('../data/meteo/capitals.json');
var mes = require('../data/mes/mes.json');

module.exports = {
  svodkaChui() {
    return chui.text.first_day + chui.text.second_day + "\n" +
           chui.second_table.row_1.name +
           "\n Днем: " + chui.second_table.row_1.day_temp + " Ночью: " + chui.second_table.row_1.day_temp + "\n" +
           chui.second_table.row_2.name +
           "\n Днем: " + chui.second_table.row_2.day_temp + " Ночью: " + chui.second_table.row_2.day_temp
  },
  svodkaOsh() {
    return osh.text.first_day + osh.text.second_day + "\n" +
           osh.second_table.row_1.name +
           "\n Днем: " + osh.second_table.row_1.day_temp + " Ночью: " + osh.second_table.row_1.day_temp + "\n" +
           osh.second_table.row_2.name +
           "\n Днем: " + osh.second_table.row_2.day_temp + " Ночью: " + osh.second_table.row_2.day_temp
  },
  svodkaNaryn(){
    return naryn.text.first_day + naryn.text.second_day + "\n" +
           naryn.second_table.row_1.name +
           "\n Днем: " + naryn.second_table.row_1.day_temp + " Ночью: " + naryn.second_table.row_1.day_temp
  },
  svodkaIsyk(){
    return isyk.text.first_day + isyk.text.second_day + "\n" +
           isyk.second_table.row_1.name +
           "\n Днем: " + isyk.second_table.row_1.day_temp + " Ночью: " + isyk.second_table.row_1.day_temp + "\n" +
           (isyk.first_table.water.first_date.length>0 ? "Вода в озере\n" + isyk.first_table.water.first_date + isyk.first_table.water.first_temp + "\n" +isyk.first_table.water.second_date + isyk.first_table.water.second_temp : "")
  },
  svodkaBishkek() {
    return capitals.text.bishek +
           "\nВосход солнца: " + capitals.first_table.sunrise +
           "\nЗаход солнца: " + capitals.first_table.sunset +
           "\nРадиационный фон : " + capitals.first_table.radiation +
           "\nПогода \n" +
           capitals.bishkek_table.date_1.date + " Днем " + capitals.bishkek_table.date_1.day_temp + " Ночью " + capitals.bishkek_table.date_1.night_temp + "\n" +
           capitals.bishkek_table.date_2.date + " Днем " + capitals.bishkek_table.date_2.day_temp + " Ночью " + capitals.bishkek_table.date_2.night_temp + "\n" +
           capitals.bishkek_table.date_3.date + " Днем " + capitals.bishkek_table.date_3.day_temp + " Ночью " + capitals.bishkek_table.date_3.night_temp + "\n" +
           (capitals.text.storm.length>0 ? capitals.text.storm : "")
  },
  svodkaSouthCapital(){
    return capitals.text.osh +
           "\nПогода \n" +
           capitals.osh_table.date_1.date + " Днем " + capitals.osh_table.date_1.day_temp + " Ночью " + capitals.osh_table.date_1.night_temp + "\n"
           + capitals.osh_table.date_2.date + " Днем " + capitals.osh_table.date_2.day_temp + " Ночью " + capitals.osh_table.date_2.night_temp + "\n"
           + capitals.osh_table.date_3.date + " Днем " + capitals.osh_table.date_3.day_temp + " Ночью " + capitals.osh_table.date_3.night_temp + "\n"
           + (capitals.text.storm.length>0 ? capitals.text.storm : "")
  },
  svodkaMes(){
    return mes.text;
  }
};
