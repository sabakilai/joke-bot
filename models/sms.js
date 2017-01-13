var config = require('../config.js');
var request=require("request");

module.exports=function(message, chatId, ip, callback){
	var token;
  if(ip === "::ffff:77.235.20.133") {
    url = "http://77.235.20.133:3000/chats/",
    token = config.token.staging;
  }
  else {
    url = "http://api.namba1.co/chats/";
    token = config.token.production;
  }
	var data={
	url: url + chatId + "/write",
	method:"POST",
	headers:{
		'X-Namba-Auth-Token': token
	},
	body:{
		"type":"text/plain",
		"content":message
	},
	json: true
	}
	request(data,callback);
};