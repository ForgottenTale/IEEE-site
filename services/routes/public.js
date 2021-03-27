const database = require('../database/database.js');
const passport = require('passport');
const NewUser = require('../controllers.js').NewUser;

module.exports = function(app){
    app.route('/register')
    .get((req, res)=>{
        res.sendFile(process.cwd() + '/coverage/register.html')
    })
    .post((req, res)=>{
        try{
            let newUser = new NewUser(req.body);
            database.insertUser(newUser, (err, doc)=>{
                if(err) throw err;
                res.sendStatus(200);
            })
        }catch(err){
            console.error(err);
            res.status(400).json({error: err})
        }
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

    app.route('/logout')
    .get((req, res)=>{
        req.logout();
        res.redirect('/protected');
    })
}