var Sequelize = require("sequelize");
var sequelize = new Sequelize("d7roeu94oi5bej", "ktfrjofakzcjyr", "7de518a2dbe842b344f3bad6235e07a8bc1459d9fc7e1afacfdc0f7a397fea1c", {
	host: "ec2-107-20-186-238.compute-1.amazonaws.com",
	dialect: "postgres"
});

var user = sequelize.define("user", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	userId: Sequelize.INTEGER,
	ip: Sequelize.STRING,
	state: {
		type: Sequelize.BOOLEAN,
	    defaultValue: true
	}
})

user.sync().then(function() {});



module.exports = user;
