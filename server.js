const express = require('express');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();
const database = require('./services/database/database.js');
const routes = require('./services/routes/index.js');
const auth = require('./services/auth.js');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));
app.use(flash());
app.use(passport.initialize())
app.use(passport.session());

database.connect((err)=>{
    if(err){
        console.error(err);
        throw err;
    }
    auth.setStrategies(app);
    routes(app);

    app.listen(process.env.PORT || 3000, ()=> console.log('listening on Port', process.env.PORT));
});