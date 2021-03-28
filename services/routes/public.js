const bcrypt = require('bcrypt');
const passport = require('passport');
const database = require('../database/database.js');
const {NewUser} = require('../controller.js');

module.exports = function(app){
    app.route('/register')
    .get((req, res)=>{
        res.sendFile(process.cwd() + '/coverage/register.html')
    })
    .post((req, res)=>{
        try{
            let newUser = new NewUser(req.body);
            bcrypt.hash(newUser.password, 12, (err, hash)=>{
                newUser.password = hash;
                database.insertUser(newUser, (err, doc)=>{
                    if(err) {
                        let message = "Unknown error";
                        if(err.code=="ER_DUP_ENTRY")
                            message = "User already exists"
                        return res.status(400).json({error: message})
                    };
                    return res.sendStatus(200);
                })
            })
        }catch(err){
            res.status(400).json({error: err})
        }
    })
    
    app.route('/login')
    .get((req, res)=>{
        res.sendFile(process.cwd() + '/coverage/login.html');
    })
    .post(passport.authenticate('local', {failureMessage: true}), (req, res)=>{
        res.sendFile(process.cwd() + '/coverage/logged_in.html')
    })

    app.route('/failure')
    .get((req, res)=>{
        res.sendFile(process.cwd() + '/coverage/failure.html');
    })

    app.route('/logout')
    .get((req, res)=>{
        req.logout();
        res.redirect('/protected');
    })
}