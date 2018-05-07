// be able to use .env file
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var passport = require('passport');
var expressValidator = require('express-validator');
var session = require('express-session');
var fs = require('fs');
var LocalStrategy = require('passport-local').Strategy;
var Sequelize = require('sequelize');
var https = require('https');
var http = require('http');

// Init app
var app = express();

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use(cors({

}));

// Express Session
app.use(session({
	secret: 'secret',
	resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// Passport Init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
})); 

// Set static  folder for route
require('./routes/index.route')(app);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/dist/index.html'))
});


// Set port
app.set('port', (process.env.PORT || 3000));

// Check if it is connected
app.listen(app.get('port'), function() {
	console.log('Server started at port: '+ app.get('port'));
});