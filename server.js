const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const database = require('./services/database.js');
const routes = require('./services/routes/index.js');
const auth = require('./services/auth.js');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));
app.use(passport.initialize())
app.use(passport.session());

auth.setStrategies(app);
routes(app);

app.listen(process.env.PORT || 3000, ()=> console.log('listening on Port', process.env.PORT));