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
			connection.query(schema.join(''), function (err, results, fields) {
				if (err) return done(err);
				return done(null);
			});
		});
	},

	findUser: function (params, done) {
		let values = User.getValues(params).join(' AND ');
		let query = "SELECT * FROM user WHERE " + values + ";";
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

	addUser: function (user, done) {
		let {names, values} = user.getAllNamesAndValues();
		let query = "INSERT INTO user(" + names.join(',') +") VALUES(" + values.join(',') + ");";
		connection.query(query, (err, results, fields) => {
			if(err) {
				console.error(err);
				return done({code: err.code})
			};
			return done(null, results);
		})
	},

	addAppointment: function(newAppointment, done){
		let {names, values} = newAppointment.getAllNamesAndValues();
		let query = "INSERT INTO " + newAppointment.type 
			+ "(" + names.join(',') + ") VALUES(" + values.join(',') + ");";
		console.log(query)
		connection.query(query, (err, results, fields)=>{
			if(err){
				console.error(err);
				return done(err);
			}
			return done(null, results);
		})
	}
}