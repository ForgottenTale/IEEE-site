const passport = require("passport");
const database = require('./database.js');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');

module.exports = {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated())
            return next();
        res.redirect('/login');
    },

    setStrategies: function (app) {
        passport.serializeUser((user, done) => {
            done(null, user.email);
        });

        passport.deserializeUser((id, done) => {
            database.findUser({ email: id }, (err, doc) => {
                done(null, doc);
            })
        });
        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
            function (email, password, done) {
                database.findUser({ email: email }, function (err, user) {
                    console.log('User ' + email + ' attempted to log in.');
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    if (!bcrypt.compareSync(password, user.password)) { return done(null, false); }
                    return done(null, user);
                })
            }
        ))
    }
}