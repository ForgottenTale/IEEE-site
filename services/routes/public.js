const database = require('../database.js');
const bcrypt = require('bcrypt');
const passport = require('passport');
const auth = require('../auth.js');

module.exports = function(app){
    app.route('/register')
    .get((req, res)=>{
        res.sendFile(process.cwd() + '/coverage/register.html')
    })
    .post((req, res)=>{
        req.body.password = bcrypt.hashSync(req.body.password, 12);
        database.insertUser(req.body, (err, doc)=>{
            if(err){
                console.error(err);
                res.sendStatus(500);
            }
            res.sendStatus(200);
        })
    })
    
    app.route('/login')
    .get((req, res)=>{
        res.sendFile(process.cwd() + '/coverage/login.html');
    })
    .post(passport.authenticate('local', {failureRedirect: '/failure'}), (req, res)=>{
        res.sendFile(process.cwd() + '/coverage/logged_in.html')
    })

    app.route('/failure')
    .get((req, res)=>{
        res.sendFile(process.cwd() + '/coverage/failure.html');
    })

    app.route('/protected')
    .get(auth.ensureAuthenticated, (req, res)=>{
        res.sendFile(process.cwd() + '/coverage/protected.html');
    })

    app.route('/logout')
    .get((req, res)=>{
        req.logout();
        res.redirect('/protected');
    })
}