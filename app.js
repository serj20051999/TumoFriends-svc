var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var studentsRouter = require('./routes/students');

var passport = require('passport');
var {BasicStrategy} = require('passport-http');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/', studentsRouter);

// Database

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'tumo';
const client = new MongoClient(url, {useNewUrlParser: true});

// Use connect method to connect to the server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server " + url);
  const db = client.db(dbName);
  app.set('db', db);
});

/**
 * ********************
 * TUMO CHANGES BELOW *
 * ********************
 */

// TODO: Middleware for Authentication
passport.use(new BasicStrategy(
  function(username, password, done) {
    // TODO authenticate user
    return done(null, {username: username})
  }
));

module.exports = app;
