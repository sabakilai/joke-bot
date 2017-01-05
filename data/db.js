var Sequelize = require("sequelize");
var sequelize = new Sequelize("botdb", "root", "root", {
	host: "localhost",
	dialect: "postgres"
});

var user = sequelize.define("User", {
	id: {
		type: Sequelize.INTEGER,
		autoincrement: true,
		primaryKey: true
	},
	userId: Sequelize.INTEGER,
	ip: Sequelize.STRING
})

user.sync().then(function() {});



module.exports = user;
