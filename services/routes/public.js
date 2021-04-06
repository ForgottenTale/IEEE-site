const bcrypt = require('bcrypt');
const passport = require('passport');
const database = require('../database/database.js');
const {NewUser} = require('../controller.js');

function respondError(err, res){
    console.error(err);
    let message;
    if(err.code == 'ER_BAD_NULL_ERROR')
        message = err.sqlMessage;
    else if(err.code=='ER_DUP_ENTRY' && (/for key 'user.email'/).test(err.message))
        message = "User already exists";
    else
        message = err.message || err;
    res.status(400).json({error: message});
}

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
                database.addUser(newUser, (err, doc)=>{
                    if(err) {
                        return respondError(err, res);
                    };
                    return res.status(200).send(newUser.getPublicInfo());
                })
            })
        }catch(err){
            respondError(err, res);
        }
    })
    
    app.route('/login')
    .get((req, res)=>{
        res.sendFile(process.cwd() + '/coverage/login.html');
    })
    .post(passport.authenticate('local', {failureRedirect: '/failure', failureFlash: true}), (req, res)=>{
        res.status(200).send(req.user.getPublicInfo());
    })

    app.route('/failure')
    .get((req, res)=>{
        res.status(401).json({error: req.flash('error')[0]});
    })

    app.route('/logout')
    .get((req, res)=>{
        req.logout();
        res.redirect('/protected');
    })
}