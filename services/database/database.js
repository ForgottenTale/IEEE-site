const mysql = require('mysql');
const { schema } = require('./ddl.js');
const { User } = require('../controller.js');

let connection;

function executeQuery(query){
	return new Promise((resolve, reject)=>{
		connection.query(query, (err, results, fields)=>{
			if(err) return reject(err);
			return resolve(results);
		})
	})
}

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
				return done(err, false);
			};
			return done(null, results);
		})
	},

	addAppointment: async function(newAppointment, done){
		try{
			newAppointment.status = "PENDING";
			let {names, values} = newAppointment.getAllNamesAndValues();
			let config = await executeQuery("SELECT * FROM config WHERE appointment_type='" + newAppointment.type + "';");
			let nextApprovers = [];
			if(config[0].follow_service_assignment){
				//find Assignees
				[...await(executeQuery("SELECT * FROM service_assignment WHERE appointment_type=" 
					+ ("'" + newAppointment.type + "'") 
					+" AND (service_name=" 
					+ ("'" + newAppointment.serviceName + "'" )
					+ " OR service_name is null);"
				))]
				.forEach(info=>{
					if(nextApprovers.indexOf(info.assigned_to)==-1)
						nextApprovers.push(info.assigned_to);
				});
			}else{
				//find Beta Admins
				[...await(executeQuery("SELECT * FROM user WHERE role='BETA_ADMIN';"
				))]
				.forEach(user=>{
					if(nextApprovers.indexOf(user._id)==-1)
						nextApprovers.push(user._id);
				})
			}
			if(!config[0].follow_hierarchy){
				//find Alpha Admins
				[...await(executeQuery("SELECT * FROM user WHERE role='ALPHA_ADMIN';"
				))]
				.forEach(user=>{
					if(nextApprovers.indexOf(user._id)==-1)
						nextApprovers.push(user._id);
				})
			}
			
			let addAppointmentQ = "INSERT INTO " + newAppointment.type 
				+ "(" + names.join(',') + ") VALUES(" + values.join(',') + ");";
			let addedAppointment = await executeQuery(addAppointmentQ);
			let addNextApprovers = nextApprovers.map(userId=>{
				return ("INSERT INTO next_to_approve(user_id," +newAppointment.type + "_id) VALUES("
					+ userId +","+addedAppointment.insertId
					+ ");"
				)
			}).join("");
			await executeQuery(addNextApprovers);
			return done(null, addedAppointment);			
		}
		catch(err){
			return done(err);
		}
	}
}