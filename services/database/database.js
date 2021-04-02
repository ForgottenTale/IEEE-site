const mysql = require('mysql');
const { schema } = require('./ddl.js');
const { User } = require('../controller.js');

let connection;

module.exports = {
	connect: function (done){

		console.log("Trying to establish connection");

		connection = mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			multipleStatements: true
		});
		
		connection.connect((err)=>{
			if(err){
				console.log("Error in establishing connection");
				return done(err);
			}
			console.log("Connection established");
			return done(null);
		});
		
		connection.query(schema.join(), function (err, results, fields) {
			if (err) return done(err);
		});
	},

	findOne: function (params, done) {
		let values = User.getValues(params).join(' AND ');
		let query = "SELECT * FROM USERS WHERE " + values + ";";
		connection.query(query, (err, results, fields) => {
			if (err) {return done(err)};
			try{
				let user = new User(results[0]);
				return done(null, user);
			}catch(err){
				return done(null, undefined);
			}
		})
	},

	insertUser: function (user, done) {
		let {names, values} = user.getAllNamesAndValues();
		let query = "INSERT INTO users(" + names.join(',') +") VALUES(" + values.join(',') + ");";
		connection.query(query, (err, results, fields) => {
			if(err) {
				console.error(err);
				return done({code: err.code})
			};
			return done(null, results);
		})
	}
}