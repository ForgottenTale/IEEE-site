class User {
    constructor(user){
        this._id = user._id || null;
        this.name = user.name.trim();
        this.email = user.email.trim();
        this.password = user.password.trim();
        this.phone = user.phone.trim();
    }

    getPublicInfo(){
        return{
            name: this.name,
            email: this.email,
            phone: this.phone
        }
    }

    getAllNamesAndValues(){
        return({
            names: ['name', 'email', 'password', 'phone'],
            values: [
                "'" + this.name + "'",
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
                case 'phone': values.push("phone='" + params.phone + "'");
                default     :   throw 'Undefined parameter provided';
            }
        }
        return values;
    }
}

class NewUser extends User{
    constructor(input){
        try{
            super(input);
            this.check(input);
            this.validate();
            this.confirmPassword = input.confirmPassword.trim();
            if(this.confirmPassword != this.password)
                throw "Passwords mismatch";
        }catch(err){
            throw err;
        }
    }

    validate(){
        //validate email
        if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email))){
            throw "Invalid email";
        }
        //validate phone
        if(!(this.phone.match(/\d/g).length == 10))
            throw "Invalid phone number";
    }

    check(input){
        if(!input.name || !input.email || !input.phone || !input.password || !input.confirmPassword)
            throw "Required field(s) missing";
        for(let param in input){
            if(!input[param]){
                throw (param + " field missing");
            }
            input[param] = input[param].trim();
            if(input[param].length < 1){
                throw (param + " field is empty");
            }
        }
    }

}

class Service{
    constructor(input){
        try{
            input = this.check(input);
            this._id = input._id || null;
            this.type = input.type;
            this.serviceName = input.serviceName;
            this.description = input.description;
            this.comments = input.comments;
            this.creatorId = input.creatorId;
        }catch(err){
            throw err;
        }
    }
    
    check(input){
        for(let param in input){
            if(typeof(input[param]) == "string"){
                if(input[param].trim().length < 1){
                    input[param] = null;
                }
            }
        }
        return input;
    }

    getAllNamesAndValues(){
        return({
            names: ['service_name', 'description', 'comments', 'creator_id'],
            values: [
                this.serviceName?("'" + this.serviceName + "'"):"null",
                this.description?("'" + this.description + "'"):"null",
                this.comments?("'" + this.comments + "'"):"null",
                this.creatorId
            ]
        })
    }

    getPublicInfo(){
        return{
            serviceName: this.serviceName,
            description: this.description,
            speakerName: this.speakerName,
            comments: this.comments
        }
    }
}

class OnlineMeeting extends Service {
    constructor(input){
        super(input);
        this.speakerName = input.speakerName;
        this.speakerEmail = input.speakerEmail;
    }

    getAllNamesAndValues(){
        let namesAndValues = super.getAllNamesAndValues();
        namesAndValues.names.push('speaker_name', 'speaker_email');
        namesAndValues.values.push(this.speakerName?("'" + this.speakerName + "'"):"null");
        namesAndValues.values.push(this.speakerEmail?("'" + this.speakerEmail + "'"):"null");
        return(namesAndValues);
    }

    getPublicInfo(){
        return Object.assign({
            speakerName: this.speakerName,
            speakerEmail: this.speakerEmail
        }, super.getPublicInfo());
    }
}

class InternSupport extends Service{
    constructor(input){
        super(input);
        this.wordsCount = input.wordsCount;
    }

    getAllNamesAndValues(){
        let namesAndValues = super.getAllNamesAndValues();
        namesAndValues.names.push('words_count');
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
        this.express = input.express;
        this.reminder = input.reminder;
    }

    getAllNamesAndValues(){
        let namesAndValues = super.getAllNamesAndValues();
        namesAndValues.names.push('express', 'reminder');
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
    }
};

module.exports = {
    User: User,
    NewUser: NewUser,
    OnlineMeeting: OnlineMeeting,
    InternSupport: InternSupport,
    ENotice: ENotice,
    Publicity: Publicity
}