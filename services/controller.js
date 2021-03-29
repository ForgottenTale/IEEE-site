class User {
    constructor(user){
        try{
            this.name = user.name;
            this.email = user.email;
            this.password = user.password;
            this.phone = user.phone;
        }catch(err){
            throw err;
        }
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
            this.confirmPassword = input.confirmPassword;
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
        if(!this.phone.match(/\d/g).length == 10)
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

module.exports = {
    User: User,
    NewUser: NewUser
}