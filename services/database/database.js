const mysql = require('mysql');
const { schema } = require('./ddl.js');
const { User, convertSqlDateTimeToDate, convertDateToSqlDateTime, getClass } = require('../controller.js');

let connection;

function transmuteSnakeToCamel(input){
	let output = {};
    for(let param in input){
		let temp = param;
		output[param.replace(
            /((?<=[a-z])_[a-z])|(_)/g,
            (group) => group.toUpperCase()
                            .replace('-', '')
                            .replace('_', '')
        )] = input[temp];
    }
    return output;
}

function getConfig(type, serviceName, done){
	let query = "SELECT * FROM service_config WHERE type='" + type 
		+ "' AND (service_name='" + serviceName + "' OR service_name is null);" ;
	connection.query(query, (err, results, fields)=>{
		if(err) return done(err);
		if(results.length<1)
			return done(new Error("Config not found"))
		if(results.length>2)
			results.forEach(result=>{
				if(result.service_name != null)
					return done(null, results);
			})
		return done(null, results[0]);
	})
}

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
			multipleStatements: true,
			dateStrings: true
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
			let config = await new Promise((resolve, reject)=>{
				getConfig(newAppointment.type, newAppointment.serviceName, (err, result)=>{
					if(err) return reject(err);
					return resolve(result);
				})
			})
			await new Promise((resolve, reject)=>{
				this.checkAvailability(newAppointment, (err, msg)=>{
					if(err) return reject(err);
					return resolve(msg);
				});
			})
			let nextApprovers = [];
			if(config.follow_service_assignment){
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
			if(!config.follow_hierarchy){
				//find Alpha Admins
				[...await(executeQuery("SELECT * FROM user WHERE role='ALPHA_ADMIN';"
				))]
				.forEach(user=>{
					if(nextApprovers.indexOf(user._id)==-1)
						nextApprovers.push(user._id);
				})
			}
			
			let addAppointment = "INSERT INTO " + newAppointment.type 
				+ "(" + names.join(',') + ") VALUES(" + values.join(',') + ");";
			let addedAppointment = await executeQuery(addAppointment);
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
	},

	checkAvailability: function(input, done){
		AppointmentClass = getClass(input.type);
		getConfig(input.type,input.serviceName, (err, config)=>{
			if(err) return done(err);
			let query;
			try{
				AppointmentClass.validateTime(input, config);
				query = AppointmentClass.getTimeAvailQuery(input, config);
			}catch(err){
				return done(err);
			}
			connection.query(query, (err, results, fields)=>{
				if(err) return done(err);
				if(results.length < 1){
					return done(null, "Available");
				}
				return done("Time slot unavailable");
			})
		})
	},

	getUserAppointments: function(user_id, done){
		let serviceTypes = ["online_meeting", "intern_support", "e_notice", "publicity"];
		let query = serviceTypes.reduce((total, type)=>{
			return (total+"SELECT * FROM " + type + " WHERE creator_id=" + user_id +";");
		}, "");
		executeQuery(query)
		.then(data=>{
			return done(null, data.map((elem, idx)=>{
				elem.forEach(som=>{
					som.start_time = convertSqlDateTimeToDate(som.start_time).toISOString();
					som.end_time = convertSqlDateTimeToDate(som.end_time).toISOString();
				})
				return {
					type: serviceTypes[idx],
					appointments: elem
				}
			}))
		})
		.catch(err=>done(err));
	},

	removeAppointment: function(input, done){
		executeQuery("SELECT * FROM " + input.type + " WHERE _id=" + input.appointmentId + ";")
		.then(data=>{
			if(data[0].creator_id==input.userId){
				let query = "DELETE FROM next_to_approve WHERE " + input.type + "_id=" + input.appointmentId + ";"
					+ "DELETE FROM " + input.type + " WHERE _id=" + input.appointmentId + ";"
				executeQuery(query)
				.then(response=>done(null, "Deleted Successfully"))
				.catch(err=>done(err))
			}else
				done("Appointments can only be deleted by the creator");
		})
		.catch(err=>done(err))
	},

	getCalendarData: function(constraint, done){
		startTime = convertDateToSqlDateTime(constraint.startTime);
		endTime = convertDateToSqlDateTime(constraint.endTime);
		let query = "SELECT distinct DATE(start_time) FROM " + constraint.type + " WHERE"
			+ " (start_time<='" + startTime + "' AND end_time>'" + endTime + "')"
			+ " OR (end_time<'" + endTime + "' AND end_time>='" + startTime + "')"
			+ " OR (start_time<'" + endTime + "' AND start_time>='" + startTime + "');" ;
		executeQuery(query)
		.then(distinctDates=>{
			let dataArray = [];
			let query = "";
			distinctDates.forEach(distinctDate=>{
				query += "SELECT * FROM " + constraint.type + " WHERE DATE(start_time)=DATE('" + distinctDate["DATE(start_time)"] + "');";
			})
			if(query.length>0)
				executeQuery(query)
				.then(datesAndEvents=>{
					if(datesAndEvents[0][0])
						datesAndEvents.forEach(distinctDateEvents=>{
							distinctDate = new Date(distinctDateEvents[0].start_time).toISOString();
							distinctDateEvents = distinctDateEvents.map(event=>{
								event.type = constraint.type;
								AppointmentClass = getClass(constraint.type);
								return (new AppointmentClass(transmuteSnakeToCamel(event))).getPublicInfo();
							});
							dataArray.push({date: distinctDate, events: distinctDateEvents});	
						})
					else
						datesAndEvents.forEach(event=>{
							distinctDate = new Date(event.start_time).toISOString();
							dataArray.push({date: distinctDate, events: datesAndEvents})
						})
					return done(null, dataArray);
				})
				.catch(err=>done(err))
		})
		.catch(err=>done(err));
	}
}