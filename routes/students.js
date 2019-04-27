var express = require('express');
var router = express.Router();
var app = require('../app');
var passport = require('passport');

/* Get a single student: req.user.username */
router.get('/students/:email', /*, passport.authenticate('basic', { session: false }) */
  function(req, res, next) {
    res.send({ todo: 'send information about the student ' + req.params.email});
});

/* Create a student account */
router.post('/students', function(req, res, next) {
  res.send({ todo: 'send information about the new student'});
});

/* Update a student account */
router.put('/students/:email', /*, passport.authenticate('basic', { session: false }) */
  function(req, res, next) {
    res.send({ todo: 'update the student with the email ' + req.params.email});
});

/* Search for a student  */
router.get('/students/', /*, passport.authenticate('basic', { session: false }) */
  function(req, res, next) {
    res.send({ todo: 'send information about the new student ' + req.query.email});
});

module.exports = router;
