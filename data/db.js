var Sequelize = require("sequelize");
var sequelize = new Sequelize("d6mj1dlabcqktm", "yuoxfljtvpjfle", "90b156183131cbec93fcea0aa1d1d91fd7589c70f527ac7a1fec221e06442b68", {
	host: "ec2-54-225-71-119.compute-1.amazonaws.com",
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
	},
	region: {
		type: Sequelize.INTEGER,
	    defaultValue: 7
	},
	subscribed:{
		type:Sequelize.BOOLEAN,
			defaultValue:true
	}
})

user.sync().then(function() {});



module.exports = user;
