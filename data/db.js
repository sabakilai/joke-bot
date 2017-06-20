var Sequelize = require("sequelize");
var sequelize = new Sequelize("turtle_db", "mbrcienx", "mBZL8DgepbOWiPn_JXWEElF97g2ixtDT", {
	host: "fizzy-cherry.db.elephantsql.com",
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
