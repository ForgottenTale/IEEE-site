const mysql = require('mysql');
const { schema } = require('./ddl.js');
const { User, convertDateToSqlDateTime, convertSqlDateTimeToDate, getClass } = require('../controller.js');
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

function getAppointmentTypes(){
	return new Promise((resolve, reject)=>{
		connection.query("SELECT DISTINCT(type) FROM service_config;", (err, results)=>{
			if(err) reject(err);
			return resolve(results);
		})
	})
}

function getConfig(type, serviceName, done){
	let query = "SELECT * FROM service_config WHERE type='" + type 
		+ "' AND (service_name='" + serviceName + "' OR service_name is null);" ;
	connection.query(query, (err, results)=>{
		if(err) return done(err);
		if(results.length<1){
			err = new Error("Config not found");
			err.sql = query;
			return done(err);
		}
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
		connection.query(query, (err, results)=>{
			if(err) return reject(err);
			return resolve(results);
		})
	})
}

function findMailsOfInvolved(input){
	return new Promise((resolve, reject)=>{
		Promise.all([
			executeQuery("SELECT * FROM next_to_approve INNER JOIN user ON user._id=user_id WHERE alt_id=" + input.id),
			executeQuery("SELECT * FROM response INNER JOIN user ON user._id=user_id WHERE alt_id=" + input.id)
		])
		.then(data=>{
			let emailIds = [];
			data[0].forEach(user=>{
				if(emailIds.indexOf(user.email)==-1)
					emailIds.push(user.email);
			})
			data[1].forEach(user=>{
				if(emailIds.indexOf(user.email)==-1)
					emailIds.push(user.email);
			})
			resolve(emailIds);
		})
		.catch(err=>reject(err));
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
			let altAppointment = await executeQuery("INSERT INTO alt(" + newAppointment.type + "_id, creator_id, status) VALUES("
				+ addedAppointment.insertId + "," + newAppointment.creatorId + ",'" + newAppointment.status + "');");
			let addNextApprovers = nextApprovers.map(userId=>{
				return ("INSERT INTO next_to_approve(user_id, alt_id) VALUES("
					+ userId + "," + altAppointment.insertId
					+ ");"
				)
			}).join("");
			await executeQuery(addNextApprovers);
			let creator = await executeQuery("SELECT * FROM user WHERE _id=" + newAppointment.creatorId);
			mail.newAppointment({id: altAppointment.insertId, type: newAppointment.type, emailIds: nextMails});
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
				return done(new Error("Time slot unavailable"));
			})
		})
	},

	getUserAppointments: async function(constraint, done){
		try{
			let types = await getAppointmentTypes();
			let query = "";
			types.forEach(appointmentType=>{
				query+="SELECT *, alt._id as _id FROM alt INNER JOIN " + appointmentType.type + " ON alt." + appointmentType.type + "_id=" + appointmentType.type +"._id"  
					+ " WHERE " + appointmentType.type + "_id IS NOT NULL AND creator_id=" + constraint.userId + ";";
			})
			let appointmentsOfAllTypes = await executeQuery(query);
			query = "";
			let dataArray = [];
			for (let mainIdx in appointmentsOfAllTypes){
				for (let idx in appointmentsOfAllTypes[mainIdx]){
					AppointmentClass = getClass(types[mainIdx].type);
					appointmentsOfAllTypes[mainIdx][idx] = AppointmentClass.convertSqlTimesToDate(appointmentsOfAllTypes[mainIdx][idx]);
					appointmentsOfAllTypes[mainIdx][idx] = transmuteSnakeToCamel(appointmentsOfAllTypes[mainIdx][idx]);
					appointmentsOfAllTypes[mainIdx][idx].otherResponses = await executeQuery("SELECT name, email, encourages, response FROM response INNER JOIN user on user._id=response.user_id WHERE final=1 AND alt_id=" + appointmentsOfAllTypes[mainIdx][idx].id + ";");
					appointmentsOfAllTypes[mainIdx][idx].type = types[mainIdx].type;
					dataArray.push(appointmentsOfAllTypes[mainIdx][idx])
				}
			}
			return done(null, dataArray);
		}catch(err){
			return done(err);
		}
	},

	removeAppointment: function(input, done){
		executeQuery("SELECT * FROM alt WHERE _id=" + input.appointmentId + ";")
		.then(appointment=>{
			let type = "";
			let typeId;
			if(appointment.length < 1)
				return done(new Error("Appointment not found"))
			if(appointment[0].creator_id==input.user._id){
				//find type
				for(let key in appointment[0]){
					if(key=="creator_id" || key=="_id")
						continue;
					if((/_id$/g).test(key) && appointment[0][key]){
						type = key.replace("_id", "");
						typeId = appointment[0][key];
					}
				}
				if(!type)
					return done(new Error("Appointment type not found"));
				executeQuery("SELECT * FROM next_to_approve INNER JOIN user ON user._id=user_id WHERE alt_id=" + input.appointmentId)
				.then(nextToApprove=>{
					let emailIds = [];
					findMailsOfInvolved({id: input.appointmentId})
					.then(involved=>{
						emailIds.push(...involved);
						emailIds.push(input.user.email);
						let query = "DELETE FROM next_to_approve WHERE alt_id=" + input.appointmentId + ";"
						+ "DELETE FROM response WHERE alt_id=" + input.appointmentId + ";"
						+ "DELETE FROM alt WHERE _id=" + input.appointmentId + ";"
						+ "DELETE FROM " + type + " WHERE _id=" + typeId + ";"
						
						executeQuery(query)
						.then(response=>{
							mail.deleted({id: input.appointmentId, emailIds})
							return done(null, "Deleted Successfully")
						})
						.catch(err=>done(err))
						})
					})
					.catch(err=>done(err));
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
							distinctDateEvents[0].start_time = distinctDateEvents[0].start_time.split(" ");
							distinctDateEvents[0].start_time.pop();
							distinctDateEvents[0].start_time.push("00:00:00");
							distinctDateEvents[0].start_time = distinctDateEvents[0].start_time.join(" ");
							distinctDate = new Date(convertSqlDateTimeToDate(distinctDateEvents[0].start_time));
							distinctDateEvents = distinctDateEvents.map(event=>{
								event.type = constraint.type;
								AppointmentClass = getClass(constraint.type);
								AppointmentClass.convertSqlTimesToDate(event);
								event = transmuteSnakeToCamel(event);
								return event;
							});
							dataArray.push({date: distinctDate, events: distinctDateEvents});	
						})
					else
						datesAndEvents.forEach(distinctDateEvents=>{
							distinctDateEvents.start_time = distinctDateEvents.start_time.split(" ");
							distinctDateEvents.start_time.pop();
							distinctDateEvents.start_time.push("00:00:00");
							distinctDateEvents.start_time = distinctDateEvents.start_time.join(" ");
							distinctDate = new Date(convertSqlDateTimeToDate(distinctDateEvents.start_time));
							distinctDateEvents.type = constraint.type;
							AppointmentClass = getClass(constraint.type);
							AppointmentClass.convertSqlTimesToDate(distinctDateEvents);
							distinctDateEvents = transmuteSnakeToCamel(distinctDateEvents);
							dataArray.push({date: distinctDate, events: distinctDateEvents})
						})
					return done(null, dataArray);
				})
				.catch(err=>done(err))
			else
				return done(null, []);
		})
		.catch(err=>done(err));
	},

	findHistoryOfApprovals: async function(constraint, done){
		try{
			let types = await getAppointmentTypes();
			let query = "";
			types.forEach(type=>{
				query += "SELECT *, alt._id as _id FROM alt"
					+ " INNER JOIN " + type.type + " ON " + type.type + "_id=" + type.type + "._id"
					+ " INNER JOIN response as r ON r.alt_id=alt._id"
					+ " WHERE r.user_id=" + constraint.user_id + ";";
			})
			let appointmentsOfAllTypes = await executeQuery(query);
			let dataArray = [];
			for (let mainIdx in appointmentsOfAllTypes){
				for (let idx in appointmentsOfAllTypes[mainIdx]){
					AppointmentClass = getClass(types[mainIdx].type);
					appointmentsOfAllTypes[mainIdx][idx] = AppointmentClass.convertSqlTimesToDate(appointmentsOfAllTypes[mainIdx][idx]);
					appointmentsOfAllTypes[mainIdx][idx] = transmuteSnakeToCamel(appointmentsOfAllTypes[mainIdx][idx]);
					appointmentsOfAllTypes[mainIdx][idx].otherResponses = await executeQuery("SELECT name, email, encourages, response FROM response INNER JOIN user on user._id=response.user_id WHERE alt_id=" + appointmentsOfAllTypes[mainIdx][idx].id + " AND user_id!=" + constraint.user_id + ";");
					appointmentsOfAllTypes[mainIdx][idx].type = types[mainIdx].type;
					dataArray.push(appointmentsOfAllTypes[mainIdx][idx])
				}
			}
			return done(null, dataArray);	
		}catch(err){
			return done(err);
		}
	},

	findUserApprovals: async function(constraint, done){
		try{
			let types = await getAppointmentTypes();
			let query = "";
			types.forEach(type=>{
				query += "SELECT *, alt._id as _id FROM alt"
					+ " INNER JOIN " + type.type + " ON " + type.type + "_id=" + type.type + "._id"
					+ " INNER JOIN next_to_approve as n ON n.alt_id=alt._id"
					+ " INNER JOIN user ON creator_id=user._id"
					+ " WHERE n.user_id=" + constraint.user_id;
				if(constraint.id)
					query += " AND alt._id=" + constraint.id + ";"
				else
					query += ";";
			})
			let appointmentsOfAllTypes = await executeQuery(query);
			let dataArray = [];
			for (let mainIdx in appointmentsOfAllTypes){
				for (let idx in appointmentsOfAllTypes[mainIdx]){
					AppointmentClass = getClass(types[mainIdx].type);
					appointmentsOfAllTypes[mainIdx][idx] = AppointmentClass.convertSqlTimesToDate(appointmentsOfAllTypes[mainIdx][idx]);
					appointmentsOfAllTypes[mainIdx][idx] = transmuteSnakeToCamel(appointmentsOfAllTypes[mainIdx][idx]);
					appointmentsOfAllTypes[mainIdx][idx].otherResponses = await executeQuery("SELECT name, email, encourages, response FROM response INNER JOIN user on user._id=response.user_id WHERE alt_id=" + appointmentsOfAllTypes[mainIdx][idx].id + ";");
					appointmentsOfAllTypes[mainIdx][idx].type = types[mainIdx].type;
					delete(appointmentsOfAllTypes[mainIdx][idx].password);
					dataArray.push(appointmentsOfAllTypes[mainIdx][idx])
				}
			}
			return done(null, dataArray);
		}catch(err){
			return done(err);
		}
	},

	changeAppointmentStatus: async function(input, done){
		try{
			let appointment = await executeQuery("SELECT * FROM alt"
				+ " INNER JOIN next_to_approve as n ON alt._id=n.alt_id"
				+ "  WHERE alt_id=" + input.appointmentId +" AND n.user_id=" + input.user._id);
			if(appointment.length!=1)
				if(appointment.length==0)
					throw new Error("Appointment doesn't exist");
				else
					throw new Error("Invalid number of appointments selected");
			appointment = appointment[0];
			let type;
			for(let key in appointment){
				if(key=="user_id" || key=="_id" || key=="alt_id" || key=="creator_id")
					continue;
				if((/_id$/g).test(key) && appointment[key]){
					type = key.replace("_id", "");
					typeId = appointment[key];
				}
			}
			if(!type)
				return done(new Error("Appointment type not found"));
			let config = await new Promise((resolve, reject)=>{
				getConfig(type, appointment.service_name, (err, results)=>{
					if(err) return reject(err);
					return resolve(results);
				})
			});
			let query = "";
			if(input.user.role == "ALPHA_ADMIN"){
				query += "INSERT INTO response(user_id, alt_id, encourages, final, response) VALUES ("
				+ [input.user._id, input.appointmentId, input.encourages, 1, ("'" + input.response + "'")].join(",") + ");";
				let creator = await executeQuery("SELECT * FROM user WHERE _id=" + appointment.creator_id);
				let involved = await executeQuery("SELECT * FROM next_to_approve INNER JOIN user ON next_to_approve.user_id=user._id WHERE alt_id=" + appointment._id + ";");
				involved.forEach(involvedUser=>{
					if(input.user._id==involvedUser._id)
						return ;
					query+="INSERT INTO response(user_id, alt_id) VALUES ("
					+ [involvedUser._id, input.appointmentId].join(",")+");"
				})
				query+="DELETE FROM next_to_approve WHERE alt_id=" + input.appointmentId + ";";
				await executeQuery("UPDATE alt SET status='"
					+ (input.encourages?"APPROVED":"DECLINED")
					+ "' WHERE _id=" + input.appointmentId);
				let nextMails = await findMailsOfInvolved({id: input.appointmentId});
				mail.sendFinal({id: input.appointmentId,
					type: type,
					user:input.user,
					response: input.response,
					encourages: input.encourages,
					emailIds: [...nextMails, creator[0].email]});
			}else{
				let nextMails = [];
				let alphaAdmins = await executeQuery("SELECT * FROM user WHERE role='ALPHA_ADMIN';");
				if(config.follow_hierarchy){
					if(input.encourages){
						query += "INSERT INTO response(user_id, alt_id, encourages, response) VALUES ("
							+ [input.user._id, input.appointmentId, input.encourages, ("'" + input.response + "'")].join(",") + ");"
						alphaAdmins.forEach(alpha=>{
							query+="INSERT INTO next_to_approve(user_id,alt_id) VALUES("
							+ alpha._id + "," + appointment._id
							+");"
							nextMails.push(alpha.email);
						});
						let involved = await findMailsOfInvolved({id: input.appointmentId});
						mail.changed({
							id: input.appointmentId,
							type: type,
							user:input.user,
							response: input.response,
							encourages: input.encourages,
							emailIds: [...nextMails, ...involved]
						});
					}else{
						let nextMails = await findMailsOfInvolved({id: input.appointmentId});
						let creator = await executeQuery("SELECT * FROM user WHERE _id=" + appointment.creator_id);
						query += "INSERT INTO response(user_id, alt_id, encourages, final, response) VALUES ("
							+ [input.user._id, input.appointmentId, input.encourages, 1, ("'" + input.response + "'")].join(",") + ");"
						mail.sendFinal({
							id: input.appointmentId,
							type: type,
							user:input.user,
							response: input.response,
							encourages: input.encourages,
							emailIds: [...nextMails, creator[0].email]
						})
					}
				}else{
					let involved = await findMailsOfInvolved({id: input.appointmentId});
					mail.changed({
						id: input.appointmentId,
						type: type,
						user:input.user,
						response: input.response,
						encourages: input.encourages,
						emailIds: involved
					})
				}
				query+="DELETE FROM next_to_approve WHERE user_id=" + input.user._id
				+ " AND alt_id=" + input.appointmentId + ";";
				await executeQuery("UPDATE alt SET status='"
					+ (input.encourages?"APPROVED":"DECLINED")
					+ "' WHERE _id=" + input.appointmentId);
			}
			await executeQuery(query);
			return done(null, "Updated Successfully");
		}catch(err){
			return done(err);
		}
	},

	getActivity: async function(done){
		let returnData = {};
		try{
			let data = await executeQuery("SELECT status, count(*) FROM alt GROUP BY status");
			data.forEach(statusType=>{
				returnData[statusType.status.toLowerCase()] = statusType["count(*)"];
			})
			return done(null, returnData);
		}catch(err){
			return done(err);
		}
	},

	getUsers: function(constraint, done){
		let query = "SELECT _id, name, email, phone, role FROM user ";
		if(constraint.role == "admin")
			query+="WHERE role='ALPHA_ADMIN' OR role='BETA_ADMIN'";
		else if(constraint.role == "regular")
			query+="WHERE role='REGULAR'";
		else if(!constraint.role)
			query+=";";
		else
			query+="WHERE role is null;";
		executeQuery(query)
		.then(results=>{
			results = results.map(result=>{
				result.id = result._id;
				delete result._id;
				return result;
			})
			return done(null, results);
		})
		.catch(err=>done(err));
	}
}