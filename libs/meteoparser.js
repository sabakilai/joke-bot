"use strict"
let Parser = require('./parse');
let p = new Parser();

module.exports = {
  Chui() {
    var url = 'http://meteo.kg/index.php?reg=chu';
    var data = [];
    data.push(p.get(url,'#txt > p:nth-child(2)' )); // weather text for first day
    data.push(p.get(url,'#txt > p:nth-child(1)' )); // weather text for second day
    data.push(p.get(url,'#txt > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2)' )); // sunrise
    data.push(p.get(url,'#txt > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)' )); // sunset
    data.push(p.get(url,'#txt > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)' )); // radiation
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(1)' )); //Chui
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(3)' )); //day_temp
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)' )); //night_temp
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(1)' )); //Talas
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(3)' )); //day_temp
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2)' )); //night_temp

    return Promise.all(data);
  },

  Osh() {
    var url = 'http://meteo.kg/index.php?reg=osh';
    var data = [];
    data.push(p.get(url,'#txt > p:nth-child(2)' )); // weather text for first day
    data.push(p.get(url,'#txt > p:nth-child(1)' )); // weather text for second day
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(1)' )); //Chui
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(3)' )); //day_temp
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)' )); //night_temp
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(1)' )); //Talas
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(3)' )); //day_temp
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2)' )); //night_temp

    return Promise.all(data)
  },

  Naryn() {
    var url = 'http://meteo.kg/index.php?reg=naryn';
    var data = [];
    data.push(p.get(url,'#txt > p:nth-child(2)' )); // weather text for first day
    data.push(p.get(url,'#txt > p:nth-child(1)' )); // weather text for second day
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(1)' )); //Chui
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(3)' )); //day_temp
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)' )); //night_temp
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(1)' )); //Talas
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(3)' )); //day_temp
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2)' )); //night_temp

    return Promise.all(data)
  },
  Isyk() {
    var url = 'http://meteo.kg/index.php?reg=lake';
    var data = [];
    data.push(p.get(url,'#txt > p:nth-child(2)' )); // weather text for first day
    data.push(p.get(url,'#txt > p:nth-child(1)' )); // weather text for second day
    data.push(p.get(url,'#txt > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2)' )); // radiation

    data.push(p.get(url,'#txt > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(1)' )); // sunset
    data.push(p.get(url,'#txt > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(2)' )); //
    data.push(p.get(url,'#txt > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1)' )); //Chui
    data.push(p.get(url,'#txt > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(2)' )); //day_temp


    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(1)' )); //Talas
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(3)' )); //day_temp
    data.push(p.get(url,'#stranka > table:nth-child(4) > tbody > tr > td:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)' )); //night_temp

    return Promise.all(data)
  },

  Capitals() {
    var url = 'http://meteo.kg/index.php?reg=capitals';
    var data = [];
    data.push(p.get(url,'#txt > p:nth-child(2)' )); // weather text for biskek
    data.push(p.get(url,'#txt > p:nth-child(6)' )); // weather text for osh
    data.push(p.get(url,'#txt_red > p' )); //storm
    data.push(p.get(url,'#txt > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2)' )); // sunrise
    data.push(p.get(url,'#txt > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)' )); // sunset
    data.push(p.get(url,'#txt > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)' )); // radiation

    data.push(p.get(url,'#txt > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(2)' )); //bishkek_table
    data.push(p.get(url,'#txt > table:nth-child(3) > tbody > tr:nth-child(3) > td:nth-child(3)' ));
    data.push(p.get(url,'#txt > table:nth-child(3) > tbody > tr:nth-child(3) > td:nth-child(2)' ));

    data.push(p.get(url,'#txt > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(3)' )); //bishkek_table
    data.push(p.get(url,'#txt > table:nth-child(3) > tbody > tr:nth-child(3) > td:nth-child(5)' ));
    data.push(p.get(url,'#txt > table:nth-child(3) > tbody > tr:nth-child(3) > td:nth-child(4)' ));

    data.push(p.get(url,'#txt > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(4)' )); //bishkek_table
    data.push(p.get(url,'#txt > table:nth-child(3) > tbody > tr:nth-child(3) > td:nth-child(7)' ));
    data.push(p.get(url,'#txt > table:nth-child(3) > tbody > tr:nth-child(3) > td:nth-child(6)' ));

    data.push(p.get(url,'#txt > table:nth-child(7) > tbody > tr:nth-child(1) > td:nth-child(2)' )); //osh_table
    data.push(p.get(url,'#txt > table:nth-child(7) > tbody > tr:nth-child(3) > td:nth-child(3)' ));
    data.push(p.get(url,'#txt > table:nth-child(7) > tbody > tr:nth-child(3) > td:nth-child(2)' ));

    data.push(p.get(url,'#txt > table:nth-child(7) > tbody > tr:nth-child(1) > td:nth-child(3)' )); //osh_table
    data.push(p.get(url,'#txt > table:nth-child(7) > tbody > tr:nth-child(3) > td:nth-child(5)' ));
    data.push(p.get(url,'#txt > table:nth-child(7) > tbody > tr:nth-child(3) > td:nth-child(4)' ));

    data.push(p.get(url,'#txt > table:nth-child(7) > tbody > tr:nth-child(1) > td:nth-child(4)' )); //osh_table
    data.push(p.get(url,'#txt > table:nth-child(7) > tbody > tr:nth-child(3) > td:nth-child(7)' ));
    data.push(p.get(url,'#txt > table:nth-child(7) > tbody > tr:nth-child(3) > td:nth-child(6)' ));

    return Promise.all(data)
  }

};
