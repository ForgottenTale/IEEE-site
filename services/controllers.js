const bcrypt = require('bcrypt');

class User {
    constructor(user){
        try{
            this.name = user.name;
            this.email = user.email;
            this.password = user.password;
        }catch(err){
            throw err;
        }
    }
}

class NewUser extends User{
    constructor(user){
        try{
            super(user);
            this.checkFields(user);
            this.confirmPassword = user.confirmPassword;
            if(this.confirmPassword != this.password)
                throw "Passwords mismatch";
            this.password = bcrypt.hash(this.password, 12);
        }catch(err){
            throw err;
        }
    }

    checkFields(input){
        if(!input.name || !input.email || !input.password || !input.confirmPassword)
            throw "Required field(s) are missing";
    }
}

module.exports = {
    User: User,
    NewUser: NewUser
}