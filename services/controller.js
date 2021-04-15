function convertDateToSqlDateTime(dateTime){
    return dateTime.toISOString().replace("T", " ").replace("Z", "");
}

function convertSqlDateTimeToDate(mysqlTime){
    return new Date(mysqlTime.replace(" ", "T") + "Z");
}

class User {
    constructor(user){
        this.required = ["name", "email", "phone", "password"];
        try{
            this.checkRequired(user);
            this._id = user._id;
            this.role = user.role?user.role.toUpperCase():null;
            this.name = user.name.trim();
            this.email = user.email.trim();
            this.phone = (user.phone+"").trim();
            this.password = user.password.trim();
            this.validate();
        }catch(err){
            throw err;
        }
    }

    checkRequired(input){
        this.required.forEach(param=>{
            if(!input[param])
                throw (param + " is requried");
            else if((input[param] + "").trim() < 1)
                throw (param + " cannot be empty");
        })
    }

    validate(){
        //validate email
        if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email))){
            throw new Error("Invalid email");
        }
        //validate phone
        if(!(this.phone.match(/\d/g).length == 10))
            throw new Error("Invalid phone number");
    }

    getPublicInfo(){
        return{
            name: this.name,
            role: this.role,
            email: this.email,
            phone: this.phone
        }
    }

    getAllNamesAndValues(){
        return({
            names: ['name', 'role', 'email', 'password', 'phone'],
            values: [
                this.name?("'" + this.name + "'"):"null",
                this.role?("'" + this.role + "'"):"null",
                "'" + this.email + "'",
                "'" + this.password + "'",
                "'" + this.phone + "'"
            ]
        })
    }

    static getValues(params){
        let values = [];
        for(let key in params){
            switch(key){
                case 'name':    values.push("name='" + params.name + "'");
                                break;
                case 'email':   values.push("email='" + params.email + "'");
                                break;
                case 'password':values.push("password='" + params.password + "'");
                                break;
                case 'phone':   values.push("phone='" + params.phone + "'");
                default     :   throw new Error("Undefined parameter provided");
            }
        }
        return values;
    }
}

class NewUser extends User{
    constructor(input){
        try{
            super(input);
            this.required = ["confirmPassword"];
            this.checkRequired(input);
            this.confirmPassword = input.confirmPassword.trim();
            if(this.confirmPassword != this.password)
                throw new Error("Passwords mismatch");
        }catch(err){
            throw err;
        }
    }

}

class Service{
    constructor(input){
        try{
            this.required = ["type", "serviceName", "creatorId"];
            this.checkRequired(input);
            this._id = input._id;
            this.type = input.type.trim();
            this.serviceName = input.serviceName.trim();
            this.description = input.description?input.description.trim():null;
            this.status = input.status?input.status:"PENDING";
            this.comments = input.comments?input.comments.trim():null;
            this.img = input.img?input.img.trim():null;
            this.creatorId = input.creatorId;
            this.convertISOToSql = convertDateToSqlDateTime;
        }catch(err){
            throw err;
        }
    }
    
    checkRequired(input){
        this.required.forEach(param=>{
            if(!input[param])
                throw (param + " is requried");
            else if((input[param] + "").trim() < 1)
                throw (param + " cannot be empty");
        })
    }

    getAllNamesAndValues(){
        return({
            names: ['service_name', 'description', 'status', 'comments', 'img', 'creator_id'],
            values: [
                this.serviceName?("'" + this.serviceName + "'"):"null",
                this.description?("'" + this.description + "'"):"null",
                this.status?("'" + this.status + "'"):"null",
                this.comments?("'" + this.comments + "'"):"null",
                this.img?("'" + this.img + "'"):"null",
                this.creatorId
            ]
        })
    }

    getPrivateInfo(){
        return{
            serviceName: this.serviceName,
            description: this.description,
            speakerName: this.speakerName,
            status: this.status,
            comments: this.comments
        }
    }

    getPublicInfo(){
        return{
            serviceName: this.serviceName,
            description: this.description,
            speakerName: this.speakerName,
            status: this.status,
            comments: this.comments
        }
    }
}

class OnlineMeeting extends Service {
    constructor(input){
        super(input);
        this.required = ["speakerName", "speakerEmail", "startTime", "endTime"];
        super.checkRequired(input);
        this.speakerName = input.speakerName.trim();
        this.speakerEmail = input.speakerEmail.trim();
        input.startTime = input.startTime[input.startTime.length-1]=="Z"?input.startTime:convertSqlDateTimeToDate(input.startTime);
        input.endTime = input.endTime[input.endTime.length-1]=="Z"?input.endTime:convertSqlDateTimeToDate(input.endTime);
        this.startTime = new Date(input.startTime);
        this.endTime = new Date(input.endTime);
        if(typeof(input.coHosts)=="string")
            input.coHosts = JSON.parse(input.coHosts);
        this.coHosts = input.coHosts?input.coHosts.map(coHost=>{
            return [coHost[0].trim(), coHost[1].trim()]
        }):null;
    }

