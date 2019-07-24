var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var studentsRouter = require('./routes/students');

var passport = require('passport');
var {BasicStrategy} = require('passport-http');

var cors = require('cors')

var db = require('./db');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/', studentsRouter);

db.connect();

/**
 * ********************
 * TUMO CHANGES BELOW *
 * ********************
 */
passport.use(new BasicStrategy(
  function(username, password, done) {
    db.getClient().collection("students").findOne({email: username},
      function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      });
  }
));

module.exports = app;