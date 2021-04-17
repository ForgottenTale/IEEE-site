const mysql = require('mysql');
const { schema } = require('./ddl.js');
const { User, convertSqlDateTimeToDate, convertDateToSqlDateTime, getClass } = require('../controller.js');
const mail = require('../mail.js');

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
			let nextMails = [];
			if(config.follow_assignment){
				//find Assignees
				let assignee = await(executeQuery("SELECT * FROM user WHERE _id=" + config.assigned_to));
				assignee = assignee[0];
				if(nextApprovers.indexOf(assignee._id)==-1){
					nextApprovers.push(assignee._id);
					nextMails.push(assignee.email)
				}
			}else{
				//find Beta Admins
				[...await(executeQuery("SELECT * FROM user WHERE role='BETA_ADMIN';"
				))]
				.forEach(user=>{
					if(nextApprovers.indexOf(user._id)==-1){
						nextApprovers.push(user._id);
						nextMails.push(user.email)
					}
				})
			}
			if(!config.follow_hierarchy){
				//find Alpha Admins
				[...await(executeQuery("SELECT * FROM user WHERE role='ALPHA_ADMIN';"
				))]
				.forEach(user=>{
					if(nextApprovers.indexOf(user._id)==-1){
						nextApprovers.push(user._id);
						nextMails.push(user.email);
					}
				})
			}
			let addedAppointment = await executeQuery("INSERT INTO " + newAppointment.type 
				+ "(" + names.join(',') + ") VALUES(" + values.join(',') + ");"
			);
			let altAppointment = await executeQuery("INSERT INTO alt(" + newAppointment.type + "_id, creator_id) VALUES(" + addedAppointment.insertId + "," + newAppointment.creatorId + ");");
			let addNextApprovers = nextApprovers.map(userId=>{
				return ("INSERT INTO next_to_approve(user_id, alt_id) VALUES("
					+ userId + "," + altAppointment.insertId
					+ ");"
				)
			}).join("");
			await executeQuery(addNextApprovers);
			mail.sendNeedsApproval({type: newAppointment.type, emailIds: nextMails});
			return done(null, {id: altAppointment.insertId});
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

	getUserAppointments: async function(constraint, done){
		try{
			let appointmentTypes = await executeQuery("SELECT DISTINCT(type) FROM service_config;");
			let query = "";
			appointmentTypes.forEach(appointmentType=>{
				query+="SELECT * FROM alt INNER JOIN " + appointmentType.type + " ON alt." + appointmentType.type + "_id=" + appointmentType.type +"._id"  
					+ " WHERE " + appointmentType.type + "_id IS NOT NULL AND creator_id=" + constraint.user_id + ";";
			})
			let appointmentsOfAllTypes = await executeQuery(query);
			query = "";
			let dataArray = [];
			for (let mainIdx in appointmentsOfAllTypes){
				for (let idx in appointmentsOfAllTypes[mainIdx]){
					appointmentsOfAllTypes[mainIdx][idx] = transmuteSnakeToCamel(appointmentsOfAllTypes[mainIdx][idx]);
					appointmentsOfAllTypes[mainIdx][idx].responses = await executeQuery("SELECT name, email, phone, response FROM response INNER JOIN user on user._id=response.user_id WHERE alt_id=" + appointmentsOfAllTypes[mainIdx][idx].id + ";");
				}
				dataArray.push({type: appointmentTypes[mainIdx].type, data: appointmentsOfAllTypes[mainIdx]})
			}
			return done(null, dataArray);
		}catch(err){
			return done(err);
		}
	},

	removeAppointment: function(input, done){
		executeQuery("SELECT * FROM " + input.type + " WHERE _id=" + input.appointmentId + ";")
		.then(data=>{
			if(data.length < 1){
				return done("Appointment not found")
			}
			if(data[0].creator_id==input.userId){
				let query = "DELETE FROM next_to_approve WHERE " + input.type + "_id=" + input.appointmentId + ";"
					+ "DELETE FROM response WHERE "+ input.type +"_id=" + input.appointmentId + ";"
					+ "DELETE FROM " + input.type + " WHERE _id=" + input.appointmentId + ";"
				executeQuery(query)
				.then(response=>done(null, "Deleted Successfully"))
				.catch(err=>done(err))
			}else
				return done("Appointments can only be deleted by the creator");
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
	},

	findHistoryOfApprovals: function(constraint, done){
		let query = "SELECT * FROM response"
		+ " LEFT JOIN " + constraint.type + " ON " + constraint.type + "._id=response." + constraint.type + "_id"
		+ " WHERE response.user_id=" + constraint.user_id;
		executeQuery(query)
		.then(appointments=>{
			let query = "";
			appointments.forEach(appointment=>{
				appointment.myResponse = appointment.response;
				delete appointment.response;
				query += "SELECT name, email, phone, response FROM response INNER JOIN user ON response.user_id=user._id WHERE " + constraint.type + "_id=" + appointment._id + ";";
			})
			if(!query)
				return done(null, appointments);
			executeQuery(query)
			.then(responses=>{
				if(!responses[0][0])
					responses = [responses];
				appointments.forEach((appointment, idx)=>{
					appointment.responses = responses[idx];
				})
				return done(null, appointments);
			})
			.catch(err=>done(err));
		})
		.catch(err=>done(err));
	},

	findUserApprovals: function(constraint, done){
		let query = "SELECT * FROM next_to_approve" 
		+ " INNER JOIN online_meeting ON online_meeting._id=next_to_approve.online_meeting_id" 
		+ " LEFT JOIN response ON response.online_meeting_id=next_to_approve.online_meeting_id"
		+ " WHERE next_to_approve.user_id=" + constraint.user_id  + ";"
		executeQuery(query)
		.then(appointments=>{
			let dataArray = [];
			appointments.forEach(appointment=>{
				appointment.type=constraint.type;
				AppointmentClass = getClass(constraint.type);
				dataArray.push(transmuteSnakeToCamel(appointment))
			})
			getConfig('online_meeting', null, (err, config)=>{
				if(err) return done(err);
				return done(null, {encourageMode: config.follow_hierarchy?false:true, data: dataArray})
			})
		})
		.catch(err=>done(err))
	},

	changeAppointmentStatus: async function(input, done){
		try{
			let appointment = await executeQuery("SELECT * FROM " + input.type 
				+ " AS t INNER JOIN next_to_approve AS n ON n." + input.type +"_id=t._id "
				+ " WHERE n.user_id=" + input.user._id + " AND t._id=" + input.appointmentId +";");
			if(appointment.length!=1)
				if(appointment.length==0)
					throw new Error("Appointment doesn't exist");
				else
					throw new Error("Invalid number of appointments selected");
			appointment = appointment[0];
			let config = await new Promise((resolve, reject)=>{
				getConfig(input.type, appointment.service_name, (err, results)=>{
					if(err) return reject(err);
					return resolve(results);
				})
			});
			let alphaAdmins = await executeQuery("SELECT * FROM user WHERE role='ALPHA_ADMIN';");
			let nextMails = alphaAdmins.map(admin=>admin.email);
			let query = "INSERT INTO response(user_id, " + input.type + "_id, encourages, response) VALUES ("
				+ [input.user._id, input.appointmentId, input.encourages, ("'" + input.response + "'")].join(",") + ");"
			if(input.user.role == "ALPHA_ADMIN"){
				let creator = await executeQuery("SELECT * FROM user WHERE _id=" + appointment.creator_id);
				let involved = await executeQuery("SELECT * FROM next_to_approve INNER JOIN user ON next_to_approve.user_id=user._id WHERE "
					+ input.type + "_id=" + appointment._id + ";");
				involved.forEach(involvedUser=>{
					if(input.user._id==involvedUser._id)
						return ;
					query+="INSERT INTO response(user_id, " + input.type + "_id) VALUES ("
					+ [involvedUser._id, input.appointmentId].join(",")+");"
				})
				query+="DELETE FROM next_to_approve WHERE "
					+ input.type + "_id=" + input.appointmentId + ";";
				await executeQuery("UPDATE " + input.type + " SET status='"
					+ (input.encourages?"APPROVED":"DECLINED")
					+ "' WHERE _id=" + input.appointmentId)
				mail.sendFinal({type: input, emailIds: [...nextMails, creator[0].email]});
			}else{
				if(config.follow_hierarchy)
					alphaAdmins.forEach(alpha=>{
						query+="INSERT INTO next_to_approve(user_id," + input.type + "_id) VALUES("
						+ alpha._id + "," + appointment._id
						+");"
					})
				query+="DELETE FROM next_to_approve WHERE user_id=" + input.user._id
				+ " AND " + input.type + "_id=" + input.appointmentId + ";";
				mail.sendResponses({
					type: input.type,
					user:input.user,
					response: input.response,
					encourages: input.encourages,
					emailIds: nextMails
				});
			}
			await executeQuery(query);
			return done(null, "Updated Successfully");
		}catch(err){
			return done(err);
		}
	}
}