    static validateTime(input, config){
        if(input.startTime>input.endTime)
            throw 'End Date must be greater than Start Date';
        if(input.startTime<(new Date()))
            throw 'Time slot selected is past';
        let startOfAdvanceTime = new Date(input.startTime);
        startOfAdvanceTime.setHours(0, 0, 0);
        startOfAdvanceTime.setDate(startOfAdvanceTime.getDate() - config.advance_days);
        if(startOfAdvanceTime<=(new Date())){
            throw 'Booking has to be done ' + config.advance_days + ' days in advance';
        }
    }

    static getTimeAvailQuery(input, config){
        let padding = config.padding_between_bookings_mins;
        let paddedStart = convertDateToSqlDateTime(new Date(input.startTime.getTime() - (padding*60000)));
        let paddedEnd = convertDateToSqlDateTime(new Date(input.endTime.getTime() + (padding*60000)));
        return ("SELECT * FROM " + input.type 
            + " WHERE"
            + " (start_time>'" + paddedStart + "' AND start_time<'" + paddedEnd + "') OR "
            + " (end_time>'" + paddedStart +"' AND end_time<'" + paddedEnd + "') OR "
            + " (start_time='" + paddedStart +"' AND end_time='" + paddedEnd + "');"
        )
    }

    getAllNamesAndValues(){
        let namesAndValues = super.getAllNamesAndValues();
        namesAndValues.names.push('speaker_name', 'speaker_email', 'co_hosts', 'start_time', 'end_time');
        namesAndValues.values.push(this.speakerName?("'" + this.speakerName + "'"):"null");
        namesAndValues.values.push(this.speakerEmail?("'" + this.speakerEmail + "'"):"null");
        namesAndValues.values.push(this.coHosts?("'" + JSON.stringify(this.coHosts) + "'"):"null");
        namesAndValues.values.push(this.startTime?("'" + this.convertISOToSql(this.startTime) + "'"):"null");
        namesAndValues.values.push(this.endTime?("'" + this.convertISOToSql(this.endTime) + "'"):"null");
        return(namesAndValues);
    }

    getPublicInfo(){
        return Object.assign({
            startTime: this.startTime,
            endTime: this.endTime,
            speakerName: this.speakerName,
            speakerEmail: this.speakerEmail,
            coHosts: this.coHosts
        }, super.getPublicInfo());
    }
}

class InternSupport extends Service{
    constructor(input){
        super(input);
        this.required = ["wordsCount", "startTime", "endTime"];
        super.checkRequired(input);
        this.validate(input);
        input.startTime = input.startTime[input.startTime.length-1]=="Z"?input.startTime:convertSqlDateTimeToDate(input.startTime);
        input.endTime = input.endTime[input.endTime.length-1]=="Z"?input.endTime:convertSqlDateTimeToDate(input.endTime);
        this.startTime = new Date(input.startTime);
        this.endTime = new Date(input.endTime);
        this.wordsCount = input.wordsCount;
    }

    validate(input){
        for(let param in input){
            if(input[param] < 11)
                throw "More than 11 words required";
        }
    }

    static validateTime(input, config){
        if(input.startTime>input.endTime)
            throw 'End Date must be greater than Start Date';
        if(input.startTime<(new Date()))
            throw 'Time slot selected is past';
        let startOfAdvanceTime = new Date(input.startTime);
        startOfAdvanceTime.setHours(0, 0, 0);
        startOfAdvanceTime.setDate(startOfAdvanceTime.getDate() - config.advance_days);
        if(startOfAdvanceTime<=(new Date())){
            throw 'Booking has to be done ' + config.advance_days + ' days in advance';
        }
    }

    static getTimeAvailQuery(input, config){
        let padding = config.padding_between_bookings_mins;
        let paddedStart = convertDateToSqlDateTime(new Date(input.startTime.getTime() - (padding*60000)));
        let paddedEnd = convertDateToSqlDateTime(new Date(input.endTime.getTime() + (padding*60000)));
        return ("SELECT * FROM " + input.type 
            + " WHERE"
            + " (start_time<='" + paddedStart + "' AND end_time>'" + paddedStart + "') OR "
            + " (start_time<='" + paddedStart +"' AND end_time>='" + paddedEnd + "') OR "
            + " (start_time<='" + paddedEnd +"' AND end_time>'" + paddedEnd + "');"
        )
    }

    getAllNamesAndValues(){
        let namesAndValues = super.getAllNamesAndValues();
        namesAndValues.names.push('start_time', 'end_time', 'words_count');
        namesAndValues.values.push(this.startTime?("'" + super.convertISOToSql(this.startTime) + "'"):"null");
        namesAndValues.values.push(this.endTime?("'" + super.convertISOToSql(this.endTime) + "'"):"null");
        namesAndValues.values.push(this.wordsCount);
        return(namesAndValues);
    }

    getPublicInfo(){
        return Object.assign({
            wordsCount: this.wordsCount
        }, super.getPublicInfo());
    }
}

class ENotice extends Service{
    constructor(input){
        super(input);
        this.required = ["express", "reminder", "publishTime"];
        super.checkRequired(input);
        this.express = input.express=="express"||(input.express+"")=="1"?true:false;
        this.reminder = input.reminder=="yes"||(input.reminder+"")=="1"?true:false;
        this.publishTime = new Date(input.publishTime[input.publishTime.length-1]=="Z"?input.publishTime:convertSqlDateTimeToDate(input.publishTime));
    }

    static validateTime(input, config){
        let startOfAdvanceTime = new Date(input.publishTime);
        startOfAdvanceTime.setHours(0, 0, 0);
        startOfAdvanceTime.setDate(startOfAdvanceTime.getDate() - config.advance_days);
        if(startOfAdvanceTime<=(new Date())){
            throw 'Booking has to be done ' + config.advance_days + ' days in advance';
        }
    }

    static getTimeAvailQuery(input, config){
        let padding = config.padding_between_bookings_mins;
        let paddedStart = convertDateToSqlDateTime(new Date(input.publishTime.getTime() - (padding*60000)));
        let paddedEnd = convertDateToSqlDateTime(new Date(input.publishTime.getTime() + (padding*60000)));
        return ("SELECT * FROM " + input.type 
            + " WHERE service_name='" + input.serviceName
            + "' (start_time<='" + paddedStart + "' AND end_time>'" + paddedStart + "') OR "
            + " (start_time<='" + paddedStart +"' AND end_time>='" + paddedEnd + "') OR "
            + " (start_time<='" + paddedEnd +"' AND end_time>'" + paddedEnd + "');"
        )
    }

    getAllNamesAndValues(){
        let namesAndValues = super.getAllNamesAndValues();
        namesAndValues.names.push('publish_time', 'express', 'reminder');
        namesAndValues.values.push(this.publishTime?("'" + super.convertISOToSql(this.publishTime) + "'"):"null");
        namesAndValues.values.push(this.express);
        namesAndValues.values.push(this.reminder);
        return(namesAndValues);
    }

    getPublicInfo(){
        return Object.assign({
            express: this.express,
            reminder: this.reminder
        }, super.getPublicInfo());
    }
}

class Publicity extends Service{
    constructor(input){
        super(input);
        this.required = ["publishTime"];
        super.checkRequired(input);
        this.publishTime = new Date(input.publishTime[input.publishTime.length-1]=="Z"?input.publishTime:convertSqlDateTimeToDate(input.publishTime));
    }

    static validateTime(input, config){
        let startOfAdvanceTime = new Date(input.publishTime);
        startOfAdvanceTime.setHours(0, 0, 0);
        startOfAdvanceTime.setDate(startOfAdvanceTime.getDate() - config.advance_days);
        if(startOfAdvanceTime<=(new Date())){
            throw 'Booking has to be done ' + config.advance_days + ' days in advance';
        }
    }

    static getTimeAvailQuery(input, config){
        let padding = config.padding_between_bookings_mins;
        let paddedStart = convertDateToSqlDateTime(new Date(input.publishTime.getTime() - (padding*60000)));
        let paddedEnd = convertDateToSqlDateTime(new Date(input.publishTime.getTime() + (padding*60000)));
        return ("SELECT * FROM " + input.type 
            + " WHERE"
            + " (publish_time>='" + paddedStart +"' AND publish_time<='" + paddedEnd + "');"
        )
    }

    getAllNamesAndValues(){
        let namesAndValues = super.getAllNamesAndValues();
        namesAndValues.names.push('publish_time');
        namesAndValues.values.push(this.publishTime?("'" + super.convertISOToSql(this.dateTime) + "'"):"null");
        return(namesAndValues);
    }
    
    getPublicInfo(){
        return Object.assign({
            express: this.express,
            reminder: this.reminder
        }, super.getPublicInfo());
    }
};


function getClass(type){
    switch(type){
        case "online_meeting":  return OnlineMeeting;  
        case "intern_support":  return InternSupport;
        case "e_notice":        return ENotice;
        case "publicity":       return Publicity;
        default:                throw "Class not found";
    }
}

module.exports = {
    User: User,
    NewUser: NewUser,
    OnlineMeeting: OnlineMeeting,
    InternSupport: InternSupport,
    ENotice: ENotice,
    Publicity: Publicity,
    getClass: getClass,
    convertDateToSqlDateTime: convertDateToSqlDateTime,
    convertSqlDateTimeToDate: convertSqlDateTimeToDate
}